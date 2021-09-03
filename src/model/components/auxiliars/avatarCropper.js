import React, { PureComponent } from 'react';
import ReactCrop from 'react-image-crop';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import 'react-image-crop/dist/ReactCrop.css';

class CropperModal extends PureComponent {
    constructor(props) {
        super(props);
        // Save the prop and the current cropped image
        this.state = {
            crop: {
                unit: '%',
                width: 30,
                aspect: 0.89
            },
            croppedImageUrl : this.props.croppedImageUrl
        };
        this.onImageLoaded = (image) => this.imageRef = image;
        this.onCropChange = (crop, percentCrop) => this.setState({ crop : percentCrop, croppedImageUrl : this.props.croppedImageUrl});
        this.onCropComplete = (crop) => this.makeClientCrop(crop);
    }



    async makeClientCrop(crop) {
        if (this.imageRef && crop.width && crop.height) {
            const croppedImageUrl = await this.getCroppedImg(
                this.imageRef,
                crop,
                'temp.jpeg'
            );
            this.setState({ crop : this.state.crop, croppedImageUrl : croppedImageUrl  });
        }
    }

    getCroppedImg(image, crop, fileName) {
        //TODO: Avoid to use the document
        const canvas = document.createElement('canvas');
        const pixelRatio = window.devicePixelRatio;
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        const ctx = canvas.getContext('2d');

        canvas.width = crop.width * pixelRatio * scaleX;
        canvas.height = crop.height * pixelRatio * scaleY;

        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = 'high';

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width * scaleX,
            crop.height * scaleY
        );

        return new Promise((resolve, reject) => {
            canvas.toBlob(
                (blob) => {
                    if (!blob) {
                        console.error('Canvas is empty');
                        return;
                    }
                    blob.name = fileName;
                    window.URL.revokeObjectURL(this.fileUrl);
                    this.fileUrl = window.URL.createObjectURL(blob);
                    resolve(this.fileUrl);
                },
                'image/jpeg',
                1
            );
        });
    }

    render() {

        return (
            <Modal isOpen={this.props.modal} toggle={this.props.toggle} className="modalForm">
                <ModalHeader toggle={this.props.toggle}>Crop the avatar</ModalHeader>
                <ModalBody className="modal-body">
                    {this.props.src && (
                        <ReactCrop
                            className = "avatar-cropper"
                            src={this.props.src}
                            crop={this.state.crop}
                            ruleOfThirds
                            onImageLoaded={this.onImageLoaded}
                            onComplete={this.onCropComplete}
                            onChange={this.onCropChange}
                        />)}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => this.props.saveImage(this.state.croppedImageUrl)}>Save</Button>
                    <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        );
    }
}
export default CropperModal;
