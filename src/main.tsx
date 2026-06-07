import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Copy,
  ExternalLink,
  Github,
  Moon,
  Sun,
  Terminal,
} from "lucide-react";
import "./styles.css";

const installCommand =
  "curl -fsSL https://raw.githubusercontent.com/LukaGiorgadze/opencto/main/install.sh | sh";

const useCases = [
  "Update DNS",
  "Fix deploys",
  "Product to tech",
  "Repo/env/CI",
  "Release notes",
  "Recover",
  "Checks",
  "iOS/Android",
] as const;

const howItWorks = [
  "Plain-language outcome",
  "Context from project, files, tools",
  "Local machine + connected services",
  "Keeps going through waits and failures",
  "Reports changes, checks, and blockers",
] as const;

function useTheme() {
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    const saved = localStorage.getItem("opencto-theme");
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("opencto-theme", theme);
  }, [theme]);

  return {
    theme,
    toggleTheme: () => setTheme((value) => (value === "dark" ? "light" : "dark")),
  };
}

function App() {
  const { theme, toggleTheme } = useTheme();
  const [copied, setCopied] = useState(false);

  async function copyInstall() {
    await navigator.clipboard.writeText(installCommand);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <main className="page-shell">
      <WorkflowBackground />

      <section className="hero-shell">
        <header className="topbar">
          <a className="brand-mark" href="/" aria-label="OpenCTO home">
            <span className="brand-glyph">OC</span>
            <span>OpenCTO</span>
          </a>

          <button className="theme-button" type="button" onClick={toggleTheme}>
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </button>
        </header>

        <div className="hero-grid">
          <section className="hero-copy" aria-labelledby="headline">
            <p className="category">Self-hosted AI operator for founder-led products</p>
            <h1 id="headline">Tell OpenCTO the outcome. It operates the workflow.</h1>
            <p className="lede">
              A self-hosted assistant that runs on your machine and uses various
              tools to get product work done.
            </p>
            <p className="support-copy">
              It can code, run commands, deploy, monitor, publish, and report
              back from #Discord or @Telegram.
            </p>

            <div className="actions">
              <a
                className="github-button"
                href="https://github.com/LukaGiorgadze/opencto"
                target="_blank"
                rel="noreferrer"
              >
                <Github size={18} />
                GitHub
                <ExternalLink size={14} />
              </a>
              <span className="local-note">Manage it from Discord or Telegram.</span>
            </div>

            <div className="install-strip">
              <Terminal size={16} />
              <code>
                <span className="command-accent">curl</span>
                {" -fsSL https://raw.githubusercontent.com/LukaGiorgadze/opencto/main/install.sh | "}
                <span className="command-accent">sh</span>
                <span className="command-cursor" aria-hidden="true">
                  _
                </span>
              </code>
              <button
                className="copy-button"
                type="button"
                onClick={copyInstall}
                aria-label="Copy install command"
              >
                <Copy size={15} />
                <span>{copied ? "Done" : "Copy"}</span>
              </button>
            </div>

            <div className="usecase-row" aria-label="Example use cases">
              {useCases.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </section>

          <aside className="workflow-summary" aria-label="How it works">
            <p className="section-kicker">How it works</p>
            <ul>
              {howItWorks.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
    </main>
  );
}

function WorkflowBackground() {
  return (
    <div className="workflow-bg" aria-hidden="true">
      <svg viewBox="0 0 1200 720" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="fieldGlow" cx="52%" cy="38%" r="62%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.24" />
            <stop offset="44%" stopColor="var(--warm)" stopOpacity="0.11" />
            <stop offset="100%" stopColor="var(--bg)" stopOpacity="0" />
          </radialGradient>
          <filter id="softNoise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.72"
              numOctaves="3"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncA type="table" tableValues="0 0.18" />
            </feComponentTransfer>
          </filter>
        </defs>

        <rect width="1200" height="720" fill="url(#fieldGlow)" />
        <path className="coordinate-line" d="M90 548 C260 470 366 560 532 458 S836 290 1110 360" />
        <path className="coordinate-line thin" d="M126 260 C330 192 442 286 604 248 S846 120 1090 178" />
        <path className="coordinate-line thin" d="M52 430 C232 366 326 404 470 348 S705 236 928 274" />
        <path className="moving-path" d="M90 548 C260 470 366 560 532 458 S836 290 1110 360" />
        <path className="moving-path delay" d="M126 260 C330 192 442 286 604 248 S846 120 1090 178" />

        <g className="nodes">
          <circle cx="150" cy="526" r="4" />
          <circle cx="336" cy="506" r="3" />
          <circle cx="532" cy="458" r="5" />
          <circle cx="746" cy="338" r="3" />
          <circle cx="948" cy="338" r="5" />
          <circle cx="1064" cy="358" r="3" />
          <circle cx="232" cy="230" r="3" />
          <circle cx="604" cy="248" r="4" />
          <circle cx="872" cy="148" r="3" />
        </g>

        <rect width="1200" height="720" filter="url(#softNoise)" opacity="0.55" />
      </svg>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
