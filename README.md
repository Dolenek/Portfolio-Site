<div align="center">

# Jakub Dolének - Portfolio

**Osobní portfolio full-stack vývojáře zaměřené na praktické projekty, automatizaci procesů a moderní webové technologie.**

[![live](https://img.shields.io/badge/live-jakubdolenek.xyz-16a34a?style=flat-square)](https://www.jakubdolenek.xyz)
[![frontend](https://img.shields.io/badge/frontend-React%20%2B%20TypeScript-2563eb?style=flat-square)](#technický-stack)
[![build](https://img.shields.io/badge/build-Vite-f59e0b?style=flat-square)](#lokální-spuštění)
[![docs](https://img.shields.io/badge/docs-current%20architecture-334155?style=flat-square)](docs/documentation.md)

[Live web](https://www.jakubdolenek.xyz) | [English README](README.en.md) | [Dokumentace](docs/documentation.md)

<img src="public/projects/SiteScreen.png" alt="Portfolio homepage screenshot" width="860">

</div>

## Co ukazuje

Tento repozitář slouží jako moje hlavní technická prezentace. Nejde jen o vizitku, ale o plnohodnotnou React aplikaci, která ukazuje vybrané projekty, stack, zkušenosti a kontakt v přehledné podobě.

- Domovská stránka se sekcemi `hero`, `projects`, `skills` a `contact`.
- Samostatná `/about` stránka se zkušenostmi a vzděláním.
- Vybrané projekty s odkazy na demo nebo GitHub.
- Česká a anglická lokalizace s URL synchronizací.
- Tmavý a světlý režim s uložením preference.
- SEO metadata, canonical/hreflang odkazy, JSON-LD, sitemap a robots.

## Technický stack

| Oblast | Technologie |
| --- | --- |
| Frontend | React 19, TypeScript 5, Vite 7 |
| Styling | Tailwind CSS 3, section CSS, responsive layout |
| Animace | Framer Motion |
| Routing | react-router-dom 7 |
| Lokalizace | react-i18next, i18next-browser-languagedetector |
| SEO | route-aware metadata, JSON-LD, sitemap, robots.txt |

## Engineering highlights

- Obsah projektů, profilu a SEO konfigurace je oddělený v typed data souborech.
- Layout používá sdílené provider vrstvy pro theme, scroll spy a i18n.
- Prezentační komponenty jsou rozdělené podle sekcí, aby šly snadno rozšiřovat.
- Canonical a alternate URL se generují podle aktivní route a jazyka.
- Dokumentace v `docs/` popisuje aktuální architekturu, setup, obsahové modely a SEO/i18n pravidla.

## Lokální spuštění

```bash
npm install
npm run dev
```

Lokální dev server běží typicky na `http://localhost:5173`.

### Dostupné skripty

```bash
npm run dev
npm run lint
npm run typecheck
npm run build
npm run preview
```

## Dokumentace

Canonical dokumentace je v adresáři `docs/`.

- [Documentation index](docs/documentation.md)
- [Overview](docs/overview.md)
- [Development setup](docs/development-setup.md)
- [Architecture](docs/architecture.md)
