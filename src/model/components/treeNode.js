import React, { Component } from 'react';

class TreeNode extends Component {
    //TODO: Use a reactstrap card
    render() {
        return (<div className="tree-node">
                    <p>{this.props.node.name}</p>
                </div>
        )
    }
}
export default TreeNode;