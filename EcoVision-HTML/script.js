
"use strict";

/* =====================================================
   ECOVISION — XYZ STEEL FACTORY
   Plain HTML, CSS and JavaScript
   Camera readings are illustrative demo data.
   ===================================================== */

const $ = (selector, root = document) =>
    root.querySelector(selector);

const state = {
    role: "admin",
    page: "Overview",
    scanMode: false,
    selectedFloor: 1,
    selectedCamera: null,
    chartPeriod: "Month",
    question: "",
    messages: [{
        mine: false,
        text: "Welcome to EcoVision Smart Copilot. Ask about energy consumption, carbon emissions, worker counts, temperature or factory sustainability."
    }],
    energy: 15,
    water: 12,
    recycling: 20,
    reportPeriod: "Monthly",
    lastResult: null,
    processing: null,
    processingToken: 0
};

const adminPages = [
    ["⌂", "Overview"],
    ["▦", "Digital Twin"],
    ["◎", "Smart Scan"],
    ["✦", "AI Assistant"],
    ["◈", "Impact Simulator"],
    ["▤", "Sustainability Reports"]
];

const residentPages = [
    ["⌂", "Factory Overview"],
    ["🌱", "Sustainability"],
    ["▣", "Factory Notices"]
];

const metrics = [
    { icon: "⚡", title: "Energy consumed", value: "1,248", unit: "MWh", change: "−8.4%", color: "green" },
    { icon: "🌍", title: "Carbon emissions", value: "842", unit: "tCO₂e", change: "−5.2%", color: "blue" },
    { icon: "🏭", title: "Steel production", value: "328", unit: "tonnes", change: "+6.3%", color: "orange" },
    { icon: "🌱", title: "Efficiency score", value: "86", unit: "/100", change: "+4.8%", color: "purple" }
];

const notices = [
    {
        category: "ENERGY",
        date: "Today",
        title: "Review production-line energy usage",
        description: "Compare equipment demand during active production and idle periods."
    },
    {
        category: "MAINTENANCE",
        date: "Yesterday",
        title: "Inspect motors and conveyors",
        description: "Routine maintenance can help identify inefficient operating conditions."
    },
    {
        category: "SUSTAINABILITY",
        date: "This week",
        title: "Review emissions performance",
        description: "Use verified energy and production records to monitor emissions per tonne of steel."
    }
];

const factoryFloors = [
    {
        floor: 1,
        name: "Floor 1",
        purpose: "Steel processing and material handling",
        image: "images/factory-floor-1.png"
    },
    {
        floor: 2,
        name: "Floor 2",
        purpose: "Production and assembly area",
        image: "images/factory-floor-2.png"
    },
    {
        floor: 3,
        name: "Floor 3",
        purpose: "Conveyor and machinery operations",
        image: "images/factory-floor-3.png"
    },
    {
        floor: 4,
        name: "Floor 4",
        purpose: "Industrial equipment and production systems",
        image: "images/factory-floor-4.png"
    }
];

const messPhotos = [
    { camera: 1, image: "images/mess-camera-1.png", title: "Mess Camera 1", position: "Dining area" },
    { camera: 2, image: "images/mess-camera-2.png", title: "Mess Camera 2", position: "Seating area" },
    { camera: 3, image: "images/mess-camera-3.png", title: "Mess Camera 3", position: "Dining tables" },
    { camera: 4, image: "images/mess-camera-4.png", title: "Mess Camera 4", position: "Food service area" }
];

/*
  DEMO VALUES:
  energy = illustrative MWh/day
  carbon = illustrative tonnes CO2e/day
  workers = illustrative people count per view
  temperature = illustrative degrees Celsius

  These are NOT live sensor values or actual model predictions.
*/

const factoryReadings = {
    1: [
        { energy: 18.4, carbon: 13.2, score: 79, load: 82, workers: 5, temperature: 35 },
        { energy: 16.7, carbon: 12.0, score: 81, load: 76, workers: 4, temperature: 33 },
        { energy: 20.1, carbon: 14.5, score: 74, load: 89, workers: 6, temperature: 38 },
        { energy: 15.8, carbon: 11.4, score: 83, load: 71, workers: 3, temperature: 32 }
    ],
    2: [
        { energy: 24.8, carbon: 17.8, score: 73, load: 91, workers: 8, temperature: 39 },
        { energy: 22.1, carbon: 15.9, score: 77, load: 84, workers: 5, temperature: 36 },
        { energy: 26.3, carbon: 18.9, score: 70, load: 94, workers: 7, temperature: 41 },
        { energy: 21.4, carbon: 15.4, score: 79, load: 80, workers: 4, temperature: 35 }
    ],
    3: [
        { energy: 21.6, carbon: 15.5, score: 76, load: 86, workers: 6, temperature: 37 },
        { energy: 19.2, carbon: 13.8, score: 80, load: 79, workers: 4, temperature: 34 },
        { energy: 23.7, carbon: 17.1, score: 72, load: 92, workers: 7, temperature: 40 },
        { energy: 18.6, carbon: 13.4, score: 82, load: 74, workers: 3, temperature: 33 }
    ],
    4: [
        { energy: 15.2, carbon: 10.9, score: 84, load: 68, workers: 3, temperature: 31 },
        { energy: 17.4, carbon: 12.5, score: 81, load: 75, workers: 4, temperature: 33 },
        { energy: 19.1, carbon: 13.8, score: 78, load: 82, workers: 5, temperature: 36 },
        { energy: 14.6, carbon: 10.5, score: 86, load: 64, workers: 2, temperature: 30 }
    ],
    5: [
        { energy: 5.8, carbon: 4.2, score: 84, load: 55, workers: 3, temperature: 27 },
        { energy: 6.4, carbon: 4.6, score: 81, load: 63, workers: 5, temperature: 28 },
        { energy: 7.1, carbon: 5.1, score: 78, load: 70, workers: 4, temperature: 29 },
        { energy: 5.5, carbon: 4.0, score: 86, load: 48, workers: 2, temperature: 26 }
    ]
};

const equipmentByFloor = {
    1: [
        ["Material handling equipment", 97],
        ["Industrial lighting", 94],
        ["Motors and conveyors", 92],
        ["Electrical control panels", 88]
    ],
    2: [
        ["Production machinery", 97],
        ["Industrial lighting", 93],
        ["Electrical control panels", 90],
        ["Assembly equipment", 86]
    ],
    3: [
        ["Conveyor systems", 97],
        ["Production motors", 94],
        ["Industrial lighting", 92],
        ["Control equipment", 88]
    ],
    4: [
        ["Industrial machinery", 96],
        ["Production equipment", 94],
        ["Industrial lighting", 93],
        ["Electrical panels", 89]
    ],
    5: [
        ["Dining and service equipment", 96],
        ["Lighting", 94],
        ["Kitchen equipment", 90],
        ["Ventilation", 87]
    ]
};

const cropPositions = [
    "left top",
    "right top",
    "left bottom",
    "right bottom"
];

/* =====================================================
   HELPERS
   ===================================================== */

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[character]);
}

function notify(message) {
    const toast = $("#toast");

    toast.textContent = message;
    toast.hidden = false;

    clearTimeout(notify.timer);

    notify.timer = setTimeout(() => {
        toast.hidden = true;
    }, 3500);
}

function isAdmin() {
    return state.role === "admin";
}

function goTo(page) {
    if (page === "Smart Scan") {
        state.page = "Digital Twin";
        state.scanMode = true;
        state.selectedCamera = null;
        state.lastResult = null;
    } else {
        state.page = page;

        if (page === "Digital Twin") {
            state.scanMode = false;
            state.selectedCamera = null;
            state.lastResult = null;
        }
    }

    renderApp();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function currentCameraImage(camera) {
    if (state.selectedFloor === 5) {
        return messPhotos[camera - 1].image;
    }

    const floor = factoryFloors.find(
        item => item.floor === state.selectedFloor
    );

    return floor ? floor.image : factoryFloors[0].image;
}

function currentAreaName() {
    return state.selectedFloor === 5
        ? "Floor 5 · Food Mess"
        : `Floor ${state.selectedFloor}`;
}

function renderProgress(label, value) {
    return `
        <div class="progress-row">
            <div class="progress-label">
                <strong>${escapeHTML(label)}</strong>
                <span>${value}%</span>
            </div>
            <div class="progress-track">
                <div class="progress-fill" style="width:${value}%"></div>
            </div>
        </div>
    `;
}

function renderMetrics() {
    return `
        <div class="grid metrics-grid">
            ${metrics.map(metric => `
                <div class="metric-card">
                    <div class="metric-top">
                        <div class="metric-icon m${metric.color}">
                            ${metric.icon}
                        </div>
                        <span class="metric-change">${metric.change}</span>
                    </div>
                    <div class="metric-label">${metric.title}</div>
                    <div class="metric-value">
                        ${metric.value}<small>${metric.unit}</small>
                    </div>
                    <div class="metric-foot">Illustrative demo indicator</div>
                </div>
            `).join("")}
        </div>
    `;
}

/* =====================================================
   DIGITAL TWIN BUILDING
   ===================================================== */

function renderBuilding() {
    return `
        <div class="building-stage">
            <div class="building-label">
                XYZ STEEL FACTORY · DIGITAL TWIN
            </div>

            <div style="
                display:grid;
                grid-template-columns:repeat(auto-fit,minmax(125px,1fr));
                gap:10px;
                padding:20px 0 5px;
            ">
                ${factoryFloors.map(floor => `
                    <button
                        type="button"
                        data-floor="${floor.floor}"
                        class="floor-card ${state.selectedFloor === floor.floor ? "selected" : ""}"
                        style="padding:8px 5px"
                    >
                        <img
                            src="${floor.image}"
                            alt="${floor.name}"
                            style="width:100%;height:75px;object-fit:cover;border-radius:7px"
                        >
                        <strong style="display:block;margin-top:8px">${floor.name}</strong>
                        <small>4 cameras</small>
                    </button>
                `).join("")}

                <button
                    type="button"
                    data-floor="5"
                    class="floor-card ${state.selectedFloor === 5 ? "selected" : ""}"
                    style="padding:8px 5px"
                >
                    <img
                        src="${messPhotos[0].image}"
                        alt="Food Mess"
                        style="width:100%;height:75px;object-fit:cover;border-radius:7px"
                    >
                    <strong style="display:block;margin-top:8px">Floor 5</strong>
                    <small>Food Mess</small>
                </button>
            </div>
        </div>
    `;
}

/* =====================================================
   LOGIN — PRESERVE EXISTING LOGIN DESIGN
   ===================================================== */

$("#togglePassword").addEventListener("click", () => {
    const password = $("#password");
    const button = $("#togglePassword");

    if (password.type === "password") {
        password.type = "text";
        button.textContent = "Hide";
    } else {
        password.type = "password";
        button.textContent = "Show";
    }
});

$("#loginForm").addEventListener("submit", event => {
    event.preventDefault();

    const email = $("#email").value.trim();
    const password = $("#password").value;
    const role = $("#role").value;

    if (
        !email ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
        !password.trim()
    ) {
        $("#loginError").textContent =
            "Enter a valid email address and password.";
        return;
    }

    state.role = role;
    state.scanMode = false;
    state.selectedFloor = 1;
    state.selectedCamera = null;
    state.lastResult = null;
    state.page = role === "admin" ? "Overview" : "Factory Overview";

    $("#loginError").textContent = "";
    $("#loginPage").hidden = true;
    $("#appPage").hidden = false;

    renderApp();
});

$("#logoutButton").addEventListener("click", () => {
    $("#appPage").hidden = true;
    $("#loginPage").hidden = false;

    $("#password").value = "";
    $("#loginError").textContent = "";
    $("#password").type = "password";
    $("#togglePassword").textContent = "Show";
});

/* =====================================================
   NAVIGATION
   ===================================================== */

function renderNavigation() {
    const nav = isAdmin() ? adminPages : residentPages;

    const activePage =
        state.scanMode && state.page === "Digital Twin"
            ? "Smart Scan"
            : state.page;

    $("#navigation").innerHTML = nav.map(([icon, name]) => `
        <button
            type="button"
            class="nav-item ${activePage === name ? "active" : ""}"
            data-page="${escapeHTML(name)}"
        >
            <span class="nav-icon">${icon}</span>
            <span>${escapeHTML(name)}</span>
        </button>
    `).join("");
}

$("#navigation").addEventListener("click", event => {
    const button = event.target.closest("[data-page]");

    if (button) {
        goTo(button.dataset.page);
    }
});

$("#appPage").addEventListener("click", event => {
    const button = event.target.closest("[data-go]");

    if (button) {
        goTo(button.dataset.go);
    }
});

/* =====================================================
   DASHBOARD CHART
   ===================================================== */

function renderChart() {
    const values = state.chartPeriod === "Week"
        ? [45, 57, 49, 66, 61, 74, 82]
        : state.chartPeriod === "Year"
            ? [39, 47, 44, 55, 51, 62, 58, 69, 72, 78, 74, 86]
            : [42, 56, 49, 63, 59, 72, 66, 80, 75, 84, 79, 88];

    const labels = state.chartPeriod === "Week"
        ? ["M", "T", "W", "T", "F", "S", "S"]
        : state.chartPeriod === "Year"
            ? ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"]
            : Array.from({ length: 12 }, (_, i) => String(i + 1));

    return `
        <div class="chart">
            ${values.map((value, index) => `
                <div class="bar-column">
                    <div class="bar" style="height:${value}%"></div>
                    <span class="bar-label">${labels[index]}</span>
                </div>
            `).join("")}
        </div>
        <div class="legend">
            ● Illustrative factory efficiency indicator · Not live sensor readings
        </div>
    `;
}

function renderOverview() {
    const result = state.lastResult;

    return `
        <div class="page-heading">
            <div>
                <div class="eyebrow">INDUSTRIAL SUSTAINABILITY</div>
                <h1>XYZ Steel Factory</h1>
                <p>Monitor energy consumption, carbon emissions, equipment and production efficiency.</p>
            </div>
            <button class="btn primary" data-go="Digital Twin">
                Open Digital Twin →
            </button>
        </div>

        ${renderMetrics()}

        ${result ? `
            <div class="panel" style="margin-bottom:20px">
                <div class="panel-title">
                    <div>
                        <h3>Latest camera processing result</h3>
                        <p>${escapeHTML(result.areaName)} · ${escapeHTML(result.cameraLabel)}</p>
                    </div>
                    <button class="text-button" data-go="Smart Scan">
                        Open Smart Scan →
                    </button>
                </div>

                <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(145px,1fr));gap:12px">
                    <div class="feature-card">
                        <h3>⚡ Energy</h3>
                        <p style="font-size:17px;font-weight:800;color:#20372a">
                            ${result.energy.toFixed(1)} MWh/day
                        </p>
                    </div>
                    <div class="feature-card">
                        <h3>🌍 Emissions</h3>
                        <p style="font-size:17px;font-weight:800;color:#20372a">
                            ${result.carbon.toFixed(1)} tCO₂e/day
                        </p>
                    </div>
                    <div class="feature-card">
                        <h3>👷 Workers</h3>
                        <p style="font-size:17px;font-weight:800;color:#20372a">
                            ${result.workers}
                        </p>
                    </div>
                    <div class="feature-card">
                        <h3>🌡 Temperature</h3>
                        <p style="font-size:17px;font-weight:800;color:#20372a">
                            ${result.temperature}°C
                        </p>
                    </div>
                </div>
            </div>
        ` : ""}

        <div class="grid columns">
            <div class="panel">
                <div class="panel-title">
                    <div><h3>Energy performance</h3>
                    <p>Illustrative factory efficiency trend</p></div>
                    <div class="tabs">
                        ${["Week", "Month", "Year"].map(period => `
                            <button type="button" data-period="${period}"
                                class="${state.chartPeriod === period ? "selected" : ""}">
                                ${period}
                            </button>
                        `).join("")}
                    </div>
                </div>
                ${renderChart()}
            </div>

            <div class="panel insight-panel">
                <div class="panel-title">
                    <div><h3>Factory sustainability insights</h3>
                    <p>Potential areas for investigation</p></div>
                    <span>✦</span>
                </div>

                <div class="insight-row">
                    <div class="insight-icon">⚡</div>
                    <div><strong>Review motor demand</strong>
                    <p>Compare equipment energy readings during production and idle periods.</p></div>
                </div>

                <div class="insight-row">
                    <div class="insight-icon">🌡</div>
                    <div><strong>Monitor temperature</strong>
                    <p>Compare area temperatures with the factory's actual operating limits.</p></div>
                </div>

                <div class="insight-row">
                    <div class="insight-icon">🌍</div>
                    <div><strong>Track carbon intensity</strong>
                    <p>Use verified data to calculate emissions per tonne of steel.</p></div>
                </div>

                <button class="text-button" style="color:white" data-go="AI Assistant">
                    Open AI Assistant →
                </button>
            </div>
        </div>

        <div class="grid columns">
            <div class="panel">
                <div class="panel-title">
                    <div><h3>XYZ Steel Factory Digital Twin</h3>
                    <p>Four factory floors and the fifth-floor Food Mess</p></div>
                    <button class="text-button" data-go="Digital Twin">Explore →</button>
                </div>
                ${renderBuilding()}
                <button class="btn primary" data-go="Digital Twin">Select a floor →</button>
            </div>

            <div class="panel">
                <div class="panel-title">
                    <div><h3>Resource efficiency</h3>
                    <p>Illustrative performance indicators</p></div>
                </div>
                ${renderProgress("Energy efficiency", 82)}
                ${renderProgress("Production efficiency", 78)}
                ${renderProgress("Equipment utilisation", 84)}
                ${renderProgress("Carbon management", 76)}
            </div>
        </div>

        <div class="panel-title">
            <div><h3>Quick actions</h3><p>Open a factory workspace</p></div>
        </div>

        <div class="grid quick-grid">
            ${[
                ["▦", "Digital Twin", "Select floors and camera views"],
                ["◎", "Smart Scan", "Simulate machine processing"],
                ["✦", "AI Assistant", "Explore sustainability guidance"]
            ].map(([icon, title, description]) => `
                <button class="quick-card" data-go="${title}">
                    <div class="metric-icon mgreen">${icon}</div>
                    <strong>${title}<br>
                        <span style="font-weight:400;color:#687a6d">${description}</span>
                    </strong>
                </button>
            `).join("")}
        </div>

        <div class="footer-note">
            Prototype dashboard · All figures are illustrative.
        </div>
    `;
}

/* =====================================================
   DIGITAL TWIN
   ===================================================== */

function renderDigitalTwin() {
    return `
        <div class="page-heading">
            <div>
                <div class="eyebrow">${state.scanMode ? "SMART SCAN WORKSPACE" : "FACTORY DIGITAL TWIN"}</div>
                <h1>${state.scanMode ? "Select a Camera" : "XYZ Steel Factory"}</h1>
                <p>${state.scanMode
                    ? "Select a floor, then choose Camera 1–4 or All Cameras."
                    : "Select one of the four factory floors or the fifth-floor Food Mess."}
                </p>
            </div>
        </div>

        <div class="note" style="margin-bottom:18px">
            <strong>Camera workflow:</strong>
            select a floor, choose an individual camera or All Cameras,
            then review the simulated machine-processing output.
        </div>

        ${renderBuilding()}

        <div class="panel" style="margin-top:20px">
            <div class="panel-title">
                <div><h3>1. Select floor or area</h3>
                <p>Choose the factory area you want to inspect.</p></div>
                <span class="tag">5 areas</span>
            </div>

            <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(145px,1fr));gap:12px">
                ${factoryFloors.map(floor => `
                    <button type="button"
                        class="floor-card ${state.selectedFloor === floor.floor ? "selected" : ""}"
                        data-floor="${floor.floor}"
                        style="padding:12px;text-align:left">
                        <img src="${floor.image}" alt="${floor.name}"
                            style="width:100%;height:95px;object-fit:cover;border-radius:8px">
                        <strong style="display:block;margin-top:10px">${floor.name}</strong>
                        <small>${escapeHTML(floor.purpose)}</small>
                    </button>
                `).join("")}

                <button type="button"
                    class="floor-card ${state.selectedFloor === 5 ? "selected" : ""}"
                    data-floor="5"
                    style="padding:12px;text-align:left">
                    <img src="${messPhotos[0].image}" alt="Food Mess"
                        style="width:100%;height:95px;object-fit:cover;border-radius:8px">
                    <strong style="display:block;margin-top:10px">Floor 5 · Food Mess</strong>
                    <small>Dining and food service area</small>
                </button>
            </div>
        </div>

        ${renderCameraWorkspace()}
    `;
}

function renderCameraCard(cameraNumber) {
    const image = currentCameraImage(cameraNumber);
    const isMess = state.selectedFloor === 5;

    const labels = [
        "Segment A · top left",
        "Segment B · top right",
        "Segment C · bottom left",
        "Segment D · bottom right"
    ];

    const cameraName = isMess
        ? `Mess Camera ${cameraNumber}`
        : `Camera ${cameraNumber}`;

    const position = cropPositions[cameraNumber - 1];

    return `
        <button type="button" class="feature-card"
            data-capture-camera="${cameraNumber}"
            style="display:block;width:100%;padding:0;overflow:hidden;text-align:left;color:#20372a;background:white">

            <div style="position:relative">
                <img src="${image}" alt="${escapeHTML(cameraName)}"
                    style="display:block;width:100%;height:145px;object-fit:cover;object-position:${position};border-bottom:1px solid #e7ece5">

                <span style="position:absolute;top:9px;left:9px;padding:6px 8px;background:#173c2ce8;color:white;border-radius:6px;font-size:9px;font-weight:800">
                    ● ${cameraName}
                </span>
            </div>

            <div style="padding:13px">
                <strong style="display:block;color:#20372a;font-size:12px">${cameraName}</strong>

                <p style="font-size:10px;color:#849287;line-height:1.7;margin:7px 0 12px">
                    ${isMess
                        ? escapeHTML(messPhotos[cameraNumber - 1].position)
                        : labels[cameraNumber - 1]}
                </p>

                <span class="btn primary" style="display:block;text-align:center">
                    Capture & process →
                </span>
            </div>
        </button>
    `;
}

function renderAllCameraCard() {
    const isMess = state.selectedFloor === 5;

    return `
        <button type="button" class="feature-card"
            data-capture-camera="all"
            style="display:block;width:100%;text-align:left;padding:15px;color:#20372a;background:#f8fbf5;border:2px solid #9fbea0">

            <div class="panel-title">
                <div><h3 style="font-size:15px">▦ All Cameras</h3>
                <p>Capture and process all four views together.</p></div>
                <span class="tag">4 views</span>
            </div>

            <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px">
                ${[1, 2, 3, 4].map(number => `
                    <div style="position:relative;min-width:0">
                        <img src="${currentCameraImage(number)}"
                            alt="Camera ${number}"
                            style="display:block;width:100%;height:100px;border-radius:8px;object-fit:cover;object-position:${cropPositions[number - 1]}">
                        <span style="display:block;margin-top:5px;font-size:9px;color:#657969">
                            ${isMess ? `Mess Camera ${number}` : `Camera ${number} · Segment`}
                        </span>
                    </div>
                `).join("")}
            </div>

            <span class="btn primary" style="display:block;text-align:center;margin-top:15px">
                Capture all cameras & process →
            </span>
        </button>
    `;
}

function renderCameraWorkspace() {
    const isMess = state.selectedFloor === 5;

    return `
        <div class="panel" style="margin-top:20px">
            <div class="panel-title">
                <div>
                    <h3>2. ${isMess ? "Floor 5 · Food Mess" : `Floor ${state.selectedFloor} · Factory Cameras`}</h3>
                    <p>Choose Camera 1–4 or All Cameras to begin processing.</p>
                </div>
                <span class="tag">5 options</span>
            </div>

            <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:14px">
                ${[1, 2, 3, 4].map(renderCameraCard).join("")}
            </div>

            <div style="margin-top:16px">
                ${renderAllCameraCard()}
            </div>

            ${!isMess ? `
                <div class="note">
                    Factory Camera 1–4 are simulated crops of the supplied overview
                    photo for this floor. Real individual camera views require
                    separate camera images or connected camera feeds.
                </div>
            ` : ""}
        </div>

        ${renderMachineResult()}
    `;
}

/* =====================================================
   MACHINE PROCESSING
   ===================================================== */

function getCameraLabel(camera) {
    if (camera === "all") return "All Cameras · Combined Analysis";

    return state.selectedFloor === 5
        ? `Mess Camera ${camera}`
        : `Camera ${camera}`;
}

function renderCameraMetricGraph(view, compact = false) {
    const metrics = [
        { label: "Energy", value: view.energy, max: 100, unit: " MWh/day" },
        { label: "Carbon", value: view.carbon, max: 100, unit: " tCO₂e/day" },
        { label: "Equipment load", value: view.load, max: 100, unit: "%" },
        { label: "Efficiency", value: view.score, max: 100, unit: "/100" }
    ];

    return `
        <div class="feature-card" style="min-width:0;padding:15px">
            <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:12px">
                <h3 style="margin:0;font-size:13px">${escapeHTML(view.label)} · Performance</h3>
                <span class="tag">Demo graph</span>
            </div>
            <div style="display:grid;gap:12px">
                ${metrics.map(metric => {
                    const percentage = Math.max(0, Math.min(100, Number(metric.value) / metric.max * 100));
                    return `
                        <div>
                            <div style="display:flex;justify-content:space-between;gap:8px;font-size:10px;margin-bottom:5px">
                                <span style="color:#718073">${metric.label}</span>
                                <strong style="color:#20372a">${Number(metric.value).toFixed(metric.label === "Energy" || metric.label === "Carbon" ? 1 : 0)}${metric.unit}</strong>
                            </div>
                            <div style="height:8px;background:#edf1e9;border-radius:99px;overflow:hidden">
                                <div style="height:100%;width:${percentage}%;background:#66815a;border-radius:99px;transition:width .7s ease"></div>
                            </div>
                        </div>`;
                }).join("")}
            </div>
        </div>`;
}

function renderFloorSummaryGraph(views) {
    const maxEnergy = Math.max(1, ...views.map(view => view.energy));
    return `
        <div class="panel" style="margin-top:16px;padding:18px">
            <div class="panel-title">
                <div><h3>Floor summary · Camera comparison</h3>
                <p>Energy consumption across all four camera views</p></div>
                <span class="tag">4 cameras</span>
            </div>
            <div style="display:grid;gap:13px;margin-top:16px">
                ${views.map(view => `
                    <div>
                        <div style="display:flex;justify-content:space-between;gap:10px;font-size:11px;margin-bottom:6px">
                            <span>${escapeHTML(view.label)}</span>
                            <strong>${view.energy.toFixed(1)} MWh/day</strong>
                        </div>
                        <div style="height:13px;background:#edf1e9;border-radius:99px;overflow:hidden">
                            <div style="height:100%;width:${Math.max(2, view.energy / maxEnergy * 100)}%;background:#874b43;border-radius:99px;transition:width .7s ease"></div>
                        </div>
                    </div>`).join("")}
            </div>
            <div class="note" style="margin-top:15px;margin-bottom:0">All values are illustrative demo data, not live factory measurements.</div>
        </div>`;
}

function renderProcessingPanel() {
    const processing = state.processing;
    if (!processing || processing.floor !== state.selectedFloor) return "";
    const stages = ["Initializing camera…", "Inspecting image using computer vision…", "Preparing sustainability analysis…"];
    return `
        <div id="machineResult" class="panel" style="margin-top:20px;text-align:center;padding:28px 18px">
            <div style="width:54px;height:54px;border:4px solid #e6ece2;border-top-color:#52654a;border-radius:50%;margin:0 auto 17px;animation:ecoSpin .85s linear infinite"></div>
            <div class="eyebrow">SMART SCAN IN PROGRESS</div>
            <h3 style="font-size:18px;margin:8px 0">Processing camera ${processing.camera === "all" ? "views" : "image"}</h3>
            <p style="color:#718073;font-size:12px;margin:0 0 18px">Please wait while the demo analysis is prepared.</p>
            <div style="display:grid;gap:10px;max-width:420px;margin:0 auto;text-align:left">
                ${stages.map((stage, index) => `
                    <div style="display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:9px;background:${index <= processing.stage ? "#f0f5ec" : "#f8f9f6"};color:${index <= processing.stage ? "#52654a" : "#9aa49a"};font-size:11px;font-weight:700">
                        <span style="width:22px;height:22px;display:grid;place-items:center;border-radius:50%;background:${index < processing.stage ? "#52654a" : index === processing.stage ? "#dce7d5" : "#e9ede6"};color:${index < processing.stage ? "white" : "#52654a"}">${index < processing.stage ? "✓" : index + 1}</span>
                        ${stage}
                    </div>`).join("")}
            </div>
            <p style="font-size:10px;color:#9aa49a;margin:17px 0 0">Prototype simulation — not a live AI inference result</p>
            <style>@keyframes ecoSpin{to{transform:rotate(360deg)}}</style>
        </div>`;
}

async function processCameraCapture(camera) {
    const token = ++state.processingToken;
    state.selectedCamera = camera;
    state.lastResult = null;
    state.processing = {
        camera,
        floor: state.selectedFloor,
        stage: 0,
        startedAt: Date.now()
    };
    renderApp();
    scrollToMachineResult();

    const wait = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));
    await wait(750);
    if (token !== state.processingToken) return;
    state.processing.stage = 1;
    renderApp();
    scrollToMachineResult();

    await wait(1000);
    if (token !== state.processingToken) return;
    state.processing.stage = 2;
    renderApp();
    scrollToMachineResult();

    await wait(650);
    if (token !== state.processingToken) return;

    const cameraNumbers = camera === "all" ? [1, 2, 3, 4] : [Number(camera)];
    const results = cameraNumbers.map(number => {
        const reading = factoryReadings[state.selectedFloor][number - 1];
        const equipment = equipmentByFloor[state.selectedFloor].map(
            ([name, confidence], index) => ({
                name,
                confidence: Math.max(65, Math.min(99, confidence - (number - 1) * 2 + (index % 2)))
            })
        );
        return {
            camera: number,
            label: getCameraLabel(String(number)),
            image: currentCameraImage(number),
            energy: reading.energy,
            carbon: reading.carbon,
            score: reading.score,
            load: reading.load,
            workers: reading.workers,
            temperature: reading.temperature,
            equipment
        };
    });
    const sum = key => results.reduce((total, item) => total + item[key], 0);
    state.processing = null;
    state.lastResult = {
        floor: state.selectedFloor,
        areaName: currentAreaName(),
        cameraLabel: getCameraLabel(camera),
        energy: sum("energy"),
        carbon: sum("carbon"),
        score: Math.round(sum("score") / results.length),
        load: Math.round(sum("load") / results.length),
        workers: sum("workers"),
        temperature: Math.round(sum("temperature") / results.length),
        views: results,
        processedAt: new Date().toLocaleTimeString()
    };
    renderApp();
    notify(camera === "all"
        ? "All camera views finished simulated processing."
        : `${getCameraLabel(camera)} finished simulated processing.`);
    scrollToMachineResult();
}

function scrollToMachineResult() {
    const output = $("#machineResult");
    if (output) output.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* =====================================================
   RESULT CARDS: ENERGY, EMISSIONS, WORKERS, TEMPERATURE
   ===================================================== */

function renderMachineResult() {
    if (state.processing && state.processing.floor === state.selectedFloor) {
        return renderProcessingPanel();
    }

    const result = state.lastResult;

    if (!result || result.floor !== state.selectedFloor) {
        return `
            <div id="machineResult" class="panel" style="margin-top:20px">
                <div style="display:flex;gap:14px;align-items:flex-start">
                    <div class="metric-icon mgreen">⚙</div>
                    <div>
                        <h3 style="margin:2px 0 7px;font:800 14px Manrope,sans-serif">
                            3. Machine analysis
                        </h3>
                        <p class="muted">
                            Select a camera or All Cameras above to generate the
                            simulated analysis results.
                        </p>
                    </div>
                </div>
            </div>
        `;
    }

    const equipmentList = [];

    result.views.forEach(view => {
        view.equipment.forEach(item => {
            if (!equipmentList.some(old => old.name === item.name)) {
                equipmentList.push(item);
            }
        });
    });

    return `
        <div id="machineResult" class="panel" style="margin-top:20px">
            <div class="panel-title">
                <div>
                    <div class="eyebrow">MACHINE PROCESSING RESPONSE</div>
                    <h3 style="font-size:17px;margin-top:7px">
                        Photo successfully sent to the machine
                    </h3>
                    <p>${escapeHTML(result.areaName)} · ${escapeHTML(result.cameraLabel)}</p>
                </div>
                <span class="tag">Demo completed</span>
            </div>

            <div class="note" style="margin-top:0;margin-bottom:18px">
                <strong>Simulated processing:</strong>
                the values below are generated by this prototype.
                No live camera capture, real sensor reading or backend transmission occurred.
                <span style="display:block;margin-top:6px">${escapeHTML(result.processedAt)}</span>
            </div>

            <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(155px,1fr));gap:12px">

                <div class="feature-card">
                    <div class="metric-icon mgreen">⚡</div>
                    <h3>Energy consumption</h3>
                    <p style="font-size:20px;font-weight:800;color:#20372a">
                        ${result.energy.toFixed(1)}
                    </p>
                    <p>MWh/day · Demo estimate</p>
                </div>

                <div class="feature-card">
                    <div class="metric-icon mblue">🌍</div>
                    <h3>Carbon emissions</h3>
                    <p style="font-size:20px;font-weight:800;color:#20372a">
                        ${result.carbon.toFixed(1)}
                    </p>
                    <p>tCO₂e/day · Demo estimate</p>
                </div>

                <div class="feature-card">
                    <div class="metric-icon morange">👷</div>
                    <h3>Workers in area</h3>
                    <p style="font-size:20px;font-weight:800;color:#20372a">
                        ${result.workers}
                    </p>
                    <p>${result.views.length > 1
                        ? "Combined example count across views"
                        : "Example people count"}</p>
                </div>

                <div class="feature-card">
                    <div class="metric-icon mpurple">🌡</div>
                    <h3>Area temperature</h3>
                    <p style="font-size:20px;font-weight:800;color:#20372a">
                        ${result.temperature}°C
                    </p>
                    <p>Example temperature sensor</p>
                </div>

                <div class="feature-card">
                    <div class="metric-icon mgreen">⚙</div>
                    <h3>Equipment load</h3>
                    <p style="font-size:20px;font-weight:800;color:#20372a">
                        ${result.load}%
                    </p>
                    <p>Illustrative load indicator</p>
                </div>

                <div class="feature-card">
                    <div class="metric-icon mblue">🌱</div>
                    <h3>Efficiency score</h3>
                    <p style="font-size:20px;font-weight:800;color:#20372a">
                        ${result.score}/100
                    </p>
                    <p>Illustrative score</p>
                </div>

            </div>

            ${result.views.length > 1 ? `
                <div style="margin-top:23px">
                    <div class="panel-title">
                        <div><h3>Camera-by-camera results</h3>
                        <p>Example breakdown of the four views</p></div>
                        <span class="tag">4 views</span>
                    </div>

                    <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px">
                        ${result.views.map(view => `
                            <div class="feature-card">
                                <img src="${view.image}" alt="${escapeHTML(view.label)}"
                                    style="width:100%;height:95px;object-fit:cover;border-radius:8px">

                                <h3>${escapeHTML(view.label)}</h3>

                                <div class="detail-line">
                                    <span>Energy</span>
                                    <strong>${view.energy.toFixed(1)} MWh/day</strong>
                                </div>

                                <div class="detail-line">
                                    <span>Emissions</span>
                                    <strong>${view.carbon.toFixed(1)} t/day</strong>
                                </div>

                                <div class="detail-line">
                                    <span>Workers</span>
                                    <strong>${view.workers}</strong>
                                </div>

                                <div class="detail-line">
                                    <span>Temperature</span>
                                    <strong>${view.temperature}°C</strong>
                                </div>
                            </div>
                        `).join("")}
                    </div>

                    <div style="margin-top:18px">
                        <div class="panel-title">
                            <div><h3>Individual camera performance graphs</h3>
                            <p>Each camera is visualized separately</p></div>
                        </div>
                        <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px">
                            ${result.views.map(view => renderCameraMetricGraph(view)).join("")}
                        </div>
                    </div>
                    ${result.views.length === 4 ? renderFloorSummaryGraph(result.views) : ""}

                    <div class="note">
                        Combined worker count sums the four illustrative camera counts.
                        In an actual multi-camera deployment, overlapping views would
                        need person tracking and deduplication to avoid counting the
                        same worker more than once.
                    </div>
                </div>
            ` : `
                <div style="margin-top:18px">
                    <div class="panel-title">
                        <div><h3>Camera performance graph</h3>
                        <p>Illustrative metrics for this camera</p></div>
                    </div>
                    ${renderCameraMetricGraph(result.views[0])}
                </div>
                <div style="margin-top:23px">
                    <div class="panel-title">
                        <div><h3>Selected camera view</h3>
                        <p>Reference image for the selected camera</p></div>
                    </div>

                    <img src="${result.views[0].image}" alt="${escapeHTML(result.views[0].label)}"
                        style="display:block;width:100%;max-height:300px;object-fit:contain;border-radius:10px;background:#f5f8f3">

                    <p class="muted">
                        ${result.floor === 5
                            ? "Food Mess reference photo."
                            : "Simulated camera segment from the supplied floor overview photo."}
                    </p>
                </div>
            `}

            <div style="margin-top:23px">
                <div class="panel-title">
                    <div>
                        <h3>Visual equipment labels</h3>
                        <p>Preconfigured demo labels — not real model detections</p>
                    </div>
                </div>

                ${equipmentList.slice(0, 8).map(item => `
                    <div style="padding:11px 0;border-bottom:1px solid #edf1e9">
                        <div style="display:flex;justify-content:space-between;gap:12px;font-size:10px;margin-bottom:7px">
                            <strong>${escapeHTML(item.name)}</strong>
                            <span style="color:#4b8055;font-weight:800">${item.confidence}%</span>
                        </div>
                        <div class="progress-track">
                            <div class="progress-fill" style="width:${item.confidence}%"></div>
                        </div>
                    </div>
                `).join("")}
            </div>

            <div style="margin-top:22px">
                <div class="panel-title">
                    <div><h3>✦ Suggested efficiency actions</h3>
                    <p>Potential improvements to investigate</p></div>
                </div>

                ${(result.floor === 5 ? [
                    "Review lighting and ventilation requirements during unoccupied periods.",
                    "Inspect kitchen equipment schedules and avoid unnecessary idle operation.",
                    "Measure energy use across food preparation and dining periods."
                ] : [
                    "Compare motor and conveyor energy use during operating and idle periods.",
                    "Investigate elevated temperatures against the site's actual safe operating limits.",
                    "Measure electricity use and steel output to calculate actual energy per tonne."
                ]).map((tip, index) => `
                    <div style="display:flex;gap:12px;padding:12px 0;align-items:flex-start">
                        <div class="metric-icon mgreen" style="width:30px;height:30px;font-size:12px">
                            ${index + 1}
                        </div>
                        <p style="margin:4px 0 0;font-size:11px;line-height:1.8;color:#536658">
                            ${escapeHTML(tip)}
                        </p>
                    </div>
                `).join("")}
            </div>

            <div class="note">
                <strong>Prototype data notice:</strong>
                energy, carbon, worker counts, temperature, equipment labels and
                efficiency scores are illustrative preset values. They are not
                actual camera detections or sensor readings. Real worker counts
                need a validated counting model; real temperature values require
                connected sensors; carbon estimates require verified activity data
                and suitable emissions factors.
            </div>

            <button class="btn primary" data-go="Sustainability Reports" style="margin-top:16px">
                View sustainability reports →
            </button>
        </div>
    `;
}

/* =====================================================
   SMART SCAN
   ===================================================== */

function renderSmartScan() {
    return renderDigitalTwin();
}

/* =====================================================
   AI ASSISTANT
   ===================================================== */

function getAssistantAnswer(question) {
    const q = question.toLowerCase();
    const result = state.lastResult;

    if (q.includes("worker") || q.includes("people") || q.includes("count")) {
        if (result) {
            return `The current demonstration result for ${result.areaName}, ${result.cameraLabel}, shows ${result.workers} workers in the configured example data.\n\nThis is not a real detection. A trained people-counting model would be needed to estimate actual occupancy. With All Cameras, the prototype sums demo counts and does not remove duplicate people appearing in overlapping views.`;
        }

        return "Choose a camera in Smart Scan to view the configured worker-count example. Real counts require a trained and validated people-counting model.";
    }

    if (q.includes("temperature") || q.includes("hot") || q.includes("degree")) {
        if (result) {
            return `The current example temperature for ${result.areaName}, ${result.cameraLabel}, is ${result.temperature}°C.\n\nThis is preset demo data. A real temperature reading requires a connected temperature sensor.`;
        }

        return "Choose a camera in Smart Scan to view the example temperature. A real value requires a connected sensor.";
    }

    if (q.includes("carbon") || q.includes("footprint") || q.includes("emission")) {
        if (result) {
            return `The latest demonstration result for ${result.areaName}, ${result.cameraLabel}, shows ${result.carbon.toFixed(1)} tCO₂e/day as an illustrative estimate.\n\nThis is not a measured value. A real calculation requires verified electricity or fuel usage and appropriate emissions factors.`;
        }

        return "A factory carbon-footprint assessment should use verified electricity, fuel, process emissions and production records to calculate total emissions and carbon intensity per tonne of steel.";
    }

    if (q.includes("energy") || q.includes("electricity") || q.includes("power")) {
        return "Potential energy-efficiency actions include tracking motor and conveyor demand, reducing unnecessary idle operation, reviewing compressed-air systems and comparing energy use per tonne of steel. Verify savings with actual meter readings.";
    }

    if (q.includes("camera") || q.includes("scan") || q.includes("photo")) {
        return "Open Digital Twin or Smart Scan, select a floor, then choose Camera 1–4 or All Cameras. The prototype displays a simulated machine-processing message and preset example results. Real camera feeds and model inference are not connected.";
    }

    if (q.includes("digital twin") || q.includes("floor") || q.includes("machine")) {
        return "The XYZ Steel Factory Digital Twin contains Floors 1–4 and the fifth-floor Food Mess. Choose an area, then select a camera or All Cameras to explore the demo analysis.";
    }

    if (q.includes("recommend") || q.includes("improve") || q.includes("efficiency")) {
        return "Begin with verified baseline readings. Track energy use, production volume, temperature and downtime, then test one operational improvement at a time. Compare energy per tonne before and after the change.";
    }

    return "EcoVision demonstrates industrial sustainability monitoring through camera-area selection, illustrative equipment labels, energy indicators, carbon estimates, example worker counts and temperature readings. Connect real sensors and validated models before using the results for operational decisions.";
}

function sendAssistantMessage(question) {
    const text = question.trim();

    if (!text) {
        notify("Please enter or select a question.");
        return;
    }

    state.messages.push({ mine: true, text });

    state.messages.push({
        mine: false,
        text: getAssistantAnswer(text)
    });

    state.question = "";

    renderPageIntoMain();
}

function renderAI() {
    const suggestions = [
        "How can we reduce factory energy usage?",
        "How many workers are in the selected area?",
        "What is the current temperature?",
        "How is carbon footprint calculated?",
        "Explain the latest camera analysis"
    ];

    return `
        <div class="page-heading">
            <div>
                <div class="eyebrow">SMART COPILOT</div>
                <h1>AI Sustainability Assistant</h1>
                <p>Explore factory energy efficiency, temperature and carbon management.</p>
            </div>
        </div>

        <div class="grid columns">
            <div class="panel chat">
                <div class="panel-title">
                    <div><h3>✦ EcoVision Smart Copilot</h3>
                    <p>Factory sustainability guidance</p></div>
                    <span class="tag">Demo mode</span>
                </div>

                <div class="chat-messages">
                    ${state.messages.map(message => `
                        <div class="bubble ${message.mine ? "mine" : ""}">
                            ${escapeHTML(message.text)}
                        </div>
                    `).join("")}
                </div>

                <form class="chat-input" id="chatForm">
                    <input id="chatQuestion"
                        placeholder="Ask about energy, carbon, workers or temperature..."
                        autocomplete="off">
                    <button class="btn primary" type="submit">Send ↗</button>
                </form>

                <div class="note">
                    Predefined demonstration responses; a live language model is not connected.
                </div>
            </div>

            <div class="panel">
                <div class="panel-title">
                    <div><h3>Try a question</h3>
                    <p>Choose a factory sustainability topic.</p></div>
                </div>

                <div style="display:grid;gap:10px">
                    ${suggestions.map(question => `
                        <button type="button" class="quick-card"
                            data-question="${escapeHTML(question)}"
                            style="width:100%;background:white;color:#20372a">
                            <div class="metric-icon mgreen">✦</div>
                            <strong style="color:#20372a">${escapeHTML(question)}</strong>
                            <span style="margin-left:auto;color:#245c43">→</span>
                        </button>
                    `).join("")}
                </div>
            </div>
        </div>
    `;
}

/* =====================================================
   IMPACT SIMULATOR
   ===================================================== */

function renderSimulator() {
    const score = Math.round(
        state.energy * 0.45 +
        state.water * 0.30 +
        state.recycling * 0.25
    );

    const controls = [
        ["energy", "Energy reduction", state.energy],
        ["water", "Water reduction", state.water],
        ["recycling", "Resource recovery", state.recycling]
    ];

    return `
        <div class="page-heading">
            <div><div class="eyebrow">SCENARIO MODELLING</div>
            <h1>Industrial Impact Simulator</h1>
            <p>Explore hypothetical resource-efficiency improvements.</p></div>
        </div>

        <div class="grid columns">
            <div class="panel">
                <div class="panel-title">
                    <div><h3>Adjust the scenario</h3>
                    <p>Move sliders to model potential targets.</p></div>
                </div>

                ${controls.map(([key, label, value]) => `
                    <div class="range-row">
                        <div class="range-title">
                            <strong>${label}</strong>
                            <span id="${key}Value">${value}%</span>
                        </div>
                        <input type="range" min="0" max="50" value="${value}"
                            data-range="${key}" aria-label="${label}">
                        <div class="range-endpoints"><span>0%</span><span>50%</span></div>
                    </div>
                `).join("")}

                <button class="btn block" id="resetSimulator">Reset scenario</button>
            </div>

            <div class="impact-card">
                <span class="tag">DEMO SCENARIO</span>
                <div class="impact-number"><span id="impactScore">${score}</span><small>/100</small></div>
                <strong>Illustrative improvement score</strong>
                <p>This score is a simulation, not an audited environmental estimate.</p>

                <div class="detail-line"><span>Energy target</span><strong id="energySummary">${state.energy}%</strong></div>
                <div class="detail-line"><span>Water target</span><strong id="waterSummary">${state.water}%</strong></div>
                <div class="detail-line"><span>Resource recovery</span><strong id="recyclingSummary">${state.recycling}%</strong></div>

                <button class="btn" id="applyScenario" style="margin-top:20px">Apply scenario</button>
            </div>
        </div>
    `;
}

/* =====================================================
   REPORTS
   ===================================================== */

function exportReport() {
    const result = state.lastResult;

    const contents = [
        "ECOVISION — XYZ STEEL FACTORY",
        "INDUSTRIAL SUSTAINABILITY SUMMARY",
        `Reporting period: ${state.reportPeriod}`,
        `Generated: ${new Date().toLocaleDateString()}`,
        "",
        "ILLUSTRATIVE DEMO DATA — NOT LIVE MEASUREMENTS",
        "Energy consumed: 1,248 MWh",
        "Carbon emissions: 842 tCO2e",
        "Steel production: 328 tonnes",
        "Efficiency score: 86/100",
        "",
        result ? `Latest area: ${result.areaName}` : "",
        result ? `Camera selection: ${result.cameraLabel}` : "",
        result ? `Example energy: ${result.energy.toFixed(1)} MWh/day` : "",
        result ? `Example emissions: ${result.carbon.toFixed(1)} tCO2e/day` : "",
        result ? `Example workers: ${result.workers}` : "",
        result ? `Example temperature: ${result.temperature} C` : "",
        "",
        "All camera readings are preset illustrative values."
    ].join("\n");

    const blob = new Blob([contents], {
        type: "text/plain;charset=utf-8"
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "xyz-steel-factory-sustainability-report.txt";
    link.click();

    URL.revokeObjectURL(url);

    notify("Demo report downloaded.");
}

function renderReports() {
    const reports = [
        ["Factory overview", "Industrial sustainability"],
        ["Energy efficiency", "Electricity consumption"],
        ["Carbon emissions", "CO₂e estimates"],
        ["Production efficiency", "Energy per tonne"]
    ];

    return `
        <div class="page-heading">
            <div><div class="eyebrow">REPORTING WORKSPACE</div>
            <h1>Factory Sustainability Reports</h1>
            <p>Review industrial indicators and export the demo summary.</p></div>
            <button class="btn primary" data-export-report>↓ Export summary</button>
        </div>

        ${renderMetrics()}

        <div class="panel">
            <div class="panel-title">
                <div><h3>Available reports</h3>
                <p>Illustrative reporting categories</p></div>
                <select id="reportPeriod">
                    ${["Weekly", "Monthly", "Yearly"].map(period => `
                        <option ${state.reportPeriod === period ? "selected" : ""}>${period}</option>
                    `).join("")}
                </select>
            </div>

            <div class="table-wrap">
                <table>
                    <thead>
                        <tr><th>Report</th><th>Category</th><th>Period</th><th>Status</th><th>Action</th></tr>
                    </thead>
                    <tbody>
                        ${reports.map(([name, category]) => `
                            <tr>
                                <td>${name}</td>
                                <td>${category}</td>
                                <td>${state.reportPeriod}</td>
                                <td><span class="tag">Demo ready</span></td>
                                <td><button class="text-button" data-export-report>Export ↓</button></td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
            </div>
        </div>

        <div class="note">
            Use verified meter readings, production records and appropriate emissions
            factors for actual industrial carbon reporting.
        </div>
    `;
}

/* =====================================================
   EMPLOYEE / SUSTAINABILITY PAGES
   ===================================================== */

function renderResidentHome() {
    return `
        <div class="resident-banner">
            <div>
                <div class="eyebrow" style="color:#d0e4c9">XYZ STEEL FACTORY</div>
                <h1>Efficient operations. Lower emissions. 🌱</h1>
                <p>Explore industrial sustainability information and efficiency initiatives.</p>
            </div>
            <button class="btn" data-go="Sustainability">Explore →</button>
        </div>

        <div class="grid metrics-grid">
            ${[
                ["Factory efficiency", "86/100"],
                ["Energy indicator", "1,248 MWh"],
                ["Carbon indicator", "842 tCO₂e"],
                ["Current focus", "Efficiency"]
            ].map(([label, value]) => `
                <div class="metric-card">
                    <div class="metric-label">${label}</div>
                    <div class="metric-value" style="font-size:21px">${value}</div>
                    <div class="metric-foot">Illustrative information</div>
                </div>
            `).join("")}
        </div>

        <div class="grid columns">
            <div class="panel">
                <div class="panel-title"><div><h3>Industrial sustainability</h3>
                <p>Potential improvement areas</p></div></div>

                <div class="feature-card"><h3>⚡ Energy efficiency</h3><p>Track energy use against production volume.</p></div>
                <div style="height:10px"></div>
                <div class="feature-card"><h3>🌍 Carbon monitoring</h3><p>Use measured activity data for reliable emissions calculations.</p></div>
                <div style="height:10px"></div>
                <div class="feature-card"><h3>⚙ Equipment performance</h3><p>Inspect equipment utilisation and operating schedules.</p></div>
            </div>

            <div class="panel">
                <div class="panel-title"><div><h3>Factory notices</h3>
                <p>Illustrative operations updates</p></div>
                <button class="text-button" data-go="Factory Notices">See all →</button></div>
                ${notices.slice(0, 2).map(renderNotice).join("")}
            </div>
        </div>
    `;
}

function renderSustainability() {
    const features = [
        ["⚡", "Energy efficiency", "Compare electricity demand during active production and idle periods."],
        ["🏭", "Production intensity", "Measure energy per tonne using verified production figures."],
        ["🌍", "Carbon emissions", "Apply appropriate emissions factors to measured energy and fuel use."],
        ["⚙", "Equipment performance", "Review motor, conveyor and machinery operation."],
        ["🌡", "Temperature monitoring", "Use suitable installed sensors to measure actual area temperatures."],
        ["📊", "Measurement", "Maintain reliable baselines and track changes over time."]
    ];

    return `
        <div class="page-heading">
            <div><div class="eyebrow">FACTORY SUSTAINABILITY</div>
            <h1>Sustainability</h1>
            <p>Industrial practices that can support lower energy use and emissions.</p></div>
        </div>

        <div class="grid feature-grid">
            ${features.map(([icon, title, description]) => `
                <div class="feature-card">
                    <div class="metric-icon mgreen">${icon}</div>
                    <h3>${title}</h3>
                    <p>${description}</p>
                </div>
            `).join("")}
        </div>
    `;
}

function renderNotice(item) {
    return `
        <div class="announcement">
            <div class="announcement-top">
                <span>${escapeHTML(item.category)}</span>
                <time>${escapeHTML(item.date)}</time>
            </div>
            <h3>${escapeHTML(item.title)}</h3>
            <p>${escapeHTML(item.description)}</p>
        </div>
    `;
}

function renderNotices() {
    return `
        <div class="page-heading">
            <div><div class="eyebrow">FACTORY OPERATIONS</div>
            <h1>Factory Notices</h1>
            <p>Updates and reminders for XYZ Steel Factory.</p></div>
        </div>

        <div class="panel">
            <div class="panel-title"><div><h3>Recent notices</h3>
            <p>Illustrative operations updates</p></div></div>
            ${notices.map(renderNotice).join("")}
        </div>
    `;
}

/* =====================================================
   PAGE ROUTER
   ===================================================== */

function renderPage() {
    if (!isAdmin()) {
        if (state.page === "Sustainability") return renderSustainability();
        if (state.page === "Factory Notices") return renderNotices();
        return renderResidentHome();
    }

    switch (state.page) {
        case "Digital Twin":
            return renderDigitalTwin();
        case "Smart Scan":
            return renderSmartScan();
        case "AI Assistant":
            return renderAI();
        case "Impact Simulator":
            return renderSimulator();
        case "Sustainability Reports":
            return renderReports();
        default:
            return renderOverview();
    }
}

function renderPageIntoMain() {
    $("#mainContent").innerHTML = renderPage();
}

function renderApp() {
    if (!isAdmin()) {
        if (!residentPages.some(item => item[1] === state.page)) {
            state.page = "Factory Overview";
        }
    }

    renderNavigation();

    const title = state.scanMode && state.page === "Digital Twin"
        ? "Smart Scan · Camera Selection"
        : state.page;

    $("#pageHeading").textContent = title;
    $("#breadcrumb").textContent = `XYZ Steel Factory / ${title}`;

    $("#currentDate").textContent = new Date().toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "short",
            year: "numeric"
        }
    );

    $("#profileName").textContent = isAdmin()
        ? "Harsh Kubade"
        : "Factory Employee";

    $("#profileTitle").textContent = isAdmin()
        ? "Factory Administrator"
        : "Employee Portal";

    $("#profileAvatar").textContent = isAdmin() ? "HK" : "FE";

    $("#propertyRole").textContent = isAdmin()
        ? "Factory operations"
        : "Employee portal";

    /*
      This changes the static "Zen PG" property heading
      from the existing HTML without changing the login.
    */
    const propertyName = $(".property-chip strong");

    if (propertyName) {
        propertyName.textContent = "XYZ Steel Factory";
    }

    $("#helpBox").hidden = !isAdmin();

    renderPageIntoMain();
}

/* =====================================================
   CLICK EVENTS
   ===================================================== */

document.addEventListener("click", event => {
    const floorButton = event.target.closest("[data-floor]");

    if (floorButton) {
        state.processingToken += 1;
        state.processing = null;
        state.selectedFloor = Number(floorButton.dataset.floor);
        state.selectedCamera = null;
        state.lastResult = null;
        renderPageIntoMain();
        return;
    }

    const cameraButton = event.target.closest("[data-capture-camera]");

    if (cameraButton) {
        processCameraCapture(cameraButton.dataset.captureCamera);
        return;
    }

    const periodButton = event.target.closest("[data-period]");

    if (periodButton) {
        state.chartPeriod = periodButton.dataset.period;
        renderPageIntoMain();
        return;
    }

    const questionButton = event.target.closest("[data-question]");

    if (questionButton) {
        sendAssistantMessage(questionButton.dataset.question);
        return;
    }

    if (event.target.closest("[data-export-report]")) {
        exportReport();
        return;
    }

    if (event.target.id === "applyScenario") {
        notify("Demo scenario updated.");
        return;
    }

    if (event.target.id === "resetSimulator") {
        state.energy = 15;
        state.water = 12;
        state.recycling = 20;
        renderPageIntoMain();
    }
});

/* =====================================================
   CHAT FORM
   ===================================================== */

document.addEventListener("submit", event => {
    if (event.target.id === "chatForm") {
        event.preventDefault();
        sendAssistantMessage($("#chatQuestion").value);
    }
});

/* =====================================================
   REPORT PERIOD
   ===================================================== */

document.addEventListener("change", event => {
    if (event.target.id === "reportPeriod") {
        state.reportPeriod = event.target.value;
        renderPageIntoMain();
    }
});

/* =====================================================
   SIMULATOR SLIDERS
   ===================================================== */

document.addEventListener("input", event => {
    const key = event.target.dataset.range;

    if (!key) return;

    if (key === "energy") state.energy = Number(event.target.value);
    if (key === "water") state.water = Number(event.target.value);
    if (key === "recycling") state.recycling = Number(event.target.value);

    const score = Math.round(
        state.energy * 0.45 +
        state.water * 0.30 +
        state.recycling * 0.25
    );

    const values = {
        impactScore: score,
        energyValue: `${state.energy}%`,
        waterValue: `${state.water}%`,
        recyclingValue: `${state.recycling}%`,
        energySummary: `${state.energy}%`,
        waterSummary: `${state.water}%`,
        recyclingSummary: `${state.recycling}%`
    };

    Object.entries(values).forEach(([id, value]) => {
        const element = document.getElementById(id);

        if (element) {
            element.textContent = value;
        }
    });
});

/* =====================================================
   INITIALISE
   ===================================================== */

$("#appPage").hidden = true;
$("#loginPage").hidden = false;
$("#loginError").textContent = "";

console.log("EcoVision XYZ Steel Factory prototype loaded.");
