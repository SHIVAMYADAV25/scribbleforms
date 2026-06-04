"use client";

import React, { useState } from "react";
import Sidebar from "~/components/Sidebar"; 
import { Search, SlidersHorizontal, Plus, Eye, BarChart3, Link2, MoreHorizontal } from "lucide-react";
import { ScribbleButton } from "~/components/scribble/ScribbleButton";
import Image from "next/image";

export default function FormPage() {
  const [activeTab, setActiveTab] = useState("All Forms");
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 12; // 4 columns * 3 rows max per page layout view

  const cardsData = [
    { id: 1, type: "bar", title: "Anime Expo 2024 Feedback", status: "Published", statusColor: "#e1f5fe", textColor: "#0288d1", updated: "Updated 2 days ago", count: 312, tapeColor: "#ffccd5" },
    { id: 2, type: "line", title: "Customer Satisfaction Survey", status: "Published", statusColor: "#e8f5e9", textColor: "#2e7d32", updated: "Updated 5 days ago", count: 584, tapeColor: "#c8e6c9" },
    { id: 3, type: "pie", title: "Event Registration Form", status: "Unlisted", statusColor: "#fff3e0", textColor: "#ef6c00", updated: "Updated 1 week ago", count: 128, tapeColor: "#ffe0b2" },
    { id: 4, type: "pencil", title: "Product Feedback Form", status: "Draft", statusColor: "#f3e5f5", textColor: "#7b1fa2", updated: "Updated 3 hours ago", count: 0, tapeColor: "#e1bee7" },
    { id: 5, type: "nps", title: "NPS Survey", status: "Published", statusColor: "#e8f5e9", textColor: "#2e7d32", updated: "Updated 2 weeks ago", count: 256, tapeColor: "#ffccd5" },
    { id: 6, type: "checkbox", title: "Bug Report Form", status: "Draft", statusColor: "#f3e5f5", textColor: "#7b1fa2", updated: "Updated 4 days ago", count: 0, tapeColor: "#c5cae9" },
    { id: 7, type: "wave", title: "Workshop Feedback", status: "Unlisted", statusColor: "#fff3e0", textColor: "#ef6c00", updated: "Updated 1 week ago", count: 76, tapeColor: "#ffccd5" },
    { id: 8, type: "mail", title: "Contact Us Form", status: "Published", statusColor: "#e8f5e9", textColor: "#2e7d32", updated: "Updated 3 weeks ago", count: 93, tapeColor: "#c8e6c9" },
    { id: 9, type: "stars", title: "Course Rating Review", status: "Published", statusColor: "#e8f5e9", textColor: "#2e7d32", updated: "Updated 1 day ago", count: 420, tapeColor: "#c8e6c9" },
    { id: 10, type: "funnel", title: "Checkout Drop-off Form", status: "Published", statusColor: "#e1f5fe", textColor: "#0288d1", updated: "Updated 3 days ago", count: 89, tapeColor: "#ffccd5" },
    { id: 11, type: "target", title: "Feature Goal Feedback", status: "Unlisted", statusColor: "#fff3e0", textColor: "#ef6c00", updated: "Updated 6 days ago", count: 154, tapeColor: "#ffe0b2" },
    { id: 12, type: "donut", title: "Demographics Breakdown", status: "Draft", statusColor: "#f3e5f5", textColor: "#7b1fa2", updated: "Updated 5 hours ago", count: 0, tapeColor: "#e1bee7" },
  ];

  // Calculate dynamic paginated view window bounds
  const totalPages = Math.ceil(cardsData.length / cardsPerPage);
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = cardsData.slice(indexOfFirstCard, indexOfLastCard);

  const renderCardVisualSVG = (type: string) => {
    switch (type) {
      case "bar":
        return (
          <svg width="70" height="35" viewBox="0 0 70 35" fill="none" style={{ opacity: 0.75 }}>
            <line x1="0" y1="33" x2="70" y2="33" stroke="#2d2416" strokeWidth="1.2" strokeLinecap="round" />
            <rect x="4" y="22" width="6" height="11" rx="1.5" fill="#c7b9ff" stroke="#2d2416" strokeWidth="1" />
            <rect x="14" y="16" width="6" height="17" rx="1.5" fill="#c7b9ff" stroke="#2d2416" strokeWidth="1" />
            <rect x="24" y="12" width="6" height="21" rx="1.5" fill="#c7b9ff" stroke="#2d2416" strokeWidth="1" />
            <rect x="34" y="18" width="6" height="15" rx="1.5" fill="#c7b9ff" stroke="#2d2416" strokeWidth="1" />
            <rect x="44" y="8" width="6" height="25" rx="1.5" fill="#c7b9ff" stroke="#2d2416" strokeWidth="1" />
          </svg>
        );
      case "line":
        return (
          <svg width="75" height="45" viewBox="0 0 75 35" fill="none" style={{ opacity: 0.85 }}>
            <line x1="0" y1="33" x2="75" y2="33" stroke="#2d2416" strokeWidth="1" strokeLinecap="round" />
            <path d="M4 28 Q16 14 26 24 T52 10 T70 4" fill="none" stroke="#2e7d32" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="70" cy="4" r="2" fill="#2e7d32" />
          </svg>
        );
      case "pie":
        return (
          <svg width="42" height="42" viewBox="0 0 42 42" style={{ transform: "rotate(-45deg)" }}>
            <circle cx="21" cy="21" r="16" fill="#fffdf9" stroke="#2d2416" strokeWidth="1.2" />
            <path d="M21 21 L21 5 A16 16 0 0 1 37 21 Z" fill="#ffe0b2" stroke="#2d2416" strokeWidth="1" />
            <path d="M21 21 L37 21 A16 16 0 0 1 21 37 Z" fill="#fff3e0" stroke="#2d2416" strokeWidth="1" />
            <path d="M21 21 L21 37 A16 16 0 0 1 5 21 Z" fill="#c7b9ff" stroke="#2d2416" strokeWidth="1" />
          </svg>
        );
      case "pencil":
        return (
          <svg width="80" height="35" viewBox="0 0 80 35" fill="none">
            <line x1="2" y1="8" x2="50" y2="8" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="2" y1="18" x2="45" y2="18" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="2" y1="28" x2="52" y2="28" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" strokeLinecap="round" />
            <g transform="translate(56, 6) rotate(45)">
              <rect x="0" y="0" width="6" height="20" rx="1" fill="#fff" stroke="#2d2416" strokeWidth="1.2" />
              <path d="M0 0 L3 -5 L6 0 Z" fill="#fce09b" stroke="#2d2416" strokeWidth="1" />
            </g>
          </svg>
        );
      case "nps":
        return (
          <div style={{ display: "flex", gap: "5px", alignItems: "center", minHeight: "35px" }}>
            {["#ef4444", "#f97316", "#facc15", "#4ade80", "#22c55e"].map((color, i) => (
              <span key={i} style={{ width: "13px", height: "13px", backgroundColor: color, borderRadius: "50%", border: "1.1px solid #2d2416", display: "inline-block" }} />
            ))}
          </div>
        );
      case "checkbox":
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {[1, 2, 3].map((i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <div style={{ width: "10px", height: "10px", border: "1.2px solid #2d2416", borderRadius: "2px", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#fff" }}>
                  <span style={{ fontSize: "7px", color: "#2e7d32", fontWeight: "bold" }}>✓</span>
                </div>
                <div style={{ width: "45px", height: "2px", backgroundColor: "rgba(0,0,0,0.1)", borderRadius: "1px" }} />
              </div>
            ))}
          </div>
        );
      case "wave":
        return (
          <svg width="85" height="35" viewBox="0 0 85 35" fill="none">
            <path d="M2 28 Q15 4 28 15 T56 8 T82 22" fill="none" stroke="#634cc9" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M2 22 Q18 12 32 20 T60 4 T82 14" fill="none" stroke="#634cc9" strokeWidth="0.8" strokeDasharray="2,2" />
          </svg>
        );
      case "mail":
        return (
          <svg width="40" height="30" viewBox="0 0 40 30" fill="none" style={{ transform: "rotate(-5deg)", opacity: 0.85 }}>
            <rect x="2" y="2" width="36" height="24" rx="3" fill="#e1bee7" stroke="#2d2416" strokeWidth="1.3" />
            <path d="M2 4 L20 16 L38 4" stroke="#2d2416" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case "stars":
        return (
          <svg width="75" height="35" viewBox="0 0 75 35" fill="none" style={{ opacity: 0.85 }}>
            <rect x="20" y="4" width="45" height="4" rx="2" fill="#facc15" stroke="#2d2416" strokeWidth="1" />
            <rect x="20" y="14" width="30" height="4" rx="2" fill="#e1bee7" stroke="#2d2416" strokeWidth="1" />
            <rect x="20" y="24" width="12" height="4" rx="2" fill="rgba(0,0,0,0.1)" stroke="#2d2416" strokeWidth="1" />
            <path d="M68 5 C72 12, 64 22, 70 30" stroke="rgba(45,36,22,0.2)" strokeWidth="1" strokeLinecap="round" />
          </svg>
        );
      case "funnel":
        return (
          <svg width="65" height="35" viewBox="0 0 65 35" fill="none">
            <path d="M22 23 Q32 22, 43 23 L39 31 Q32 31, 26 31 Z" fill="#ffccd5" stroke="#2d2416" strokeWidth="1.2" strokeLinejoin="round" />  
            <path d="M14 13 Q32 12, 51 13 L44 21 Q32 20, 21 21 Z" fill="#ffe0b2" stroke="#2d2416" strokeWidth="1.2" strokeLinejoin="round" />
            <path d="M5 3 Q32 1, 60 3 L52 11 Q32 9, 13 11 Z" fill="#c7b9ff" stroke="#2d2416" strokeWidth="1.2" strokeLinejoin="round" />
          </svg>
        );
      case "target":
        return (
          <svg width="45" height="45" viewBox="0 0 44 44" style={{ opacity: 0.9 }}>
            <circle cx="22" cy="22" r="18" fill="none" stroke="#2d2416" strokeWidth="1.2" strokeDasharray="44 2" />
            <circle cx="22" cy="22" r="11" fill="#fffdf9" stroke="#ef4444" strokeWidth="1.2" />
            <circle cx="22" cy="22" r="4" fill="#ef4444" stroke="#2d2416" strokeWidth="0.8" />
            <path d="M4 38 L16 26 M14 26 L16 26 L16 28" stroke="#2d2416" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M2 40 L5 43 M4 38 L7 41" stroke="#2d2416" strokeWidth="1" />
          </svg>
        );
      case "donut":
        return (
          <svg width="42" height="42" viewBox="0 0 42 42" style={{ transform: "rotate(-15deg)" }}>
            <circle cx="21" cy="21" r="15" fill="none" stroke="#2d2416" strokeWidth="5" style={{ opacity: 0.08 }} />
            <circle cx="21" cy="21" r="15" fill="none" stroke="#c7b9ff" strokeWidth="5" strokeDasharray="94" strokeDashoffset="25" strokeLinecap="round" style={{ transform: "rotate(-90deg)", transformOrigin: "21px 21px" }} />
            <circle cx="21" cy="21" r="15" fill="none" stroke="#c8e6c9" strokeWidth="4.5" strokeDasharray="94" strokeDashoffset="70" strokeLinecap="round" style={{ transform: "rotate(20deg)", transformOrigin: "21px 21px" }} />
            <circle cx="21" cy="21" r="17.5" fill="none" stroke="#2d2416" strokeWidth="1" strokeDasharray="3 4" />
            <circle cx="21" cy="21" r="12.5" fill="none" stroke="#2d2416" strokeWidth="1" style={{ opacity: 0.5 }} />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundImage: "url('/form/formBG.png')",
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "fixed",
        top: 0,
        left: 0,
        overflow: "hidden",
        boxSizing: "border-box",
        fontFamily: "'Nunito', sans-serif",
      }}
    >
      {/* ── INTERNAL 80% WORKSPACE WRAPPER ── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "125vw", 
          height: "125vh", 
          display: "flex",
          transform: "scale(0.8)",
          transformOrigin: "top left",
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        {/* LEFT SIDEBAR AREA */}
        <div
          style={{
            width: "240px",
            height: "100%",
            paddingLeft: "65px", 
            paddingTop: "24px",
            display: "flex",
            flexDirection: "column",
            boxSizing: "border-box",
            flexShrink: 0,
          }}
        >
          <Sidebar activeTab="Form" />
        </div>

        {/* MAIN CONTENT AREA */}
        <div
          style={{
            flex: 1,
            height: "100%",
            padding: "45px 60px 45px 170px",
            display: "flex",
            flexDirection: "column",
            boxSizing: "border-box",
            overflow: "hidden", 
          }}
        >
          {/* HEADER SECTION */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", marginBottom: "25px" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <h2 style={{ fontSize: "28px", fontWeight: "bold", margin: 0, color: "#1a150e", fontFamily: "'Caveat', cursive" }}>
                  My Forms
                </h2>
                <span style={{ color: "#a78bfa", fontSize: "20px" }}>
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.9 }}>
  {/* Hand-drawn sketchy fill effect */}
  <path 
    d="M12 20.5S3 14 3 8.5A4.5 4.5 0 0 1 11.5 5.5c.2.3.4.7.5 1 .1-.3.3-.7.5-1A4.5 4.5 0 0 1 21 8.5c0 5.5-9 12-9 12z" 
    fill="#a78bfa" 
    fillOpacity="0.4"
  />
  {/* Organic, slightly imperfect scribble outline */}
  <path 
    d="M12 21C11.5 20.6 3 14 3 8.5A4.5 4.5 0 0 1 11.5 5.5Q12 6.5 12.5 5.5A4.5 4.5 0 0 1 21 8.5C21 14 12.5 20.6 12 21Z" 
    stroke="#2d2416" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
  />
  {/* Small sketchy inner highlight curve to emphasize the hand-drawn feel */}
  <path 
    d="M6 8.5A1.5 1.5 0 0 1 8.5 7" 
    stroke="#fff" 
    strokeWidth="1.2" 
    strokeLinecap="round" 
  />
</svg>

                </span>
              </div>
              <p style={{ margin: "4px 0 0 0", fontSize: "14px", color: "rgba(45, 36, 22, 0.6)", fontWeight: 500 }}>
                Create, manage and analyze your forms all in one place.
              </p>
            </div>

            {/* Search, Filter & CTA Action Blocks */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginLeft: "auto", position: "relative" }}>
              <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                <input
                  type="text"
                  placeholder="Search forms..."
                  style={{
                    padding: "8px 36px 8px 12px",
                    borderRadius: "8px",
                    border: "1px solid rgba(0,0,0,0.15)",
                    fontSize: "13px",
                    backgroundColor: "rgba(255,255,255,0.6)",
                    outline: "none",
                    width: "180px",
                  }}
                />
                <Search style={{ width: "16px", height: "16px", position: "absolute", right: "12px", color: "rgba(0,0,0,0.4)" }} />
              </div>

              <ScribbleButton
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "8px 14px",
                  borderRadius: "8px",
                  border: "1px solid rgba(0,0,0,0.15)",
                  backgroundColor: "rgba(255,255,255,0.6)",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                <SlidersHorizontal style={{ width: "14px", height: "14px" }} /> Filter
              </ScribbleButton>

              <ScribbleButton
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  border: "1px solid rgba(0,0,0,0.15)",
                  backgroundColor: "#c7b9ff",
                  color: "#1a150e",
                  fontSize: "13px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  boxShadow: "2px 2px 0px rgba(0,0,0,0.15)",
                }}
              >
                <Plus style={{ width: "16px", height: "16px" }} /> Create New Form
              </ScribbleButton>

              {/* ── THE HANGING BOY DECORATIVE ASSET ANCHOR ── */}
              <div 
                style={{ 
                  position: "absolute",
                  top: "4px",            
                  left: "35px",           
                  width: "150px", 
                  height: "180px",
                  pointerEvents: "none",
                  zIndex: 20
                }}
              >
                <Image 
                  src="/form/holdingBoy.png" 
                  alt="Scribble doodle character hanging down" 
                  fill
                  priority
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>
          </div>

          {/* HAND-DRAWN SKETCH FILTER ROW CONTAINER */}
          <div 
            style={{ 
              display: "flex", 
              alignItems: "center",
              gap: "12px", 
              border: "1px solid rgba(45, 36, 22, 0.15)", 
              borderRadius: "10px",
              padding: "6px 8px", 
              marginBottom: "30px",
              backgroundColor: "rgba(255, 255, 255, 0.4)",
              width: "max-content",
              boxShadow: "inset 0 1px 2px rgba(0,0,0,0.02)"
            }}
          >
            {[
              { name: "All Forms", count: 12, activeBg: "#dcd4ff", activeColor: "#2d2416", circleBg: "transparent", circleBorder: "rgba(0,0,0,0.3)" },
              { name: "Drafts", count: 4, activeBg: "#f3e5f5", activeColor: "#7b1fa2", circleBg: "#fff", circleBorder: "rgba(0,0,0,0.15)" },
              { name: "Published", count: 6, activeBg: "#e8f5e9", activeColor: "#2e7d32", circleBg: "#fff", circleBorder: "rgba(46, 125, 50, 0.3)" },
              { name: "Unlisted", count: 2, activeBg: "#fff3e0", activeColor: "#ef6c00", circleBg: "#fff", circleBorder: "rgba(239, 108, 0, 0.3)" },
              { name: "Archived", count: 0, activeBg: "#f5f5f5", activeColor: "rgba(0,0,0,0.5)", circleBg: "#fff", circleBorder: "rgba(0,0,0,0.15)" }
            ].map((tab, idx) => {
              const isActive = activeTab === tab.name;
              return (
                <button
                  key={tab.name}
                  onClick={() => { setActiveTab(tab.name); setCurrentPage(1); }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontSize: "13px",
                    fontWeight: 700,
                    color: isActive ? tab.activeColor : "rgba(45, 36, 22, 0.7)",
                    cursor: "pointer",
                    backgroundColor: isActive ? tab.activeBg : "transparent",
                    padding: "6px 16px",
                    borderRadius: "8px",
                    border: isActive ? "1px solid rgba(0, 0, 0, 0.1)" : "1px solid transparent",
                    outline: "none",
                    fontFamily: "'Nunito', sans-serif",
                    transition: "all 0.15s ease",
                    boxShadow: isActive ? "0 1px 3px rgba(0,0,0,0.05)" : "none"
                  }}
                >
                  <span style={{ letterSpacing: "0.01em" }}>{tab.name}</span>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "11px",
                      fontWeight: 800,
                      color: "#2d2416",
                      backgroundColor: tab.circleBg,
                      border: `1px solid ${tab.circleBorder}`,
                      borderRadius: "50%",
                      width: "20px",
                      height: "20px",
                      lineHeight: 1
                    }}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* SCRIBBLED CARDS GRID */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gridTemplateRows: "repeat(3, 1fr)", 
              gap: "24px",
              flex: 1,
              alignContent: "start",
            }}
          >
            {currentCards.map((card, index) => (
              <div
                key={`${card.id}-${index}`}
                style={{
                  backgroundColor: "#fefbf5",
                  border: "1px dashed rgba(0,0,0,0.2)",
                  borderRadius: "12px",
                  padding: "20px 16px 12px 16px",
                  position: "relative",
                  boxShadow: "2px 4px 12px rgba(0,0,0,0.03)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minHeight: "160px",
                }}
              >
                {/* Decorative Sticky Tape Effect */}
                <div
                  style={{
                    position: "absolute",
                    top: "-8px",
                    left: "35%",
                    width: "50px",
                    height: "16px",
                    backgroundColor: card.tapeColor,
                    opacity: 0.6,
                    transform: "rotate(-2deg)",
                  }}
                />

                {/* Title & Options Bar */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                    <h4 style={{ margin: "0 0 8px 0", fontSize: "14px", fontWeight: 700, color: "#2d2416", maxWidth: "85%" }}>
                      {card.title}
                    </h4>
                    <MoreHorizontal style={{ width: "16px", height: "16px", color: "rgba(0,0,0,0.4)", cursor: "pointer" }} />
                  </div>

                  {/* Status Badge */}
                  <span
                    style={{
                      backgroundColor: card.statusColor,
                      color: card.textColor,
                      fontSize: "10px",
                      fontWeight: 700,
                      padding: "2px 6px",
                      borderRadius: "4px",
                      textTransform: "uppercase",
                    }}
                  >
                    {card.status}
                  </span>
                  <p style={{ fontSize: "11px", color: "rgba(0,0,0,0.4)", margin: "8px 0 0 0" }}>{card.updated}</p>
                </div>

                {/* Graphical Sparkline Metric & Response Analytics Counter */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "12px" }}>
                  <div style={{ display: "flex", alignItems: "center", minHeight: "35px" }}>
                    {renderCardVisualSVG(card.type)}
                  </div>

                  <div style={{ textAlign: "center", border: "1px solid rgba(0,0,0,0.1)", borderRadius: "50%", width: "42px", height: "42px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <span style={{ fontSize: "12px", fontWeight: "bold", display: "block", lineHeight: 1 }}>{card.count}</span>
                    <span style={{ fontSize: "7px", color: "rgba(0,0,0,0.5)" }}>res</span>
                  </div>
                </div>

                {/* Bottom Card Utility Micro-actions Toolbar */}
                <div
                  style={{
                    borderTop: "1px dashed rgba(0,0,0,0.08)",
                    marginTop: "12px",
                    paddingTop: "8px",
                    display: "flex",
                    justifyContent: "space-between",
                    color: "rgba(45, 36, 22, 0.5)",
                  }}
                >
                  <Eye style={{ width: "14px", height: "14px", cursor: "pointer" }} />
                  <BarChart3 style={{ width: "14px", height: "14px", cursor: "pointer" }} />
                  <Link2 style={{ width: "14px", height: "14px", cursor: "pointer" }} />
                </div>
              </div>
            ))}
          </div>

          {/* BOTTOM PAGINATION FOOTER CONTROL */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", marginTop: "auto", paddingTop: "20px" }}>
            <span style={{ fontSize: "12px", color: "rgba(0,0,0,0.4)", marginRight: "auto" }}>
              Showing {indexOfFirstCard + 1} to {Math.min(indexOfLastCard, cardsData.length)} of {cardsData.length} forms
            </span>
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              style={{ border: "none", background: "none", cursor: "pointer", fontWeight: "bold", opacity: currentPage === 1 ? 0.3 : 1 }}
            >
              &lt;
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => (
              <button 
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                style={{ 
                  border: "none", 
                  backgroundColor: currentPage === i + 1 ? "#c7b9ff" : "transparent", 
                  width: "24px", 
                  height: "24px", 
                  borderRadius: "4px", 
                  fontSize: "12px", 
                  fontWeight: "bold",
                  cursor: "pointer"
                }}
              >
                {i + 1}
              </button>
            ))}

            <button 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              style={{ border: "none", background: "none", cursor: "pointer", fontWeight: "bold", opacity: currentPage === totalPages ? 0.3 : 1 }}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}