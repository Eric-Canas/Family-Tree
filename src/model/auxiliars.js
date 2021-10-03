
import { COUNTRIES, FLAGS_URL, FLAGS_FORMAT } from '../model/constants'
import { GENERAL_COLORS } from './components/charts/constants';

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

function countFrequencies(array){
    let frequenciesDict = {};
    for (const element of array){
        frequenciesDict[element] = element in frequenciesDict? frequenciesDict[element] + 1 :  1;
    }
    return frequenciesDict;
}

export {countFrequencies};

function getArgMaxKeyFromObject(obj){
    let maxKey = null;
    let maxValue = -Infinity;
    for (const [key, value] of Object.entries(obj)){
        if (maxValue < value){
            maxValue = value;
            maxKey = key;
        }
    }
    return maxKey;
}

export {getArgMaxKeyFromObject};

function buildChartData(frequencies, title = "Title not set", radius = '90%', colors = GENERAL_COLORS){
    const data = {
        labels: Object.keys(frequencies),
        datasets: [{
                label: title,
                data: Object.values(frequencies),
                backgroundColor: Object.entries(Object.keys(frequencies)).map((name, i) => colors(i, 0.75)),
                borderColor: Object.entries(Object.keys(frequencies)).map((name, i) => colors(i, 1)),
                borderWidth: 5,
                datalabels: {
                    font : { size : '20px'},
                    color: '#ddd',
                    formatter: (value, context) => context.chart.data.labels[context.dataIndex]
                },
                radius: radius
            }
        ],
    };
    return data;
}
export {buildChartData};

async function downloadFile (dataAsJSON, fileName="MyFamilyTree") {
    const json = JSON.stringify(dataAsJSON);
    const blob = new Blob([json],{type:'application/json'});
    const href = await URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = fileName + ".json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
export{downloadFile};

async function uploadTree () {
    const uploader = document.createElement('input');
    uploader.type = 'file';
    uploader.hidden = true;
    uploader.accept = "application/JSON";
    let jsonPromise = new Promise((resolve, reject) => {
        uploader.onchange = (event) => {
            const reader = new FileReader();
            reader.onload = () => resolve(JSON.parse(reader.result));
            reader.onabort = () => reject("File Reader aborted");
            reader.readAsText(event.target.files[0]);
            };
    });
    uploader.click();
    return jsonPromise;
}
export{uploadTree};

function getRandomNumber(range=100000000){
    return ~~(Math.random()*range)
}
export {getRandomNumber};

function countryFlagURL(countryName){
    return FLAGS_URL + COUNTRIES[countryName].code.toLowerCase() + FLAGS_FORMAT;
}
export {countryFlagURL};