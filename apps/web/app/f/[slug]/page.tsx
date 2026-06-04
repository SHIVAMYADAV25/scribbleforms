// "use client"

// import { AlertCircle } from 'lucide-react';
// import { useRouter } from 'next/navigation';
// import { use, useState, useRef, useEffect } from 'react';
// import Image from 'next/image';
// import { Card, CardContent } from '~/components/ui/card';
// import { applyConditions, buildFieldSchema } from "@repo/validators";
// import { Skeleton } from '~/components/ui/skeleton';
// import { useTrackEvent } from '~/hooks/api';
// import { usePublicForm } from '~/hooks/api/forms';
// import { getErrorMessage } from '~/lib/errors';
// import { toast } from 'sonner';
// import { ScribbleButton } from '~/components/scribble/ScribbleButton';

// // ── CUSTOM THEMED INPUT RENDERER ──
// function DynamicPublicField({ field, value, onChange, error }: {
//   field: any; value: any; onChange: (v: any) => void; error?: string;
// }) {
//   const labelStyle = {fontFamily: "'Caveat', cursive, sans-serif", display: "block", fontSize: "14px", fontWeight: "700", color: "#2d2416", marginBottom: "6px" };
//   const errorStyle = {fontFamily: "'Caveat', cursive, sans-serif", fontSize: "12px", color: "#ef4444", display: "flex", alignItems: "center", gap: "4px", marginTop: "4px" };
  
//   if(typeof error === "string"){
//     error = error.replaceAll("Invalid input: ","").replaceAll("Invalid option: ","").replaceAll(" received undefined","")
//   }
  
//   const baseInputStyle = {
//     width: "100%",
//     minHeight: "42px",
//     padding: "0 14px",
//     border: "1.5px solid #c8b8a0",
//     borderRadius: "8px",
//     backgroundColor: "rgba(255, 253, 247, 0.75)",
//     fontFamily: "'Nunito', sans-serif",
//     fontSize: "14px",
//     color: "#2d2416",
//     outline: "none",
//     boxSizing: "border-box" as const
//   };

//   switch (field.type) {
//     case "short_text":
//     case "email":
//     case "number":
//     case "phone":
//       return (
//         <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
//           <label style={labelStyle}>
//             {field.label} {field.required && <span style={{ color: "#ef4444" }}>*</span>}
//           </label>
//           <input 
//             type={field.type === "number" ? "number" : field.type === "email" ? "email" : "text"} 
//             placeholder={field.placeholder ?? `Type your answer here...`} 
//             value={value ?? ""} 
//             onChange={e => onChange(field.type === "number" ? (e.target.value ? Number(e.target.value) : "") : e.target.value)} 
//             style={baseInputStyle} 
//           />
//           {error && <p style={errorStyle}><AlertCircle style={{ width: "13px", height: "13px" }}/>{error}</p>}
//         </div>
//       );

//     case "long_text":
//       return (
//         <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
//           <label style={labelStyle}>
//             {field.label} {field.required && <span style={{ color: "#ef4444" }}>*</span>}
//           </label>
//           <textarea 
//             placeholder={field.placeholder ?? "Write your thoughts here..."} 
//             value={value ?? ""} 
//             onChange={e => onChange(e.target.value)} 
//             rows={4} 
//             style={{ ...baseInputStyle, padding: "10px 14px", resize: "none" }} 
//           />
//           {error && <p style={errorStyle}><AlertCircle style={{ width: "13px", height: "13px" }}/>{error}</p>}
//         </div>
//       );

//     case "single_select": {
//       const opts: string[] = field.config?.options ?? [];
//       return (
//         <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
//           <label style={labelStyle}>
//             {field.label} {field.required && <span style={{ color: "#ef4444" }}>*</span>}
//           </label>
//           <div style={{ display: "flex", flexDirection: "column", gap: "8px", paddingLeft: "4px" }}>
//             {opts.map(opt => (
//               <label key={opt} style={{ display: "flex", alignItems: "center", gap: "8px", color: "#2d2416", fontSize: "14px", fontWeight: "600", cursor: "pointer", fontFamily: "'Nunito', sans-serif" }}>
//                 <input 
//                   type="radio" 
//                   name={field.id} 
//                   checked={value === opt} 
//                   onChange={() => onChange(opt)} 
//                   style={{ accentColor: "#634cc9", cursor: "pointer", width: "16px", height: "16px" }} 
//                 />
//                 <span style={{fontFamily: "'Caveat', cursive, sans-serif"}}>{opt}</span>
//               </label>
//             ))}
//           </div>
//           {error && <p style={errorStyle}><AlertCircle style={{ width: "13px", height: "13px" }}/>{error}</p>}
//         </div>
//       );
//     }

//     case "checkbox":
//       return (
//         <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
//           <label style={{ ...labelStyle, display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
//             <input 
//               type="checkbox" 
//               checked={!!value} 
//               onChange={e => onChange(e.target.checked)} 
//               style={{fontFamily: "'Caveat', cursive, sans-serif", accentColor: "#634cc9", cursor: "pointer", width: "16px", height: "16px", flexShrink: 0 }} 
//             />
//             <span style={{fontFamily: "'Caveat', cursive, sans-serif"}}>{field.label} {field.required && <span style={{ color: "#ef4444" }}>*</span>}</span>
//           </label>
//           {error && <p style={errorStyle}><AlertCircle style={{ width: "13px", height: "13px" }}/>{error}</p>}
//         </div>
//       );

//     default:
//       return null;
//   }
// }

// // ── Password gate ──────────────────────────────────────────────────
// function PasswordGate({ slug, onUnlock }: { slug: string; onUnlock: (pw: string) => void }) {
//   const [pw, setPw] = useState("");
//   return <h1>hello</h1>;
// }

// const page = ({ params }: { params: Promise<{ slug: string }> }) => {
//   const { slug }  = use(params);
//   const router    = useRouter();
//   const apiUrl    = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

//   const [password, setPassword]   = useState<string | undefined>(undefined);
//   const [answers, setAnswers]     = useState<Record<string, unknown>>({});
//   const [errors, setErrors]       = useState<Record<string, string>>({});
//   const [submitting, setSubmitting] = useState(false);
//   const [formClosed, setFormClosed] = useState(false);

//   const trackEvent = useTrackEvent();
//   const { data: form, isLoading, error } = usePublicForm(slug, "hackathon2025");

//   // ── RESPONSIVE SCALE ──────────────────────────────────────────────
// // ── RESPONSIVE SCALE ──
// const [scale, setScale] = useState(0.8);

// useEffect(() => {
//   const update = () => {
//   const scaleX = window.innerWidth  / 1250;
//   const scaleY = window.innerHeight / 900;
//   // Cap at 0.8 — never go above original design
//   // On small screens, shrink proportionally
//   setScale(Math.min(scaleX, scaleY, 0.8));
// };
//   update();
//   window.addEventListener("resize", update);
//   return () => window.removeEventListener("resize", update);
// }, []);
//   // ─────────────────────────────────────────────────────────────────

//   const hasViewed = useRef(false);
//   const startTimeRef = useRef(Date.now());
//   const hasStarted = useRef(false);
//   const hasSubmitted = useRef(false);

  

//   // Track form_view once on mount
//   useEffect(() => {
//     if (form && !("requiresPassword" in form) && !hasViewed.current) {
//       trackEvent.mutate({
//         formId: form.id,
//         eventType: "form_view",
//       });
//     }

//     return () => {
//       if (hasStarted.current && !hasSubmitted.current && form) {
//         trackEvent.mutate({
//           formId: form.id,
//           eventType: "form_abandon",
//         });
//       }
//     };
//   }, [form?.id]);

//   if (isLoading) return (
//     <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: "#fbf3eb" }}>
//       <div className="w-full max-w-xl space-y-4">
//         <Skeleton className="h-10 w-2/3" />
//         <Skeleton className="h-4 w-full" />
//         <Skeleton className="h-20 w-full" />
//         <Skeleton className="h-20 w-full" />
//       </div>
//     </div>
//   );

//   if (error || !form) return (
//     <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: "#fbf3eb" }}>
//       <Card className="max-w-md w-full">
//         <CardContent className="py-12 text-center space-y-2">
//           <AlertCircle className="h-10 w-10 text-muted-foreground mx-auto" />
//           <p className="font-semibold">Form not available</p>
//           <p className="text-sm text-muted-foreground">
//             {getErrorMessage(error) ?? "This form doesn't exist or has been removed."}
//           </p>
//         </CardContent>
//       </Card>
//     </div>
//   );

//   if (formClosed) return (
//     <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: "#fbf3eb" }}>
//       <Card className="max-w-md w-full">
//         <CardContent className="py-12 text-center space-y-2">
//           <p className="font-semibold">Form Closed</p>
//           <p className="text-sm text-muted-foreground">This form is no longer accepting responses.</p>
//         </CardContent>
//       </Card>
//     </div>
//   );

//   // Password gate
//   if ((form as any).requiresPassword && password === undefined) {
//     return (
//       <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: "#fbf3eb" }}>
//         <PasswordGate slug={slug} onUnlock={pw => setPassword(pw)} />
//       </div>
//     );
//   }

//   const allFields     = (form as any).fields ?? [];
//   const activeFields  = applyConditions(allFields, answers as Record<string, unknown>);
//   const inputFields   = activeFields.filter((f: any) => f.type !== "divider" && f.type !== "section_title");
//   const answered      = inputFields.filter((f: any) => answers[f.id] !== undefined && answers[f.id] !== "").length;
//   const progressPct   = inputFields.length > 0 ? Math.round((answered / inputFields.length) * 100) : 0;

//   async function handleSubmit() {
//     const schema     = buildFieldSchema(inputFields as any);
//     const validation = schema.safeParse(answers);

//     if (!validation.success) {
//       const fieldErrors: Record<string, string> = {};
//       for (const [key, issues] of Object.entries(validation.error.flatten().fieldErrors)) {
//         fieldErrors[key] = (issues as string[])[0] ?? "Invalid";
//       }
//       setErrors(fieldErrors);
//       return;
//     }
//     setErrors({});
//     setSubmitting(true);

//     try {
//       const res = await fetch(`${apiUrl}/f/${slug}/submit`, {
//         method:      "POST",
//         headers:     { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({
//           formVersionId: (form as any).currentVersionId,
//           answers:       validation.data,
//           metadata: {
//             timeToCompleteMs: Date.now() - startTimeRef.current,
//             referrer: typeof window !== "undefined" ? document.referrer : "",
//           },
//           __hp: "",
//         }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         if (data.code === "FORM_VERSION_OUTDATED") {
//           toast.error(getErrorMessage(data));
//           window.location.reload();
//           return;
//         }
//         if (data.code === "FORM_EXPIRED" || data.code === "FORM_RESPONSE_LIMIT") {
//           setFormClosed(true); return;
//         }
//         if (data.code === "VALIDATION_FAILED") {
//           setErrors(data.errors ?? {}); return;
//         }
//         alert(getErrorMessage(data));
//         return;
//       }

//       if (!hasSubmitted.current) {
//         hasSubmitted.current = true;
//       }

//       if (data.redirectUrl) {
//         window.location.href = data.redirectUrl;
//       } else {
//         router.push(`/f/${slug}/success`);
//       }
//     } finally {
//       setSubmitting(false);
//     }
//   }

//   return (
//  <div style={{ position: "relative", width: "100vw", height: "100vh", backgroundColor: "#fdf6ed", overflow: "hidden" }}>
      
//       {/* ── BACKGROUND FIXED ANIME COVER COMPOSITION FRAME ── */}
//       <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, margin: "0px 0px" }}>
//         <Image 
//           src="/FormAnime.png" 
//           alt="Anime Convention Interactive Theme Base" 
//           fill 
//           priority 
//           className="object-fill"
//         />
//       </div>

//       {/* ── GLOBAL INTERACTIVE OVERLAY SYSTEM MATRIX ── */}
//       <div 
//         style={{
//           position: "absolute", 
//           left: 0, 
//           top: 0, 
//           width: "125vw",    // unchanged
//           height: "125vh",   // unchanged
//           display: "flex",
//           transform: `scale(${scale})`,   // ← was hardcoded scale(0.8)
//           transformOrigin: "top left",    // unchanged
//           boxSizing: "border-box",
//           zIndex: 1,
//           padding: "40px"
//         }}
//       >
//         {/* Main Content Layout Columns Alignment */}
//         <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%" }}>
          
//           {/* 1. TOP HEADER OVERLAY (Sits cleanly inside the empty space of the top notebook paper sheet asset) */}
//           <div style={{ 
//             width: "400px", // Compressed slightly to prevent text from overflowing into the character asset space
//             height: "120px", 
//             marginLeft: "620px", // FIXED: Shifted coordinates leftwards to perfectly sit inside the lines
//             marginTop: "80px", // FIXED: Lowered bounding track to prevent overlap with the sticky tape decoration
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             padding: "0 10px",
//             boxSizing: "border-box",
//             maxHeight:"120px"
//           }}>
//             {/* Form Main Layout Title Text */}
//             <h1 style={{ 
//               fontFamily: "'Caveat', cursive, sans-serif", // Matches your signature handwritten anime brand style track
//               fontSize: "26px", // Enlarged font tracking sizing to give it a strong visual impact
//               fontWeight: "900", 
//               color: "#2d2416", // Custom hand-drawn warm ink accent tone color split
//               margin: "0 0 2px 0",
//               lineHeight: "1.1",
//               letterSpacing: "-0.01em",
//               paddingBottom:"24px"
//             }}>
//               { form?.title ?? "U stupid give title to form"}
//             </h1>
            
//             {/* Form Description Subtitle Block */}
//             <p style={{ 
//               fontFamily: "'Nunito', sans-serif", // Clean body baseline tracking layout fonts 
//               fontSize: "14px", 
//               fontWeight: "700", 
//               color: "rgba(45, 36, 22, 0.65)", // Subdued secondary text treatment color matrix profiles
//               margin: 0,
//               lineHeight: "1.4",
//               letterSpacing: "0.01em"
//             }}>
//               {form?.description ?? "Stupid give description to form 🌸"}
//             </p>
//           </div>

//           {/* 2. LOWER CONTENT ZONE (Maps exactly over the large central empty cardboard frame sheet) */}
//           <div 
//             style={{ 
//               width: "640px", // FIXED: Adjusted width metrics to lock flush into background frame line rules
//               height: "920px", // FIXED: Extended tracking window size down to provide ample layout depth 
//               marginLeft: "580px", // FIXED: Center aligned seamlessly inside the white notebook sheet canvas bounds
//               marginTop: "60px",
//               boxSizing: "border-box",
//               display: "flex",
//               flexDirection: "column",
//               gap: "24px",
//               overflowY: "auto", // Keeps overflow scrolling tracking strictly bound inside the layout frame
//               overflowX: "hidden",
//               padding: "20px 36px 60px 46px",
//               maxHeight:"540px"
//             }} 
//             className="custom-scrollbar"
//           >
//             {/* DYNAMIC FORM FIELDS RENDER TRACK LOOP */}
//             {allFields.map((field: any) => (
//               <DynamicPublicField 
//                 key={field.id}
//                 field={field}
//                 value={answers[field.id]}
//                 error={errors[field.id]}
//                 onChange={(val) => {
//                   setAnswers(prev => ({ ...prev, [field.id]: val }));
//                   if (!hasStarted.current) hasStarted.current = true;
//                 }}
//               />
//             ))}

//             {/* FORM ACTIONS SUBMIT BUTTON */}
//             {allFields.length > 0 && (
//               <div style={{ marginTop: "16px", width: "100%", display: "flex", justifyContent: "center" }}>
//                 <ScribbleButton
//                   type="button"
//                   disabled={submitting}
//                   onClick={handleSubmit}
//                   style={{
//                     backgroundColor: "#634cc9",
//                     color: "#654280",
//                     fontFamily: "'Caveat', cursive",
//                     fontSize: "15px",
//                     fontWeight: "800",
//                     border: "none",
//                     borderRadius: "8px",
//                     padding: "12px 32px",
//                     cursor: submitting ? "not-allowed" : "pointer",
//                     boxShadow: "0px 4px 10px rgba(99, 76, 201, 0.25)",
//                     transition: "all 0.1s ease",
//                     display: "flex",
//                     alignItems: "center",
//                     gap: "8px"
//                   }}
//                   onMouseEnter={(e) => !submitting && (e.currentTarget.style.transform = "translateY(-1px)")}
//                   onMouseLeave={(e) => !submitting && (e.currentTarget.style.transform = "none")}
//                 >
//                   {submitting ? "Submitting..." : "Submit Application"}
//                 </ScribbleButton>
//               </div>
//             )}
//           </div>

//           {/* 3. RIGHT SIDEBAR PINNED YELLOW NOTEBOOK LAYER OVERLAY */}
//           {/* Maps seamlessly over image_e7968c.png to display custom copy instructions */}
//           <div style={{
//             position: "absolute",
//             top: "300px",
//             left: "1415px",
//             width: "250px",
//             height: "260px",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             padding: "35px 28px 25px 28px",
//             boxSizing: "border-box",
//             transform: "rotate(1.5deg)" // Custom tilt angle layer maps organic pushpin perspective offset
//           }}>
//             <p style={{
//               fontFamily: "'Caveat', cursive",
//               fontSize: "25px",
//               fontWeight: "bold",
//               color: "#333333",
//               textAlign: "center",
//               lineHeight: "1.3",
//               margin: 0,
//               userSelect: "none"
//             }}>
//               stop reading this stupid fill the form and leave
//             </p>
//           </div>

//         </div>
//       </div>

//       {/* Embedded Sketch Scrollbar Styles Injector */}
//       <style dangerouslySetInnerHTML={{__html: `
//         .custom-scrollbar::-webkit-scrollbar {
//           width: 6px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-track {
//           background: transparent;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: rgba(45, 36, 22, 0.18);
//           border-radius: 99px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//           background: rgba(45, 36, 22, 0.35);
//         }
//       `}} />

//     </div>
//   );
// }

// export default page;

"use client";

import { AlertCircle, Lock, Moon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { use, useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '~/components/ui/card';
import { applyConditions, buildFieldSchema } from "@repo/validators";
import { Skeleton } from '~/components/ui/skeleton';
import { useTrackEvent } from '~/hooks/api';
import { usePublicForm } from '~/hooks/api/forms';
import { getErrorMessage } from '~/lib/errors';
import { toast } from 'sonner';
// import { ScribbleButton } from '~/components/scribble/ScribbleButton';


// ── CUSTOM WATERCOLOR TEXTURED SCRIBBLE BUTTON COMPONENT ──
interface ScribbleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  submitting?: boolean;
}

export function ScribbleButton({ children, submitting, style, ...props }: ScribbleButtonProps) {
  return (
    <button
      {...props}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        fontFamily: "'Caveat', cursive, sans-serif",
        fontSize: "24px",
        fontWeight: "bold",
        color: "#ffffff",
        cursor: submitting ? "not-allowed" : "pointer",
        border: "none",
        background: "transparent",
        position: "relative",
        padding: "12px 65px", 
        userSelect: "none",
        transition: "transform 0.1s ease, filter 0.1s ease",
        outline: "none",
        ...style,
      }}
      onMouseEnter={(e) => !submitting && (e.currentTarget.style.transform = "scale(1.02)")}
      onMouseLeave={(e) => !submitting && (e.currentTarget.style.transform = "scale(1)")}
      onMouseDown={(e) => !submitting && (e.currentTarget.style.transform = "scale(0.98)")}
      onMouseUp={(e) => !submitting && (e.currentTarget.style.transform = "scale(1.02)")}
    >
      {/* ── 1. EMBEDDED HAND-SKETCHED WATERCOLOR VECTOR ENGINE ── */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          overflow: "visible",
          pointerEvents: "none"
        }}
        viewBox="0 0 320 60"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <filter id="watercolor-texture" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" result="noise" />
            <feDiffuseLighting in="noise" lighting-color="#e1d5ff" surfaceScale="2" result="light">
              <feDistantLight azimuth="60" elevation="50" />
            </feDiffuseLighting>
            <feComponentTransfer>
              <feFuncR type="linear" slope="0.9" />
              <feFuncG type="linear" slope="0.75" />
              <feFuncB type="linear" slope="1" />
            </feComponentTransfer>
            <feBlend mode="multiply" in="SourceGraphic" result="blend" />
          </filter>
        </defs>

        {/* Outer Organic Shadow Layer */}
        <rect x="3" y="5" width="314" height="52" rx="10" fill="rgba(45, 36, 22, 0.15)" />

        {/* Main Textured Purple Canvas Body Block */}
        <rect
          x="3"
          y="3"
          width="314"
          height="52"
          rx="10"
          fill="#9462f5" 
          filter="url(#watercolor-texture)"
        />

        {/* Hand-sketched Double-Border Inky Contour Outlines */}
        <path 
          d="M12 4 Q160 2 308 4 Q316 5 316 12 Q318 30 316 48 Q316 56 308 56 Q160 58 12 56 Q4 56 4 48 Q2 30 4 12 Q4 5 12 4 Z" 
          stroke="#2d2416" 
          strokeWidth="1.6" 
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.9"
        />
        <path 
          d="M14 6 C100 5, 200 5, 306 6 C312 8, 313 15, 314 30 C313 45, 312 52, 306 54 C200 55, 100 55, 14 54 C8 52, 7 45, 6 30 C7 15, 8 8, 14 6 Z" 
          stroke="#1f180e" 
          strokeWidth="0.8" 
          opacity="0.3"
        />

        {/* ── 2. BOTH SIDES ENERGY THREE LINES ── */}
        <g stroke="#2d2416" strokeWidth="2" strokeLinecap="round" opacity="0.85">
          <line x1="-12" y1="24" x2="-22" y2="18" />
          <line x1="-15" y1="30" x2="-26" y2="30" />
          <line x1="-12" y1="36" x2="-22" y2="42" />
        </g>

        <g stroke="#2d2416" strokeWidth="2" strokeLinecap="round" opacity="0.85">
          <line x1="332" y1="24" x2="342" y2="18" />
          <line x1="335" y1="30" x2="346" y2="30" />
          <line x1="332" y1="36" x2="342" y2="42" />
        </g>
      </svg>

      {/* ── 3. BUTTON CONTENT & ACTIONS LAYER ── */}
      <span style={{ position: "relative", zIndex: 1, letterSpacing: "0.5px", textShadow: "1px 1.5px 0px rgba(0,0,0,0.15)" }}>
        {children}
      </span>

      {/* ── 4. CUSTOM SCRIBBL_AEROPLANE SVG ── */}
      <svg 
        width="22" 
        height="22" 
        viewBox="0 0 24 24" 
        fill="none" 
        style={{ position: "relative", zIndex: 1, overflow: "visible", marginLeft: "2px" }}
      >
        <path 
          d="M2 12L22 2L15 22L11 13L2 12Z" 
          fill="#fff" 
          stroke="#2d2416" 
          strokeWidth="2.5" 
          strokeLinejoin="round" 
          strokeLinecap="round"
        />
        <path 
          d="M11 13L22 2" 
          stroke="#2d2416" 
          strokeWidth="2.5" 
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}


// ── HELPER: RENDER HAND-DRAWN GLOSSY STICKER SVGS ──
function renderFieldIcon(type: string) {
  const baseSvgStyle = { flexShrink: 0, overflow: "visible" };
  
  switch (type) {
    case "email":
      // ✉️ Hand-drawn Shiny Mail Envelope
      return (
        <svg width="22" height="20" viewBox="0 0 24 22" fill="none" style={baseSvgStyle}>
          <rect x="2" y="4" width="20" height="14" rx="3" fill="#dfc9ff" stroke="#2d2416" strokeWidth="2" strokeLinejoin="round" />
          <path d="M2 5L12 13L22 5" stroke="#2d2416" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          {/* Glossy Overlay glaze highlights */}
          <path d="M4 6h6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        </svg>
      );

    case "short_text":
    case "phone":
      // 👤 Hand-drawn User Avatar Icon
      return (
        <svg width="22" height="20" viewBox="0 0 24 22" fill="none" style={baseSvgStyle}>
          <circle cx="12" cy="7" r="4" fill="#dfc9ff" stroke="#2d2416" strokeWidth="2" />
          <path d="M4 18c0-3.5 3.5-6 8-6s8 2.5 8 6" fill="#dfc9ff" stroke="#2d2416" strokeWidth="2" strokeLinejoin="round" />
          {/* Glossy Overlay glaze highlights */}
          <path d="M11 5a2 2 0 0 1 2 2" stroke="#fff" strokeWidth="1.5" opacity="0.6" />
        </svg>
      );

    case "number":
      // ⭐ Hand-drawn Glossy Rating Star
      return (
        <svg width="22" height="20" viewBox="0 0 24 22" fill="none" style={baseSvgStyle}>
          <path d="M12 2l2.8 5.7 6.2.9-4.5 4.4 1.1 6.3-5.6-3-5.6 3 1.1-6.3-4.5-4.4 6.2-.9L12 2z" fill="#dfc9ff" stroke="#2d2416" strokeWidth="2" strokeLinejoin="round" />
          {/* Glossy Overlay glaze highlights */}
          <path d="M12 5l1.2 2.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        </svg>
      );

    case "long_text":
      // 📋 Hand-drawn Task Clipboard Checklist
      return (
        <svg width="22" height="20" viewBox="0 0 24 22" fill="none" style={baseSvgStyle}>
          <rect x="4" y="5" width="16" height="15" rx="2" fill="#dfc9ff" stroke="#2d2416" strokeWidth="2" />
          <path d="M9 3h6a1 1 0 0 1 1 1v1H8V4a1 1 0 0 1 1-1z" fill="#b095e6" stroke="#2d2416" strokeWidth="2" />
          <line x1="8" y1="10" x2="16" y2="10" stroke="#2d2416" strokeWidth="2" strokeLinecap="round" />
          <line x1="8" y1="14" x2="14" y2="14" stroke="#2d2416" strokeWidth="2" strokeLinecap="round" />
          {/* Glossy Overlay glaze highlights */}
          <path d="M6 7v4" stroke="#fff" strokeWidth="1.5" opacity="0.5" />
        </svg>
      );

    default:
      // 📎 Hand-drawn Stationery Paperclip Asset Loop
      return (
        <svg width="22" height="20" viewBox="0 0 24 22" fill="none" style={baseSvgStyle}>
          <path d="M7 9v6a4 4 0 1 0 8 0V7a2.5 2.5 0 0 0-5 0v7.5a1 1 0 0 0 2 0V9" stroke="#634cc9" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
  }
}

// ── CUSTOM THEMED INPUT RENDERER ──
function DynamicPublicField({ field, value, onChange, error }: {
  field: any; value: any; onChange: (v: any) => void; error?: string;
}) {
  const labelStyle = { 
    fontFamily: "'Caveat', cursive, sans-serif", 
    display: "flex", 
    alignItems: "center", 
    gap: "10px", 
    fontSize: "18px", 
    fontWeight: "500", 
    color: "#2d2416", 
    marginBottom: "6px",
    userSelect: "none" as const
  };
  
  const errorStyle = { fontFamily: "'Caveat', cursive, sans-serif", fontSize: "14px", color: "#ef4444", display: "flex", alignItems: "center", gap: "4px", marginTop: "4px" };
  
  if (typeof error === "string") {
    error = error.replaceAll("Invalid input: ","").replaceAll("Invalid option: ","").replaceAll(" received undefined","");
  }
  
  const baseInputStyle = {
    width: "100%",
    minHeight: "42px",
    padding: "0 14px",
    border: "1.5px solid #c8b8a0",
    borderRadius: "8px",
    backgroundColor: "rgba(255, 253, 247, 0.75)",
    fontFamily: "'Nunito', sans-serif",
    fontSize: "14px",
    color: "#2d2416",
    outline: "none",
    boxSizing: "border-box" as const
  };

  switch (field.type) {
    case "short_text":
    case "email":
    case "number":
    case "phone":
      return (
        <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
          <label style={labelStyle}>
            {renderFieldIcon(field.type)}
            <span>
              {field.label} {field.required && <span style={{ color: "#ef4444" }}>*</span>}
            </span>
          </label>
          <input 
            type={field.type === "number" ? "number" : field.type === "email" ? "email" : "text"} 
            placeholder={field.placeholder ?? `Type your answer here...`} 
            value={value ?? ""} 
            onChange={e => onChange(field.type === "number" ? (e.target.value ? Number(e.target.value) : "") : e.target.value)} 
            style={baseInputStyle} 
          />
          {error && <p style={errorStyle}><AlertCircle style={{ width: "13px", height: "13px" }}/>{error}</p>}
        </div>
      );

    case "long_text":
      return (
        <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
          <label style={labelStyle}>
            {renderFieldIcon(field.type)}
            <span>
              {field.label} {field.required && <span style={{ color: "#ef4444" }}>*</span>}
            </span>
          </label>
          <textarea 
            placeholder={field.placeholder ?? "Write your thoughts here..."} 
            value={value ?? ""} 
            onChange={e => onChange(e.target.value)} 
            rows={4} 
            style={{ ...baseInputStyle, padding: "10px 14px", resize: "none" }} 
          />
          {error && <p style={errorStyle}><AlertCircle style={{ width: "13px", height: "13px" }}/>{error}</p>}
        </div>
      );

    case "single_select": {
      const opts: string[] = field.config?.options ?? [];
      return (
        <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
          <label style={labelStyle}>
            {renderFieldIcon(field.type)}
            <span>
              {field.label} {field.required && <span style={{ color: "#ef4444" }}>*</span>}
            </span>
          </label>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", paddingLeft: "32px", marginTop: "4px" }}>
            {opts.map(opt => (
              <label key={opt} style={{ fontWeight:"200",display: "flex", alignItems: "center", gap: "8px", color: "#2d2416", cursor: "pointer" }}>
                <input 
                  type="radio" 
                  name={field.id} 
                  checked={value === opt} 
                  onChange={() => onChange(opt)} 
                  style={{ accentColor: "#634cc9", cursor: "pointer", width: "16px", height: "16px" }} 
                />
                <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: "14px", fontWeight: "600" }}>{opt}</span>
              </label>
            ))}
          </div>
          {error && <p style={errorStyle}><AlertCircle style={{ width: "13px", height: "13px" }}/>{error}</p>}
        </div>
      );
    }

    case "checkbox":
      return (
        <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
          <label style={{ ...labelStyle, cursor: "pointer" }}>
            {renderFieldIcon(field.type)}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <input 
                type="checkbox" 
                checked={!!value} 
                onChange={e => onChange(e.target.checked)} 
                style={{ accentColor: "#634cc9", cursor: "pointer", width: "16px", height: "16px", flexShrink: 0 }} 
              />
              <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: "14px", fontWeight: "700" }}>
                {field.label} {field.required && <span style={{ color: "#ef4444" }}>*</span>}
              </span>
            </div>
          </label>
          {error && <p style={errorStyle}><AlertCircle style={{ width: "13px", height: "13px" }}/>{error}</p>}
        </div>
      );

    default:
      return null;
  }
}

function PasswordGate({ slug, onUnlock }: { slug: string; onUnlock: (pw: string) => void }) {
  const [pw, setPw] = useState("");
  return <h1>Secure Gate</h1>;
}

const DefaultScribbleFormPage = ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = use(params);
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

  const [password, setPassword] = useState<string | undefined>(undefined);
  const [answers, setAnswers] = useState<Record<string, unknown>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [formClosed, setFormClosed] = useState(false);
  const [isTrickedOpen, setIsTrickedOpen] = useState(false);

  const trackEvent = useTrackEvent();
  const { data: form, isLoading, error } = usePublicForm(slug, "hackathon2025");

  const [scale, setScale] = useState(0.8);

  useEffect(() => {
    const update = () => {
      const scaleX = window.innerWidth / 1250;
      const scaleY = window.innerHeight / 900;
      setScale(Math.min(scaleX, scaleY, 0.8));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const hasViewed = useRef(false);
  const startTimeRef = useRef(Date.now());
  const hasStarted = useRef(false);
  const hasSubmitted = useRef(false);

  useEffect(() => {
    if (form && !("requiresPassword" in form) && !hasViewed.current) {
      trackEvent.mutate({ formId: form.id, eventType: "form_view" });
    }
    return () => {
      if (hasStarted.current && !hasSubmitted.current && form) {
        trackEvent.mutate({ formId: form.id, eventType: "form_abandon" });
      }
    };
  }, [form?.id]);

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: "#fdf6ed" }}>
      <div className="w-full max-w-xl space-y-4">
        <Skeleton className="h-10 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    </div>
  );

  if (error || !form) return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: "#fdf6ed" }}>
      <Card className="max-w-md w-full">
        <CardContent className="py-12 text-center space-y-2">
          <AlertCircle className="h-10 w-10 text-muted-foreground mx-auto" />
          <p className="font-semibold">Form not available</p>
        </CardContent>
      </Card>
    </div>
  );

  if (formClosed) return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: "#fdf6ed" }}>
      <Card className="max-w-md w-full">
        <CardContent className="py-12 text-center space-y-2">
          <p className="font-semibold">Form Closed</p>
        </CardContent>
      </Card>
    </div>
  );

  if ((form as any).requiresPassword && password === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: "#fdf6ed" }}>
        <PasswordGate slug={slug} onUnlock={pw => setPassword(pw)} />
      </div>
    );
  }

  const allFields = (form as any).fields ?? [];
  const activeFields = applyConditions(allFields, answers as Record<string, unknown>);
  const inputFields = activeFields.filter((f: any) => f.type !== "divider" && f.type !== "section_title");

  async function handleSubmit() {
    const schema = buildFieldSchema(inputFields as any);
    const validation = schema.safeParse(answers);

    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      for (const [key, issues] of Object.entries(validation.error.flatten().fieldErrors)) {
        fieldErrors[key] = (issues as string[])[0] ?? "Invalid";
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);

    try {
      const res = await fetch(`${apiUrl}/f/${slug}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          formVersionId: (form as any).currentVersionId,
          answers: validation.data,
          metadata: {
            timeToCompleteMs: Date.now() - startTimeRef.current,
            referrer: typeof window !== "undefined" ? document.referrer : "",
          },
          __hp: "",
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(getErrorMessage(data));
        return;
      }

      if (!hasSubmitted.current) hasSubmitted.current = true;
      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      } else {
        router.push(`/f/${slug}/success`);
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh", backgroundColor: "#fdf6ed", overflow: "hidden" }}>
      
      {/* ── 1. BACKGROUND FULL SKETCH BORDER FRAME (BG.png) ── */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <Image 
          src="/formsType/scribbleFormBG.png" 
          alt="Scribble Canvas Theme Border Frame" 
          fill 
          priority 
          className="object-fill"
        />
      </div>

      {/* ── 2. GLOBAL INTERACTIVE DESIGN MATRIX CONTAINER ── */}
      <div 
        style={{
          position: "absolute", 
          left: "50%", 
          top: "47%", // Slightly raised vertically to keep the layout balanced on standard viewports
          width: "1810px",
          height: "900px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transform: `translate(-50%, -50%) scale(${scale})`,
          transformOrigin: "center center",
          boxSizing: "border-box",
          zIndex: 1,
          padding: "20px 40px"
        }}
      >
        {/* ── TOP UTILITY STRIP HEADER ── */}
        <div style={{fontFamily: "'Caveat', cursive",width:"100%", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "65px" }}>
          {/* ── 💜 SIMPLIFIED HAND-DRAWN LOGO BRANDING STRIP ── */}
<div style={{ display: "flex", flexDirection: "column", width: "fit-content", position: "relative", userSelect: "none" }}>
  
  {/* Inline Logo Text + Heart Block */}
  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
    <span style={{ 
      fontFamily: "'Caveat', cursive, sans-serif", 
      fontSize: "26px", 
      fontWeight: 900, 
      color: "#2d2416",
      lineHeight: "1"
    }}>
      ScribbleForms
    </span>

    {/* 💜 CLEAN SOLID HEART SVG (Completely Transparent Base) */}
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" style={{ display: "block", overflow: "visible" }}>
      {/* Soft Drop Shadow Outline */}
      <path 
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
        fill="rgba(45, 36, 22, 0.15)" 
        transform="translate(0.5, 1.5)"
      />
      {/* Solid Vibrant Purple Fill */}
      <path 
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
        fill="#9462f5"
      />
      {/* Clean Inky Stroke Border */}
      <path 
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
        stroke="#2d2416" 
        strokeWidth="2.2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      {/* White Gel-Pen Highlight Reflection */}
      <path 
        d="M6.5 7.5c-1 1-0.8 2.5 0 3" 
        stroke="#ffffff" 
        strokeWidth="1.8" 
        strokeLinecap="round" 
        opacity="0.85" 
      />
    </svg>
  </div>

  {/* ── ✍️ UNEVEN WOBBLY HAND-DRAWN UNDERLINE ── */}
  <div style={{ position: "absolute", bottom: "-10px", left: "2px", width: "100%", height: "12px" }}>
    <svg width="100%" height="100%" viewBox="0 0 200 12" preserveAspectRatio="none" style={{ display: "block", overflow: "visible" }}>
      {/* Marker Shadow layer */}
      <path 
        d="M 2 7 C 45 4, 85 9, 130 6 C 165 4, 188 8, 197 5 M 194 6 C 145 8, 105 5, 55 7 C 32 8, 14 6, 5 6.5" 
        stroke="rgba(45, 36, 22, 0.12)" 
        strokeWidth="3.2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        fill="none" 
        transform="translate(0, 1)"
      />
      {/* Main Purple Wobbly Scribble Track Line */}
      <path 
        d="M 2 7 C 45 4, 85 9, 130 6 C 165 4, 188 8, 197 5 M 194 6 C 145 8, 105 5, 55 7 C 32 8, 14 6, 5 6.5" 
        stroke="#9462f5" 
        strokeWidth="3.2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        fill="none" 
      />
    </svg>
  </div>
</div>
          {/* ── INTERACTIVE UTILITY STRIP CONTAINER ── */}
<div style={{ display: "flex", alignItems: "center", gap: "16px", fontSize: "20px", fontWeight: 700, color: "#5a4a30" }}>
  <Lock size={24} />
  <div style={{ display: "flex", alignItems: "center", gap: "4px", borderBottom: "1px dashed #5a4a30", paddingBottom: "2px" }}>
    Secure & Private
  </div>
  
  {/* 👇 INTERACTIVE MOON CLICK TRIGGER */}
  <Moon 
    size={24} 
    style={{ cursor: "pointer", transition: "transform 0.1s ease" }} 
    onClick={() => setIsTrickedOpen(true)}
    onMouseEnter={(e) => (e.currentTarget.style.transform = "rotate(-12deg) scale(1.1)")}
    onMouseLeave={(e) => (e.currentTarget.style.transform = "rotate(0deg) scale(1)")}
  />
    
</div>
        </div>

        {/* ── 👇 LEFT MID SIDEWALK PURPLE STICKY NOTE CARD ── */}
        <div style={{
          position: "absolute",
          left: "-10px",            // Positions it to the left side of the main form card
          top: "40px",             // Centers it vertically alongside the top half of the form
          width: "360px",           // Scale boundaries to fit comfortably
          height: "auto",
          transform: "rotate(-4deg)", // Slight left organic slant tilt angle
          zIndex: 2,
          pointerEvents: "none"
        }}>
          <img 
            src="/formsType/prupleCard.png" 
            alt="Your responses help us build better things sticky note"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>

        {/* ── 👇 LEFT BOTTOM PLAYFUL CAT WITH BALL ARTWORK ── */}
        <div style={{
          position: "absolute",
          left: "50px",            // Aligns cleanly below the sticky note asset lane
          bottom: "-157px",           // Pins it safely to the baseline of the container canvas sheet
          width: "410px",  
          height:"auto",         // Scale size proportional to layout elements
          zIndex: 2,
          pointerEvents: "none"
        }}>
          <img 
            src="/formsType/catWithBall.png" 
            alt="Playful cat playing with a purple ball of yarn"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>

        {/* ── 📌 RIGHT MID SIDE YELLOW STICKY NOTE CARD ── */}
        <div style={{
          position: "absolute",
          right: "120px",           // Mirrored perfectly on the right channel lane
          top: "180px",             // Slightly balanced height offset to look natural
          width: "330px",           // Matches visual dimensions of the asset
          transform: "rotate(3deg)", // Organic sketch style tilt to the right
          zIndex: 2,
          pointerEvents: "none"
        }}>
          <img 
            src="/formsType/midRightCard.png" 
            alt="Every response makes a difference note with pin"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>

        {/* ── 🐈 RIGHT BOTTOM SLEEPING CAT ON PURPLE MAT ── */}
        <div style={{
          position: "absolute",
          right: "10px",          // Balanced right footer placement matching original canvas sheet limits
          bottom: "-35px",          // Flushed safely to the ground baseline level
          width: "460px",          // Retains original vector scale size
          zIndex: 2,
          pointerEvents: "none"
        }}>
          <img 
            src="/formsType/bottomRightCat(1).png" 
            alt="Cute sleeping cat on a purple round pillow cushion"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>

        {/* ── CENTRALIZED FORM DISPLAY CANVAS CARD ── */}
        <div 
          style={{
            position: "relative", 
            backgroundColor: "#fffdf9",
            border: "1.5px solid #2d2416",
            borderRadius: "16px",
            width: "860px",
            height: "790px", // Expanded height limits slightly to seamlessly containerize the submission area internally
            boxShadow: "4px 5px 0px rgba(45, 36, 22, 0.08)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "45px 40px 24px 40px",
            boxSizing: "border-box",
            marginTop: "45px"
          }}
        >
          {/* ── 👇 RESTORED & ALIGNED PEEKABOO BOY ARTWORK WITH INTEGRATED BUBBLE ── */}
<div style={{
  position: "absolute",
  top: "-170px",                 // Lifted slightly higher so his hands rest perfectly on the card's top edge
  left: "55%",
  transform: "translateX(-41%)", // Offset slightly from -50% to visually center the boy instead of the speech bubble
  width: "330px",                // Expanded to fit both the boy and his speech bubble without clipping
  height: "auto",
  zIndex: 5,
  pointerEvents: "none"          // Prevents the image bounding box from blocking inputs or text selection below it
}}>
  <img 
    src="/formsType/BoyOnTop.png" // Replace with your exact public directory folder path if different
    alt="Boy peeking over form card thanking user"
    style={{
      width: "100%",
      height: "auto",
      display: "block"
    }}
  />
</div>

          {/* Form Content Header Titles */}
          <div style={{ textAlign: "center", marginBottom: "20px", width: "100%" }}>
            <h1 style={{ fontFamily: "'Caveat', cursive", fontSize: "38px", fontWeight: "900", color: "#2d2416", margin: "0 0 2px 0" }}>
              {form?.title ?? "Tell Us Your Thoughts ✨"}
            </h1>
            <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "14px", fontWeight: "700", color: "rgba(45, 36, 22, 0.55)", margin: 0 }}>
              {form?.description ?? "We love hearing from awesome people like you. 💜"}
            </p>
          </div>

          {/* DYNAMIC SCROLLABLE FIELD WRAPPER */}
          <div 
            style={{
              width: "100%",
              flex: 1,
              overflowY: "auto",
              overflowX: "hidden",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              paddingRight: "6px",
              border: "1px dashed rgba(45, 36, 22, 0.1)",
              borderRadius: "10px",
              padding: "16px 14px",
              marginBottom: "20px" // Adds layout breathing room right above the internal submit block
            }}
            className="custom-scrollbar"
          >
            {allFields.map((field: any) => (
              <DynamicPublicField 
                key={field.id}
                field={field}
                value={answers[field.id]}
                error={errors[field.id]}
                onChange={(val) => {
                  setAnswers(prev => ({ ...prev, [field.id]: val }));
                  if (!hasStarted.current) hasStarted.current = true;
                }}
              />
            ))}
          </div>

          {/* ── 3. INTERNAL FORM SUBMIT BUTTON (CONVERTED TO TEXTURED SVG BUTTON) ── */}
          {allFields.length > 0 && (
            <div style={{ width: "100%", display: "flex", justifyContent: "center", zIndex: 10, flexShrink: 0 }}>
              <ScribbleButton
                type="button"
                disabled={submitting}
                submitting={submitting}
                onClick={handleSubmit}
              >
                {submitting ? "Submitting..." : "Submit Response"}
              </ScribbleButton>
            </div>
          )}
        </div>
      </div>

      {/* Embedded Sketch Scrollbar Styles Injector */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(45, 36, 22, 0.15);
          border-radius: 99px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(45, 36, 22, 0.3);
        }
      `}} />
    </div>
  );
};

export default DefaultScribbleFormPage;