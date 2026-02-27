import type { ProjectId } from "../projects";
import type { ProjectCaseStudy } from "../projectCaseStudyTypes";

export const projectCaseStudiesEn: Record<ProjectId, ProjectCaseStudy> = {
  "levne-deskovky": {
    problem:
      "Board-game pricing in Czech e-commerce was fragmented across many sellers, with no unified way to compare availability and price history.",
    constraints: [
      "Different sellers used inconsistent product names and formats.",
      "Data updates had to be reliable without manual admin work.",
      "Charts had to stay fast on product pages with multiple sellers."
    ],
    architecture: [
      {
        title: "Data ingestion",
        detail: "Normalization scripts map seller records to canonical slugs and persist catalog snapshots in Supabase."
      },
      {
        title: "Frontend delivery",
        detail: "React + TypeScript SPA with filtered listing, seller-specific history charts, and bilingual UI."
      },
      {
        title: "Observability",
        detail: "Automated update logs and validation checks flag broken sellers before they impact users."
      }
    ],
    decisions: [
      {
        title: "Canonical slug strategy",
        rationale: "Ensures one product identity across all marketplaces.",
        tradeoff: "Requires strict mapping maintenance when seller naming drifts."
      },
      {
        title: "Pre-computed seller history",
        rationale: "Keeps chart rendering lightweight in the browser.",
        tradeoff: "Slightly higher storage footprint in Supabase."
      }
    ],
    outcomes: [
      { label: "Catalog scale", value: "2,000+ merged products" },
      { label: "Update cadence", value: "Daily automated refresh" },
      { label: "Manual ops", value: "Reduced to exception handling" }
    ],
    nextImprovements: [
      "Add alerting for major price drops and restocks.",
      "Introduce snapshot diff diagnostics for failed sources."
    ]
  },
  "kuchar-v-akci": {
    problem:
      "Recipe content inspired by supermarket flyers required repetitive manual extraction and publishing.",
    constraints: [
      "Input source is PDF-heavy and not consistently structured.",
      "Publishing should be autonomous but still auditable.",
      "Users need simple recipe pages with clean ingredient structure."
    ],
    architecture: [
      {
        title: "Automation pipeline",
        detail: "n8n workflows parse flyer PDFs, transform content, and write normalized recipe entities to Supabase."
      },
      {
        title: "Presentation layer",
        detail: "React frontend reads structured recipes and renders consistent cards/detail views."
      },
      {
        title: "Data quality",
        detail: "Validation nodes reject malformed recipes and log failures for review."
      }
    ],
    decisions: [
      {
        title: "Workflow-first ingestion",
        rationale: "n8n enables quick iteration for parsing steps and fallback logic.",
        tradeoff: "Complex workflows require disciplined naming and monitoring."
      },
      {
        title: "Structured recipe schema",
        rationale: "Improves UI consistency and future search/filter options.",
        tradeoff: "Stricter schema means occasional manual fixes for edge-case flyers."
      }
    ],
    outcomes: [
      { label: "Publishing model", value: "End-to-end automated" },
      { label: "Content freshness", value: "Daily updates from flyers" },
      { label: "Editor workload", value: "Near-zero manual publishing" }
    ],
    nextImprovements: [
      "Add deduplication across similar weekly flyers.",
      "Introduce semantic ingredient tagging for dietary filters."
    ]
  },
  portfolio: {
    problem:
      "The portfolio needed to show technical maturity for full-stack roles while staying personal and memorable.",
    constraints: [
      "Support bilingual visitors with clean language switching.",
      "Maintain strong perceived performance with animation-heavy hero sections.",
      "Keep content updates maintainable as project inventory grows."
    ],
    architecture: [
      {
        title: "Frontend shell",
        detail: "React + Vite app with route-based pages, section navigation, and reusable layout components."
      },
      {
        title: "Content model",
        detail: "Typed project/profile metadata and locale JSON files keep copy and rendering concerns separated."
      },
      {
        title: "SEO layer",
        detail: "Client-side SEO component manages canonical, hreflang, OG/Twitter tags, and JSON-LD per route."
      }
    ],
    decisions: [
      {
        title: "Data-driven sections",
        rationale: "Allows fast updates without touching presentation logic.",
        tradeoff: "Requires strict schema discipline across locales."
      },
      {
        title: "Custom animated hero",
        rationale: "Creates strong visual memorability on first view.",
        tradeoff: "Higher complexity and tuning effort for accessibility/performance."
      }
    ],
    outcomes: [
      { label: "Localization", value: "EN + CZ with URL sync" },
      { label: "SEO surface", value: "Route-specific metadata and JSON-LD" },
      { label: "Maintainability", value: "Content-driven updates via typed data" }
    ],
    nextImprovements: [
      "Add visual regression checks for key sections.",
      "Instrument analytics funnel for recruiter interactions."
    ]
  },
  "discord-automation": {
    problem:
      "Automating repetitive Discord command workflows required stable browser control and clear runtime visibility.",
    constraints: [
      "Discord UI can change, so selectors and flow must fail gracefully.",
      "The bot must avoid duplicate command dispatches.",
      "Desktop reliability mattered more than flashy UX."
    ],
    architecture: [
      {
        title: "Execution host",
        detail: "WPF desktop application embeds Discord in WebView2."
      },
      {
        title: "Automation channel",
        detail: "DevTools command injection with keyboard events replaced fragile UI-only interactions."
      },
      {
        title: "State & logs",
        detail: "In-memory message buffers and structured logs provide debugging visibility."
      }
    ],
    decisions: [
      {
        title: "Move from Selenium to DevTools",
        rationale: "Improved command determinism and reduced flaky interactions.",
        tradeoff: "Lower portability and tighter coupling to WebView2 internals."
      }
    ],
    outcomes: [
      { label: "Duplicate handling", value: "Deterministic deduplication flow" },
      { label: "Runtime visibility", value: "Structured logs + recent message buffer" },
      { label: "Stability", value: "Improved over prior Selenium approach" }
    ],
    nextImprovements: [
      "Persist logs for long-term trend analysis.",
      "Add watchdog restarts and health checks."
    ]
  },
  "smithing-master-bot": {
    problem: "Repeated in-game crafting actions consumed time and required high manual repetition.",
    constraints: [
      "No direct API access; only screen-driven automation was possible.",
      "Template matching needed to tolerate minor visual variance.",
      "Actions had to remain safe against false-positive detections."
    ],
    architecture: [
      {
        title: "Vision loop",
        detail: "OpenCV template matching identifies UI states from emulator screenshots."
      },
      {
        title: "Action layer",
        detail: "PyAutoGUI executes clicks and keyboard inputs with guarded sequencing."
      }
    ],
    decisions: [
      {
        title: "Confidence thresholds before action",
        rationale: "Reduced accidental clicks and broken runs.",
        tradeoff: "Slightly slower automation loop for safety."
      }
    ],
    outcomes: [
      { label: "Manual time", value: "Large reduction in repetitive gameplay actions" },
      { label: "Reliability", value: "Template-threshold guarded flow" },
      { label: "Operation", value: "Long unattended sessions possible" }
    ],
    nextImprovements: [
      "Add adaptive thresholding per emulator resolution.",
      "Capture replay traces for failed cycles."
    ]
  },
  "mobile-game-unity": {
    problem: "Build a complete playable RPG prototype with progression and crafting mechanics.",
    constraints: [
      "Limited solo development time.",
      "Need to keep core loop understandable on mobile.",
      "Balance progression without a large test cohort."
    ],
    architecture: [
      {
        title: "Core systems",
        detail: "Unity C# scripts implement progression, crafting, and basic combat state."
      },
      {
        title: "Gameplay loop",
        detail: "Clicker-like input feeds resource gain and unlocks upgraded actions."
      }
    ],
    decisions: [
      {
        title: "Prototype-first scope",
        rationale: "Prioritized validating progression mechanics quickly.",
        tradeoff: "Less polish in content breadth and UX finishing."
      }
    ],
    outcomes: [
      { label: "Deliverable", value: "Playable Android prototype" },
      { label: "Systems", value: "Working progression and crafting loop" },
      { label: "Learning", value: "Unity gameplay architecture practice" }
    ],
    nextImprovements: [
      "Add telemetry for balancing progression curves.",
      "Improve onboarding and combat readability."
    ]
  }
};
