class IndividualNode {
    constructor(node) {
        console.log("Received Node", node)
        this.properties = {
            id: (~~(Math.random() * 10000)).toString(),
            name : node.name || null,
            surnames: node.surnames || [],
            bornDay: node.bornName || null,
            bornMonth: node.bornMonth || null,
            bornYear: node.bornYear || null,
            alive: node.alive || true,
            defunctionDay: node.defunctionDay || null,
            defunctionMonth: node.defunctionMonth || null,
            defunctionYear: node.defunctionYear || null,
            gender: node.gender || null,
            professions: node.professions || [],
            alias: node.alias || null,
            byography: node.byography || null,
            birthCountry: node.birthCountry || null,
            birthProvince: node.birthProvince || null,
            birthCity: node.birthCity || null,
            knownDiseases: node.knownDiseases || [],
            healthDetails: node.healthDetails || null,
            defunctionCountry: node.defunctionCountry || null,
            defunctionProvince: node.defunctionProvince || null,
            defunctionCity: node.defunctionCity || null,
            defunctionDisease: node.defunctionDisease || [],
            defunctionDetails: node.defunctionDetails || null,
            highlight: node.highlight || false
        }
        console.log("Saved Node", this.properties);
    }
}
export default IndividualNode;