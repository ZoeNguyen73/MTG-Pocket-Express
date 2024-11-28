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

const transferUserCard = async (fromUserId, toUserId, card_id, finish, transferQuantity = 1) => {
  try {
    // validate that the transfer quantity is valid 
    if (!Number.isInteger(transferQuantity) || transferQuantity < 1) {
      const error = new Error();
      error.details = `Transfer Quantity ${transferQuantity} is invalid`;
      error.statusCode = 400;
      throw error;
    }

    // validate that the fromUserId has the card
    const fromUserCard = await UserCardModel.findOne({
      user_id: fromUserId,
      card_id,
      finish
    });

    if (!fromUserCard || fromUserCard.quantity < transferQuantity) {
      const error = new Error();
      error.details = `User ${fromUserId} does not have sufficient cards for transfer`;
      error.statusCode = 400;
      throw error;
    }

    await UserCardModel.updateOne(
      { user_id: fromUserId, card_id, finish },
      { $inc: { quantity: transferQuantity * -1 } },
      { upsert: false }
    );

    await UserCardModel.updateOne(
      { user_id: toUserId, card_id, finish },
      { $inc: { quantity: transferQuantity } },
      { upsert: true }
    );

  } catch (error) {
    next(error);
  }
};

module.exports = { updateUserCard, transferUserCard };