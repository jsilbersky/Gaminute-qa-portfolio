# Gaminute QA Portfolio

Tento repozitář slouží jako portfolio projektů zajištění kvality softwaru (QA) a automatizovaného testování pro web **[Gaminute](https://www.gaminute.com/)**. 

Projekt demonstruje komplexní přístup k testování – od tvorby testovací dokumentace přes testování na úrovni API až po End-to-End (E2E) automatizaci uživatelského rozhraní pomocí moderních frameworků a návrhových vzorů.

## 📋 Testovací dokumentace
Základem pro automatizaci je důkladná testovací analýza. Manuální testovací scénáře (Test Cases), které pokrývají hlavní funkcionality projektu Gaminute, jsou zpracovány v tabulkovém procesoru:

* 📊 **[Zobrazit Test Cases (Google Sheets)](https://docs.google.com/spreadsheets/d/1bKWeHvX325KDijA_t2E2iKlMADKr5PlFre2jLPUHjvY/edit?gid=0#gid=0)**

## 📂 Struktura repozitáře
Projekt je rozdělen do samostatných adresářů podle použitých technologií a úrovní testování:

* `[Playwright](Playwright)`: E2E a UI automatizace webové aplikace.
* `[Postman](Postman)`: Kolekce automatizovaných testů produkčního API.

---

## 🎭 Playwright UI Automatizace
Sada automatizovaných testů postavená na frameworku Playwright a jazyce TypeScript. Testy jsou zaměřeny na End-to-End (E2E) scénáře a interakci uživatele s prohlížečem.

### 🛠️ Použité technologie
* **Framework:** Playwright
* **Jazyk:** TypeScript
* **Návrhový vzor:** Page Object Model (POM) pro snadnou údržbu kódu
* **CI/CD:** GitHub Actions (konfigurace v `.github/workflows`)

### 🔍 Pokrytí testů
Aktuální implementace ve složce Playwright zahrnuje:
* **Funkce vyhledávání:** Validace výsledků, prázdných stavů a počítadla znaků.
* **Kontaktní formulář:** Validace polí (email, zpráva) a ověřování síťových požadavků na úrovni API.
* **Mobilní testování:** Simulace mobilních zobrazení a interakce s responzivním menu.

### 🚀 Spuštění Playwright testů
1. Přejděte do adresáře: `cd Playwright`
2. Nainstalujte závislosti: `npm install`
3. Spusťte testy: `npx playwright test`

---

## 📮 Postman API Testování
Automatizované testy ověřující funkčnost, strukturu a výkon produkčního REST API aplikace Gaminute. 

### 🔍 Pokrytí testů
Kolekce provádí GET a POST requesty a na nich validuje status kódy, dobu odezvy a datovou integritu:
* **Health Checks:** Rychlé ověření, zda je produkční prostředí online a vrací status `200 OK`.
* **Portfolio Data (`/api/games`):** Validace, že odpověď je ve správném formátu (JSON), odezva je pod 800 ms a že získaná data splňují business logiku (např. validní ID a názvy her).
* **Contact Form (`/api/contact`):** API úroveň odesílání zpráv z webu.

### 🚀 Spuštění Postman testů
1. Stáhněte a nainstalujte si aplikaci [Postman](https://www.postman.com/downloads/).
2. V aplikaci klikněte na **Import**.
3. Nahrajte soubor `.json`, který najdete ve složce `[Postman](Postman)`.
4. Spusťte kolekci prostřednictvím funkce **Run collection**.
