const { Tour } = require('../../model/mongoose/models');

exports = module.exports = {};

/**
 * @author Thong
 * @param tourData
 * @description if not ok => return false => need refetch data
 */
exports.updateTourStatus = tourData => {
  try {
    const fixToPREPARING = [];
    const fixToRUNNING = [];
    const fixToFINISHED = [];
    for (let tour of tourData) {
      if (
        tour.status === 'REGISTERING' &&
        Date.now() >= new Date(tour.closeRegisterTime).getTime()
      ) {
        fixToPREPARING.push(tour._id + '');
        tour.status = 'PREPARING';
      } else if (
        tour.status === 'PREPARING' &&
        Date.now() >= new Date(tour.beginTime).getTime()
      ) {
        fixToRUNNING.push(tour._id + '');
        tour.status = 'RUNNING';
      } else if (
        tour.status === 'RUNNING' &&
        Date.now() >= new Date(tour.endTime).getTime()
      ) {
        fixToFINISHED.push(tour._id + '');
        tour.status = 'FINISHED';
      }
    }
    if (fixToPREPARING.length)
      Tour.updateMany(
        { _id: { $in: fixToPREPARING } },
        { $set: { status: 'PREPARING' } }
      ).exec();
    if (fixToRUNNING.length)
      Tour.updateMany(
        { _id: { $in: fixToRUNNING } },
        { $set: { status: 'RUNNING' } }
      ).exec();
    if (fixToFINISHED.length)
      Tour.updateMany(
        { _id: { $in: fixToFINISHED } },
        { $set: { status: 'FINISHED' } }
      ).exec();
    return tourData;
  } catch (error) {
    console.error('error', error.message);
    return tourData;
  }
};
