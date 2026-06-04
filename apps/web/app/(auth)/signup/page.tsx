"use client";
import React from "react";
import type { NextPage } from "next";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { ScribbleButton } from "~/components/scribble/ScribbleButton";
import { ScribbleCustomButton, ScribbleCustomInput } from "~/components/scribble/ScribInput";

// --- Form Input Interfaces ---
interface ISignupInput {
  name: string;
  email: string;
  password: string;
}

const SignupPage: NextPage = () => {
  // Initializing react-hook-form setup handlers
  const { register, handleSubmit, formState: { errors } } = useForm<ISignupInput>();

  const onSubmitHandler = (data: ISignupInput) => {
    console.log("Form Submitted Successfully:", data);
  };

  return (
    <>
      {/* Global style override to inject media breakpoints seamlessly */}
      <style jsx global>{`
        @media (max-width: 900px) {
          .content-deck-workspace {
            flex-direction: column !important;
            padding: 40px 20px !important;
            gap: 40px !important;
          }
          .background-frame-canvas {
            height: 100% !important;
            top: 2vh !important;
            bottom: 2vh !important;
            left: 2vw !important;
            right: 2vw !important;
          }
          .left-side-illustration {
            max-height: 45vh !important;
            width: 100% !important;
            max-width: 400px !important;
          }
          .right-side-notepad {
            margin-bottom: 0px !important;
            width: 100% !important;
          }
        }
      `}</style>

      {/* Main Page Container preventing desktop clipping while allowing mobile scrolling */}
      <div
        style={{
          minHeight: "100vh",
          width: "100vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          background: "#fbf6ee",
          overflowX: "hidden"
        }}
      >
        
        {/* Centered Background Frame Canvas */}
        <div 
          className="background-frame-canvas"
          style={{
            position: "absolute",
            top: "4vh",
            bottom: "4vh",
            left: "4vw",
            right: "4vw",
            zIndex: 0,
          }}
        >
          <Image
            src="/signupBG.png"
            alt="Page Border"
            fill
            priority
            style={{
              objectFit: "fill",
            }}
          />
        </div>

        {/* --- Responsive Content Deck Workspace --- */}
        <div
          className="content-deck-workspace"
          style={{
            display: "flex",
            width: "100%",
            maxWidth: "1150px", 
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
            gap: "clamp(20px, 4vw, 60px)",
            padding: "20px 40px",
          }}
        >
          {/* LEFT SIDE: Character Image Illustration Box */}
          <div 
            className="left-side-illustration"
            style={{ 
              flex: "1 1 450px", 
              display: "flex", 
              justifyContent: "center", 
              position: "relative",
              minWidth: "280px",
            }}
          >
            <div style={{ width: "100%", position: "relative", aspectRatio: "1 / 0.95" }}>
              <Image
                src="/signupSideCardtrans.png"
                alt="Signup Illustration"
                fill
                priority
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>

          {/* RIGHT SIDE: Signup Form Notepad Card Component */}
          <div 
            className="right-side-notepad"
            style={{ 
              flex: "1 1 420px", 
              display: "flex", 
              justifyContent: "center",
              minWidth: "280px",
              maxWidth: "460px",
              width: "100%",
              // marginBottom: "10px",
              marginRight:"70px"
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "550 / 670", 
              }}
            >
              {/* Blank Notepad Backdrop Texture */}
              <Image
                src="/signupcard.png"
                alt="Signup Notepad"
                width={610}
                height={680}
                priority
                style={{ objectFit: "fill", zIndex: 0 }}
              />

              {/* --- Form Fields Content Input Overlay --- */}
              <div
                style={{
                  position: "absolute",
                  inset: 0, 
                  zIndex: 2,
                  display: "flex",
                  flexDirection: "column",
                  paddingTop: "14%", 
                  paddingLeft: "10%",
                  paddingRight: "14%",
                  paddingBottom: "8%",
                  marginBottom:"90px",
                  fontFamily: "'Caveat', cursive"
                }}
              >
                {/* Title */}
                <h1 style={{ fontSize: "clamp(1.6rem, 2.2vw, 2.2rem)", fontWeight: "700", marginBottom: "2px", textAlign: "center" }}>
                  Signup
                </h1>

                {/* Subtitle */}
                <p style={{ fontSize: "clamp(0.85rem, 1.1vw, 1.05rem)", marginBottom: "14px", textAlign: "center", lineHeight: "1.25", color: "#5a4a30" }}>
                  Welcome! Enter your details to join the scribble community.
                </p>

                {/* --- Form Management Native Overlay --- */}
                <form
                  onSubmit={handleSubmit(onSubmitHandler)}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    flex: 1,
                    justifyContent: "space-between"
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px", width: "100%" }}>
                    
                    {/* Name Input field */}
                    <div style={{ width: "100%" }}>
                      <label style={{ fontSize: "1.1rem", marginBottom: "2px", display: "block", fontWeight: 600, fontFamily: "'Caveat', cursive" }}>Your Name</label>
                      <div style={{ width: "100%" }}>
                        <ScribbleCustomInput
                          type="text"
                          placeholder="e.g., Jane Doe"
                          style={{ fontFamily: "'Caveat', cursive", width: "100%" }}
                          {...register("name", { required: "Name field is required" })}
                        />
                      </div>
                      {errors.name && <span style={{ color: "#e05c5c", fontSize: "0.8rem", display: "block" }}>{errors.name.message}</span>}
                    </div>

                    {/* Email Input field */}
                    <div style={{ width: "100%" }}>
                      <label style={{ fontSize: "1.1rem", marginBottom: "2px", display: "block", marginTop: "2px", fontWeight: 600 }}>Email Address</label>
                      <div style={{ width: "100%" }}>
                        <ScribbleCustomInput
                          type="email"
                          placeholder="e.g., jane@scribbleforms.com"
                          style={{ width: "100%" }}
                          {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Please check email format" } })}
                        />
                      </div>
                      {errors.email && <span style={{ color: "#e05c5c", fontSize: "0.8rem", display: "block" }}>{errors.email.message}</span>}
                    </div>

                    {/* Password Input field */}
                    <div style={{ width: "100%" }}>
                      <label style={{ fontSize: "1.1rem", marginBottom: "2px", display: "block", marginTop: "2px", fontWeight: 600 }}>Password</label>
                      <div style={{ width: "100%" }}>
                        <ScribbleCustomInput
                          type="password"
                          placeholder="••••••••••"
                          style={{ width: "100%" }}
                          {...register("password", { required: "Password is required", minLength: { value: 6, message: "Requires 6+ characters" } })}
                        />
                      </div>
                      {errors.password && <span style={{ color: "#e05c5c", fontSize: "0.8rem", display: "block" }}>{errors.password.message}</span>}
                    </div>

                  </div>

                  {/* Submission Row Linkage Container */}
                  <div style={{ marginTop: "10px", width: "100%" }}>
                    
                    <ScribbleCustomButton
                      type="submit"
                      bg="#f8de7e"
                      style={{
                        width: '100%',
                        marginTop: '10px',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Caveat', cursive",
                          fontSize: 'calc(22px * var(--global-scale, 1))',
                          fontWeight: 700,
                          height: "35px",
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                          marginBottom:"12px"
                        }}
                      >
                        Login to Dashboard

                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 20 20"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            d="M4 10h12M12 5l5 5-5 5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </ScribbleCustomButton>

                    {/* Wavy Horizontal Splitter Row Decoration */}
                    <div style={{ display: 'flex', alignItems: 'center', margin: '8px 0', width: '100%' }}>
                      <div style={{ flex: 1, height: '6px', backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100%25\' height=\'6\'%3E%3Cpath d=\'M0 3 Q 10 0, 20 3 T 40 3 T 60 3 T 80 3 T 100 3\' fill=\'none\' stroke=\'%239a8060\' stroke-width=\'1.2\' stroke-linecap=\'round\'/%3E%3C/svg%3E")', backgroundRepeat: 'repeat-x', opacity: 0.3 }}></div>
                      <span style={{ fontFamily: "'Caveat', cursive", fontSize: 'calc(16px * var(--global-scale, 1))', color: '#9a8060', padding: '0 10px' }}>or</span>
                      <div style={{ flex: 1, height: '6px', backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100%25\' height=\'6\'%3E%3Cpath d=\'M0 3 Q 10 0, 20 3 T 40 3 T 60 3 T 80 3 T 100 3\' fill=\'none\' stroke=\'%239a8060\' stroke-width=\'1.2\' stroke-linecap=\'round\'/%3E%3C/svg%3E")', backgroundRepeat: 'repeat-x', opacity: 0.3 }}></div>
                    </div>

                    {/* Continue with Google Integrated Button */}
                    <ScribbleButton 
                      type="button" 
                      style={{
                        width: '100%',
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        fontFamily: "'Caveat', cursive",
                        fontSize: 'calc(20px * var(--global-scale, 1))',
                        fontWeight: 600,
                        color: '#1e1608',
                        background: 'none',
                        border: 'none',
                        padding: '6px 16px',
                        cursor: 'pointer'
                      }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" style={{ position: 'relative', zIndex: 2 }}>
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                      <span style={{ position: 'relative', zIndex: 2 }}>Continue with Google</span>
                    </ScribbleButton>

                    {/* Navigation Alternative Link */}
                    <p style={{ fontSize: "1.05rem", marginTop: "8px", marginBottom: 0, textAlign: "center" }}>
                      Already a community member?{" "}
                      <a href="/login" style={{ textDecoration: "underline", color: "#7c5cbf", fontWeight: "700" }}>
                        Login Here →
                      </a>
                    </p>
                    
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;