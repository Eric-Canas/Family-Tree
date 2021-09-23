import COUNTRIES from "./countriesList";
import PROFESSIONS_LIST from "./professionsList";
import DISEASES_LIST from "./diseasesList";

const NODE_RELATIONS = ['Parent', 'Couple', 'Child'];
const FLAGS_URL = "https://lipis.github.io/flag-icon-css/flags/4x3/";
const FLAGS_FORMAT = '.svg';
const DEFAULT_AVATAR = "default-avatar.png";
const COUNTRIES_NAMES = Object.keys(COUNTRIES).sort();

const GENDERS = ["Unknown", "Female", "Male", "Non-Binary", "Transgender", "Genderless", "Other"]

export {NODE_RELATIONS, COUNTRIES, COUNTRIES_NAMES, FLAGS_URL, FLAGS_FORMAT, PROFESSIONS_LIST, DISEASES_LIST, DEFAULT_AVATAR, GENDERS};