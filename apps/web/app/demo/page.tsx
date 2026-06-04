"use client";
import React, { useState } from "react";
import Link from "next/link";
import  Sidebar  from "~/components/Sidebar";
import * as Icons from "~/components/icons";
import { ScribbleStatCard } from "~/components/scribble/ScribbleStatCard";


/* ── LIGHT / THIN HAND-DRAWN CARD INNER COMPONENT ── */


/* ── COMPONENT: SCRIBBLE TYPE CHECKBOX ── */
function ScribbleCheckbox({ checked }: { checked: boolean }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", cursor: "pointer" }}>
      <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
        <path d="M2 8 Q2 2.5 8.5 2 Q15 2.5 15 8.5 Q14.5 15 8 15 Q2 14.5 2 8Z" fill={checked ? "#fbe98c" : "none"} stroke={checked ? "#2d2416" : "#9a8060"} strokeWidth="1.5"/>
        {checked && <path d="M5 8.5 L7.5 11 L12 6" stroke="#2d2416" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>}
      </svg>
    </div>
  );
}

export default function ResponsesPage() {
  const [search, setSearch] = useState("");
  const [selectedForm, setSelectedForm] = useState("All Forms");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [activeTab, setActiveTab] = useState("all");
  const [activeDetailTab, setActiveDetailTab] = useState("answers");
  const [selectedResponseId, setSelectedResponseId] = useState<string>("rohan");

  const records = [
    { id: "rohan", initials: "RS", name: "Rohan Sharma", email: "rohan@gmail.com", form: "Anime Convention Registration", status: "Completed", date: "May 16, 2024", time: "10:24 AM", duration: "04:32 mins", avatarBg: "#fdd9a0" },
    { id: "aisha", initials: "AK", name: "Aisha Khan", email: "aisha.khan@email.com", form: "Startup Feedback Survey", status: "Completed", date: "May 16, 2024", time: "09:18 AM", duration: "03:10 mins", avatarBg: "#cff0d0" },
    { id: "karthik", initials: "KR", name: "Karthik R.", email: "karthik.r@outlook.com", form: "Product Feedback Form", status: "In Progress", date: "May 16, 2024", time: "08:47 AM", duration: "—", avatarBg: "#e0d4f7" },
    { id: "meera", initials: "MP", name: "Meera Patel", email: "meera.patel@gmail.com", form: "Anime Convention Registration", status: "Completed", date: "May 15, 2024", time: "11:02 PM", duration: "05:12 mins", avatarBg: "#c8e2fa" }
  ];

  const currentActiveRecord = records.find(r => r.id === selectedResponseId) || records[0]!;

  return (
    <div style={{ display: "flex", background: "#fdf1df", minHeight: "100vh", width: "100%" }}>
      {/* Sidebar Assembly */}
      <Sidebar />

      {/* Main Framework Content Panel Area */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        
        {/* Top Header Shelf Bar */}
        <div style={{ display: "flex", alignItems: "center", padding: "16px 28px 0", gap: 12 }}>
          <Link href="/dashboard" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 6, fontFamily: "'Caveat', cursive", fontSize: 16, color: "#5a4a30" }}>
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M13 16l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Dashboard
          </Link>

          {/* Center Mascot Bubble Cluster */}
          <div style={{ margin: "0 auto", display: "flex", alignItems: "flex-end", gap: 12 }}>
            <svg width="54" height="58" viewBox="0 0 54 58" fill="none">
              <ellipse cx="27" cy="42" rx="10" ry="12" fill="#f5c87a"/>
              <ellipse cx="27" cy="46" rx="10" ry="9" fill="#7c9ef5"/>
              <circle cx="27" cy="22" r="12" fill="#f5c87a"/>
              <path d="M16 18 Q17 10 27 8 Q37 10 38 18 Q36 12 27 11 Q18 12 16 18Z" fill="#2d2416"/>
              <circle cx="23" cy="22" r="1.5" fill="#2d2416"/><circle cx="31" cy="22" r="1.5" fill="#2d2416"/>
              <path d="M23 27 Q27 30 31 27" stroke="#2d2416" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
              <path d="M37 36 Q42 30 46 28" stroke="#f5c87a" strokeWidth="4" strokeLinecap="round"/>
              <circle cx="48" cy="24" r="6" stroke="#2d2416" strokeWidth="2" fill="none" opacity="0.7"/>
              <path d="M52 28 L55 32" stroke="#2d2416" strokeWidth="2" strokeLinecap="round"/>
              <path d="M20 54 Q18 58 17 58" stroke="#2d2416" strokeWidth="3" strokeLinecap="round"/>
              <path d="M34 54 Q36 58 37 58" stroke="#2d2416" strokeWidth="3" strokeLinecap="round"/>
            </svg>
            <div style={{ marginBottom: 10 }}>
              <div style={{ background: "white", border: "1.5px solid #2d2416", borderRadius: 14, padding: "8px 13px", fontFamily: "'Caveat', cursive", fontSize: 14, boxShadow: "2px 2px 0 rgba(45,36,22,0.1)", maxWidth: 160, textAlign: "center" }}>
                Exploring answers... every response tells a story! ✨
              </div>
            </div>
          </div>

          {/* Notification + Actions Block */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ position: "relative", cursor: "pointer", display: "flex", alignItems: "center" }}>
              <Icons.BellIcon/>
              <div style={{ position: "absolute", top: -4, right: -4, background: "#e05c5c", color: "white", fontSize: 10, fontWeight: 700, width: 16, height: 16, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>3</div>
            </div>
            
            <div style={{  fontSize: 13, color: "#5a4a30", display: "flex", alignItems: "center", gap: 4 }}>
              New responses!
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M2 7h10M8 3l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            {/* Custom Layered Export Button Action */}
            <button style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "'Caveat', cursive", fontSize: 16, fontWeight: 600, cursor: "pointer", border: "none", background: "transparent", position: "relative", padding: "6px 14px" }}>
              <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0 }} viewBox="0 0 110 38" fill="none" preserveAspectRatio="none">
                <path d="M6 4 Q8 2 30 2.5 Q55 3 80 2 Q100 1.5 106 4 Q110 6 109 10 Q110 22 108 32 Q106 37 100 36.5 Q75 37.5 50 37 Q25 36.5 10 37 Q4 37 3 33 Q1 28 2 18 Q1 8 6 4Z" fill="#e0d4f7" stroke="#2d2416" strokeWidth="1.5"/>
              </svg>
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ position: "relative", zIndex: 1 }}>
                <path d="M10 3v10M6 9l4 4 4-4" strokeLinecap="round" strokeLinejoin="round"/><path d="M4 16h12" strokeLinecap="round"/>
              </svg>
              <span style={{ position: "relative", zIndex: 1, color: "#2d2416" }}>Export</span>
            </button>
          </div>
        </div>

        {/* Global Structural Divider */}
        <div style={{ padding: "8px 0 0" }}>
          <svg viewBox="0 0 900 8" height="8" style={{ width: "100%", display: "block" }} fill="none">
            <path d="M0 4 Q45 1.5 90 4 Q135 6.5 180 3.5 Q225 1 270 4.5 Q315 7 360 3 Q405 0.5 450 4 Q495 7 540 3.5 Q585 1 630 4 Q675 7 720 3 Q765 0.5 810 4.5 Q855 7 900 4" stroke="rgba(90,74,48,0.35)" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>

        {/* Core Page Data Architecture Content */}
        <div style={{ padding: "16px 28px 28px", flex: 1, display: "flex", flexDirection: "column" }}>
          <h2 style={{ fontFamily: "'Caveat', cursive", fontSize: 38, fontWeight: 700, margin: 0, display: "flex", alignItems: "center", gap: 10 }}>
            Responses
            <svg width="22" height="18" viewBox="0 0 22 18" fill="none">
              <path d="M2 14 Q4 10 6 12 Q8 14 10 9 Q12 5 14 8 Q16 11 18 7 Q19 5 20 6" stroke="#7c5cbf" strokeWidth="2" strokeLinecap="round" fill="none"/>
            </svg>
          </h2>
          <p style={{ fontFamily: "'Caveat', cursive", fontSize: 17, color: "#5a4a30", marginTop: 4, marginBottom: 20 }}>
            View and <span style={{ textDecoration: "underline", textDecorationStyle: "wavy", textUnderlineOffset: 3 }}>manage</span> all responses to your forms.
          </p>

          {/* METRIC GRID SUMMARY SECTION */}
          <div style={{ display: "flex", gap: 14, marginBottom: 20 }}>
            <ScribbleStatCard label="Total Responses" value="1,248" subColor="#fbe98c" rotation="-0.5deg" attachment="purple-pin">
              <svg width="60" height="24" viewBox="0 0 60 24" fill="none" style={{ marginTop: 6 }}>
                <path d="M2 18 Q10 16 18 14 Q26 10 30 12 Q36 14 40 8 Q46 2 58 4" stroke="#5a4a30" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
                <path d="M54 2 L60 4 L56 8" stroke="#5a4a30" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
            </ScribbleStatCard>
            
            <ScribbleStatCard label="Completed" value="1,156" percentage="92.6%" subColor="#f9c8c8" rotation="0.8deg" attachment="blue-tape" />
            <ScribbleStatCard label="In Progress" value="45" percentage="3.6%" subColor="#cff0d0" rotation="-0.3deg" attachment="red-pin" />
            <ScribbleStatCard label="Unstarted" value="47" percentage="3.8%" subColor="#e0d4f7" rotation="0.6deg" attachment="orange-tape" />
          </div>

          {/* SEARCH FILTERS CONTROLS SHELF */}
          {/* <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 16, position: "relative" }}>
            
            
          
          </div> */}

          <div style={{ position: "relative", padding: "12px 16px", marginBottom: 20, display: "flex", alignItems: "center" }}>
          {/* Outer Organic Border enclosing all search parameters */}
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", overflow: "visible" }} viewBox="0 0 900 52" preserveAspectRatio="none" fill="none">
            <path d="M3 4 Q15 2 200 3 T500 2 T896 4 Q899 10 898 26 T897 48 Q880 50 600 49 T200 50 T4 47 Q1 35 2 26 Z" stroke="#5a4a30" strokeWidth="1.2" fill="none" strokeOpacity="0.7"/>
            <path d="M4 6 Q25 3 250 4 T600 3 T895 5 Q897 12 896 28 T895 46 Q870 49 550 48 T150 49 T5 45 Q2 30 3 24 Z" stroke="#5a4a30" strokeWidth="0.8" fill="none" strokeOpacity="0.4"/>
          </svg>

          <div style={{ display: "flex", gap: 10, alignItems: "center", width: "100%", position: "relative", zIndex: 1, flexWrap: "wrap" }}>
            
            {/* 1. Search Box input wrapper */}
            <div style={{ position: "relative", width: 220, height: 34 }}>
              <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 220 34" fill="none" preserveAspectRatio="none">
                <path d="M4 4 Q30 2 110 2.5 T216 4 Q219 8 218 17 T216 30 Q180 32 110 31.5 T4 29 Q1 20 2 17 Z" fill="#fefaf2" stroke="#5a4a30" strokeWidth="1.2"/>
              </svg>
              <svg style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", zIndex: 2 }} width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="#9a8060" strokeWidth="1.8">
                <circle cx="9" cy="9" r="6"/><path d="M14 14l4 4" strokeLinecap="round"/>
              </svg>
              <input 
                type="text" 
                placeholder="Search responses..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ width: "100%", height: "100%", background: "transparent", border: "none", outline: "none", position: "relative", zIndex: 1, paddingLeft: 30, paddingRight: 10, fontFamily: "'Caveat', cursive", fontSize: 16, color: "#2d2416" }} 
              />
            </div>

            {/* 2. All Forms Selection Dropdown */}
            <div style={{ position: "relative", height: 34, width: 130 }}>
              <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 130 34" fill="none" preserveAspectRatio="none">
                <path d="M3 4 Q25 2 75 2.5 T126 4 Q128 8 127 17 T126 30 Q95 32 65 31.5 T4 29 Q2 20 3 17 Z" fill="#fefaf2" stroke="#5a4a30" strokeWidth="1.2"/>
              </svg>
              <select 
                value={selectedForm} 
                onChange={(e) => setSelectedForm(e.target.value)}
                style={{ width: "100%", height: "100%", background: "transparent", border: "none", outline: "none", position: "relative", zIndex: 1, padding: "0 24px 0 10px", fontFamily: "'Caveat', cursive", fontSize: 16, color: "#2d2416", appearance: "none" }}
              >
                <option>All Forms</option>
                <option>Anime Convention Registration</option>
                <option>Startup Feedback Survey</option>
                <option>Product Feedback Form</option>
              </select>
              {/* Custom Down Chevron Arrow */}
              <div style={{ position: "absolute", right: 10, top: "55%", transform: "translateY(-50%)", pointerEvents: "none", zIndex: 2 }}>
                <svg width="10" height="6" viewBox="0 0 12 8" fill="none"><path d="M1 1.5 Q4 5.5 6 6 Q8 5.5 11 1.5" stroke="#5a4a30" strokeWidth="1.8" strokeLinecap="round"/></svg>
              </div>
            </div>

            {/* 3. All Status Selection Dropdown */}
            <div style={{ position: "relative", height: 34, width: 120 }}>
              <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 120 34" fill="none" preserveAspectRatio="none">
                <path d="M4 3 Q25 2 70 2.5 T116 4 Q118 8 117 17 T116 30 Q85 31.5 55 31 T4 29 Q2 20 3 17 Z" fill="#fefaf2" stroke="#5a4a30" strokeWidth="1.2"/>
              </svg>
              <select 
                value={selectedStatus} 
                onChange={(e) => setSelectedStatus(e.target.value)}
                style={{ width: "100%", height: "100%", background: "transparent", border: "none", outline: "none", position: "relative", zIndex: 1, padding: "0 24px 0 10px", fontFamily: "'Caveat', cursive", fontSize: 16, color: "#2d2416", appearance: "none" }}
              >
                <option>All Status</option>
                <option>Completed</option>
                <option>In Progress</option>
                <option>Unstarted</option>
              </select>
              <div style={{ position: "absolute", right: 10, top: "55%", transform: "translateY(-50%)", pointerEvents: "none", zIndex: 2 }}>
                <svg width="10" height="6" viewBox="0 0 12 8" fill="none"><path d="M1 1.5 Q4 5.5 6 6 Q8 5.5 11 1.5" stroke="#5a4a30" strokeWidth="1.8" strokeLinecap="round"/></svg>
              </div>
            </div>

            {/* 4. Date Range Picker Component */}
            <div style={{ position: "relative", height: 34, width: 160 }}>
              <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 160 34" fill="none" preserveAspectRatio="none">
                <path d="M3 4 Q40 2 100 2.5 T156 4 Q158 8 157 17 T156 30 Q110 32 60 31.5 T4 29 Q2 20 3 17 Z" fill="#fefaf2" stroke="#5a4a30" strokeWidth="1.2"/>
              </svg>
              <div style={{ width: "100%", height: "100%", position: "relative", zIndex: 1, display: "flex", alignItems: "center", padding: "0 10px", gap: 6, fontFamily: "'Caveat', cursive", fontSize: 15, color: "#2d2416", cursor: "pointer" }}>
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <rect x="3" y="4" width="14" height="13" rx="2"/><path d="M3 8h14M7 2v4M13 2v4" strokeLinecap="round"/>
                </svg>
                <span>May 10 – May 16</span>
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ marginLeft: "auto" }}>
                  <path d="M7 3v4l3 2" strokeLinecap="round"/><circle cx="7" cy="7" r="5"/>
                </svg>
              </div>
            </div>

            {/* 5. More Filters Action Trigger Toggle Button */}
            <div style={{ position: "relative", height: 34, width: 124, marginLeft: "auto" }}>
              <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 124 34" fill="none" preserveAspectRatio="none">
                <path d="M4 4 Q30 2 80 2.5 T120 4 Q122 8 121 17 T120 30 Q85 32 50 31.5 T4 29 Q2 20 3 17 Z" fill="transparent" stroke="#5a4a30" strokeWidth="1.2"/>
              </svg>
              <button style={{ width: "100%", height: "100%", border: "none", background: "transparent", position: "relative", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontFamily: "'Caveat', cursive", fontSize: 16, color: "#2d2416", cursor: "pointer" }}>
                <span>More Filters</span>
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M4 6h12M6 10h8M8 14h4" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

          </div>
        </div>

          {/* DATA TAB ROW SELECT SHELF */}
          <div style={{ display: "flex", gap: 0, marginBottom: 14, borderBottom: "2px solid rgba(45,36,22,0.12)" }}>
            {["All Responses (1,248)", "Completed (1,156)", "In Progress (45)", "Unstarted (47)"].map((t, idx) => {
              const tabId = ["all", "completed", "progress", "unstarted"][idx]!;
              const active = activeTab === tabId;
              return (
                <button key={tabId} onClick={() => setActiveTab(tabId)} style={{
                  fontFamily: "'Caveat', cursive", fontSize: 17, fontWeight: active ? 700 : 500,
                  color: active ? "#2d2416" : "#5a4a30", padding: "8px 16px 10px", background: "none",
                  border: "none", cursor: "pointer", position: "relative"
                }}>
                  {t}
                  {active && <div style={{ position: "absolute", bottom: -2, left: 4, right: 4, height: "2.5px", background: "#2d2416", borderRadius: 2 }} />}
                </button>
              );
            })}
          </div>

          {/* DUAL MAIN SPLIT PANEL GRID SYSTEM VIEW */}
          <div style={{ display: "flex", gap: 16, flex: 1, alignItems: "stretch" }}>
            
            {/* DATA GRID FEED TABLE BOX LIST */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ textAlign: "left" }}>
                    <th style={{ width: 28, padding: "8px 12px" }}><ScribbleCheckbox checked={false} /></th>
                    <th style={{ fontFamily: "'Nunito', sans-serif", fontSize: 12, fontWeight: 600, textTransform: "uppercase", color: "#9a8060", padding: "8px 12px" }}>Respondent</th>
                    <th style={{ fontFamily: "'Nunito', sans-serif", fontSize: 12, fontWeight: 600, textTransform: "uppercase", color: "#9a8060", padding: "8px 12px" }}>Form</th>
                    <th style={{ fontFamily: "'Nunito', sans-serif", fontSize: 12, fontWeight: 600, textTransform: "uppercase", color: "#9a8060", padding: "8px 12px" }}>Status</th>
                    <th style={{ fontFamily: "'Nunito', sans-serif", fontSize: 12, fontWeight: 600, textTransform: "uppercase", color: "#9a8060", padding: "8px 12px" }}>Submitted</th>
                    <th style={{ width: 28 }}></th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((row) => {
                    const isSelected = selectedResponseId === row.id;
                    return (
                      <tr key={row.id} onClick={() => setSelectedResponseId(row.id)} style={{ cursor: "pointer" }}>
                        <td style={{ padding: "0 12px", background: isSelected ? "#fef6d0" : "transparent", height: 60, borderTop: "1px solid rgba(45,36,22,0.06)" }}>
                          <ScribbleCheckbox checked={isSelected} />
                        </td>
                        <td style={{ padding: "0 12px", background: isSelected ? "#fef6d0" : "transparent", fontFamily: "'Caveat', cursive", fontSize: 15, color: "#2d2416", borderTop: "1px solid rgba(45,36,22,0.06)" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <div style={{ width: 34, height: 34, borderRadius: "50%", background: row.avatarBg, display: "flex", alignItems: "center", justifyContent: "center", border: "1.5px solid #5a4a30" }}>
                              <span style={{ fontWeight: 700, fontSize: 13, color: "#5a4a30" }}>{row.initials}</span>
                            </div>
                            <div>
                              <div style={{ fontWeight: 600, fontSize: 16, lineHeight: 1.1 }}>{row.name}</div>
                              <div style={{ fontSize: 13, color: "#9a8060" }}>{row.email}</div>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: "0 12px", background: isSelected ? "#fef6d0" : "transparent", fontFamily: "'Caveat', cursive", fontSize: 15, color: "#2d2416", borderTop: "1px solid rgba(45,36,22,0.06)" }}>{row.form}</td>
                        <td style={{ padding: "0 12px", background: isSelected ? "#fef6d0" : "transparent", borderTop: "1px solid rgba(45,36,22,0.06)" }}>
                          <span style={{
                            display: "inline-block", padding: "3px 10px", borderRadius: 20, fontFamily: "'Caveat', cursive", fontSize: 14, fontWeight: 600, border: "1.5px solid currentColor",
                            color: row.status === "Completed" ? "#2d8a3e" : "#c86b00", background: row.status === "Completed" ? "#d4f5d8" : "#fde8c0"
                          }}>{row.status}</span>
                        </td>
                        <td style={{ padding: "0 12px", background: isSelected ? "#fef6d0" : "transparent", fontFamily: "'Caveat', cursive", fontSize: 15, color: "#2d2416", borderTop: "1px solid rgba(45,36,22,0.06)" }}>
                          <div style={{ fontSize: 15, lineHeight: 1.2 }}>{row.date}</div>
                          <div style={{ fontSize: 13, color: "#9a8060" }}>{row.time}</div>
                        </td>
                        <td style={{ padding: "0 12px", background: isSelected ? "#fef6d0" : "transparent", borderTop: "1px solid rgba(45,36,22,0.06)" }}>
                          <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "#9a8060" }}>···</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* RIGHT CONTEXTUAL DETAIL FIELD NOTE TAB PANEL */}
            <div style={{ width: 290, minWidth: 290, position: "relative", display: "flex", flexDirection: "column" }}>
              <div style={{ position: "absolute", top: -10, left: "50%", transform: "translateX(-50%) rotate(-2deg)", width: 54, height: 15, background: "#f9c8c8", borderRadius: 2, opacity: 0.85, zIndex: 20, boxShadow: "1px 1px 0 rgba(45,36,22,0.1)" }} />
              
              <div style={{
                borderRadius: 18, background: "#fefaf2", flex: 1, display: "flex", flexDirection: "column",
                position: "relative", boxShadow: "4px 5px 0 rgba(45,36,22,0.13)", overflow: "hidden"
              }}>
                {/* Structural Contour Framing Vector Border around panel */}
                <svg style={{ position: "absolute", inset: -2, width: "calc(100% + 4px)", height: "calc(100% + 4px)", pointerEvents: "none", zIndex: 10, overflow: "visible" }} viewBox="0 0 294 600" preserveAspectRatio="none" fill="none">
                  <path d="M6 5 Q10 1.5 32 2 Q90 3 148 2 Q206 1.5 262 2.5 Q282 3 288 7 Q293 11 292 50 Q294 150 292 300 Q294 430 292 540 Q291 570 284 574 Q264 578 206 576 Q148 575 90 576 Q44 577 10 575 Q2 572 1 560 Q0 530 2 420 Q0 280 2 160 Q0 60 3 20 Q4 10 6 5Z" stroke="#2d2416" strokeWidth="1.8" fill="none"/>
                </svg>

                {/* Header context info elements */}
                <div style={{ padding: "20px 16px 10px", display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 42, height: 42, borderRadius: "50%", background: "#fdd9a0", display: "flex", alignItems: "center", justifyContent: "center", border: "1.5px solid #2d2416", flexShrink: 0 }}>
                    <span style={{ fontFamily: "'Caveat', cursive", fontSize: 16, fontWeight: 700, color: "#2d2416" }}>{currentActiveRecord.initials}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "'Caveat', cursive", fontSize: 19, fontWeight: 700, lineHeight: 1.1 }}>{currentActiveRecord.name}</div>
                    <div style={{ fontFamily: "'Caveat', cursive", fontSize: 13, color: "#9a8060", display: "flex", alignItems: "center", gap: 4, marginTop: 2 }}>
                      {currentActiveRecord.email}
                      <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4"><rect x="1" y="3" width="12" height="9" rx="1.5"/><path d="M1 5l6 4 6-4" strokeLinecap="round"/></svg>
                    </div>
                  </div>
                  <span style={{ padding: "3px 10px", borderRadius: 20, fontFamily: "'Caveat', cursive", fontSize: 12, fontWeight: 600, color: "#2d8a3e", background: "#d4f5d8", border: "1.5px solid #2d8a3e" }}>{currentActiveRecord.status}</span>
                </div>

                {/* Structural Inter-Section Dividers */}
                <div style={{ padding: "0 16px" }}>
                  <svg viewBox="0 0 290 4" height="3" style={{ width: "100%", display: "block" }} fill="none">
                    <path d="M0 2 Q72 0.5 145 2.5 Q218 4 290 2" stroke="rgba(90,74,48,0.18)" strokeWidth="1.2"/>
                  </svg>
                </div>

                {/* Meta Summary Metrics Frame Rows */}
                <div style={{ padding: "4px 16px 12px", display: "flex", gap: 28 }}>
                  <div>
                    <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: 10, fontWeight: 700, color: "#9a8060", textTransform: "uppercase" }}>Submitted on</div>
                    <div style={{ fontFamily: "'Caveat', cursive", fontSize: 13, fontWeight: 600, marginTop: 2, lineHeight: 1.3 }}>{currentActiveRecord.date}<br/>at {currentActiveRecord.time}</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: 10, fontWeight: 700, color: "#9a8060", textTransform: "uppercase" }}>Time taken</div>
                    <div style={{ fontFamily: "'Caveat', cursive", fontSize: 14, fontWeight: 600, marginTop: 2, display: "flex", alignItems: "center", gap: 5 }}>
                      {currentActiveRecord.duration}
                      <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="#5a4a30" strokeWidth="1.4"><circle cx="8" cy="8" r="6"/><path d="M8 5v3l2 1.5" strokeLinecap="round"/></svg>
                    </div>
                  </div>
                </div>

                {/* Content Separator Header Divide */}
                <svg viewBox="0 0 290 4" height="3" style={{ width: "100%", display: "block" }} fill="none">
                  <path d="M0 2 Q72 0.5 145 2.5 Q218 4 290 2" stroke="rgba(90,74,48,0.15)" strokeWidth="1.2"/>
                </svg>

                {/* Inner Answers / Details Subnavigation Tab Selection Header */}
                <div style={{ display: "flex", padding: "0 8px", background: "#fefaf2" }}>
                  <button onClick={() => setActiveDetailTab("answers")} style={{ flex: 1, textAlign: "center", padding: "9px 8px 10px", fontFamily: "'Caveat', cursive", fontSize: 16, border: "none", background: "none", cursor: "pointer", fontWeight: activeDetailTab === "answers" ? 700 : 500, color: activeDetailTab === "answers" ? "#2d2416" : "#9a8060" }}>
                    Answers
                    {activeDetailTab === "answers" && <div style={{ position: "absolute", bottom: 0, left: 8, right: 8, height: "2.5px", background: "#2d2416" }} />}
                  </button>
                  <button onClick={() => setActiveDetailTab("details")} style={{ flex: 1, textAlign: "center", padding: "9px 8px 10px", fontFamily: "'Caveat', cursive", fontSize: 16, border: "none", background: "none", cursor: "pointer", fontWeight: activeDetailTab === "details" ? 700 : 500, color: activeDetailTab === "details" ? "#2d2416" : "#9a8060" }}>
                    Details
                    {activeDetailTab === "details" && <div style={{ position: "absolute", bottom: 0, left: 8, right: 8, height: "2.5px", background: "#2d2416" }} />}
                  </button>
                </div>

                {/* SCROLL CONTAINER: Dynamic fields item data entries inside layout view */}
                <div style={{ padding: "14px 16px 8px", flex: 1, overflowY: "auto", background: "#fefaf2", maxHeight: "calc(100vh - 360px)" }}>
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ fontFamily: "'Caveat', cursive", fontSize: 14, color: "#5a4a30", display: "flex", gap: 7, marginBottom: 4, alignItems: "flex-start", fontStyle: "italic" }}>
                      <div style={{ width: 20, height: 20, border: "1.5px solid #5a4a30", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, fontStyle: "normal" }}>1</div>
                      What's your name?
                    </div>
                    <div style={{ fontFamily: "'Caveat', cursive", fontSize: 16, fontWeight: 700, color: "#2d2416", paddingLeft: 27 }}>{currentActiveRecord.name}</div>
                  </div>

                  <svg viewBox="0 0 258 3" height="3" style={{ width: "100%", display: "block", margin: "6px 0" }} fill="none"><path d="M0 1.5 Q64 0.5 129 2 Q194 3 258 1.5" stroke="rgba(90,74,48,0.1)" strokeWidth="1"/></svg>

                  <div style={{ marginBottom: 12 }}>
                    <div style={{ fontFamily: "'Caveat', cursive", fontSize: 14, color: "#5a4a30", display: "flex", gap: 7, marginBottom: 4, alignItems: "flex-start", fontStyle: "italic" }}>
                      <div style={{ width: 20, height: 20, border: "1.5px solid #5a4a30", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, fontStyle: "normal" }}>2</div>
                      Your email address
                    </div>
                    <div style={{ fontFamily: "'Caveat', cursive", fontSize: 16, fontWeight: 700, color: "#2d2416", paddingLeft: 27, display: "flex", alignItems: "center", gap: 6 }}>
                      {currentActiveRecord.email}
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#9a8060" strokeWidth="1.4"><rect x="1" y="3" width="12" height="9" rx="1.5"/><path d="M1 5l6 4 6-4" strokeLinecap="round"/></svg>
                    </div>
                  </div>

                  <svg viewBox="0 0 258 3" height="3" style={{ width: "100%", display: "block", margin: "6px 0" }} fill="none"><path d="M0 1.5 Q64 0.5 129 2 Q194 3 258 1.5" stroke="rgba(90,74,48,0.1)" strokeWidth="1"/></svg>

                  <div style={{ marginBottom: 12 }}>
                    <div style={{ fontFamily: "'Caveat', cursive", fontSize: 14, color: "#5a4a30", display: "flex", gap: 7, marginBottom: 4, alignItems: "flex-start", fontStyle: "italic" }}>
                      <div style={{ width: 20, height: 20, border: "1.5px solid #5a4a30", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, fontStyle: "normal" }}>3</div>
                      Which days will you attend?
                    </div>
                    <div style={{ display: "flex", gap: 12, alignItems: "center", paddingLeft: 27, flexWrap: "wrap", marginTop: 2 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 5, fontFamily: "'Caveat', cursive", fontSize: 15, color: "#2d2416" }}>
                        <ScribbleCheckbox checked={true} /> Day 1
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 5, fontFamily: "'Caveat', cursive", fontSize: 15, color: "#2d2416" }}>
                        <ScribbleCheckbox checked={true} /> Day 2
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 5, fontFamily: "'Caveat', cursive", fontSize: 15, color: "#2d2416" }}>
                        <ScribbleCheckbox checked={false} /> Day 3
                      </div>
                    </div>
                  </div>
                </div>

                {/* LOCKED FOOTER ACTION BLOCK CONTAINER (Always remains visible at base) */}
                <div style={{ padding: "12px 16px 14px", borderTop: "1.5px solid rgba(45,36,22,0.1)", display: "flex", gap: 8, alignItems: "center", background: "#fefaf2", position: "relative", zIndex: 11 }}>
                  <button style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "'Caveat', cursive", fontSize: 16, fontWeight: 600, cursor: "pointer", border: "none", background: "transparent", position: "relative", padding: "6px 14px" }}>
              <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0 }} viewBox="0 0 110 38" fill="none" preserveAspectRatio="none">
                <path d="M6 4 Q8 2 30 2.5 Q55 3 80 2 Q100 1.5 106 4 Q110 6 109 10 Q110 22 108 32 Q106 37 100 36.5 Q75 37.5 50 37 Q25 36.5 10 37 Q4 37 3 33 Q1 28 2 18 Q1 8 6 4Z" fill="#e0d4f7" stroke="#2d2416" strokeWidth="1.5"/>
              </svg>
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ position: "relative", zIndex: 1 }}>
                <path d="M10 3v10M6 9l4 4 4-4" strokeLinecap="round" strokeLinejoin="round"/><path d="M4 16h12" strokeLinecap="round"/>
              </svg>
              <span style={{ position: "relative", zIndex: 1, color: "#2d2416" }}> View Full Response</span>
            </button>
                  
                  
                  <button style={{ background: "none", border: "1.5px solid rgba(45,36,22,0.3)", borderRadius: 8, width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, cursor: "pointer" }}>···</button>
                  
                  {/* Decorative Hand Heart Vector Stamp */}
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                    <path d="M12 20 C12 20 3 14 3 8.5 C3 6 5 4 7.5 4 C9.4 4 11 5.1 12 6.6 C13 5.1 14.6 4 16.5 4 C19 4 21 6 21 8.5 C21 14 12 20 12 20Z" fill="#e05c5c" stroke="#c04040" strokeWidth="1.2" strokeLinejoin="round"/>
                    <path d="M8 8 Q9.5 6.5 12 7.5" stroke="rgba(255,200,200,0.7)" strokeWidth="1" strokeLinecap="round" fill="none"/>
                  </svg>
                </div>

                {/* Bottom Corner folded paper decoration index */}
                <svg width="20" height="20" style={{ position: "absolute", bottom: 0, right: 0, zIndex: 5, pointerEvents: "none" }} viewBox="0 0 20 20" fill="none">
                  <path d="M20 2 L20 20 L2 20 Z" fill="rgba(45,36,22,0.1)"/>
                  <path d="M2 20 L20 2" stroke="rgba(45,36,22,0.18)" strokeWidth="1"/>
                </svg>

              </div>
            </div>

          </div>

        </div>

        {/* Footing separation layer sketch line */}
        <div style={{ padding: "0 28px" }}>
          <svg viewBox="0 0 900 6" height="6" style={{ width: "100%", display: "block" }} fill="none">
            <path d="M0 3 Q45 1 90 3.5 Q135 5.5 180 2.5 Q225 0.5 270 3.5 Q315 6 360 2.5 Q405 0 450 3 Q495 6 540 3 Q585 0.5 630 3.5 Q675 6 720 3 Q765 0.5 810 3.5 Q855 6 900 3" stroke="rgba(90,74,48,0.3)" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </div>

        {/* PRIVACY BANNER ASSEMBLED SLOT */}
        <div style={{
          margin: "16px 28px 20px", background: "#fbe98c", border: "1.5px solid rgba(45,36,22,0.2)", borderRadius: 8,
          padding: "10px 16px", display: "flex", alignItems: "center", gap: 10, fontFamily: "'Caveat', cursive", fontSize: 15,
          color: "#5a4a30", position: "relative", boxShadow: "2px 2px 0 rgba(45,36,22,0.08)"
        }}>
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="#5a4a30" strokeWidth="1.6">
            <rect x="5" y="9" width="10" height="9" rx="2"/><path d="M7 9V7a3 3 0 016 0v2" strokeLinecap="round"/><circle cx="10" cy="14" r="1.2" fill="#5a4a30"/>
          </svg>
          We take data privacy seriously. Your responses are safe with us!
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="#5a4a30" strokeWidth="1.6" style={{ marginLeft: "auto" }}>
            <rect x="5" y="9" width="10" height="9" rx="2"/><path d="M7 9V7a3 3 0 016 0v2" strokeLinecap="round"/><circle cx="10" cy="14" r="1.2" fill="#5a4a30"/>
          </svg>
        </div>

      </main>
    </div>
  );
}
