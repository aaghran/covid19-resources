import fetch from "isomorphic-fetch";

export function getStates() {
  return fetch("https://cdn-api.co-vin.in/api/v2/admin/location/states", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
}

export function getDistricts(district_id) {
  return fetch(
    `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${district_id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
}

export function getCalendarByDistrict(district, date) {
  return fetch(
    `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${district}&date=${date}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
}
