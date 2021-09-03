import IndividualNode from "./individualNode";

class FamilyGraph{
    constructor(){
        this.nodes = [];
    }
    
    addNode(node){
        this.nodes.push(new IndividualNode(node));
    }
}
export default FamilyGraph;