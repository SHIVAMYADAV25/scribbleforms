"use client";

import React, { useState } from "react";
import { Lock, Moon, Play, Check, Paintbrush, BarChart2, Zap } from "lucide-react";

// ── CUSTOM THEMED HERO ACTION BUTTON WITH INTEGRATED DOUBLE BORDER MOCKUP ──
function TexturedHeroButton({ style,children, onClick }: {style? :React.CSSProperties; children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        fontFamily: "'Caveat', cursive, sans-serif",
        fontSize: "12px",
        fontWeight: "bold",
        color: "#ffffff",
        cursor: "pointer",
        border: "none",
        background: "transparent",
        position: "relative",
        padding: "4px 16px",
        userSelect: "none",
        transition: "transform 0.1s ease",
        outline: "none",
        ...style
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0, overflow: "visible" }} viewBox="0 0 180 50" preserveAspectRatio="none" fill="none">
        {/* Themed soft indigo base plate matching the character illustration details */}
        <rect x="2" y="2" width="176" height="46" rx="10" fill="#7c4dff" />
        <path d="M8 4 Q90 2 172 4 Q176 5 176 12 Q178 25 176 38 Q176 44 172 44 Q90 46 8 44 Q4 44 4 38 Q2 25 4 12 Q4 5 8 4 Z" stroke="#2d2416" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span style={{ position: "relative", zIndex: 1, textShadow: "1px 1px 0px rgba(0,0,0,0.15)" }}>{children}</span>
    </button>
  );
}

export default function ScribbleLandingPage() {
  const [isTrickedOpen, setIsTrickedOpen] = useState(false);

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh", backgroundColor: "#fdf6ed",overflowX:"hidden", display: "flex", flexDirection: "column", boxSizing: "border-box" }}>
    

      {/* ── 2. OPEN SPACIOUS GLOBAL CONTENT LAYER ── */}
      <div style={{ position: "relative", zIndex: 1, width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "15px 65px 40px 45px", boxSizing: "border-box" }}>
        
        {/* ── HEADER STRIP ── */}
<div style={{ 
  width: "100%", 
  display: "flex", 
  justifyContent: "space-between", 
  alignItems: "center", 
  flexShrink: 0,
  padding: "0 10px" // Keeps a clean, crisp margin spacing from the background borders
}}>
  {/* Logo Brand Title with Custom Underline Offset */}
  <div style={{ display: "flex", flexDirection: "column", position: "relative", cursor: "pointer", userSelect: "none" }}>
    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
      <span style={{ fontFamily: "'Caveat', cursive", fontSize: "24px", fontWeight: 900, color: "#2d2416" }}>
        ScribbleForms
      </span>
      {/* Scaled down the heart sticker cleanly */}
      <span style={{ fontSize: "16px", display: "inline-flex", alignItems: "center" }}>💜</span>
    </div>
    {/* Wobbly hand-drawn underline scaled down to track perfectly underneath */}
    <div style={{ position: "absolute", bottom: "-6px", left: 0, width: "100%", height: "8px" }}>
      <svg width="100%" height="100%" viewBox="0 0 120 6" preserveAspectRatio="none" style={{ overflow: "visible" }}>
        <path d="M 2 3 C 30 1, 60 4, 90 2 C 105 1, 115 3, 118 2.5 M 115 3 C 85 4.5, 55 2, 25 3.5 C 15 4, 8 3, 3 3.5" stroke="#7c4dff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  </div>

  {/* Center Navigation Links (Scaled down text sizes & gaps for clean aesthetics) */}
  <div style={{fontFamily: "'Caveat', cursive", display: "flex", alignItems: "center", gap: "24px", fontSize: "14px", fontWeight: 700, color: "#5a4a30" }}>
    {["Features", "Templates", "Explore", "Pricing", "Developers"].map((link) => (
      <span key={link} style={{ cursor: "pointer", opacity: 0.85, transition: "opacity 0.15s" }} onMouseEnter={(e) => e.currentTarget.style.opacity = "1"} onMouseLeave={(e) => e.currentTarget.style.opacity = "0.85"}>{link}</span>
    ))}
    <span style={{ cursor: "pointer", opacity: 0.85, display: "inline-flex", alignItems: "center", gap: "4px" }}>
      Resources <span style={{ fontFamily: "'Caveat', cursive", fontSize: "12px", transform: "scaleY(0.65)", display: "inline-block", marginTop: "2px" }}>▼</span>
    </span>
  </div>

  {/* Right Controls Action Lane (Tightened gaps and standard alignment) */}
  <div style={{ display: "flex", alignItems: "center", gap: "20px", fontFamily: "'Nunito', sans-serif", fontSize: "14px", fontWeight: 700 }}>
    
    {/* Clean, scaled down custom call to action button */}
    <TexturedHeroButton
    >
      Log in
    </TexturedHeroButton>

    <Moon 
      size={18} 
      style={{ cursor: "pointer", color: "#5a4a30", transition: "transform 0.1s ease" }} 
      onClick={() => setIsTrickedOpen(true)} 
      onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
      onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
    />
  </div>
</div>

        {/* ── BROAD CENTER SPAN HERO ZONE ── */}
        <div style={{ display: "grid", gridTemplateColumns: "45% 140%", gap: "20px", alignItems: "center", width: "100%", flex: 1, minHeight: 0 }}>
          
          {/* LEFT CONTENT CHANNEL: TEXT HEADINGS & FEATURE ITEMS */}
          <div style={{ display: "flex", flexDirection: "column", gap: "26px", paddingLeft: "15px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <h1 style={{ fontFamily: "'Caveat', cursive", fontSize: "62px", fontWeight: 900, color: "#2d2416", margin: 0, lineHeight: "1.1" }}>
                One form.
              </h1>
              <h1 style={{ fontFamily: "'Caveat', cursive", fontSize: "42px", fontWeight: 900, color: "#2d2416", margin: 0, lineHeight: "1.9" }}>
                Infinite{"    "}
                <span style={{ position: "relative", display: "inline-block", padding: "0 8px" }}>
                  <span style={{ color: "#7c4dff" }}>personalities.</span>
                  {/* Organic Sketched Emphasis Loop Layer underneath text */}
                  <svg style={{ position: "absolute", bottom: "-10px", left: 0, width: "100%", height: "12px" }} viewBox="0 0 200 12" preserveAspectRatio="none" fill="none">
                    <path d="M2 6 C 50 3, 100 8, 198 5 M 195 6 C 140 8, 80 5, 5 7" stroke="#7c4dff" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>
            </div>

            {/* Custom Icon List matching image_05051d.jpg perfectly */}
            <div style={{fontFamily: "'Caveat', cursive", display: "flex", flexDirection: "column", gap: "14px", fontSize: "18px", fontWeight: 500, color: "#2d2416" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "32px", height: "32px", borderRadius: "50%", backgroundColor: "#ede8f9" }}>
                  <Paintbrush size={16} color="#7c4dff" />
                </div>
                <span>Beautiful themes.</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "32px", height: "32px", borderRadius: "50%", backgroundColor: "#e1f5fe" }}>
                  <BarChart2 size={16} color="#0288d1" />
                </div>
                <span>Smart insights.</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "32px", height: "32px", borderRadius: "50%", backgroundColor: "#fff3e0" }}>
                  <Zap size={16} color="#ef6c00" />
                </div>
                <span>Hang on.</span>
              </div>
            </div>

            {/* Action Buttons Layer Pair */}
            <div style={{ display: "flex", alignItems: "center", gap: "20px", marginTop: "10px" }}>
              <TexturedHeroButton
              style={{padding : "15px 20px"}}
              >Start Building Free </TexturedHeroButton>
              <button style={{cursor:"pointer", display: "inline-flex", alignItems: "center", gap: "8px", background: "#ffd6db", borderRadius: "8px", padding: "12px 28px", fontFamily: "'Nunito', sans-serif", fontSize: "15px", fontWeight: 700, color: "#2d2416", border:"none", transition: "transform 0.1s ease" }} 
              onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-1px)"} 
              onMouseLeave={(e) => e.currentTarget.style.transform = "none"}>
                <Play size={14} fill="#2d2416" /> Watch Demo
              </button>
            </div>

            {/* Checkmark Quality Promises */}
            <div style={{ display: "flex", alignItems: "center", gap: "20px", marginTop: "5px", fontFamily: "'Nunito', sans-serif", fontSize: "14px", fontWeight: 700, color: "rgba(45, 36, 22, 0.6)" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}><Check size={16} strokeWidth={3} color="#2e7d32" /> No credit card</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}><Check size={16} strokeWidth={3} color="#2e7d32" /> Free forever</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}><Check size={16} strokeWidth={3} color="#2e7d32" /> Setup in 30 seconds</span>
            </div>
          </div>

          {/* RIGHT CONTENT CHANNEL: VIBRANT UNIFIED SCENE ILLUSTRATION */}
          <div style={{ width: "100%", height: "100%", minHeight: 0, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: "100%", height: "100%", position: "relative" }}>
              {/* FIXED: References your true file target asset verbatim */}
              <img 
                src="/landing/boy.png" 
                alt="Central layout scene illustration with boy and responsive cards" 
                style={{ width: "1980px", height: "710px", objectFit: "contain", display: "block" ,marginLeft:"-700px",marginTop:"28px"}}
              />
            </div>
          </div>

        </div>

      </div>

      {/* ── 3. 👇 NEW SOCIAL PROOF METRICS SECTION (VISIBLE AFTER SCROLLING DOWN) ── */}
      <div 
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          padding: "60px 40px 110px 40px",
          boxSizing: "border-box",
          zIndex: 1,
          position: "relative"
        }}
      >
        {/* Main Stats Horizontal Banner Box Assembly matching Screenshot 2026-06-03 103902.png */}
        <div 
          style={{ 
            position: "relative", 
            width: "980px", 
            height: "105px", 
            display: "flex", 
            alignItems: "center",
            justifyContent: "space-between",
            boxSizing: "border-box",
            padding: "0 60px"
          }}
        >
          {/* Exactly matching hand-drawn wobbly frame wrap */}
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", overflow: "visible" }} viewBox="0 0 1180 125" preserveAspectRatio="none" fill="none">
            <path d="M14 6 C400 3.5, 800 4.5, 1166 6 C1174 8, 1176 16, 1174 62 C1175 105, 1173 118, 1164 120 C800 122, 400 121, 14 119 C5 118, 4 105, 6 62 C4 16, 6 8, 14 6 Z" stroke="#2d2416" strokeWidth="1.4"  strokeOpacity="0.25" />
          </svg>

          {/* Node 1: Forms Created */}
          <div style={{ display: "flex", alignItems: "center", gap: "20px", position: "relative", zIndex: 1, width: "30%" }}>
            {/* Custom Sticker Filled Circle Wrapper */}
            <div style={{ width: "54px", height: "54px", borderRadius: "50%", backgroundColor: "#dfcbf2",  display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "1px 2px 0px rgba(45,36,22,0.15)" }}>
              {/* Custom SVG Logo: Checklist Form + Pencil */}
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2d2416" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="14" height="16" rx="2" />
                <line x1="7" y1="9" x2="13" y2="9" />
                <line x1="7" y1="13" x2="11" y2="13" />
                <circle cx="7" cy="17" r="0.5" fill="#2d2416" />
                <path d="M16 14l5-5-2-2-5 5v2h2z" fill="#fffdf9" />
              </svg>
            </div>
            <div style={{ display: "flex", flexDirection: "column" ,marginLeft:"6px"}}>
              <span style={{ fontFamily: "'Caveat', cursive", fontSize: "32px", fontWeight: "500", color: "#2d2416", lineHeight: "1" }}>2M+</span>
              <span style={{ fontFamily: "'Caveat', cursive", fontSize: "12px", fontWeight: "600", color: "#2d2416", marginTop: "6px" }}>Forms Created</span>
            </div>
          </div>

          {/* Separation Dashed Line 1 */}
          <div style={{ height: "60px", width: "1px", borderLeft: "1px dashed rgba(45,36,22,0.25)" }} />

          {/* Node 2: Happy Users */}
          <div style={{ display: "flex", alignItems: "center", gap: "20px", position: "relative", zIndex: 1, width: "30%", paddingLeft: "20px" ,marginLeft:"6px"}}>
            <div style={{ width: "54px", height: "54px", borderRadius: "50%", backgroundColor: "#fce5a4", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "1px 2px 0px rgba(45,36,22,0.15)" }}>
              {/* Custom SVG Logo: Happy Users Group */}
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2d2416" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontFamily: "'Caveat', cursive", fontSize: "32px", fontWeight: "500", color: "#2d2416", lineHeight: "1" }}>150k+</span>
              <span style={{ fontFamily: "'Caveat', cursive", fontSize: "12px", fontWeight: "600", color: "#2d2416", marginTop: "2px" }}>Happy Users</span>
            </div>
          </div>

          {/* Separation Dashed Line 2 */}
          <div style={{ height: "60px", width: "1px", borderLeft: "1px dashed rgba(45,36,22,0.25)" }} />

          {/* Node 3: Uptime & Reliability */}
          <div style={{ display: "flex", alignItems: "center", gap: "20px", position: "relative", zIndex: 1, width: "30%", paddingLeft: "20px" }}>
            <div style={{ width: "54px", height: "54px", borderRadius: "50%", backgroundColor: "#dbe7c4", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "1px 2px 0px rgba(45,36,22,0.15)" }}>
              {/* Custom SVG Logo: Shield with Checkmark */}
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2d2416" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <polyline points="9 11 11 13 15 9" />
              </svg>
            </div>
            <div style={{ display: "flex", flexDirection: "column" ,marginLeft:"6px"}}>
              <span style={{ fontFamily: "'Caveat', cursive", fontSize: "30px", fontWeight: "500", color: "#2d2416", lineHeight: "1" }}>99.9%</span>
              <span style={{ fontFamily: "'Caveat', cursive", fontSize: "12px", fontWeight: "600", color: "#2d2416", marginTop: "2px" }}>Uptime & Reliability</span>
            </div>
          </div>

        </div>
      </div>

      {/* ── 🛠️ SCROLL SECTION 2: EVERYTHING YOU NEED IN ONE WORKSPACE ── */}
        <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: "40px", width: "100%", alignItems: "start", marginTop: "40px" }}>
          
          {/* Left Feature Column Callouts */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px", color: "#2d2416" }}>
            <h2 style={{ fontFamily: "'Caveat', cursive", fontSize: "46px", fontWeight: 900, margin: 0, lineHeight: "1.1" }}>
              Everything you need,<br />in one simple workspace 🍃
            </h2>
            <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "15px", fontWeight: 600, color: "rgba(45,36,22,0.7)", lineHeight: "1.5", margin: 0 }}>
              Create, customize and share forms that get responses. All the tools you need, all in one place.
            </p>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontFamily: "'Nunito', sans-serif", fontSize: "15px", fontWeight: 700, marginTop: "10px" }}>
              {["Drag & drop builder", "10+ field types", "Conditional logic", "Custom themes", "Real-time preview"].map((feat) => (
                <div key={feat} style={{ display: "flex", alignItems: "center", gap: "8px", color: "#2e7d32" }}>
                  <Check size={16} strokeWidth={3} /> <span style={{ color: "#2d2416" }}>{feat}</span>
                </div>
              ))}
            </div>

            <TexturedHeroButton style={{ width: "fit-content", padding: "12px 36px", marginTop: "15px" }}>Try the Builder →</TexturedHeroButton>
          </div>

          {/* Right Side: Interactive Hand-drawn Workspace Window Representation (image_02bc3b.jpg) */}
          <div style={{ position: "relative", width: "100%", backgroundColor: "#fffdf9", border: "1.5px solid #2d2416", borderRadius: "16px", padding: "20px", boxSizing: "border-box", boxShadow: "4px 5px 0px rgba(45,36,22,0.06)", display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* Top window utility strip tabs inside card */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1.2px solid #2d2416", paddingBottom: "12px" }}>
              <div style={{ display: "flex", gap: "6px" }}>
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#ef5350", border: "1px solid #2d2416" }} />
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#ffca28", border: "1px solid #2d2416" }} />
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#66bb6a", border: "1px solid #2d2416" }} />
              </div>
              <div style={{ display: "flex", gap: "12px", background: "#f5ece2", padding: "3px 8px", borderRadius: "8px", border: "1px solid #2d2416" }}>
                {["Builder", "Analytics", "Responses", "Explore", "Themes"].map((t) => (
                  <span key={t} style={{ fontFamily: "'Caveat', cursive", fontSize: "15px", fontWeight: "bold", padding: "2px 10px", borderRadius: "4px", backgroundColor: t === "Builder" ? "#7c4dff" : "transparent", color: t === "Builder" ? "#fff" : "#2d2416" }}>{t}</span>
                ))}
              </div>
              <div style={{ width: "40px" }} />
            </div>

            {/* Inner Dashboard Layout Split Columns */}
            <div style={{ display: "grid", gridTemplateColumns: "180px 1fr 220px", gap: "16px", height: "300px" }}>
              {/* Tool Selector Panel */}
              <div style={{ borderRight: "1px dashed rgba(45,36,22,0.15)", display: "flex", flexDirection: "column", gap: "6px", paddingRight: "10px", fontFamily: "'Nunito', sans-serif", fontSize: "12px", fontWeight: 700 }}>
                {["Short Text", "Email", "Number", "Checkbox", "Dropdown", "Radio", "Date", "File Upload"].map((label, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "6px 10px", border: "1px solid #2d2416", borderRadius: "6px", background: "#fff" }}>
                    <span>✏️</span> {label}
                  </div>
                ))}
              </div>

              {/* Stage Workspace Canvas */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", padding: "0 10px" }}>
                <div style={{ fontFamily: "'Caveat', cursive", fontSize: "24px", fontWeight: 900 }}>Event Registration 📝</div>
                {["Full Name", "Email Address", "Which session will you attend?", "Upload your resume"].map((placeholder, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 14px", border: "1px solid #2d2416", borderRadius: "8px", backgroundColor: "#fff" }}>
                    <span style={{ fontSize: "13px", fontWeight: 600, color: "rgba(45,36,22,0.4)" }}>{placeholder}</span>
                    <span style={{ fontSize: "11px", opacity: 0.4, fontFamily: "'Nunito', sans-serif" }}>Field Type ▼</span>
                  </div>
                ))}
              </div>

              {/* Right Settings Block Inspector */}
              <div style={{ borderLeft: "1px dashed rgba(45,36,22,0.15)", paddingLeft: "16px", display: "flex", flexDirection: "column", gap: "12px", fontFamily: "'Nunito', sans-serif", fontSize: "12px" }}>
                <div style={{ display: "flex", borderBottom: "1px solid #2d2416", paddingBottom: "4px" }}>
                  <span style={{ flex: 1, textAlign: "center", fontWeight: "bold", color: "#7c4dff" }}>Design</span>
                  <span style={{ flex: 1, textAlign: "center", opacity: 0.5 }}>Settings</span>
                </div>
                <div>
                  <label style={{ fontWeight: 700, display: "block", marginBottom: "4px" }}>Theme</label>
                  <div style={{ padding: "6px", border: "1px solid #2d2416", borderRadius: "4px" }}>Sketch Purple</div>
                </div>
                <div style={{ display: "flex", gap: "6px" }}>
                  <div style={{ width: "16px", height: "16px", borderRadius: "50%", background: "#7c4dff" }} />
                  <div style={{ width: "16px", height: "16px", borderRadius: "50%", background: "#29b6f6" }} />
                  <div style={{ width: "16px", height: "16px", borderRadius: "50%", background: "#ffca28" }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── 🗂️ SCROLL SECTION 3: SIX ROW FEATURE HIGHLIGHT CARDS (image_02bc3b.jpg) ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "16px", width: "100%" }}>
          {[
            { title: "Collect Responses", desc: "Share your form and start collecting responses instantly.", bg: "#f5f2ff", icon: "📩" },
            { title: "Analyze Insights", desc: "Beautiful analytics to help you understand your audience.", bg: "#edf7ff", icon: "📊" },
            { title: "Export Data", desc: "Export responses in CSV or JSON format anytime.", bg: "#f1fbf0", icon: "📥" },
            { title: "Automate Workflows", desc: "Send emails, trigger webhooks and automate everything.", bg: "#fffaf0", icon: "⚡" },
            { title: "Share Anywhere", desc: "Embed, share link or add to your website.", bg: "#fff2f5", icon: "🚀" },
            { title: "Secure & Private", desc: "Password protect forms and keep data 100% safe.", bg: "#f5f5f5", icon: "🔒" }
          ].map((card, idx) => (
            <div key={idx} style={{ position: "relative", backgroundColor: card.bg, padding: "20px 14px", height: "165px", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "8px", borderRadius: "12px", transition: "transform 0.15s" }} onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"} onMouseLeave={(e) => e.currentTarget.style.transform = "none"}>
              <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", overflow: "visible" }} viewBox="0 0 180 165" preserveAspectRatio="none" fill="none">
                <rect x="1" y="1" width="178" height="163" rx="12" stroke="#2d2416" strokeWidth="1.2" strokeOpacity="0.25" />
              </svg>
              <div style={{ width: "36px", height: "36px", borderRadius: "50%", backgroundColor: "#fff", border: "1px solid #2d2416", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", boxShadow: "1px 1px 0px #2d2416", position: "relative", zIndex: 1 }}>{card.icon}</div>
              <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: "14px", fontWeight: "800", color: "#2d2416", position: "relative", zIndex: 1, marginTop: "4px" }}>{card.title}</div>
              <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: "11px", fontWeight: "600", color: "rgba(45,36,22,0.65)", lineHeight: "14px", position: "relative", zIndex: 1 }}>{card.desc}</div>
            </div>
          ))}
        </div>

        {/* ── 🚀 SCROLL SECTION 4: JOIN CREATORS FOOTER BANNER (image_02bc3b.jpg) ── */}
        <div style={{ position: "relative", width: "100%", minHeight: "150px", display: "flex", alignItems: "center", justifyContent: "space-between", boxSizing: "border-box", padding: "30px 50px", marginTop: "20px" }}>
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", overflow: "visible" }} viewBox="0 0 1320 150" preserveAspectRatio="none" fill="none">
            <path d="M4 6 C400 3, 900 4, 1316 3 C1318.5 25, 1317.5 75, 1315.5 144 C950 145.5, 450 144.5, 5 145 C1.5 100, 2 50, 4 6 Z" stroke="#2d2416" strokeWidth="1.2" fill="#fffdf9" strokeOpacity="0.3" />
          </svg>

          {/* Left Creative Message */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxWidth: "380px", position: "relative", zIndex: 1 }}>
            <h3 style={{ fontFamily: "'Caveat', cursive", fontSize: "32px", fontWeight: 900, color: "#2d2416", margin: 0, lineHeight: "1.1" }}>
              Join thousands of creators and <span style={{ color: "#7c4dff" }}>growing</span> communities
            </h3>
            <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "12px", fontWeight: 700, color: "rgba(45,36,22,0.55)", margin: 0, lineHeight: "1.4" }}>
              From startups to educators, creators to non-profits — everyone loves building with ScribbleForms.
            </p>
          </div>

          {/* Right Metrics Grid Container Layout */}
          <div style={{ display: "flex", alignItems: "center", gap: "45px", position: "relative", zIndex: 1 }}>
            {[
              { val: "150K+", sub: "Active Users", icon: "👑" },
              { val: "2M+", sub: "Forms Created", icon: "🚀" },
              { val: "50K+", sub: "Communities", icon: "👥" },
              { val: "99.9%", sub: "Uptime", icon: "💖" }
            ].map((metric, idx) => (
              <div key={idx} style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", minWidth: "90px" }}>
                <span style={{ fontSize: "20px", marginBottom: "4px" }}>{metric.icon}</span>
                <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: "24px", fontWeight: "900", color: "#2d2416", lineHeight: "1" }}>{metric.val}</span>
                <span style={{ fontFamily: "'Caveat', cursive", fontSize: "14px", fontWeight: "700", color: "rgba(45,36,22,0.6)", marginTop: "2px" }}>{metric.sub}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── 🌟 SCROLL SECTION 5: SPLIT BLOCK - COMMUNITY FORMS & BEAUTIFUL THEMES (image_02b45c.jpg) ── */}
<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", width: "100%" }}>
  
  {/* LEFT BLOCK: EXPLORE COMMUNITY FORMS */}
  <div style={{ position: "relative", backgroundColor: "#fffdf9", border: "1.5px solid #2d2416", borderRadius: "16px", padding: "30px 24px", boxSizing: "border-box", boxShadow: "4px 5px 0px rgba(45,36,22,0.06)", display: "flex", flexDirection: "column", gap: "20px" }}>
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <h3 style={{ fontFamily: "'Caveat', cursive", fontSize: "32px", fontWeight: 900, margin: 0 }}>Explore community forms 🍃</h3>
      <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "14px", fontWeight: 600, color: "rgba(45,36,22,0.6)", margin: 0 }}>Discover amazing forms created by the community.</p>
    </div>
    <TexturedHeroButton style={{ width: "fit-content", padding: "8px 24px", fontSize: "16px" }}>Explore Forms →</TexturedHeroButton>
    
    {/* Polaroid Cards Row */}
    <div style={{ display: "flex", gap: "12px", marginTop: "10px", justifyContent: "center" }}>
      {[
        { title: "Anime Fan Survey", resp: "341 responses", rating: "⭐ 4.8", icon: "🐱", rot: "-2deg" },
        { title: "Startup Onboarding", resp: "363 responses", rating: "⭐ 4.9", icon: "🚀", rot: "1deg" },
        { title: "Gaming Tournament", resp: "277 responses", rating: "⭐ 4.7", icon: "🎮", rot: "-1deg" }
      ].map((card, i) => (
        <div key={i} style={{ width: "115px", backgroundColor: "#fff", border: "1.2px solid #2d2416", borderRadius: "8px", padding: "10px", boxSizing: "border-box", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", transform: `rotate(${card.rot})`, boxShadow: "2px 3px 0px rgba(45,36,22,0.05)" }}>
          <div style={{ fontSize: "24px", marginBottom: "6px" }}>{card.icon}</div>
          <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: "11px", fontWeight: 800, color: "#2d2416", height: "32px", overflow: "hidden", lineHeight: "1.2" }}>{card.title}</div>
          <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: "9px", color: "rgba(45,36,22,0.5)", fontWeight: 700, margin: "4px 0" }}>{card.resp}</div>
          <div style={{ fontFamily: "'Caveat', cursive", fontSize: "11px", fontWeight: "bold", color: "#ef6c00" }}>{card.rating}</div>
        </div>
      ))}
    </div>
  </div>

  {/* RIGHT BLOCK: BEAUTIFUL THEMES FOR EVERY VIBE */}
  <div style={{ position: "relative", backgroundColor: "#fffdf9", border: "1.5px solid #2d2416", borderRadius: "16px", padding: "30px 24px", boxSizing: "border-box", boxShadow: "4px 5px 0px rgba(45,36,22,0.06)", display: "flex", flexDirection: "column", gap: "20px" }}>
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <h3 style={{ fontFamily: "'Caveat', cursive", fontSize: "32px", fontWeight: 900, margin: 0 }}>Beautiful themes for every vibe 📝</h3>
      <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "14px", fontWeight: 600, color: "rgba(45,36,22,0.6)", margin: 0 }}>Choose from stunning themes or create your own.</p>
    </div>
    <button style={{ width: "fit-content", padding: "8px 24px", fontSize: "14px", fontWeight: 700, fontFamily: "'Nunito', sans-serif", background: "#fffdf0", border: "1.2px solid #2d2416", borderRadius: "8px", boxShadow: "2px 2px 0px #2d2416", cursor: "pointer" }}>Browse Themes →</button>
    
    {/* Mini Theme Thumbnails Row */}
    <div style={{ display: "flex", gap: "10px", marginTop: "14px", justifyContent: "space-between" }}>
      {[
        { name: "Cyber Punk", bg: "#120e2e", border: "#ff007f" },
        { name: "Notebook", bg: "#fff", border: "#c8b8a0", lines: true },
        { name: "Pastel", bg: "#f5f2ff", border: "#b095e6" },
        { name: "Minimal", bg: "#fafafa", border: "#e0e0e0" },
        { name: "Sketch", bg: "#fffdf9", border: "#2d2416" }
      ].map((theme, i) => (
        <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
          <div style={{ width: "64px", height: "46px", backgroundColor: theme.bg, border: `1.2px solid ${theme.border}`, borderRadius: "6px", boxSizing: "border-box", overflow: "hidden", display: "flex", flexDirection: "column", gap: "4px", padding: "4px" }}>
            {theme.lines && <div style={{ width: "100%", height: "1px", backgroundColor: "#e0d4f7", borderBottom: "1px dashed rgba(99,76,201,0.2)" }} />}
            <div style={{ width: "70%", height: "4px", backgroundColor: "rgba(45,36,22,0.15)", borderRadius: "2px" }} />
            <div style={{ width: "45%", height: "4px", backgroundColor: "rgba(45,36,22,0.1)", borderRadius: "2px" }} />
          </div>
          <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: "11px", fontWeight: 700, color: "#5a4a30" }}>{theme.name}</span>
        </div>
      ))}
    </div>
  </div>
</div>

{/* ── ⚙️ SCROLL SECTION 6: AUTOMATION PIPELINE TIMELINE ── */}
<div style={{ position: "relative", width: "100%", backgroundColor: "#fffdf9", border: "1.5px solid #2d2416", borderRadius: "16px", padding: "30px 40px", boxSizing: "border-box", boxShadow: "4px 5px 0px rgba(45,36,22,0.06)", display: "flex", flexDirection: "column", gap: "16px" }}>
  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
    <h3 style={{ fontFamily: "'Caveat', cursive", fontSize: "34px", fontWeight: 900, margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
      <span>⚙️</span> Automation that works for you
    </h3>
    <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "15px", fontWeight: 600, color: "rgba(45,36,22,0.6)", margin: 0 }}>We handle the boring stuff so you can focus on what matters.</p>
  </div>

  <div style={{ display: "flex", alignItems: "center", gap: "24px", marginTop: "10px" }}>
    <TexturedHeroButton style={{ padding: "10px 28px", fontSize: "16px" }}>Explore Automations →</TexturedHeroButton>
    
    {/* Pipeline Flux Flow Layout */}
    <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: 1, justifyContent: "space-around", paddingLeft: "20px" }}>
      {[
        { label: "Form Submitted", icon: "📥" },
        { label: "Process Data", icon: "🎛️" },
        { label: "Send Email", icon: "✉️" },
        { label: "Trigger Webhook", icon: "🔗" },
        { label: "Update Analytics", icon: "📊" }
      ].map((step, idx) => (
        <React.Fragment key={idx}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", textAlign: "center" }}>
            <div style={{ width: "46px", height: "46px", borderRadius: "10px", border: "1.2px solid #2d2416", backgroundColor: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", boxShadow: "2px 2px 0px rgba(45,36,22,0.1)" }}>{step.icon}</div>
            <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: "12px", fontWeight: 700, color: "#2d2416" }}>{step.label}</span>
          </div>
          {idx < 4 && (
            <span style={{ fontFamily: "'Caveat', cursive", fontSize: "22px", fontWeight: "bold", color: "rgba(45,36,22,0.3)", userSelect: "none" }}>→</span>
          )}
        </React.Fragment>
      ))}
    </div>
  </div>
</div>

{/* ── 💬 SCROLL SECTION 7: LOVED BY OUR USERS CAROUSEL TESTIMONIALS ── */}
<div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", gap: "24px" }}>
  <div style={{ fontFamily: "'Caveat', cursive", fontSize: "32px", fontWeight: 900, color: "#2d2416", position: "relative" }}>
    Loved by our users 💜
    <div style={{ position: "absolute", bottom: "-4px", left: "25%", width: "50%" }}>
      <svg width="100%" height="4" viewBox="0 0 100 4" preserveAspectRatio="none">
        <path d="M0 2 Q50 0 100 3" stroke="#7c4dff" strokeWidth="2" fill="none" />
      </svg>
    </div>
  </div>

  {/* Cards Slider Wrapper Grid Row Split Container Layout */}
  <div style={{ display: "flex", alignItems: "center", gap: "16px", width: "100%" }}>
    {/* Left Control Chevron Slider Trigger */}
    <button style={{ width: "36px", height: "36px", borderRadius: "50%", border: "1.5px solid #2d2416", backgroundColor: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontWeight: "bold", fontSize: "16px", boxShadow: "2px 2px 0px #2d2416" }}>‹</button>
    
    {/* Core Grid Items */}
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", flex: 1 }}>
      {[
        { name: "Priya Sharma", role: "Product Designer", quote: '"ScribbleForms made it super easy to collect feedback from our community. The analytics are absolutely beautiful!"', bg: "#f5f2ff", avatar: "👩‍🎨" },
        { name: "Arjun Patel", role: "Indie Developer", quote: '"The best form builder I\'ve used. The community templates and themes are a game changer."', bg: "#f1fbf0", avatar: "👨‍💻" },
        { name: "Meera Nair", role: "CTO, DevTools", quote: '"We use the API and webhooks extensively. Solid platform, great docs, and amazing team!"', bg: "#fffaf0", avatar: "👩‍💻" }
      ].map((user, idx) => (
        <div key={idx} style={{ position: "relative", backgroundColor: user.bg, padding: "24px 20px", display: "flex", gap: "14px", alignItems: "flex-start", borderRadius: "14px", minHeight: "130px", boxSizing: "border-box" }}>
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", overflow: "visible" }} viewBox="0 0 360 130" preserveAspectRatio="none" fill="none">
            <rect x="1" y="1" width="358" height="128" rx="14" stroke="#2d2416" strokeWidth="1.2" strokeOpacity="0.2" />
          </svg>
          <div style={{ width: "42px", height: "42px", borderRadius: "50%", border: "1.2px solid #2d2416", backgroundColor: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", flexShrink: 0, boxShadow: "1px 2px 0px rgba(0,0,0,0.1)" }}>{user.avatar}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <p style={{ fontFamily: "'Nunito', sans-serif", fontStyle: "italic", fontSize: "12px", fontWeight: 600, color: "#2d2416", margin: "0 0 6px 0", lineHeight: "16px" }}>{user.quote}</p>
            <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: "12px", fontWeight: "800", color: "#2d2416" }}>— {user.name}</span>
            <span style={{ fontFamily: "'Caveat', cursive", fontSize: "12px", fontWeight: "700", color: "rgba(45,36,22,0.5)" }}>{user.role}</span>
          </div>
        </div>
      ))}
    </div>

    {/* Right Control Chevron Slider Trigger */}
    <button style={{ width: "36px", height: "36px", borderRadius: "50%", border: "1.5px solid #2d2416", backgroundColor: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontWeight: "bold", fontSize: "16px", boxShadow: "2px 2px 0px #2d2416" }}>›</button>
  </div>
</div>

{/* ── 📜 SCROLL SECTION 8: FULL COHESIVE INDIE FOOTER (image_02a9b9.jpg) ── */}
<div style={{ display: "flex", flexDirection: "column", width: "100%", marginTop: "60px", position: "relative" }}>
  
  {/* ── UPPER FOOTER CEILING SHELF (Cat Peeking + Talk Bubble) ── */}
  <div style={{ width: "100%", height: "40px", borderBottom: "1.5px solid #2d2416", position: "relative", marginBottom: "40px" }}>
    {/* Peeking Cat on Left */}
    <div style={{ position: "absolute", left: "0px", bottom: "-2px", width: "140px", height: "auto" }}>
      <img src="/formsType/catWithBall.png" alt="Peeking Cat" style={{ width: "100%", height: "auto", transform: "scaleY(-1) rotate(180deg)" }} />
    </div>

    {/* Message Bubble */}
    <div style={{
      position: "absolute",
      left: "140px",
      top: "-45px",
      backgroundImage: "url('/response/bubble.png')",
      backgroundSize: "100% 100%",
      width: "160px",
      height: "65px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "0 8px 10px 8px",
      boxSizing: "border-box",
      fontFamily: "'Caveat', cursive",
      fontSize: "14px",
      fontWeight: "bold",
      color: "#2d2416"
    }}>
      Thanks for scrolling this far! 💜
    </div>

    {/* Little Plant Pot on Right */}
    <div style={{ position: "absolute", right: "40px", bottom: "0px", width: "36px", height: "auto" }}>
      <img src="/formsType/bottomRightCat(1).png" alt="Plant asset decoration" style={{ width: "100%", height: "auto", display: "none" }} />
      <span style={{ fontSize: "24px" }}>🪴</span>
    </div>
  </div>

  {/* ── MIDDLE FOOTER LINKS GRID ── */}
  <div style={{ display: "grid", gridTemplateColumns: "280px repeat(5, 1fr)", gap: "24px", width: "100%", boxSizing: "border-box", paddingBottom: "40px" }}>
    
    {/* Left-most Branding Info Block */}
    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <span style={{ fontSize: "16px" }}>💜</span>
        <span style={{ fontFamily: "'Caveat', cursive", fontSize: "28px", fontWeight: 900, color: "#2d2416" }}>ScribbleForms</span>
      </div>
      <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "13px", fontWeight: 600, color: "rgba(45,36,22,0.7)", lineHeight: "1.6", margin: 0, maxWidth: "240px" }}>
        Create beautiful forms, collect responses, and grow with better insights. All from one playful workspace.
      </p>
      
      {/* Boy working on laptop illustration placeholder */}
      <div style={{ width: "140px", height: "100px", position: "relative", marginTop: "10px" }}>
        <img src="/landing/boy.png" alt="Boy coding on laptop" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
      </div>
    </div>

    {/* Column 1: Product */}
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontFamily: "'Nunito', sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "6px", fontFamily: "'Caveat', cursive", fontSize: "18px", fontWeight: "bold", color: "#2d2416", marginBottom: "4px" }}>
        <span>⭐</span> Product
      </div>
      {["Features", "Templates", "Explore Forms", "Themes", "Integrations", "Changelog"].map(link => (
        <span key={link} style={{ fontSize: "13px", fontWeight: 600, color: "rgba(45,36,22,0.75)", cursor: "pointer" }}>{link}</span>
      ))}
    </div>

    {/* Column 2: Use Cases */}
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontFamily: "'Nunito', sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "6px", fontFamily: "'Caveat', cursive", fontSize: "18px", fontWeight: "bold", color: "#2d2416", marginBottom: "4px" }}>
        <span>🚀</span> Use Cases
      </div>
      {["Surveys & Feedback", "Event Registration", "Lead Generation", "Quizzes & Tests", "Customer Feedback", "More Examples"].map(link => (
        <span key={link} style={{ fontSize: "13px", fontWeight: 600, color: "rgba(45,36,22,0.75)", cursor: "pointer" }}>{link}</span>
      ))}
    </div>

    {/* Column 3: Resources */}
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontFamily: "'Nunito', sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "6px", fontFamily: "'Caveat', cursive", fontSize: "18px", fontWeight: "bold", color: "#2d2416", marginBottom: "4px" }}>
        <span>📔</span> Resources
      </div>
      {["Help Center", "Guides & Tutorials", "Blog", "Best Practices", "What's New", "API Documentation"].map(link => (
        <span key={link} style={{ fontSize: "13px", fontWeight: 600, color: "rgba(45,36,22,0.75)", cursor: "pointer" }}>{link}</span>
      ))}
    </div>

    {/* Column 4: Company */}
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontFamily: "'Nunito', sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "6px", fontFamily: "'Caveat', cursive", fontSize: "18px", fontWeight: "bold", color: "#2d2416", marginBottom: "4px" }}>
        <span>👥</span> Company
      </div>
      {["About Us", "Careers", "Pricing", "Contact Us", "Affiliates", "Partners"].map(link => (
        <span key={link} style={{ fontSize: "13px", fontWeight: 600, color: "rgba(45,36,22,0.75)", cursor: "pointer" }}>{link}</span>
      ))}
    </div>

    {/* Column 5: Legal */}
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontFamily: "'Nunito', sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "6px", fontFamily: "'Caveat', cursive", fontSize: "18px", fontWeight: "bold", color: "#2d2416", marginBottom: "4px" }}>
        <span>🔒</span> Legal
      </div>
      {["Privacy Policy", "Terms of Service", "Security", "GDPR", "Data Processing"].map(link => (
        <span key={link} style={{ fontSize: "13px", fontWeight: 600, color: "rgba(45,36,22,0.75)", cursor: "pointer" }}>{link}</span>
      ))}
    </div>

  </div>

  {/* ── INLINE DOTTED NEWSLETTER BANNER STRIP ── */}
  <div style={{ position: "relative", width: "100%", height: "54px", display: "flex", alignItems: "center", justifyContent: "center", gap: "14px", boxSizing: "border-box", marginBottom: "30px" }}>
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", overflow: "visible" }} viewBox="0 0 1320 54" preserveAspectRatio="none" fill="none">
      <rect x="1" y="1" width="1318" height="52" rx="10" stroke="#2d2416" strokeWidth="1.2" strokeDasharray="4 4" fill="rgba(255,253,249,0.5)" />
    </svg>
    <span style={{ fontSize: "16px", zIndex: 1 }}>🚀</span>
    <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: "14px", fontWeight: 700, color: "#2d2416", zIndex: 1 }}>
      Join 10,000+ creators who build better forms every day.
    </span>
    <span style={{ fontFamily: "'Caveat', cursive", fontSize: "18px", fontWeight: "bold", color: "#7c4dff", cursor: "pointer", zIndex: 1, borderBottom: "1.5px solid #7c4dff", marginLeft: "10px" }}>
      Start Building Free →
    </span>
    <span style={{ fontSize: "14px", zIndex: 1 }}>⭐</span>
  </div>

  {/* ── SUB-FOOTER BOTTOM LEGAL STRIP ── */}
  <div style={{ width: "100%", borderTop: "1.2px solid rgba(45,36,22,0.15)", paddingTop: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", boxSizing: "border-box", fontFamily: "'Nunito', sans-serif", fontSize: "12px", fontWeight: 700, color: "rgba(45,36,22,0.6)" }}>
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      <span>© 2026 ScribbleForms. All rights reserved.</span>
      <span style={{ fontFamily: "'Caveat', cursive", fontSize: "15px", color: "#2d2416" }}>Made with 💜 in India 🇮🇳</span>
    </div>

    {/* Social Links Row */}
    <div style={{ display: "flex", alignItems: "center", gap: "24px", color: "#2d2416", fontSize: "13px" }}>
      <span style={{ cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "6px" }}>🐦 Twitter</span>
      <span style={{ cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "6px" }}>💼 LinkedIn</span>
      <span style={{ cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "6px" }}>📺 YouTube</span>
      
      {/* Footer base sleep cat right side */}
      <div style={{ width: "80px", height: "auto", marginLeft: "10px" }}>
        <img src="/formsType/bottomRightCat(1).png" alt="Sleeping footer cat" style={{ width: "100%", height: "auto" }} />
      </div>
    </div>
  </div>

</div>



        {/* ── INTERACTIVE TRICK MODE MODAL OVERLAY ── */}
      {isTrickedOpen && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(45, 36, 22, 0.25)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 99999, padding: "20px" }}>
          <div style={{ position: "relative", width: "440px", padding: "40px 30px 30px 30px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
            <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0, overflow: "visible", filter: "drop-shadow(5px 6px 0px #2d2416)" }} viewBox="0 0 440 260" preserveAspectRatio="none" fill="none">
              <path d="M12 6 C150 4, 300 8, 426 5 C434 7, 436 15, 434 130 C435 210, 433 248, 424 252 C300 256, 120 253, 14 254 C6 252, 4 235, 5 130 C4 45, 6 8, 12 6 Z" fill="#fffdf9" />
              <path d="M12 6 C150 4, 300 8, 426 5 C434 7, 436 15, 434 130 C435 210, 433 248, 424 252 C300 256, 120 253, 14 254 C6 252, 4 235, 5 130 C4 45, 6 8, 12 6 Z" stroke="#2d2416" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M15 9 C160 7, 280 10, 422 9 C429 11, 431 22, 430 135 C431 200, 429 242, 421 246 C310 249, 140 248, 18 248 C10 246, 8 225, 9 135 C8 60, 10 12, 15 9 Z" stroke="#2d2416" strokeWidth="0.8" opacity="0.35" strokeLinecap="round" />
            </svg>
            <div onClick={() => setIsTrickedOpen(false)} style={{ position: "absolute", top: "14px", right: "20px", fontFamily: "'Caveat', cursive", fontSize: "24px", fontWeight: "bold", color: "#2d2416", cursor: "pointer", zIndex: 2, userSelect: "none" }}>✕</div>
            <div style={{ fontSize: "40px", margin: "0", zIndex: 1, position: "relative" }}>😜</div>
            <h2 style={{ fontFamily: "'Caveat', cursive", fontSize: "36px", fontWeight: "900", color: "#2d2416", margin: "0", zIndex: 1, position: "relative" }}>Ha ha, tricked u!</h2>
            <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "15px", fontWeight: "700", color: "rgba(45, 36, 22, 0.65)", margin: "0 0 6px 0", lineHeight: "1.4", zIndex: 1, position: "relative" }}>There is absolutely no dark mode here. Keep enjoying the warm paper vibes! 📜✨</p>
            <button onClick={() => setIsTrickedOpen(false)} style={{ backgroundColor: "#7c4dff", color: "#ffffff", fontFamily: "'Caveat', cursive", fontSize: "22px", fontWeight: "bold", border: "1.5px solid #2d2416", borderRadius: "8px", padding: "6px 36px", cursor: "pointer", outline: "none", zIndex: 1, position: "relative" }}>Okay, u got me 😂</button>
          </div>
        </div>
      )}

      {/* Internal Custom Scrollbars injector block */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(45, 36, 22, 0.15); border-radius: 99px; }
      `}} />

      </div>
  );
}