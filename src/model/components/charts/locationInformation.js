import React, { Component } from 'react';
import {Container, Row, Col} from 'reactstrap';
import { Doughnut } from 'react-chartjs-2';
import {Chart} from 'react-google-charts'
import { countFrequencies, getArgMaxKeyFromObject, buildChartData } from '../../auxiliars'
import { COUNTRIES } from '../../constants'

//TODO: When everyone is from same country, geochart have the possibility of showing provinces, but they have to be written in local names (Cataluña instead of Catalonia)
class LocationInformation extends Component {
    constructor(props) {
        super(props);
        this.charOptions = {plugins:
            { legend: {
                            display: false 
                        }
            }
        }
    }

    getMinCountryCode(countries){
        const minorRegions = new Set();
        const majorRegions = new Set();
        for (const country of countries){
            if (country in COUNTRIES){
                const countryInfo = COUNTRIES[country];
                minorRegions.add(countryInfo.minorRegion);
                majorRegions.add(countryInfo.majorRegion);
            }
        }
        if (minorRegions.size === 1) return minorRegions.keys().next().value;
        else if(majorRegions.size === 1) return minorRegions.keys().next().value;
        else return 'world';
    }

    getLocationPercentageByCountry(clean = true){
        let countries = Object.values(this.props.graph.nodes).map(node => node.properties.alive? node.properties.birthCountry : node.properties.defunctionCountry);
        if (clean) countries = countries.filter(country => country in COUNTRIES)
        const countryFreqs = countFrequencies(countries);
        return countryFreqs;
    }

    getProvinceInformation(onlyFrom = null){
        const provinces = Object.values(this.props.graph.nodes).map(node => node.properties.alive? node.properties.birthProvince : node.properties.defunctionProvince);
        const provinceFreqs = countFrequencies(provinces);
        let countries = onlyFrom? [onlyFrom] : Object.values(this.props.graph.nodes).map(node => node.properties.alive? node.properties.birthCountry : node.properties.defunctionCountry);
        const provincesInfo = []
        for (const country of new Set(countries)){
            if (country in COUNTRIES){
                for (const [province, info] of Object.entries(COUNTRIES[country].provinces)){
                    if (provinces.includes(province)){
                        provincesInfo.push([parseFloat(info.lt), parseFloat(info.lg), province, provinceFreqs[province]])
                    }
                }
            }
        }
        return provincesInfo; 
    }

    getChartData(country){
        const provinces = Object.values(this.props.graph.nodes).map(node => node.properties.alive? 
                                                                            (node.properties.birthCountry === country? node.properties.birthCity : null) : 
                                                                            (node.properties.defunctionCountry === country? node.properties.defunctionCity : null));
        const frequencies = countFrequencies(provinces);
        if (null in frequencies) delete frequencies[null];
        const chartData = buildChartData(frequencies, `Popular cities in ${country}`, '90%');
        return chartData;
    }
    

    render() {
        //TODO: Avoid the detailed-geochart-info if there is only one coordinate
        const provincesInfo = this.getProvinceInformation();
        const locationFrequency = this.getLocationPercentageByCountry();
        const mostCommonCountry = getArgMaxKeyFromObject(locationFrequency);
        const options = (mode = 'regions', region = null) => { return {
            region: region? region : this.getMinCountryCode(Object.keys(locationFrequency)),
            mode: 'regions',
            colorAxis: { minValue: 0, colors: ['#e7d87d', '#dd9f40', '#b4451f', '#b01111']},
            backgroundColor: 'transparent',
            datalessRegionColor: '#ccc',
            markerOpacity: 0.75,
            geochartVersion: 11
            }};
        let unknownPlacePeople = 0;
        if (null in locationFrequency){
            unknownPlacePeople = locationFrequency[null];
            delete locationFrequency[null];
        }



        return (<article className="chart-collection" style={{zIndex : 2}}>
                    <div className="statistics-header">
                        <h2> Location Data </h2>
                    </div>

                    <Container className = "geochart-container">
                        <Row>
                            <Col md={12}>
                                <h4 className='statistics-subtitle text-center'> Your family around the world </h4>
                                <Chart
                                    width="100%"
                                    chartType="GeoChart"
                                    data={[
                                        ['Country', 'Relatives Here'],
                                        ...Object.entries(locationFrequency)/*.map(([country, rels]) => [COUNTRIES[country].code, rels])*/]
                                        }
                                    options={options('regions', null)}
                                    className= "geochart"
                                />
                                {unknownPlacePeople > 0? <h5 className='statistics-subtitle text-center'>Relatives from unknown countries: {unknownPlacePeople}</h5> : null}
                            </Col>
                        </Row>

                        {mostCommonCountry !== null && mostCommonCountry in COUNTRIES? 
                        <Row className = 'detailed-geochart-info'>
                            <Col md = {6}>
                            <h4 className='statistics-subtitle text-center'> {`Your family in ${mostCommonCountry}`} </h4>
                                <Chart
                                    width="100%"
                                    chartType="GeoChart"
                                    data={[
                                        ['Lattitude',  'Longitude', 'Province', 'Relatives Here'],
                                        ...provincesInfo]
                                        }
                                    options={options('markers', COUNTRIES[mostCommonCountry].code)}
                                    className= "geochart"
                                />
                            </Col>

                            <Col md = {4}>
                            <h4 className='statistics-subtitle text-center'>{`${mostCommonCountry} cities preferred by your family`}</h4>
                                <Doughnut data={this.getChartData(mostCommonCountry)} options={this.charOptions} />}
                                
                            </Col>

                        </Row> : null}
                    </Container>
                    
                    
                </article>
                )
    };
}
export default LocationInformation;