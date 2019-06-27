const { UserInterest } = require('../../model/mongoose/models');
const ObjectId = require('mongodb').ObjectId;

exports = module.exports = {};

exports.updateUserInterest = async userId => {
  try {
    if(!userId) return;
    const findRes = await UserInterest.findOne({ userId });
    if (!findRes) {
      const newUserInterest = new UserInterest({
        userId,
        tour: []
      });
      newUserInterest._id = new ObjectId();
      await newUserInterest.save();
      console.log('Not has UserInterest yet, created new one successful');
    } else {
      // update
      let tourList = findRes.tour;
      tourList = tourList
        .map(tour => {
          const toDay = new Date();
          const lastUpdateDate = new Date(tour.updateAt);
          const duration = Math.floor(
            (toDay.valueOf() - lastUpdateDate.valueOf()) / 86400000
          );
          const reducedValue = duration * 15;
          if (reducedValue > 0) {
            tour.point -= reducedValue;
            tour.updateAt = new Date();
            console.log(`Tour ${tour.tourId} reduced ${reducedValue} point(s)`);
          }
          return tour;
        })
        .filter(tour => tour.point > 0);
      await updateTourInterestList(userId, tourList);
    }
    return;
  } catch (error) {
    console.error('error', error.message);
    return;
  }
};

exports.findTourInterestByUser = async userId => {
  try {
    const findRes = await UserInterest.findOne({ userId });
    if (findRes.tour) {
      return findRes.tour;
    } else {
      return [];
    }
  } catch (error) {
    console.error('error', error.message);
    return [];
  }
};

updateTourInterestList = async (userId, tourList) => {
  try {
    const res = await UserInterest.updateOne(
      { userId },
      { $set: { tour: tourList } }
    );
  } catch (error) {
    console.error('error', error.message);
    return;
  }
};

exports.updateTourInterestPoint = async (userId, tourId, value) => {
  try {
    const tourInterestObj = await UserInterest.findOne({ userId });
    let tourList = tourInterestObj.tour;
    let needUpdate = tourList.find(tour => tour.tourId === tourId);
    if (needUpdate) {
      needUpdate.point = needUpdate.point + Number(value);
      needUpdate.updateAt = new Date();
    } else {
      tourList.push({
        tourId,
        point: value,
        updateAt: new Date()
      });
    }
    tourList = tourList.map(tour => {
      if (tour.tourId !== tourId) {
        tour.point -= Math.round(value / 3);
      }
      return tour;
    });
    // check amount of interest
    tourList = tourList
      .sort((tourA, tourB) => tourA.point < tourB.point)
      .slice(0, 5)
      .filter(tour => tour.point > 0);
    // update
    await updateTourInterestList(userId, tourList);
  } catch (error) {
    console.error('error', error.message);
    return;
  }
};
