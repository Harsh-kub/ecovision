

import React, { useState } from "react";



const adminNav = [

  ["⌂", "Overview"],

  ["▦", "Digital Twin"],

  ["◎", "Smart Scan"],

  ["✦", "AI Assistant"],

  ["◈", "Impact Simulator"],

  ["▤", "Sustainability Reports"],

];



const metrics = [

  { icon: "⚡", label: "Energy consumption", value: "1,248", unit: "kWh", change: "↓ 8.4%", color: "green" },

  { icon: "💧", label: "Water usage", value: "8,420", unit: "L", change: "↓ 5.2%", color: "blue" },

  { icon: "♻", label: "Waste recycled", value: "76", unit: "%", change: "↑ 12.6%", color: "orange" },

  { icon: "🌱", label: "Eco score", value: "86", unit: "/100", change: "↑ 6.8%", color: "purple" },

];



const rooms = [

  { id: 1, name: "Room 101", type: "Single occupancy", occupants: 1, temperature: 24, energy: 3.2, water: 42, status: "Normal" },

  { id: 2, name: "Room 102", type: "Double occupancy", occupants: 2, temperature: 25, energy: 5.6, water: 76, status: "Normal" },

  { id: 3, name: "Room 103", type: "Double occupancy", occupants: 2, temperature: 27, energy: 6.8, water: 91, status: "Review" },

  { id: 4, name: "Room 104", type: "Single occupancy", occupants: 1, temperature: 23, energy: 2.9, water: 38, status: "Normal" },

  { id: 5, name: "Room 105", type: "Shared room", occupants: 3, temperature: 24, energy: 7.1, water: 105, status: "Normal" },

];



const announcements = [

  { tag: "ENERGY", date: "Today", title: "Switch off unused appliances", text: "Help Zen PG reduce unnecessary electricity use by switching off lights and appliances when leaving your room." },

  { tag: "WATER", date: "Yesterday", title: "Every drop makes a difference", text: "Please report leaking taps to the property administrator so they can be fixed promptly." },

  { tag: "COMMUNITY", date: "October 7", title: "Our weekly green initiative", text: "Help keep shared spaces clean and separate recyclable waste." },

];



const css = `

@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap');

:root{font-family:'DM Sans',sans-serif;color:#21382d;background:#f6f8f4;--green:#245c43;--dark:#194630;--line:#e7eee5;--muted:#87948b}

*{box-sizing:border-box}

body{margin:0;min-width:320px;background:#f6f8f4}

button,input,select{font:inherit}

button{cursor:pointer}

button:focus-visible,input:focus-visible,select:focus-visible{outline:3px solid #b6d8bc;outline-offset:2px}

button:disabled{opacity:.5;cursor:not-allowed}

.brand{display:flex;align-items:center;gap:11px;font:800 22px Manrope,sans-serif;letter-spacing:-.7px}

.brand-icon{width:42px;height:42px;border-radius:14px;background:var(--green);color:white;display:grid;place-items:center;font-size:24px;box-shadow:0 5px 14px #245c4320}

.brand small{display:block;font:700 9px 'DM Sans',sans-serif;letter-spacing:1.8px;color:#829187;margin-top:3px}

.btn{border:0;border-radius:10px;padding:12px 16px;font-size:11px;font-weight:800;display:inline-flex;align-items:center;justify-content:center;gap:8px;transition:transform .2s,background .2s,box-shadow .2s}

.btn:hover{transform:translateY(-2px)}

.primary{background:var(--green);color:white;box-shadow:0 5px 13px #245c4320}

.primary:hover{background:var(--dark)}

.secondary{background:#edf4eb;color:var(--green)}

.outline{background:white;border:1px solid #e1e8df;color:var(--green)}

.block{width:100%;margin-top:7px}

.muted{color:var(--muted);font-size:12px;line-height:1.8}

.eyebrow{font-size:10px;letter-spacing:1.8px;font-weight:800;color:#608369}

.login{min-height:100vh;display:grid;grid-template-columns:1fr 1fr;background:white}

.login-left{padding:35px 8%;display:flex;flex-direction:column;justify-content:space-between}

.login-content{max-width:420px;width:100%;margin:45px auto}

.login-content h1{font:800 39px/1.2 Manrope,sans-serif;letter-spacing:-1.7px;margin:16px 0 12px;color:#20382b}

.login-content>.muted{font-size:13px;margin-bottom:27px}

.field{display:flex;flex-direction:column;gap:8px;margin:17px 0}

.field label{font-size:12px;font-weight:700;color:#41564a}

.field input,.field select{width:100%;padding:13px;border:1px solid #e1e8df;border-radius:10px;background:#fbfcfa;color:#21382d}

.field input:focus,.field select:focus{border-color:#7eaa8b;box-shadow:0 0 0 3px #e6f2e7;outline:none}

.password{position:relative}

.password input{padding-right:65px}

.password button{position:absolute;right:10px;top:50%;transform:translateY(-50%);border:0;background:transparent;color:var(--green);font-size:11px;font-weight:700}

.login-footer{font-size:10px;color:#9aa59d}

.login-art{padding:9%;display:flex;align-items:center;background:radial-gradient(circle at 80% 15%,#60916b,transparent 34%),linear-gradient(145deg,#1b4934,#143a2b 65%,#102e23);color:white;position:relative;overflow:hidden}

.login-art:before,.login-art:after{content:"";position:absolute;border:1px solid #ffffff15;border-radius:50%;width:470px;height:470px;right:-180px;top:-180px}

.login-art:after{width:650px;height:650px;right:-270px;top:-270px}

.login-art-content{position:relative;z-index:1;max-width:500px;width:100%;margin:auto}

.login-art h2{font:800 clamp(34px,4vw,52px)/1.15 Manrope,sans-serif;letter-spacing:-1.8px;margin:18px 0}

.login-art p{font-size:13px;color:#d0e0d3;line-height:1.8}

.art-card{height:225px;margin-top:30px;position:relative;overflow:hidden;border:1px solid #ffffff22;border-radius:20px;background:linear-gradient(150deg,#ffffff0b,#ffffff02)}

.sun{position:absolute;right:15%;top:28px;width:62px;height:62px;border-radius:50%;background:#d9e7b2;box-shadow:0 0 45px #d9e7b255}

.hill{position:absolute;bottom:-75px;width:130%;height:160px;border-radius:50% 50% 0 0}

.hill-a{left:-15%;background:#719b73;transform:rotate(-7deg)}

.hill-b{right:-20%;background:#3c7552;transform:rotate(8deg)}

.art-caption{position:absolute;bottom:18px;left:20px;font-size:10px;letter-spacing:1px;font-weight:800}

.shell{display:flex;min-height:100vh}

.sidebar{width:245px;flex:0 0 245px;background:white;border-right:1px solid var(--line);padding:23px 15px;display:flex;flex-direction:column;min-height:100vh}

.sidebar .brand{padding:0 8px 27px;font-size:19px}

.sidebar .brand-icon{width:38px;height:38px}

.property{display:flex;align-items:center;gap:10px;padding:12px;margin:0 3px 25px;border:1px solid #edf1e9;border-radius:12px;background:#f7f9f5}

.property-icon{width:37px;height:37px;display:grid;place-items:center;border-radius:10px;background:#e2eee2;color:var(--green);font-size:19px}

.property strong{display:block;font-size:12px}

.property small{display:block;font-size:10px;color:#93a096;margin-top:4px}

.nav-label{padding:0 11px 11px;color:#a1aba2;font-size:9px;letter-spacing:1.5px;font-weight:800}

.nav-list{display:grid;gap:5px}

.nav-item{width:100%;display:flex;align-items:center;gap:13px;padding:12px;border:0;border-radius:10px;background:transparent;text-align:left;color:#77867b;font-size:12px;font-weight:600;transition:background .2s,color .2s,transform .2s}

.nav-item:hover{background:#f5f8f3;color:var(--green);transform:translateX(2px)}

.nav-item.active{background:#eaf2e8;color:var(--green);font-weight:800}

.nav-icon{width:20px;text-align:center;font-size:17px}

.sidebar-bottom{margin-top:auto}

.help-card{padding:15px;margin:20px 3px;background:#f6f8f3;border:1px solid #edf1e9;border-radius:12px}

.help-card strong{font-size:11px}

.help-card p{font-size:10px;color:#8c9a8f;line-height:1.7}

.help-card button,.text-link{border:0;background:transparent;color:var(--green);font-size:10px;font-weight:800;padding:4px}

.user-card{display:flex;align-items:center;gap:10px;border-top:1px solid var(--line);padding:17px 5px 0}

.avatar{width:36px;height:36px;flex-shrink:0;border-radius:50%;display:grid;place-items:center;background:linear-gradient(135deg,#5e8b6b,#214b36);color:white;font-size:11px;font-weight:800}

.user-info{flex:1;min-width:0}

.user-info strong{display:block;font-size:11px}

.user-info small{display:block;font-size:10px;color:#95a197;margin-top:4px}

.logout{border:0;background:transparent;color:#829087;font-size:17px}

.main{flex:1;min-width:0}

.topbar{min-height:80px;display:flex;align-items:center;justify-content:space-between;gap:12px;padding:16px 32px;background:white;border-bottom:1px solid var(--line)}

.breadcrumb{font-size:10px;color:#9ba69d;margin-bottom:5px}

.topbar h2{margin:0;font:800 18px Manrope,sans-serif}

.top-actions{display:flex;align-items:center;gap:12px}

.date-chip{font-size:10px;color:#829087;padding:9px 12px;border:1px solid var(--line);border-radius:9px}

.content{max-width:1600px;margin:auto;padding:28px 32px 45px}

.welcome{display:flex;align-items:flex-end;justify-content:space-between;gap:15px;margin-bottom:24px}

.welcome h1,.page-title h1{font:800 25px Manrope,sans-serif;letter-spacing:-.9px;margin:9px 0}

.welcome p,.page-title p{margin:0;color:#8b998e;font-size:12px;line-height:1.7}

.grid{display:grid;gap:16px}

.metrics{grid-template-columns:repeat(4,minmax(0,1fr));margin-bottom:25px}

.metric{padding:18px;border:1px solid var(--line);border-radius:14px;background:white;transition:transform .2s,box-shadow .2s}

.metric:hover{transform:translateY(-3px);box-shadow:0 10px 25px #233d2910}

.metric-top{display:flex;align-items:center;justify-content:space-between;gap:8px}

.metric-icon{width:39px;height:39px;display:grid;place-items:center;border-radius:11px;font-size:18px;flex-shrink:0}

.green{background:#e9f3e7}.blue{background:#e8f3f9}.orange{background:#fbf0e3}.purple{background:#f0eafa}

.change{font-size:9px;font-weight:800;color:#4d9362;background:#eef7ed;padding:5px 7px;border-radius:6px}

.metric-label{margin:15px 0 8px;color:#8a988e;font-size:11px}

.metric-value{font:800 27px Manrope,sans-serif;letter-spacing:-.8px}

.metric-value small{font:600 11px 'DM Sans',sans-serif;color:#9aa69c;letter-spacing:0;margin-left:5px}

.metric-foot{font-size:9px;color:#a0aaa1;margin-top:8px}

.two-col{grid-template-columns:minmax(0,1.5fr) minmax(260px,1fr);margin-bottom:22px}

.panel{min-width:0;padding:20px;border:1px solid var(--line);border-radius:14px;background:white}

.section-heading{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:15px}

.section-heading h3{font:800 14px Manrope,sans-serif;margin:0}

.section-heading p{font-size:10px;color:#8b998e;line-height:1.6;margin:5px 0 0}

.tabs{display:flex;gap:4px;background:#f6f8f4;padding:3px;border-radius:8px}

.tabs button{border:0;background:transparent;padding:6px 9px;border-radius:6px;color:#8d9b90;font-size:9px}

.tabs button.active{background:white;color:var(--green);font-weight:800}

.chart-legend{display:flex;gap:15px;font-size:9px;color:#8d9a90;margin:15px 0}

.dot{display:inline-block;width:7px;height:7px;background:#477b57;border-radius:50%;margin-right:5px}

.chart{width:100%;height:190px}

.chart svg{width:100%;height:100%}

.chart text{fill:#9aa69c;font-size:9px}

.twin{height:225px;position:relative;overflow:hidden;border-radius:12px;background:linear-gradient(155deg,#eef5e9,#e3eee0);margin:13px 0}

.twin.large{height:355px}

.twin-label{position:absolute;left:15px;top:14px;font-size:9px;font-weight:800;letter-spacing:1px;color:#789276}

.building{position:absolute;left:25%;bottom:18px;width:51%;height:145px;border:3px solid #d5e1d0;border-bottom:5px solid #bdceb8;border-radius:7px 7px 2px 2px;background:linear-gradient(90deg,#e7f0e4,#f8fbf5);box-shadow:9px 11px 0 #cdddc8;transform:perspective(450px) rotateY(-8deg);transition:transform .3s}

.twin:hover .building{transform:perspective(450px) rotateY(-12deg) translateY(-3px)}

.large .building{height:220px;width:45%;left:28%}

.roof{position:absolute;top:-14px;left:-3px;width:calc(100% + 6px);height:17px;background:#a7c29f;border-radius:5px 5px 0 0}

.windows{display:grid;grid-template-columns:repeat(3,1fr);gap:9px;padding:17px 14px}

.large .windows{gap:13px;padding:24px 20px}

.window{height:25px;background:#b5d6c3;border:2px solid #d1e4d3;border-radius:3px}

.large .window{height:40px}

.door{position:absolute;bottom:0;left:43%;width:23px;height:38px;background:#9bb79b;border-radius:4px 4px 0 0}

.marker{position:absolute;z-index:2;width:34px;height:34px;border:0;border-radius:50%;background:white;box-shadow:0 4px 12px #315d3920;font-size:15px;transition:transform .2s}

.marker:hover{transform:scale(1.13)}

.m-energy{top:35px;left:17%}.m-water{top:90px;right:16%}.m-waste{bottom:35px;left:12%}

.large .m-energy{top:65px}.large .m-water{top:145px}.large .m-waste{bottom:50px}

.status{display:flex;justify-content:space-between;align-items:center;font-size:10px;color:#819084;gap:10px}

.pill{padding:6px 9px;border-radius:20px;background:#eaf5e9;color:#4d8458;font-size:9px;font-weight:800}

.insights{grid-template-columns:minmax(0,1.3fr) minmax(250px,1fr);margin-bottom:25px}

.ai-panel{background:linear-gradient(135deg,#204e38,#286145);color:white;border:0}

.ai-panel .section-heading h3{color:white}.ai-panel .section-heading p{color:#b7d2be}

.ai-badge{font-size:9px;color:#d6ebc6;border:1px solid #ffffff30;border-radius:6px;padding:5px 8px}

.insight{display:flex;gap:11px;padding:12px 0;border-top:1px solid #ffffff1c}

.insight-icon{width:30px;height:30px;flex-shrink:0;display:grid;place-items:center;border-radius:9px;background:#ffffff17}

.insight strong{display:block;font-size:11px;margin-bottom:5px}

.insight p{font-size:10px;color:#c3d9c9;line-height:1.6;margin:0}

.ai-panel .text-link{color:#d7edcf;margin-top:8px}

.progress-list{display:grid;gap:19px}

.progress-head{display:flex;justify-content:space-between;gap:8px;font-size:10px;margin-bottom:8px}

.progress-head span{color:#85958a}

.track{height:7px;background:#eef2ec;border-radius:10px;overflow:hidden}

.fill{height:100%;border-radius:10px;background:#5b9568}

.fill.blue{background:#76a9c0}.fill.orange{background:#d7a06b}.fill.purple{background:#9e8bc6}

.quick-grid{grid-template-columns:repeat(3,minmax(0,1fr))}

.quick{display:flex;align-items:center;gap:12px;text-align:left;padding:15px;border:1px solid var(--line);background:white;border-radius:12px;transition:transform .2s,border .2s}

.quick:hover{transform:translateY(-3px);border-color:#cddfcb}

.quick strong{display:block;font-size:11px}.quick small{display:block;color:#95a198;font-size:9px;margin-top:5px;line-height:1.5}

.page-title{margin-bottom:23px}.page-title h1{margin-top:0}

.feature-grid{grid-template-columns:repeat(3,minmax(0,1fr));margin:18px 0}

.feature{padding:19px;border:1px solid var(--line);border-radius:13px;background:white;transition:transform .2s,box-shadow .2s}

.feature:hover{transform:translateY(-3px);box-shadow:0 9px 22px #243d2910}

.feature-icon{width:42px;height:42px;display:grid;place-items:center;border-radius:12px;background:#eaf3e7;font-size:19px;margin-bottom:14px}

.feature h3{font:800 13px Manrope,sans-serif;margin:0 0 8px}

.feature p{font-size:11px;color:#8b998e;line-height:1.7;margin:0}

.detail-row{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:13px 0;border-bottom:1px solid #edf1e9;font-size:11px}

.detail-row:last-child{border-bottom:0}.detail-row span{color:#87968b}

.note{padding:13px;border-radius:10px;background:#f4f8f1;color:#788b7b;font-size:10px;line-height:1.7;margin-top:16px}

.chips{display:flex;flex-wrap:wrap;gap:8px;margin-top:15px}

.chip{border:1px solid #dfe9dc;background:white;color:#53745b;border-radius:20px;padding:8px 11px;font-size:10px;transition:background .2s}

.chip:hover{background:#edf5e9}

.floor-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px;margin:20px 0}

.floor-card{border:1px solid #e0e9dd;border-radius:15px;background:white;padding:17px 12px;text-align:center;transition:transform .22s,border .22s,box-shadow .22s}

.floor-card:hover{transform:translateY(-5px);border-color:#8fb391;box-shadow:0 10px 25px #244b2d12}

.floor-card.selected{border:2px solid var(--green);background:#f0f7ed}

.floor-visual{height:75px;border-radius:9px;background:#edf5e9;display:flex;align-items:center;justify-content:center;gap:4px;margin-bottom:12px;perspective:250px}

.floor-mini-room{height:34px;width:24px;border:2px solid #8fb18b;background:#d4e7d0;border-radius:3px;transition:transform .2s}

.floor-card:hover .floor-mini-room{transform:translateY(-3px)}

.floor-card strong{display:block;font-size:12px}

.floor-card small{display:block;color:#87968b;font-size:10px;margin-top:6px}

.room-plan{position:relative;padding:17px;background:linear-gradient(135deg,#eef5e9,#e4eee0);border-radius:15px;border:1px solid #dfe9da}

.room-plan-head{display:flex;justify-content:space-between;gap:10px;align-items:center;margin-bottom:16px}

.room-plan-head strong{font:800 14px Manrope,sans-serif}

.room-plan-head span{font-size:10px;color:#6e8a72}

.rooms-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:11px}

.room-tile{position:relative;min-height:145px;padding:13px;border:2px solid #d2dfcd;border-radius:10px;background:linear-gradient(145deg,#fff,#f7faf5);text-align:left;transition:transform .2s,box-shadow .2s,border .2s;overflow:hidden}

.room-tile:before{content:"";position:absolute;left:0;top:0;bottom:0;width:5px;background:#70a678}

.room-tile:hover{transform:translateY(-4px);box-shadow:0 8px 18px #23482a15;border-color:#75a77a}

.room-tile.selected{border-color:#245c43;background:#eaf5e6;box-shadow:0 0 0 2px #245c4315}

.room-tile.review:before{background:#d4a05d}

.room-number{font:800 12px Manrope,sans-serif;display:block}

.room-tile .room-icon{font-size:20px;display:block;margin:10px 0}

.room-tile small{display:block;font-size:9px;color:#819084;line-height:1.6}

.room-state{display:inline-block;margin-top:8px;font-size:9px;font-weight:800;color:#54845b}

.room-tile.review .room-state{color:#a16c2e}

.room-details{position:sticky;top:20px}

.room-detail-icon{width:48px;height:48px;border-radius:13px;background:#e7f1e4;display:grid;place-items:center;font-size:23px}

.floor-toolbar{display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;margin-bottom:17px}

.floor-toolbar select{padding:10px 12px;border:1px solid #dce7d8;border-radius:9px;background:white;color:#245c43;font-size:11px;font-weight:700}

.building-stage{padding:20px;border:1px solid #dce8d8;border-radius:17px;background:linear-gradient(155deg,#eef5e9,#e0ecdc);margin-bottom:22px;overflow:hidden}

.building-illustration{height:220px;position:relative;display:flex;align-items:center;justify-content:center;perspective:700px}

.building-block{width:min(75%,360px);height:150px;position:relative;transform:rotateX(5deg) rotateY(-10deg);transform-style:preserve-3d;transition:transform .45s}

.building-stage:hover .building-block{transform:rotateX(0deg) rotateY(-15deg) translateY(-4px)}

.building-front{position:absolute;inset:0;background:#f9fcf5;border:3px solid #aac5a5;display:grid;grid-template-columns:repeat(5,1fr);gap:5px;padding:10px;box-shadow:0 14px 0 #b5cdb0}

.building-window{background:#b8d9c1;border:2px solid #d2e5d0;border-radius:3px}

.building-side{position:absolute;top:0;right:-35px;width:35px;height:100%;background:#b6ceb0;transform:skewY(-30deg);transform-origin:left top;border-right:3px solid #9cb89a}

.building-roof{position:absolute;left:-5px;right:-40px;top:-24px;height:24px;background:#7fa77b;transform:skewX(-40deg);transform-origin:left bottom}

.building-door{position:absolute;bottom:0;left:44%;height:48px;width:30px;background:#95b495;border:2px solid #c5ddc0;border-bottom:0}

.building-ground{position:absolute;bottom:8px;left:10%;right:10%;height:2px;background:#b5cbb0}

.building-tag{position:absolute;top:10px;left:10px;font-size:9px;font-weight:800;letter-spacing:1px;color:#71916e}

.building-controls{display:flex;justify-content:center;gap:10px;flex-wrap:wrap}

.scan-drop{min-height:220px;border:1.5px dashed #cbdcc8;border-radius:14px;background:#f8faf6;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:24px}

.scan-drop h3{font:800 14px Manrope,sans-serif;margin:12px 0 6px}

.scan-drop p{font-size:11px;color:#8b998e;line-height:1.7}

.preview{max-width:100%;max-height:280px;object-fit:contain;display:block;margin:0 auto 14px;border-radius:10px}

.chat-panel{min-height:440px;display:flex;flex-direction:column}

.chat-head{display:flex;align-items:center;gap:12px;border-bottom:1px solid var(--line);padding-bottom:16px}

.chat-avatar{width:42px;height:42px;border-radius:13px;background:var(--green);color:white;display:grid;place-items:center;font-size:20px}

.chat-head h3{margin:0;font:800 13px Manrope,sans-serif}

.chat-head p{font-size:10px;color:#8b998e;margin:5px 0 0}

.messages{display:flex;flex-direction:column;gap:14px;padding:20px 0;flex:1}

.message{max-width:88%;padding:13px 15px;background:#f2f6ef;border-radius:4px 12px 12px 12px;font-size:11px;line-height:1.8;color:#4c6252;white-space:pre-wrap}

.message.user{align-self:flex-end;background:#245c43;color:white;border-radius:12px 4px 12px 12px}

.chat-input{display:flex;gap:8px;border-top:1px solid var(--line);padding-top:14px}

.chat-input input{flex:1;min-width:0;border:1px solid #e1e8df;background:#fbfcfa;padding:12px;border-radius:10px;font-size:11px}

.sim-control{padding:18px 0;border-bottom:1px solid #edf1e9}

.sim-control:last-child{border-bottom:0}

.sim-control-head{display:flex;justify-content:space-between;gap:10px;font-size:11px;margin-bottom:12px}

.sim-control-head span{color:var(--green);font-weight:800}

input[type=range]{width:100%;accent-color:#37744c}

.range-labels{display:flex;justify-content:space-between;color:#9aa69b;font-size:9px;margin-top:7px}

.impact{padding:24px;border-radius:14px;background:linear-gradient(145deg,#1f5038,#2c6948);color:white}

.impact h3{font:800 14px Manrope,sans-serif;margin-top:20px}

.impact p{font-size:11px;color:#c2d8c6;line-height:1.7}

.impact-number{font:800 40px Manrope,sans-serif;margin:18px 0 4px}

.impact-number small{font:600 12px 'DM Sans',sans-serif;color:#c6dfc9}

.impact-divider{border-top:1px solid #ffffff25;margin:20px 0}

.report-table{width:100%;border-collapse:collapse;text-align:left}

.report-table th{font-size:9px;color:#8d9b90;text-transform:uppercase;padding:13px 9px;border-bottom:1px solid #edf1e9}

.report-table td{font-size:11px;padding:14px 9px;border-bottom:1px solid #f0f3ed}

.report-status{padding:5px 8px;border-radius:20px;background:#eaf5e8;color:#4e8457;font-size:9px;font-weight:800}

.resident-banner{border-radius:16px;background:linear-gradient(115deg,#214f37,#4a7f53);color:white;padding:27px;display:flex;justify-content:space-between;align-items:center;gap:20px;margin-bottom:23px}

.resident-banner h1{font:800 25px Manrope,sans-serif;margin:10px 0}

.resident-banner p{font-size:11px;color:#d0e3d0;line-height:1.8;max-width:450px}

.resident-metric{padding:18px;border:1px solid var(--line);border-radius:13px;background:white}

.resident-metric small{color:#89978d;font-size:10px}

.resident-metric strong{display:block;font:800 24px Manrope,sans-serif;margin:10px 0 5px}

.resident-metric p{font-size:10px;color:#6d9b72;margin:0}

.announcement{padding:17px 0;border-bottom:1px solid #edf1e9}

.announcement:last-child{border-bottom:0}

.announcement-top{display:flex;justify-content:space-between;gap:10px;margin-bottom:8px}

.announcement-tag{font-size:9px;letter-spacing:.8px;color:#5e8b64;font-weight:800}

.announcement-date{font-size:9px;color:#a0aaa1}

.announcement h3{font:800 13px Manrope,sans-serif;margin:0 0 7px}

.announcement p{font-size:11px;line-height:1.7;color:#8b998e;margin:0}

.toast{position:fixed;z-index:30;bottom:22px;right:22px;max-width:350px;background:#1d4933;color:white;padding:13px 17px;border-radius:11px;font-size:11px;box-shadow:0 10px 30px #102e2330}

.footer-note{text-align:center;color:#a0aaa1;font-size:9px;margin-top:24px}

@media(max-width:1100px){.sidebar{width:220px;flex-basis:220px}.content{padding:24px 20px}.topbar{padding:16px 20px}.metrics{grid-template-columns:repeat(2,minmax(0,1fr))}.two-col,.insights{grid-template-columns:1fr}.room-details{position:static}}

@media(max-width:760px){.login{grid-template-columns:1fr}.login-art{display:none}.login-left{min-height:100vh;padding:25px 7%}.sidebar{width:65px;flex-basis:65px;padding:18px 7px}.sidebar .brand{padding:0 5px 23px}.sidebar .brand>div:last-child,.property>div:last-child,.nav-label,.nav-item span:not(.nav-icon),.help-card,.user-info,.logout{display:none}.property{justify-content:center;padding:7px;margin:0 0 20px}.nav-item{justify-content:center;padding:12px 4px}.user-card{justify-content:center;padding:14px 0 0}.topbar{padding:14px;min-height:70px}.topbar h2{font-size:15px}.content{padding:21px 13px 32px}.welcome{align-items:flex-start;flex-direction:column}.welcome h1,.page-title h1{font-size:21px}.metrics{gap:9px}.metric{padding:13px}.metric-value{font-size:23px}.metric-label{min-height:30px;line-height:1.5}.change{font-size:8px}.panel{padding:15px}.quick-grid,.feature-grid{grid-template-columns:1fr}.date-chip{display:none}.resident-banner{align-items:flex-start;flex-direction:column;padding:21px}.report-table th,.report-table td{padding:11px 5px;font-size:9px}.report-table th{font-size:8px}.floor-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.rooms-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.building-illustration{height:180px}.building-block{width:65%;height:115px}.building-side{right:-24px;width:24px}.building-roof{right:-28px}.room-tile{min-height:130px;padding:10px}.room-plan{padding:10px}}

`;



function Logo() {

  return <div className="brand"><div className="brand-icon">♧</div><div>EcoVision<small>SMART LIVING</small></div></div>;

}



function PageTitle({ title, description, children }) {

  return <div className="page-title"><div className="section-heading"><div><h1>{title}</h1><p>{description}</p></div>{children}</div></div>;

}



function MetricCards() {

  return <div className="grid metrics">{metrics.map((m) => (

    <div className="metric" key={m.label}>

      <div className="metric-top"><div className={`metric-icon ${m.color}`}>{m.icon}</div><span className="change">{m.change}</span></div>

      <div className="metric-label">{m.label}</div><div className="metric-value">{m.value}<small>{m.unit}</small></div>

      <div className="metric-foot">Illustrative demo indicator</div>

    </div>

  ))}</div>;

}



function Feature({ icon, title, text }) {

  return <div className="feature"><div className="feature-icon">{icon}</div><h3>{title}</h3><p>{text}</p></div>;

}



function ChartPanel() {

  const [period, setPeriod] = useState("Month");

  const data = period === "Week" ? [42,56,48,66,58,73,64] : period === "Year" ? [35,42,39,48,45,57,53,63,59,72,68,82] : [48,42,57,51,68,61,75,66,80,71,84,76];

  const points = data.map((v,i) => `${35+i*430/Math.max(1,data.length-1)},${160-v*1.35}`).join(" ");

  return <div className="panel">

    <div className="section-heading"><div><h3>Environmental performance</h3><p>Example resource efficiency trend</p></div>

      <div className="tabs">{["Week","Month","Year"].map((p) => <button key={p} className={period===p?"active":""} onClick={() => setPeriod(p)}>{p}</button>)}</div>

    </div>

    <div className="chart-legend"><span><i className="dot"/>Efficiency score</span><span>Target trend</span></div>

    <div className="chart"><svg viewBox="0 0 490 190" role="img" aria-label="Environmental performance chart">

      {[35,70,105,140,170].map((y) => <g key={y}><line x1="35" y1={y} x2="465" y2={y} stroke="#edf1eb" strokeDasharray="4 5"/><text x="22" y={y+3} textAnchor="end">{Math.max(0,Math.round((170-y)/1.35))}</text></g>)}

      <polyline points={points} fill="none" stroke="#477b57" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>

      {data.map((v,i) => <circle key={i} cx={35+i*430/Math.max(1,data.length-1)} cy={160-v*1.35} r="3.5" fill="white" stroke="#477b57" strokeWidth="2"/>)}

      {["Start","Midpoint","End"].map((label,i) => <text key={label} x={[35,250,465][i]} y="188" textAnchor={["start","middle","end"][i]}>{label}</text>)}

    </svg></div>

  </div>;

}



function Overview({ goTo, notify }) {

  return <>

    <div className="welcome"><div><div className="eyebrow">PROPERTY OVERVIEW</div><h1>Good afternoon, Harsh. 🌿</h1><p>Here is what's happening at <strong style={{color:"#54805d"}}>Zen PG</strong> today.</p></div><button className="btn primary" onClick={() => goTo("Sustainability Reports")}>＋ Generate report</button></div>

    <MetricCards/>

    <div className="grid two-col">

      <ChartPanel/>

      <div className="panel"><div className="section-heading"><div><h3>Property Digital Twin</h3><p>Interactive virtual property model</p></div><button className="text-link" onClick={() => goTo("Digital Twin")}>Explore →</button></div>

        <TwinBuilding onClick={() => goTo("Digital Twin")}/>

        <div className="status"><span>● Interactive model</span><span className="pill">Explore floors</span></div>

      </div>

    </div>

    <div className="grid insights">

      <div className="panel ai-panel"><div className="section-heading"><div><h3>AI-Powered Insights</h3><p>Ideas for a greener property</p></div><span className="ai-badge">✦ SMART INSIGHTS</span></div>

        <Insight icon="⚡" title="Optimise energy use" text="Review high-consumption periods and switch off idle appliances."/>

        <Insight icon="💧" title="Monitor water use" text="Check taps and shared washrooms regularly for leaks."/>

        <Insight icon="♻" title="Improve recycling" text="Clear bin labels can make waste segregation easier."/>

        <button className="text-link" onClick={() => goTo("AI Assistant")}>Open AI Assistant →</button>

      </div>

      <div className="panel"><div className="section-heading"><div><h3>Resource efficiency</h3><p>Illustrative performance indicators</p></div></div>

        <Progress label="Energy efficiency" value={82}/><Progress label="Water conservation" value={74} color="blue"/><Progress label="Waste recycling" value={76} color="orange"/><Progress label="Green living score" value={86} color="purple"/>

      </div>

    </div>

    <div className="section-heading"><div><h3>Quick actions</h3><p>Jump into a workspace</p></div></div>

    <div className="grid quick-grid">{[["◎","Smart Scan","Explore image workflows"],["◈","Impact Simulator","Model improvements"],["▤","Sustainability Reports","Export a demo summary"]].map(([icon,title,desc]) => <button key={title} className="quick" onClick={() => goTo(title)}><div className="metric-icon green">{icon}</div><div><strong>{title}</strong><small>{desc}</small></div></button>)}</div>

    <div className="footer-note">Demo environment · Metrics are illustrative, not live sensor readings.</div>

  </>;

}



function Insight({icon,title,text}) {

  return <div className="insight"><div className="insight-icon">{icon}</div><div><strong>{title}</strong><p>{text}</p></div></div>;

}



function Progress({label,value,color=""}) {

  return <div style={{marginBottom:17}}><div className="progress-head"><strong>{label}</strong><span>{value}%</span></div><div className="track"><div className={`fill ${color}`} style={{width:`${value}%`}}/></div></div>;

}



function TwinBuilding({ onClick }) {

  return <button onClick={onClick} aria-label="Open the Zen PG Digital Twin" style={{display:"block",width:"100%",border:0,padding:0,background:"transparent",textAlign:"left"}}>

    <div className="building-stage">

      <div className="building-tag">ZEN PG · VIRTUAL PROPERTY</div>

      <div className="building-illustration">

        <div className="building-block"><div className="building-roof"/><div className="building-side"/><div className="building-front">{Array.from({length:10},(_,i)=><div key={i} className="building-window"/>) }<div className="building-door"/></div></div>

      </div>

      <div className="building-controls"><span className="pill">4 floors</span><span className="pill">20 sample rooms</span></div>

    </div>

    <div className="status"><span>Explore your virtual building</span><strong style={{color:"#245c43"}}>Click to open →</strong></div>

  </button>;

}



function DigitalTwin() {

  const [floor,setFloor] = useState(null);

  const [room,setRoom] = useState(null);

  const [view,setView] = useState("building");



  function chooseFloor(number) {

    setFloor(number);

    setRoom(null);

    setView("rooms");

  }



  function backToFloors() {

    setRoom(null);

    setView("floors");

  }



  const selectedRoom = room ? rooms.find((item) => item.id === room) : null;



  return <>

    <PageTitle title="Interactive Digital Twin" description="Explore Zen PG as a virtual building, navigate its floors, and inspect individual rooms."/>

    {view === "building" && <>

      <div className="building-stage">

        <div className="building-tag">ZEN PG · VIRTUAL BUILDING MODEL</div>

        <div className="building-illustration" style={{height:280}}>

          <button onClick={() => setView("floors")} aria-label="Select a floor in the virtual building" className="building-block" style={{border:0,padding:0,background:"transparent",cursor:"pointer"}}>

            <div className="building-roof"/>

            <div className="building-side"/>

            <div className="building-front" style={{gridTemplateColumns:"repeat(5,1fr)",gridTemplateRows:"repeat(4,1fr)"}}>

              {Array.from({length:20},(_,i)=><div key={i} className="building-window" style={{background:i%5===2?"#d9e9d3":"#b8d9c1"}}/>)}

            </div>

            <div className="building-door"/>

          </button>

        </div>

        <div className="building-controls"><button className="btn primary" onClick={() => setView("floors")}>Explore Zen PG →</button></div>

      </div>

      <div className="grid feature-grid">

        <Feature icon="🏢" title="4 floors" text="Choose any floor to view its virtual layout."/>

        <Feature icon="🚪" title="5 rooms per floor" text="Select an individual room to inspect its sample data."/>

        <Feature icon="📊" title="Room-level data" text="Explore occupancy, temperature, energy, water, and room status."/>

      </div>

    </>}



    {view === "floors" && <>

      <div className="floor-toolbar"><div><h3 style={{font:"800 15px Manrope,sans-serif",margin:"0 0 5px"}}>Select a floor</h3><div className="muted">Choose the floor you want to explore.</div></div><button className="btn outline" onClick={() => setView("building")}>← Back to building</button></div>

      <div className="building-stage">

        <div className="building-tag">ZEN PG · FLOOR SELECTOR</div>

        <div className="building-illustration" style={{height:190}}>

          <div className="building-block" style={{width:"min(65%,330px)",height:120}}>

            <div className="building-roof"/>

            <div className="building-side"/>

            <div className="building-front" style={{gridTemplateColumns:"repeat(5,1fr)",gridTemplateRows:"repeat(2,1fr)"}}>{Array.from({length:10},(_,i)=><div key={i} className="building-window"/>)}</div>

          </div>

        </div>

      </div>

      <div className="floor-grid">

        {[1,2,3,4].map((number) => <button className={`floor-card ${floor===number?"selected":""}`} key={number} onClick={() => chooseFloor(number)}>

          <div className="floor-visual">{Array.from({length:5},(_,i)=><div key={i} className="floor-mini-room"/>)}</div>

          <strong>{["First","Second","Third","Fourth"][number-1]} Floor</strong><small>5 rooms · View floor plan</small>

        </button>)}

      </div>

    </>}



    {view === "rooms" && floor !== null && <>

      <div className="floor-toolbar">

        <div><div className="eyebrow">ZEN PG FLOOR PLAN</div><h3 style={{font:"800 18px Manrope,sans-serif",margin:"7px 0 5px"}}>{["First","Second","Third","Fourth"][floor-1]} Floor</h3><div className="muted">Top-down virtual floor plan · Select any room to view its data.</div></div>

        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}><button className="btn outline" onClick={backToFloors}>← Change floor</button><button className="btn secondary" onClick={() => {setView("building");setFloor(null);setRoom(null);}}>Building view</button></div>

      </div>

      <div className="grid two-col" style={{gridTemplateColumns:"minmax(0,1.35fr) minmax(260px,.85fr)"}}>

        <div className="room-plan">

          <div className="room-plan-head"><strong>Floor {floor} · Top-down view</strong><span>5 rooms</span></div>

          <div className="rooms-grid">

            {rooms.map((item) => <button key={item.id} onClick={() => setRoom(item.id)} className={`room-tile ${room===item.id?"selected":""} ${item.status==="Review"?"review":""}`}>

              <span className="room-number">{item.name.replace("10",String(floor))}</span>

              <span className="room-icon">🛏️</span>

              <small>{item.occupants} occupant{item.occupants===1?"":"s"}</small>

              <span className="room-state">● {item.status==="Review"?"Needs review":"Normal"}</span>

            </button>)}

            <div style={{gridColumn:"1 / -1",display:"flex",justifyContent:"center",padding:"8px 0 0",borderTop:"2px dashed #b5cbb0",fontSize:10,color:"#789276"}}>↔ Shared corridor · Floor {floor}</div>

          </div>

          <div className="note">Select any room above. Room readings are sample data for this prototype, not live sensor readings.</div>

        </div>

        <div className="panel room-details">

          {selectedRoom ? <>

            <div className="section-heading"><div><div className="eyebrow">ROOM DETAILS</div><h3 style={{marginTop:7}}>{selectedRoom.name.replace("10",String(floor))}</h3><p>{selectedRoom.type} · Floor {floor}</p></div><div className="room-detail-icon">🛏️</div></div>

            <div className="detail-row"><span>Occupancy</span><strong>{selectedRoom.occupants} resident{selectedRoom.occupants===1?"":"s"}</strong></div>

            <div className="detail-row"><span>Temperature</span><strong>{selectedRoom.temperature}°C</strong></div>

            <div className="detail-row"><span>Energy usage</span><strong>{selectedRoom.energy} kWh/day</strong></div>

            <div className="detail-row"><span>Water usage</span><strong>{selectedRoom.water} L/day</strong></div>

            <div className="detail-row"><span>Room status</span><span className="pill" style={selectedRoom.status==="Review"?{background:"#fbf0e3",color:"#a16c2e"}:{}}>{selectedRoom.status}</span></div>

            <div style={{marginTop:20}}><div className="section-heading"><div><h3>Room condition</h3><p>Illustrative sample readings</p></div></div>

              <Progress label="Energy efficiency" value={Math.max(30,Math.round(100-selectedRoom.energy*7))}/>

              <Progress label="Water efficiency" value={Math.max(25,Math.round(100-selectedRoom.water*.55))} color="blue"/>

              <Progress label="Comfort indicator" value={Math.max(30,100-Math.abs(selectedRoom.temperature-24)*10)} color="purple"/>

            </div>

            <button className="btn outline block" onClick={() => setRoom(null)}>Clear room selection</button>

          </> : <>

            <div className="room-detail-icon" style={{marginBottom:15}}>👆</div>

            <h3 style={{font:"800 15px Manrope,sans-serif"}}>Select a room</h3>

            <p className="muted">Click one of the five rooms in the floor plan to view its occupancy, temperature, energy usage, water usage, and status.</p>

            <div className="note">Each floor uses the same five-room demo layout. Room readings are illustrative and can be replaced with real property data later.</div>

          </>}

        </div>

      </div>

    </>}

  </>;

}



function SmartScan({ notify }) {

  const [image,setImage] = useState("");

  const [fileName,setFileName] = useState("");

  const [scanType,setScanType] = useState("Waste segregation");

  const [result,setResult] = useState("");



  function chooseImage(event) {

    const file = event.target.files?.[0];

    if(!file) return;

    if(!file.type.startsWith("image/")) {notify("Please choose a valid image.");return;}

    if(image) URL.revokeObjectURL(image);

    setImage(URL.createObjectURL(file));

    setFileName(file.name);

    setResult("");

  }



  function runDemo() {

    if(!image) {notify("Please choose an image first.");return;}

    setResult(`Image uploaded for ${scanType.toLowerCase()}. A production version could use a trained vision model to analyse this image. This prototype does not perform real image detection.`);

  }



  return <>

    <PageTitle title="Intelligent Scan Studio" description="Explore image-based environmental checks for property management."/>

    <div className="grid two-col">

      <div className="panel"><div className="section-heading"><div><h3>Upload an image</h3><p>Choose an image to explore the scanning workflow</p></div></div>

        {image ? <><img className="preview" src={image} alt="Selected scan preview"/><div className="detail-row"><span>Selected file</span><strong style={{overflowWrap:"anywhere"}}>{fileName}</strong></div><button className="btn outline" onClick={() => {URL.revokeObjectURL(image);setImage("");setFileName("");setResult("");}}>Remove image</button></> :

          <div className="scan-drop"><div className="metric-icon green" style={{width:55,height:55,fontSize:24}}>◎</div><h3>Choose an image</h3><p>Upload a photo of waste, a water fixture, or a green space.</p><label htmlFor="scan-file" className="btn primary">＋ Choose image</label><input id="scan-file" type="file" accept="image/*" onChange={chooseImage} style={{display:"none"}}/></div>}

        <div className="field"><label htmlFor="scan-type">Scan workflow</label><select id="scan-type" value={scanType} onChange={(e) => {setScanType(e.target.value);setResult("");}}><option>Waste segregation</option><option>Water leak check</option><option>Green space review</option></select></div>

        <button className="btn primary block" onClick={runDemo}>Explore scan workflow →</button>{result&&<div className="note">{result}</div>}

      </div>

      <div className="panel"><div className="section-heading"><div><h3>What Smart Scan could support</h3><p>Example applications for a future vision model</p></div></div>

        <Feature icon="♻" title="Waste segregation" text="Identify potential waste categories and guide correct disposal."/><div style={{height:12}}/>

        <Feature icon="💧" title="Water leak checks" text="Flag potentially concerning images for maintenance review."/><div style={{height:12}}/>

        <Feature icon="🌿" title="Green space review" text="Support visual reviews of shared outdoor areas."/>

        <div className="note">This prototype previews images and demonstrates the workflow. A trained model is required for actual detection.</div>

      </div>

    </div>

  </>;

}



function AIAssistant({notify}) {

  const [question,setQuestion] = useState("");

  const [messages,setMessages] = useState([{role:"assistant",text:"Hello, Harsh! 🌿 I'm your EcoVision Smart Copilot. Ask me about energy-saving ideas, water conservation, waste management, or greener living practices for Zen PG."}]);



  function answer(text) {

    const q=text.toLowerCase();

    if(q.includes("energy")||q.includes("electricity")||q.includes("power")) return "Here are three practical energy-saving ideas:\n\n1. Switch off lights and appliances in unoccupied rooms.\n2. Use efficient LED lighting where possible.\n3. Review energy usage over consistent periods to identify unnecessary consumption.\n\nVerify actual savings using measured energy data.";

    if(q.includes("water")||q.includes("leak")||q.includes("tap")) return "To conserve water at Zen PG:\n\n1. Check taps and visible pipes for leaks.\n2. Arrange repairs promptly.\n3. Encourage thoughtful water use.\n4. Compare meter readings over consistent periods.";

    if(q.includes("waste")||q.includes("recycl")||q.includes("plastic")) return "To improve waste management:\n\n1. Label wet and dry bins clearly.\n2. Follow local recycling rules.\n3. Put sorting instructions near shared bins.\n4. Review common sorting mistakes and improve signage.";

    if(q.includes("carbon")||q.includes("footprint")||q.includes("emission")) return "Start by measuring electricity use, identifying efficiency improvements, reducing avoidable waste, and tracking changes against a consistent baseline. A reliable carbon estimate requires actual activity data and suitable emission factors.";

    if(q.includes("scan")||q.includes("image")||q.includes("vision")) return "Open Smart Scan to upload an image and explore sample workflows for waste segregation, water leak checks, and green space reviews. A real vision model is not connected in this prototype.";

    if(q.includes("digital twin")||q.includes("twin")||q.includes("room")||q.includes("floor")) return "Open Digital Twin, select Zen PG, choose a floor, and click any of the five rooms to explore its sample occupancy, temperature, energy, water, and status data.";

    if(q.includes("report")||q.includes("dashboard")) return "Open Sustainability Reports to review the sample energy, water, recycling, and eco-score indicators. Real reports should use verified data and document measurement sources.";

    if(q.includes("hello")||q.includes("hi")||q.includes("hey")) return "Hi, Harsh! 👋 What would you like to explore: energy, water, waste management, carbon footprint, or the Digital Twin?";

    return "A good sustainability plan starts by identifying an issue, collecting reliable data, choosing a baseline, and testing practical improvements. At Zen PG, you could start with energy use, water conservation, waste segregation, or resident awareness.";

  }



  function send(text=question) {

    const clean=text.trim();

    if(!clean){notify("Please enter a question.");return;}

    setMessages((old)=>[...old,{role:"user",text:clean},{role:"assistant",text:answer(clean)}]);

    setQuestion("");

  }



  return <>

    <PageTitle title="AI Sustainability Assistant" description="Explore sustainability questions with the EcoVision Smart Copilot."/>

    <div className="grid two-col">

      <div className="panel chat-panel">

        <div className="chat-head"><div className="chat-avatar">✦</div><div><h3>EcoVision Smart Copilot</h3><p>Demo assistant · Sustainability guidance</p></div></div>

        <div className="messages">{messages.map((m,i)=><div key={i} style={{alignSelf:m.role==="user"?"flex-end":"flex-start",maxWidth:"100%"}}><div className={`message ${m.role==="user"?"user":""}`}>{m.text}</div><div style={{fontSize:9,color:"#9ca79d",marginTop:5,textAlign:m.role==="user"?"right":"left"}}>{m.role==="user"?"You":"EcoVision Smart Copilot"}</div></div>)}</div>

        <div className="chat-input"><input value={question} onChange={(e)=>setQuestion(e.target.value)} onKeyDown={(e)=>{if(e.key==="Enter")send();}} placeholder="Ask about sustainable living..."/><button className="btn primary" onClick={()=>send()}>Send ↗</button></div>

        <div className="muted" style={{fontSize:9}}>Predefined demo responses. A live language model is not connected.</div>

      </div>

      <div className="panel"><div className="section-heading"><div><h3>Try asking</h3><p>Select a topic to get started</p></div></div>

        <div className="chips">{["How can we save energy?","How can we save water?","Improve waste recycling","Explain carbon footprint","What is the Digital Twin?","How does Smart Scan work?"].map((q)=><button className="chip" key={q} onClick={()=>send(q)}>{q}</button>)}</div>

        <div className="note">A production version could connect a language model to trusted property data and sustainability guidelines.</div>

      </div>

    </div>

  </>;

}



function ImpactSimulator() {

  const [energy,setEnergy]=useState(15);

  const [water,setWater]=useState(12);

  const [waste,setWaste]=useState(20);

  const [residents,setResidents]=useState(50);

  const score=Math.round(energy*.45+water*.3+waste*.25);

  const controls=[["⚡ Energy reduction",energy,setEnergy,50],["💧 Water reduction",water,setWater,50],["♻ Recycling improvement",waste,setWaste,50],["🏠 Number of residents",residents,setResidents,200]];

  return <>

    <PageTitle title="Impact Simulator" description="Adjust example sustainability actions to explore potential improvements."/>

    <div className="grid two-col">

      <div className="panel"><div className="section-heading"><div><h3>Adjust your scenario</h3><p>Move the sliders to model potential changes</p></div></div>

        {controls.map(([label,value,set,max],i)=><div className="sim-control" key={label}><div className="sim-control-head"><strong>{label}</strong><span>{value}{i===3?"":"%"}</span></div><input type="range" min={i===3?10:0} max={max} step={i===3?5:1} value={value} onChange={(e)=>set(Number(e.target.value))}/><div className="range-labels"><span>{i===3?"10 residents":"0%"}</span><span>{i===3?"200 residents":"50%"}</span></div></div>)}

        <button className="btn outline block" onClick={()=>{setEnergy(15);setWater(12);setWaste(20);setResidents(50);}}>↺ Reset scenario</button>

      </div>

      <div style={{display:"grid",gap:16,alignContent:"start"}}><div className="impact"><span className="ai-badge">✦ SCENARIO SUMMARY</span><h3>Potential sustainability impact</h3><p>Illustrative results based on your selected targets.</p><div className="impact-number">{score}<small>/100</small></div><div style={{fontSize:10,color:"#c3d9c9"}}>Combined scenario score</div><div className="impact-divider"/>

        <div className="detail-row"><span>Potential energy reduction</span><strong>{Math.round(1248*energy/100).toLocaleString()} kWh</strong></div>

        <div className="detail-row"><span>Potential water reduction</span><strong>{Math.round(8420*water/100).toLocaleString()} L</strong></div>

        <div className="detail-row"><span>Recycling indicator</span><strong>{Math.min(100,Math.round(76+waste*.24))}%</strong></div>

      </div><div className="panel"><h3 style={{font:"800 14px Manrope,sans-serif"}}>Scenario details</h3><div className="detail-row"><span>Residents</span><strong>{residents}</strong></div><p className="muted">These figures are illustrative estimates, not verified predictions.</p></div></div>

    </div>

  </>;

}



function SustainabilityReports({notify}) {

  const [period,setPeriod]=useState("Monthly");

  const reports=[["🌿","Environmental overview","Performance summary"],["⚡","Energy efficiency","Energy indicator"],["💧","Water conservation","Water indicator"],["♻","Waste management","Recycling indicator"]];



  function exportReport() {

    const text=["EcoVision Sustainability Summary","Property: Zen PG",`Reporting period: ${period}`,"Report date: October 2026","","DEMO INDICATORS — NOT LIVE MEASUREMENTS","Energy consumption: 1,248 kWh","Water usage: 8,420 L","Waste recycled: 76%","Eco score: 86/100","","These values are illustrative, not verified sensor readings."].join("\n");

    const url=URL.createObjectURL(new Blob([text],{type:"text/plain;charset=utf-8"}));

    const link=document.createElement("a");

    link.href=url;

    link.download=`ecovision-${period.toLowerCase()}-summary.txt`;

    link.click();

    URL.revokeObjectURL(url);

    notify("Demo report downloaded.");

  }



  return <>

    <PageTitle title="Sustainability Reports" description="Review environmental indicators and export a demo summary."><button className="btn primary" onClick={exportReport}>↓ Export summary</button></PageTitle>

    <MetricCards/>

    <div className="panel"><div className="section-heading"><div><h3>Available reports</h3><p>Sample reports prepared for the demo</p></div><select value={period} onChange={(e)=>setPeriod(e.target.value)}><option>Weekly</option><option>Monthly</option><option>Yearly</option></select></div>

      <div style={{overflowX:"auto"}}><table className="report-table"><thead><tr><th>Report</th><th>Category</th><th>Period</th><th>Status</th><th>Action</th></tr></thead><tbody>{reports.map(([icon,name,category])=><tr key={name}><td>{icon} &nbsp;{name}</td><td>{category}</td><td>{period}</td><td><span className="report-status">Ready</span></td><td><button className="text-link" onClick={exportReport}>Export ↓</button></td></tr>)}</tbody></table></div>

    </div>

    <div className="grid feature-grid"><Feature icon="📊" title="Performance overview" text="Review example indicators across environmental categories."/><Feature icon="📁" title="Portable summaries" text="Export a simple text summary for your demonstration."/><Feature icon="✓" title="Transparent reporting" text="Keep sample data separate from verified measurements."/></div>

    <div className="note">All report figures are sample data for presentation purposes.</div>

  </>;

}



// Administrator-only prototype: Resident login and resident portal removed.
export default function App() {

  const [loggedIn,setLoggedIn]=useState(false);

  const [page,setPage]=useState("Overview");

  const [email,setEmail]=useState("");

  const [password,setPassword]=useState("");

  const [showPassword,setShowPassword]=useState(false);

  const [error,setError]=useState("");

  const [toast,setToast]=useState("");

  const currentNav = adminNav;



  function notify(message) {

    setToast(message);

    window.setTimeout(()=>setToast(""),3000);

  }



  function signIn(event) {

    event.preventDefault();

    if(!email.trim()||!email.includes("@")||!password.trim()) {

      setError("Enter a valid email address and password.");

      return;

    }

    setError("");

    setLoggedIn(true);

    setPage("Overview");

  }



  function goTo(nextPage) {

    setPage(nextPage);

    window.scrollTo({top:0,behavior:"smooth"});

  }



  function logout() {

    setLoggedIn(false);

    setPassword("");

    setPage("Overview");

  }



  function renderPage() {

    switch(page) {

      case "Digital Twin": return <DigitalTwin/>;

      case "Smart Scan": return <SmartScan notify={notify}/>;

      case "AI Assistant": return <AIAssistant notify={notify}/>;

      case "Impact Simulator": return <ImpactSimulator/>;

      case "Sustainability Reports": return <SustainabilityReports notify={notify}/>;

      default: return <Overview goTo={goTo} notify={notify}/>;

    }

  }



  if(!loggedIn) return <>

    <style>{css}</style>

    <div className="login">

      <div className="login-left">

        <Logo/>

        <div className="login-content">

          <div className="eyebrow">SMART PROPERTY MANAGEMENT</div>

          <h1>A greener home starts here.</h1>

          <p className="muted">Your workspace for environmental insights, smarter decisions, and sustainable living at Zen PG.</p>

          <form onSubmit={signIn}>

            <div className="field"><label htmlFor="login-email">Email address</label><input id="login-email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="you@example.com" autoComplete="username" required/></div>

            <div className="field"><label htmlFor="login-password">Password</label><div className="password"><input id="login-password" type={showPassword?"text":"password"} value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter your password" autoComplete="current-password" required/><button type="button" onClick={()=>setShowPassword(!showPassword)}>{showPassword?"Hide":"Show"}</button></div></div>

            <div className="field"><label>Sign in as</label><input value="Property Administrator" readOnly aria-label="Sign in as Property Administrator"/></div>

            {error&&<p style={{color:"#b74b40",fontSize:11}}>{error}</p>}

            <button className="btn primary block" type="submit">Enter EcoVision →</button>

          </form>

          <p className="muted" style={{fontSize:10,marginTop:16}}>Demo access: any valid email and a non-empty password.</p>

        </div>

        <div className="login-footer">© 2026 EcoVision · Zen PG · Sustainability demo</div>

      </div>

      <div className="login-art"><div className="login-art-content">

        <div className="eyebrow" style={{color:"#c1dfbd"}}>A SMARTER WAY TO LIVE</div>

        <h2>Small changes.<br/>Lasting impact.</h2>

        <p>Bring environmental awareness into everyday property management with an elegant sustainability workspace.</p>

        <div className="art-card"><div className="sun"/><div style={{position:"absolute",left:"15%",top:40,fontSize:44}}>🌿</div><div className="hill hill-a"/><div className="hill hill-b"/><div className="art-caption">THOUGHTFUL LIVING · BETTER TOMORROW</div></div>

        <p style={{fontSize:10,color:"#a8c4af"}}>A sustainability prototype for Zen PG.</p>

      </div></div>

    </div>

  </>;



  return <>

    <style>{css}</style>

    <div className="shell">

      <aside className="sidebar">

        <Logo/>

        <div className="property"><div className="property-icon">⌂</div><div><strong>Zen PG</strong><small>Administrator workspace</small></div></div>

        <div className="nav-label">ADMIN WORKSPACE</div>

        <nav className="nav-list">{currentNav.map(([icon,label])=><button key={label} className={`nav-item ${page===label?"active":""}`} onClick={()=>goTo(label)}><span className="nav-icon">{icon}</span><span>{label}</span></button>)}</nav>

        <div className="sidebar-bottom">

          <div className="help-card"><strong>🌿 Keep it sustainable</strong><p>Small everyday actions can help create a healthier shared environment.</p><button onClick={()=>goTo("AI Assistant")}>Explore tips →</button></div>

          <div className="user-card"><div className="avatar">HK</div><div className="user-info"><strong>Harsh Kubade</strong><small>Property Administrator</small></div><button className="logout" title="Sign out" onClick={logout}>↪</button></div>

        </div>

      </aside>

      <main className="main">

        <header className="topbar"><div><div className="breadcrumb">Zen PG › {page}</div><h2>{page}</h2></div><div className="top-actions"><div className="date-chip">◷ &nbsp; October 2026</div><button className="btn outline" title="Updates" onClick={()=>goTo("Sustainability Reports")}>♧</button><div className="avatar">HK</div></div></header>

        <div className="content">{renderPage()}</div>

      </main>

    </div>

    {toast&&<div className="toast" role="status">{toast}</div>}

  </>;

}
