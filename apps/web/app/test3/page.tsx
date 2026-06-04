"use client";

import React, { use, useState, useEffect } from "react";
import Image from "next/image";
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
  Loader2, 
  AlertCircle,
  Copy, 
  Trash2, 
  Type, 
  AlignLeft, 
  Mail, 
  Binary, 
  Calendar, 
  ChevronDown, 
  Sparkles,
  Heart,
  Link,
  Layers,
  Palette,
  Settings,
  GitBranch,
} from "lucide-react";

// --- Configuration Constants ---
const FIELD_TYPES = [
  { type: "short_text",    label: "Short Text",     icon: Type },
  { type: "long_text",     label: "Long Text",      icon: AlignLeft },
  { type: "email",         label: "Email",          icon: Mail },
  { type: "number",        label: "Number",         icon: Binary },
  { type: "single_select", label: "Single Select",  icon: Layers },
  { type: "multi_select",  label: "Multi Select",   icon: Layers },
  { type: "checkbox",      label: "Checkbox",       icon: CheckCircle },
  { type: "rating",        label: "Rating",         icon: Sparkles },
  { type: "date",          label: "Date",           icon: Calendar },
  { type: "phone",         label: "Phone",          icon: Link },
];

// Custom Hand-Drawn Wobbly Path Generators
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

  useEffect(() => {
    if (form?.title) setTitleVal(form.title);
  }, [form?.title]);

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

  // Helper renderer to generate different wobbly interactive component templates per field type
  const renderFieldPreviewContent = (field: any, index: number) => {
    const seed = index * 17 + 42;
    const W = 540;

    switch (field.type) {
      case "short_text":
      case "email":
      case "number":
      case "phone":
        return (
          <div className="w-full relative py-2">
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox={`0 0 ${W} 36`} fill="none" preserveAspectRatio="none">
              <path d={getWobbleRectPath(W, 36, seed)} fill="white" fillOpacity={0.6} stroke="#c8b8a0" strokeWidth="1.1" />
            </svg>
            <span className="text-xs text-[#9a8060]/70 pl-3 relative z-10 block py-0.5" style={{ fontFamily: "'Caveat', cursive", fontSize: "16px" }}>
              {field.type === "email" ? "e.g., jane@scribbleforms.com" : field.type === "phone" ? "e.g., +1 (555) 000-0000" : "Type your answer here..."}
            </span>
            {field.type === "email" && <Mail className="w-4 h-4 text-[#9a8060]/60 absolute right-3 top-1/2 -translate-y-1/2 z-10" />}
            {field.type === "phone" && <Link className="w-4 h-4 text-[#9a8060]/60 absolute right-3 top-1/2 -translate-y-1/2 z-10" />}
          </div>
        );

      case "long_text":
        return (
          <div className="w-full relative py-2 mt-1">
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox={`0 0 ${W} 72`} fill="none" preserveAspectRatio="none">
              <path d={getWobbleRectPath(W, 72, seed + 5)} fill="white" fillOpacity={0.6} stroke="#c8b8a0" strokeWidth="1.1" />
            </svg>
            <span className="text-xs text-[#9a8060]/70 pl-3 pt-1.5 relative z-10 block min-h-[56px]" style={{ fontFamily: "'Caveat', cursive", fontSize: "16px" }}>
              Write your thoughts here...
            </span>
          </div>
        );

      case "date":
        return (
          <div className="w-full relative py-2">
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox={`0 0 ${W} 36`} fill="none" preserveAspectRatio="none">
              <path d={getWobbleRectPath(W, 36, seed)} fill="white" fillOpacity={0.6} stroke="#c8b8a0" strokeWidth="1.1" />
            </svg>
            <span className="text-xs text-[#9a8060]/70 pl-3 relative z-10 block py-0.5" style={{ fontFamily: "'Caveat', cursive", fontSize: "16px" }}>
              MM / DD / YYYY
            </span>
            <Calendar className="w-4 h-4 text-[#9a8060]/60 absolute right-3 top-1/2 -translate-y-1/2 z-10" />
          </div>
        );

      case "single_select":
        return (
          <div className="flex flex-wrap gap-x-5 gap-y-2 pt-2" style={{ fontFamily: "'Caveat', cursive", fontSize: "17px" }}>
            {["Option 1", "Option 2"].map((opt, i) => (
              <label key={i} className="flex items-center gap-1.5 text-[#5a4a30] cursor-pointer">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="6.5" stroke="#9a8060" strokeWidth="1.3" />
                  {i === 0 && <circle cx="8" cy="8" r="3.5" fill="#7c5cbf" />}
                </svg>
                <span>{opt}</span>
              </label>
            ))}
          </div>
        );

      case "checkbox":
      case "multi_select":
        return (
          <div className="flex flex-wrap gap-x-5 gap-y-2 pt-2" style={{ fontFamily: "'Caveat', cursive", fontSize: "17px" }}>
            {["Choice 1", "Choice 2", "Choice 3"].map((choice, i) => (
              <label key={i} className="flex items-center gap-1.5 text-[#5a4a30] cursor-pointer">
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                  <path d="M2.5 2.5 Q8 1.5 13.5 2.5 Q14.5 8 13.5 13.5 Q8 14.5 2.5 13.5 Q1.5 8 2.5 2.5 Z" stroke="#9a8060" strokeWidth="1.3" fill="none" />
                </svg>
                <span>{choice}</span>
              </label>
            ))}
          </div>
        );

      case "rating":
        return (
          <div className="flex gap-1.5 pt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg key={star} width="22" height="22" viewBox="0 0 20 20" fill={star <= 3 ? "#f5b800" : "none"}>
                <path 
                  d="M10 2l2.4 5H18l-4.4 3.4 1.6 5.6L10 13l-5.2 3 1.6-5.6L2 7h5.6z" 
                  stroke={star <= 3 ? "#d48a00" : "#9a8060"} 
                  strokeWidth="1.2" 
                />
              </svg>
            ))}
          </div>
        );

      default:
        return (
          <div className="w-full relative py-2">
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox={`0 0 ${W} 36`} fill="none" preserveAspectRatio="none">
              <path d={getWobbleRectPath(W, 36, seed)} fill="white" fillOpacity={0.6} stroke="#c8b8a0" strokeWidth="1.1" />
            </svg>
            <span className="text-xs text-[#9a8060]/70 pl-3 relative z-10 block py-0.5" style={{ fontFamily: "'Caveat', cursive", fontSize: "16px" }}>
              Answer preview...
            </span>
          </div>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="p-8 space-y-4 bg-[#fdf6ed] min-h-screen">
        <Skeleton className="h-10 w-64 bg-[#f5e8cc]" />
        <div className="grid grid-cols-4 gap-4">
          <Skeleton className="h-[80vh] bg-[#f5e8cc]" />
          <Skeleton className="h-[80vh] col-span-2 bg-[#f5e8cc]" />
          <Skeleton className="h-[80vh] bg-[#f5e8cc]" />
        </div>
      </div>
    );
  }

  if (!form) return <div className="p-8 text-center font-bold text-[#2d2416]">Form profile data could not be parsed.</div>;

  return (
    <div className="min-h-screen bg-[#fdf6ed] text-[#2d2416] flex flex-col relative select-none" style={{ fontFamily: "'Nunito', sans-serif" }}>
      
      {/* ── Outer Notebook Graphics Framework Layer ── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Image 
          src="/builderBG.png" 
          alt="Notebook Framework Background" 
          fill 
          priority 
          className="object-fill"
        />
      </div>

      {/* ── HEADER NAVIGATION TOPBAR LAYER ── */}
      <header className="h-[52px] flex items-center justify-between px-12 z-10 relative mt-2 shrink-0">
        <div className="flex items-center">
          <button className="flex items-center gap-1 font-medium text-sm text-[#5a4a30] hover:opacity-80 transition-opacity" style={{ fontFamily: "'Caveat', cursive", fontSize: "17px" }}>
            <span>←</span> Back to Dashboard
          </button>
        </div>

        {/* Mascot Center Segment Overlay */}
        <div className="absolute left-[38%] bottom-[-5px] flex items-end pointer-events-auto">
          <div className="relative w-[180px] h-[75px]">
            <Image 
              src="/builder Boy.jpg" 
              alt="Mascot Character" 
              fill 
              className="object-contain bottom-0"
            />
          </div>
        </div>

        <div className="flex items-center gap-5 ml-auto">
          {/* Real-time Cloud Save Processing Status Display Indicator */}
          <div className="flex items-center gap-2" style={{ fontFamily: "'Caveat', cursive", fontSize: "16px" }}>
            {autosaveStatus === "saving" && (
              <span className="flex items-center gap-1.5 text-[#9a8060]">
                <Loader2 className="h-3.5 w-3.5 animate-spin text-[#9a8060]" /> Saving changes...
              </span>
            )}
            {autosaveStatus === "saved" && (
              <span className="flex items-center gap-1.5 text-[#2d8a3e] font-bold">
                <CheckCircle className="h-3.5 w-3.5 text-[#2d8a3e]" /> All changes saved
              </span>
            )}
            {autosaveStatus === "error" && (
              <span className="flex items-center gap-1.5 text-[#e05c5c] font-bold">
                <AlertCircle className="h-3.5 w-3.5 text-[#e05c5c]" /> Save sync failed
              </span>
            )}
          </div>

          {/* Action Button: Preview */}
          <button className="relative px-5 py-1 font-bold transition-transform active:scale-95 text-[#2d2416]" style={{ fontFamily: "'Caveat', cursive", fontSize: "16px" }}>
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 36" fill="none" preserveAspectRatio="none">
              <path d="M4 4 Q8 1.5 24 2 Q49 3 74 2 Q88 1.5 93 3.5 Q98 5.5 97 9 Q98 18 97 27 Q96 32.5 91 33 Q76 35 49 34 Q22 33.5 7 34.5 Q2 35 1.5 31 Z" fill="#fefcf8" stroke="#5a4a30" strokeWidth="1.5"/>
            </svg>
            <span className="relative z-10 flex items-center gap-1">👁 Preview</span>
          </button>

          {/* Action Button: Publish */}
          <button 
            onClick={() => form!.published ? unpublishForm.mutate() : publishForm.mutate()}
            className="relative px-5 py-1 font-bold transition-transform active:scale-95 text-[#2d2416]" 
            style={{ fontFamily: "'Caveat', cursive", fontSize: "16px" }}
          >
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 36" fill="none" preserveAspectRatio="none">
              <path d="M4 4 Q8 1.5 24 2 Q49 3 74 2 Q88 1.5 93 3.5 Q98 5.5 97 9 Q98 18 97 27 Q96 32.5 91 33 Q76 35 49 34 Q22 33.5 7 34.5 Q2 35 1.5 31 Z" fill={form.published ? "#f9c8c8" : "#e0d4f7"} stroke="#2d2416" strokeWidth="1.6"/>
            </svg>
            <div className="absolute top-[-5px] right-[10px] w-6 h-2.5 bg-[#fdd9a0] opacity-80 rotate-3 rounded-sm"></div>
            <span className="relative z-10">
              {form!.published ? "⚡️ Unpublish" : "🚀 Publish"}
            </span>
          </button>
        </div>
      </header>

      {/* ── PRIMARY WORKSPACE COMPONENT GRID CONTAINER ── */}
      <div className="flex flex-1 px-14 py-4 z-10 relative overflow-hidden h-[calc(100vh-115px)]">
        
        {/* PANEL ROW 1: LEFT SIDEBAR NAVIGATION NAVIGATION LINK SEGMENTS */}
        <aside className="w-[185px] shrink-0 flex flex-col pt-4 pr-3">
          <div className="font-bold text-xl tracking-tight flex items-center gap-1.5 px-2" style={{ fontFamily: "'Caveat', cursive", fontSize: "21px" }}>
            <span className="text-[#7c5cbf]">★</span> ScribbleForms
          </div>
          
          <div className="w-[100px] h-[2.5px] bg-[#7c5cbf] opacity-40 ml-2 mt-1 mb-5 rounded-full" />

          <span className="text-[10px] font-bold tracking-widest text-[#9a8060] uppercase px-2 mb-2">Build</span>
          <nav className="space-y-1" style={{ fontFamily: "'Caveat', cursive", fontSize: "18px" }}>
            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg font-bold bg-[#fbe98c] border-l-4 border-[#2d2416] cursor-pointer">
              <Layers className="w-4 h-4 text-[#2d2416]" /> Fields
            </div>
            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-[#5a4a30] opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
              <Palette className="w-4 h-4" /> Design
            </div>
            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-[#5a4a30] opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
              <Settings className="w-4 h-4" /> Settings
            </div>
            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-[#5a4a30] opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
              <GitBranch className="w-4 h-4" /> Logic
            </div>
          </nav>

          {/* Sticky Notepad Segment Element Box (Need Help Component Widget) */}
          <div className="mt-auto mb-4 bg-[#e0d4f7] p-3 rounded-xl shadow-sm border border-[#2d2416]/10 relative rotate-[-1deg] text-center max-w-[145px] self-center">
            <div className="absolute top-[-6px] right-6 w-5 h-3 bg-[#c9b8ee] rotate-6 opacity-80" />
            <h4 className="font-bold text-sm mb-1 flex items-center justify-center gap-1" style={{ fontFamily: "'Caveat', cursive", fontSize: "15px" }}>
              Need help? <Heart className="w-3 h-3 fill-[#e05c5c] stroke-none" />
            </h4>
            <p className="text-xs text-[#5a4a30] mb-2" style={{ fontFamily: "'Caveat', cursive", fontSize: "13px" }}>We are here for you!</p>
            <button className="w-full bg-[#fefcf8] border border-[#2d2416] py-1 text-xs rounded-lg font-bold flex items-center justify-center gap-1 hover:bg-neutral-50" style={{ fontFamily: "'Caveat', cursive", fontSize: "13px" }}>
              Chat with us 😊
            </button>
          </div>
        </aside>

        {/* PANEL ROW 2: AVAILABLE TOOL INTERACTIVE DRAG FIELD ELEMENT PICKER */}
        <section className="w-[210px] shrink-0 border-r border-[#2d2416]/5 pt-4 px-3 overflow-y-auto">
          <h3 className="font-bold text-xl text-[#2d2416] px-1" style={{ fontFamily: "'Caveat', cursive", fontSize: "22px" }}>Add Fields</h3>
          <p className="text-xs text-[#9a8060] mb-4 px-1 flex items-center gap-1" style={{ fontFamily: "'Caveat', cursive", fontSize: "14px" }}>
            Drag and drop to add <span>↪</span>
          </p>

          <div className="space-y-2 pr-1">
            {FIELD_TYPES.map((ft, idx) => {
              const IconComponent = ft.icon;
              return (
                <button
                  key={ft.type}
                  onClick={() => handleAddNewField(ft.type)}
                  className="w-full relative flex items-center gap-3 px-3 py-2 text-left font-medium text-sm transition-transform active:scale-98 group"
                  style={{ fontFamily: "'Caveat', cursive", fontSize: "17px" }}
                >
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 176 38" fill="none" preserveAspectRatio="none">
                    <path d={getWobbleRectPath(176, 38, idx * 11 + 5)} fill="#fefcf8" stroke="#c8b8a0" strokeWidth="1.3" />
                  </svg>
                  <IconComponent className="w-4 h-4 text-[#5a4a30] relative z-10 group-hover:text-[#7c5cbf] transition-colors" />
                  <span className="relative z-10 text-[#2d2416]">{ft.label}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* PANEL ROW 3: CENTRAL FORM PREVIEW CANVAS WORKSPACE INTERFACE */}
        <main className="flex-1 overflow-y-auto px-8 pt-4 pb-8 flex flex-col items-center">
          <div className="w-full max-w-[690px] relative p-10 min-h-[580px] flex flex-col">
            
            {/* Absolute Sheet Texture Graphics Element Overlay Mapping */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <Image 
                src="/builderCard.png" 
                alt="Form Paper Canvas Sheet Background" 
                fill 
                className="object-fill"
              />
            </div>

            {/* Content Display Space */}
            <div className="relative z-10 flex flex-col flex-1">
              
              {/* Dynamic Workspace Interactive Form Header Segment */}
              <div className="mb-5">
                <input 
                  type="text"
                  value={titleVal}
                  onChange={(e) => setTitleVal(e.target.value)}
                  onBlur={handleSaveTitle}
                  placeholder="Untitled Form Paper Layout..."
                  className="w-full bg-transparent border-none outline-none font-bold text-3xl text-[#2d2416] tracking-tight placeholder:text-neutral-300"
                  style={{ fontFamily: "'Caveat', cursive", fontSize: "36px" }}
                />
                <div className="flex items-center gap-2 text-sm text-[#5a4a30]/70 mt-1" style={{ fontFamily: "'Caveat', cursive", fontSize: "16px" }}>
                  <span>Tell us about yourself! Let's make this event unforgettable.</span>
                  <span className="text-[#7c5cbf]">✦</span>
                </div>
              </div>

              <div className="w-full h-[2px] border-b border-dashed border-[#9a8060]/30 mb-6" />

              {/* Dynamic Field Row Entry Lists Mapping Context */}
              <div className="space-y-5 flex-1">
                {fields.length === 0 ? (
                  <div className="text-center py-16 text-[#9a8060] italic" style={{ fontFamily: "'Caveat', cursive", fontSize: "18px" }}>
                    Workspace is currently empty. Click structural fields layout on left to build form structure.
                  </div>
                ) : (
                  fields.map((field: any, index: number) => {
                    const isSelected = field.id === selectedFieldId;
                    return (
                      <div
                        key={field.id}
                        onClick={() => setSelectedField(field.id)}
                        className={`group relative p-5 rounded-xl cursor-pointer transition-all ${
                          isSelected ? "bg-white/40" : "hover:bg-neutral-50/20"
                        }`}
                      >
                        {/* Wobbly Field Border Path Integration Overlay */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 620 110" fill="none" preserveAspectRatio="none">
                          <path 
                            d={getWobbleRectPath(620, 110, index * 23 + 4)} 
                            fill="none" 
                            stroke={isSelected ? "#5a4a30" : "#d0c4b0"} 
                            strokeWidth={isSelected ? 1.8 : 1.3} 
                          />
                        </svg>

                        {/* Order Index Floating Layout Badge Label */}
                        <div className="absolute top-3.5 left-[-10px] w-6 h-6 rounded-full border border-dashed border-[#9a8060] bg-[#fcfaf6] flex items-center justify-center z-10">
                          <span className="text-xs font-bold text-[#9a8060]" style={{ fontFamily: "'Caveat', cursive" }}>{index + 1}</span>
                        </div>

                        {/* Field Descriptor Inner Content Elements */}
                        <div className="relative z-10">
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="font-bold text-base text-[#2d2416]" style={{ fontFamily: "'Caveat', cursive", fontSize: "18px" }}>
                              {field.label} {field.required && <span className="text-[#e05c5c]">*</span>}
                            </span>
                            
                            <div className="flex items-center gap-3">
                              <span className="text-xs text-[#9a8060] italic" style={{ fontFamily: "'Caveat', cursive", fontSize: "13px" }}>
                                {field.type.replace(/_/g, " ")}
                              </span>
                              
                              {/* Field Interactive Modification Trigger Handlers */}
                              <div className={`flex items-center gap-1 transition-opacity ${isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleAddNewField(field.type);
                                  }}
                                  className="p-1 hover:bg-neutral-200/50 rounded transition-colors text-[#5a4a30]"
                                >
                                  <Copy className="w-3.5 h-3.5" />
                                </button>
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteField.mutate(field.id);
                                  }}
                                  className="p-1 hover:bg-red-50 rounded transition-colors text-[#e05c5c]"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Render exact custom hand drawn element template types depending on api model data schema state */}
                          {renderFieldPreviewContent(field, index)}
                        </div>

                      </div>
                    );
                  })
                )}
              </div>

              {/* Bottom Sticky Dynamic Core "Add New Field Component" Control Trigger Box Area */}
              <div 
                onClick={() => handleAddNewField("short_text")}
                className="mt-8 relative py-3 border border-dashed border-[#7c5cbf]/40 bg-[#7c5cbf]/5 rounded-xl flex items-center justify-center gap-2 cursor-pointer hover:bg-[#7c5cbf]/10 transition-colors group"
                style={{ fontFamily: "'Caveat', cursive", fontSize: "17px" }}
              >
                <span className="text-[#7c5cbf] font-bold group-hover:scale-105 transition-transform">+ Add new field here</span>
              </div>

            </div>
          </div>
        </main>

        {/* PANEL ROW 4: RIGHT PANEL CONTEXT CONFIGURATION FIELD INTERACTION PARAMETERS */}
        <aside className="w-[250px] shrink-0 border-l border-[#2d2416]/5 pt-4 pl-4 overflow-y-auto flex flex-col">
          <h3 className="font-bold text-xl text-[#2d2416] mb-4" style={{ fontFamily: "'Caveat', cursive", fontSize: "22px" }}>Field Settings</h3>

          {selectedField ? (
            <div className="space-y-4 flex-1 flex flex-col">
              
              {/* Parameter Block 1: Identification Summary Profile Component Box */}
              <div>
                <span className="text-[10px] font-bold tracking-widest text-[#9a8060] uppercase block mb-2">Selected Field</span>
                <div className="bg-[#fefcf8] border border-[#c8b8a0] p-3 rounded-xl relative overflow-hidden flex items-center gap-2.5">
                  <Type className="w-4 h-4 text-[#7c5cbf]" />
                  <div>
                    <div className="text-sm font-bold text-[#2d2416] line-clamp-1" style={{ fontFamily: "'Caveat', cursive", fontSize: "15px" }}>{selectedField.label}</div>
                    <span className="text-[11px] font-medium text-[#7c5cbf] block" style={{ fontFamily: "'Caveat', cursive" }}>{selectedField.type.replace(/_/g, " ")}</span>
                  </div>
                </div>
              </div>

              {/* Parameter Block 2: Interactive Label Edit Value Text Entry Input */}
              <div>
                <span className="text-[10px] font-bold tracking-widest text-[#9a8060] uppercase block mb-1.5">Field Label</span>
                <div className="relative py-1">
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 220 36" fill="none" preserveAspectRatio="none">
                    <path d={getWobbleRectPath(220, 36, 88)} fill="#fefcf8" stroke="#9a8060" strokeWidth="1.2" />
                  </svg>
                  <input 
                    type="text"
                    value={selectedField.label}
                    onChange={(e) => updateField.mutate({ id: selectedField.id, data: { label: e.target.value } })}
                    className="w-full bg-transparent border-none outline-none text-sm text-[#2d2416] px-3 py-1 relative z-10"
                    style={{ fontFamily: "'Caveat', cursive", fontSize: "15px" }}
                  />
                </div>
              </div>

              {/* Parameter Block 3: Verification Layout Settings Flags */}
              <div className="space-y-2 pt-2" style={{ fontFamily: "'Caveat', cursive", fontSize: "16px" }}>
                <label className="flex items-center gap-2 cursor-pointer group text-[#2d2416]">
                  <input 
                    type="checkbox"
                    checked={selectedField.required || false}
                    onChange={(e) => updateField.mutate({ id: selectedField.id, data: { required: e.target.checked } })}
                    className="rounded border-[#9a8060] text-[#7c5cbf] focus:ring-0 w-4 h-4"
                  />
                  <span className="group-hover:text-[#7c5cbf] transition-colors">Required Field</span>
                </label>
              </div>

              {/* Decorative Guide Tooltip Note Box Element component layout context segment */}
              <div className="mt-auto bg-[#fbe98c] p-3.5 rounded-xl shadow-xs border border-[#2d2416]/5 relative rotate-[0.5deg] max-w-[220px] self-center mb-2">
                <div className="absolute top-[-5px] left-4 w-8 h-2.5 bg-[#ddd09a] rotate-[-2deg] opacity-80" />
                <h5 className="font-bold text-xs mb-1 flex items-center gap-1" style={{ fontFamily: "'Caveat', cursive", fontSize: "14px" }}>
                  💡 Developer Pro-Tip
                </h5>
                <p className="text-xs text-[#5a4a30] leading-relaxed" style={{ fontFamily: "'Caveat', cursive", fontSize: "13px" }}>
                  Hover directly over any active live field configuration rows inside canvas module container to copy or delete elements quickly!
                </p>
              </div>

            </div>
          ) : (
            <div className="text-center py-12 text-[#9a8060] italic border border-dashed border-[#c8b8a0]/40 rounded-xl" style={{ fontFamily: "'Caveat', cursive", fontSize: "16px" }}>
              Select a field structure component layout row on viewport canvas block to configure dynamic parameters.
            </div>
          )}
        </aside>

      </div>

      {/* ── FOOTER ACTIONS BOTTOMBAR CANVAS STRIP ── */}
      <footer className="h-[42px] border-t border-[#2d2416]/5 flex items-center justify-between px-12 z-10 relative bg-transparent shrink-0 mb-1">
        <div className="text-xs text-[#9a8060] flex items-center gap-1.5" style={{ fontFamily: "'Caveat', cursive", fontSize: "14px" }}>
          <span>Form ID:</span> 
          <span className="font-mono bg-stone-200/40 text-[#5a4a30] px-1.5 py-0.5 rounded text-[11px] font-bold">{formId}</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-xs text-[#9a8060] italic flex items-center gap-1" style={{ fontFamily: "'Caveat', cursive", fontSize: "14px" }}>
            Last edited recently by you <Heart className="w-3 h-3 fill-[#e05c5c] stroke-none" />
          </span>

          <button className="relative px-4 py-1 text-xs font-bold transition-transform active:scale-95 text-[#2d2416]" style={{ fontFamily: "'Caveat', cursive", fontSize: "13px" }}>
            <svg className="absolute inset-0 w-full h-full fill-none" viewBox="0 0 140 30" preserveAspectRatio="none">
              <path d="M4 4 Q8 1.5 30 2 Q74 3 118 2 Q136 1.5 142 3.5 Q148 5.5 147 9 Q148 18 146 26 Q144 31 138 31.5 Q118 33.5 94 33 Q60 32.5 26 33 Q8 33.5 4 31 Z" fill="#fefcf8" stroke="#5a4a30" strokeWidth="1.2"/>
            </svg>
            <span className="relative z-10">💾 Save as Template</span>
          </button>
        </div>
      </footer>

    </div>
  );
}

// https://gregarious-gray-075.notion.site/Expo-Sensors-and-Device-Motions-Accelerometer-Gyroscope-LightSensor-36fc3158e38d808896b3dd119a363526?pvs=74
