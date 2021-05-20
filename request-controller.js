const requestService = require('./request-service');

const getForDriver = async (req, res) => {
  try {
    const result = await requestService.getForDriver(req.params.driverId);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getForPassenger = async (req, res) => {
  try {
    const result = await requestService.getForPassenger(req.params.passengerId);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const create = async (req, res) => {
  try {
    req.body.passenger = req.userId;
    const result = await requestService.create(req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const changeStatus = async (req, res) => {
  try {
    const result = await requestService.changeStatus(req.params.id, req.body);
    res.json(result);   
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const remove = async (req, res) => {
  try {
    await requestService.remove(req.params.id);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  getForDriver,
  getForPassenger,
  create,
  changeStatus,
  remove
};