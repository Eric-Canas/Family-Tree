import React, { Component } from 'react';
import FamilyTreeContainer from './familyTreeContainer';
import FamilyGraph from '../../controllers/familyGraph';
import MainMenu from './mainMenu';
import { Fade } from 'reactstrap';
import { downloadFile, uploadTree } from '../auxiliars'

const ADDITIONAL_OPTIONS = {"statistics" : <div/>}

//TODO: Start to subtract information depending on the name of siblings
class MainFrame extends Component {
    constructor(props) {
        super(props);
        this.familyGraph = new FamilyGraph();
        this.state = {selectedOption: "tree", familyGraph : this.familyGraph};
        this.selectOption = (option) => this.setState({selectedOption: option, familyGraph : this.familyGraph})
        this.updateState = () => this.setState({selectedOption: this.state.selectedOption, familyGraph : this.familyGraph})
        this.downloadTree = this.downloadTree.bind(this);
        this.uploadTree = this.uploadTree.bind(this);
    }

    downloadTree(){
        console.log("Downloading...")
        // It is async
        downloadFile(this.familyGraph.serializeGraph(), "MyFamilyTree");
    }

    async uploadTree(){
        //TODO: It will await forever on click cancel or "X".
        const fileUploaded = await uploadTree();
        this.familyGraph = new FamilyGraph(fileUploaded);
        this.updateState();
    }

    render() {
        const visible = this.state.selectedOption in ADDITIONAL_OPTIONS;
        //TODO: Maybe the Family tree container should be deleted when fade is in, because could produce a undesired scroll below (but it would be preferred with a fade transition)
        return (
            <div>
                <MainMenu selectOption={this.selectOption} additionalOptions={Object.keys(ADDITIONAL_OPTIONS)} className="main-menu"
                          downloadFunction = {this.downloadTree} uploadFunction = {this.uploadTree}/>
                <FamilyTreeContainer familyGraph={this.state.familyGraph} visible={!visible} updateState={this.updateState}/>
                
                <Fade in={visible} className = "options-background" style={{zIndex : visible? 1 : -1}}>
                    {visible? null : null}
                </Fade>
            </div>
        )
    };
}
export default MainFrame;