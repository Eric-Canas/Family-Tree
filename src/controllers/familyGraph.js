import IndividualNode from "./individualNode";
const MAX_ID = 10000;
class FamilyGraph{
    constructor(){
        this.nodes = [];
        this.relations = {};
    }
    
    generateKey(){
        let used_ids = this.nodes.map(node => node.id);
        for (let id=0; id<MAX_ID; id++){
            if (!used_ids.includes(id)){
                return id;
            }
        }
        throw("All keys are already used!")
    }

    addRelation(relation){
        console.log("ADD THE RELATION", relation);
    }

    addNode(node){
        //TODO: Select the ID as the first lacking ID (Incrementally searched)
        this.nodes.push(new IndividualNode(this.generateKey(), node));
        if (node.relationship){
            this.addRelation(node.relationship);
        }
    }

    deleteNodeByID(id){
        this.nodes = this.nodes.filter(node => node.id !== id);
    }
}
export default FamilyGraph;