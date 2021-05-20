const http= require('http');
const express = require('express')
const app = express()
const hostname = "127.0.0.1"
const port =80;
const Server= http.createServer((req, res)=>{
    console.log(req.url);
    res.statuscode=200;
    res.setHeader("content-type", "text/html");



async function acceptTrip(user_id, { trip_id }) {
    try {
        let __user = await User.findById(user_id);
        if (!__user) throw new Error("account not found");
        let __trip = await Trip.find({ _id: trip_id, ready: true, user_id: null });
        if (!__trip) throw new Error("trip not found");
        __trip.user_id = user_id;
        await __trip.save();
        return {
            trip: __trip,
        };
    }
    catch (err) {
        throw err;
    }
}

async function startTrip(user_id, { trip_id }) {
    try {
        let __user = await User.findById(user_id);
        if (!__user) throw new Error("account not found");
        let __trip = await Trip.find({ _id: trip_id, user_id: user_id });
        if (!__trip) throw new Error("trip not found");
        __trip.start_time = new Date();
        await __trip.save();
        return {
            trip: __trip,
        };
    }
    catch (err) {
        throw err;
    }
}

async function endTrip(user_id, { trip_id }) {
    try {
        let __user = await User.findById(user_id);
        if (!__user) throw new Error("account not found");
        let __trip = await Trip.find({ _id: trip_id, user_id: user_id });
        if (!__trip) throw new Error("trip not found");
        __trip.end_time = new Date();
        await __trip.save();
        return {
            trip: __trip,
        };
    }
    catch (err) {
        throw err;
    }

}
async function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km

    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180)
}
function TotalPayment() {
    return getDistanceFromLatLonInKm(23, 23, 55, 34) * 5;


}
module.exports = {
    acceptTrip: acceptTrip,
    startTrip: startTrip,
    endTrip: endTrip,
    distance: getDistanceFromLatLonInKm(23, 23, 55, 34),
    payment: TotalPayment()
};
});
Server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
