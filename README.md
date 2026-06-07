# SmartCook 🍳

Webová aplikace která ti pomůže najít recepty podle toho co máš zrovna v lednici. Stačí přidat ingredience, aplikace je přeloží do angličtiny a přes API vyhledá vhodné recepty seřazené podle toho kolik surovin z lednice využijí.

---

## Účel aplikace

SmartCook řeší běžný problém — nevíš co uvařit z toho co máš doma. Přidáš suroviny které máš k dispozici (i s datem expirace), aplikace najde recepty které je využívají a seřadí je od nejlepší shody. Recepty si můžeš uložit do oblíbených, prohlédnout jejich detail s přeloženým postupem a přidat si k nim vlastní poznámky. Aplikace funguje i offline jako PWA.

---

## Struktura projektu

```
smartcook/
│
├── index.html          # hlavní stránka — správa lednice + zobrazení receptů
├── Favourite.html      # stránka s uloženými oblíbenými recepty
├── Newsletter.html     # formulář pro přihlášení k odběru novinek
├── Resources.html      # mobilní verze správy přísad (náhrada za sidebar)
│
├── style.css           # veškeré styly celé aplikace
├── script.js           # veškerá logika aplikace (JS)
│
├── manifest.json       # konfigurace PWA
├── sw.js               # service worker pro offline režim
│
├── icon-192.png        # ikona aplikace (PWA, 192×192)
└── icon-512.png        # ikona aplikace (PWA, 512×512)
```

---

## Použitá API

### TheMealDB API

Bezplatné REST API s databází receptů. Aplikace používá dva endpointy:

| Endpoint | Popis |
|---|---|
| `GET https://www.themealdb.com/api/json/v1/1/filter.php?i={ingredient}` | Vrátí seznam receptů které obsahují danou ingredienci (v angličtině) |
| `GET https://www.themealdb.com/api/json/v1/1/lookup.php?i={idMeal}` | Vrátí kompletní detail receptu podle jeho ID — ingredience, postup, kategorie, oblast |

### MyMemory Translation API

Bezplatné překladové API. Používá se na překlad názvu receptu, kategorie, oblasti a postupu přípravy z angličtiny do češtiny.

| Endpoint | Popis |
|---|---|
| `GET https://api.mymemory.translated.net/get?q={text}&langpair={from}\|{to}` | Přeloží zadaný text mezi dvěma jazyky |

> **Poznámka:** API má limit na počet znaků za požadavek. Postup receptu se proto krájí na kousky po max. 400 znacích a překládá postupně. Ingredience jsou přeloženy předem v lokálním slovníku přímo v `script.js` — API je nestíhalo překládat v takovém množství.

---

## Jak fungují jednotlivé části

### Správa lednice (`index.html` + `Resources.html`)

Uživatel zadá název ingredience a datum expirace. Název se porovná s lokálním slovníkem (~230 položek) — pokud není nalezen přesnou shodou, aplikace spočítá Levenshteinovu vzdálenost a navrhne opravu překlepu. Ingredience se uloží do `localStorage`. Expirované položky jsou vizuálně odlišeny červeným rámečkem a ikonou ⚠️.

Na desktopu je správa v postranním panelu (`aside.side-bar`), na mobilu se otevře samostatná stránka `Resources.html`.

### Vyhledávání receptů

Po každé změně lednice se spustí `fetchRecipes()`:

1. Ingredience se přeloží z češtiny do angličtiny přes lokální slovník (duplicity se odstraní přes `Set`)
2. Pro každou ingredienci se paralelně zavolá TheMealDB filter endpoint
3. Výsledná unikátní ID receptů se předají do lookup endpointu (opět paralelně)
4. Pro každý recept se spočítá kolik jeho ingrediencí pokrývá aktuální lednice
5. Recepty se seřadí — první jsou ty kde mám **všechny** ingredience, pak ostatní sestupně podle počtu shod

### Oblíbené recepty (`Favourite.html`)

Kliknutím na srdíčko se stáhne kompletní detail receptu, přeloží se do češtiny a uloží do `localStorage` pod klíčem `favourite_recipes`. Díky tomu jsou oblíbené recepty dostupné i offline. Při opětovném zobrazení detailu se nejdřív zkontroluje cache v `localStorage` — pokud tam recept je, API se nevolá.

### Detail receptu (modal)

Po kliknutí na kartu receptu se otevře modal s:
- obrázkem, názvem, kategorií a oblastí původu
- přeloženým seznamem ingrediencí s množstvím
- přeloženým postupem přípravy
- sekcí pro vlastní poznámky (komentáře) uložené v `localStorage`

### Newsletter (`Newsletter.html`)

Formulář validuje jméno, příjmení, email, rok narození (1920–2026) a GDPR souhlas. Po úspěšném odeslání se data uloží do `localStorage` pod klíčem `newsletter_subscribers`. Duplicitní emaily jsou odmítnuty.

### PWA (offline režim)

`manifest.json` definuje metadata aplikace (název, ikony, barvy). `sw.js` registruje service worker který při první návštěvě uloží do cache HTML, CSS a manifest. Při dalším načtení bez připojení servíruje stránku z cache.

---

## Use-case diagram

```
                        ┌─────────────────────────────────────────┐
                        │             SmartCook                   │
                        │                                         │
  ┌──────────┐          │  ┌─────────────────────────────────┐   │
  │          │─────────────▶  Přidat ingredienci do lednice  │   │
  │          │          │  └────────────────┬────────────────┘   │
  │          │          │                   │ spustí              │
  │          │          │  ┌────────────────▼────────────────┐   │
  │          │─────────────▶  Vyhledat recepty podle lednice │   │
  │          │          │  └────────────────┬────────────────┘   │
  │          │          │                   │ zobrazí             │
  │          │          │  ┌────────────────▼────────────────┐   │
  │Uživatel  │─────────────▶  Zobrazit detail receptu        │   │
  │          │          │  └─────────────────────────────────┘   │
  │          │          │                                         │
  │          │          │  ┌─────────────────────────────────┐   │
  │          │─────────────▶  Uložit recept do oblíbených    │   │
  │          │          │  └─────────────────────────────────┘   │
  │          │          │                                         │
  │          │          │  ┌─────────────────────────────────┐   │
  │          │─────────────▶  Přidat komentář k receptu      │   │
  │          │          │  └─────────────────────────────────┘   │
  │          │          │                                         │
  │          │          │  ┌─────────────────────────────────┐   │
  │          │─────────────▶  Odstranit ingredienci / recept │   │
  │          │          │  └─────────────────────────────────┘   │
  │          │          │                                         │
  │          │          │  ┌─────────────────────────────────┐   │
  │          │─────────────▶  Přihlásit se k newsletteru     │   │
  └──────────┘          │  └─────────────────────────────────┘   │
                        │                                         │
                        └─────────────────────────────────────────┘
```

---

## Lokální úložiště (localStorage)

Aplikace nepoužívá žádný backend — veškerá data se ukládají lokálně v prohlížeči:

| Klíč | Obsah |
|---|---|
| `fridge_ingredients` | pole objektů `{ name, day, month, year }` |
| `favourite_recipes` | pole přeložených objektů receptů z TheMealDB |
| `recipe_comments` | objekt kde klíč je `idMeal` a hodnota je pole komentářů |
| `newsletter_subscribers` | pole objektů s údaji přihlášených uživatelů |

---

## Použité technologie

| Technologie | Využití |
|---|---|
| HTML5 | struktura stránek |
| CSS3 | styly, responzivita, animace |
| JavaScript (ES6+) | veškerá logika, volání API, práce s DOM |
| localStorage | ukládání dat bez backendu |
| Service Worker | offline režim (PWA) |
| TheMealDB API | databáze receptů |
| MyMemory API | překlad receptů do češtiny |
