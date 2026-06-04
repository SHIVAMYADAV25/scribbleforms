"use client";
import React, { useId } from "react";
import Link from "next/link";
import { useDashboardSummary, useCreateForm } from "~/hooks/api";
import  Sidebar  from "~/components/Sidebar";
import Image from "next/image";

/* ==========================================================================
   1. ORGANIC GENERATIVE HAND-DRAWN HELPER UTILITIES
   ========================================================================== */
function pseudorand(seed: number): number {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453123;
  return x - Math.floor(x);
}

interface PieSlice {
  label: string;
  value: number;
  color: string;
}

function generateWobblyCircle(cx: number, cy: number, radius: number, seed: number, wobble: number = 3.5): string {
  const points = 36;
  const angleStep = (Math.PI * 2) / points;
  let path = "";
  for (let pass = 0; pass < 3; pass++) {
    const curSeed = seed + pass * 22;
    const curWobble = wobble * (1.0 - pass * 0.25);
    for (let i = 0; i <= points; i++) {
      const angle = i * angleStep;
      const r = radius + (Math.sin(angle * 8) * (curWobble * 0.5)) + (pseudorand(curSeed + i) - 0.5) * curWobble;
      const x = cx + Math.cos(angle) * r;
      const y = cy + Math.sin(angle) * r;
      path += (i === 0 && pass === 0) ? `M ${x.toFixed(1)} ${y.toFixed(1)}` : (i === 0) ? ` M ${x.toFixed(1)} ${y.toFixed(1)}` : ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
    }
    path += " Z";
  }
  return path;
}

function generateWobblySlice(cx: number, cy: number, radius: number, startAngle: number, endAngle: number, seed: number, wobble: number = 2.5): string {
  const startX = cx + Math.cos(startAngle) * (radius + (pseudorand(seed) - 0.5) * wobble);
  const startY = cy + Math.sin(startAngle) * (radius + (pseudorand(seed + 1) - 0.5) * wobble);
  const arcPoints = 12;
  const angleStep = (endAngle - startAngle) / arcPoints;
  
  let arcPath = `M ${cx} ${cy} L ${startX.toFixed(1)} ${startY.toFixed(1)}`;
  for (let i = 1; i <= arcPoints; i++) {
    const angle = startAngle + i * angleStep;
    const r = radius + (Math.sin(angle * 6) * 1.0) + (pseudorand(seed + 2 + i) - 0.5) * wobble;
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;
    arcPath += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  return arcPath + ` L ${cx} ${cy} Z`;
}

function generateScribbleFill(cx: number, cy: number, radius: number, startAngle: number, endAngle: number, seed: number, density: number = 16): string {
  let lines = "";
  for (let i = 0; i < density; i++) {
    const t = (i + 0.5) / density;
    const angle1 = startAngle + (endAngle - startAngle) * t;
    const angle2 = angle1 + (pseudorand(seed + i) - 0.5) * 0.25;
    const r1 = radius * (0.1 + pseudorand(seed + i * 2) * 0.3);
    const r2 = radius * (0.6 + pseudorand(seed + i * 3) * 0.38);
    const x1 = cx + Math.cos(angle1) * r1;
    const y1 = cy + Math.sin(angle1) * r1;
    const x2 = cx + Math.cos(angle2) * r2;
    const y2 = cy + Math.sin(angle2) * r2;
    lines += `M ${x1.toFixed(1)} ${y1.toFixed(1)} L ${x2.toFixed(1)} ${y2.toFixed(1)} `;
  }
  return lines;
}

/* ==========================================================================
   2. REUSABLE CUSTOM LIGHTWEIGHT BORDER COMPONENT
   ========================================================================== */
function LightWobblyBorder() {
  return (
    <svg 
      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", overflow: "visible", pointerEvents: "none", zIndex: 5 }}
      viewBox="0 0 162 195" 
      preserveAspectRatio="none"
    >
      <path 
        d="
          M4,2 C10,1 20,0 32,1 C44,2 56,0 68,1 C80,2 92,0 104,1 C116,2 128,0 140,1 C150,2 158,1 160,3
          C161,8 162,16 161,28 C160,40 162,52 161,64 C160,76 162,88 161,100
          C160,112 162,124 161,136 C160,148 162,160 161,172 C161,180 160,188 161,192
          C160,194 158,195 155,195
          C144,194 132,195 120,194 C108,195 96,194 84,195
          C72,194 60,195 48,194 C36,195 24,194 12,195
          C8,195 3,194 2,192
          C1,186 2,178 1,166 C2,154 0,142 1,130
          C2,118 0,106 1,94 C2,82 0,70 1,58
          C2,46 0,34 1,22 C1,12 2,4 4,2 Z
        "
        fill="none" 
        stroke="#c4beae" 
        strokeWidth={0.8}  
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ==========================================================================
   3. CORE SCRIBBLE METRIC IMAGE CARD COMPONENT
   ========================================================================== */
interface VisualMetricCardProps {
  imgSrc: string;
  alt: string;
  value: string | number;
  percentage: string;
  isUp?: boolean;
  valueTop?: string;
  valueLeft?: string;
  pctTop?: string;
  pctLeft?: string;
  pctColor?: string;
  cardRotation?: string;
}

function VisualMetricCard({
  imgSrc, alt, value, percentage, isUp = true,
  valueTop = "46%", valueLeft = "14%", pctTop = "68%", pctLeft = "14%", pctColor = "#2d8a3e", cardRotation = "0deg"
}: VisualMetricCardProps) {
  return (
    <div style={{
      position: "relative",
      width: "100%",
      aspectRatio: "230 / 145",
      transform: `rotate(${cardRotation})`,
      filter: "drop-shadow(2px 4px 5px rgba(45, 36, 22, 0.1))"
    }}>
      <Image
        src={imgSrc}
        alt={alt}
        fill
        sizes="(max-width: 768px) 50vw, 25vw"
        style={{ objectFit: "contain" }}
        priority
      />

      <div style={{
        position: "absolute",
        top: valueTop,
        left: valueLeft,
        fontSize: "calc(1.15rem + 0.3vw)", // Mildly scaled down from previous configuration
        fontWeight: 700,
        color: "#2d2416",
        fontFamily: "'Caveat', cursive",
        lineHeight: 1,
        transform: "translateY(-50%)"
      }}>
        {value}
      </div>

      <div style={{
        position: "absolute",
        top: pctTop,
        left: pctLeft,
        fontSize: "calc(0.78rem + 0.15vw)", // Balanced text ratio
        color: pctColor,
        fontWeight: 600,
        fontFamily: "'Caveat', cursive",
        display: "flex",
        alignItems: "center",
        gap: "4px"
      }}>
        <span>{isUp ? "▲" : "▼"}</span>
        <span>{percentage}</span>
      </div>
    </div>
  );
}

/* ==========================================================================
   4. ANALYTICS COMPONENTS (LINE, PIE & BAR CHARTS)
   ========================================================================== */
function SketchLineChart({ data }: { data: { date: string; count: number }[] }) {
  const maxV = Math.max(...data.map(d => d.count), 10);
  const w = 560, h = 150, pL = 40, pB = 30, pT = 15, pR = 20; // Reduced inner height asset space
  const cW = w - pL - pR, cH = h - pB - pT;

  const toX = (i: number) => pL + (i / Math.max(data.length - 1, 1)) * cW;
  const toY = (v: number) => pT + cH - (v / maxV) * cH;
  const pts = data.map((d, i) => [toX(i), toY(d.count)]);

  const generateEntangledPass = (passIdx: number, baseNoise: number) => {
    let pathString = "";
    pts.forEach(([x, y], i) => {
      const waveX = Math.sin(i * 1.4 + passIdx) * baseNoise;
      const waveY = Math.cos(i * 2.0 + passIdx) * (baseNoise * 1.4);
      const finalX = (x! + waveX).toFixed(1);
      const finalY = (y! + waveY).toFixed(1);
      if (i === 0) pathString = `M ${finalX} ${finalY}`;
      else pathString += ` L ${finalX} ${finalY}`;
    });
    return pathString;
  };

  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} style={{ display: "block", overflow: "visible" }}>
      <defs>
        <marker id="sketch-arrow-large" viewBox="0 0 10 10" refX="2" refY="5" markerWidth="14" markerHeight="14" orient="auto-start-reverse">
          <path d="M 1 1.5 L 8 5 L 1 8.5 M 1 5 L 7 5" fill="none" stroke="#3b4fd8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        </marker>
      </defs>
      {[0, Math.round(maxV / 2), maxV].map((v, idx) => (
        <g key={idx}>
          <line x1={pL} y1={toY(v)} x2={w - pR} y2={toY(v)} stroke="rgba(45,36,22,0.06)" strokeWidth="1" strokeDasharray="4 4"/>
          <text x={pL - 8} y={toY(v) + 3} textAnchor="end" fontSize="12" fill="#9a8060" fontFamily="'Caveat', cursive">{v}</text>
        </g>
      ))}
      <path d={`M ${pL-1.5} ${pT} L ${pL+0.5} ${h-pB+1.5} M ${pL-2} ${h-pB} L ${w-pR+3} ${h-pB+0.5}`} stroke="#2d2416" strokeWidth="1.2" fill="none" strokeOpacity="0.6"/>
      <path d={generateEntangledPass(0.0, 2.6)} stroke="#3b4fd8" strokeWidth="1.5" fill="none" strokeOpacity="0.4" />
      <path d={generateEntangledPass(2.0, 1.8)} stroke="#3b4fd8" strokeWidth="1.1" fill="none" strokeOpacity="0.6" />
      <path d={generateEntangledPass(4.0, 1.1)} stroke="#3b4fd8" strokeWidth="0.8" fill="none" strokeOpacity="0.8" />
      <path d={generateEntangledPass(6.0, 0.5)} stroke="#3b4fd8" strokeWidth="1.5" fill="none" markerEnd="url(#sketch-arrow-large)" />
    </svg>
  );
}

function SketchPieChart({ data }: { data: PieSlice[] }) {
  const size = 115; const cx = size / 2; const cy = size / 2; const radius = size * 0.42; // Scaled down pie dimensions
  const total = data.reduce((sum, d) => sum + d.value, 0);
  let currentAngle = -Math.PI / 2;
  const slices = data.map((d, idx) => {
    const startAngle = currentAngle; const sliceAngle = (d.value / total) * Math.PI * 2; const endAngle = startAngle + sliceAngle; currentAngle = endAngle;
    return { ...d, path: generateWobblySlice(cx, cy, radius, startAngle, endAngle, idx * 30, 2.5), scribble: generateScribbleFill(cx, cy, radius, startAngle, endAngle, idx * 45, 12) };
  });
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, width: "100%" }}>
      <svg width={size} height={size} style={{ overflow: "visible", flexShrink: 0 }}>
        <path d={generateWobblyCircle(cx + 1.5, cy + 2, radius, 99, 2.5)} fill="none" stroke="rgba(30,22,8,0.05)" strokeWidth="1.0"/>
        {slices.map((slice, i) => (
          <g key={i}>
            <path d={slice.path} fill={slice.color} fillOpacity="0.65" stroke="#2d2416" strokeWidth="1.2" strokeLinejoin="round"/>
            <path d={slice.scribble} fill="none" stroke="#2d2416" strokeWidth="0.6" strokeLinecap="round" strokeOpacity="0.3"/>
          </g>
        ))}
      </svg>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
        {data.map((s, i) => {
          const pct = Math.round((s.value / total) * 100);
          return (
            <div key={i} style={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "'Caveat', cursive", fontSize: 13 }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", backgroundColor: s.color, border: "1px solid #2d2416" }} />
                <span style={{ color: "#5a4a30" }}>{s.label}</span>
                <span style={{ fontWeight: 700, color: "#2d2416", marginLeft: "auto" }}>{pct}%</span>
              </div>
              <div style={{ position: "relative", width: "100%", height: 5, background: "rgba(30,22,8,0.04)", borderRadius: 2, border: "0.5px solid rgba(45,36,22,0.15)" }}>
                <div style={{ width: `${pct}%`, height: "100%", background: s.color, borderRadius: 1, opacity: 0.75 }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SketchBarChart({ data }: { data: { day: string; count: number }[] }) {
  const maxV = Math.max(...data.map(d => d.count), 10);
  const w = 540, h = 130, pL = 35, pB = 25, pT = 15, pR = 15; // Tightened vertical headroom
  const cW = w - pL - pR, cH = h - pB - pT;
  const barWidth = (cW / data.length) * 0.44;
  const toX = (i: number) => pL + ((i + 0.5) / data.length) * cW;
  const toY = (v: number) => pT + cH - (v / maxV) * cH;
  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} style={{ display: "block", overflow: "visible" }}>
      <path d={`M ${pL-1.5} ${pT} L ${pL+0.5} ${h-pB+1} M ${pL-2} ${h-pB} L ${w-pR+2} ${h-pB}`} stroke="#2d2416" strokeWidth="1.1" fill="none"/>
      {data.map((d, i) => {
        const x = toX(i); const y = toY(d.count); const barH = (h - pB) - y; const leftX = x - barWidth / 2; const rightX = x + barWidth / 2; const bottomY = h - pB;
        const generateBarPath = (seed: number, jitterAmp: number) => { const r = (o: number) => (pseudorand(seed + o) - 0.5) * jitterAmp; return `M ${leftX + r(1)} ${bottomY} L ${leftX + r(2)} ${y + r(3)} L ${rightX + r(4)} ${y + r(5)} L ${rightX + r(6)} ${bottomY} Z`; };
        const crossHatches = []; const linesCount = Math.max(Math.round(barH / 5.5), 2);
        for (let j = 0; j < linesCount; j++) {
          const ratio = j / linesCount; const currY = bottomY - ratio * barH; const r = (o: number) => (pseudorand(i * 13 + j + o) - 0.5) * 1.4;
          crossHatches.push(<line key={j} x1={leftX + 2} y1={currY + r(1)} x2={rightX - 2} y2={currY - 2.5 + r(2)} stroke="#2d2416" strokeWidth="0.6" strokeOpacity="0.35" strokeLinecap="round"/>);
        }
        return (
          <g key={i}>
            <path d={generateBarPath(i * 15, 1.8)} fill="rgba(30,22,8,0.02)" stroke="#2d2416" strokeWidth="1.0" strokeLinejoin="round" strokeOpacity="0.4"/>
            {crossHatches}
            <text x={x} y={h - 6} textAnchor="middle" fontSize="11" fill="#5a4a30" fontFamily="'Caveat', cursive">{d.day}</text>
          </g>
        );
      })}
    </svg>
  );
}

/* ==========================================================================
   5. MAIN DASHBOARD PAGE WRAPPER ASSEMBLY (80% SCALE REPLICA LOGIC)
   ========================================================================= */
export default function DashboardPage() {
  const createForm = useCreateForm();
  const { data: summary } = useDashboardSummary();
  const me = { fullName: "Shivam" };

  const mockTimeData = [
    { date: "May 10", count: 50 }, { date: "May 11", count: 110 }, { date: "May 12", count: 250 },
    { date: "May 13", count: 150 }, { date: "May 14", count: 280 }, { date: "May 15", count: 210 }, { date: "May 16", count: 400 }
  ];
  const mockDayData = [
    { day: "Mon", count: 175 }, { day: "Tue", count: 305 }, { day: "Wed", count: 300 },
    { day: "Thu", count: 225 }, { day: "Fri", count: 210 }, { day: "Sat", count: 102 }, { day: "Sun", count: 90 }
  ];
  const pieData = [
    { label: "Mobile", value: 52, color: "#c39bd3" }, { label: "Desktop", value: 32, color: "#f4d03f" },
    { label: "Tablet", value: 10, color: "#76d7c4" }, { label: "Other", value: 6, color: "#5dade2" }
  ];

  return (
    <div style={{ display: "flex", background: "#fdf1df", height: "100vh", width: "100vw", overflow: "hidden", position: "relative" }}>
      
      {/* Maximum boundary constraint simulating zoomed outer shell layout space */}
      <div style={{ 
        display: "flex", 
        width: "100%", 
        height: "100%", 
        position: "relative", 
        overflow: "hidden",
        maxWidth: "1440px", // Locks workspace from stretching excessively on ultra-wide screens
        margin: "0 auto"
      }}>
        
        {/* Background Canvas Layer */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image src="/border.png" alt="Dashboard notebook border backdrop" fill style={{ objectFit: "fill" }} priority />
        </div>

<div style={{paddingLeft:"60px"}}>
 <Sidebar />
</div>
        

        {/* Compressed Padding Content Workspace Panel */}
        <main style={{ 
          flex: 1, 
          padding: "30px 50px 16px 12px", // Compact padding allocation to mimic zoomed metrics layout
          display: "flex", 
          flexDirection: "column", 
          gap: 12, // Reduced global element spacing
          minWidth: 0, 
          height: "100%",
          overflowY: "auto", 
          position: "relative",
          zIndex: 1 
        }}>
          
          {/* Main Top Header Line Row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <div>
              <h1 style={{ fontFamily: "'Caveat', cursive", fontSize: 34, fontWeight: 700, margin: 0, display: "flex", alignItems: "center", gap: 6, color: "#2d2416" }}>
                Hey {me?.fullName ?? "Creator"}! 👋
              </h1>
              <p style={{ fontFamily: "'Caveat', cursive", fontSize: 15, color: "#5a4a30", margin: "1px 0 0" }}>
                Here's what's happening with your forms today.
              </p>
            </div>

            {/* Mascot Boy Layout Wrapper */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginRight: "auto", marginLeft: "4%" }}>
              <div style={{ position: "relative", width: "150px", height: "75px" ,paddingLeft:"340px"}}>
                <Image src="/3d5459bb-267c-4c44-8039-ca90a8bf0f47 (2).png" alt="dancing boy mascot" fill style={{ objectFit: "contain" }} />
              </div>
            </div>

            <button onClick={() => createForm.mutate({ title: "Untitled Form", visibility: "public" })} style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}>
              <div style={{ position: "relative", padding: "5px 14px" }}>
                <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 120 40" fill="none" preserveAspectRatio="none">
                  <path d="M4 5 Q15 2 60 3.5 T116 5 Q119 10 118 20 T116 35 Q85 38 45 36.5 T4 34 Q1 25 2 20 Z" fill="#e0d4f7" stroke="#2d2416" strokeWidth="1.5"/>
                </svg>
                <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: 4, fontFamily: "'Caveat', cursive", fontWeight: 700, fontSize: 15, color: "#2d2416" }}>
                  <span style={{ fontSize: 16 }}>+</span> New Form
                </div>
              </div>
            </button>
          </div>

          {/* Dividing Separator Line Image Node */}
          <div style={{ position: "relative", width: "100%", height: "5px", margin: "0 0 2px 0" }}>
            <Image src="/line.png" alt="horizontal split element" fill style={{ objectFit: "fill" }} />
          </div>

          {/* Sticky Metric Post-Its Card Row Shelf */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 2 }}>
            <VisualMetricCard cardRotation="-1deg" imgSrc="/totalresponse.png" alt="Total Responses" value={summary?.totalResponses ?? "1,248"} percentage="12.4% this week" isUp={true} valueLeft="30%" valueTop="44%" pctLeft="30%" pctTop="60%" />
            <VisualMetricCard cardRotation="1deg" imgSrc="/lightPinkCard (1).png" alt="Completion Rate" value={`${summary?.completionRate ?? "68.7"}%`} percentage="8.1%" isUp={true} valueLeft="26%" valueTop="47%" pctLeft="26%" pctTop="60%" pctColor="#e05c5c" />
            <VisualMetricCard cardRotation="-0.5deg" imgSrc="/lightBlueCArd (2).png" alt="Total Forms" value={summary?.totalForms ?? "24"} percentage="" valueLeft="26%" valueTop="44%" pctLeft="25%" pctTop="63%" />
            <VisualMetricCard cardRotation="1.5deg" imgSrc="/purpleCard (1).png" alt="Views" value={(summary?.totalViews ?? 9432).toLocaleString()} percentage="15.7%" isUp={true} valueLeft="20%" valueTop="44%" pctLeft="20%" pctTop="60%" />
          </div>

          {/* Core Master Workspace: Exact 3-Column Split Layout */}
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "1.25fr 1fr 0.9fr", 
            gap: 14, 
            alignItems: "stretch" 
          }}>
            
            {/* COLUMN 1: LEFT SIDE STACK (Line Graph + Bar Chart) */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              
              {/* Line Graph Card with custom light wobbly border */}
              <div style={{ position: "relative", padding: "16px 14px", background: "#ffffff", minHeight: "190px", filter: "drop-shadow(2px 4px 5px rgba(45, 36, 22, 0.06))" }}>
                <LightWobblyBorder />
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, position: "relative", zIndex: 2 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#3b4fd8", border: "1.2px solid #2d2416" }} />
                  <span style={{ fontFamily: "'Caveat', cursive", fontSize: 17, fontWeight: 700, color: "#2d2416" }}>Responses Over Time</span>
                  <span style={{ marginLeft: "auto", fontFamily: "'Caveat', cursive", fontSize: 12, color: "#9a8060", fontStyle: "italic" }}>Keep it up! ★</span>
                </div>
                <div style={{ position: "relative", zIndex: 2 }}>
                  <SketchLineChart data={mockTimeData} />
                </div>
              </div>

              {/* Bar Chart Card with custom light wobbly border */}
              <div style={{ position: "relative", padding: "16px 14px", background: "#ffffff", minHeight: "175px", filter: "drop-shadow(2px 4px 5px rgba(45, 36, 22, 0.06))" }}>
                <LightWobblyBorder />
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, position: "relative", zIndex: 2 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#76d7c4", border: "1.2px solid #2d2416" }} />
                  <span style={{ fontFamily: "'Caveat', cursive", fontSize: 17, fontWeight: 700, color: "#2d2416" }}>Responses by Day</span>
                </div>
                <div style={{ position: "absolute", top: 12, right: 16, background: "#fbe98c", padding: "1px 6px", borderRadius: 2, fontFamily: "'Caveat', cursive", fontSize: 11, transform: "rotate(4deg)", border: "1.1px solid #2d2416", zIndex: 3 }}>
                  Weekend dip! 😂
                </div>
                <div style={{ position: "relative", zIndex: 2 }}>
                  <SketchBarChart data={mockDayData} />
                </div>
              </div>
            </div>

            {/* COLUMN 2: MIDDLE STACK (Pie Chart + No Response Empty Notice) */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              
              {/* Pie Chart Card with custom light wobbly border */}
              <div style={{ position: "relative", padding: "16px 14px", background: "#ffffff", minHeight: "190px", filter: "drop-shadow(2px 4px 5px rgba(45, 36, 22, 0.06))" }}>
                <LightWobblyBorder />
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16, position: "relative", zIndex: 2 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#f4d03f", border: "1.2px solid #2d2416" }} />
                  <span style={{ fontFamily: "'Caveat', cursive", fontSize: 17, fontWeight: 700, color: "#2d2416" }}>Responses by Device</span>
                </div>
                <div style={{ position: "relative", zIndex: 2 }}>
                  <SketchPieChart data={pieData} />
                </div>
              </div>

              {/* Empty Notice State Component Card with custom light wobbly border */}
              <div style={{ position: "relative", padding: "16px", background: "#ffffff", minHeight: "175px", display: "flex", alignItems: "center", justifyContent: "center", filter: "drop-shadow(2px 4px 5px rgba(45, 36, 22, 0.06))" }}>
                <LightWobblyBorder />
                <div style={{ textAlign: "center", fontFamily: "'Caveat', cursive", color: "#5a4a30", position: "relative", zIndex: 2 }}>
                  <div style={{ fontSize: 22, marginBottom: 2 }}>⦗ ☺ ⦘</div>
                  <h4 style={{ fontSize: 16, fontWeight: 700, margin: 0, color: "#2d2416" }}>No responses yet.</h4>
                  <p style={{ margin: "2px 0 0", fontSize: 13, lineHeight: 1.3 }}>Share your form and bring in some <br/>amazing responses!</p>
                </div>
              </div>
            </div>

            {/* COLUMN 3: RIGHT SIDE STACK (Top Forms Pad + Pro Tip Sticky Card) */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              
              {/* Top Forms notepad component */}
              <div style={{ position: "relative", padding: "20px 16px 20px 16px", background: "#fefaf2", minHeight: "235px", filter: "drop-shadow(3px 5px 6px rgba(45,36,22,0.08))", transform: "rotate(-0.5deg)" }}>
                <LightWobblyBorder />
                <div style={{ position: "absolute", top: -6, right: 30, width: 44, height: 12, background: "#f9c8c8", opacity: 0.85, transform: "rotate(3deg)" }} />
                
                <div style={{ position: "relative", zIndex: 2 }}>
                  <h3 style={{ fontFamily: "'Caveat', cursive", fontSize: 20, fontWeight: 700, color: "#2d2416", margin: "0 0 10px" }}>Top Forms</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {[
                      { name: "anime-fan-survey", count: "512" }, { name: "startup-feedback", count: "312" },
                      { name: "event-registration", count: "210" }, { name: "product-feedback", count: "142" }
                    ].map((form, i) => (
                      <div key={i} style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "'Caveat', cursive", fontSize: 14, color: "#5a4a30" }}>
                          <span style={{ fontWeight: 600 }}>{i + 1}. {form.name}</span>
                          <span style={{ fontSize: 12, color: "#9a8060", fontWeight: 600 }}>{form.count} resp</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: 14, borderTop: "1px dashed rgba(45,36,22,0.15)", paddingTop: 8 }}>
                    <Link href="/dashboard/forms" style={{ fontFamily: "'Caveat', cursive", fontSize: 14, color: "#7c5cbf", fontWeight: 700, textDecoration: "underline" }}>
                      View all →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Pro Tip Sticky Card */}
              <div style={{ position: "relative", padding: "14px 16px", background: "#fbe98c", minHeight: "115px", filter: "drop-shadow(2px 4px 5px rgba(45,36,22,0.09))", transform: "rotate(1deg)" }}>
                <LightWobblyBorder />
                <div style={{ position: "absolute", top: -6, left: "50%", transform: "translateX(-50%) rotate(-1deg)", width: 40, height: 11, background: "#fffdf7", opacity: 0.9, border: "1px solid rgba(45,36,22,0.1)" }} />
                
                <div style={{ fontFamily: "'Caveat', cursive", color: "#2d2416", position: "relative", zIndex: 2 }}>
                  <div style={{ fontWeight: 700, fontSize: 15, display: "flex", alignItems: "center", gap: 4, marginBottom: 2 }}>Pro Tip 💡</div>
                  <p style={{ margin: 0, fontSize: 13, lineHeight: 1.3, color: "#5a4a30" }}>Try sharing your form on social media to get more responses!</p>
                  <div style={{ textAlign: "right", fontSize: 12, color: "#e05c5c" }}>♥</div>
                </div>
              </div>

            </div>
          </div>

        </main>
      </div>
    </div>
  );
}