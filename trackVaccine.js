// import dotenv
require("dotenv").config();
const moment = require("moment");

const axios = require("axios").default;
const { emailforDistrict, emailPinCode } = require("./email/emailUtils");
// Check for district, check for pincode, send mail.

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

const { getAuthToken, getSpreadSheetValues } = require("./utils/googleService");

const spreadsheetId = process.env.spreadsheetId;

async function getConfig() {
  try {
    const auth = await getAuthToken();
    const res = await getSpreadSheetValues({
      spreadsheetId,
      auth,
      sheetName: "Form responses 1",
    });
    let values = res.data.values;
    values.shift();

    let config = new Map();

    values.map((row) => {
      let tmp = {
        email: row[1],
        type: row[2],
        code: row[3],
        age: row[4],
      };
      let key = `${tmp.code}_${tmp.type}_${tmp.age}`;
      if (config.has(key)) {
        let emailList = config.get(key);
        if (!emailList.includes(tmp.email)) {
          emailList.push(tmp.email);
          config.set(key, emailList);
        }
      } else config.set(key, [tmp.email]);
      // console.log(JSON.stringify(tmp));
    });
    console.log("config is ---");
    console.log(config);

    config.forEach(function (value, key) {
      let conf = key.split("_");
      console.log(conf);
      // 294_District_18
      if (conf[1] == "District") {
        console.info(conf[0], value, [conf[2]]);
        getByDistrict(conf[0], value, [conf[2]]);
      } else {
        console.info(conf[0], value, [conf[2]]);
        getByPinCode(conf[0], value, [conf[2]]);
      }
      console.log(key + " = " + value);
    });
  } catch (error) {
    console.log(error.message, error.stack);
  }
}

var cron = require("node-cron");
console.log("task runner is ready");
cron.schedule(
  "5 * * * *",
  () => {
    console.log("run task at", moment());
    getConfig();
  },
  { timezone: "Asia/Kolkata" }
);

// testGetSpreadSheet();
