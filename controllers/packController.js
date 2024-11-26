const controller = {
  open: async (req, res, next) => {
    console.log("packController open function...");
    return res.json();
  },
};

module.exports = controller;