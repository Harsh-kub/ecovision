
import io
import os

import numpy as np
from PIL import Image, UnidentifiedImageError
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from ultralytics import YOLO


# ============================================
# ECOVISION — XYZ STEEL FACTORY BACKEND
# ============================================

app = FastAPI(
    title="EcoVision Factory API",
    description="Object detection for the EcoVision prototype",
    version="1.0.0",
)

# Allow the local HTML frontend to communicate with this API.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:5500",
        "http://localhost:5500",
        "http://127.0.0.1:5501",
        "http://localhost:5501",
        "http://127.0.0.1:5173",
        "http://localhost:5173",
    ],
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

MAX_IMAGE_BYTES = 12 * 1024 * 1024
ALLOWED_TYPES = {"image/jpeg", "image/png", "image/webp"}

# The pretrained model detects objects from its training categories.
# The model weights are downloaded automatically on first startup.
model = None


def get_model():
    """Load the model once, when the first analysis is requested."""
    global model

    if model is None:
        model = YOLO("yolov8n.pt")

    return model


@app.get("/")
def home():
    return {
        "application": "EcoVision — XYZ Steel Factory",
        "status": "running",
        "endpoints": {
            "health": "/health",
            "image_analysis": "/analyze",
            "api_documentation": "/docs",
        },
    }


@app.get("/health")
def health():
    return {
        "status": "healthy",
        "application": "EcoVision",
        "model_loaded": model is not None,
    }


@app.post("/analyze")
async def analyze_image(file: UploadFile = File(...)):
    """
    Accept one image, run real object detection, and return
    the actual labels, confidence scores and bounding boxes.

    The uploaded image is decoded in memory. This endpoint
    does not intentionally save uploaded images to disk.
    """

    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(
            status_code=415,
            detail="Upload a JPEG, PNG, or WEBP image.",
        )

    image_bytes = await file.read(MAX_IMAGE_BYTES + 1)

    try:
        if not image_bytes:
            raise HTTPException(
                status_code=400,
                detail="The uploaded image is empty.",
            )

        if len(image_bytes) > MAX_IMAGE_BYTES:
            raise HTTPException(
                status_code=413,
                detail="Image is too large. Maximum size is 12 MB.",
            )

        try:
            with Image.open(io.BytesIO(image_bytes)) as source_image:
                source_image.verify()

            with Image.open(io.BytesIO(image_bytes)) as source_image:
                image = source_image.convert("RGB")

        except (UnidentifiedImageError, OSError, ValueError):
            raise HTTPException(
                status_code=400,
                detail="The uploaded file is not a valid image.",
            )

        width, height = image.size

        if width < 32 or height < 32:
            raise HTTPException(
                status_code=400,
                detail="Image dimensions must be at least 32 by 32 pixels.",
            )

        if width > 8000 or height > 8000:
            raise HTTPException(
                status_code=400,
                detail="Image dimensions are too large.",
            )

        image_array = np.array(image)

        detector = get_model()

        results = detector.predict(
            source=image_array,
            conf=0.25,
            verbose=False,
        )

        detections = []

        for result in results:
            if result.boxes is None:
                continue

            for box in result.boxes:
                class_id = int(box.cls[0].item())
                confidence = float(box.conf[0].item())

                coordinates = box.xyxy[0].tolist()

                detections.append({
                    "label": detector.names[class_id],
                    "confidence": round(confidence, 4),
                    "box": {
                        "x1": round(coordinates[0], 2),
                        "y1": round(coordinates[1], 2),
                        "x2": round(coordinates[2], 2),
                        "y2": round(coordinates[3], 2),
                    },
                })

        # Only actual model detections are included.
        # Do not invent objects when the model detects nothing.
        return {
            "success": True,
            "analysis_type": "real_object_detection",
            "filename": os.path.basename(file.filename or "image"),
            "image": {
                "width": width,
                "height": height,
            },
            "model": "YOLOv8n",
            "detection_count": len(detections),
            "detections": detections,
            "notice": (
                "Detections are predictions from a general-purpose "
                "pretrained model. Industrial equipment may not be "
                "recognised correctly."
            ),
            "storage": (
                "The endpoint does not intentionally save the uploaded "
                "image to disk."
            ),
        }

    finally:
        # Release our application references to the uploaded bytes.
        # This is not a guarantee of secure physical memory erasure.
        image_bytes = b""
        await file.close()


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        app,
        host="127.0.0.1",
        port=8000,
        reload=False,
    )
