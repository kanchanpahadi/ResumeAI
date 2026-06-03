import { useEffect, useState } from "react";
import AddResume from "./components/AddResume";
import { useUser } from "@clerk/clerk-react";
import GlobalApi from "./../../service/GlobalApi";
import ResumeCardItem from "./components/ResumeCardItem";
import { FileText } from "lucide-react";
import Header from "@/components/custom/Header";
import { useLocation } from "react-router-dom";

function Dashboard() {
  const { user } = useUser();
  const [resumeList, setResumeList] = useState([]);
  const location = useLocation();
  const [openAddResume, setOpenAddResume] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (location.state?.openAddResume) {
      setOpenAddResume(true);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  useEffect(() => {
    user && GetResumesList();
  }, [user]);

  const GetResumesList = () => {
    GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress)
      .then((resp) => {
        setResumeList(resp?.data?.data || []);
        setLoaded(true);
      })
      .catch(() => {
        setResumeList([]);
        setLoaded(true);
      });
  };

  const firstName = user?.firstName || "there";

  // Pick a greeting based on the hour — feels more human
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Morning" :
    hour < 17 ? "Afternoon" :
    "Evening";

  return (
    <div
      className="min-h-screen"
      style={{ fontFamily: "'DM Sans', sans-serif", background: "#080810" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0%   { background-position: -800px 0; }
          100% { background-position: 800px 0; }
        }

        .dash-fade-1 { animation: fadeUp 0.5s 0.04s ease both; }
        .dash-fade-2 { animation: fadeUp 0.5s 0.14s ease both; }
        .dash-fade-3 { animation: fadeUp 0.5s 0.26s ease both; }

        .shimmer-card {
          background: linear-gradient(90deg,
            rgba(255,255,255,0.03) 25%,
            rgba(255,255,255,0.065) 50%,
            rgba(255,255,255,0.03) 75%
          );
          background-size: 800px 100%;
          animation: shimmer 1.8s infinite linear;
        }

        .resume-card-wrap {
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .resume-card-wrap:hover {
          transform: translateY(-4px);
          box-shadow: 0 18px 44px rgba(0,0,0,0.38);
        }

        .grid-lines {
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        .glow-tr {
          position: fixed; top: -120px; right: -100px;
          width: 480px; height: 480px; border-radius: 50%;
          background: rgba(99,102,241,0.1);
          filter: blur(90px); pointer-events: none; z-index: 0;
        }
        .glow-bl {
          position: fixed; bottom: -80px; left: -80px;
          width: 380px; height: 380px; border-radius: 50%;
          background: rgba(236,72,153,0.07);
          filter: blur(90px); pointer-events: none; z-index: 0;
        }

        .divider-line {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent);
        }
      `}</style>

      <div className="grid-lines" />
      <div className="glow-tr" />
      <div className="glow-bl" />

      <Header />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ paddingTop: 108, paddingBottom: 80, paddingLeft: 24, paddingRight: 24, maxWidth: 1200, margin: '0 auto' }}>

          {/* Header row */}
          <div className="dash-fade-1" style={{ marginBottom: 36 }}>
            <p style={{
              fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: '#6366f1', marginBottom: 10
            }}>
              Dashboard
            </p>
            <h1 style={{
              fontFamily: 'Instrument Serif, serif',
              fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
              lineHeight: 1.06, letterSpacing: '-0.02em',
              background: 'linear-gradient(135deg, #fff 0%, #a8c8ff 55%, #c4b5fd 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              marginBottom: 8
            }}>
              {greeting}, {firstName}.
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.9rem', fontWeight: 300 }}>
              {resumeList.length === 0
                ? "You don't have any resumes yet."
                : resumeList.length === 1
                  ? "You have 1 resume."
                  : `You have ${resumeList.length} resumes.`}
            </p>
          </div>

          <div className="dash-fade-2 divider-line" style={{ marginBottom: 36 }} />

          {/* Grid */}
          <div
            className="dash-fade-3"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(195px, 1fr))',
              gap: 18
            }}
          >
            <AddResume
              open={openAddResume}
              setOpen={setOpenAddResume}
              refreshData={GetResumesList}
            />

            {loaded
              ? resumeList.map((resume, index) => (
                  <div key={index} className="resume-card-wrap" style={{ borderRadius: 16, overflow: 'hidden' }}>
                    <ResumeCardItem resume={resume} refreshData={GetResumesList} />
                  </div>
                ))
              : [1, 2, 3].map((_, i) => (
                  <div
                    key={i}
                    className="shimmer-card"
                    style={{ height: 268, borderRadius: 16, border: '1px solid rgba(255,255,255,0.05)' }}
                  />
                ))
            }
          </div>

          {/* Empty state — only shown after load */}
          {loaded && resumeList.length === 0 && (
            <div style={{ textAlign: 'center', paddingTop: 48 }}>
              <div style={{
                width: 56, height: 56, borderRadius: 16,
                background: 'rgba(99,102,241,0.1)',
                border: '1px solid rgba(99,102,241,0.18)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 14px'
              }}>
                <FileText size={24} style={{ color: '#6366f1' }} />
              </div>
              <p style={{ color: 'rgba(255,255,255,0.28)', fontSize: '0.88rem', fontWeight: 300 }}>
                Click the <span style={{ color: 'rgba(255,255,255,0.55)', fontWeight: 500 }}>+ New Resume</span> card to get started.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;