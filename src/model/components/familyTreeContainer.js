import React, { Component } from 'react';
import FamilyGraph from '../../controllers/familyGraph';
import TreeNode from './treeNode';
import AddIndependentNodeButton from './addIndependentNodeButton';
import { Col, Row } from 'reactstrap'

class FamilyTreeContainer extends Component {
    constructor(props) {
        super(props);
        this.familyGraph = new FamilyGraph();
        this.state = { nodes: this.familyGraph.nodes };
        this.saveNode = this.saveNode.bind(this);
        this.updateNode = this.updateNode.bind(this);
    }

    saveNode(node) {
        this.familyGraph.addNode(node);
        this.setState({ nodes: this.familyGraph.nodes });
    }

    updateNode(id, newProperties){
        for(let i= 0; i<this.familyGraph.nodes.length; i++){
            if (this.familyGraph.nodes[i].id === id){
                this.familyGraph.nodes[i].properties = newProperties;
                this.setState({ nodes: this.familyGraph.nodes });
                break;
            }
        }
    }

    deleteNode(node) {
        this.familyGraph.deleteNodeByID(node.id);
        this.setState({ nodes: this.familyGraph.nodes });
    }

    render() {
        return (<section id="family-tree-container">
                    {this.state.nodes.map(node => (<Row key={node.id + "-row"}>
                        <Col md={8} key={node.id + "-col"}>
                            <TreeNode key={'tree-node-' + node.id} node={node} delete={this.deleteNode.bind(this, node)} save={this.saveNode} update={this.updateNode}/>
                        </Col>
                    </Row>
                    ))}
            {this.state.nodes.length === 0 ? <AddIndependentNodeButton text="Plant the tree" save={this.saveNode} /> : null}
        </section>
        )
    }
}
export default FamilyTreeContainer;