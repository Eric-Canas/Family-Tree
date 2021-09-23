import { DEFAULT_AVATAR } from '../model/constants';
import { capitalize, countryFlagURL } from '../model/auxiliars';
import React from 'react';
import { Media } from 'reactstrap';
import { COUNTRIES } from '../model/constants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

class IndividualNode {
    constructor(id, node) {
        this.id = id;
        this.properties = {
            avatar: node.avatar || DEFAULT_AVATAR,
            name: node.name || null,
            surnames: node.surnames || [],
            bornDay: node.bornDay || null,
            bornMonth: node.bornMonth || null,
            bornYear: node.bornYear || null,
            alive: "alive" in node ? node.alive : true,
            defunctionDay: node.defunctionDay || null,
            defunctionMonth: node.defunctionMonth || null,
            defunctionYear: node.defunctionYear || null,
            gender: node.gender || "unknown",
            professions: node.professions || [],
            alias: node.alias || null,
            biography: node.biography || null,
            birthCountry: node.birthCountry || null,
            birthProvince: node.birthProvince || null,
            birthCity: node.birthCity || null,
            knownDiseases: node.knownDiseases || [],
            healthDetails: node.healthDetails || null,
            defunctionCountry: node.defunctionCountry || null,
            defunctionProvince: node.defunctionProvince || null,
            defunctionCity: node.defunctionCity || null,
            defunctionDisease: node.defunctionDisease || [],
            defunctionDetails: node.defunctionDetails || null,
            highlight: "highlight" in node ? node.highlight : false
        }

        this.relevantInformation = { location: this.locationAttention(), biography: node.biography !== null }

        console.log("Saved Node", this.properties);
    }

    locationAttention() {
        if (this.properties.birthCountry !== null && this.properties.defunctionCountry !== null
            && this.properties.birthCountry.toLowerCase() !== this.properties.defunctionCountry.toLowerCase()) {
            return "country";
        } else if (this.properties.birthProvince !== null && this.properties.defunctionProvince !== null
            && this.properties.birthProvince.toLowerCase() !== this.properties.defunctionProvince.toLowerCase()) {
            return "province"
        } else if (this.properties.birthCity !== null && this.properties.defunctionCity !== null
            && this.properties.birthCity.toLowerCase() !== this.properties.defunctionCity.toLowerCase()) {
            return "city"
        } else {
            return null;
        }
    }

    getDateAsString() {
        let dateString = "";
        let birthDateString = "";
        let birthDate = null;
        if (this.properties.bornYear) {
            birthDate = new Date(this.properties.bornYear, (this.properties.bornMonth || 1) - 1, this.properties.bornDay || 1);
            console.log("Birth Date", birthDate, this.properties.bornDay)
            birthDateString = (this.properties.bornDay || "") +
                (this.properties.bornMonth ? (" " + capitalize(birthDate.toLocaleString('default', { month: 'long' }))) + " " : "") +
                this.properties.bornYear;

        }
        let defunctionDateString = "";
        let defunctionDate = null;
        if (!this.properties.alive && this.properties.defunctionYear) {
            defunctionDate = new Date(this.properties.defunctionYear, (this.properties.defunctionMonth || 1) - 1, this.properties.defunctionDay || 1);
            defunctionDateString = (this.properties.defunctionDay || "") +
                (this.properties.defunctionMonth ? (" " + capitalize(defunctionDate.toLocaleString('default', { month: 'long' }))) + " " : "") +
                this.properties.defunctionYear;
            console.log("DEFUNCTION", defunctionDateString);
        }
        if (birthDate) {
            dateString = birthDateString + (defunctionDate !== null ? " - " + defunctionDateString : '');
            const age = ~~(((defunctionDate || Date.now()) - birthDate) / (1000 * 60 * 60 * 24 * 365));
            dateString += " (" + age + " years)";
        } else if (defunctionDate) {
            dateString = defunctionDateString;
        }
        return dateString;
    }

    getMovementComponent(){
        let locationComponent = null;
        switch (this.relevantInformation.location) {
            case "country":
                locationComponent = (<p>
                    <span>Emigration: </span> 
                    {this.properties.birthCountry in COUNTRIES ? 
                        <Media className="country-flag" src={countryFlagURL(this.properties.birthCountry)} alt={this.properties.birthCountry} />
                         : this.properties.birthCountry}
                         <FontAwesomeIcon icon={faArrowRight} className="arrow-icon"/>
                    {this.properties.defunctionCountry in COUNTRIES ? 
                <Media className="country-flag" src={countryFlagURL(this.properties.defunctionCountry)} alt={this.properties.defunctionCountry} />
                    : this.properties.defunctionCountry}
                </p>)
                break;
            case "province":
                locationComponent = (<p>
                    <span>Internal Relocation : </span> 
                    {this.properties.birthProvince}
                            <FontAwesomeIcon icon={faArrowRight} className="arrow-icon"/>
                    {this.properties.defunctionProvince}
                </p>)
                break;
            case "city":
                locationComponent = (<p>
                    <span>City Relocation : </span> 
                    {this.properties.birthCity}
                            <FontAwesomeIcon icon={faArrowRight} className="arrow-icon"/>
                    {this.properties.defunctionCity}
                </p>)
                break;

            default:
                return null;

        }

        return locationComponent;
    }

    getProfessionsComponent(){
        if(this.properties.professions.length > 0){
            return (<p><span>{"Profession"+(this.properties.professions.length > 1? "s":"")+": "}</span>
                             {this.properties.professions.join(", ")} </p>);
        } else {
            return null;
        }
    }

    getRelevantDataAsComponent() {
        return (
            <React.Fragment>
                {this.getMovementComponent()/*If there are no relevant movements returns null*/}
                {this.getProfessionsComponent()}
            </React.Fragment>
        );
        
    }

}
export default IndividualNode;