import { shortestPathLength, toEdgelist, edges, createEmptyCopy } from "jsnetworkx";
import d3 from "d3"

const EDGE_ATTRIBUTES = 2;
const SPACING = 20;
const DEFAULT_SIZE = [500, 200]
const radius = (graph) => Math.max(...Array.from(shortestPathLength(graph).values()).map(map => Array.from(map.values())).flat());
export { radius, DEFAULT_SIZE };

function relationsSubgraph(graph, relationship, exclude = false) {
    const match = (a, b) => exclude ? a !== b : a === b;
    const edgeList = toEdgelist(graph).filter(edge => match(edge[EDGE_ATTRIBUTES].relationship, relationship));
    let subgraph = createEmptyCopy(graph);
    for (const [v, w, properties] of edgeList) {
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
        if (!(v in array)) array[v] = { id: v, children: [], parents: [], couples: [], siblings: [], level: null };
        if (!(w in array)) array[w] = { id: w, children: [], parents: [], couples: [], siblings: [], level: null };
        if (relationship === "child") {
            array[v].children.push(w);
            array[w].parents.push(v);
            //Add all siblings to its child
            for (const [current, child, attributes] of toEdgelist(graph, [v])) {
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
    if (Object.keys(array).length > 0) {
        array[-1] = { id: -1, children: [], parents: [], couples: [], siblings: [], level: -1 }
    }
    for (const id of Object.keys(array)) {
        if (id != -1 && Math.max(...Array.from(shortestPaths.get(parseInt(id)).values())) === graphRadius) {
            olders.push(id);
            array[id].level = 0;
            array[id].parents = [-1];
            array[-1].children.push(id);
        }
    }
    //---- FILL THE REST OF LEVELS
    for (const id of olders) {
        for (const coupleID of array[id].couples) {
            fillLevels(array, coupleID, 0);
        }
        for (const childID of array[id].children) {
            fillLevels(array, childID, 1);
        }
    }

    return array;
}

function fillLevels(array, rootID, currentLevel) {
    if (array[rootID].level === null) {
        array[rootID].level = currentLevel;
        for (const coupleID of array[rootID].couples) {
            fillLevels(array, coupleID, currentLevel);
        }
        for (const childID of array[rootID].children) {
            fillLevels(array, childID, currentLevel + 1);
        }

        for (const childID of array[rootID].parents){
            fillLevels(array, childID, currentLevel - 1);
        }

        //If i'm orphan and don't have couple or if I have a couple but we both are orphans
        if (array[rootID].parents.length === 0 && (array[rootID].couples.length === 0 || (array[rootID].couples.length > 0 && array[array[rootID].couples[0]].parents.length === 0))) {
            if (currentLevel === 0) {
                if (!array[-1].children.includes(rootID)) {
                    array[-1].children.push(rootID);
                    array[rootID].parents.push(-1);
                }
                // If it is already a child by some reason, do nothing
                //TODO: refactor this in a future
            } else {
                const rootParentID = newNegativeID(array);
                array[rootParentID] = { id: rootParentID, children: [rootID], parents: [], couples: [], siblings: [], level: null };
                array[rootID].parents.push(rootParentID);
                fillLevels(array, rootParentID, currentLevel - 1);
                if (array[rootID].couples.length > 0) {
                    const coupleID = array[rootID].couples[0];
                    const coupleParentID = newNegativeID(array);
                    array[coupleParentID] = { id: coupleParentID, children: [coupleID], parents: [], couples: [], siblings: [], level: null };
                    array[coupleID].parents.push(coupleParentID);
                    fillLevels(array, coupleParentID, currentLevel - 1);
                }
            }
        }
    }
}

function newNegativeID(array) {
    const currentNegativeIDs = Object.keys(array).filter(id => id < 0);
    return Math.min(...currentNegativeIDs) - 1;
}

function getPositions(graph) {
    const structuredArray = toStructuredArray(graph);
    console.log("STRUCTURED ARRAY", structuredArray)
    let outputPositions = {}
    if (Object.keys(structuredArray).length > 0) {
        // TODO: INCLUDE THE ORPHAN NODES (parents of a branch while in the other branch there are grandparents) (Just set all levels and iterate for the no parents of each level that are not marriage tricks)
        //debugger;
        const root = buildDFSStructure(structuredArray, -1, {});
        console.log("DFS STRUCTURE", root);
        for (const id of graph.nodes()) {
            outputPositions[id] = { id: id, x: id * 200, y: id * 200, size: DEFAULT_SIZE, couples: [] };
        }
        const tree = d3.layout.tree().nodeSize([500, 500]);

        const nodes = tree.nodes(root);
        const links = tree.links(nodes);
        console.log("NODES OF TREE", nodes);
        console.log("LINKS OF TREE", links);
        return nodes;
    } else {
        for (const id of graph.nodes()) {
            outputPositions[id] = { id: id, x: id * 200, y: id * 200, size: DEFAULT_SIZE, couples: [] };
        }
    }
    return outputPositions;
}
export { getPositions };

function compareNodes(aID, bID, array, visited){
    if (array[aID].parents.includes(-1)) return 0;
    const haveCouple = (id) => array[id].couples.length > 0;
    const itsCoupleIsVisited = id => haveCouple(id) && (array[id].couples[0] in visited);
    const itsCoupleHaveParents = id => haveCouple(id) && array[array[id].couples[0]].parents.length>0
    const childrenLength = id => haveCouple(id)? array[id].children.length + array[array[id].couples[0]].children.length : array[id].children.length
    //Its couple has parents 
    //debugger;
    if (haveCouple(aID) && itsCoupleHaveParents(aID)) {
        //If it has been already visited try to go first
        if (itsCoupleIsVisited(aID)){
            //If they are in the same conditions return comparison between amount of children
            if(itsCoupleIsVisited(bID)){
                return childrenLength(bID) - childrenLength(aID);
            //Otherwise just first
            } else{
                return 1;
            }
        //If it is not visited yet try to go last (to make the union simpler)
        } else {
            // If there is a b node in the same situation return a comparison between both
            if(haveCouple(bID) && !itsCoupleIsVisited(bID)){
                return childrenLength(bID)- childrenLength(aID);
            //Otherwise just last
            } else{
                //WHAT WHAT WHAT WHAT, it should be -1, but only works with.. 1?
                return 1;
            }
        }
      // Order reverse for comparison b vs a
      } else if (haveCouple(bID) && itsCoupleHaveParents(bID)) {
        //If it has been already visited try to go first
        if (itsCoupleIsVisited(bID)){
            //If they are in the same conditions return comparison between amount of children
            if(itsCoupleIsVisited(aID)){
                return Math.sign(childrenLength(aID) - childrenLength(bID));
            //Otherwise just first
            } else{
                return -1;
            }
        //If it is not visited yet try to go last (to make the union simpler)
        } else {
            // If there is a b node in the same situation return a comparison between both
            if(haveCouple(aID) && !itsCoupleIsVisited(aID)){
                return Math.sign(childrenLength(bID) - childrenLength(aID));
            //Otherwise just last
            } else{
                return -1;
            }
        }
      // If it have no couple of its couple have no parents just compare by another factor like age
      //TODO: order different
      } else {
          return 0;
      }
}

function buildDFSStructure(array, rootID, visited = {}) {
    if (!(rootID in visited)) {
        visited[rootID] = true;
        array[rootID].children = array[rootID].children.sort((a, b) => compareNodes(a, b, array, visited))
        if (rootID == -1) {
            return { name: "root", id: -1, hidden: true, children: array[-1].children.map(childID => buildDFSStructure(array, childID, visited)).flat() }
        } else if (array[rootID].couples.length === 0) {
            return { name: "name", id: rootID, hidden: false, no_parent: array[rootID].parents.length > 0, children: array[rootID].children.map(childID => buildDFSStructure(array, childID, visited)).flat() }
        } else if (array[rootID].couples.length > 0) {
            const childrenList = [...array[rootID].children, ...array[array[rootID].couples[0]].children];
            const rootNode = { name: "First Of Couple", id: rootID, hidden: false, no_parent: array[rootID].parents.length > 0 };
            // If couple have parents let it be
            if (array[array[rootID].couples[0]].parents.length > 0) {
                // If it has been already visited, it will have created the family, so generate only the root and thats all (or if there are no childs)
                if (array[rootID].couples[0] in visited || childrenList.length === 0) {
                    return rootNode;
                    // Otherwise create the node and the family
                } else {
                    return [rootNode, {
                        name: "Family " + rootID + "-" + array[rootID].couples[0], id: rootID * 100 + array[rootID].couples[0] * 10, hidden: true, no_parent: true,
                        children: childrenList.map(childID => buildDFSStructure(array, childID, visited)).flat()
                    }];
                }
                // If the couple have no parents it will be a pseudo sibling
            } else {
                visited[array[rootID].couples[0]] = true
                const coupleNode = { name: "CoupleOf " + rootID, id: array[rootID].couples[0], hidden: false, no_parent: true }
                if (childrenList.length > 0) {
                    //Build everithing
                    return [rootNode,
                        {
                            name: "Family " + rootID + "-" + array[rootID].couples[0], id: rootID * 100 + array[rootID].couples[0] * 10, hidden: true, no_parent: true,
                            children: childrenList.map(childID => buildDFSStructure(array, childID, visited)).flat()
                        },
                        coupleNode];
                } else {
                    // Don't build a family
                    return [rootNode, coupleNode];
                }
            }
        }
    }
}
