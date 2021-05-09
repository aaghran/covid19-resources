exports.emailBody = function (district, centers, age, count) {
  let centerCount = centers.filter((center) => center.availableSlots == true)
    .length;
  let subject = `**Imp** Hurry up, vaccine slots available - ${age} - ${centers[0].district_name}`;
  let body = `<div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:14px;line-height:1.5;text-align:left;color:#000000;">
        <p>Hi,</p>
        <p>You asked me to notify you when vaccines are back in stock.</p>
        <p>There are vaccination slots available in district <b>${centers[0].district_name}</b> at the ${centerCount} centers for above ${age}</p>
        <p>Available slots - ${count}</p>
        <p><a href="https://covid19.aaghran.com/vaccine-slots" target="_blank" rel="noopener" style="color: red;">View all centers</a></p>
        <br />
        <p><a href="https://selfregistration.cowin.gov.in/" target="_blank" rel="noopener" style="color: #0000EE;">Register and get vaccinated at Cowin</a></p>
        </div>`;
  return { subject, body };
};

exports.emailBodyPincode = function (pincode, centers, age, count) {
  let centerCount = centers.filter((center) => center.availableSlots == true)
    .length;
  let subject = `**Imp** Hurry up, vaccine slots available - ${age} - ${pincode}`;
  let body = `<div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:14px;line-height:1.5;text-align:left;color:#000000;">
          <p>Hi,</p>
          <p>You asked me to notify you when vaccines are back in stock.</p>
          <p>There are vaccination slots available in pincode <b>${pincode}</b> at the ${centerCount} centers for above ${age}</p>
          <p>Available slots - ${count}</p>
          <p><a href="https://covid19.aaghran.com/vaccine-slots-pincode/${pincode}" target="_blank" rel="noopener" style="color: red;">View all centers</a></p>
          <br />
          <p><a href="https://selfregistration.cowin.gov.in/" target="_blank" rel="noopener" style="color: #0000EE;">Register and get vaccinated at Cowin</a></p>
          </div>`;
  return { subject, body };
};

exports.emailBodyNoSlots = function (district, centers, age) {
  let subject = `No slots available for ${age} - ${centers[0].district_name}`;
  let body = `<div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:14px;line-height:1.5;text-align:left;color:#000000;">
        <p>Hi,</p>
        <p>You asked me to notify you when vaccines are back in stock.</p>
        <p>No slots in district <b>${centers[0].district_name}</b> for ${age}</p>
        <p><a href="https://covid19.aaghran.com/vaccine-slots" target="_blank" rel="noopener" style="color: red;">View all centers</a></p>
        <br />
        <p><a href="https://selfregistration.cowin.gov.in/" target="_blank" rel="noopener" style="color: #0000EE;">Register and get vaccinated at Cowin</a></p>
        </div>`;
//   console.log(body);
  return { subject, body };
};

exports.emailBodyPincodeNoSlots = function (pincode, centers, age) {
  let subject = `No slots available for ${age} - ${pincode}`;
  let body = `<div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:14px;line-height:1.5;text-align:left;color:#000000;">
          <p>Hi,</p>
          <p>You asked me to notify you when vaccines are back in stock.</p>
          <p>No slots in pincode <b>${pincode}</b> for ${age}</p>
          <p><a href="https://covid19.aaghran.com/vaccine-slots-pincode/${pincode}" target="_blank" rel="noopener" style="color: red;">View all centers</a></p>
          <br />
          <p><a href="https://selfregistration.cowin.gov.in/" target="_blank" rel="noopener" style="color: #0000EE;">Register and get vaccinated at Cowin</a></p>
          </div>`;
//   console.log(body);
  return { subject, body };
};
