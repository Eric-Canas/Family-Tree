import React, { Component } from 'react';
import {stringToID, capitalize, getRandomNumber} from '../../auxiliars'
import {Label, Input, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

class TagsSelector extends Component {
    constructor(props) {
        super(props);
        this.state = { currentTags: [] };
        this.onDefineTag = this.onDefineTag.bind(this);
        this.includeNext = false;
    }

    deleteIcon(idx){
        const currentTags = [...this.state.currentTags.slice(0, idx), ...this.state.currentTags.slice(idx+1)]
        this.setState({currentTags : currentTags});
        if (this.props.saveDefinedTags){
            this.props.saveDefinedTags(currentTags);
        }
    }
    
    onDefineTag(event){
        const value = capitalize(event.target.value);
          if (value!==""){
              if (!this.state.currentTags.includes(value) || (this.props.canRepeat)){
                  const currentTags = [...this.state.currentTags, value]
                  this.setState({ currentTags : currentTags});
                  if (this.props.saveDefinedTags){
                    this.props.saveDefinedTags(currentTags);
                }
              }
          }
          event.target.value = "";
    }
    
    onKeyPress(event){
        if (event.key === 'Enter') this.onDefineTag(event);
    }

    render() {
        return (<React.Fragment>
                    <Label for={stringToID(this.props.label)} className="form-label">{this.props.label}</Label>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroup>
                            {this.state.currentTags.map((tag, idx) => <InputGroupText key={tag+getRandomNumber()}>{tag}<FontAwesomeIcon icon={faTimes} className="tag-close-icon" onClick={this.deleteIcon.bind(this, idx)}/></InputGroupText>)}
                            </InputGroup>
                        </InputGroupAddon>
                    <Input type="search" id={stringToID(this.props.label)} list={stringToID(this.props.label)+"-list"} placeholder={this.props.label+". Press Enter to add multiples"} 
                        onKeyPress={(event) => this.onKeyPress(event)} onBlur={(event) => this.onDefineTag(event)} onKeyDown={(event) => {if (event.key === "Unidentified") this.includeNext = true;}}
                        onInput={(event) => {if(this.includeNext){ this.onDefineTag(event); this.includeNext = false;}}}/>
                    <datalist id={stringToID(this.props.label)+"-list"}>
                            {this.props.options.map(option => <option key={option}>{option}</option>)} 
                    </datalist>
                    </InputGroup>
                </React.Fragment>
        )
    }
}
export default TagsSelector;