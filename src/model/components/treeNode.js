import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle,  Row, Col, UncontrolledTooltip } from 'reactstrap';
import { DEFAULT_AVATAR } from '../constants';
import AddNodeButton from './addNodeButton';


//TODO: Start to subtract information depending on the name of siblings
class TreeNode extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card className="tree-node" id={'tree-node-' + this.props.node.id} tabIndex={0}>
                <Row>
                    <Col md={4} className="my-auto p-2">
                        <CardImg src={this.props.node.properties.avatar} className="card-avatar"
                            alt={(this.props.node.properties.avatar === DEFAULT_AVATAR ? 'Avatar of ' : 'Default avatar for') + this.props.node.properties.name} />
                    </Col>
                    <Col md={8}>
                        <CardBody>
                            <CardTitle tag="h5">{(this.props.node.properties.name || this.props.node.properties.alias || "Unknown") + " " + this.props.node.properties.surnames.join(" ") +
                                (this.props.node.properties.alias && this.props.node.properties.name ? " (" + this.props.node.properties.alias + ")" : "")}</CardTitle>

                            <CardSubtitle tag="h6" className="mb-2 text-muted">{this.props.node.getDateAsString()}</CardSubtitle>

                            <CardText tag="article">{this.props.node.getRelevantDataAsComponent()}</CardText>
                        </CardBody>
                        <UncontrolledTooltip placement="auto" className="add-node-tooltip" isOpen={true} trigger="focus"
                         hideArrow={false} target={'tree-node-' + this.props.node.id}>
                            <AddNodeButton editButtons={true} node={this.props.node}/>
                        </UncontrolledTooltip>
                    </Col>
                </Row>
            </Card>
        )
    };
}
export default TreeNode;