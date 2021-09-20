import React, { Component } from 'react';
import TreeNode from './treeNode';
import AddIndependentNodeButton from './addIndependentNodeButton';
import { Container, Row, Col } from 'reactstrap';

const WIDTH = 0;
const HEIGHT = 1;
const PAD_Y = "5vh";
export { WIDTH, HEIGHT };

class FamilyTreeContainer extends Component {
    constructor(props) {
        super(props);
        this.saveNode = this.saveNode.bind(this);
        this.updateNode = this.updateNode.bind(this);
    }

    saveNode(node) {
        this.props.familyGraph.addNode(node);
        this.props.updateState();
    }

    updateNode(id, newProperties) {
        if(id in this.props.familyGraph.nodes){
            this.props.familyGraph.nodes[id].properties = newProperties;
        } else {
            throw new Error("Trying to update a non-existing node?")
        }
        this.props.updateState();
    }

    deleteNode(nodeID) {
        this.props.familyGraph.deleteNodeByID(nodeID);
        this.props.updateState();
    }

    render() {
        return (<section id="family-tree-container">
            {this.props.familyGraph.getNodesWithPosition().map(nodeInfo => (
                <Container key={'tree-node-container' + nodeInfo.node.id} className="tree-node-container"
                    style={{ top: `calc(1.1rem + 40px + ${PAD_Y} + ${nodeInfo.y}px)`, left: nodeInfo.x,
                             width: nodeInfo.size[WIDTH], height: nodeInfo.size[HEIGHT],
                             zIndex : this.props.visible? 1 : -1 }} >
                    <TreeNode key={'tree-node-' + nodeInfo.node.id} node={nodeInfo.node} delete={this.deleteNode.bind(this, nodeInfo.node.id)} save={this.saveNode}
                        update={this.updateNode}/>
                </Container>
            ))}
            {Object.keys(this.props.familyGraph.nodes).length === 0 ? (
                <div tag="section" className="plant-tree-container" style={{zIndex : this.props.visible? 1 : -1}}>
                            <AddIndependentNodeButton text="Plant the tree" save={this.saveNode} />
                </div>) : null}
            </section>
        )
    }
}
export default FamilyTreeContainer;