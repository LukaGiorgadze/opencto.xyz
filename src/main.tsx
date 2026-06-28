import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Copy,
  ExternalLink,
  Github,
  Moon,
  Sun,
  Terminal,
  Workflow,
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
            <p className="category">Self-hosted AI developer assistant for automated workflows</p>
            <h1 id="headline">Automate operations with OpenCTO</h1>
            <p className="lede">
              OpenCTO is a self-hosted, open-source AI operator that handles the technical busywork of building, launching, and maintaining software. From managing repos and CI/CD to monitoring and report to #Discord or @Telegram, it automates the path from idea to launch for founders and small teams.
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
              <span className="local-note">Manage it from #Discord or @Telegram.</span>
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
            <div className="workflow-feature">
              <Workflow size={18} />
              <div>
                <strong>Temporal durable workflows</strong>
                <span>Long-running jobs resume through waits, retries, and failures.</span>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
