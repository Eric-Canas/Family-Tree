import React, { Component } from 'react';
import TreeNode from './treeNode';
import AddIndependentNodeButton from './addIndependentNodeButton';
import { Container } from 'reactstrap';
import MarriageLink from './auxiliars/marriageLink';

const WIDTH = 0;
const HEIGHT = 1;
const LINE_THICKNESS = 6;
const PAD_Y = "5vh";
const topPosition = (y) => `calc(1.1rem + 40px + ${PAD_Y} + ${y}px)`
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
        if (id in this.props.familyGraph.nodes) {
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

    getLinkComponent(link) {
        const sx = link.sx, sy = link.sy, dx = link.dx, dy = link.dy, sid = link.sid, did = link.did;
        if (sid < 0 || did < 0) return null;
        else if (sy === dy) {
            const style = { top: topPosition(sy), left: dx - sx < 0 ? dx : sx, width: Math.abs(dx - sx) }
            return <MarriageLink key={`${sid}-to-${did}-marriage-link`} style={style} sid={sid} did={did} save={this.saveNode} nodeID={sid}
                     nodeName = {`${link.sname} and ${link.dname}`}/>
        } else if (sx === dx) {
            const style = { top: topPosition(sy), left: dx - sx < 0 ? dx : sx, height: Math.abs(dy - sy) }
            return <div key={`${sid}-to-${did}-link`} className='relationship-link' style={style} />
        } else {
            //Break in 3 divs
            const breakPointLenght = (dy - sy) / 2;
            const breakPoint = sy + breakPointLenght;
            return (<React.Fragment key={`${sid}-to-${did}-link`}>
                <div key={`${sid}-to-${did}-link-v1`} className='relationship-link' style={{ top: topPosition(sy), left: sx, height: breakPointLenght }} />
                <div key={`${sid}-to-${did}-link-h1`} className='relationship-link' style={{ top: topPosition(breakPoint), left: dx - sx < 0 ? dx : sx, width: Math.abs(dx - sx) + LINE_THICKNESS }} />
                <div key={`${sid}-to-${did}-link-h2`} className='relationship-link' style={{ top: topPosition(breakPoint), left: dx, height: breakPointLenght }} />
            </React.Fragment>

            )
        }

    }

    render() {
        const [nodes, links] = this.props.familyGraph.getNodesWithPosition()
        return (<section id="family-tree-container">
            {nodes.map(nodeInfo => (
                <Container key={'tree-node-container' + nodeInfo.node.id} className="tree-node-container"
                    style={{
                        top: topPosition(nodeInfo.y), left: nodeInfo.x,
                        width: nodeInfo.size[WIDTH], height: nodeInfo.size[HEIGHT],
                        zIndex: this.props.visible ? 1 : -1
                    }} >
                    <TreeNode key={'tree-node-' + nodeInfo.node.id} node={nodeInfo.node} delete={this.deleteNode.bind(this, nodeInfo.node.id)} save={this.saveNode}
                        update={this.updateNode} graph={this.props.familyGraph} />
                </Container>
            ))}
            {links.map(link => this.getLinkComponent(link))}
            {Object.keys(this.props.familyGraph.nodes).length === 0 ? (
                <div key='plant-your-tree-wrapper' className="plant-tree-container" style={{ zIndex: this.props.visible ? 1 : -1 }}>
                    <AddIndependentNodeButton key='plant-your-tree-button' text="Plant your tree" save={this.saveNode} />
                </div>) : null}
        </section>
        )
    }
}
export default FamilyTreeContainer;