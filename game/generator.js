import { getTypeById } from "./types.js";

export function generateExerices(num, types) {
    const output = []
    for (let i = 0; i < num; i++) {
        const typeI = Math.floor(Math.random() * types.length)
        const num1 = Math.floor(Math.random() * 100)
        const num2 = Math.floor(Math.random() * 100)
        const type = getTypeById(types[typeI])
        const answer = type.compute(num1, num2)
        output.push({num1, num2, answer, type})
    }
    return output
}

