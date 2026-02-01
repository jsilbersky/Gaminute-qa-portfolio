# Gaminute QA Portfolio

Tento repozitář slouží jako portfolio projektů automatizovaného testování. Ukazuje praktické využití moderních testovacích frameworků a návrhových vzorů pro zajištění kvality softwaru.

## 📂 Struktura repozitáře

Projekt je rozdělen do složek podle použitých technologií a úrovní testování:

* **[Playwright](./Playwright)**: UI automatizace webové aplikace Gaminute.
* **Postman**: (V přípravě) Kolekce pro testování API.

---

## 🎭 Playwright UI Automatizace

Sada automatizovaných testů postavená na frameworku **Playwright** a jazyce **TypeScript**. Testy jsou zaměřeny na End-to-End (E2E) scénáře.

### 🛠️ Technologie
* **Framework**: Playwright
* **Jazyk**: TypeScript
* **Návrhový vzor**: Page Object Model (POM)
* **CI/CD**: GitHub Actions (konfigurace v `.github/workflows`)

### 🔍 Pokrytí testů
Aktuální implementace ve složce `Playwright` zahrnuje:
* **Funkce vyhledávání**: Validace výsledků, prázdných stavů a počítadla znaků.
* **Kontaktní formulář**: Validace polí (email, zpráva) a ověřování síťových požadavků na úrovni API.
* **Mobilní testování**: Simulace mobilních zobrazení a interakce s responzivním menu.

### 🚀 Spuštění
1.  Přejděte do adresáře: `cd Playwright`
2.  Nainstalujte závislosti: `npm install`
3.  Spusťte testy: `npx playwright test`
