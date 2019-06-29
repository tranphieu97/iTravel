const { Schema, model } = require('mongoose');

const userInterestSchema = new Schema({
  _id: Schema.Types.ObjectId,
  userId: String,
  tour: [
    {
      tourId: String,
      point: Number,
      updateAt: Date
    }
  ]
});

const UserInterest = model('UserInterest', userInterestSchema, 'UserInterests');

module.exports = {
  UserInterest
};
