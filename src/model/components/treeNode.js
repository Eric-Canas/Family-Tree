import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle,  Row, Col, UncontrolledTooltip} from 'reactstrap';
import { DEFAULT_AVATAR } from '../constants';
import AddNodeButton from './addNodeButton';
import ModalForm from './modalForm';
import { adjustViewIfNeeded } from '../auxiliars';

class TreeNode extends Component {
    constructor(props) {
        super(props);
        this.state = {showModal: false, relation : null}
        this.showForm = (relation) => this.setState({showModal : true, relation : relation});
        this.hideForm = () => this.setState({showModal : false, relation : null});
        this.nodeCopy = {...this.props.node.properties};
        this.updateNode = (newProperties) => this.props.update(this.props.node.id, newProperties)
    }
    render() {
        return (
            <Card className="tree-node" key={'card-' + this.props.node.id} id={'card-' + this.props.node.id} tabIndex={0} onClick={(event) => adjustViewIfNeeded(event)}>
                <Row key={'card-row-' + this.props.node.id}>
                    <Col key={'card-avatar-col-' + this.props.node.id} xs={4} md={4} className="my-auto p-2">
                        <CardImg key={'card-avatar-' + this.props.node.id} src={this.props.node.properties.avatar} className="card-avatar"
                            alt={(this.props.node.properties.avatar === DEFAULT_AVATAR ? 'Avatar of ' : 'Default avatar for') + this.props.node.properties.name} />
                    </Col>
                    <Col key={'card-text-col-' + this.props.node.id} xs={8} md={8}>
                        <CardBody key={'card-body-' + this.props.node.id}>
                            <CardTitle key={'card-title-' + this.props.node.id} tag="h5">{(this.props.node.properties.name || this.props.node.properties.alias || "Unknown") + 
                                            " " + this.props.node.properties.surnames.join(" ") +
                                (this.props.node.properties.alias && this.props.node.properties.name ? " (" + this.props.node.properties.alias + ")" : "")}</CardTitle>

                            <CardSubtitle key={'card-subtitle-' + this.props.node.id} tag="h6" className="mb-2 text-muted">{this.props.node.getDateAsString()}</CardSubtitle>

                            <CardText key={'card-text-' + this.props.node.id} tag="article">{this.props.node.getRelevantDataAsComponent()}</CardText>
                        </CardBody>
                    </Col>
                </Row>
                <UncontrolledTooltip key={'card-tooltip-' + this.props.node.id} placement="bottom" className="add-node-tooltip" trigger="focus"
                         hideArrow={false} target={'card-' + this.props.node.id}>
                            <AddNodeButton editButtons={true} delete={this.props.delete} showModal={this.showForm} 
                                            haveBothParents={this.props.graph.haveBothParents(this.props.node.id)}
                                            haveSiblingCoupleWithParents={this.props.graph.haveSiblingCoupleWithParents(this.props.node.id)}
                                            haveCouple={this.props.graph.coupleOf(this.props.node.id) !== null}/>
                </UncontrolledTooltip>
                <ModalForm modal={this.state.showModal} close={this.hideForm} relationship={this.state.relation} 
                            node={this.state.relation? {relationship : [this.props.node.id, this.state.relation]} : this.nodeCopy } 
                            save={this.props.save} update={this.updateNode}
                            nodeName = {this.props.node.properties.name}/>
            </Card>
        )
    };
}
export default TreeNode;