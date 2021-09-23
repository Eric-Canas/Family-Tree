import IndividualNode from "./individualNode";
import { DiGraph, toEdgelist } from "jsnetworkx";
import { getPositions, DEFAULT_SIZE, sharingBloodlineNodes } from './graphUtils';
import { WIDTH, HEIGHT } from '../model/components/familyTreeContainer';

const MAX_ID = 10000;
const ID = 0;
const RELATIONSHIP = 1;

class FamilyGraph {
    constructor(graph = null) {
        this.nodes = {};
        //Graph only manages the ids structure, this.nodes contains all the node information
        this.graph = new DiGraph();
        if (graph) {
            for (const [id, node] of Object.entries(graph.nodes)){
                this.nodes[id] = new IndividualNode(id, node.properties)
                this.graph.addNode(id);
            }
            for (const [v, w, attributes] of graph.edges){
                this.graph.addEdge(v, w, attributes);
            }
        }
    }

    isEmpty(){
        return Object.keys(this.nodes).length === 0;
    }

    getSharingBloodlineProperties(property = null, originID=0){
        const ancestors = sharingBloodlineNodes(this.graph, originID);
        if (!property){
            return ancestors.map(ancestor => this.nodes[ancestor].properties)
        } else {
            return ancestors.map(ancestor => this.nodes[ancestor].properties[property]).flat();
        }
    }

    generateKey() {
        let used_ids = Object.keys(this.nodes);
        for (let id = 0; id < MAX_ID; id++) {
            //TODO: Solve it, as first node uses as id '0' and not 0
            if (!used_ids.includes(id) && !used_ids.includes("" + id)) {
                return id;
            }
        }
        throw new Error("All keys are already used!");
    }

    addRelation(v, w, relationship) {
        console.log("CURRENT NODES from Family Graph",this.nodes);
        switch (relationship.toLowerCase()) {
            case "child":
                this.graph.addEdge(v, w, { relationship: "child" });
                break;
            case "parent":
                this.graph.addEdge(w, v, { relationship: "child" });
                break;
            case "couple":
                this.graph.addEdge(v, w, { relationship: "couple" });
                //this.graph.addEdge(w, v, {relationship : "couple"});
                break;
        }
    }

    getNodesWithPosition() {
        const positions = getPositions(this.graph, this.nodes);
        const xOffset = -Math.min(...Object.values(positions).map(position => position.x));
        const yOffset = -Math.min(...Object.values(positions).filter(position => position.id != -1).map(position => position.y));
        let output = [];
        for (const dataPosition of Object.values(positions)) {
            const id = dataPosition.id;
            if (id in this.nodes) {
                output.push({
                    x: xOffset + dataPosition.x, y: yOffset + dataPosition.y,
                    size: DEFAULT_SIZE, node: this.nodes[id]
                });
            }
        }
        return output;
    }

    addNode(node) {
        const id = this.generateKey();
        this.nodes[id] = new IndividualNode(id, node);
        this.graph.addNode(id);
        if (node.relationship) {
            this.addRelation(node.relationship[ID], id, node.relationship[RELATIONSHIP]);
        }
    }

    deleteNodeByID(id) {
        this.graph.removeNode(id)
    }

    serializeGraph() {
        return { edges: toEdgelist(this.graph), nodes: this.nodes };
    }
}
export default FamilyGraph;