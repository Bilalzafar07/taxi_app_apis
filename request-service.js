const Request = require('./request-model');

const getForDriver = async (driverId) => {
  try {
    return await Request.find({ driver: driverId })
      .populate('rideOffer', 'from to startTime')
        .populate('passenger', 'firstName lastName username');
  } catch (err) {
    throw new Error(err.message);
  }
};

const getForPassenger = async (passengerId) => {
  try {
    return await Request.find({ passenger: passengerId })
      .populate('rideOffer', 'from to startTime')
        .populate('driver', 'firstName lastName username');
  } catch (err) {
    throw new Error(err.message);
  }
};

const create = async (body) => {
  try {
    return await Request.create(body);
  } catch (err) {
    throw new Error(err.message);
  }
};

const changeStatus = async (requestId, body) => {
  try {
    await Request.findByIdAndUpdate(requestId, body);
    return Request.findById(requestId);
  } catch (err) {
    throw new Error(err.message);
  }
};

const remove = async (requestId) => {
  try {
    await Request.findByIdAndRemove(requestId);
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  getForDriver,
  getForPassenger,
  create,
  changeStatus,
  remove
}