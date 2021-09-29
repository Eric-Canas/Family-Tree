import COUNTRIES from "./countriesList";
import PROFESSIONS_LIST from "./professionsList";
import DISEASES_LIST from "./diseasesList";

const NODE_RELATIONS = ['Parent', 'Couple', 'Child'];
const FLAGS_URL = "https://lipis.github.io/flag-icon-css/flags/4x3/";
const FLAGS_FORMAT = '.svg';
const DEFAULT_AVATAR = "default-avatar.png";
const COUNTRIES_NAMES = Object.keys(COUNTRIES).sort();
const REGION_CODE_NAMES = { "142": "Asia", "143": "Central Asia", "145": "Western Asia", "150": "Europe", "151": "Eastern Europe", "154": "Northern Europe",
    "155": "Western Europe", "002": "Africa", "019": "Americas", "009": "Oceania", "039": "Southern Europe", "034": "Southern Asia", "029": "Caribbean",
    "017": "Middle Africa", "005": "South America", "061": "Polynesia", "053": "Australia and New Zealand", "011": "Western Africa", "014": "Eastern Africa",
    "021": "Northern America", "035": "South-Eastern Asia", "018": "Southern Africa", "013": "Central America", "030": "Eastern Asia", "015": "Northern Africa",
    "054": "Melanesia", "057": "Micronesia", "world": "World"};

const GENDERS = ["Unknown", "Female", "Male", "Non-Binary", "Transgender", "Genderless", "Other"];

export {NODE_RELATIONS, COUNTRIES, COUNTRIES_NAMES, FLAGS_URL, FLAGS_FORMAT, PROFESSIONS_LIST, DISEASES_LIST, DEFAULT_AVATAR, GENDERS, REGION_CODE_NAMES};