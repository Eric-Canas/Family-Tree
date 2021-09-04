import React, { Component } from 'react';
import FamilyGraph from '../../controllers/familyGraph';
import TreeNode from './treeNode';
import AddIndependentNodeButton from './addIndependentNodeButton';
import {Col, Row} from 'reactstrap'

class FamilyTreeContainer extends Component {
    constructor(props) {
        super(props);
        this.familyGraph = new FamilyGraph();
        this.state = {nodes : this.familyGraph.nodes};
        this.saveNode = this.saveNode.bind(this);
    }

    saveNode(node){
        console.log("Saving Node...", node);
        this.familyGraph.addNode(node);
        this.setState({nodes : this.familyGraph.nodes})
    }

    render() {
        return (<section id="family-tree-container">
                    {this.state.nodes.map(node => (<Row key={node.id+"-row"}>
                                                    <Col md={8} key={node.id+"-col"}>
                                                    <TreeNode key={node.id} node={node} />
                                                    </Col>
                                                    </Row>
                                                  ))}
                    {this.state.nodes.length === 0? <AddIndependentNodeButton text="Plant the tree" save={this.saveNode}/> : null}
                </section>
        )
    }
}
export default FamilyTreeContainer;