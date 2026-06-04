"use client"

import React, { useState } from 'react';
import Image from 'next/image';

// ── MOCK THEME DATA STRUCTURE ──
const AVAILABLE_THEMES = [
  { id: 'anime', title: 'Anime Vibe', accent: '#ff8bb2' },
  { id: 'gaming', title: 'Retro Gamer', accent: '#a78bfa' },
  { id: 'space', title: 'Cosmic Exploration', accent: '#60a5fa' },
  { id: 'celebration', title: 'Party Time', accent: '#fbbf24' },
  { id: 'nature', title: 'Serene Mountains', accent: '#34d399' },
  { id: 'night', title: 'Midnight Chill', accent: '#818cf8' },
  { id: 'ocean', title: 'Great Waves', accent: '#22d3ee' },
  { id: 'city', title: 'Cyber Cityscape', accent: '#f472b6' },
];

const Page = () => {
  const [selectedTheme, setSelectedTheme] = useState('anime');

  const handleThemeSelect = (themeId: string) => {
    setSelectedTheme(themeId);
  };

  return (
    <div style={{
      position: "relative",
      width: "100vw",
      height: "100vh",
      backgroundColor: "#f4ede4", 
      overflow: "hidden",
      boxSizing: "border-box"
    }}>
      
      {/* ── 100% FULLSCREEN BACKGROUND CANVAS LAYER ── */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <Image 
          src="/ThemeBG(2).png" 
          alt="Scribble Forms Theme Dashboard Background" 
          fill
          priority
          style={{ objectFit: "fill" }} // Forces full 100% edge-to-edge layout stretching
        />
      </div>

      {/* ── LEFT SIDEBAR TITLE TRACK OVERLAY ── */}
      <div style={{
        position: "absolute",
        width: "14vw",
        height: "35vh",
        left: "3vw",
        top: "14vh",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Nunito', sans-serif",
        zIndex: 2
      }}>
        <h1 style={{ 
          fontFamily: "'Caveat', cursive, sans-serif", 
          fontSize: "calc(1.5vw + 12px)", 
          fontWeight: "900", 
          color: "#2d2416",
          margin: "0 0 6px 0",
          lineHeight: "1.1"
        }}>
          Choose a Theme
        </h1>
        <p style={{ fontSize: "calc(0.5vw + 6px)", color: "rgba(45, 36, 22, 0.6)", fontWeight: "600", margin: 0, lineHeight: "1.3" }}>
          Select a custom hand-drawn canvas layout styling configuration for your live audience forms tracking views.
        </p>
      </div>

      {/* ── INTERACTIVE POLAROID GRID CONTAINER MATRIX ── */}
      {/* <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
        {AVAILABLE_THEMES.map((theme, index) => {
          const isTopRow = index < 4;
          const columnOffset = index % 4;

          // Scaled position mappings matching your background template matrix safely
          const baseLeft = 21.2; 
          const baseTop = 20.6;  
          
          const cardWidth = 17.6; 
          const cardHeight = 28.2; 
          
          const horizontalGap = 1.8;
          const verticalGap = 2.8;

          const computedLeft = baseLeft + columnOffset * (cardWidth + horizontalGap);
          const computedTop = isTopRow ? baseTop : baseTop + cardHeight + verticalGap;

          const isSelected = selectedTheme === theme.id;

          return (
            <button
              key={theme.id}
              onClick={() => handleThemeSelect(theme.id)}
              style={{
                position: "absolute",
                left: `${computedLeft}vw`,
                top: `${computedTop}vh`,
                width: `${cardWidth}vw`,
                height: `${cardHeight}vh`,
                backgroundColor: isSelected ? "rgba(99, 76, 201, 0.04)" : "transparent",
                border: isSelected ? `2.5px solid ${theme.accent}` : "2.5px solid transparent",
                borderRadius: "14px",
                cursor: "pointer",
                outline: "none",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                alignItems: "center",
                padding: "1.5vh 1vw",
                boxSizing: "border-box",
                transition: "all 0.15s ease",
                boxShadow: isSelected ? `0px 6px 14px rgba(45, 36, 22, 0.06)` : "none"
              }}
              onMouseEnter={(e) => {
                if (!isSelected) e.currentTarget.style.backgroundColor = "rgba(45, 36, 22, 0.02)";
              }}
              onMouseLeave={(e) => {
                if (!isSelected) e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              {/* Active Indicator Label Tag Bubble */}
              {/* <span style={{
                fontFamily: "'Caveat', cursive, sans-serif",
                fontSize: "calc(0.6vw + 10px)",
                fontWeight: "800",
                color: "#2d2416",
                backgroundColor: isSelected ? "white" : "rgba(255, 255, 255, 0.75)",
                border: "1.2px solid #c8b8a0",
                padding: "2px 10px",
                borderRadius: "99px",
                maxWidth: "90%",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                boxShadow: "0 1px 2px rgba(0,0,0,0.02)"
              }}>
                {theme.title}
              </span>
            </button>
          );
        })} */}
      {/* </div> */} 

    </div>
  );
};

export default Page;