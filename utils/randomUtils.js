const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// options: {option1: weight1, option2: weight2, option3: weight3}
const getRandomOptionWeighted = (options) => {
  let totalWeight = 0;
  Object.values(options).forEach(value => totalWeight += value);
  
  const weightMatrix = {};
  let currentWeight = 0;
  for (const [key,value] of Object.entries(options)) {
    currentWeight += value;
    weightMatrix[currentWeight] = key;
  }

  const rand = Math.random() * 1 * totalWeight;
  for (const [key, value] of Object.entries(weightMatrix)) {
    if (rand > key) continue;
    return value;
  }
};

module.exports = { getRandomInt, getRandomOptionWeighted };
