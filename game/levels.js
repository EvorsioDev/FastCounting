const levels = {
  EASY: {
    id: "type-easy",
    time: 20,
    default: true,
  },
  MEDIUM: {
    id: "type-medium",
    time: 10,
    default: false,
  },
  HARD: {
    id: "type-hard",
    time: 5,
    default: false,
  },
};

export function getLevelById(id) {
    for (let t in levels) {
        const level = levels[t]
        if (level.id == id) {
            return level
        }
    }
    return null
}

export default { levels: levels };
