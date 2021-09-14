import { shortestPathLength, toEdgelist, edges, createEmptyCopy} from "jsnetworkx";
import {flextree} from 'd3-flextree'
import { Container } from "reactstrap";

const EDGE_ATTRIBUTES = 2;
const SPACING = 20;
const DEFAULT_SIZE = [500, 200]
const radius = (graph) => Math.max(...Array.from(shortestPathLength(graph).values()).map(map => Array.from(map.values())).flat());
export { radius };

function relationsSubgraph(graph, relationship, exclude = false){
    const match = (a, b) => exclude? a !== b : a === b;
    const edgeList = toEdgelist(graph).filter(edge => match(edge[EDGE_ATTRIBUTES].relationship, relationship));
    let subgraph = createEmptyCopy(graph);
    for (const [v, w, properties] of edgeList){
        subgraph.addEdge(v, w, properties);
    }
    return subgraph;
}
export { relationsSubgraph };

function toStructuredArray(graph) {
    let array = {};
    // ------------------- BUILD THE STRUCTURE ------------------
    for (const [v, w, attributes] of toEdgelist(graph)) {
        const relationship = attributes.relationship;
        //TODO: ORDER THE CHILDREN BEFORE DFS
        if (!(v in array)) array[v] = { id : v, children: [], parents: [], couples: [], siblings: [], level: null };
        if (!(w in array)) array[w] = { id : w, children: [], parents: [], couples: [], siblings: [], level: null };
        if (relationship === "child") {
            array[v].children.push(w);
            array[w].parents.push(v);
            //Add all siblings to its child
            for (const [current, child, attributes] of toEdgelist(graph, [v])){
                //If its child of its parent and is not itself
                if (attributes.relationship === "child" && child !== w) array[w].siblings.push(child);
            }

        // Couple is bidirectional
        } else if (relationship === "couple") {
            array[v].couples.push(w);
        }

    }

    // ------------------- SET THE LEVELS ------------------
    const noCouplesGraph = relationsSubgraph(graph, 'couple', true)
    const graphRadius = radius(noCouplesGraph);
    const shortestPaths = shortestPathLength(noCouplesGraph);
    let olders = [];
    for(const id of Object.keys(array)){
        if(Math.max(...Array.from(shortestPaths.get(parseInt(id)).values())) === graphRadius){
            olders.push(id);
            array[id].level = 0;
        }
    }
    return [array, olders];
}

function getPositions(graph) {
    const [structuredArray, roots] = toStructuredArray(graph);
    let outputPositions = {}
    if (Object.keys(structuredArray).length > 0){
        const structure = buildDFSStructure(structuredArray, roots[0]);
        const layout = flextree().spacing((nodeA, nodeB) => SPACING); //TODO: It is not working
        const tree = layout.hierarchy(structure);
        layout(tree);
        tree.each(node => outputPositions[node.data.id] = {id: node.data.id, x: node.x, y: node.y, size: node.data.size});
    } else {
        for(const id of graph.nodes()){
            outputPositions[id] = {id: id, x: 0, y: 0, size: DEFAULT_SIZE};
        }
    }
    return outputPositions;
}
export {getPositions};

function buildDFSStructure(array, rootID, actuallyVisited){
    if (array[rootID].children.length > 0){
        return {id: rootID, size : DEFAULT_SIZE, children: array[rootID].children.map(childID => buildDFSStructure(array, childID))};
    } else {
        return {id: rootID, size : DEFAULT_SIZE};
    }

}
