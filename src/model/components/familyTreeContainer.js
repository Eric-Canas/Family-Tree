import React, { Component } from 'react';
import FamilyGraph from '../../controllers/familyGraph';
import TreeNode from './treeNode';
import AddIndependentNodeButton from './addIndependentNodeButton';
import { Container } from 'reactstrap';

const WIDTH = 0;
const HEIGHT = 1;
export {WIDTH, HEIGHT};

class FamilyTreeContainer extends Component {
    constructor(props) {
        super(props);
        this.familyGraph = new FamilyGraph();
        this.state = { graph: this.familyGraph };
        this.saveNode = this.saveNode.bind(this);
        this.updateNode = this.updateNode.bind(this);
    }

    saveNode(node) {
        this.familyGraph.addNode(node);
        this.setState({ graph: this.familyGraph });
    }

    updateNode(id, newProperties){
        for(let i= 0; i<this.familyGraph.nodes.length; i++){
            if (this.familyGraph.nodes[i].id === id){
                this.familyGraph.nodes[i].properties = newProperties;
                this.setState({ graph: this.familyGraph });
                break;
            }
        }
    }

    deleteNode(nodeID) {
        this.familyGraph.deleteNodeByID(nodeID);
        this.setState({ graph: this.familyGraph });
    }

    render() {
        //TODO: Scroll to center node position on click
        return (<section id="family-tree-container">
                    {this.state.graph.getNodesWithPosition().map(nodeInfo => (
                            <Container key={'tree-node-container' + nodeInfo.node.id} className="tree-node-container" 
                                        style={{top: nodeInfo.y, left: nodeInfo.x, width: nodeInfo.size[WIDTH], height: nodeInfo.size[HEIGHT]}}>
                                <TreeNode key={'tree-node-' + nodeInfo.node.id} node={nodeInfo.node} delete={this.deleteNode.bind(this, nodeInfo.node.id)} save={this.saveNode}
                                         update={this.updateNode}/>
                             </Container>
                    ))}
            {Object.keys(this.state.graph.nodes).length === 0 ? <AddIndependentNodeButton text="Plant the tree" save={this.saveNode} /> : null}
        </section>
        )
    }
}
export default FamilyTreeContainer;