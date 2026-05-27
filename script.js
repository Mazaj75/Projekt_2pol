// === HTML ELEMENTY ===
const ingredientInput = document.getElementById('ingredientInput') || document.getElementById('mobileIngredientInput');
const ingredientsList = document.getElementById('ingredientsList') || document.getElementById('mobileIngredientsList');
const expirationDay = document.getElementById('dateOfExpirationDay');
const expirationMonth = document.getElementById('dateOfExpirationMonth');
const expirationYear = document.getElementById('dateOfExpirationYear');
const addBtn = document.getElementById('addBtn');
const recipesGrid = document.querySelector('.recipes-grid');
const loadingOverlay = document.getElementById('loadingOverlay');
const loadingText = document.getElementById('loadingText');

// Prvky vyskakovacího okna (modalu)
const recipeModal = document.getElementById('recipeModal');
const modalBody = document.getElementById('modalRecipeBody');
const closeModalBtn = document.querySelector('.close-modal');

// Naše lokální databáze ingrediencí: dvojice { czech: "...", english: "..." }
let localIngredientsDb = [];
let isDbReady = false;

const translatedIngredientsToCzech = [
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
    { czech: "javorový sirup", english: "maple syrup" },
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
    { czech: "sójová omáčka", english: "dark soy sauce" },
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
    { czech: "sušené mléko", english: "milk powder" }
];

document.addEventListener('DOMContentLoaded', () => {
    initIngredientsDatabase();

    if (ingredientsList) {
        loadIngredients();
    } else if (recipesGrid) {
        loadFavouriteRecipes();
    }

    if (addBtn) addBtn.addEventListener('click', addIngredient);
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => recipeModal.style.display = "none");
    }
    window.addEventListener('click', (e) => {
        if (e.target === recipeModal) recipeModal.style.display = "none";
    });

    const newsletterForm = document.getElementById('newsletterForm');
    const successMessage = document.getElementById('successMessage');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const firstName = document.getElementById('firstName');
            const lastName = document.getElementById('lastName');
            const email = document.getElementById('email');
            const birthYear = document.getElementById('birthYear');
            const gdprConsent = document.getElementById('gdprConsent');

            const firstNameError = document.getElementById('firstNameError');
            const lastNameError = document.getElementById('lastNameError');
            const emailError = document.getElementById('emailError');
            const birthYearError = document.getElementById('birthYearError');
            const gdprError = document.getElementById('gdprError');

            let isValid = true;

            function validateField(inputElement, errorElement, condition) {
                if (condition) {
                    errorElement.style.display = 'none';
                    inputElement.classList.remove('input-error');
                } else {
                    errorElement.style.display = 'block';
                    inputElement.classList.add('input-error');
                    isValid = false;
                }
            }

            validateField(firstName, firstNameError, firstName.value.trim() !== '');
            validateField(lastName, lastNameError, lastName.value.trim() !== '');

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            validateField(email, emailError, emailPattern.test(email.value.trim()));

            const yearValue = parseInt(birthYear.value, 10);
            validateField(birthYear, birthYearError, !isNaN(yearValue) && yearValue >= 1920 && yearValue <= 2026);

            if (gdprConsent.checked) {
                gdprError.style.display = 'none';
            } else {
                gdprError.style.display = 'block';
                isValid = false;
            }

            if (isValid) {
                const selectedPreferences = [];
                const preferenceCheckboxes = document.querySelectorAll('input[name="preference"]:checked');
                preferenceCheckboxes.forEach(checkbox => {
                    selectedPreferences.push(checkbox.value);
                });

                const subscriberData = {
                    id: Date.now(),
                    firstName: firstName.value.trim(),
                    lastName: lastName.value.trim(),
                    email: email.value.trim().toLowerCase(),
                    birthYear: yearValue,
                    preferences: selectedPreferences,
                    date: new Date().toLocaleDateString('cs-CZ')
                };

                const currentSubscribers = JSON.parse(localStorage.getItem('newsletter_subscribers')) || [];
                const emailExists = currentSubscribers.some(sub => sub.email === subscriberData.email);
                
                if (emailExists) {
                    alert('Tento e-mail už je k odběru novinek přihlášen.');
                    return;
                }

                currentSubscribers.push(subscriberData);
                localStorage.setItem('newsletter_subscribers', JSON.stringify(currentSubscribers));

                newsletterForm.style.display = 'none';
                successMessage.style.display = 'block';
            }
        });
    }
});

// --- POMOCNÁ FUNKCE: Odstranění diakritiky ---
function removeAccents(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// --- POMOCNÁ FUNKCE: Překlad textu přes MyMemory API s Timeoutem (max 3 vteřiny) ---
async function translateText(text, fromLang, toLang) {
    if (!text || text.trim() === "") return "";
    
    // Vytvoříme timeout, aby překlad netrval věčně
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 vteřiny limit

    try {
        const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${fromLang}|${toLang}`, {
            signal: controller.signal
        });
        clearTimeout(timeoutId);
        const data = await res.json();
        
        if (data.responseData && data.responseData.translatedText) {
            return data.responseData.translatedText.trim();
        }
        return text;
    } catch (err) {
        clearTimeout(timeoutId);
        console.warn("Překlad vypršel nebo selhal, vracím původní text:", err);
        return text; 
    }
}

// --- BEZPEČNÝ CHUNKOVANÝ PŘEKLAD CELÉHO RECEPTU ---
async function translateRecipe(meal) {
    try {
        // 1. Překlad základních metadat
        const metaPackage = [
            meal.strMeal,
            meal.strCategory || "Neznámá",
            meal.strArea || "Neznámá"
        ].join(" ||| ");
        
        const translatedMeta = await translateText(metaPackage, 'en', 'cs');
        const metaParts = translatedMeta.split(/\s*\|\|\|\s*/);
        
        const strMeal = metaParts[0] || meal.strMeal;
        const strCategory = metaParts[1] || "Neznámá";
        const strArea = metaParts[2] || "Neznámá";

        // 2. Bezpečné kouskování postupu po větách (Max 400 znaků na dávku)
        let strInstructions = "";
        if (meal.strInstructions) {
            const sentences = meal.strInstructions.split(/(?<=[.!?])\s+/);
            let currentChunk = "";
            const translatedChunks = [];

            for (const sentence of sentences) {
                if ((currentChunk + " " + sentence).length > 400) {
                    if (currentChunk.trim()) {
                        const trans = await translateText(currentChunk.trim(), 'en', 'cs');
                        translatedChunks.push(trans);
                    }
                    currentChunk = sentence;
                } else {
                    currentChunk += (currentChunk ? " " : "") + sentence;
                }
            }
            if (currentChunk.trim()) {
                const trans = await translateText(currentChunk.trim(), 'en', 'cs');
                translatedChunks.push(trans);
            }
            strInstructions = translatedChunks.join(" ");
        }

        // 3. Extrakce a překlad ingrediencí a jednotek
        const rawIngredients = [];
        const rawMeasures = [];
        const extractedIngredients = [];

        for (let i = 1; i <= 20; i++) {
            const ing = meal[`strIngredient${i}`];
            const meas = meal[`strMeasure${i}`];
            if (ing && ing.trim() !== "") {
                rawIngredients.push(ing.trim());
                rawMeasures.push(meas ? meas.trim() : "");
            }
        }

        let translatedIngredients = [];
        if (rawIngredients.length > 0) {
            const ingTrans = await translateText(rawIngredients.join(" ||| "), 'en', 'cs');
            translatedIngredients = ingTrans.split(/\s*\|\|\|\s*/);
        }

        let translatedMeasures = [];
        if (rawMeasures.length > 0) {
            const measTrans = await translateText(rawMeasures.join(" ||| "), 'en', 'cs');
            translatedMeasures = measTrans.split(/\s*\|\|\|\s*/);
        }

        for (let i = 0; i < rawIngredients.length; i++) {
            // Zkusíme najít překlad v našem lokálním spolehlivém slovníku
            const localMatch = localIngredientsDb.find(item => item.english.toLowerCase() === rawIngredients[i].toLowerCase());
            const czIng = localMatch ? localMatch.czech : (translatedIngredients[i] || rawIngredients[i]);
            const czMeas = translatedMeasures[i] || rawMeasures[i] || "";
            
            extractedIngredients.push({ ingredient: czIng, measure: czMeas });
        }

        return {
            idMeal: meal.idMeal,
            strMeal,
            strMealThumb: meal.strMealThumb,
            strCategory,
            strArea,
            strInstructions,
            extractedIngredients
        };
    } catch (e) {
        console.error("Vnitřní chyba překladače, vracím původní EN data:", e);
        return null;
    }
}

// --- INICIALIZACE DATABÁZE (CACHE) ---
async function initIngredientsDatabase() {
    localIngredientsDb = translatedIngredientsToCzech;
    isDbReady = true;
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
        loadingOverlay.style.display = 'none';
    }
}

// --- POMOCNÁ FUNKCE: Výpočet Levenshteinovy vzdálenosti slov ---
function getLevenshteinDistance(a, b) {
    const cleanA = removeAccents(a.toLowerCase());
    const cleanB = removeAccents(b.toLowerCase());

    const matrix = [];
    for (let i = 0; i <= cleanB.length; i++) matrix[i] = [i];
    for (let j = 0; j <= cleanA.length; j++) matrix[0][j] = j;

    for (let i = 1; i <= cleanB.length; i++) {
        for (let j = 1; j <= cleanA.length; j++) {
            if (cleanB.charAt(i - 1) === cleanA.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j] + 1
                );
            }
        }
    }
    return matrix[cleanB.length][cleanA.length];
}

// --- KONTROLA A OPRAVA V ČESKÉM JAZYCE ---
function checkAndValidateCzechIngredient(userInput) {
    const cleanUser = removeAccents(userInput.toLowerCase().trim());
    if (!cleanUser) return null;

    const exactMatch = localIngredientsDb.find(item => removeAccents(item.czech.toLowerCase()) === cleanUser);
    if (exactMatch) {
        return exactMatch.czech; 
    }

    let bestMatchItem = null;
    let minDistance = 999;

    localIngredientsDb.forEach(item => {
        const distance = getLevenshteinDistance(cleanUser, item.czech);
        if (distance < minDistance) {
            minDistance = distance;
            bestMatchItem = item;
        }
    });

    if (bestMatchItem && minDistance <= 2 && cleanUser.charAt(0) === removeAccents(bestMatchItem.czech.toLowerCase()).charAt(0)) {
        const confirmCorrection = confirm(`Ingredience „${userInput}“ nebyla nalezena.\nNemysleli jste: „${bestMatchItem.czech}“?`);
        if (confirmCorrection) {
            return bestMatchItem.czech;
        }
    } else {
        const forceAdd = confirm(`Ingredience „${userInput}“ není v našem doporučeném seznamu receptů. Chcete ji přesto do lednice přidat?`);
        if (forceAdd) {
            return userInput; 
        }
    }
    return null;
}

function loadFavouriteRecipes() {
    if (!recipesGrid) return;
    const favourites = JSON.parse(localStorage.getItem('favourite_recipes')) || [];
    if (favourites.length === 0) {
        recipesGrid.innerHTML = '<p class="empty-recipes-text">Zatím nemáte žádné oblíbené recepty.</p>';
        return;
    }
    displayRecipes(favourites);
}

function loadIngredients() {
    const ingredients = JSON.parse(localStorage.getItem('fridge_ingredients')) || [];
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
        itemDiv.className = `fridge-item ${isExpired ? 'expired' : ''}`;
        itemDiv.innerHTML = `
            <div class="fridge-item-summary">
                <span class="item-name">${item.name} ${isExpired ? '⚠️' : ''}</span>
            </div>
            <div class="fridge-item-details">
                <span class="item-expiry">Exp: ${item.day}.${item.month}.${item.year}</span>
                <button class="btn-delete" data-index="${index}">❌</button>
            </div>
        `;
        
        itemDiv.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-delete')) return;
            toggleIngredientDetails(itemDiv);
        });

        ingredientsList.appendChild(itemDiv);
    });

    document.querySelectorAll('.btn-delete').forEach(button => {
        button.addEventListener('click', (e) => {
            const indexToDelete = e.target.getAttribute('data-index');
            deleteIngredient(indexToDelete);
        });
    });

    fetchRecipes(ingredients);
}

function toggleIngredientDetails(itemDiv) {
    const details = itemDiv.querySelector('.fridge-item-details');
    details.classList.toggle('active');
}

function addIngredient() {
    if (!isDbReady) {
        alert('Počkejte prosím na dokončení přípravy databáze ingrediencí.');
        return;
    }

    const rawName = ingredientInput.value.trim();
    const dayStr = expirationDay.value.trim();
    const monthStr = expirationMonth.value.trim();
    const yearStr = expirationYear.value.trim();
    
    if (!rawName || !dayStr || !monthStr || !yearStr) {
        alert('Prosím, vyplňte název ingredience i celé datum expirace.');
        return;
    }

    const validatedName = checkAndValidateCzechIngredient(rawName);
    if (!validatedName) return; 

    const day = parseInt(dayStr, 10);
    const month = parseInt(monthStr, 10);
    const year = parseInt(yearStr, 10);

    if (month < 1 || month > 12 || year < 1 || year > 9999) {
        alert('Zkontrolujte rozsah měsíce a roku.');
        return;
    }

    const testDate = new Date(year, month - 1, day);
    if (testDate.getFullYear() !== year || (testDate.getMonth() + 1) !== month || testDate.getDate() !== day) {
        alert(`Zadaný měsíc nemá ${day} dnů.`);
        return;
    }
    
    const newIngredient = { name: validatedName, day, month, year };
    const ingredients = JSON.parse(localStorage.getItem('fridge_ingredients')) || [];
    ingredients.push(newIngredient);
    localStorage.setItem('fridge_ingredients', JSON.stringify(ingredients));
    
    ingredientInput.value = '';
    expirationDay.value = '';
    expirationMonth.value = '';
    expirationYear.value = '';
    
    loadIngredients();
}

function deleteIngredient(index) {
    const ingredients = JSON.parse(localStorage.getItem('fridge_ingredients')) || [];
    ingredients.splice(index, 1);
    localStorage.setItem('fridge_ingredients', JSON.stringify(ingredients));
    loadIngredients();
}

async function fetchRecipes(ingredients) {
    if (!recipesGrid) return;
    recipesGrid.innerHTML = '<p class="loading-text">Analyzuji vaši lednici bleskovou rychlostí...</p>';
    
    try {
        const fridgeEnglishNames = ingredients.map(ing => {
            const match = localIngredientsDb.find(item => item.czech.toLowerCase() === ing.name.toLowerCase());
            return match ? match.english.toLowerCase() : ing.name.toLowerCase();
        });

        const searchPromises = fridgeEnglishNames.map(async (englishName) => {
            try {
                const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${englishName}`);
                const data = await res.json();
                return data.meals || [];
            } catch (err) {
                console.error("Chyba vyhledávání podle ingredience:", err);
                return [];
            }
        });

        const searchResults = await Promise.all(searchPromises);
        const uniqueMealIds = new Set();
        searchResults.flat().forEach(meal => uniqueMealIds.add(meal.idMeal));

        if (uniqueMealIds.size === 0) {
            recipesGrid.innerHTML = '<p class="empty-recipes-text">Pro tyto ingredience nebyly nalezeny žádné recepty.</p>';
            return;
        }

        const detailPromises = Array.from(uniqueMealIds).map(async (idMeal) => {
            try {
                const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
                const data = await res.json();
                if (!data.meals || !data.meals[0]) return null;
                
                const meal = data.meals[0];
                let matchingIngredientsCount = 0;

                fridgeEnglishNames.forEach(fridgeIng => {
                    let isIngredienceUsed = false;
                    for (let i = 1; i <= 20; i++) {
                        const recipeIng = meal[`strIngredient${i}`];
                        if (recipeIng && recipeIng.trim() !== "") {
                            const cleanRecipeIng = recipeIng.toLowerCase().trim();
                            if (cleanRecipeIng.includes(fridgeIng) || fridgeIng.includes(cleanRecipeIng)) {
                                isIngredienceUsed = true;
                                break;
                            }
                        }
                    }
                    if (isIngredienceUsed) {
                        matchingIngredientsCount++;
                    }
                });

                return {
                    idMeal: meal.idMeal,
                    strMeal: meal.strMeal,
                    strMealThumb: meal.strMealThumb,
                    usedFridgeCount: matchingIngredientsCount
                };
            } catch (err) {
                console.error("Chyba při stahování detailu receptu:", err);
                return null;
            }
        });

        const detailedRecipes = (await Promise.all(detailPromises)).filter(recipe => recipe !== null);
        detailedRecipes.sort((a, b) => b.usedFridgeCount - a.usedFridgeCount);
        displayRecipes(detailedRecipes);

    } catch (globalError) {
        console.error("Globální chyba při zpracování receptů:", globalError);
        recipesGrid.innerHTML = '<p class="empty-recipes-text">Došlo k chybě při načítání receptů.</p>';
    }
}

function displayRecipes(meals) {
    if (!recipesGrid) return;
    recipesGrid.innerHTML = '';

    if (meals.length === 0) {
        recipesGrid.innerHTML = '<p class="empty-recipes-text">Pro tyto ingredience nebyly nalezeny žádné recepty.</p>';
        return;
    }

    const favourites = JSON.parse(localStorage.getItem('favourite_recipes')) || [];

    meals.forEach(meal => {
        const isFav = favourites.some(fav => fav.idMeal === meal.idMeal);
        const card = document.createElement('div');
        card.className = 'recipe-card';
        
        const countText = meal.usedFridgeCount !== undefined 
            ? `Využije z lednice: <strong>${meal.usedFridgeCount}</strong> ${meal.usedFridgeCount === 1 ? 'surovinu' : (meal.usedFridgeCount >= 2 && meal.usedFridgeCount <= 4 ? 'suroviny' : 'surovin')}` 
            : `Zobrazení z oblíbených`;

        card.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="recipe-img">
            <div class="recipe-info">
                <h4>${meal.strMeal}</h4>
                <p class="recipe-ingredient-counter">${countText}</p>
                <div class="recipe-meta">
                    <p class="recipe-category">ID: ${meal.idMeal}</p>
                    <button class="btn-fav ${isFav ? 'is-favourite' : ''}" data-id="${meal.idMeal}" data-title="${meal.strMeal}" data-thumb="${meal.strMealThumb}">
                        ♥
                    </button>
                </div>
            </div>
        `;

        card.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-fav')) return;
            openRecipeDetail(meal.idMeal);
        });

        recipesGrid.appendChild(card);
    });

    // SPRÁVA TLAČÍTKA OBLÍBENÝCH S AUTOMATICKÝM UKLÁDÁNÍM PŘEKLADU DO CACHE
    document.querySelectorAll('.btn-fav').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.stopPropagation();
            const button = e.target;
            const idMeal = button.getAttribute('data-id');
            
            let favourites = JSON.parse(localStorage.getItem('favourite_recipes')) || [];
            const existingIndex = favourites.findIndex(fav => fav.idMeal === idMeal);
            
            if (existingIndex > -1) {
                // Odebírání z oblíbených
                favourites.splice(existingIndex, 1);
                button.classList.remove('is-favourite');
                if (!ingredientsList) {
                    button.closest('.recipe-card').remove();
                    if (favourites.length === 0) recipesGrid.innerHTML = '<p class="empty-recipes-text">Zatím nemáte žádné oblíbené recepty.</p>';
                }
                localStorage.setItem('favourite_recipes', JSON.stringify(favourites));
            } else {
                // Přidávání do oblíbených (Uloží přeloženou nebo záložní EN verzi pro offline režim)
                button.innerText = "⏳";
                try {
                    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
                    const data = await response.json();
                    if (data.meals && data.meals[0]) {
                        const rawMeal = data.meals[0];
                        // Pokus o překlad receptu před uložením
                        let finalMeal = await translateRecipe(rawMeal);
                        
                        // Fallback: Pokud překlad selhal nebo vrátil chybu, sestavíme bezpečný EN fallback objekt
                        if (!finalMeal) {
                            const extractedIngredients = [];
                            for (let i = 1; i <= 20; i++) {
                                const ing = rawMeal[`strIngredient${i}`];
                                const meas = rawMeal[`strMeasure${i}`];
                                if (ing && ing.trim() !== "") {
                                    extractedIngredients.push({ ingredient: ing.trim(), measure: meas ? meas.trim() : "" });
                                }
                            }
                            finalMeal = {
                                idMeal: rawMeal.idMeal,
                                strMeal: rawMeal.strMeal,
                                strMealThumb: rawMeal.strMealThumb,
                                strCategory: rawMeal.strCategory || "Unknown",
                                strArea: rawMeal.strArea || "Unknown",
                                strInstructions: rawMeal.strInstructions || "",
                                extractedIngredients
                            };
                        }
                        
                        favourites.push(finalMeal);
                        localStorage.setItem('favourite_recipes', JSON.stringify(favourites));
                        button.classList.add('is-favourite');
                    }
                } catch (err) {
                    console.error("Nepodařilo se uložit recept do offline cache:", err);
                } finally {
                    button.innerText = "♥";
                }
            }
        });
    });
}

// --- DETAIL RECEPTU S FAILLBACKEM A RYCHLOSTNÍ POJISTKOU ---
async function openRecipeDetail(idMeal) {
    modalBody.innerHTML = '<p class="loading-text">Načítám a připravuji recept...</p>';
    recipeModal.style.display = "block";

    try {
        // Podíváme se, jestli už recept nemáme uložený (a přeložený) v oblíbených
        const favourites = JSON.parse(localStorage.getItem('favourite_recipes')) || [];
        const cachedCzechMeal = favourites.find(fav => fav.idMeal === idMeal);

        let mealToDisplay = null;

        if (cachedCzechMeal && cachedCzechMeal.extractedIngredients) {
            mealToDisplay = cachedCzechMeal;
        } else {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
            const data = await response.json();
            if (!data.meals || !data.meals[0]) throw new Error("Recept nenalezen");
            
            const rawMeal = data.meals[0];
            
            // Zkusíme přeložit (vnitřní funkce má zabudovaný timeout na 3 vteřiny)
            mealToDisplay = await translateRecipe(rawMeal);
            
            // FALLBACK: Pokud překlad trval moc dlouho nebo selhal, použijeme bleskový anglický základ
            if (!mealToDisplay) {
                const extractedIngredients = [];
                for (let i = 1; i <= 20; i++) {
                    const ing = rawMeal[`strIngredient${i}`];
                    const meas = rawMeal[`strMeasure${i}`];
                    if (ing && ing.trim() !== "") {
                        extractedIngredients.push({ ingredient: ing.trim(), measure: meas ? meas.trim() : "" });
                    }
                }
                mealToDisplay = {
                    idMeal: rawMeal.idMeal,
                    strMeal: rawMeal.strMeal,
                    strMealThumb: rawMeal.strMealThumb,
                    strCategory: (rawMeal.strCategory || 'Neznámá') + " (EN)",
                    strArea: (rawMeal.strArea || 'Neznámá') + " (EN)",
                    strInstructions: rawMeal.strInstructions,
                    extractedIngredients
                };
            }
        }

        // Vygenerování HTML pro ingredience
        let ingredientsHTML = '';
        mealToDisplay.extractedIngredients.forEach(item => {
            ingredientsHTML += `<li>${item.ingredient} - <small>${item.measure}</small></li>`;
        });

        modalBody.innerHTML = `
            <div class="modal-recipe-header">
                <img src="${mealToDisplay.strMealThumb}" alt="${mealToDisplay.strMeal}">
                <h2>${mealToDisplay.strMeal}</h2>
                <p><strong>Kategorie:</strong> ${mealToDisplay.strCategory} | <strong>Oblast:</strong> ${mealToDisplay.strArea}</p>
            </div>
            <div class="modal-recipe-content">
                <h3>Co budete potřebovat:</h3>
                <ul>${ingredientsHTML}</ul>
                
                <h3>Postup přípravy:</h3>
                <p class="recipe-instructions">${mealToDisplay.strInstructions.replace(/\n/g, '<br>')}</p>
            </div>
            <hr>
            <div class="comments-section">
                <h3>Vaše poznámky a komentáře</h3>
                <div id="commentsList" class="comments-list"></div>
                <div class="comment-form">
                    <textarea id="commentText" placeholder="Napište svůj komentář k receptu..."></textarea>
                    <button id="submitCommentBtn" class="btn-add">Přidat komentář</button>
                </div>
            </div>
        `;

        loadComments(idMeal);

        document.getElementById('submitCommentBtn').addEventListener('click', () => {
            saveComment(idMeal);
        });

        document.getElementById('commentsList').addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-delete-comment')) {
                const commentId = parseInt(e.target.getAttribute('data-comment-id'), 10);
                deleteComment(idMeal, commentId);
            }
        });

    } catch (error) {
        modalBody.innerHTML = '<p class="empty-recipes-text">Nepodařilo se načíst detaily receptu.</p>';
        console.error(error);
    }
}

// === SPRÁVA POZNÁMEK A KOMENTÁŘŮ ===
function loadComments(idMeal) {
    const commentsList = document.getElementById('commentsList');
    const allComments = JSON.parse(localStorage.getItem('recipe_comments')) || {};
    let recipeComments = allComments[idMeal] || [];
    let databaseNeedsUpdate = false;

    commentsList.innerHTML = '';
    if (recipeComments.length === 0) {
        commentsList.innerHTML = '<p class="no-comments">K tomuto receptu zatím nejsou žádné komentáře.</p>';
        return;
    }

    recipeComments = recipeComments.map((comment, index) => {
        if (typeof comment === 'string') {
            databaseNeedsUpdate = true;
            return {
                id: Date.now() + index,
                text: comment,
                date: 'Starší komentář'
            };
        }
        return comment;
    });

    if (databaseNeedsUpdate) {
        allComments[idMeal] = recipeComments;
        localStorage.setItem('recipe_comments', JSON.stringify(allComments));
    }

    recipeComments.forEach(comment => {
        const commentDiv = document.createElement('div');
        commentDiv.className = 'comment-item';
        commentDiv.innerHTML = `
            <div class="comment-content">
                <p class="comment-body">${comment.text}</p>
                <span class="comment-date">${comment.date}</span>
            </div>
            <button class="btn-delete-comment" data-comment-id="${comment.id}">❌</button>
        `;
        commentsList.appendChild(commentDiv);
    });
}

function saveComment(idMeal) {
    const textarea = document.getElementById('commentText');
    const text = textarea.value.trim();
    if (!text) return;

    const allComments = JSON.parse(localStorage.getItem('recipe_comments')) || {};
    if (!allComments[idMeal]) allComments[idMeal] = [];

    const newComment = {
        id: Date.now(),
        text: text,
        date: new Date().toLocaleString('cs-CZ')
    };

    allComments[idMeal].push(newComment);
    localStorage.setItem('recipe_comments', JSON.stringify(allComments));
    
    textarea.value = '';
    loadComments(idMeal);
}

function deleteComment(idMeal, commentId) {
    const allComments = JSON.parse(localStorage.getItem('recipe_comments')) || {};
    if (!allComments[idMeal]) return;

    allComments[idMeal] = allComments[idMeal].filter(comment => comment.id !== commentId);

    if (allComments[idMeal].length === 0) {
        delete allComments[idMeal];
    }

    localStorage.setItem('recipe_comments', JSON.stringify(allComments));
    loadComments(idMeal);
}