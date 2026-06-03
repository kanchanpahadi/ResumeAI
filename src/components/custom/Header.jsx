import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";
import { LayoutDashboard, Plus, Menu, X, Home } from "lucide-react";

function Header() {
  const { user, isSignedIn } = useUser();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path;

  // Distinct nav items only — each goes to a unique page
  const navItems = isSignedIn
    ? [
        { label: "Home", to: "/", icon: <Home size={13} /> },
        {
          label: "Dashboard",
          to: "/dashboard",
          icon: <LayoutDashboard size={13} />,
        },
      ]
    : [{ label: "Home", to: "/", icon: <Home size={13} /> }];

  return (
    <>
      <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif&family=DM+Sans:wght@400;500;600&display=swap');

            .hdr {
                position: fixed; top: 0; left: 0; right: 0; z-index: 50;
                height: 60px;
                display: flex; align-items: center; justify-content: space-between;
                padding: 0 2rem;
                font-family: 'DM Sans', sans-serif;
                transition: background 0.3s, border-color 0.3s, box-shadow 0.3s;
                background: rgba(8,8,16,${scrolled ? "0.95" : "0.6"});
                backdrop-filter: blur(18px);
                -webkit-backdrop-filter: blur(18px);
                border-bottom: 1px solid rgba(255,255,255,${scrolled ? "0.09" : "0.05"});
                box-shadow: ${scrolled ? "0 4px 32px rgba(0,0,0,0.3)" : "none"};
            }
            .hdr::before {
                content: '';
                position: absolute; top: 0; left: 0; right: 0; height: 1px;
                background: linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.7) 40%, rgba(196,181,253,0.5) 60%, transparent 100%);
            }

            .hdr-logo {
                font-family: 'Instrument Serif', serif;
                font-size: 1.2rem; font-weight: 400;
                color: #fff; text-decoration: none;
                letter-spacing: -0.01em;
                display: flex; align-items: center; gap: 8px;
                flex-shrink: 0;
            }
            .hdr-logo-accent {
                background: linear-gradient(135deg, #a8c8ff, #c4b5fd);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }
            .hdr-logo-dot {
                width: 6px; height: 6px; border-radius: 50%;
                background: linear-gradient(135deg, #6366f1, #a78bfa);
                flex-shrink: 0;
            }

            .hdr-nav {
                display: flex; align-items: center; gap: 2px;
            }
            .hdr-nav-link {
                display: inline-flex; align-items: center; gap: 6px;
                font-size: 0.82rem; font-weight: 500;
                color: rgba(255,255,255,0.45);
                padding: 6px 14px; border-radius: 100px;
                text-decoration: none;
                transition: all 0.2s;
                border: 1px solid transparent;
            }
            .hdr-nav-link:hover {
                color: rgba(255,255,255,0.9);
                background: rgba(255,255,255,0.07);
            }
            .hdr-nav-link.active {
                color: #fff;
                background: rgba(99,102,241,0.18);
                border-color: rgba(99,102,241,0.3);
            }

            .hdr-right {
                display: flex; align-items: center; gap: 10px;
            }

            /* "New Resume" button — only shown on dashboard */
            .hdr-new-btn {
                display: inline-flex; align-items: center; gap: 6px;
                font-size: 0.78rem; font-weight: 600;
                color: #080810; background: #fff;
                border-radius: 100px; padding: 6px 16px;
                text-decoration: none;
                transition: all 0.2s;
                border: none; cursor: pointer;
            }
            .hdr-new-btn:hover {
                background: #e8f0ff;
                transform: translateY(-1px);
                box-shadow: 0 4px 16px rgba(255,255,255,0.15);
            }

            .hdr-cta {
                display: inline-flex; align-items: center; gap: 6px;
                font-size: 0.82rem; font-weight: 600;
                color: #080810; background: #fff;
                border-radius: 100px; padding: 7px 20px;
                text-decoration: none; transition: all 0.2s;
            }
            .hdr-cta:hover {
                background: #e8f0ff;
                transform: translateY(-1px);
                box-shadow: 0 6px 20px rgba(255,255,255,0.15);
            }

            .hdr-user {
                border-radius: 50%;
                outline: 2px solid rgba(99,102,241,0.3);
                outline-offset: 2px;
                transition: outline-color 0.2s;
            }
            .hdr-user:hover { outline-color: rgba(99,102,241,0.7); }

            .hdr-burger {
                display: none;
                background: none; border: none; cursor: pointer;
                color: rgba(255,255,255,0.7); padding: 4px;
            }
            .hdr-burger:hover { color: #fff; }

            /* Page indicator pill — shows where you are */
            .hdr-page-pill {
                font-size: 0.7rem; font-weight: 600;
                letter-spacing: 0.06em; text-transform: uppercase;
                color: rgba(255,255,255,0.3);
                padding: 3px 10px;
                border: 1px solid rgba(255,255,255,0.08);
                border-radius: 100px;
                background: rgba(255,255,255,0.03);
            }

            .hdr-mobile {
                position: fixed; top: 60px; left: 0; right: 0;
                background: rgba(8,8,16,0.97);
                backdrop-filter: blur(20px);
                border-bottom: 1px solid rgba(255,255,255,0.08);
                padding: 12px 16px 20px;
                display: flex; flex-direction: column; gap: 4px;
                z-index: 49;
                transform: translateY(-8px); opacity: 0;
                pointer-events: none;
                transition: all 0.25s ease;
            }
            .hdr-mobile.open {
                transform: translateY(0); opacity: 1;
                pointer-events: all;
            }
            .hdr-mobile-link {
                display: flex; align-items: center; gap: 10px;
                font-size: 0.9rem; font-weight: 500;
                color: rgba(255,255,255,0.55);
                padding: 10px 14px; border-radius: 12px;
                text-decoration: none; transition: all 0.2s;
            }
            .hdr-mobile-link:hover, .hdr-mobile-link.active {
                color: #fff; background: rgba(99,102,241,0.15);
            }
            .hdr-mobile-divider {
                height: 1px;
                background: rgba(255,255,255,0.07);
                margin: 6px 0;
            }

            @media (max-width: 767px) {
                .hdr-nav { display: none; }
                .hdr-new-btn { display: none; }
                .hdr-page-pill { display: none; }
                .hdr-burger { display: flex; align-items: center; }
                .hdr { padding: 0 1.2rem; }
            }
        `}</style>

      <header className="hdr">
        {/* Logo */}
        <Link to="/" className="hdr-logo">
          <div className="hdr-logo-dot" />
          Resume<span className="hdr-logo-accent">AI</span>
        </Link>

        {/* Center nav */}
        <nav className="hdr-nav">
          {navItems.map(({ label, to, icon }) => (
            <Link
              key={to}
              to={to}
              className={`hdr-nav-link ${isActive(to) ? "active" : ""}`}
            >
              {icon}
              {label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="hdr-right">
          {isSignedIn ? (
            <>
              {/* Only show "New Resume" when NOT already on dashboard */}
              {!isActive("/dashboard") && (
                <Link
                  to="/dashboard"
                  state={{ openNewResume: true }}
                  className="hdr-new-btn"
                >
                  <Plus size={13} />
                  New Resume
                </Link>
              )}

              <div className="hdr-user">
                <UserButton afterSignOutUrl="/" />
              </div>

              <button
                className="hdr-burger"
                onClick={() => setMobileOpen((v) => !v)}
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </>
          ) : (
            <Link to="/auth/sign-in" className="hdr-cta">
              Get Started →
            </Link>
          )}
        </div>
      </header>

      {/* Mobile drawer */}
      {isSignedIn && (
        <div className={`hdr-mobile ${mobileOpen ? "open" : ""}`}>
          {navItems.map(({ label, to, icon }) => (
            <Link
              key={to}
              to={to}
              className={`hdr-mobile-link ${isActive(to) ? "active" : ""}`}
            >
              {icon} {label}
            </Link>
          ))}
          <div className="hdr-mobile-divider" />
          <Link
            to="/dashboard"
            state={{ openNewResume: true }}
            className="hdr-mobile-link"
          >
            <Plus size={16} />
            New Resume
          </Link>
        </div>
      )}
    </>
  );
}

export default Header;
