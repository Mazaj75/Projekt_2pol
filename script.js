/* ==============================================
   HTML ELEMENTY
   ============================================== */
const ingredientInput  = document.getElementById('ingredientInput') || document.getElementById('mobileIngredientInput');
const ingredientsList  = document.getElementById('ingredientsList')  || document.getElementById('mobileIngredientsList');
const expirationDay    = document.getElementById('dateOfExpirationDay');
const expirationMonth  = document.getElementById('dateOfExpirationMonth');
const expirationYear   = document.getElementById('dateOfExpirationYear');
const addBtn           = document.getElementById('addBtn');
const recipesGrid      = document.querySelector('.recipes-grid');
const recipeModal      = document.getElementById('recipeModal');
const modalBody        = document.getElementById('modalRecipeBody');
const closeModalBtn    = document.querySelector('.close-modal');

/* ==============================================
   LOKÁLNÍ SLOVNÍK INGREDIENCÍ (CS ↔ EN)
   ============================================== */
const INGREDIENTS_DB = [
    { czech: "kuře", english: "chicken" },
    { czech: "losos", english: "salmon" },
    { czech: "hovězí maso", english: "beef" },
    { czech: "vepřové maso", english: "pork" },
    { czech: "avokádo", english: "avocado" },
    { czech: "jablko", english: "apple" },
    { czech: "meruňka", english: "apricot" },
    { czech: "tkanička", english: "asparagus" },
    { czech: "lilek", english: "aubergine" },
    { czech: "banán", english: "banana" },
    { czech: "bazalka", english: "basil" },
    { czech: "bobkový list", english: "bay leaf" },
    { czech: "fazole", english: "beans" },
    { czech: "pivo", english: "beer" },
    { czech: "řepa", english: "beetroot" },
    { czech: "černý pepř", english: "black pepper" },
    { czech: "ostružiny", english: "blackberries" },
    { czech: "borůvky", english: "blueberries" },
    { czech: "brokolice", english: "broccoli" },
    { czech: "hnědý cukr", english: "brown sugar" },
    { czech: "máslo", english: "butter" },
    { czech: "zelí", english: "cabbage" },
    { czech: "mrkev", english: "carrot" },
    { czech: "kešu ořechy", english: "cashew nuts" },
    { czech: "květák", english: "cauliflower" },
    { czech: "celer", english: "celery" },
    { czech: "sýr", english: "cheese" },
    { czech: "třešně", english: "cherries" },
    { czech: "chia semínka", english: "chia seeds" },
    { czech: "cizrna", english: "chickpeas" },
    { czech: "chili", english: "chili" },
    { czech: "chilli prášek", english: "chili powder" },
    { czech: "čokoláda", english: "chocolate" },
    { czech: "skořice", english: "cinnamon" },
    { czech: "hřebíček", english: "cloves" },
    { czech: "kokos", english: "coconut" },
    { czech: "kokosové mléko", english: "coconut milk" },
    { czech: "treska", english: "cod" },
    { czech: "káva", english: "coffee" },
    { czech: "koriandr", english: "coriander" },
    { czech: "kukuřice", english: "corn" },
    { czech: "kukuřičný škrob", english: "cornstarch" },
    { czech: "krab", english: "crab" },
    { czech: "brusinky", english: "brusberries" },
    { czech: "smetana", english: "cream" },
    { czech: "okurka", english: "cucumber" },
    { czech: "kari", english: "curry" },
    { czech: "hořká čokoláda", english: "dark chocolate" },
    { czech: "datle", english: "dates" },
    { czech: "kopr", english: "dill" },
    { czech: "kachna", english: "duck" },
    { czech: "vejce", english: "egg" },
    { czech: "vaječný bílek", english: "egg white" },
    { czech: "vaječný žloutek", english: "egg yolk" },
    { czech: "vajíčka", english: "eggs" },
    { czech: "feta sýr", english: "feta" },
    { czech: "fíky", english: "figs" },
    { czech: "rybí omáčka", english: "fish sauce" },
    { czech: "mouka", english: "flour" },
    { czech: "česnek", english: "garlic" },
    { czech: "zázvor", english: "ginger" },
    { czech: "kozí sýr", english: "goat cheese" },
    { czech: "hroznové víno", english: "grapes" },
    { czech: "řecký jogurt", english: "greek yogurt" },
    { czech: "zelené fazolky", english: "green beans" },
    { czech: "šunka", english: "ham" },
    { czech: "med", english: "honey" },
    { czech: "křen", english: "horseradish" },
    { czech: "led", english: "ice" },
    { czech: "zmrzlina", english: "ice cream" },
    { czech: "džem", english: "jam" },
    { czech: "jasmínová rýže", english: "jasmine rice" },
    { czech: "kečup", english: "ketchup" },
    { czech: "ledvinky fazole", english: "kidney beans" },
    { czech: "jehněčí maso", english: "lamb" },
    { czech: "sádlo", english: "lard" },
    { czech: "pórek", english: "leek" },
    { czech: "citrón", english: "lemon" },
    { czech: "citrónová šťáva", english: "lemon juice" },
    { czech: "čočka", english: "lentils" },
    { czech: "salát", english: "lettuce" },
    { czech: "limetka", english: "lime" },
    { czech: "makaróny", english: "macaroni" },
    { czech: "makrela", english: "mackerel" },
    { czech: "javorový sirup", english: "maple syrup" },
    { czech: "marcipán", english: "marzipan" },
    { czech: "majonéza", english: "mayonnaise" },
    { czech: "mléko", english: "milk" },
    { czech: "mleté maso", english: "minced beef" },
    { czech: "máta", english: "mint" },
    { czech: "mozzarella", english: "mozzarella" },
    { czech: "houby", english: "mushrooms" },
    { czech: "mušle", english: "mussels" },
    { czech: "hořčice", english: "mustard" },
    { czech: "muškátový oříšek", english: "nutmeg" },
    { czech: "ovesné vločky", english: "oats" },
    { czech: "olej", english: "oil" },
    { czech: "olivový olej", english: "olive oil" },
    { czech: "olivy", english: "olives" },
    { czech: "cibule", english: "onion" },
    { czech: "pomeranč", english: "orange" },
    { czech: "oregano", english: "oregano" },
    { czech: "parmazán", english: "parmesan" },
    { czech: "petržel", english: "parsley" },
    { czech: "těstoviny", english: "pasta" },
    { czech: "broskev", english: "peach" },
    { czech: "arašídové máslo", english: "peanut butter" },
    { czech: "arašídy", english: "peanuts" },
    { czech: "hruška", english: "pear" },
    { czech: "hrášek", english: "peas" },
    { czech: "pekanové ořechy", english: "pecan nuts" },
    { czech: "pepř", english: "pepper" },
    { czech: "pesto", english: "pesto" },
    { czech: "nakládané okurky", english: "pickles" },
    { czech: "piniové oříšky", english: "pine nuts" },
    { czech: "ananas", english: "pineapple" },
    { czech: "pistácie", english: "pistachios" },
    { czech: "pita chléb", english: "pita bread" },
    { czech: "švestky", english: "plums" },
    { czech: "granátové jablko", english: "pomegranate" },
    { czech: "popcorn", english: "popcorn" },
    { czech: "brambory", english: "potatoes" },
    { czech: "krevety", english: "prawns" },
    { czech: "prosciutto", english: "prosciutto" },
    { czech: "dýně", english: "pumpkin" },
    { czech: "ředkvičky", english: "radishes" },
    { czech: "rozinky", english: "raisins" },
    { czech: "maliny", english: "raspberries" },
    { czech: "červená cibule", english: "red onion" },
    { czech: "rýže", english: "rice" },
    { czech: "ricotta", english: "ricotta" },
    { czech: "rozmarýn", english: "rosemary" },
    { czech: "rum", english: "rum" },
    { czech: "šafrán", english: "saffron" },
    { czech: "salám", english: "salami" },
    { czech: "sůl", english: "salt" },
    { czech: "sardinky", english: "sardines" },
    { czech: "klobása", english: "sausage" },
    { czech: "mořské plody", english: "seafood" },
    { czech: "sezamová semínka", english: "sesame seeds" },
    { czech: "šalotka", english: "shallots" },
    { czech: "krevety drobné", english: "shrimp" },
    { czech: "uzený losos", english: "smoked salmon" },
    { czech: "zakysaná smetana", english: "sour cream" },
    { czech: "sójová omáčka", english: "soy sauce" },
    { czech: "špagety", english: "spaghetti" },
    { czech: "špenát", english: "spinach" },
    { czech: "jarní cibulka", english: "spring onions" },
    { czech: "jahody", english: "strawberries" },
    { czech: "cukr", english: "sugar" },
    { czech: "slunečnicová semínka", english: "sunflower seeds" },
    { czech: "sladké brambory", english: "sweet potatoes" },
    { czech: "tabasco", english: "tabasco" },
    { czech: "tymián", english: "thyme" },
    { czech: "tofu", english: "tofu" },
    { czech: "rajčata", english: "tomato" },
    { czech: "rajčatový protlak", english: "tomato puree" },
    { czech: "tortilla", english: "tortillas" },
    { czech: "tuňák", english: "tuna" },
    { czech: "krůta", english: "turkey" },
    { czech: "kurkuma", english: "turmeric" },
    { czech: "tuřín", english: "turnip" },
    { czech: "vanilka", english: "vanilla" },
    { czech: "vanilkový extrakt", english: "vanilla extract" },
    { czech: "telecí maso", english: "veal" },
    { czech: "rostlinný olej", english: "vegetable oil" },
    { czech: "ocet", english: "vinegar" },
    { czech: "vlašské ořechy", english: "walnuts" },
    { czech: "voda", english: "water" },
    { czech: "meloun", english: "watermelon" },
    { czech: "pšeničná mouka", english: "wheat" },
    { czech: "šlehačka", english: "whipping cream" },
    { czech: "bílé víno", english: "white wine" },
    { czech: "celozrnná mouka", english: "whole wheat" },
    { czech: "divoká rýže", english: "wild rice" },
    { czech: "víno", english: "wine" },
    { czech: "worcestrová omáčka", english: "worcestershire sauce" },
    { czech: "droždí", english: "yeast" },
    { czech: "žlutá cibule", english: "yellow onion" },
    { czech: "jogurt", english: "yogurt" },
    { czech: "cuketa", english: "zucchini" },
    { czech: "kuřecí prsa", english: "chicken breasts" },
    { czech: "jablečný ocet", english: "apple cider vinegar" },
    { czech: "chřest", english: "asparagus" },
    { czech: "balsamikový ocet", english: "balsamic vinegar" },
    { czech: "bacon", english: "bacon" },
    { czech: "slanina", english: "bacon" },
    { czech: "prášek do pečiva", english: "baking powder" },
    { czech: "jedlá soda", english: "baking soda" },
    { czech: "hovězí vývar", english: "beef broth" },
    { czech: "kuřecí vývar", english: "chicken broth" },
    { czech: "zeleninový vývar", english: "vegetable broth" },
    { czech: "černé fazole", english: "black beans" },
    { czech: "kajenský pepř", english: "cayenne pepper" },
    { czech: "celerová nať", english: "celery sticks" },
    { czech: "čedar", english: "cheddar cheese" },
    { czech: "kuřecí stehna", english: "chicken thighs" },
    { czech: "kukuřičná mouka", english: "cornflour" },
    { czech: "kostka cukru", english: "cubed sugar" },
    { czech: "římský kmín", english: "cumin" },
    { czech: "dijonská hořčice", english: "dijon mustard" },
    { czech: "sušené droždí", english: "dried yeast" },
    { czech: "anglická hořčice", english: "english mustard" },
    { czech: "extra panenský olivový olej", english: "extra virgin olive oil" },
    { czech: "rybí filé", english: "fish" },
    { czech: "čerstvý zázvor", english: "fresh ginger" },
    { czech: "garam masala", english: "garam masala" },
    { czech: "hladká mouka", english: "plain flour" },
    { czech: "polohrubá mouka", english: "semi-coarse flour" },
    { czech: "hrubá mouka", english: "coarse flour" },
    { czech: "nízkotučné mléko", english: "semi-skimmed milk" },
    { czech: "plnotučné mléko", english: "whole milk" },
    { czech: "muškátový květ", english: "mace" },
    { czech: "panko strouhanka", english: "panko breadcrumbs" },
    { czech: "strouhanka", english: "breadcrumbs" },
    { czech: "paprika", english: "paprika" },
    { czech: "mletá paprika", english: "ground paprika" },
    { czech: "pálivá paprika", english: "cayenne" },
    { czech: "bílý pepř", english: "white pepper" },
    { czech: "červené víno", english: "red wine" },
    { czech: "červený ocet", english: "red wine vinegar" },
    { czech: "rýžový ocet", english: "rice vinegar" },
    { czech: "sezamový olej", english: "sesame oil" },
    { czech: "šalotky", english: "shallots" },
    { czech: "světlá sójová omáčka", english: "light soy sauce" },
    { czech: "třtinový cukr", english: "raw sugar" },
    { czech: "moučkový cukr", english: "icing sugar" },
    { czech: "krupicový cukr", english: "caster sugar" },
    { czech: "bílý cukr", english: "white sugar" },
    { czech: "rostlinný tuk", english: "shortening" },
    { czech: "vepřové sádlo", english: "pork lard" },
    { czech: "hřebíček mletý", english: "ground cloves" },
    { czech: "mletá skořice", english: "ground cinnamon" },
    { czech: "strouhaný kokos", english: "desiccated coconut" },
    { czech: "kondenzované mléko", english: "condensed milk" },
    { czech: "odtučněné mléko", english: "skimmed milk" },
    { czech: "sušené mléko", english: "milk powder" },
    { czech: "sójová omáčka tmavá", english: "dark soy sauce" }
];

// Předpočítané mapy pro O(1) vyhledávání (místo opakovaného .find() přes celé pole)
const czechToEnglishMap = new Map(INGREDIENTS_DB.map(i => [i.czech.toLowerCase(), i.english]));
const englishToCzechMap = new Map(INGREDIENTS_DB.map(i => [i.english.toLowerCase(), i.czech]));

/* ==============================================
   INICIALIZACE
   ============================================== */
document.addEventListener('DOMContentLoaded', () => {
    // Skrytí loading overlaye — DB je lokální, žádné async načítání není potřeba
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) loadingOverlay.style.display = 'none';

    if (ingredientsList) {
        loadIngredients();
    } else if (recipesGrid) {
        loadFavouriteRecipes();
    }

    if (addBtn) addBtn.addEventListener('click', addIngredient);

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => recipeModal.style.display = 'none');
    }
    window.addEventListener('click', (e) => {
        if (e.target === recipeModal) recipeModal.style.display = 'none';
    });

    initNewsletterForm();
});

/* ==============================================
   NEWSLETTER
   ============================================== */
function initNewsletterForm() {
    const newsletterForm  = document.getElementById('newsletterForm');
    const successMessage  = document.getElementById('successMessage');
    if (!newsletterForm) return;

    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const fields = {
            firstName: { el: document.getElementById('firstName'),   err: document.getElementById('firstNameError'),  check: v => v.trim() !== '' },
            lastName:  { el: document.getElementById('lastName'),    err: document.getElementById('lastNameError'),   check: v => v.trim() !== '' },
            email:     { el: document.getElementById('email'),       err: document.getElementById('emailError'),      check: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) },
            birthYear: { el: document.getElementById('birthYear'),   err: document.getElementById('birthYearError'),  check: v => { const y = parseInt(v, 10); return !isNaN(y) && y >= 1920 && y <= 2026; } },
        };

        let isValid = true;

        for (const { el, err, check } of Object.values(fields)) {
            const ok = check(el.value);
            err.style.display   = ok ? 'none'  : 'block';
            el.classList.toggle('input-error', !ok);
            if (!ok) isValid = false;
        }

        const gdprConsent = document.getElementById('gdprConsent');
        const gdprError   = document.getElementById('gdprError');
        if (!gdprConsent.checked) {
            gdprError.style.display = 'block';
            isValid = false;
        } else {
            gdprError.style.display = 'none';
        }

        if (!isValid) return;

        const preferences = [...document.querySelectorAll('input[name="preference"]:checked')].map(cb => cb.value);
        const subscriberData = {
            id:         Date.now(),
            firstName:  fields.firstName.el.value.trim(),
            lastName:   fields.lastName.el.value.trim(),
            email:      fields.email.el.value.trim().toLowerCase(),
            birthYear:  parseInt(fields.birthYear.el.value, 10),
            preferences,
            date:       new Date().toLocaleDateString('cs-CZ')
        };

        const subscribers = getFromStorage('newsletter_subscribers');
        if (subscribers.some(s => s.email === subscriberData.email)) {
            alert('Tento e-mail už je k odběru novinek přihlášen.');
            return;
        }

        subscribers.push(subscriberData);
        saveToStorage('newsletter_subscribers', subscribers);

        newsletterForm.style.display = 'none';
        successMessage.style.display = 'block';
    });
}

/* ==============================================
   HELPERS — LocalStorage
   ============================================== */
function getFromStorage(key) {
    try { return JSON.parse(localStorage.getItem(key)) || []; }
    catch { return []; }
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

/* ==============================================
   HELPERS — Řetězce
   ============================================== */
function removeAccents(text) {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function normalizeStr(str) {
    return removeAccents(str.toLowerCase().trim());
}

/* ==============================================
   PŘEKLAD — pouze přes lokální slovník
   (API odmítalo překládat větší objemy textu)
   ============================================== */
function translateWithApi(text, fromLang, toLang) {
    if (!text || !text.trim()) return Promise.resolve('');
    const controller = new AbortController();
    const timeoutId  = setTimeout(() => controller.abort(), 3000);
    return fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${fromLang}|${toLang}`,
        { signal: controller.signal }
    )
        .then(res => res.json())
        .then(data => { clearTimeout(timeoutId); return data?.responseData?.translatedText?.trim() || text; })
        .catch(() => { clearTimeout(timeoutId); return text; });
}

/* Extrakce ingrediencí z raw meal objektu (EN) */
function extractRawIngredients(meal) {
    const result = [];
    for (let i = 1; i <= 20; i++) {
        const ing  = meal[`strIngredient${i}`];
        const meas = meal[`strMeasure${i}`];
        if (ing && ing.trim()) result.push({ ingredient: ing.trim(), measure: meas ? meas.trim() : '' });
    }
    return result;
}

/* Přeloží ingredience přes lokální slovník, zbytek přes API */
async function translateIngredients(rawIngredients) {
    return Promise.all(rawIngredients.map(async ({ ingredient, measure }) => {
        const localCz = englishToCzechMap.get(ingredient.toLowerCase());
        const czIng   = localCz || await translateWithApi(ingredient, 'en', 'cs');
        const czMeas  = measure ? await translateWithApi(measure, 'en', 'cs') : '';
        return { ingredient: czIng, measure: czMeas };
    }));
}

/* Přeloží celý recept — metadata + postup po větách */
async function translateRecipe(meal) {
    try {
        const [strMeal, strCategory, strArea] = (
            await translateWithApi([meal.strMeal, meal.strCategory || 'Neznámá', meal.strArea || 'Neznámá'].join(' ||| '), 'en', 'cs')
        ).split(/\s*\|\|\|\s*/);

        let strInstructions = '';
        if (meal.strInstructions) {
            const sentences = meal.strInstructions.split(/(?<=[.!?])\s+/);
            const chunks    = [];
            let   current   = '';
            for (const s of sentences) {
                if ((current + ' ' + s).length > 400) {
                    if (current.trim()) chunks.push(await translateWithApi(current.trim(), 'en', 'cs'));
                    current = s;
                } else {
                    current += (current ? ' ' : '') + s;
                }
            }
            if (current.trim()) chunks.push(await translateWithApi(current.trim(), 'en', 'cs'));
            strInstructions = chunks.join(' ');
        }

        const rawIngredients       = extractRawIngredients(meal);
        const extractedIngredients = await translateIngredients(rawIngredients);

        return {
            idMeal: meal.idMeal,
            strMeal:      strMeal      || meal.strMeal,
            strMealThumb: meal.strMealThumb,
            strCategory:  strCategory  || 'Neznámá',
            strArea:      strArea      || 'Neznámá',
            strInstructions,
            extractedIngredients
        };
    } catch (e) {
        console.error('Chyba překladače, vracím EN data:', e);
        return null;
    }
}

/* EN záložní objekt (pokud překlad selže) */
function buildFallbackMeal(rawMeal, labelSuffix = '') {
    return {
        idMeal:       rawMeal.idMeal,
        strMeal:      rawMeal.strMeal,
        strMealThumb: rawMeal.strMealThumb,
        strCategory:  (rawMeal.strCategory || 'Unknown') + labelSuffix,
        strArea:      (rawMeal.strArea      || 'Unknown') + labelSuffix,
        strInstructions: rawMeal.strInstructions || '',
        extractedIngredients: extractRawIngredients(rawMeal)
    };
}

/* ==============================================
   LEVENSHTEIN — oprava překlepy v CS vstupu
   ============================================== */
function levenshtein(a, b) {
    const ca = normalizeStr(a), cb = normalizeStr(b);
    const m  = [];
    for (let i = 0; i <= cb.length; i++) m[i] = [i];
    for (let j = 0; j <= ca.length; j++) m[0][j] = j;
    for (let i = 1; i <= cb.length; i++) {
        for (let j = 1; j <= ca.length; j++) {
            m[i][j] = cb[i-1] === ca[j-1]
                ? m[i-1][j-1]
                : 1 + Math.min(m[i-1][j-1], m[i][j-1], m[i-1][j]);
        }
    }
    return m[cb.length][ca.length];
}

function checkAndValidateCzechIngredient(userInput) {
    const cleanUser = normalizeStr(userInput);
    if (!cleanUser) return null;

    // Přesná shoda přes předpočítanou mapu
    for (const item of INGREDIENTS_DB) {
        if (normalizeStr(item.czech) === cleanUser) return item.czech;
    }

    // Nejbližší shoda přes Levenshtein
    let bestItem = null, minDist = 999;
    for (const item of INGREDIENTS_DB) {
        const d = levenshtein(cleanUser, item.czech);
        if (d < minDist) { minDist = d; bestItem = item; }
    }

    if (bestItem && minDist <= 2 && cleanUser[0] === normalizeStr(bestItem.czech)[0]) {
        return confirm(`Ingredience „${userInput}" nebyla nalezena.\nNemysleli jste: „${bestItem.czech}"?`)
            ? bestItem.czech : null;
    }

    return confirm(`Ingredience „${userInput}" není v našem seznamu. Chcete ji přesto přidat?`)
        ? userInput : null;
}

/* ==============================================
   OBLÍBENÉ RECEPTY (Favourites.html)
   ============================================== */
function loadFavouriteRecipes() {
    if (!recipesGrid) return;
    const favourites = getFromStorage('favourite_recipes');
    if (favourites.length === 0) {
        recipesGrid.innerHTML = '<p class="empty-recipes-text">Zatím nemáte žádné oblíbené recepty.</p>';
        return;
    }
    displayRecipes(favourites);
}

/* ==============================================
   SPRÁVA LEDNICE
   ============================================== */
function loadIngredients() {
    if (!ingredientsList) return;
    const ingredients = getFromStorage('fridge_ingredients');
    ingredientsList.innerHTML = '';

    if (ingredients.length === 0) {
        ingredientsList.innerHTML = '<p class="empty-fridge-text">Lednice je prázdná</p>';
        if (recipesGrid) recipesGrid.innerHTML = '<p class="empty-recipes-text">Přidejte ingredience pro vyhledání receptů.</p>';
        return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    ingredients.forEach((item, index) => {
        const expiryDate = new Date(item.year, item.month - 1, item.day);
        expiryDate.setHours(0, 0, 0, 0);
        const isExpired = today > expiryDate;

        const itemDiv = document.createElement('div');
        itemDiv.className = `fridge-item${isExpired ? ' expired' : ''}`;
        itemDiv.innerHTML = `
            <div class="fridge-item-summary">
                <span class="item-name">${item.name}${isExpired ? ' ⚠️' : ''}</span>
            </div>
            <div class="fridge-item-details">
                <span class="item-expiry">Exp: ${item.day}.${item.month}.${item.year}</span>
                <button class="btn-delete" data-index="${index}">❌</button>
            </div>`;

        itemDiv.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-delete')) return;
            itemDiv.querySelector('.fridge-item-details').classList.toggle('active');
        });

        ingredientsList.appendChild(itemDiv);
    });

    ingredientsList.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', (e) => deleteIngredient(e.target.dataset.index));
    });

    fetchRecipes(ingredients);
}

function addIngredient() {
    const rawName   = ingredientInput?.value.trim();
    const dayStr    = expirationDay?.value.trim();
    const monthStr  = expirationMonth?.value.trim();
    const yearStr   = expirationYear?.value.trim();

    if (!rawName || !dayStr || !monthStr || !yearStr) {
        alert('Prosím, vyplňte název ingredience i celé datum expirace.');
        return;
    }

    const validatedName = checkAndValidateCzechIngredient(rawName);
    if (!validatedName) return;

    const day   = parseInt(dayStr,   10);
    const month = parseInt(monthStr, 10);
    const year  = parseInt(yearStr,  10);

    if (month < 1 || month > 12 || year < 1 || year > 9999) {
        alert('Zkontrolujte rozsah měsíce a roku.');
        return;
    }

    const testDate = new Date(year, month - 1, day);
    if (testDate.getFullYear() !== year || testDate.getMonth() + 1 !== month || testDate.getDate() !== day) {
        alert(`Zadaný měsíc nemá ${day} dnů.`);
        return;
    }

    const ingredients = getFromStorage('fridge_ingredients');
    ingredients.push({ name: validatedName, day, month, year });
    saveToStorage('fridge_ingredients', ingredients);

    ingredientInput.value = '';
    expirationDay.value   = '';
    expirationMonth.value = '';
    expirationYear.value  = '';

    loadIngredients();
}

function deleteIngredient(index) {
    const ingredients = getFromStorage('fridge_ingredients');
    ingredients.splice(Number(index), 1);
    saveToStorage('fridge_ingredients', ingredients);
    loadIngredients();
}

/* ==============================================
   VYHLEDÁVÁNÍ RECEPTŮ
   ============================================== */
async function fetchRecipes(ingredients) {
    if (!recipesGrid) return;
    recipesGrid.innerHTML = '<p class="loading-text">Analyzuji vaši lednici bleskovou rychlostí...</p>';

    try {
        // Přeložíme CS → EN pro dotaz na API, duplicitní suroviny odstraníme
        const fridgeEnglishNames = [...new Set(
            ingredients.map(ing => czechToEnglishMap.get(ing.name.toLowerCase()) || ing.name.toLowerCase())
        )];

        // Paralelní hledání receptů dle každé ingredience
        const searchResults = await Promise.all(
            fridgeEnglishNames.map(en =>
                fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${en}`)
                    .then(r => r.json())
                    .then(d => d.meals || [])
                    .catch(() => [])
            )
        );

        const uniqueIds = [...new Set(searchResults.flat().map(m => m.idMeal))];

        if (uniqueIds.length === 0) {
            recipesGrid.innerHTML = '<p class="empty-recipes-text">Pro tyto ingredience nebyly nalezeny žádné recepty.</p>';
            return;
        }

        // Detaily receptů + počítání shod s lednicí
        const detailedRecipes = (await Promise.all(
            uniqueIds.map(id =>
                fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
                    .then(r => r.json())
                    .then(d => {
                        const meal = d.meals?.[0];
                        if (!meal) return null;

                        // Celkový počet ingrediencí receptu
                        let totalCount = 0;
                        for (let i = 1; i <= 20; i++) {
                            if (meal[`strIngredient${i}`]?.trim()) totalCount++;
                        }

                        // Kolik ingrediencí receptu pokrývá lednice
                        let matchCount = 0;
                        for (let i = 1; i <= 20; i++) {
                            const ri = meal[`strIngredient${i}`]?.toLowerCase().trim();
                            if (!ri) continue;
                            const covered = fridgeEnglishNames.some(fridgeIng =>
                                ri.includes(fridgeIng) || fridgeIng.includes(ri)
                            );
                            if (covered) matchCount++;
                        }

                        return {
                            idMeal: meal.idMeal,
                            strMeal: meal.strMeal,
                            strMealThumb: meal.strMealThumb,
                            usedFridgeCount: matchCount,
                            totalIngredients: totalCount,
                            hasAll: totalCount > 0 && matchCount >= totalCount
                        };
                    })
                    .catch(() => null)
            )
        )).filter(Boolean);

        detailedRecipes.sort((a, b) => (b.hasAll - a.hasAll) || (b.usedFridgeCount - a.usedFridgeCount));
        displayRecipes(detailedRecipes);

    } catch (err) {
        console.error('Chyba při načítání receptů:', err);
        recipesGrid.innerHTML = '<p class="empty-recipes-text">Došlo k chybě při načítání receptů.</p>';
    }
}

/* ==============================================
   ZOBRAZENÍ KARET RECEPTŮ
   ============================================== */
function displayRecipes(meals) {
    if (!recipesGrid) return;
    recipesGrid.innerHTML = '';

    if (!meals.length) {
        recipesGrid.innerHTML = '<p class="empty-recipes-text">Pro tyto ingredience nebyly nalezeny žádné recepty.</p>';
        return;
    }

    const favourites = getFromStorage('favourite_recipes');

    meals.forEach(meal => {
        const isFav = favourites.some(f => f.idMeal === meal.idMeal);
        const count = meal.usedFridgeCount;
        let countText;
        if (count === undefined) {
            countText = 'Zobrazení z oblíbených';
        } else if (meal.hasAll) {
            countText = `✅ Máte všechny suroviny! (${count} z ${meal.totalIngredients})`;
        } else {
            countText = `Využije z lednice: <strong>${count}</strong> z ${meal.totalIngredients} ${count === 1 ? 'surovinu' : count >= 2 && count <= 4 ? 'suroviny' : 'surovin'}`;
        }

        const card = document.createElement('div');
        card.className = `recipe-card${meal.hasAll ? ' has-all-ingredients' : ''}`;
        card.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="recipe-img">
            <div class="recipe-info">
                <h4>${meal.strMeal}</h4>
                <p class="recipe-ingredient-counter${meal.hasAll ? ' counter-complete' : ''}">${countText}</p>
                <div class="recipe-meta">
                    <p class="recipe-category">ID: ${meal.idMeal}</p>
                    <button class="btn-fav ${isFav ? 'is-favourite' : ''}"
                        data-id="${meal.idMeal}"
                        data-title="${meal.strMeal}"
                        data-thumb="${meal.strMealThumb}">♥</button>
                </div>
            </div>`;

        card.addEventListener('click', (e) => {
            if (!e.target.classList.contains('btn-fav')) openRecipeDetail(meal.idMeal);
        });

        recipesGrid.appendChild(card);
    });

    // Obsluha tlačítek oblíbených
    recipesGrid.querySelectorAll('.btn-fav').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.stopPropagation();
            const id   = btn.dataset.id;
            const favs = getFromStorage('favourite_recipes');
            const idx  = favs.findIndex(f => f.idMeal === id);

            if (idx > -1) {
                favs.splice(idx, 1);
                btn.classList.remove('is-favourite');
                if (!ingredientsList) {
                    btn.closest('.recipe-card').remove();
                    if (!recipesGrid.querySelector('.recipe-card'))
                        recipesGrid.innerHTML = '<p class="empty-recipes-text">Zatím nemáte žádné oblíbené recepty.</p>';
                }
            } else {
                btn.innerText = '⏳';
                try {
                    const data   = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`).then(r => r.json());
                    const raw    = data.meals?.[0];
                    if (raw) {
                        const translated = await translateRecipe(raw);
                        favs.push(translated || buildFallbackMeal(raw));
                        btn.classList.add('is-favourite');
                    }
                } catch (err) {
                    console.error('Nepodařilo se uložit recept:', err);
                } finally {
                    btn.innerText = '♥';
                }
            }

            saveToStorage('favourite_recipes', favs);
        });
    });
}

/* ==============================================
   DETAIL RECEPTU (modal)
   ============================================== */
async function openRecipeDetail(idMeal) {
    modalBody.innerHTML = '<p class="loading-text">Načítám a připravuji recept...</p>';
    recipeModal.style.display = 'block';

    try {
        const favourites = getFromStorage('favourite_recipes');
        const cached     = favourites.find(f => f.idMeal === idMeal);
        let   meal       = cached?.extractedIngredients ? cached : null;

        if (!meal) {
            const data = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`).then(r => r.json());
            const raw  = data.meals?.[0];
            if (!raw) throw new Error('Recept nenalezen');
            meal = (await translateRecipe(raw)) || buildFallbackMeal(raw, ' (EN)');
        }

        const ingredientsHTML = meal.extractedIngredients
            .map(({ ingredient, measure }) => `<li>${ingredient}${measure ? ` - <small>${measure}</small>` : ''}</li>`)
            .join('');

        modalBody.innerHTML = `
            <div class="modal-recipe-header">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <h2>${meal.strMeal}</h2>
                <p><strong>Kategorie:</strong> ${meal.strCategory} | <strong>Oblast:</strong> ${meal.strArea}</p>
            </div>
            <div class="modal-recipe-content">
                <h3>Co budete potřebovat:</h3>
                <ul>${ingredientsHTML}</ul>
                <h3>Postup přípravy:</h3>
                <p class="recipe-instructions">${meal.strInstructions.replace(/\n/g, '<br>')}</p>
            </div>
            <hr>
            <div class="comments-section">
                <h3>Vaše poznámky a komentáře</h3>
                <div id="commentsList" class="comments-list"></div>
                <div class="comment-form">
                    <textarea id="commentText" placeholder="Napište svůj komentář k receptu..."></textarea>
                    <button id="submitCommentBtn" class="btn-add">Přidat komentář</button>
                </div>
            </div>`;

        loadComments(idMeal);
        document.getElementById('submitCommentBtn').addEventListener('click', () => saveComment(idMeal));
        document.getElementById('commentsList').addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-delete-comment'))
                deleteComment(idMeal, parseInt(e.target.dataset.commentId, 10));
        });

    } catch (err) {
        modalBody.innerHTML = '<p class="empty-recipes-text">Nepodařilo se načíst detaily receptu.</p>';
        console.error(err);
    }
}

/* ==============================================
   KOMENTÁŘE
   ============================================== */
function loadComments(idMeal) {
    const commentsList = document.getElementById('commentsList');
    if (!commentsList) return;

    const allComments = JSON.parse(localStorage.getItem('recipe_comments') || '{}');
    let comments      = allComments[idMeal] || [];
    let dirty         = false;

    // Migrace starého formátu (string → objekt)
    comments = comments.map((c, i) => {
        if (typeof c === 'string') { dirty = true; return { id: Date.now() + i, text: c, date: 'Starší komentář' }; }
        return c;
    });

    if (dirty) {
        allComments[idMeal] = comments;
        localStorage.setItem('recipe_comments', JSON.stringify(allComments));
    }

    if (!comments.length) {
        commentsList.innerHTML = '<p class="no-comments">K tomuto receptu zatím nejsou žádné komentáře.</p>';
        return;
    }

    commentsList.innerHTML = comments.map(c => `
        <div class="comment-item">
            <div class="comment-content">
                <p class="comment-body">${c.text}</p>
                <span class="comment-date">${c.date}</span>
            </div>
            <button class="btn-delete-comment" data-comment-id="${c.id}">❌</button>
        </div>`).join('');
}

function saveComment(idMeal) {
    const textarea = document.getElementById('commentText');
    const text     = textarea?.value.trim();
    if (!text) return;

    const allComments = JSON.parse(localStorage.getItem('recipe_comments') || '{}');
    if (!allComments[idMeal]) allComments[idMeal] = [];
    allComments[idMeal].push({ id: Date.now(), text, date: new Date().toLocaleString('cs-CZ') });
    localStorage.setItem('recipe_comments', JSON.stringify(allComments));

    textarea.value = '';
    loadComments(idMeal);
}

function deleteComment(idMeal, commentId) {
    const allComments = JSON.parse(localStorage.getItem('recipe_comments') || '{}');
    if (!allComments[idMeal]) return;

    allComments[idMeal] = allComments[idMeal].filter(c => c.id !== commentId);
    if (!allComments[idMeal].length) delete allComments[idMeal];

    localStorage.setItem('recipe_comments', JSON.stringify(allComments));
    loadComments(idMeal);
}