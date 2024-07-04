const TYPES = {
  ADDITION: {
    id: "type-addition",
    symbol: "+",
    compute: (operand1, operand2) => operand1 + operand2,
  },
  SUBTRACTION: {
    id: "type-subtraction",
    symbol: "-",
    compute: (operand1, operand2) => operand1 - operand2,
  },
};

export function getTypeById(id) {
    for (let t in TYPES) {
        const type = TYPES[t]
        if (type.id === id) {
            return type
        }
    }
    return null
}

export default {types: TYPES}
