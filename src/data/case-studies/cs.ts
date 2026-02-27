import type { ProjectId } from "../projects";
import type { ProjectCaseStudy } from "../projectCaseStudyTypes";

export const projectCaseStudiesCs: Record<ProjectId, ProjectCaseStudy> = {
  "levne-deskovky": {
    problem:
      "Ceny deskových her v českých e-shopech byly roztříštěné a bez jednotného srovnání dostupnosti i historie cen.",
    constraints: [
      "Prodejci používají odlišné názvy a formáty produktů.",
      "Aktualizace dat musí být spolehlivé bez ruční administrace.",
      "Grafy musí zůstat rychlé i při více prodejcích na detailu produktu."
    ],
    architecture: [
      {
        title: "Ingest dat",
        detail: "Normalizační skripty mapují záznamy prodejců na kanonické slugy a ukládají snapshoty katalogu do Supabase."
      },
      {
        title: "Frontend",
        detail: "React + TypeScript SPA s filtrováním, historií cen po prodejcích a dvojjazyčným rozhraním."
      },
      {
        title: "Observabilita",
        detail: "Automatizované logy aktualizací a validační kontroly odhalí problémové zdroje dřív, než dopadnou na uživatele."
      }
    ],
    decisions: [
      {
        title: "Strategie kanonických slugů",
        rationale: "Zajišťuje jednu identitu produktu napříč tržišti.",
        tradeoff: "Vyžaduje průběžnou údržbu mapování při změnách názvů prodejců."
      },
      {
        title: "Předpočítaná historie cen",
        rationale: "Drží vykreslení grafů lehké na straně klienta.",
        tradeoff: "Mírně vyšší nároky na úložiště v Supabase."
      }
    ],
    outcomes: [
      { label: "Rozsah katalogu", value: "2 000+ sloučených produktů" },
      { label: "Frekvence aktualizací", value: "Denní automatizovaný refresh" },
      { label: "Ruční provoz", value: "Omezen na řešení výjimek" }
    ],
    nextImprovements: [
      "Přidat upozornění na výrazné poklesy cen a naskladnění.",
      "Doplnit diagnostiku rozdílů snapshotů při selhání zdrojů."
    ]
  },
  "kuchar-v-akci": {
    problem:
      "Obsah receptů inspirovaný letáky supermarketů vyžadoval opakované ruční přepisování a publikaci.",
    constraints: [
      "Vstup je hlavně v PDF a není konzistentně strukturovaný.",
      "Publikace má být autonomní, ale auditovatelná.",
      "Uživatel potřebuje čisté stránky receptů se strukturovanými surovinami."
    ],
    architecture: [
      {
        title: "Automatizační pipeline",
        detail: "n8n workflow parsuje PDF letáky, transformuje obsah a ukládá normalizované entity receptů do Supabase."
      },
      {
        title: "Prezentační vrstva",
        detail: "React frontend čte strukturovaná data receptů a vykresluje konzistentní seznam i detail."
      },
      {
        title: "Kvalita dat",
        detail: "Validační uzly odmítají chybné recepty a zapisují chyby do logů."
      }
    ],
    decisions: [
      {
        title: "Ingest přes workflow",
        rationale: "n8n umožnil rychle iterovat parsovací kroky i fallback logiku.",
        tradeoff: "Složitější workflow vyžaduje disciplinované pojmenování a monitoring."
      },
      {
        title: "Striktní schema receptu",
        rationale: "Zlepšuje konzistenci UI a otevírá cestu pro budoucí vyhledávání/filtry.",
        tradeoff: "Hraniční případy letáků občas vyžadují manuální opravu."
      }
    ],
    outcomes: [
      { label: "Publikační model", value: "Plně end-to-end automatizovaný" },
      { label: "Čerstvost obsahu", value: "Denní aktualizace z letáků" },
      { label: "Práce editora", value: "Téměř nulové ruční publikování" }
    ],
    nextImprovements: [
      "Přidat deduplikaci podobných týdenních letáků.",
      "Zavést sémantické tagování surovin pro dietní filtry."
    ]
  },
  portfolio: {
    problem:
      "Portfolio muselo působit technicky zrale pro full-stack role, ale zároveň zůstat osobní a zapamatovatelné.",
    constraints: [
      "Podpora dvojjazyčného publika s čistým přepínáním jazyků.",
      "Udržet dobrý vnímaný výkon i s animovaným hero.",
      "Zachovat snadnou údržbu obsahu při růstu počtu projektů."
    ],
    architecture: [
      {
        title: "Frontend shell",
        detail: "React + Vite aplikace s routami, sekční navigací a znovupoužitelnými layout komponentami."
      },
      {
        title: "Content model",
        detail: "Typovaná metadata projektů/profilu a locale JSON oddělují copy od renderingu."
      },
      {
        title: "SEO vrstva",
        detail: "Klientská SEO komponenta spravuje canonical, hreflang, OG/Twitter tagy i JSON-LD."
      }
    ],
    decisions: [
      {
        title: "Sekce řízené daty",
        rationale: "Umožňuje rychlé aktualizace bez zásahu do prezentační logiky.",
        tradeoff: "Vyžaduje disciplínu ve schématu napříč jazyky."
      },
      {
        title: "Vlastní animovaný hero",
        rationale: "Posiluje zapamatovatelnost na první pohled.",
        tradeoff: "Vyšší komplexita a ladění pro a11y/výkon."
      }
    ],
    outcomes: [
      { label: "Lokalizace", value: "EN + CZ se synchronizací URL" },
      { label: "SEO rozsah", value: "Metadata a JSON-LD po route" },
      { label: "Udržovatelnost", value: "Obsah řízený typovanými daty" }
    ],
    nextImprovements: [
      "Doplnit vizuální regresní testy klíčových sekcí.",
      "Přidat analytický funnel pro interakce recruiterů."
    ]
  },
  "discord-automation": {
    problem:
      "Automatizace opakovaných Discord workflow vyžadovala stabilní ovládání klienta a dobrou runtime observabilitu.",
    constraints: [
      "Discord UI se může měnit, takže flow musí selhávat kontrolovaně.",
      "Bot nesmí posílat duplicitní příkazy.",
      "Důraz byl na desktop spolehlivost, ne na vizuální efekty."
    ],
    architecture: [
      {
        title: "Host aplikace",
        detail: "Desktopová WPF aplikace embeduje Discord přes WebView2."
      },
      {
        title: "Automatizační kanál",
        detail: "Injektáž příkazů přes DevTools a klávesové události nahradila křehké UI-only interakce."
      },
      {
        title: "Stav a logy",
        detail: "Paměťové buffery zpráv a strukturované logy zlepšují debugovatelnost."
      }
    ],
    decisions: [
      {
        title: "Přechod ze Selenium na DevTools",
        rationale: "Zvýšil determinismus příkazů a snížil flakiness interakcí.",
        tradeoff: "Nižší přenositelnost a silnější vazba na WebView2 internals."
      }
    ],
    outcomes: [
      { label: "Práce s duplicitami", value: "Deterministický deduplikační tok" },
      { label: "Observabilita", value: "Strukturované logy + buffer posledních zpráv" },
      { label: "Stabilita", value: "Lepší než předchozí Selenium varianta" }
    ],
    nextImprovements: [
      "Persistovat logy pro dlouhodobou analýzu trendů.",
      "Doplnit watchdog restart a health check."
    ]
  },
  "smithing-master-bot": {
    problem: "Opakované herní crafting akce byly časově náročné a vyžadovaly vysokou míru manuální rutiny.",
    constraints: [
      "Není dostupné API, pouze screen-based automatizace.",
      "Template matching musí tolerovat drobné vizuální odchylky.",
      "Akce musí být bezpečné vůči false-positive detekci."
    ],
    architecture: [
      {
        title: "Vision loop",
        detail: "OpenCV template matching detekuje stavy UI ze screenshotů emulátoru."
      },
      {
        title: "Akční vrstva",
        detail: "PyAutoGUI vykonává kliky a vstupy v chráněném pořadí kroků."
      }
    ],
    decisions: [
      {
        title: "Prahování confidence před akcí",
        rationale: "Snížilo omyly kliknutí a rozpad běhu.",
        tradeoff: "Mírně pomalejší smyčka automatizace kvůli bezpečnosti."
      }
    ],
    outcomes: [
      { label: "Ruční čas", value: "Výrazné snížení repetitivních úkonů" },
      { label: "Spolehlivost", value: "Flow hlídaný confidence thresholdy" },
      { label: "Provoz", value: "Možné dlouhé unattended běhy" }
    ],
    nextImprovements: [
      "Doplnit adaptivní thresholding dle rozlišení emulátoru.",
      "Ukládat replay trace při selhaných cyklech."
    ]
  },
  "mobile-game-unity": {
    problem: "Cílem bylo vytvořit kompletní hratelný RPG prototyp s progresí a craftingem.",
    constraints: [
      "Omezený čas solo vývoje.",
      "Core loop musel zůstat čitelný pro mobilní platformu.",
      "Balanc bez velkého testovacího vzorku hráčů."
    ],
    architecture: [
      {
        title: "Core systémy",
        detail: "Unity C# skripty řeší progresi, crafting a základní combat state."
      },
      {
        title: "Gameplay loop",
        detail: "Clicker-like vstup pohání získávání zdrojů a odemykání vylepšení."
      }
    ],
    decisions: [
      {
        title: "Prototype-first scope",
        rationale: "Prioritou bylo rychle ověřit funkčnost progresních mechanik.",
        tradeoff: "Menší polish v šíři obsahu a UX detailu."
      }
    ],
    outcomes: [
      { label: "Deliverable", value: "Hratelný Android prototyp" },
      { label: "Systémy", value: "Fungující progrese a crafting loop" },
      { label: "Learning", value: "Praktická zkušenost s Unity architekturou" }
    ],
    nextImprovements: [
      "Přidat telemetry pro ladění progresních křivek.",
      "Zlepšit onboarding a čitelnost combatu."
    ]
  }
};
