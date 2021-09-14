import IndividualNode from "./individualNode";
import { DiGraph} from "jsnetworkx";
import {getPositions} from './graphUtils'

const MAX_ID = 10000;
const ID = 0;
const RELATIONSHIP = 1;
class FamilyGraph{
    constructor(){
        //TODO Convert it to an object -> {} where ids are the keys, for faster management ({data : node} could be use in the graph. Just check which is a better option)
        this.nodes = {};
        //Graph only manages the ids structure, this.nodes contains all the node information
        this.graph = new DiGraph();
    }
    
    generateKey(){
        let used_ids = Object.keys(this.nodes);
        for (let id=0; id<MAX_ID; id++){
            //TODO: Solve it, as first node uses as id '0' and not 0
            if (!used_ids.includes(id) && !used_ids.includes(""+id)){
                return id;
            }
        }
        throw new Error("All keys are already used!");
    }

    

    addRelation(v, w, relationship){
        switch(relationship.toLowerCase()){
            case "child":
                this.graph.addEdge(v, w, {relationship : "child"});
                break;
            case "parent":
                this.graph.addEdge(w, v, {relationship : "child"});
                break;
            case "couple":
                this.graph.addEdge(v, w, {relationship : "couple"});
                //this.graph.addEdge(w, v, {relationship : "couple"});
                break;
        }
    }

    getNodesWithPosition(){
        const positions = getPositions(this.graph);
        const xOffset = -Math.min(...Object.values(positions).map(position => position.x));
        let output = [];
        for (const [id, dataPosition] of Object.entries(positions)){
            output.push({x : xOffset + dataPosition.x, y : dataPosition.y, size:dataPosition.size, node : this.nodes[id]});
        }
        console.log("OUTPUT POSITIONS", output);
        return output;
    }

    addNode(node){
        const id = this.generateKey();
        this.nodes[id] = new IndividualNode(id, node);
        this.graph.addNode(id);        
        if (node.relationship){
            this.addRelation(node.relationship[ID], id, node.relationship[RELATIONSHIP]);
        }
    }

    deleteNodeByID(id){
        this.graph.removeNode(id)
    }
}
export default FamilyGraph;