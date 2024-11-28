const UserCardModel = require("../models/userCardModel");
const UserCardValidator = require("../validations/userCardValidation");

const updateUserCard = async (user_id, card, quantity = 1) => {
  const card_id = card._id.toString();
  const finish = card.finish;

  try {
    await UserCardValidator.update.validateAsync({
      user_id,
      card_id,
      finish,
      quantity
    });
  } catch (error) {
    throw new Error(`Validation Error: ${error.message}`);
  }

  try {
    await UserCardModel.updateOne(
      { user_id, card_id, finish },
      { $inc: { quantity } },
      { upsert: true }
    )
  } catch (error) {
    next(error);
  }
};

module.exports = { updateUserCard };