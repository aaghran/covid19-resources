const moment = require("moment");

const axios = require("axios").default;
const { sendEmail } = require("./email/sendEmail");
// Check for district, check for pincode, send mail.

// const body18 = require("./email/ema");
// Call cowin for district
function getByDistrict(district, emailList) {
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
      let centers = [];
      let data = response.data;
      // console.log(data)
      debugger;
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
      // console.log(centers);
      // console.log(available45);
      // console.log(available18);
      if (available18) {
        let subject = `Horaay! Hurry up, vaccine slots available - 18-45 years - ${centers[0].district_name}`;
        let body18 = `<div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:14px;line-height:1.5;text-align:left;color:#000000;">
        <p>Hi,</p>
        <p>You asked me to notify you when vaccines are back in stock.</p>
        <p>There are vaccination slots available for <b>${centers[0].district_name}</b> at the ${centers.length} centers for above 18 years age</p>
        <p>Available slots - ${available18}</p>
        <p><a href="https://covid19.aaghran.com/vaccine-slots" target="_blank" rel="noopener" style="color: red;">View all centers</a></p>
        <br />
        <p><a href="https://selfregistration.cowin.gov.in/" target="_blank" rel="noopener" style="color: #0000EE;">Register and get vaccinated at Cowin</a></p>
        </div>`;
        console.log(body18);
        sendEmail(emailList, body18, subject);
      } else {
        let subject = `No slots available for - 18-45 years - ${centers[0].district_name}`;
        let body18 = `<div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:14px;line-height:1.5;text-align:left;color:#000000;">
        <p>Hi,</p>
        <p>You asked me to notify you when vaccines are back in stock.</p>
        <p>No slots in <b>${centers[0].district_name}</b> for above 18 years age</p>
        <p><a href="https://covid19.aaghran.com/vaccine-slots" target="_blank" rel="noopener" style="color: red;">View all centers</a></p>
        <br />
        <p><a href="https://selfregistration.cowin.gov.in/" target="_blank" rel="noopener" style="color: #0000EE;">Register and get vaccinated at Cowin</a></p>
        </div>`;
        console.log(body18);
        sendEmail(["aaghran@gmail.com"], body18, subject);
      }

      if (available45) {
        let subject = `Horaay! Hurry up, vaccine slots available - > 45 years - ${centers[0].district_name}`;
        let body45 = `<div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:14px;line-height:1.5;text-align:left;color:#000000;">
          <p>Hi,</p>
          <p>You asked me to notify you when vaccines are back in stock.</p>
          <p>There are vaccination slots available for <b>${centers[0].district_name}</b> at the ${centers.length} centers for above 45 years age</p>
          <p>Available slots - ${available45}</p>
          <p><a href="https://covid19.aaghran.com/vaccine-slots" target="_blank" rel="noopener" style="color: red;">View all centers</a></p>
          <br />
          <p><a href="https://selfregistration.cowin.gov.in/" target="_blank" rel="noopener" style="color: #0000EE;">Register and get vaccinated at Cowin</a></p>
          </div>`;
        console.log(body45);
        sendEmail(emailList, body45, subject);
      } else {
        let subject = `No slots available for > 45 years - ${centers[0].district_name}`;
        let body45 = `<div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:14px;line-height:1.5;text-align:left;color:#000000;">
        <p>Hi,</p>
        <p>You asked me to notify you when vaccines are back in stock.</p>
        <p>No slots in <b>${centers[0].district_name}</b> for > 45 years age</p>
        <p><a href="https://covid19.aaghran.com/vaccine-slots" target="_blank" rel="noopener" style="color: red;">View all centers</a></p>
        <br />
        <p><a href="https://selfregistration.cowin.gov.in/" target="_blank" rel="noopener" style="color: #0000EE;">Register and get vaccinated at Cowin</a></p>
        </div>`;
        console.log(body45);
        sendEmail(["aaghran@gmail.com"], body18, subject);
      }
    })
    .catch((err) => console.error(err));
}

var cron = require("node-cron");
cron.schedule("* 8-18/2 * * *", () => {
  getByDistrict(294, ["aaghran@gmail.com"]);
  getByDistrict(730, ["aaghran@gmail.com"]);
});

// Call cowin for pincode
