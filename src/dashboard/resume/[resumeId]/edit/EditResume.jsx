import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import FormSection from "../../components/FormSection";
import ResumePreview from "../../components/ResumePreview";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import GlobalApi from "../../../../../service/GlobalApi";
import { ArrowLeft, Eye } from "lucide-react";

function EditResume() {
  const { resumeId } = useParams();
  const [resumeInfo, setResumeInfo] = useState();
  const [previewOnly, setPreviewOnly] = useState(false);

  useEffect(() => {
    GetResumeInfo();
  }, []);

  const GetResumeInfo = () => {
    GlobalApi.GetResumeById(resumeId).then((resp) => {
      const data = resp.data.data;
      setResumeInfo({
        ...data,
        themeColor: data.themecolor,
        // load saved template, default to 'classic'
        template: data.template || "classic",
      });
    });
  };

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div
        className="min-h-screen bg-[#faf8f3]"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500&display=swap');
          .font-display { font-family: 'Playfair Display', serif; }

          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(16px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          .fade-up { animation: fadeUp 0.5s ease both; }
          .fade-up-2 { animation: fadeUp 0.5s 0.1s ease both; }

          .edit-top-bar {
            position: fixed; top: 0; left: 0; right: 0; z-index: 50;
            display: flex; align-items: center; justify-content: space-between;
            padding: 0.9rem 2rem;
            background: rgba(250,248,243,0.92);
            backdrop-filter: blur(12px);
            border-bottom: 1px solid rgba(0,0,0,0.07);
          }

          .back-btn {
            display: inline-flex; align-items: center; gap: 0.5rem;
            font-size: 0.85rem; font-weight: 500; color: #3a3a3a;
            border: 1px solid rgba(0,0,0,0.1); border-radius: 100px;
            padding: 0.45rem 1rem; background: transparent;
            text-decoration: none; transition: background 0.2s, color 0.2s, border-color 0.2s;
          }
          .back-btn:hover { background: #0d0d0d; color: #fff; border-color: transparent; }

          .preview-toggle {
            display: inline-flex; align-items: center; gap: 0.5rem;
            font-size: 0.85rem; font-weight: 500;
            border: 1px solid rgba(0,0,0,0.1); border-radius: 100px;
            padding: 0.45rem 1rem; cursor: pointer;
            transition: background 0.2s, color 0.2s;
            background: transparent; color: #3a3a3a;
          }
          .preview-toggle.active,
          .preview-toggle:hover { background: #2a6ef5; color: #fff; border-color: transparent; }

          .edit-panel {
            background: #ffffff; border-right: 1px solid rgba(0,0,0,0.06);
            overflow-y: auto; height: calc(100vh - 57px);
          }
          .preview-panel {
            background: #f2ede3; overflow-y: auto;
            height: calc(100vh - 57px);
            display: flex; flex-direction: column;
          }
          .preview-inner {
            flex: 1; padding: 2rem;
            display: flex; flex-direction: column;
          }

          .edit-panel::-webkit-scrollbar,
          .preview-panel::-webkit-scrollbar { width: 4px; }
          .edit-panel::-webkit-scrollbar-track,
          .preview-panel::-webkit-scrollbar-track { background: transparent; }
          .edit-panel::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 4px; }
          .preview-panel::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.15); border-radius: 4px; }

          @media (max-width: 767px) {
            .panel-form  { display: block; }
            .panel-preview { display: none; }
            .panel-form.hide  { display: none; }
            .panel-preview.show { display: flex; }
          }
        `}</style>

        {/* ── Top bar ── */}
        <div className="edit-top-bar">
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="back-btn">
              <ArrowLeft size={14} /> Dashboard
            </Link>
            <div className="hidden sm:block">
              <span className="font-display text-base font-bold text-[#0d0d0d] tracking-tight">
                {resumeInfo?.Title || "Untitled Resume"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              className={`preview-toggle md:hidden ${previewOnly ? "active" : ""}`}
              onClick={() => setPreviewOnly(!previewOnly)}
            >
              <Eye size={14} />
              {previewOnly ? "Edit" : "Preview"}
            </button>

            {resumeInfo?.themecolor && (
              <div
                className="w-5 h-5 rounded-full border-2 border-white shadow-sm hidden sm:block"
                style={{ background: resumeInfo.themecolor }}
                title="Theme color"
              />
            )}
          </div>
        </div>

        {/* ── Main split layout ── */}
        <div className="pt-[57px] flex h-screen overflow-hidden">
          {/* Form panel */}
          <div
            className={`edit-panel w-full md:w-1/2 fade-up ${previewOnly ? "panel-form hide" : "panel-form"}`}
          >
            <FormSection />
          </div>

          {/* Preview panel */}
          <div
            className={`preview-panel w-full md:w-1/2 fade-up-2 ${previewOnly ? "panel-preview show" : "panel-preview"}`}
          >
            <div className="preview-inner">
              <div className="flex items-center justify-between mb-4">
                <div className="text-[0.7rem] font-bold tracking-[0.16em] uppercase text-gray-400">
                  Live Preview
                </div>
                <Link
                  to={`/my-resume/${resumeId}/view`}
                  className="text-[0.75rem] font-medium text-[#2a6ef5] hover:underline"
                  target="_blank"
                >
                  Open full view →
                </Link>
              </div>

              {/* Resume card — no overflow:hidden so switcher bar is visible */}
              <div className="flex-1 bg-white rounded-2xl overflow-hidden shadow-xl">
                <ResumePreview />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default EditResume;
