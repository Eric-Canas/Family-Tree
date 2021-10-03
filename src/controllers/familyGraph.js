import IndividualNode from "./individualNode";
import { DiGraph, toEdgelist } from "jsnetworkx";
import { getPositions, DEFAULT_SIZE, sharingBloodlineNodes, toStructuredArray } from './graphUtils';

const MAX_ID = 10000;
const ID = 0;
const RELATIONSHIP = 1;
const X = 0;
const Y = 1;
class FamilyGraph {
    constructor(graph = null) {
        this.nodes = {};
        //Graph only manages the ids structure, this.nodes contains all the node information
        this.graph = new DiGraph();
        if (graph) {
            for (let [id, node] of Object.entries(graph.nodes)){
                id = parseInt(id)
                this.nodes[id] = new IndividualNode(id, node.properties)
                this.graph.addNode(id);
            }
            for (const [v, w, attributes] of graph.edges){
                this.graph.addEdge(parseInt(v), parseInt(w), attributes);
            }
        }
    }

    isEmpty(){
        return Object.keys(this.nodes).length === 0;
    }

    haveBothParents(id){
        id = parseInt(id)
        const infoArray = toStructuredArray(this.graph, this.nodes, false);
        return infoArray[id].parents.length > 0 && (infoArray[infoArray[id].parents[0]].couples.length > 0 || infoArray[infoArray[id].parents[0]].coupleOf !== null);
    }

    coupleOf(id){
        //Returns null if node have no couples
        const infoArray = toStructuredArray(this.graph, this.nodes, false);
        return infoArray[id].couples.length > 0? infoArray[id].couples[0] : infoArray[id].coupleOf;
    }

    getSharingBloodlineProperties(property = null, originID=0){
        const ancestors = sharingBloodlineNodes(this.graph, originID);
        if (ancestors.length === 0) return null;
        if (!property){
            return ancestors.map(ancestor => this.nodes[ancestor].properties)
        } else {
            return ancestors.map(ancestor => this.nodes[ancestor].properties[property]).flat();
        }
    }

    getGenerationsInfo(originID = 0, info=null){
        const structuredArray = toStructuredArray(this.graph, this.nodes)
        const generations = {};
        for(const [id, info] of Object.entries(structuredArray)){
            if (id > -1){
                const level = info.level;
                if (info.couples.length > 0) info.children = [...info.children, ...structuredArray[parseInt(info.couples[0])].children];
                else if (info.coupleOf !== null) info.children = [...info.children, ...structuredArray[parseInt(info.coupleOf)].children];

                if (!(level in generations)) generations[level] = {}; 
                generations[level][id] = info;
            }
        }
        return generations;
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
        v = parseInt(v);
        w = parseInt(w);
        switch (relationship.toLowerCase()) {
            case "child":
                this.graph.addEdge(v, w, { relationship: "child" });
                break;
            case "parent":
                const info = toStructuredArray(this.graph, this.nodes, false)
                if (info[v].parents.length === 0){
                    this.graph.addEdge(w, v, { relationship: "child" });
                }
                else if (info[v].parents.length === 1){
                    this.addRelation(w, info[v].parents[0], "couple");
                } else {
                    throw new Error(`Node ${v} have more parents than expected: ${info[v].parents}`)
                }
                break;
            case "couple":
                this.graph.addEdge(v, w, { relationship: "couple" });
                //this.graph.addEdge(w, v, {relationship : "couple"});
                break;
            default:
                throw new Error(`Relation: ${relationship} not understood`);
        }
    }

    getNodesWithPosition() {
        const [positions, links, infoArray] = getPositions(this.graph, this.nodes);
        const xOffset = -Math.min(...Object.values(positions).map(position => position.x));
        const yOffset = -Math.min(...Object.values(positions).filter(position => parseInt(position.id) !== -1).map(position => position.y));
        let nodes = {};
        for (const dataPosition of Object.values(positions)) {
            const id = dataPosition.id;
            if (id in this.nodes) {
                nodes[id] = {
                    x: xOffset + dataPosition.x, y: yOffset + dataPosition.y,
                    size: DEFAULT_SIZE, node: this.nodes[id]
                };
            }
        }
        const coupleID = (id) => infoArray[id].couples.length > 0? infoArray[id].couples[0] : infoArray[id].coupleOf;
        const couplePositionX = (id) => (nodes[parseInt(id)].x + nodes[parseInt(id)].size[X]/2 + nodes[coupleID(parseInt(id))].x + nodes[coupleID(parseInt(id))].size[X]/2)/2

        const linkPositions = [];
        for (const link of links){
            const sid = link.source.id, did = link.target.id;
            if (sid > -1 && did > -1 && did in nodes){
                if (infoArray[did].parents.length > 0){
                    linkPositions.push({ sx : sid in nodes? nodes[sid].x + nodes[sid].size[X]/2 : couplePositionX(sid), sy : sid in nodes? nodes[sid].y + nodes[sid].size[Y]/2 : nodes[parseInt(sid)].y + nodes[parseInt(sid)].size[Y]/2, 
                                        dx : did in nodes? nodes[did].x + nodes[did].size[X]/2 : link.target.x + xOffset, dy : did in nodes? nodes[did].y + nodes[did].size[Y]/2 : nodes[parseInt(did)].y + nodes[parseInt(did)].size[Y]/2,
                                        sname: link.source.name, sid : sid, dname : link.target.name, did : did, relationship: 'child'});
                    }
            }
        }
        // Build the couples
        for (let [sid, info] of Object.entries(infoArray)){
            sid = parseInt(sid);
            const couple = info.coupleOf;
            if (couple !== null){
                linkPositions.push({ sx : nodes[sid].x + nodes[sid].size[X]/2, sy : nodes[sid].y + nodes[sid].size[Y]/2, 
                    dx : nodes[couple].x + nodes[couple].size[X]/2, dy : nodes[couple].y + nodes[couple].size[Y]/2,
                    sname: infoArray[sid].name, sid : sid, dname : infoArray[couple].name, did : couple, relationship: 'couple'});
            }
        }
        return [Object.values(nodes), linkPositions];
    }

    addNode(node) {
        const id = parseInt(this.generateKey());
        this.nodes[id] = new IndividualNode(id, node);
        this.graph.addNode(id);
        if (node.relationship) {
            this.addRelation(node.relationship[ID], id, node.relationship[RELATIONSHIP]);
        }
    }

    deleteNodeByID(id) {
        this.graph.removeNode(parseInt(id))
    }

    serializeGraph() {
        return { edges: toEdgelist(this.graph), nodes: this.nodes };
    }
}
export default FamilyGraph;