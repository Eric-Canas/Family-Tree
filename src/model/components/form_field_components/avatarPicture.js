import React, { Component } from 'react';
import { Media, Button, Input, Label } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTimes } from '@fortawesome/free-solid-svg-icons'
import CropperModal from '../auxiliars/avatarCropper';
import { DEFAULT_AVATAR } from '../../constants'

const MAX_HEIGHT = 192;

class AvatarPicture extends Component {
    constructor(props) {
        super(props);
        this.lastChargedImage = null;
        this.currentImg = this.props.currentImage? this.props.currentImage : DEFAULT_AVATAR;
        this.state = { showModal: false, src: this.lastChargedImage };
        this.showHideForm = () => this.setState({ showModal: !this.state.showModal, src: this.lastChargedImage });
        /* Maybe the currentImg must be converted to data now it is a local blob-like url (very short) */
        this.saveImage = async (imgUrl) => { imgUrl = await this.imageUrlToBase64(imgUrl); this.currentImg = imgUrl;
                                             this.showHideForm(); this.props.saveInfo("avatar", this.currentImg); }
    }

    async imageUrlToBase64(imgUrl){
        const img = document.createElement('img');
        const canvas = document.createElement('canvas');
        const canvasContext = canvas.getContext('2d');
        const promise = new Promise((resolve, reject) => 
                            {img.onload = () => {const reduction = MAX_HEIGHT/img.height;
                                                 canvas.width = img.width*reduction;
                                                 canvas.height = img.height*reduction;
                                                 canvasContext.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
                                                 resolve(canvas.toDataURL())
                                                }
                            });
        img.src = imgUrl;
        return promise;
    }

    onSelectedImage(event) {
        if (event.target.files && event.target.files.length > 0) {
            const reader = new FileReader();
            reader.onload = () => {
                this.lastChargedImage = reader.result;
                //Just for triggering onChange event any way when selecting same image
                event.target.value = null;
                this.showHideForm()
                console.log("saved info", this.lastChargedImage)
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    }

    onDeleteImage(event){
        this.lastChargedImage = null;
        this.currentImg = DEFAULT_AVATAR;
        this.setState({ showModal: false, src: this.lastChargedImage });
        this.props.saveInfo("avatar", this.currentImg);
    }

    //It could access to this.props
    render() {
        //TODO: Label only is surrounding the icon and not the entire button. So it is only clickable over the icon
        return (<div>
            <div className="avatar-picture-wrapper">
                <div className={this.currentImg === DEFAULT_AVATAR? "update-avatar-btn" : "update-avatar-double-btn"}>
                    <Button type="button" color="primary">
                        <Label for="upload-img" className="upload-img-label"><FontAwesomeIcon icon={faPencilAlt} /></Label>
                    </Button>
                    {this.currentImg !== DEFAULT_AVATAR ? 
                        (<Button type="button" color="danger" onClick={(event) => this.onDeleteImage(event)}>
                            <Label className="upload-img-label"><FontAwesomeIcon icon={faTimes} /></Label>
                        </Button>) : null}
                </div>
                <Media src={this.currentImg} alt="Relative Avatar" />
                <Input type="file" id="upload-img" accept="image/*" onChange={this.onSelectedImage.bind(this)} className="invisible" />
                <CropperModal modal={this.state.showModal} src={this.state.src} toggle={this.showHideForm.bind(this)} croppedImage={null}
                    saveImage={this.saveImage} />
            </div>
        </div>)
    }
}
export default AvatarPicture;