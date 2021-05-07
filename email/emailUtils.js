const {
  emailBody,
  emailBodyNoSlots,
  emailBodyPincode,
  emailBodyPincodeNoSlots,
} = require("./emailBody");
const { sendEmail } = require("./sendEmail");

function formatData(data) {
  let centers = [];
  let available18 = 0;
  let available45 = 0;

  data.centers.map(function (center) {
    if (
      center.sessions.length > 0 &&
      center.sessions.filter((session) => session.available_capacity > 0).length
    ) {
      let session18 = center.sessions.filter(
        (session) => session.min_age_limit == 18
      );
      if (session18.length) {
        center.availableSlots = true;
        center.session18 = session18;
      }
      available18 = session18.reduce(function (acc, curr) {
        return acc + curr.available_capacity;
      }, available18);

      let session45 = center.sessions.filter(
        (session) => session.min_age_limit == 45
      );
      if (session45.length) {
        center.availableSlots = true;
        center.session45 = available45;
      }
      available45 = session45.reduce(function (acc, curr) {
        return acc + curr.available_capacity;
      }, available45);
    }
    centers.push(center);
  });
  return { centers, available18, available45 };
}

exports.emailforDistrict = function (district, data, emailList, sendFor) {
  let { centers, available18, available45 } = formatData(data);
  if (available18 || available45) {
    console.log(
      `Available slots in district ${district}, 18-44 ${available18}, >45 ${available45}`
    );
  } else {
    console.log(`No available slots in district ${district}`);
  }
  if (available18 && sendFor.includes(18)) {
    let { subject, body } = emailBody(
      district,
      centers,
      "18 - 45 years",
      available18
    );
    sendEmail(emailList, body, subject);
  } else {
    let { subject, body } = emailBodyNoSlots(
      district,
      centers,
      "18 - 45 years"
    );
    sendEmail(["aaghran@gmail.com"], body, subject);
  }

  if (available45 && sendFor.includes(45)) {
    let { subject, body } = emailBody(
      district,
      centers,
      "> 45 years",
      available45
    );
    sendEmail(emailList, body, subject);
  } else {
    let { subject, body } = emailBodyNoSlots(district, centers, "> 45 years");
    sendEmail(["aaghran@gmail.com"], body, subject);
  }
  return;
};

exports.emailPinCode = function (pincode, data, emailList, sendFor) {
  let { centers, available18, available45 } = formatData(data);
  if (available18 || available45) {
    console.log(
      `Available slots in pincode ${pincode}, 18-44 ${available18}, >45 ${available45}`
    );
  } else {
    console.log(`No available slots in pincode ${pincode}`);
  }
  if (available18) {
    let { subject, body } = emailBodyPincode(
      pincode,
      centers,
      "18 - 45 years",
      available18
    );
    if (sendFor.includes(18)) sendEmail(emailList, body, subject);
  } else {
    let { subject, body } = emailBodyPincodeNoSlots(
      pincode,
      centers,
      "18 - 45 years"
    );
    if (sendFor.includes(18)) sendEmail(["aaghran@gmail.com"], body, subject);
  }

  if (available45 && sendFor.includes(45)) {
    let { subject, body } = emailBodyPincode(
      pincode,
      centers,
      "> 45 years",
      available45
    );
    if (sendFor.includes(45)) sendEmail(emailList, body, subject);
  } else {
    let { subject, body } = emailBodyPincodeNoSlots(
      pincode,
      centers,
      "> 45 years"
    );
    if (sendFor.includes(45)) sendEmail(["aaghran@gmail.com"], body, subject);
  }
  return;
};
