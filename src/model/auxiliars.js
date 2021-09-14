
import { COUNTRIES, FLAGS_URL, FLAGS_FORMAT } from '../model/constants'

function stringToID(string){
    return string.trim().toLowerCase().replace(" ", "-").replace("/", "-");
}

export {stringToID};

function stringToTittleCase(string){
    string = string.trim();
    if (string !== "") string = string.split(" ").map(word => word[0].toUpperCase()+word.slice(1)).join(" ");
    return string;
}

export {stringToTittleCase};

function capitalize(string){
    string = string.trim();
    if (string !== "") string = string[0].toUpperCase()+string.slice(1);
    return string;

}
export {capitalize}

function getRandomNumber(range=1000000){
    return ~~(Math.random()*range)
}
export {getRandomNumber};

function countryFlagURL(countryName){
    return FLAGS_URL + COUNTRIES[countryName].code.toLowerCase() + FLAGS_FORMAT;
}
export {countryFlagURL};