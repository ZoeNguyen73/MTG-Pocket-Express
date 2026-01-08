const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// options: {option1: weight1, option2: weight2, option3: weight3}
const getRandomIndexWeighted = (weights) => {
  const totalWeight = weights.reduce((sum, w) => sum + w, 0);

  let r = Math.random() * totalWeight;
  
  for (let i = 0; i < weights.length; i++) {
    r -= weights[i];
    if (r < 0) return i;
  }
  return weights.length - 1; // safety net
};

module.exports = { getRandomInt, getRandomIndexWeighted };
