"use client";

import React, { use, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useFormBuilderStore } from "~/store/form-builder.store"; 
import { useUIStore } from "~/store/ui.store";
import { 
  useFormDetail, 
  useUpdateForm, 
  usePublishForm, 
  useUnpublishForm,
  useAddField, 
  useDeleteField, 
  useUpdateField 
} from "~/hooks/api/forms";
import { Skeleton } from "~/components/ui/skeleton";
import { 
  CheckCircle, 
  Copy, 
  Trash2, 
  Type, 
  AlignLeft, 
  Mail, 
  Binary, 
  Calendar, 
  Sparkles,
  Link as LinkIcon 
} from "lucide-react";
import Sidebar from "~/components/Sidebar";
import { ScribbleButton } from "~/components/scribble/ScribbleButton";

const FIELD_TYPES = [
  { type: "short_text",     label: "Short Text" },
  { type: "long_text",      label: "Long Text" },
  { type: "email",          label: "Email" },
  { type: "number",         label: "Number" },
  { type: "single_select",  label: "Single Select" },
  { type: "multi_select",   label: "Multi Select" },
  { type: "checkbox",       label: "Checkbox" },
  { type: "rating",         label: "Rating" },
  { type: "date",           label: "Date" },
  { type: "phone",          label: "Phone" },
];

const getWobbleRectPath = (w: number, h: number, seed: number) => {
  const r = (i: number) => {
    const x = Math.sin(seed * 9301 + i * 49297 + 233711) * 43758.5453;
    return (x - Math.floor(x) - 0.5) * 3.5;
  };
  return [
    `M${4 + r(0)} ${3 + r(1)}`,
    `Q${w * 0.25 + r(2)} ${1 + r(3)} ${w * 0.5 + r(4)} ${2 + r(5)}`,
    `Q${w * 0.75 + r(6)} ${1.5 + r(7)} ${w - 4 + r(8)} ${3 + r(9)}`,
    `Q${w - 1 + r(10)} ${h * 0.3 + r(11)} ${w - 2 + r(12)} ${h * 0.65 + r(13)}`,
    `Q${w - 3 + r(14)} ${h - 4 + r(15)} ${w - 5 + r(16)} ${h - 2 + r(17)}`,
    `Q${w * 0.65 + r(18)} ${h - 1 + r(19)} ${w * 0.35 + r(20)} ${h - 2 + r(21)}`,
    `Q${5 + r(22)} ${h - 1 + r(23)} ${3 + r(24)} ${h - 4 + r(25)}`,
    `Q${1 + r(26)} ${h * 0.65 + r(27)} ${2 + r(28)} ${h * 0.3 + r(29)}`,
    "Z"
  ].join(" ");
};

interface BuildPageProps {
  params: Promise<{ id: string }>;
}

export default function BuildPage({ params }: BuildPageProps) {
  const { id: formId } = use(params);
  const { data: form, isLoading } = useFormDetail(formId);
  const updateForm = useUpdateForm(formId);
  const publishForm = usePublishForm(formId);
  const unpublishForm = useUnpublishForm(formId);
  const addField = useAddField(formId);
  const deleteField = useDeleteField(formId);
  const updateField = useUpdateField(formId);
  
  const { autosaveStatus } = useUIStore();
  const { selectedFieldId, setSelectedField } = useFormBuilderStore();
  const [titleVal, setTitleVal] = useState("");
  const [description, setDescription] = useState("");
  const [scale, setScale] = useState(0.8);

  // ── RESPONSIVE CANVAS MONITOR SCALING ────────────────────────────
  useEffect(() => {
    const handleResize = () => {
      const baseWidth = 1525; // Base design layout mapping reference width
      const currentWidth = window.innerWidth;
      const calculatedScale = (currentWidth / baseWidth) * 0.8;
      setScale(Math.max(calculatedScale, 0.45)); // Safe structural containment clamp boundary
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (form?.title) setTitleVal(form.title);
    if (form?.description) setDescription(form.description);
  }, [form?.title, form?.description]);

  const fields = form?.fields ?? [];
  const selectedField = fields.find((f: any) => f.id === selectedFieldId);

  const handleSaveTitle = () => {
    if (titleVal.trim() && titleVal !== form?.title) {
      updateForm.mutate({ id: formId, data: { title: titleVal.trim() } });
    }
  };

  const handleAddNewField = (type: string) => {
    addField.mutate({
      formId,
      field: { 
        type: type as any, 
        label: `New ${type.replace(/_/g, " ")} field`, 
        required: false, 
        order: fields.length 
      },
    });
  };

  const renderFieldPreviewContent = (field: any, index: number) => {
    const seed = index * 17 + 42;
    const W = 440;

    switch (field.type) {
      case "short_text":
      case "email":
      case "number":
      case "phone":
        return (
          <div style={{ width: "100%", position: "relative", padding: "6px 0", maxWidth: "440px" }}>
            <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} viewBox={`0 0 ${W} 36`} fill="none" preserveAspectRatio="none">
              <path d={getWobbleRectPath(W, 36, seed)} fill="white" fillOpacity={0.6} stroke="#c8b8a0" strokeWidth="1.1" />
            </svg>
            <span style={{ fontSize: "13px", color: "rgba(45, 36, 22, 0.4)", paddingLeft: "12px", position: "relative", zIndex: 10, display: "block", padding: "4px", fontFamily: "'Nunito', sans-serif" }}>
              {field.type === "email" ? "you@example.com" : "Type your answer here..."}
            </span>
          </div>
        );

      case "long_text":
        return (
          <div style={{ width: "100%", position: "relative", padding: "6px 0", marginTop: "4px", maxWidth: "440px" }}>
            <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} viewBox={`0 0 ${W} 64`} fill="none" preserveAspectRatio="none">
              <path d={getWobbleRectPath(W, 64, seed + 5)} fill="white" fillOpacity={0.6} stroke="#c8b8a0" strokeWidth="1.1" />
            </svg>
            <span style={{ fontSize: "13px", color: "rgba(45, 36, 22, 0.4)", paddingLeft: "12px", paddingTop: "6px", position: "relative", zIndex: 10, display: "block", minHeight: "48px", fontFamily: "'Nunito', sans-serif" }}>
              Write your thoughts here...
            </span>
          </div>
        );

      case "date":
        return (
          <div style={{ width: "100%", position: "relative", padding: "6px 0", maxWidth: "440px" }}>
            <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} viewBox={`0 0 ${W} 36`} fill="none" preserveAspectRatio="none">
              <path d={getWobbleRectPath(W, 36, seed)} fill="white" fillOpacity={0.6} stroke="#c8b8a0" strokeWidth="1.1" />
            </svg>
            <span style={{ fontSize: "13px", color: "rgba(45, 36, 22, 0.4)", paddingLeft: "12px", position: "relative", zIndex: 10, display: "block", padding: "4px", fontFamily: "'Nunito', sans-serif" }}>
              MM / DD / YYYY
            </span>
            <Calendar style={{ width: "16px", height: "16px", color: "rgba(45, 36, 22, 0.4)", position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", zIndex: 10 }} />
          </div>
        );

      case "single_select":
        return (
          <div style={{ display: "flex", flexWrap: "wrap", columnGap: "24px", rowGap: "8px", paddingTop: "6px", fontFamily: "'Nunito', sans-serif", fontSize: "14px", fontWeight: "600" }}>
            {["Option 1", "Option 2"].map((opt, i) => (
              <label key={i} style={{ display: "flex", alignItems: "center", gap: "8px", color: "#2d2416", cursor: "pointer" }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                  <circle cx="8" cy="8" r="6.5" stroke="#9a8060" strokeWidth="1.5" />
                  {i === 0 && <circle cx="8" cy="8" r="3.5" fill="#2d2416" />}
                </svg>
                <span>{opt}</span>
              </label>
            ))}
          </div>
        );

      case "checkbox":
      case "multi_select":
        return (
          <div style={{ display: "flex", flexWrap: "wrap", columnGap: "24px", rowGap: "8px", paddingTop: "6px", fontFamily: "'Nunito', sans-serif", fontSize: "14px", fontWeight: "600" }}>
            {["Option 1", "Option 2"].map((choice, i) => (
              <label key={i} style={{ display: "flex", alignItems: "center", gap: "8px", color: "#2d2416", cursor: "pointer" }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                  <path d="M2.5 2.5 Q8 1.5 13.5 2.5 Q14.5 8 13.5 13.5 Q8 14.5 2.5 13.5 Q1.5 8 2.5 2.5 Z" stroke="#9a8060" strokeWidth="1.5" fill="none" />
                </svg>
                <span>{choice}</span>
              </label>
            ))}
          </div>
        );

      case "rating":
        return (
          <div style={{ display: "flex", gap: "6px", paddingTop: "6px" }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <svg key={star} width="22" height="22" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
                <path 
                  d="M10 2l2.4 5H18l-4.4 3.4 1.6 5.6L10 13l-5.2 3 1.6-5.6L2 7h5.6z" 
                  stroke="#9a8060" 
                  strokeWidth="1.5" 
                />
              </svg>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div style={{ padding: "40px", width: "100%" }}>
        <Skeleton className="h-10 w-64 mb-6" />
        <div style={{ display: "flex", gap: "20px" }}>
          <Skeleton style={{ flex: 1, height: "500px" }} />
          <Skeleton style={{ width: "260px", height: "500px" }} />
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh", backgroundColor: "#fdf6ed", color: "#2d2416", overflow: "hidden" }}>
      
      {/* ── BACKGROUND FIXED CANVAS FRAME ── */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <Image 
          src="/builderBG.png" 
          alt="Notebook Framework Background" 
          fill 
          priority 
          className="object-fill"
        />
      </div>

      {/* ── RESPONSIVE VIRTUAL WORKSPACE PLANE ── */}
      <div 
        style={{
          position: "absolute", 
          left: 0, 
          top: 0, 
          width: "1920px",        // Firm layout coordinate system bounds limits
          height: "1080px",
          display: "flex",
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          boxSizing: "border-box",
          paddingLeft: "76px", 
          paddingTop: "24px",
          zIndex: 1
        }}
      >
        <Sidebar activeTab="Form" />
        
        {/* ── MAIN WORKSPACE STAGE AREA ── */}
        <div style={{ flex: 1, height: "100%", display: "flex", flexDirection: "column", paddingLeft: "10px" }}>
          
          {/* ── TOP NAV BAR SECTION ── */}
          <div 
            style={{ 
              width: "100%", 
              height: "90px", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "space-between", 
              paddingBottom: "8px",
              marginBottom: "16px",
              boxSizing: "border-box"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Link 
                href="/dashboard" 
                style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "10px", 
                  textDecoration: "none", 
                  color: "#2d2416",
                  fontWeight: "bold",
                  fontSize: "15px",
                  fontFamily: "'Nunito', sans-serif",
                  paddingTop: "35px"
                }}
              >
                <svg width="22" height="16" viewBox="0 0 24 16" fill="none" stroke="#2d2416" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M9 1L2 8L9 15" />
                  <path d="M2 8H22" />
                </svg>
                <span>Back to Dashboard</span>
              </Link>
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flex: 1, height: "100%", position: "relative" }}>
              <div style={{ position: "relative", width: "480px", height: "120px", marginTop: "20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Image
                  src="/builder Boy (1).png"
                  alt="Building something awesome!"
                  width={480}
                  height={120}
                  priority
                  style={{ objectFit: "contain", transform: "scale(1.25)" }} 
                />
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "16px", paddingTop: "30px", paddingRight: "46px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "rgba(45, 36, 22, 0.6)", fontWeight: 600 }}>
                <CheckCircle style={{ width: "15px", height: "15px", color: "#22c55e" }} />
                <span>All changes saved</span>
              </div>

              <ScribbleButton onClick={() => window.open(`/dashboard/forms/${formId}/preview`, "_blank")}>
                <span style={{ fontSize: "14px" }}>👁</span> Preview
              </ScribbleButton>

              <div style={{ width: "120px", height: "42px", display: "flex" }}>
                <ScribbleButton 
                  onClick={() => window.open(`/dashboard/forms/${formId}/share`, "_blank")}
                  style={{ 
                    width: "100%", 
                    height: "100%", 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center",
                    gap: "6px" 
                  }}
                >
                  <span style={{ fontSize: "14px" }}>⇧</span> Publish
                </ScribbleButton>
              </div>
            </div>
          </div>

          {/* ── LOWER CONTENT PANEL WORKSPACE REGION ── */}
          <div 
            style={{ 
              flex: 1, 
              display: "grid", 
              gridTemplateColumns: "270px 960px 240px", 
              width: "100%", 
              height: "calc(100% - 130px)", 
              overflow: "hidden" 
            }}
          >
            
            {/* 1. LEFT SIDEBAR: ADD FIELDS PANEL */}
            <div 
              style={{ 
                width: "100%", 
                height: "100%", 
                display: "flex", 
                flexDirection: "column", 
                gap: "6px", 
                paddingRight: "12px",
                overflowY: "auto",
                overflowX: "hidden", 
                alignItems: "center",
                boxSizing: "border-box"
              }}
            >
              <h3 style={{ fontFamily: "'Caveat', cursive", fontSize: "22px", margin: "0 0 2px 0", color: "#1a150e", width: "100%", paddingLeft: "12px" }}>Add Fields</h3>
              <p style={{ fontSize: "11px", color: "rgba(45, 36, 22, 0.5)", margin: "0 0 12px 0", fontFamily: "'Nunito', sans-serif", width: "100%", paddingLeft: "12px" }}>
                Drag and drop to add
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "6px", width: "100%" }}>
                {FIELD_TYPES.map((ft) => {
                  const Icon = 
                    ft.type === "short_text" ? Type : 
                    ft.type === "long_text" ? AlignLeft : 
                    ft.type === "email" ? Mail : 
                    ft.type === "number" ? Binary : 
                    ft.type === "date" ? Calendar : 
                    ft.type === "rating" ? Sparkles : LinkIcon;

                  return (
                    <button
                      key={ft.type}
                      disabled={addField.isPending}
                      onClick={() => handleAddNewField(ft.type)}
                      style={{
                        width: "100%", 
                        height: "42px",
                        display: "flex",
                        alignItems: "center",
                        padding: "0 14px",
                        background: "transparent",
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "#2d2416",
                        textAlign: "left",
                        cursor: "pointer",
                        border: "none",
                        position: "relative",
                        outline: "none",
                        gap: "10px",
                        boxSizing: "border-box"
                      }}
                    >
                      <svg viewBox="0 0 176 38" fill="none" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
                        <path 
                          d="M4.3703564055176685 1.6306875446680351 Q44.77590335932473 2.234368125858964 87.7289548808476 0.8793961147748632 Q132.84263172607734 1.826822399183584 171.32160742735869 2.300008643651381 Q174.00146472210145 12.005913244260592 175.27713761983614 23.575536357159944 Q173.11011265711204 34.3794556775174 171.66287634876062 34.579691604535924 Q113.48791747456417 38.139812168046774 60.356604982991115 35.879774289107445 Q4.650967657209549 37.29812903411221 1.7210496918796707 34.378610699910496 Q1.3890541362925433 23.92372687110692 2.203594366063953 11.222672864313063 Z" 
                          fill="white" 
                          stroke="#c8b8a0" 
                          strokeWidth="1.3" 
                          strokeLinecap="round"
                        />
                      </svg>
                      <Icon style={{ width: "15px", height: "15px", color: "#5a4a30", position: "relative", zIndex: 1, flexShrink: 0 }} />
                      <span style={{ position: "relative", zIndex: 1, fontFamily: "'Nunito', sans-serif" }}>{ft.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. CENTRAL WORKING STAGE: THE LIVE CANVAS SHEET */}
            <div 
              style={{ 
                width: "100%", 
                height: "100%", 
                display: "flex", 
                flexDirection: "column", 
                alignItems: "center",
                padding: "0 16px",
                overflow: "hidden"
              }}
            >
              <div
                style={{
                  width: "700px", 
                  height: "760px",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  padding: "64px 44px 44px 44px",
                  boxSizing: "border-box",
                  overflow: "hidden"
                }}
              >
                <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
                  <Image 
                    src="/demoBG (1).png" 
                    alt="Form Stage Paper" 
                    height={760}
                    width={700}
                    priority
                    style={{ objectFit: "fill" }}
                  />
                </div>

                <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", height: "100%", overflow: "hidden", width: "612px" }}>
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px", marginBottom: "20px", flexShrink: 0, width: "100%" }}>
                    <input
                      value={titleVal}
                      onChange={(e) => setTitleVal(e.target.value)}
                      onBlur={handleSaveTitle}
                      placeholder="Form Title"
                      style={{
                        fontFamily: "'Nunito', sans-serif",
                        fontSize: "26px",
                        fontWeight: "800",
                        color: "#1a150e",
                        border: "none",
                        outline: "none",
                        width: "100%",
                        background: "transparent"
                      }}
                    />
                    <div style={{ width: "100%" }}>
                      <input
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        onBlur={handleSaveTitle}
                        placeholder="Form Description..."
                        style={{
                          fontFamily: "'Nunito', sans-serif", 
                          fontSize: "13px", 
                          color: "rgba(45, 36, 22, 0.6)", 
                          margin: 0,
                          outline: "none",
                          width: "100%",
                          border: "none",
                          background: "transparent"
                        }}
                      />
                    </div>
                  </div>

                  <div 
                    className="custom-scrollbar"
                    style={{ 
                      flex: 1, 
                      overflowY: "auto", 
                      overflowX: "hidden", 
                      paddingRight: "8px",
                      display: "flex", 
                      flexDirection: "column", 
                      gap: "14px",
                      marginBottom: "16px",
                      width: "100%"
                    }}
                  >
                    {fields.length === 0 ? (
                      <div style={{ textAlign: "center", padding: "40px 20px", border: "1.5px dashed #c8b8a0", borderRadius: "6px", color: "rgba(45,36,22,0.5)", fontFamily: "'Nunito', sans-serif", width: "100%", boxSizing: "border-box" }}>
                        <p style={{ margin: "0 0 2px 0", fontSize: "14px", fontWeight: "bold" }}>No fields yet.</p>
                        <p style={{ margin: 0, fontSize: "12px" }}>Click a field type on the left to add one.</p>
                      </div>
                    ) : (
                      fields.map((field: any, idx: number) => {
                        const isSelected = field.id === selectedFieldId;
                        return (
                          <div
                            key={field.id}
                            onClick={() => setSelectedField(field.id === selectedFieldId ? null : field.id)}
                            style={{
                              padding: "12px 14px",
                              borderRadius: "8px",
                              backgroundColor: isSelected ? "rgba(252, 224, 155, 0.25)" : "transparent",
                              border: isSelected ? "1.5px solid #2d2416" : "1.5px solid transparent",
                              position: "relative",
                              cursor: "pointer",
                              transition: "background-color 0.1s ease",
                              flexShrink: 0,
                              width: "100%",
                              boxSizing: "border-box"
                            }}
                          >
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: "8px", fontFamily: "'Nunito', sans-serif" }}>
                                <span style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  width: "18px",
                                  height: "18px",
                                  borderRadius: "50%",
                                  border: "1px solid #c8b8a0",
                                  fontSize: "11px",
                                  fontWeight: "bold",
                                  color: "#634cc9"
                                }}>{idx + 1}</span>
                                <span style={{ fontSize: "13px", fontWeight: "700", color: "#2d2416" }}>
                                  {field.label} {field.required && <span style={{ color: "#ef4444" }}>*</span>}
                                </span>
                              </div>
                              <span style={{ fontSize: "11px", color: "rgba(45, 36, 22, 0.4)", fontWeight: 700, textTransform: "capitalize", fontFamily: "'Nunito', sans-serif" }}>
                                {field.type.replace(/_/g, " ")}
                              </span>
                            </div>

                            <div style={{ width: "100%", paddingRight: "64px", boxSizing: "border-box" }}>
                              {renderFieldPreviewContent(field, idx)}
                            </div>

                            <div style={{ position: "absolute", right: "8px", top: "50%", transform: "translateY(-50%)", display: "flex", alignItems: "center", gap: "4px" }}>
                              <button
                                onClick={(e) => { e.stopPropagation(); handleAddNewField(field.type); }}
                                style={{ background: "none", border: "none", padding: "4px", cursor: "pointer", color: "rgba(45,36,22,0.4)" }}
                              >
                                <Copy style={{ width: "13px", height: "13px" }} />
                              </button>
                              <button
                                onClick={(e) => { e.stopPropagation(); deleteField.mutate({ formId, fieldId: field.id }); }}
                                style={{ background: "none", border: "none", padding: "4px", cursor: "pointer", color: "#ef4444" }}
                              >
                                <Trash2 style={{ width: "13px", height: "13px" }} />
                              </button>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>

                  <div 
                    onClick={() => handleAddNewField("short_text")}
                    style={{
                      width: "100%",
                      height: "40px",
                      borderRadius: "6px",
                      border: "1.2px dashed rgba(99, 76, 201, 0.4)",
                      backgroundColor: "rgba(244, 240, 250, 0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                      fontSize: "13px",
                      color: "#634cc9",
                      fontWeight: 600,
                      cursor: "pointer",
                      fontFamily: "'Nunito', sans-serif",
                      flexShrink: 0,
                      boxSizing: "border-box"
                    }}
                  >
                    <span>+ Add new field here</span>
                  </div>

                </div>
              </div>

              <style dangerouslySetInnerHTML={{__html: `
                .custom-scrollbar::-webkit-scrollbar {
                  width: 5px;
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

            {/* 3. RIGHT SIDEBAR: FIELD SETTINGS PROPERTY BAR */}
            <div 
              style={{ 
                width: "100%", 
                height: "100%", 
                display: "flex", 
                flexDirection: "column", 
                gap: "16px", 
                padding: "0 16px 0 10px", 
                overflowY: "auto",
                overflowX: "hidden", 
                boxSizing: "border-box"
              }}
            >
              <h3 style={{ fontFamily: "'Nunito', sans-serif", fontSize: "22px", fontWeight: "800", margin: "0", color: "#1a150e" }}>
                {selectedField ? "Field Settings" : "Form Settings"}
              </h3>
              
              {selectedField ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontFamily: "'Nunito', sans-serif", fontSize: "13px" }}>
                  <div>
                    <label style={{ display: "block", fontWeight: 700, marginBottom: "6px", color: "#2d2416" }}>Field Label</label>
                    <input 
                      type="text" 
                      style={{ width: "100%", height: "36px", padding: "0 12px", border: "1.2px solid #c8b8a0", borderRadius: "6px", background: "white", outline: "none", fontSize: "13px", fontFamily: "'Nunito', sans-serif", boxSizing: "border-box" }}
                      defaultValue={selectedField.label}
                      onBlur={e => updateField.mutate({ formId, fieldId: selectedField.id, data: { label: e.target.value } })}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontWeight: 700, marginBottom: "6px", color: "#2d2416" }}>Placeholder</label>
                    <input 
                      type="text" 
                      style={{ width: "100%", height: "36px", padding: "0 12px", border: "1.2px solid #c8b8a0", borderRadius: "6px", background: "white", outline: "none", fontSize: "13px", fontFamily: "'Nunito', sans-serif", boxSizing: "border-box" }}
                      defaultValue={selectedField.placeholder ?? ""}
                      onBlur={e => updateField.mutate({ formId, fieldId: selectedField.id, data: { placeholder: e.target.value } })}
                    />
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "4px" }}>
                    <span style={{ fontWeight: 700, color: "#2d2416" }}>Required</span>
                    <input 
                      type="checkbox" 
                      style={{ width: "16px", height: "16px", accentColor: "#634cc9", cursor: "pointer" }}
                      checked={selectedField.required}
                      onChange={e => updateField.mutate({ formId, fieldId: selectedField.id, data: { required: e.target.checked } })}
                    />
                  </div>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontFamily: "'Nunito', sans-serif", fontSize: "13px" }}>
                  <div>
                    <label style={{ display: "block", fontWeight: 700, marginBottom: "6px", color: "#2d2416" }}>Title</label>
                    <input 
                      type="text" 
                      style={{ width: "100%", height: "36px", padding: "0 12px", border: "1.2px solid #c8b8a0", borderRadius: "6px", background: "white", outline: "none", fontSize: "13px", fontFamily: "'Nunito', sans-serif", boxSizing: "border-box" }}
                      defaultValue={form?.title}
                      onBlur={e => updateForm.mutate({ id: formId, data: { title: e.target.value } })}
                    />
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}