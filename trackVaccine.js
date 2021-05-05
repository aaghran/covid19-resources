const moment = require("moment");

const fetch = require("isomorphic-fetch");
const { sendEmail } = require("./email/sendEmail");
// Check for district, check for pincode, send mail.

// Call cowin for district
function getByDistrict(district) {
  let date = moment().format("DD-MM-YYYY");
  let centers = [];
  let available18 = 0;
  let available45 = 0;
  console.log(centers);
  fetch(
    `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${district}&date=${date}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      let centers = [];
      let available18 = 0;
      let available45 = 0;
      data.centers.map(function (center) {
        if (
          center.sessions.length > 0 &&
          center.sessions.filter((session) => session.available_capacity > 0)
            .length
        ) {
          let session18 = center.sessions.filter(
            (session) => session.min_age_limit == 18
          );
          if (session18.length) {
            center.available18 = true;
            center.session18 = session18;
          }
          available18 = session18.reduce(function (acc, curr) {
            return acc + curr.available_capacity;
          }, available18);

          let session45 = center.sessions.filter(
            (session) => session.min_age_limit == 45
          );
          if (session45.length) {
            center.available45 = true;
            center.session45 = available45;
          }
          available45 = session45.reduce(function (acc, curr) {
            return acc + curr.available_capacity;
          }, available45);
        }
        centers.push(center);
      });
      console.log(centers);
      console.log(available45);
      console.log(available18);
      if (available45) {
        sendEmail(["aaghran@gmail.com"], "body", "subject");
      }
    });
}
getByDistrict(294);
// Call cowin for pincode
