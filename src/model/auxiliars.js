function stringToID(string){
    return string.trim().toLowerCase().replace(" ", "-").replace("/", "-");
}

export {stringToID};

function stringToTittleCase(string){
    return string.replace(/\b[a-z]/g, (x) => x.toUpperCase());
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