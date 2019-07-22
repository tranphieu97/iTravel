const { UserInterest } = require('../../model/mongoose/models');
const ObjectId = require('mongodb').ObjectId;
const axios = require('axios');
const database = require('../database.js');
const unicodeService = require('./remove-unicode.js');

exports = module.exports = {};

getLocationName = async req => {
  try {
    const forwarded = req.headers['x-forwarded-for'];
    const ip = forwarded
      ? forwarded.split(/, /)[0]
      : req.connection.remoteAddress;

     const apiRes = await axios.get(`http://ip-api.com/json/${ip}`) // DEPLOY
    //const apiRes = await axios.get('http://ip-api.com/json/171.227.96.25'); // DEVELOP

    return apiRes.data && apiRes.data.regionName
      ? apiRes.data.regionName
      : null;
  } catch (error) {
    console.log('error in getLocationName: ', error.message);
  }
};

getNearbyNames = async nearby => {
  try {
    const queryObj = {
      provinceId: { $in: nearby }
    };
    const projectionObj = {
      provinceName: 1
    };
    const listNearbyName = await database.getCollectionDataByProjection(
      database.iTravelDB.ProvinceCity,
      queryObj,
      projectionObj
    );

    return listNearbyName.map(eachNearby =>
      unicodeService.removeUnicode(eachNearby.provinceName)
    );
  } catch (error) {
    console.error('error in getNearbyNames:', error.message);
    return [];
  }
};

getNearby = async req => {
  try {
    const currentLocationName = await getLocationName(req);
    if (!currentLocationName || !currentLocationName.length) return [];

    const queryObj = {};
    const projectionObj = {
      _id: 1,
      nearby: 1,
      provinceId: 1,
      provinceName: 1
    };
    const listProvinceCity = await database.getCollectionDataByProjection(
      database.iTravelDB.ProvinceCity,
      queryObj,
      projectionObj
    );

    const regex = new RegExp(currentLocationName, 'gi');
    const currentProvinceCity = listProvinceCity.find(province =>
      unicodeService.removeUnicode(province.provinceName).match(regex)
    );

    if (currentProvinceCity) {
      return await getNearbyNames(currentProvinceCity.nearby);
    } else {
      return [];
    }
  } catch (error) {
    console.error('error in getNearby:', error.message);
    return [];
  }
};

exports.updateUserInterest = async userId => {
  try {
    if (!userId) return;
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
      // update point for already exist
      needUpdate.point = needUpdate.point + Number(value);
      needUpdate.updateAt = new Date();
    } else {
      // push new tour
      tourList.push({
        tourId,
        point: value,
        updateAt: new Date()
      });
    }

    // reduce point for all other tour
    tourList = tourList.map(tour => {
      if (tour.tourId !== tourId) {
        tour.point -= Math.round(value / 3);
      }
      return tour;
    });

    // check limit amount of interest
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

exports.shouldPlusNearby = async req => {
  try {
    const tourId = req.body.tourId;
    const nearbyNamesPromise = getNearby(req);
    const tourLocationNamesPromise = getTourLocation(tourId);

    const nearbyNames = await nearbyNamesPromise;
    const tourLocationNames = await tourLocationNamesPromise;

    // console.log('nearbyNames', nearbyNames);
    // console.log('tourLocationNames', tourLocationNames);
    for (let locationName of tourLocationNames) {
      if (nearbyNames.includes(locationName)) {
        return true;
      }
    }

    return false;
  } catch (error) {
    console.log('error in shouldPlusNearby: ', error.message);
    return false;
  }
};

getTourLocationName = async locationIds => {
  const queryObj = {
    _id: { $in: locationIds.map(id => new ObjectId(id)) }
  };
  const projectionObj = {
    _id: 1,
    provinceCity: 1
  };
  const listLocation = await database.getCollectionDataByProjection(
    database.iTravelDB.Locations,
    queryObj,
    projectionObj
  );
  const listLocationProvince = listLocation.map(
    location => location.provinceCity
  );
  let provinceNames = [];
  for (let loc of listLocationProvince) {
    provinceNames.push(...loc);
  }
  provinceNames = provinceNames.map(prov => unicodeService.removeUnicode(prov));
  return provinceNames;
};

getTourLocation = async tourId => {
  try {
    const tour = await database.getOneWithProjection(
      database.iTravelDB.Tours,
      { _id: new ObjectId(tourId) },
      { locationIds: 1 }
    );
    const tourLocationNames = await getTourLocationName(tour.locationIds);
    return tourLocationNames;
  } catch (error) {
    console.log(error.message);
  }
};
