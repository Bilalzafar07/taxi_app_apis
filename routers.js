const express = require("express");
const router = express.Router();
const userController = require("../../controller/user");
const checkauth2 = require("./verifyToken");
const jwt = require("jsonwebtoken");
const requestController = require('./request-controller');
const DriverEarnings = require ('./driverearning');

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.post("/loginwithphone", userController.loginUserwithPhone);

router.patch("/update", checkauth2, userController.updateUser);
router.get("/getauser", checkauth2, userController.GetAsingleUser);
router.get("/getall", userController.getAllUsers);
router.get("/setstatus", checkauth2, userController.CheckUserStatus);
router.get("/sendRequestToDriver", checkauth2, userController.CheckUserStatus);
router.get("/acceptRequest", checkauth2, userController.CheckUserStatus);
router.get("/declineRequest", checkauth2, userController.CheckUserStatus);
router.get('/driver/:driverId', requestController.getForDriver);
router.get('/passenger/:passengerId', requestController.getForPassenger);
router.post('/', requestController.create);
router.put('/:id', requestController.changeStatus);
router.delete('/:id', requestController.remove);const tController=require('./controllers/travel_history')
router.get('/driverEarning',checkauth2,DriverEarnings.driverearning);

module.exports = router;
