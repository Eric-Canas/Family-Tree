import React, { Component } from 'react';
import { Media, Button, Input, Label } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import CropperModal from '../auxiliars/avatarCropper';

class AvatarPicture extends Component {
    constructor(props){
        super(props);
        this.lastChargedImage = null;
        this.currentImg = "default-avatar.png";
        this.state = { showModal: false, src : this.lastChargedImage};
        this.showHideForm = () => this.setState({ showModal: !this.state.showModal, src : this.lastChargedImage});
        this.saveImage = (imgUrl) => {this.currentImg = imgUrl; this.showHideForm()}
    }

    onSelectedImage(event){
        if (event.target.files && event.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                this.lastChargedImage = reader.result;
                //Just for triggering onChange event twice when selecting same image
                event.target.value = null; 
                this.showHideForm()
            });
            reader.readAsDataURL(event.target.files[0]);
            
        }
        
    }
    //It could access to this.props
    render() {
        //TODO: Label only is surrounding the icon and not the entire button. So it is only clickable over the icon
        return (<div>
            <div className="avatar-picture-wrapper">
                <Button type="button" color="primary" className="update-avatar-btn">
                    <Label for="upload-img" className="upload-img-label"><FontAwesomeIcon icon={faPencilAlt} /></Label>
                </Button>
                <Media src={this.currentImg} alt="Relative Avatar" />
                <Input type="file" id="upload-img" accept="image/*" onChange={this.onSelectedImage.bind(this)} className="invisible"/>
                <CropperModal modal={this.state.showModal} src={this.state.src} toggle={this.showHideForm.bind(this)} croppedImage={null}
                 saveImage={this.saveImage}/>
            </div>
        </div>)
    }
}
export default AvatarPicture;