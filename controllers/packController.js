const controller = {
  open: async (req, res, next) => {
    const { setCode, packType } = req.params;
    console.log("packController open function...");
    console.log("setCode: ", setCode, ", packType: ", packType);
    return res.json();
  },
};

module.exports = controller;