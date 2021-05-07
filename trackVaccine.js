const moment = require("moment");

const axios = require("axios").default;
const { emailforDistrict, emailPinCode } = require("./email/emailUtils");
// Check for district, check for pincode, send mail.

// const body18 = require("./email/ema");
// Call cowin for district
function getByDistrict(district, emailList, sendFor) {
  let date = moment().format("DD-MM-YYYY");

  axios
    .get(
      `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${district}&date=${date}`,
      {
        headers: {
          "user-agent":
            "Mozilla/5.0 (Linux; Android 8.0.0; Pixel 2 XL Build/OPD1.170816.004) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Mobile Safari/537.36",
        },
      }
    )
    .catch((err) => console.error(err))
    .then((response) => {
      console.info("Fetched data for district", district);
      let data = response.data;
      emailforDistrict(district, data, emailList, sendFor);
    })
    .catch((err) => console.error(err));

  return;
}

function getByPinCode(pincode, emailList, sendFor) {
  let date = moment().format("DD-MM-YYYY");

  axios
    .get(
      `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pincode}&date=${date}`,
      {
        headers: {
          "user-agent":
            "Mozilla/5.0 (Linux; Android 8.0.0; Pixel 2 XL Build/OPD1.170816.004) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Mobile Safari/537.36",
        },
      }
    )
    .catch((err) => console.error(err))
    .then((response) => {
      let data = response.data;
      console.info("Fetched data for pincode", pincode);
      emailPinCode(pincode, data, emailList, sendFor);
    })
    .catch((err) => console.error(err));
  return;
}

var cron = require("node-cron");
console.log("task runner is ready");
cron.schedule(
  "30 6-18/2 * * *",
  () => {
    console.log("run task");
    getByDistrict(294, ["aaghran@gmail.com", "meghabepari@gmail.com"], [18]);
    getByPinCode(560043, ["aaghran@gmail.com", "meghabepari@gmail.com","aniruddha.nitd@gmail.com"], [18]);
    getByPinCode(
      442402,
      ["aaghran@gmail.com", "meghabepari@gmail.com"],
      [18, 45]
    );
    getByDistrict(730, ["aaghran@gmail.com", "kartikeya.nitd@gmail.com"], [18]);
    getByDistrict(
      737,
      ["aaghran@gmail.com", "agarwalankit3807@gmail.com"],
      [18, 45]
    );
    getByPinCode(
      560049,
      ["aaghran@gmail.com", "agarwalankit3807@gmail.com"],
      [18, 45]
    );
    getByPinCode(
      713347,
      ["aaghran@gmail.com", "agarwalankit3807@gmail.com"],
      [18, 45]
    );
  },
  { timezone: "Asia/Kolkata" }
);
// getByDistrict(294, ["aaghran@gmail.com"], [18, 45]);
// getByPinCode(110001, ["aaghran@gmail.com"], [18, 45]);
// Call cowin for pincode
