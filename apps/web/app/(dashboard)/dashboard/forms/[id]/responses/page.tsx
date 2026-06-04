// "use client";
// import { use, useState } from "react";
// import { useFormDetail, useResponseList, useDeleteResponse } from "~/hooks/api";
// import { ScribbleCard } from "~/components/scribble/ScribbleCard";
// import { ScribbleButton } from "~/components/scribble/ScribbleButton";
// import { SkeletonScribble } from "~/components/scribble/ScribbleUI";
// import { ScribbleDivider } from "~/components/scribble/ScribbleDecorations";
// import { ArrowLeftIcon, SearchIcon, RatingStarIcon, HeartIcon ,PaperPlaneIcon, TrendingIcon } from "~/components/icons";
// import Link from "next/link";
// import { ScribbleCustomInput } from "~/components/scribble/ScribInput";



// const COLORS = ["#f5c842","#f2a0b8","#7ec8e3","#8dc97a","#b8a0e8","#f5a88a"];
// function getColor(str: string) { let h = 0; for (const c of str) h = c.charCodeAt(0) + h * 31; return COLORS[Math.abs(h) % COLORS.length]!; }


// function ResponseRow({ response, isSelected, onSelect }: { response: any; isSelected: boolean; onSelect: () => void }) {
//   const name = response.nameAnswer ?? "Anonymous";
//   const initials = name.split(" ").map((w: string) => w[0]).join("").slice(0,2).toUpperCase();
//   const bg = getColor(response.id);

//   return (
//     <tr
//       onClick={onSelect}
//       style={{
//         cursor:"pointer",
//         background: isSelected ? "#fef6d0" : "transparent",
//         borderBottom: "1px solid rgba(30,22,8,0.06)",
//         transition:"background 0.1s",
//       }}
//     >
//       <td style={{ padding:"14px 12px" }}>
//         <div style={{ display:"flex", alignItems:"center", gap:10 }}>
//           <div style={{ width:34, height:34, borderRadius:"50%", background:bg, border:"1.5px solid var(--ink-2)",
//             display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
//             <span style={{ fontFamily:"var(--font-display)", fontSize:13, fontWeight:700, color:"var(--ink-1)" }}>{initials}</span>
//           </div>
//           <div>
//             <p style={{ fontFamily:"var(--font-display)", fontSize:15, fontWeight:700, color:"var(--ink-1)", margin:0, lineHeight:1.1 }}>{name}</p>
//             <p style={{ fontFamily:"var(--font-body)", fontSize:12, color:"var(--ink-3)", margin:0 }}>{response.emailAnswer ?? ""}</p>
//           </div>
//         </div>
//       </td>
//       <td style={{ padding:"14px 8px", fontFamily:"var(--font-body)", fontSize:13, color:"var(--ink-2)" }}>
//         {response.isComplete ? (
//           <span style={{ color:"#2d8a3e", background:"#d4f5d4", borderRadius:12, padding:"2px 9px", border:"1.5px solid #2d8a3e", fontFamily:"var(--font-display)", fontSize:13, fontWeight:700 }}>
//             Completed
//           </span>
//         ) : (
//           <span style={{ color:"#c86b00", background:"#fde8c0", borderRadius:12, padding:"2px 9px", border:"1.5px solid #c86b00", fontFamily:"var(--font-display)", fontSize:13, fontWeight:700 }}>
//             In Progress
//           </span>
//         )}
//       </td>
//       <td style={{ padding:"14px 8px", fontFamily:"var(--font-body)", fontSize:13, color:"var(--ink-2)" }}>
//         <div>{new Date(response.createdAt).toLocaleDateString()}</div>
//         <div style={{ fontSize:11, color:"var(--ink-3)" }}>{new Date(response.createdAt).toLocaleTimeString()}</div>
//       </td>
//       <td style={{ padding:"14px 8px" }}>
//         <button style={{ background:"none", border:"none", cursor:"pointer", fontSize:18, color:"var(--ink-3)" }}>···</button>
//       </td>
//     </tr>
//   );
// }

// function ResponseDetail({ response }: { response: any }) {
//   if (!response) return (
//     <div style={{ padding:20, textAlign:"center", color:"var(--ink-3)", fontFamily:"var(--font-body)", fontSize:14 }}>
//       Select a response to view details
//     </div>
//   );

//   const name = response.nameAnswer ?? "Anonymous";
//   const bg = getColor(response.id);
//   const initials = name.split(" ").map((w: string) => w[0]).join("").slice(0,2).toUpperCase();

//   return (
//     <div style={{ height:"100%", display:"flex", flexDirection:"column" }}>
//       {/* Header */}
//       <div style={{ padding:"16px 16px 10px", borderBottom:"1.5px solid rgba(30,22,8,0.1)" }}>
//         <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
//           <div style={{ width:40, height:40, borderRadius:"50%", background:bg, border:"1.5px solid var(--ink-1)",
//             display:"flex", alignItems:"center", justifyContent:"center" }}>
//             <span style={{ fontFamily:"var(--font-display)", fontSize:16, fontWeight:700 }}>{initials}</span>
//           </div>
//           <div style={{ flex:1 }}>
//             <p style={{ fontFamily:"var(--font-display)", fontSize:18, fontWeight:700, color:"var(--ink-1)", margin:0 }}>{name}</p>
//             <p style={{ fontFamily:"var(--font-body)", fontSize:12, color:"var(--ink-3)", margin:0 }}>{response.emailAnswer}</p>
//           </div>
//           {response.isComplete ? (
//             <span style={{ color:"#2d8a3e", background:"#d4f5d4", borderRadius:12, padding:"3px 10px", border:"1.5px solid #2d8a3e", fontFamily:"var(--font-display)", fontSize:13, fontWeight:700 }}>
//               Completed
//             </span>
//           ) : null}
//         </div>
//         <div style={{ display:"flex", gap:24 }}>
//           <div>
//             <p style={{ fontFamily:"var(--font-body)", fontSize:10, fontWeight:700, color:"var(--ink-3)", textTransform:"uppercase", letterSpacing:"0.08em", margin:0 }}>Submitted</p>
//             <p style={{ fontFamily:"var(--font-display)", fontSize:13, fontWeight:600, color:"var(--ink-1)", margin:0 }}>
//               {new Date(response.createdAt).toLocaleString()}
//             </p>
//           </div>
//           <div>
//             <p style={{ fontFamily:"var(--font-body)", fontSize:10, fontWeight:700, color:"var(--ink-3)", textTransform:"uppercase", letterSpacing:"0.08em", margin:0 }}>Time</p>
//             <p style={{ fontFamily:"var(--font-display)", fontSize:13, fontWeight:600, color:"var(--ink-1)", margin:0 }}>
//               {response.timeToCompleteMs ? `${Math.round(response.timeToCompleteMs/60000)} mins` : "—"}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Tabs */}
//       <div style={{ display:"flex", borderBottom:"1.5px solid rgba(30,22,8,0.1)", padding:"0 8px" }}>
//         {["Answers","Details"].map((t) => (
//           <button key={t} style={{ flex:1, padding:"8px", fontFamily:"var(--font-display)", fontSize:15,
//             fontWeight: t==="Answers" ? 700 : 500, background:"none", border:"none", cursor:"pointer",
//             borderBottom: t==="Answers" ? "2.5px solid var(--ink-1)" : "none", color:"var(--ink-1)" }}>
//             {t}
//           </button>
//         ))}
//       </div>

//       {/* Answers */}
//       <div style={{ flex:1, overflowY:"auto", padding:"14px 16px" }}>
//         {response.answers?.length ? response.answers.map((ans: any, i: number) => (
//           <div key={i} style={{ marginBottom:14 }}>
//             <ScribbleDivider style={{ marginBottom:8 }}/>
//             <p style={{ fontFamily:"var(--font-display)", fontSize:14, color:"var(--ink-2)", fontStyle:"italic", margin:"0 0 4px", display:"flex", alignItems:"center", gap:7 }}>
//               <span style={{ width:20, height:20, borderRadius:"50%", border:"1.5px solid var(--ink-2)", display:"inline-flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, flexShrink:0, fontStyle:"normal" }}>{i+1}</span>
//               {ans.fieldLabel}
//             </p>
//             {ans.fieldType === "rating" ? (
//               <div style={{ display:"flex", gap:3, paddingLeft:27 }}>
//                 {Array.from({ length: parseInt(ans.value) || 0 }).map((_, j) => (
//                   <RatingStarIcon key={j} size={20} filled stroke="var(--yellow)"/>
//                 ))}
//               </div>
//             ) : (
//               <p style={{ fontFamily:"var(--font-display)", fontSize:16, fontWeight:700, color:"var(--ink-1)", margin:0, paddingLeft:27 }}>
//                 {Array.isArray(ans.value) ? ans.value.join(", ") : ans.value}
//               </p>
//             )}
//           </div>
//         )) : (
//           <p style={{ fontFamily:"var(--font-body)", fontSize:14, color:"var(--ink-3)", textAlign:"center", marginTop:20 }}>
//             No answers recorded yet.
//           </p>
//         )}
//       </div>

//       {/* Footer */}
//       <div style={{ padding:"12px 16px", borderTop:"1.5px solid rgba(30,22,8,0.1)", display:"flex", gap:8 }}>
//         <ScribbleButton variant="purple" style={{ flex:1 }}>View Full Response →</ScribbleButton>
//         <div style={{ width:38, height:38, display:"flex", alignItems:"center", justifyContent:"center" }}>
//           <HeartIcon size={22} fill="#e05c5c" stroke="#c04040"/>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function ResponsesPage({ params }: { params: Promise<{ id: string }> }) {
//   const { id: formId } = use(params);
//   const { data: formData } = useFormDetail(formId);
//   const { data, isLoading, fetchNextPage, hasNextPage } = useResponseList(formId);
//   console.log(data);
//   const deleteResponse = useDeleteResponse(formId);
// //   const exportCsv = useExportCsv(formId);
//   const [selectedId, setSelectedId] = useState<string | null>(null);
//   const [search, setSearch] = useState("");
//   const [activeTab, setActiveTab] = useState("all");

//   const allResponses = data?.pages.flatMap((p: any) => p.responses) ?? [];
//   const selectedResponse = allResponses.find((r: any) => r.id === selectedId);

//   const statCards = [
//   {
//     label: "Total Responses",
//     value: allResponses.length || 1248,
//     sub: "+12.4%",
//     color: "yellow" as const,

//     attachment: {
//       type: "pin",
//       position: "top-center",
//       pinColor: "purple",
//     } as const,

//     icon: <PaperPlaneIcon/>,
//   },

//   {
//     label: "Completed",
//     value:
//       allResponses.filter(
//         (r: any) => r.isComplete
//       ).length || 1156,

//     sub: "92.6%",

//     color: "pink" as const,

//     attachment: {
//       type: "tape",
//       position: "top-center",
//       tapeColor: "blue",
//     } as const,

//     icon: "✅",
//   },

//   {
//     label: "In Progress",
//     value:
//       allResponses.filter(
//         (r: any) => !r.isComplete
//       ).length || 45,

//     sub: "3.6%",

//     color: "green" as const,

//     attachment: {
//       type: "pin",
//       position: "top-right",
//       pinColor: "purple",
//     } as const,

//     icon: "⏳",
//   },

//   {
//     label: "Unstarted",
//     value: 47,

//     sub: "3.8%",

//     color: "purple" as const,

//     attachment: {
//       type: "pin",
//       position: "top-left",
//       pinColor: "blue",
//     } as const,

//     icon: "📭",
//   },
// ];

//   return (
//     <div style={{ padding:"20px 28px 0", height:"calc(100vh - 56px)", display:"flex", flexDirection:"column" }}>
//       {/* Header */}
//       <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:6 }}>
//         <Link href={`/dashboard/forms/${formId}/build`}>
//           <button style={{ background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:6,
//             fontFamily:"var(--font-display)", fontSize:15, color:"var(--ink-2)" }}>
//             <ArrowLeftIcon size={16}/>Back
//           </button>
//         </Link>
//         <h1 style={{ fontFamily:"var(--font-display)", fontSize:32, fontWeight:700, color:"var(--ink-1)", margin:0, display:"flex", alignItems:"center", gap:8 }}>
//           Responses
//           <HeartIcon size={20} fill="#e05c5c" stroke="#c04040"/>
//         </h1>
//         <div style={{ marginLeft:"auto", display:"flex", gap:8 }}>
//           {/* <ScribbleButton variant="secondary" size="sm" leftIcon={<ExportIcon size={14}/>}
//             loading={exportCsv.isPending} onClick={() => exportCsv.mutate({ formId })}>
//             Export
//           </ScribbleButton> */}
//         </div>
//       </div>

//       <ScribbleDivider className="mb-4"/>

//       {/* Stat cards */}
//       <div
//   style={{
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
//     gap: 18,
//     marginBottom: 20,
//   }}
// >
//   {statCards.map(
//     ({
//       label,
//       value,
//       sub,
//       color,
//       attachment,
//       icon,
//     }) => (
//       <ScribbleCard
//   key={label}
//   color={color}
//   attachment={attachment}
//   dogEar
//   hoverLift
//   shadow={true}
//   rotate="auto"
//   padding={18}
//   border={{
//     color: "rgba(45,36,22,.18)",
//     width: 1.1
//   }}
//   style={{
//     width: "100%",
//     minHeight: 160,
//   }}
//   slots={{
//     topRight: (
//       <TrendingIcon
//         size={42}
//         color="rgba(45,36,22,0.22)"
//       />
//     ),

//     bottomRight: (
//       <HeartIcon
//         size={18}
//         color="#c86b00"
//       />
//     ),
//   }}
// >
//   <div
//     style={{
//       minHeight: 120,

//       display: "flex",
//       flexDirection: "column",
//       justifyContent: "space-between",

//       position: "relative",
//       zIndex: 5,
//     }}
//   >
//     {/* TOP */}

//     <div>
//       <p
//         style={{
//           fontFamily: "var(--font-body)",
//           fontSize: 13,
//           color: "var(--ink-2)",
//           margin: 0,
//         }}
//       >
//         {label}
//       </p>

//       <p
//         style={{
//           fontFamily: "var(--font-display)",
//           fontSize: 42,
//           fontWeight: 700,
//           color: "var(--ink-1)",
//           margin: "14px 0 0",
//           lineHeight: 1,
//         }}
//       >
//         {value.toLocaleString()}
//       </p>
//     </div>

//     {/* BOTTOM */}

//     <div
//       style={{
//         display: "flex",
//         alignItems: "center",
//         gap: 8,
//       }}
//     >
//       <div
//         style={{
//           width: 10,
//           height: 10,
//           borderRadius: "50%",

//           background:
//             parseFloat(sub) > 5
//               ? "#2d8a3e"
//               : "#e05c5c",
//         }}
//       />

//       <p
//         style={{
//           fontFamily: "var(--font-body)",
//           fontSize: 14,
//           fontWeight: 700,

//           color:
//             parseFloat(sub) > 5
//               ? "#2d8a3e"
//               : "#e05c5c",

//           margin: 0,
//         }}
//       >
//         {sub}
//       </p>
//     </div>
//   </div>
// </ScribbleCard>
//     )
//   )}
// </div>

//       {/* Filter bar */}
//       <div style={{ display:"flex", gap:10, marginBottom:12, alignItems:"center" }}>
//         <div style={{ width:220 }}>
//           <ScribbleCustomInput placeholder="Search responses..." value={search} onChange={e=>setSearch(e.target.value)} leftIcon={<SearchIcon size={15}/>}/>
//         </div>
//         {["All","Completed","In Progress","Unstarted"].map(t => (
//           <button key={t} onClick={() => setActiveTab(t.toLowerCase())}
//             style={{ fontFamily:"var(--font-display)", fontSize:14, padding:"5px 12px",
//               borderRadius:20, border:"1.5px solid", cursor:"pointer",
//               borderColor: activeTab===t.toLowerCase() ? "var(--ink-1)" : "rgba(30,22,8,0.18)",
//               background: activeTab===t.toLowerCase() ? "var(--yellow)" : "transparent",
//               color:"var(--ink-1)", fontWeight:600 }}>
//             {t}
//           </button>
//         ))}
//       </div>

//       {/* Two-panel layout */}
//       <div style={{ flex:1, display:"flex", gap:16, minHeight:0, paddingBottom:20 }}>
//         {/* Table */}
//         <div style={{ flex:1, minWidth:0, overflowY:"auto" }}>
//           {isLoading ? (
//             <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
//               {[0,1,2,3,4].map(i=><SkeletonScribble key={i} height={60}/>)}
//             </div>
//           ) : (
//             <table style={{ width:"100%", borderCollapse:"collapse" }}>
//               <thead>
//                 <tr style={{ borderBottom:"2px solid rgba(30,22,8,0.1)" }}>
//                   <th style={{ fontFamily:"var(--font-body)", fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.06em", color:"var(--ink-3)", padding:"8px 12px", textAlign:"left" }}>Respondent</th>
//                   <th style={{ fontFamily:"var(--font-body)", fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.06em", color:"var(--ink-3)", padding:"8px 8px", textAlign:"left" }}>Status</th>
//                   <th style={{ fontFamily:"var(--font-body)", fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.06em", color:"var(--ink-3)", padding:"8px 8px", textAlign:"left" }}>Submitted</th>
//                   <th style={{ width:28 }}></th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {allResponses.length === 0 ? (
//                   <tr><td colSpan={4} style={{ textAlign:"center", padding:"40px 20px", fontFamily:"var(--font-body)", fontSize:14, color:"var(--ink-3)" }}>
//                     No responses yet. Share your form to start collecting!
//                   </td></tr>
//                 ) : allResponses.map((r: any) => (
//                   <ResponseRow key={r.id} response={r} isSelected={selectedId===r.id} onSelect={()=>setSelectedId(r.id)}/>
//                 ))}
//               </tbody>
//             </table>
//           )}

//           {hasNextPage && (
//             <div style={{ textAlign:"center", paddingTop:12 }}>
//               <ScribbleButton variant="secondary" onClick={()=>fetchNextPage()}>Load More</ScribbleButton>
//             </div>
//           )}

//           {/* Pagination */}
//           <div style={{ display:"flex", alignItems:"center", gap:4, padding:"14px 0", justifyContent:"flex-end" }}>
//             <span style={{ fontFamily:"var(--font-body)", fontSize:13, color:"var(--ink-3)" }}>
//               Showing {Math.min(allResponses.length, 25)} of {allResponses.length || 1248}
//             </span>
//           </div>
//         </div>

//         {/* Detail panel */}
//         <ScribbleCard color="white" shadow={true} style={{ width:280, flexShrink:0, overflow:"hidden", position:"relative" , height:"100%" }}>
//           <div style={{ position:"absolute", top:-7, left:"50%", transform:"translateX(-50%) rotate(-2deg)", zIndex:10 }}>
//             <svg width="48" height="14" viewBox="0 0 48 14">
//               <path d="M2 3 L4 1 L44 1.2 L46 3 L46 11 L44 13 L4 12.8 L2 11 Z" fill="#f2a0b8" fillOpacity="0.8"/>
//             </svg>
//           </div>
//           <ResponseDetail response={selectedResponse}/>
//         </ScribbleCard>
//       </div>

//       {/* Privacy banner */}
//       <div style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 16px", background:"var(--yellow)",
//         borderRadius:8, marginBottom:20, border:"1px solid rgba(30,22,8,0.1)", boxShadow:"2px 2px 0 rgba(30,22,8,0.06)" }}>
//         <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
//           <rect x="3" y="9" width="14" height="10" rx="2" stroke="var(--ink-2)" strokeWidth="1.5"/>
//           <path d="M7 9V7a3 3 0 016 0v2" stroke="var(--ink-2)" strokeWidth="1.5" strokeLinecap="round"/>
//           <circle cx="10" cy="14" r="1.2" fill="var(--ink-2)"/>
//         </svg>
//         <span style={{ fontFamily:"var(--font-body)", fontSize:14, color:"var(--ink-2)" }}>
//           We take data privacy seriously. Your responses are safe with us!
//         </span>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { use, useState, useMemo } from "react";
import Sidebar from "~/components/Sidebar";
import { ArrowLeft, Download, Trash2, Search, Calendar, Filter, ChevronDown, CheckCircle, Clock } from "lucide-react";
import Image from "next/image";
import { useFormDetail } from "~/hooks/api/forms";
// import { useResponseList, useDeleteResponse, useExportCsv } from "~/hooks/api/analytics";

import { useResponseList,useDeleteResponse } from "~/hooks/api";
import { ScribbleCheckbox } from "~/components/scribble/ScribbleUI";
// ─── TYPES ───────────────────────────────────────────────────────────────────
interface Field {
  id: string;
  type: string;
  label: string;
  config: { options?: string[]; max?: number } | null;
}

interface UserResponse {
  id: string;
  formId: string;
  isComplete: boolean;
  timeToCompleteMs: number;
  createdAt: string;
  emailAnswer: string;
  nameAnswer: string;
}

interface AllFormsTableProps {
  filteredResponses: UserResponse[];
  paginatedResponses: UserResponse[];
  checkedRecords: Record<string, boolean>;
  setCheckedRecords: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  toggleSelectAll: () => void;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>> | ((p: number | ((prev: number) => number)) => void);
  totalPages: number;
  itemsPerPage: number;
  activeInspectionRecord: UserResponse | null;
  setSelectedId: React.Dispatch<React.SetStateAction<string | null>>;
  deleteResponse: any;
}

// ─── LOADING STATE ───────────────────────────────────────────────────────────
function SketchLoading() {
  return (
    <div style={{ width: "100vw", height: "100vh", position: "fixed", top: 0, left: 0, backgroundImage: "url('/BG_2.png')", backgroundSize: "100% 100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
        <svg width="50" height="50" viewBox="0 0 50 50" style={{ animation: "spin 2.5s linear infinite" }}>
          <circle cx="25" cy="25" r="20" stroke="#9b8fdf" strokeWidth="2" strokeDasharray="6 4" fill="none" />
        </svg>
        <p style={{ fontFamily: "'Caveat', cursive", fontSize: "22px", color: "#2d2416" }}>Doodling answers...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );
}

// ─── ERROR BOUNDARY STATE ─────────────────────────────────────────────────────
function SketchError({ message }: { message: string }) {
  return (
    <div style={{ width: "100vw", height: "100vh", position: "fixed", top: 0, left: 0, backgroundImage: "url('/BG_2.png')", backgroundSize: "100% 100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ border: "1.5px solid #2d2416", padding: "24px 32px", borderRadius: "16px", backgroundColor: "#fff5f3", boxShadow: "4px 4px 0px #2d2416", textAlign: "center" }}>
        <h3 style={{ fontFamily: "'Caveat', cursive", fontSize: "24px", color: "#e64a19", margin: "0 0 8px 0" }}>Scribble Error!</h3>
        <p style={{ fontSize: "13px", fontFamily: "'Nunito', sans-serif", color: "rgba(45,36,22,0.6)", margin: 0 }}>{message}</p>
      </div>
    </div>
  );
}

// ─── RESPONSE GROWTH KPI CARD ────────────────────────────────────────────────
function ResponseKPICard({ 
  label, value, percentage, sublabel, bg, strokeColor, innerIcon, trendIcon, trendColor 
}: { 
  label: string; 
  value: string; 
  percentage?: string;
  sublabel: string; 
  bg: string; 
  strokeColor: string;
  innerIcon: React.ReactNode;
  trendIcon: "up" | "down";
  trendColor: string;
}) {
  return (
    <div style={{ 
      backgroundColor: bg, 
      borderRadius: "16px", 
      padding: "16px 20px", 
      display: "flex", 
      flexDirection: "column", 
      flex: 1, 
      height: "135px",
      position: "relative",
      boxSizing: "border-box",
      filter: "drop-shadow(3px 4px 6px rgba(45, 36, 22, 0.06))"
    }}>
      {/* Upper Title Line Block */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "4px" }}>
        {/* Organic Outer Icon Circle Container */}
        <div style={{ 
          width: "43px", 
          height: "43px", 
          borderRadius: "50%", 
          backgroundColor: bg, 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center", 
          border: `1.2px solid ${strokeColor}`,
          flexShrink: 0 ,
          marginBottom:"28px"
        }}>
          {innerIcon}
        </div>

        {/* Central Value Metrics Counters */}
        <div style={{ display: "flex", flexDirection: "column", marginTop: "2px", marginLeft: "12px" }}>
          <span style={{ fontFamily: "'Caveat', cursive", fontSize: "13px", fontWeight: 500, color: "#2d2416" }}>
            {label}
          </span>
          <span style={{ fontSize: "28px", fontWeight: "400", color: "#1a150e", fontFamily: "'Caveat', cursive", lineHeight: 1.1, marginTop: "12px" }}>
            {value}
          </span>
          {percentage && (
            <span style={{ fontSize: "12px", fontWeight: "800", color: trendColor, fontFamily: "'Caveat', cursive", marginTop: "3px" }}>
              {percentage}
            </span>
          )}
        </div>
      </div>

      {/* Bottom Comparative Status Label */}
      <div style={{ marginLeft: "62px", display: "flex", alignItems: "center", gap: "4px", marginTop: percentage ? "6px" : "16px", fontSize: "11px", fontWeight: "700", color: "rgba(45,36,22,0.55)", fontFamily: "'Caveat', cursive" }}>
        <span style={{ color: trendColor, fontSize: "12px", fontWeight: "900", display: "inline-flex", alignItems: "center" }}>
          {trendIcon === "up" ? "↑" : "↓"}
        </span>
        <span>{sublabel}</span>
      </div>
    </div>
  );
}

// ─── LEFTHAND COMPONENT COLUMN TABLE DETACHED SUB-BLOCK ───────────────────────
function AllFormsTable({
  filteredResponses, paginatedResponses, checkedRecords, setCheckedRecords, toggleSelectAll,
  currentPage, setCurrentPage, totalPages, itemsPerPage, activeInspectionRecord, setSelectedId, deleteResponse
}: AllFormsTableProps) {
  return (
    <div 
      style={{ 
        backgroundColor: "#FFFDF9", 
        // border: "1.2px solid #2d2416", 
        borderRadius: "16px", 
        padding: "16px 20px", 
        display: "flex", 
        flexDirection: "column", 
        height: "100%", 
        boxSizing: "border-box",
        filter: "drop-shadow(3px 4px 6px rgba(45, 36, 22, 0.06))",
        fontFamily: "'Caveat', cursive", 
      }}
    >
      {/* Subheading Navigation Header Tabs from image_a8149c.jpg */}
      <div style={{ display: "flex", gap: "24px", borderBottom: "1.2px solid rgba(45,36,22,0.1)", paddingBottom: "10px", marginBottom: "12px", fontSize: "13px", fontWeight: "bold", fontFamily: "'Caveat', cursive"}}>
        <div style={{ position: "relative", color: "#2d2416", cursor: "pointer" }}>
          <span>All Responses ({filteredResponses.length})</span>
          {/* Hand-drawn underline squiggle effect marker */}
          <svg width="110" height="6" viewBox="0 0 110 6" fill="none" style={{ position: "absolute", bottom: "-11px", left: 0 }}>
            <path d="M 2 3 C 30 5, 75 1.5, 108 3.5 M 12 4 C 45 4.5, 80 3, 98 4" stroke="#634cc9" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        <span style={{ color: "rgba(45,36,22,0.4)", cursor: "pointer" }}>Completed (1,156)</span>
        <span style={{ color: "rgba(45,36,22,0.4)", cursor: "pointer" }}>In Progress (45)</span>
        <span style={{ color: "rgba(45,36,22,0.4)", cursor: "pointer" }}>Unstarted (47)</span>
      </div>

      {/* Main Non-Scrolling Table Stage */}
      <div style={{ flex: 1, overflow: "hidden", width: "100%" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px", textAlign: "left" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(45,36,22,0.12)", color: "rgba(45,36,22,0.5)", fontFamily: "'Nunito', sans-serif", fontWeight: 800 }}>
              {/* <th style={{ padding: "8px 6px", width: "30px" }}>
                <ScribbleCheckbox checked={paginatedResponses.length > 0 && paginatedResponses.every((r: UserResponse) => checkedRecords[r.id])} onChange={toggleSelectAll} />
              </th> */}
              <th style={{ padding: "8px 12px" }}>Respondent</th>
              <th style={{ padding: "8px 12px" }}>Status</th>
              <th style={{ padding: "8px 12px" }}>Submitted</th>
              <th style={{ padding: "8px 12px", textAlign: "end" }}><div style={{ display: "flex", justifyContent: "flex-end", paddingRight: "4px" }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg></div></th>
            </tr>
          </thead>
          <tbody>
            {paginatedResponses.map((res: UserResponse, i: number) => (
              <tr 
                key={res.id} 
                onClick={() => setSelectedId(res.id)}
                style={{ borderBottom: "1px dashed rgba(45,36,22,0.06)", backgroundColor: activeInspectionRecord?.id === res.id ? "#FCF6EE" : "transparent", cursor: "pointer" }}
              >
                {/* <td style={{ padding: "8px 6px" }}>
                  <ScribbleCheckbox checked={!!checkedRecords[res.id]} onChange={() => setCheckedRecords((p: Record<string, boolean>) => ({ ...p, [res.id]: !p[res.id] }))} />
                </td> */}
                <td style={{ padding: "8px 12px", display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: "#fdf3dc", border: "1.2px solid #2d2416", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "12px", color: "#2d2416", flexShrink: 0 }}>
                    {res.nameAnswer?.charAt(0) || "R"}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: "800", color: "#1a150e", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden", maxWidth: "180px", fontFamily: "'Nunito', sans-serif" }}>{res.nameAnswer || "Rohan Sharma"}</div>
                    <div style={{ fontSize: "10px", color: "rgba(45,36,22,0.5)", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden", maxWidth: "180px" }}>{res.emailAnswer}</div>
                  </div>
                </td>
                <td style={{ padding: "8px 12px" }}>
                  <span style={{ padding: "3px 8px", borderRadius: "6px", fontSize: "10px", fontWeight: "bold", backgroundColor: "#e8f5e9", color: "#2e7d32", border: "1px solid rgba(46,125,50,0.18)" }}>Completed</span>
                </td>
                <td style={{ padding: "8px 12px", color: "#2d2416", fontSize: "11px", fontWeight: 600 }}>
                  <div style={{ fontWeight: "bold" }}>May 16, 2026</div>
                  <div style={{ fontSize: "10px", color: "rgba(45,36,22,0.4)" }}>10:24 AM</div>
                </td>
                <td style={{ textAlign: "end", paddingRight: "10px" }}>
                  <button onClick={(e) => { e.stopPropagation(); deleteResponse.mutate(res.id); }} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(45,36,22,0.4)" }}><Trash2 size={13} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── ARROW BASIC PAGINATION NAVIGATION CONTROLS BAR (FROM GRAPHICS REFERENCE) ── */}
      <div style={{ display: "flex", alignItems: "center", justifyBetween: "space-between", justifyContent: "space-between", paddingTop: "10px", borderTop: "1.2px solid rgba(45,36,22,0.08)", marginTop: "auto", boxSizing: "border-box" }}>
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          {/* Back arrow */}
          <button 
            disabled={currentPage === 1} 
            onClick={() => setCurrentPage((p: number) => Math.max(p - 1, 1))} 
            style={{ border: "none", background: "transparent", cursor: currentPage === 1 ? "not-allowed" : "pointer", fontSize: "14px", fontWeight: "bold", color: "#2d2416", opacity: currentPage === 1 ? 0.35 : 1, display: "flex", alignItems: "center" }}
          >
            ←
          </button>

          {/* Pages map indexes bubbles loop selection track */}
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, idx) => {
              const pageIndexNode = idx + 1;
              const isSelected = currentPage === pageIndexNode;
              return (
                <div 
                  key={pageIndexNode} 
                  onClick={() => typeof setCurrentPage === "function" && setCurrentPage(pageIndexNode)} 
                  style={{ 
                    width: "24px", 
                    height: "24px", 
                    borderRadius: "50%", 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center", 
                    border: isSelected ? "1.5px solid #634cc9" : "1px solid transparent", 
                    fontSize: "12px", 
                    fontWeight: "bold", 
                    cursor: "pointer", 
                    backgroundColor: isSelected ? "#e0d4f7" : "transparent", 
                    color: "#2d2416" 
                  }}
                >
                  {pageIndexNode}
                </div>
              );
            })}
            {totalPages > 5 && <span style={{ fontSize: "11px", color: "rgba(45,36,22,0.4)", fontWeight: "bold" }}>... {totalPages}</span>}
          </div>

          {/* Next arrow */}
          <button 
            disabled={currentPage === totalPages} 
            onClick={() => setCurrentPage((p: number) => Math.min(p + 1, totalPages))} 
            style={{ border: "none", background: "transparent", cursor: currentPage === totalPages ? "not-allowed" : "pointer", fontSize: "14px", fontWeight: "bold", color: "#2d2416", opacity: currentPage === totalPages ? 0.35 : 1, display: "flex", alignItems: "center" }}
          >
            →
          </button>
        </div>

        <span style={{ fontSize: "11px", color: "rgba(45,36,22,0.45)", fontWeight: "700", fontFamily: "'Nunito', sans-serif" }}>
          Showing {Math.min(filteredResponses.length, (currentPage - 1) * itemsPerPage + 1)}-{Math.min(filteredResponses.length, currentPage * itemsPerPage)} of {filteredResponses.length}
        </span>
      </div>
    </div>
  );
}

// ─── SYSTEM MAIN CONTAINER INTERFACE ─────────────────────────────────────────
export default function ResponsesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: formId } = use(params);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [checkedRecords, setCheckedRecords] = useState<Record<string, boolean>>({});
  const [selectedStatus, setSelectedStatus] = useState("All Status");

  const { data: formDetails, isLoading: formLoading, isError: formError } = useFormDetail(formId);
  const { data: responseData, isLoading: responseLoading, isError: responseError } = useResponseList(formId);
  const deleteResponse = useDeleteResponse(formId);

  // FlatMap paginated responses out of Infinite Query Pages
  const responses = useMemo<UserResponse[]>(() => {
    if (!responseData?.pages) return [];
    return responseData.pages.flatMap((p: any) => p.responses ?? []);
  }, [responseData]);

  const totalResponsesCount = responseData?.pages[0]?.total ?? responses.length;

  // Filter lists based on target text criteria mapping matches
  const filteredResponses = useMemo(() => {
    return responses.filter(r => 
      r.nameAnswer?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.emailAnswer?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [responses, searchQuery]);

  const itemsPerPage = 8; 
  const totalPages = Math.max(Math.ceil(filteredResponses.length / itemsPerPage), 1);
  
  const paginatedResponses = useMemo(() => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    return filteredResponses.slice(startIdx, startIdx + itemsPerPage);
  }, [filteredResponses, currentPage]);

  // Track item targeted for micro inspection view drawer panel
  const activeInspectionRecord = useMemo(() => {
    if (selectedId) return responses.find(r => r.id === selectedId) || null;
    return paginatedResponses[0] || null;
  }, [responses, selectedId, paginatedResponses]);

  const toggleSelectAll = () => {
    const allCheckedOnPage = paginatedResponses.length > 0 && paginatedResponses.every(r => checkedRecords[r.id]);
    const updated = { ...checkedRecords };
    paginatedResponses.forEach(r => { updated[r.id] = !allCheckedOnPage; });
    setCheckedRecords(updated);
  };

  if (formLoading || responseLoading) return <SketchLoading />;
  if (formError || responseError) return <SketchError message="Could not compile form submission nodes." />;

  return (
    <div style={{
      width: "100vw", height: "100vh",
      backgroundImage: "url('/response/BG(2).png')", backgroundSize: "100% 100%", backgroundRepeat: "no-repeat",
      position: "fixed", top: 0, left: 0, overflow: "hidden", boxSizing: "border-box", fontFamily: "'Nunito', sans-serif"
    }}>
      {/* ── INTERNAL 80% SCALED MONITOR COMPONENT CONTAINER ── */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "125vw", height: "125vh", display: "flex", transform: "scale(0.8)", transformOrigin: "top left", overflow: "hidden" }}>
        
        {/* SIDEBAR NAVIGATION BLOCK */}
        <div style={{ width: "240px", height: "100%", paddingLeft: "65px", paddingTop: "24px", flexShrink: 0 }}>
          <Sidebar activeTab="Responses" />
        </div>

        {/* RECONSTRUCTED CENTRAL DATA GRID */}
        <div 
        style={{ flex: 1, height: "100%", padding: "45px 50px 60px 140px", display: "flex", flexDirection: "column", boxSizing: "border-box", overflow: "hidden" }}
        >
          
          {/* ── UPPER CONTROLS ACTION LAYER ── */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "1220px", marginBottom: "35px",marginTop:"16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "rgba(45,36,22,0.6)", fontSize: "14px", fontWeight: 700, cursor: "pointer" }} onClick={() => window.history.back()}>
              <ArrowLeft size={16} /> Back to Dashboard
            </div>

            <button style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "'Caveat', cursive", fontSize: 16, fontWeight: 600, cursor: "pointer", border: "none", background: "transparent", position: "relative", padding: "6px 14px" }}>
              <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0 }} viewBox="0 0 110 38" fill="none" preserveAspectRatio="none">
                <path d="M6 4 Q8 2 30 2.5 Q55 3 80 2 Q100 1.5 106 4 Q110 6 109 10 Q110 22 108 32 Q106 37 100 36.5 Q75 37.5 50 37 Q25 36.5 10 37 Q4 37 3 33 Q1 28 2 18 Q1 8 6 4Z" fill="#e0d4f7" stroke="#2d2416" strokeWidth="1.5"/>
              </svg>
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ position: "relative", zIndex: 1 }}>
                <path d="M10 3v10M6 9l4 4 4-4" strokeLinecap="round" strokeLinejoin="round"/><path d="M4 16h12" strokeLinecap="round"/>
              </svg>
              <span style={{ position: "relative", zIndex: 1, color: "#2d2416",fontWeight:"100" }}>Export</span>
            </button>
          </div>

          {/* ── KPI GRID ROW CONTAINER ── */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 320px)", gap: "26px", marginBottom: "20px", width: "1220px", boxSizing: "border-box", position: "relative" }}>

          {/* 👇 FLOATING HANGING BOY ARTWORK */}
  <div style={{
    position: "absolute",
    top: "-175px",       // Pulls the top of the rope up into the blank area under the dashboard link
    left: "425px",       // Positions the rope directly in the gap between card 1 and card 2
    zIndex: 10,          // Ensures it layers beautifully above cards and background layers
    pointerEvents: "none" // Ensures you can still click things underneath if needed
  }}>
    <img 
      src="/response/ropBoy.png"  
      alt="Hanging Boy"
      style={{
        width: "390px",              // Adjust width to match the visual scale of your dashboard
        height: "240px",
        mixBlendMode: "darken"       // Perfect trick if the asset has a white background instead of transparent!
      }} 
    />
  </div>
            <ResponseKPICard 
              label="Total Responses" 
              value={totalResponsesCount.toLocaleString()} 
              sublabel="18% vs last 30 days"
              trendIcon="up"
              trendColor="#2e7d32"
              bg="#e8e5f9"
              strokeColor="#9b8fdf"
              innerIcon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#634cc9" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              } 
            />

            <ResponseKPICard 
              label="Completed" 
              value="1,156" 
              percentage="92.6%"
              sublabel="12% vs last 30 days"
              trendIcon="up"
              trendColor="#2e7d32"
              bg="#e8f5e9"
              strokeColor="#74c99a"
              innerIcon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2e7d32" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="6" />
                  <circle cx="12" cy="12" r="2" />
                  <path d="M12 2l2 4h4l-3 3 1 4-4-2-4 2 1-4-3-3h4z" fill="#2e7d32" opacity="0.15" />
                </svg>
              } 
            />

            <ResponseKPICard 
              label="In Progress" 
              value="45" 
              percentage="3.6%"
              sublabel="4% vs last 30 days"
              trendIcon="down"
              trendColor="#ef6c00"
              bg="#fff3e0"
              strokeColor="#f5a623"
              innerIcon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef6c00" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 15 15" /><circle cx="12" cy="12" r="1" fill="#ef6c00" /></svg>
              } 
            />

            <ResponseKPICard 
              label="Unstarted" 
              value="47" 
              percentage="3.8%"
              sublabel="2% vs last 30 days"
              trendIcon="down"
              trendColor="#c62828"
              bg="#ffebee"
              strokeColor="#e87777"
              innerIcon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c62828" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" strokeWidth="1.6" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>
              } 
            />
          </div>

          {/* ── QUICK SELECTION FILTERING SHELF (EXACT ALIGNMENT MATCH TO image_a90481.png) ── */}
          <div 
            style={{ 
              position: "relative", 
              padding: "10px 14px", 
              marginBottom: "20px", 
              marginTop: "12px", 
              width: "1350px", 
              display: "flex", 
              alignItems: "center", 
              boxSizing: "border-box" ,
              height:"58px",
              fontFamily: "'Caveat', cursive", 
            }}
          >
            {/* Outer Organic Border enclosing all search parameters */}
            <svg 
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", overflow: "visible" }} 
              viewBox="0 0 1220 52" 
              preserveAspectRatio="none" 
              fill="none"
            >
              <path 
                d="M3 4 C400 1.5, 800 3.5, 1217 3 C1219.5 10, 1218.5 26, 1217.5 48 C850 49.5, 400 48.5, 4 49 C1.5 36, 2 22, 3 4 Z" 
                stroke="#5a4a30" 
                strokeWidth="1.2" 
                fill="none" 
                strokeOpacity="0.6"
              />
              <path d="M4 6 Q25 3 350 4 T800 3 T1216 5 Q1218 12 1217 28 T1216 46 Q1180 49 850 48 T250 49 T5 45 Q2 30 3 24 Z" stroke="#5a4a30" strokeWidth="0.8" fill="none" strokeOpacity="0.3"/>
            </svg>

            <div style={{ display: "flex", gap: "12px", alignItems: "center", width: "100%", position: "relative", zIndex: 1 }}>
              
              {/* 1. Search Box input wrapper */}
              <div style={{ position: "relative", width: 250, height: 38 }}>
                <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 250 34" fill="none" preserveAspectRatio="none">
                  <path d="M4 4 Q40 2, 125 2.5 T246 4 Q249 8, 248 17 T246 30 Q190 32, 125 31.5 T4 29 Q1 20, 2 17 Z" fill="#fffcf7" stroke="#2d2416" strokeWidth="0.8" opacity="0.3"/>
                </svg>
                <svg style={{ position: "absolute", left: 20, top: "50%", transform: "translateY(-50%)", zIndex: 2 }} width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="#5a4a30" strokeWidth="1.8" opacity="0.7">
                  <circle cx="9" cy="9" r="6"/><path d="M14 14l4 4" strokeLinecap="round"/>
                </svg>
                <input 
                  type="text" 
                  placeholder="Search responses..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ width: "100%", height: "100%", background: "transparent", border: "none", outline: "none", position: "relative", zIndex: 1, paddingLeft: 44, paddingRight: 10, fontSize: 13, fontWeight: 600, color: "#2d2416", fontFamily: "'Caveat', cursive" }} 
                />
              </div>

              {/* 3. All Status Selection Dropdown */}
              <div style={{ position: "relative", height: 38, width: 150 }}>
                <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 140 34" fill="none" preserveAspectRatio="none">
                  <path d="M4 3 Q25 2, 70 2.5 T136 4 Q138 8, 137 17 T136 30 Q100 31.5, 55 31 T4 29 Q2 20, 3 17 Z" fill="#fffcf7" stroke="#2d2416" strokeWidth="0.8" opacity="0.3"/>
                </svg>
                <select 
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  style={{ width: "100%", height: "100%", background: "transparent", border: "none", outline: "none", position: "relative", zIndex: 1, padding: "0 24px 0 12px", fontFamily: "'Caveat', cursive", fontSize: 13, fontWeight: 700, color: "#2d2416", appearance: "none", cursor: "pointer" }}
                >
                  <option>All Status</option>
                  <option>Completed</option>
                  <option>In Progress</option>
                  <option>Unstarted</option>
                </select>
                <div style={{ position: "absolute", right: 12, top: "54%", transform: "translateY(-50%)", pointerEvents: "none", zIndex: 2 }}>
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="#5a4a30" strokeWidth="1.5" strokeLinecap="round"><path d="M1 1l4 4 4-4" /></svg>
                </div>
              </div>

              {/* 4. Date Range Picker Component */}
              <div style={{ fontFamily: "'Caveat', cursive", position: "relative", height: 38, width: 180 }}>
                <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 180 34" fill="none" preserveAspectRatio="none">
                  <path d="M3 4 Q40 2, 95 2.5 T176 4 Q178 8, 177 17 T176 30 Q120 32, 75 31.5 T4 29 Q2 20, 3 17 Z" fill="#fffcf7" stroke="#2d2416" strokeWidth="0.8" opacity="0.3"/>
                </svg>
                <div style={{ width: "100%", height: "100%", position: "relative", zIndex: 1, display: "flex", alignItems: "center", padding: "0 12px", gap: 6, fontSize: 12, fontWeight: 600, color: "#2d2416"  }}>
                  <Calendar size={13} style={{ color: "#5a4a30" }} />
                  <span>May 10 – May 16</span>
                </div>
              </div>

              {/* 5. More Filters Action Trigger Toggle Button */}
              <div style={{ position: "relative", height: 38, width: 160, marginLeft: "auto" }}>
                <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 130 34" fill="none" preserveAspectRatio="none">
                  <path d="M4 4 Q30 2, 80 2.5 T120 4 Q122 8, 121 17 T120 30 Q85 32, 50 31.5 T4 29 Q2 20, 3 17 Z" fill="transparent" stroke="#2d2416" strokeWidth="0.8" opacity="0.4"/>
                </svg>
                <button style={{ width: "100%", height: "100%", border: "none", background: "transparent", position: "relative", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontFamily: "'Nunito', sans-serif", letterSpacing: 0.5, fontSize: 13, fontWeight: 700, color: "#2d2416", cursor: "pointer" }}>
                  <span>More Filters</span>
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M4 6h12M6 10h8M8 14h4" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "860px 470px", gap: "30px", width: "1220px", height: "560px" }}>
            <AllFormsTable 
              filteredResponses={filteredResponses}
              paginatedResponses={paginatedResponses}
              checkedRecords={checkedRecords}
              setCheckedRecords={setCheckedRecords}
              toggleSelectAll={toggleSelectAll}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
              itemsPerPage={itemsPerPage}
              activeInspectionRecord={activeInspectionRecord}
              setSelectedId={setSelectedId}
              deleteResponse={deleteResponse}
            />

            <div style={{ backgroundColor: "#FFFDF9", border: "1px solid #fff", borderRadius: "14px", padding: "20px", filter: "drop-shadow(3px 4px 6px rgba(45, 36, 22, 0.06))", height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column", position: "relative" }}>
              <div style={{ position: "absolute", top: "-10px", left: "40%", width: "60px", height: "16px", backgroundColor: "#d1c4e9", opacity: 0.7, transform: "rotate(-2deg)" }} />
              
              {activeInspectionRecord ? (
                <>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", borderBottom: "1px dashed #2d2416", paddingBottom: "12px", marginBottom: "12px" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "50%", backgroundColor: "#ede8f9", border: "1px solid #2d2416", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" }}>
                      {activeInspectionRecord.nameAnswer?.charAt(0) || "S"}
                    </div>
                    <div>
                      <div style={{ fontWeight: "bold", color: "#2d2416", fontSize: "14px" }}>{activeInspectionRecord.nameAnswer}</div>
                      <div style={{ fontSize: "11px", color: "rgba(45,36,22,0.5)" }}>{activeInspectionRecord.emailAnswer}</div>
                    </div>
                    <span style={{ marginLeft: "auto", padding: "2px 6px", borderRadius: "4px", fontSize: "10px", fontWeight: "bold", backgroundColor: "#e8f5e9", color: "#2e7d32", border: "1px solid #2d2416" }}>Completed</span>
                  </div>

                  <div style={{ display: "flex", gap: "24px", fontSize: "11px", color: "rgba(45,36,22,0.6)", marginBottom: "14px" }}>
                    <div>GV<strong>Submitted on:</strong><br />{new Date(activeInspectionRecord.createdAt).toLocaleString()}</div>
                    <div><strong>Time Taken:</strong><br />{Math.round(activeInspectionRecord.timeToCompleteMs / 1000)} seconds</div>
                  </div>

                  <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "10px", paddingRight: "4px" ,fontFamily: "'Caveat', cursive", }}>
                    {formDetails?.fields?.map((field: Field, i: number) => (
                      <div key={field.id} style={{ border: "1px solid rgba(45,36,22,0.1)", borderRadius: "8px", padding: "10px", backgroundColor: "#fff" }}>
                        <div style={{ fontSize: "11px", fontWeight: "bold", color: "rgba(45,36,22,0.5)", marginBottom: "2px" }}>{i + 1}. {field.label}</div>
                        <div style={{ fontSize: "12px", fontWeight: "bold", color: "#2d2416" }}>
                          {field.type === "email" && activeInspectionRecord.emailAnswer}
                          {field.type === "short_text" && (activeInspectionRecord.nameAnswer || "JavaScript")}
                          {field.type === "multi_select" && "React, Next.js, Express"}
                          {field.type === "rating" && "⭐ 8 / 10"}
                          {field.type === "long_text" && "I would construct an organic hand-sketched interface analytics layout renderer engine."}
                          {field.type === "single_select" && "VS Code"}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Caveat', cursive", fontSize: "20px", color: "rgba(45,36,22,0.4)" }}>Select a response node to inspect answers</div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}