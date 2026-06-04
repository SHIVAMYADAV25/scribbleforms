"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
// import { Sidebar } from "~/components/Sidebar";
// import { Topbar } from "~/components/layout/Topbar";
import { useMe } from "~/hooks/api";
import { useUIStore } from "~/store/ui.store";
import { ScribbleToast } from "~/components/scribble/ScribbleUI";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: me, isLoading } = useMe();
  const router = useRouter();
  const { notifications, removeNotification } = useUIStore();

  useEffect(() => {
    if (!isLoading && !me) router.replace("/login");
  }, [me, isLoading, router]);

  if (isLoading) return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", minHeight:"100vh", background:"var(--paper)" }}>
      <div style={{ textAlign:"center" }}>
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" style={{ animation:"spin 1.2s linear infinite", margin:"0 auto 12px" }}>
          <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
          <circle cx="30" cy="30" r="24" stroke="var(--purple)" strokeWidth="3" strokeLinecap="round" strokeDasharray="30 70"/>
        </svg>
        <p style={{ fontFamily:"var(--font-display)", fontSize:18, color:"var(--ink-2)" }}>Loading your workspace...</p>
      </div>
    </div>
  );

  if (!me) return null;

  return (
    <div style={{ display:"flex", minHeight:"100vh", background:"var(--paper)" }}>
      {/* <Sidebar/> */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", minWidth:0, overflow:"hidden" }}>
        {/* <Topbar/> */}
        <main style={{ flex:1, overflowY:"auto" }}>
          {children}
        </main>
      </div>

      {/* Toast notifications */}
      {/* Toast notifications */}
<div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999, display: "flex", flexDirection: "column", gap: 8 }}>
  {notifications?.map(n => (
    <div key={n.id} className="animate-fade-up">
      <ScribbleToast type={n.type} message={n.message} onClose={() => removeNotification(n.id)}/>
    </div>
  ))}
</div>
    </div>
  );
}