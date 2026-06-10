"use client";

// FILE: apps/web/app/(dashboard)/dashboard/forms/[id]/build/page.tsx
//
// WHAT WAS BROKEN:
// 1. Right sidebar label/placeholder used `defaultValue` (uncontrolled) + onBlur
//    — when you click a different field the inputs don't clear/update because
//    React does not re-render an uncontrolled input when defaultValue changes.
//    FIX: use controlled `value` + local state that resets whenever selectedFieldId changes.
//
// 2. `updateField.mutate(...)` was called on every onBlur with whatever was in the input.
//    That works but fires on every focus-loss even if nothing changed.
//    FIX: debounce 600ms for label/placeholder; fire immediately for required toggle.
//
// 3. single_select / multi_select fields showed hardcoded "Option 1, Option 2"
//    everywhere — no way to add/edit options.
//    FIX: Options manager in the right sidebar reads & writes field.config.options.
//
// 4. `deleteField.mutate(field.id)` — wrong. Route expects { formId, fieldId }.
//    FIX: pass correct shape.
//
// 5. Preview button opened `/dashboard/forms/${formId}/preview` — that route doesn't exist.
//    FIX: opens `/f/${slug}` (the real public form URL).
//
// 6. Build page `single_select` + `multi_select` previews showed hardcoded options.
//    FIX: read from field.config.options so they reflect what user actually saved.
//
// 7. No version info shown anywhere.
//    FIX: show version badge in header when form has been published at least once.

import React, { use, useState, useEffect, useRef } from "react";
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
  useUpdateField,
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
  Sparkles,
  Link as LinkIcon,
  Plus,
  X,
  GitCommit,
  Eye,
} from "lucide-react";
import Sidebar from "~/components/Sidebar";
import { ScribbleButton } from "~/components/scribble/ScribbleButton";

const FIELD_TYPES = [
  { type: "short_text",    label: "Short Text" },
  { type: "long_text",     label: "Long Text" },
  { type: "email",         label: "Email" },
  { type: "number",        label: "Number" },
  { type: "single_select", label: "Single Select" },
  { type: "multi_select",  label: "Multi Select" },
  { type: "checkbox",      label: "Checkbox" },
  { type: "rating",        label: "Rating" },
  { type: "date",          label: "Date" },
  { type: "phone",         label: "Phone" },
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
    "Z",
  ].join(" ");
};

// Simple debounce hook — delays firing until user stops typing
function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

interface BuildPageProps {
  params: Promise<{ id: string }>;
}

export default function BuildPage({ params }: BuildPageProps) {
  const { id: formId } = use(params);
  const { data: form, isLoading } = useFormDetail(formId);
  const updateForm    = useUpdateForm(formId);
  const publishForm   = usePublishForm(formId);
  const unpublishForm = useUnpublishForm(formId);
  const addField      = useAddField(formId);
  const deleteField   = useDeleteField(formId);
  const updateField   = useUpdateField(formId);

  const { autosaveStatus } = useUIStore();
  const { selectedFieldId, setSelectedField } = useFormBuilderStore();

  const [titleVal,   setTitleVal]   = useState("");
  const [description, setDescription] = useState("");
  const [scale, setScale] = useState(0.8);

  // ── RIGHT SIDEBAR: controlled local state so inputs clear on field switch ──
  // REASON: defaultValue is uncontrolled; it doesn't re-render when selectedFieldId
  // changes. Using controlled value + resetting via useEffect fixes the "stale label" bug.
  const [sidebarLabel,       setSidebarLabel]       = useState("");
  const [sidebarPlaceholder, setSidebarPlaceholder] = useState("");
  const [sidebarOptions,     setSidebarOptions]     = useState<string[]>([]);
  const [newOption,          setNewOption]          = useState("");

  // Debounce label/placeholder so we don't fire a mutation on every keypress
  const debouncedLabel       = useDebounce(sidebarLabel,       600);
  const debouncedPlaceholder = useDebounce(sidebarPlaceholder, 600);

  // Track last-synced field so debounce effects don't fire on initial population
  const lastSyncedFieldRef       = useRef<string | null>(null);
  const lastSyncedLabelRef       = useRef<string>("");
  const lastSyncedPlaceholderRef = useRef<string>("");

  // Responsive scaling
  useEffect(() => {
    const handleResize = () => {
      const baseWidth = 1525;
      const calc = (window.innerWidth / baseWidth) * 0.8;
      setScale(Math.max(calc, 0.45));
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Sync title/description from server
  useEffect(() => {
    if (form?.title)       setTitleVal(form.title);
    if (form?.description) setDescription(form.description);
  }, [form?.title, form?.description]);

  const fields        = form?.fields ?? [];
  const selectedField = fields.find((f: any) => f.id === selectedFieldId);

  // RESET sidebar inputs whenever user clicks a different field
  useEffect(() => {
    if (selectedField && selectedField.id !== lastSyncedFieldRef.current) {
      lastSyncedFieldRef.current       = selectedField.id;
      lastSyncedLabelRef.current       = selectedField.label ?? "";
      lastSyncedPlaceholderRef.current = selectedField.placeholder ?? "";
      setSidebarLabel(selectedField.label ?? "");
      setSidebarPlaceholder(selectedField.placeholder ?? "");
      const opts = (selectedField.config as any)?.options ?? [];
      setSidebarOptions(Array.isArray(opts) ? opts : []);
      setNewOption("");
    }
  }, [selectedField?.id]);

  // Debounced save — label
  useEffect(() => {
    if (!selectedFieldId || !lastSyncedFieldRef.current) return;
    if (debouncedLabel === lastSyncedLabelRef.current) return; // no change
    lastSyncedLabelRef.current = debouncedLabel;
    updateField.mutate({ formId, fieldId: selectedFieldId, data: { label: debouncedLabel } });
  }, [debouncedLabel]);

  // Debounced save — placeholder
  useEffect(() => {
    if (!selectedFieldId || !lastSyncedFieldRef.current) return;
    if (debouncedPlaceholder === lastSyncedPlaceholderRef.current) return;
    lastSyncedPlaceholderRef.current = debouncedPlaceholder;
    updateField.mutate({ formId, fieldId: selectedFieldId, data: { placeholder: debouncedPlaceholder } });
  }, [debouncedPlaceholder]);

  const handleSaveTitle = () => {
    if (titleVal.trim() && titleVal !== form?.title) {
      updateForm.mutate({ id: formId, data: { title: titleVal.trim() } });
    }
  };

  const handleAddNewField = (type: string) => {
    addField.mutate({
      formId,
      field: {
        type:     type as any,
        label:    `New ${type.replace(/_/g, " ")} field`,
        required: false,
        order:    fields.length,
        // Pre-seed options for select types so the field is usable immediately
        config: (type === "single_select" || type === "multi_select")
          ? { options: ["Option 1", "Option 2"] }
          : undefined,
      },
    });
  };

  // FIXED: was deleteField.mutate(field.id) — route requires { formId, fieldId }
  const handleDeleteField = (fieldId: string) => {
    deleteField.mutate({ formId, fieldId });
    if (selectedFieldId === fieldId) setSelectedField(null);
  };

  const handleRequiredToggle = (checked: boolean) => {
    if (!selectedFieldId) return;
    updateField.mutate({ formId, fieldId: selectedFieldId, data: { required: checked } });
  };

  // Save options array to backend
  const handleSaveOptions = (opts: string[]) => {
    if (!selectedFieldId) return;
    updateField.mutate({ formId, fieldId: selectedFieldId, data: { config: { options: opts } } });
  };

  const handleAddOption = () => {
    const trimmed = newOption.trim();
    if (!trimmed || sidebarOptions.includes(trimmed)) return;
    const next = [...sidebarOptions, trimmed];
    setSidebarOptions(next);
    handleSaveOptions(next);
    setNewOption("");
  };

  const handleRemoveOption = (idx: number) => {
    const next = sidebarOptions.filter((_, i) => i !== idx);
    setSidebarOptions(next);
    handleSaveOptions(next);
  };

  // Build field preview — shows REAL options from config instead of hardcoded ones
  const renderFieldPreview = (field: any, idx: number) => {
    const seed = idx * 17 + 42;
    const W    = 440;
    // Read actual saved options — fallback to placeholders only when empty
    const opts: string[] = (field.config as any)?.options ?? [];

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
            <span style={{ fontSize: "13px", color: "rgba(45,36,22,0.4)", paddingLeft: "12px", position: "relative", zIndex: 10, display: "block", padding: "4px", fontFamily: "'Nunito', sans-serif" }}>
              {field.placeholder || (field.type === "email" ? "you@example.com" : "Type your answer here...")}
            </span>
          </div>
        );

      case "long_text":
        return (
          <div style={{ width: "100%", position: "relative", padding: "6px 0", marginTop: "4px", maxWidth: "440px" }}>
            <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} viewBox={`0 0 ${W} 64`} fill="none" preserveAspectRatio="none">
              <path d={getWobbleRectPath(W, 64, seed + 5)} fill="white" fillOpacity={0.6} stroke="#c8b8a0" strokeWidth="1.1" />
            </svg>
            <span style={{ fontSize: "13px", color: "rgba(45,36,22,0.4)", paddingLeft: "12px", paddingTop: "6px", position: "relative", zIndex: 10, display: "block", minHeight: "48px", fontFamily: "'Nunito', sans-serif" }}>
              {field.placeholder || "Write your thoughts here..."}
            </span>
          </div>
        );

      case "date":
        return (
          <div style={{ width: "100%", position: "relative", padding: "6px 0", maxWidth: "440px" }}>
            <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} viewBox={`0 0 ${W} 36`} fill="none" preserveAspectRatio="none">
              <path d={getWobbleRectPath(W, 36, seed)} fill="white" fillOpacity={0.6} stroke="#c8b8a0" strokeWidth="1.1" />
            </svg>
            <span style={{ fontSize: "13px", color: "rgba(45,36,22,0.4)", paddingLeft: "12px", position: "relative", zIndex: 10, display: "block", padding: "4px", fontFamily: "'Nunito', sans-serif" }}>MM / DD / YYYY</span>
            <Calendar style={{ width: "16px", height: "16px", color: "rgba(45,36,22,0.4)", position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", zIndex: 10 }} />
          </div>
        );

      case "single_select":
        return (
          <div style={{ display: "flex", flexWrap: "wrap", columnGap: "20px", rowGap: "8px", paddingTop: "6px", fontFamily: "'Nunito', sans-serif", fontSize: "13px", fontWeight: "600" }}>
            {(opts.length > 0 ? opts : ["Option 1", "Option 2"]).map((opt, i) => (
              <label key={i} style={{ display: "flex", alignItems: "center", gap: "8px", color: "#2d2416" }}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="6.5" stroke="#9a8060" strokeWidth="1.5" />
                  {i === 0 && <circle cx="8" cy="8" r="3.5" fill="#634cc9" />}
                </svg>
                {opt}
              </label>
            ))}
            {opts.length === 0 && <span style={{ color: "#9a8060", fontSize: "11px", fontStyle: "italic" }}>Add options in sidebar →</span>}
          </div>
        );

      case "multi_select":
      case "checkbox":
        return (
          <div style={{ display: "flex", flexWrap: "wrap", columnGap: "20px", rowGap: "8px", paddingTop: "6px", fontFamily: "'Nunito', sans-serif", fontSize: "13px", fontWeight: "600" }}>
            {(field.type === "checkbox"
              ? ["Check to confirm"]
              : opts.length > 0 ? opts : ["Choice 1", "Choice 2"]
            ).map((choice: string, i: number) => (
              <label key={i} style={{ display: "flex", alignItems: "center", gap: "8px", color: "#2d2416" }}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M2.5 2.5 Q8 1.5 13.5 2.5 Q14.5 8 13.5 13.5 Q8 14.5 2.5 13.5 Q1.5 8 2.5 2.5 Z" stroke="#9a8060" strokeWidth="1.5" fill="none" />
                </svg>
                {choice}
              </label>
            ))}
            {field.type === "multi_select" && opts.length === 0 && (
              <span style={{ color: "#9a8060", fontSize: "11px", fontStyle: "italic" }}>Add options in sidebar →</span>
            )}
          </div>
        );

      case "rating":
        return (
          <div style={{ display: "flex", gap: "6px", paddingTop: "6px" }}>
            {[1,2,3,4,5].map((star) => (
              <svg key={star} width="22" height="22" viewBox="0 0 20 20" fill="none">
                <path d="M10 2l2.4 5H18l-4.4 3.4 1.6 5.6L10 13l-5.2 3 1.6-5.6L2 7h5.6z" stroke="#9a8060" strokeWidth="1.5" />
              </svg>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  // Show whether field has placeholder support
  const hasPlaceholder = selectedField?.type &&
    !["checkbox","rating","date","single_select","multi_select"].includes(selectedField.type);
  // Show options manager for select types
  const hasOptions = selectedField?.type === "single_select" || selectedField?.type === "multi_select";

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

      {/* Background */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <Image src="/builderBG.png" alt="Notebook Framework Background" fill priority className="object-fill" />
      </div>

      {/* Responsive virtual workspace */}
      <div style={{
        position: "absolute", left: 0, top: 0,
        width: "1920px", height: "1080px",
        display: "flex",
        transform: `scale(${scale})`, transformOrigin: "top left",
        boxSizing: "border-box", paddingLeft: "76px", paddingTop: "24px", zIndex: 1,
      }}>
        <Sidebar activeTab="Form" />

        <div style={{ flex: 1, height: "100%", display: "flex", flexDirection: "column", paddingLeft: "10px" }}>

          {/* TOP NAV */}
          <div style={{ width: "100%", height: "90px", display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: "8px", marginBottom: "16px", boxSizing: "border-box" }}>

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Link href="/dashboard" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", color: "#2d2416", fontWeight: "bold", fontSize: "15px", fontFamily: "'Nunito', sans-serif", paddingTop: "35px" }}>
                <svg width="22" height="16" viewBox="0 0 24 16" fill="none" stroke="#2d2416" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M9 1L2 8L9 15" /><path d="M2 8H22" />
                </svg>
                <span>Back to Dashboard</span>
              </Link>
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flex: 1, height: "100%", position: "relative" }}>
              <div style={{ position: "relative", width: "480px", height: "120px", marginTop: "20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Image src="/builder Boy (1).png" alt="Building something awesome!" width={480} height={120} priority style={{ objectFit: "contain", transform: "scale(1.25)" }} />
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "16px", paddingTop: "30px", paddingRight: "46px" }}>

              {/* Autosave status indicator */}
              <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", fontWeight: 600, fontFamily: "'Nunito', sans-serif" }}>
                {autosaveStatus === "saving" && (
                  <><Loader2 style={{ width: "15px", height: "15px", color: "#9a8060" }} className="animate-spin" /><span style={{ color: "#9a8060" }}>Saving...</span></>
                )}
                {autosaveStatus === "saved" && (
                  <><CheckCircle style={{ width: "15px", height: "15px", color: "#22c55e" }} /><span style={{ color: "#22c55e" }}>All changes saved</span></>
                )}
                {autosaveStatus === "error" && (
                  <><AlertCircle style={{ width: "15px", height: "15px", color: "#ef4444" }} /><span style={{ color: "#ef4444" }}>Save failed</span></>
                )}
                {autosaveStatus === "idle" && (
                  <><CheckCircle style={{ width: "15px", height: "15px", color: "#22c55e" }} /><span style={{ color: "rgba(45,36,22,0.6)" }}>All changes saved</span></>
                )}
              </div>

              {/* Version badge — only shown after first publish */}
              {(form as any)?.version && (
                <div style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "12px", fontWeight: 700, color: "#634cc9", fontFamily: "'Nunito', sans-serif", background: "rgba(99,76,201,0.08)", padding: "3px 10px", borderRadius: "99px" }}>
                  <GitCommit style={{ width: "13px", height: "13px" }} />
                  v{(form as any).version}
                </div>
              )}

              {/* FIXED: was /dashboard/forms/${formId}/preview which doesn't exist.
                  Now opens the real public form URL at /f/${slug} */}
              <ScribbleButton onClick={() => {
                const slug = (form as any)?.customSlug ?? (form as any)?.slug ?? "";
                if (slug) window.open(`/f/${slug}`, "_blank");
              }}>
                <Eye style={{ width: "14px", height: "14px" }} /> Preview
              </ScribbleButton>

              {/* Publish / Unpublish */}
              <div style={{ width: "120px", height: "42px", display: "flex" }}>
                <ScribbleButton
                  disabled={publishForm.isPending || unpublishForm.isPending}
                  onClick={() =>
                    form?.status === "published"
                      ? unpublishForm.mutate({ id: formId })
                      : publishForm.mutate({ id: formId })
                  }
                  style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}
                >
                  {publishForm.isPending || unpublishForm.isPending
                    ? "..."
                    : form?.status === "published" ? "⚡ Unpublish" : "⇧ Publish"}
                </ScribbleButton>
              </div>
            </div>
          </div>

          {/* LOWER CONTENT: 3-column grid */}
          <div style={{ flex: 1, display: "grid", gridTemplateColumns: "270px 960px 280px", width: "100%", height: "calc(100% - 130px)", overflow: "hidden" }}>

            {/* ── COL 1: ADD FIELDS PANEL ── */}
            <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", gap: "6px", paddingRight: "12px", overflowY: "auto", overflowX: "hidden", alignItems: "center", boxSizing: "border-box" }}>
              <h3 style={{ fontFamily: "'Caveat', cursive", fontSize: "22px", margin: "0 0 2px 0", color: "#1a150e", width: "100%", paddingLeft: "12px" }}>Add Fields</h3>
              <p style={{ fontSize: "11px", color: "rgba(45,36,22,0.5)", margin: "0 0 12px 0", fontFamily: "'Nunito', sans-serif", width: "100%", paddingLeft: "12px" }}>Click to add to form</p>

              <div style={{ display: "flex", flexDirection: "column", gap: "6px", width: "100%" }}>
                {FIELD_TYPES.map((ft) => {
                  const Icon =
                    ft.type === "short_text" ? Type :
                    ft.type === "long_text"  ? AlignLeft :
                    ft.type === "email"      ? Mail :
                    ft.type === "number"     ? Binary :
                    ft.type === "date"       ? Calendar :
                    ft.type === "rating"     ? Sparkles : LinkIcon;

                  return (
                    <button
                      key={ft.type}
                      disabled={addField.isPending}
                      onClick={() => handleAddNewField(ft.type)}
                      style={{ width: "100%", height: "42px", display: "flex", alignItems: "center", padding: "0 14px", background: "transparent", fontSize: "13px", fontWeight: 600, color: "#2d2416", textAlign: "left", cursor: "pointer", border: "none", position: "relative", outline: "none", gap: "10px", boxSizing: "border-box" }}
                    >
                      <svg viewBox="0 0 176 38" fill="none" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
                        <path d="M4.3703564055176685 1.6306875446680351 Q44.77590335932473 2.234368125858964 87.7289548808476 0.8793961147748632 Q132.84263172607734 1.826822399183584 171.32160742735869 2.300008643651381 Q174.00146472210145 12.005913244260592 175.27713761983614 23.575536357159944 Q173.11011265711204 34.3794556775174 171.66287634876062 34.579691604535924 Q113.48791747456417 38.139812168046774 60.356604982991115 35.879774289107445 Q4.650967657209549 37.29812903411221 1.7210496918796707 34.378610699910496 Q1.3890541362925433 23.92372687110692 2.203594366063953 11.222672864313063 Z" fill="white" stroke="#c8b8a0" strokeWidth="1.3" strokeLinecap="round" />
                      </svg>
                      <Icon style={{ width: "15px", height: "15px", color: "#5a4a30", position: "relative", zIndex: 1, flexShrink: 0 }} />
                      <span style={{ position: "relative", zIndex: 1, fontFamily: "'Nunito', sans-serif" }}>{ft.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── COL 2: CANVAS ── */}
            <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", padding: "0 16px", overflow: "hidden" }}>
              <div style={{ width: "700px", height: "760px", position: "relative", display: "flex", flexDirection: "column", padding: "64px 44px 44px 44px", boxSizing: "border-box", overflow: "hidden" }}>

                <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
                  <Image src="/demoBG (1).png" alt="Form Stage Paper" height={760} width={700} priority style={{ objectFit: "fill" }} />
                </div>

                <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", height: "100%", overflow: "hidden", width: "612px" }}>

                  {/* Title + description */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px", marginBottom: "20px", flexShrink: 0 }}>
                    <input
                      value={titleVal}
                      onChange={e => setTitleVal(e.target.value)}
                      onBlur={handleSaveTitle}
                      placeholder="Form Title"
                      style={{ fontFamily: "'Nunito', sans-serif", fontSize: "26px", fontWeight: "800", color: "#1a150e", border: "none", outline: "none", width: "100%", background: "transparent" }}
                    />
                    <input
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                      onBlur={() => updateForm.mutate({ id: formId, data: { description } })}
                      placeholder="Form Description..."
                      style={{ fontFamily: "'Nunito', sans-serif", fontSize: "13px", color: "rgba(45,36,22,0.6)", outline: "none", width: "100%", border: "none", background: "transparent" }}
                    />
                  </div>

                  {/* Fields */}
                  <div className="custom-scrollbar" style={{ flex: 1, overflowY: "auto", overflowX: "hidden", paddingRight: "8px", display: "flex", flexDirection: "column", gap: "14px", marginBottom: "16px", width: "100%" }}>
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
                            style={{ padding: "12px 14px", borderRadius: "8px", backgroundColor: isSelected ? "rgba(252,224,155,0.25)" : "transparent", border: isSelected ? "1.5px solid #2d2416" : "1.5px solid transparent", position: "relative", cursor: "pointer", flexShrink: 0, width: "100%", boxSizing: "border-box" }}
                          >
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: "8px", fontFamily: "'Nunito', sans-serif" }}>
                                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "18px", height: "18px", borderRadius: "50%", border: "1px solid #c8b8a0", fontSize: "11px", fontWeight: "bold", color: "#634cc9" }}>{idx + 1}</span>
                                <span style={{ fontSize: "13px", fontWeight: "700", color: "#2d2416" }}>
                                  {field.label} {field.required && <span style={{ color: "#ef4444" }}>*</span>}
                                </span>
                              </div>
                              <span style={{ fontSize: "11px", color: "rgba(45,36,22,0.4)", fontWeight: 700, textTransform: "capitalize", fontFamily: "'Nunito', sans-serif" }}>
                                {field.type.replace(/_/g, " ")}
                              </span>
                            </div>

                            <div style={{ width: "100%", paddingRight: "64px", boxSizing: "border-box" }}>
                              {renderFieldPreview(field, idx)}
                            </div>

                            <div style={{ position: "absolute", right: "8px", top: "50%", transform: "translateY(-50%)", display: "flex", alignItems: "center", gap: "4px" }}>
                              <button
                                onClick={e => { e.stopPropagation(); handleAddNewField(field.type); }}
                                style={{ background: "none", border: "none", padding: "4px", cursor: "pointer", color: "rgba(45,36,22,0.4)" }}
                                title="Duplicate field type"
                              >
                                <Copy style={{ width: "13px", height: "13px" }} />
                              </button>
                              {/* FIXED: was deleteField.mutate(field.id) — route requires { formId, fieldId } */}
                              <button
                                onClick={e => { e.stopPropagation(); handleDeleteField(field.id); }}
                                style={{ background: "none", border: "none", padding: "4px", cursor: "pointer", color: "#ef4444" }}
                                title="Delete field"
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
                    style={{ width: "100%", height: "40px", borderRadius: "6px", border: "1.2px dashed rgba(99,76,201,0.4)", backgroundColor: "rgba(244,240,250,0.3)", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", fontSize: "13px", color: "#634cc9", fontWeight: 600, cursor: "pointer", fontFamily: "'Nunito', sans-serif", flexShrink: 0, boxSizing: "border-box" }}
                  >
                    <Plus style={{ width: "14px", height: "14px" }} /> Add new field here
                  </div>

                </div>
              </div>

              <style dangerouslySetInnerHTML={{__html: `
                .custom-scrollbar::-webkit-scrollbar { width: 5px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(45,36,22,0.15); border-radius: 99px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(45,36,22,0.3); }
              `}} />
            </div>

            {/* ── COL 3: RIGHT SIDEBAR — FIELD SETTINGS ── */}
            <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", gap: "14px", padding: "0 16px 0 10px", overflowY: "auto", overflowX: "hidden", boxSizing: "border-box" }}>

              <h3 style={{ fontFamily: "'Nunito', sans-serif", fontSize: "18px", fontWeight: "800", margin: "0", color: "#1a150e" }}>
                {selectedField ? "Field Settings" : "Form Settings"}
              </h3>

              {selectedField ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "14px", fontFamily: "'Nunito', sans-serif", fontSize: "13px" }}>

                  {/* Field type badge */}
                  <div style={{ fontSize: "11px", fontWeight: 700, color: "#634cc9", background: "rgba(99,76,201,0.08)", padding: "3px 10px", borderRadius: "99px", width: "fit-content" }}>
                    {selectedField.type.replace(/_/g, " ")}
                  </div>

                  {/* FIXED: controlled input — clears/updates when switching fields */}
                  <div>
                    <label style={{ display: "block", fontWeight: 700, marginBottom: "6px", color: "#2d2416" }}>Field Label</label>
                    <input
                      type="text"
                      value={sidebarLabel}
                      onChange={e => setSidebarLabel(e.target.value)}
                      style={{ width: "100%", height: "36px", padding: "0 12px", border: "1.2px solid #c8b8a0", borderRadius: "6px", background: "white", outline: "none", fontSize: "13px", fontFamily: "'Nunito', sans-serif", boxSizing: "border-box" }}
                      placeholder="Enter label..."
                    />
                  </div>

                  {/* Placeholder — only for text-type fields */}
                  {hasPlaceholder && (
                    <div>
                      <label style={{ display: "block", fontWeight: 700, marginBottom: "6px", color: "#2d2416" }}>Placeholder</label>
                      <input
                        type="text"
                        value={sidebarPlaceholder}
                        onChange={e => setSidebarPlaceholder(e.target.value)}
                        style={{ width: "100%", height: "36px", padding: "0 12px", border: "1.2px solid #c8b8a0", borderRadius: "6px", background: "white", outline: "none", fontSize: "13px", fontFamily: "'Nunito', sans-serif", boxSizing: "border-box" }}
                        placeholder="Enter placeholder..."
                      />
                    </div>
                  )}

                  {/* OPTIONS MANAGER — single_select and multi_select only */}
                  {hasOptions && (
                    <div>
                      <label style={{ display: "block", fontWeight: 700, marginBottom: "8px", color: "#2d2416" }}>Options</label>

                      <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "8px" }}>
                        {sidebarOptions.map((opt, idx) => (
                          <div key={idx} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                            <input
                              type="text"
                              value={opt}
                              onChange={e => {
                                const next = [...sidebarOptions];
                                next[idx] = e.target.value;
                                setSidebarOptions(next);
                              }}
                              // Save on blur so we don't fire a mutation every keystroke
                              onBlur={() => handleSaveOptions(sidebarOptions)}
                              style={{ flex: 1, height: "32px", padding: "0 10px", border: "1.2px solid #c8b8a0", borderRadius: "6px", background: "white", outline: "none", fontSize: "12px", fontFamily: "'Nunito', sans-serif" }}
                            />
                            <button
                              onClick={() => handleRemoveOption(idx)}
                              style={{ background: "none", border: "none", cursor: "pointer", color: "#ef4444", padding: "2px", display: "flex" }}
                            >
                              <X style={{ width: "13px", height: "13px" }} />
                            </button>
                          </div>
                        ))}
                      </div>

                      {/* Add new option row */}
                      <div style={{ display: "flex", gap: "6px" }}>
                        <input
                          type="text"
                          value={newOption}
                          onChange={e => setNewOption(e.target.value)}
                          onKeyDown={e => e.key === "Enter" && handleAddOption()}
                          placeholder="New option..."
                          style={{ flex: 1, height: "32px", padding: "0 10px", border: "1.2px dashed #c8b8a0", borderRadius: "6px", background: "rgba(244,240,250,0.4)", outline: "none", fontSize: "12px", fontFamily: "'Nunito', sans-serif" }}
                        />
                        <button
                          onClick={handleAddOption}
                          style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#634cc9", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "white", flexShrink: 0 }}
                        >
                          <Plus style={{ width: "14px", height: "14px" }} />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Required toggle */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "4px" }}>
                    <span style={{ fontWeight: 700, color: "#2d2416" }}>Required</span>
                    <input
                      type="checkbox"
                      style={{ width: "16px", height: "16px", accentColor: "#634cc9", cursor: "pointer" }}
                      checked={selectedField.required}
                      onChange={e => handleRequiredToggle(e.target.checked)}
                    />
                  </div>

                </div>
              ) : (
                // No field selected — show form-level settings
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
                  <p style={{ fontSize: "12px", color: "rgba(45,36,22,0.5)", margin: 0 }}>Click any field to configure it.</p>
                </div>
              )}

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}