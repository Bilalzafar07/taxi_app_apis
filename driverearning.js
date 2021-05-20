const express = require("express");
const app = express();
const cors = require("cors");
const { ResumeToken } = require("mongodb");
const http = require("http");
const hostname= '127.0.0.1';
const port = 9000;

var router = express.Router();
router.use(cors());

// GET: getEarnings
router.get("/getEarnings", (request, response) => {
  ResumeToken.authenticate("AuthenticateDriver", { session: false }, (result) => {
    try {
      if (result.Message === "Driver found.") {
        DriverEarnings.findAll({
          where: { driver_id: result.Driver.driver_id },
        }).then(async (driverEarnings) => {
          if (driverEarnings) {
            let modifiableDriverEarnings = [];
            let netEarning = 0.0;
            let count = 0;

            for (let driverEarning of driverEarnings) {
              netEarning += driverEarning.payment/2;
              modifiableDriverEarnings[count++] = modifiableDriverEarning;
            }

            if (modifiableDriverEarnings.length > 0) {
              modifiableDriverEarnings.sort((a, b) => {
                let dateA = new Date(a.Created);
                let dateB = new Date(b.Created);
                return dateB - dateA;
              });
            }

            response.json({
              Message: "Earnings found.",
              Earnings: modifiableDriverEarnings,
              NetEarning: netEarning,
            });
          } else {
            response.json({
              Message: "Earnings not found.",
            });
          }
        });
      } else {
        response.json({
          Message: result.Message,
        });
      }
    } catch (error) {
      response.json({
        Message: error.message,
      });
    }
  })(request, response);
});

module.exports = router;


app.listen(port, hostname, ()=>{
    console.log(`Server running at http://${hostname}:${port}/`);
});