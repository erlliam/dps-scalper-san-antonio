import fetch from "node-fetch";

let zipCodes = [
  "78201",
  "78202",
  "78203",
  "78204",
  "78205",
  "78206",
  "78207",
  "78208",
  "78209",
  "78210",
  "78211",
  "78212",
  "78213",
  "78214",
  "78215",
  "78216",
  "78217",
  "78218",
  "78219",
  "78220",
  "78221",
  "78222",
  "78223",
  "78224",
  "78225",
  "78226",
  "78227",
  "78228",
  "78229",
  "78230",
  "78231",
  "78232",
  "78233",
  "78234",
  "78235",
  "78236",
  "78237",
  "78238",
  "78239",
  "78240",
  "78241",
  "78242",
  "78243",
  "78244",
  "78245",
  "78246",
  "78247",
  "78248",
  "78249",
  "78250",
  "78251",
  "78252",
  "78253",
  "78254",
  "78255",
  "78256",
  "78257",
  "78258",
  "78259",
  "78260",
  "78261",
  "78262",
  "78263",
  "78264",
  "78265",
  "78266",
  "78268",
  "78269",
  "78270",
  "78275",
  "78278",
  "78279",
  "78280",
  "78283",
  "78284",
  "78285",
  "78286",
  "78287",
  "78288",
  "78289",
  "78291",
  "78292",
  "78293",
  "78294",
  "78295",
  "78296",
  "78297",
  "78298",
  "78299"
];

let addressDates = [];

async function main() {
  let searchZipCodePromises = [];
  for (let zipCode of zipCodes) {
    searchZipCodePromises.push(searchZipCode(zipCode));
  }

  await Promise.all(searchZipCodePromises);
  
  let uniqueAddressDates = getUniqueListBy(addressDates, "address");
  for (let addressDate of uniqueAddressDates) {
    console.log(addressDate.date, addressDate.address);
  }
}

async function searchZipCode(zipCode) {
  let response = await fetchZipCode(zipCode);
  if (response.ok) {
    let results = await response.json();
    for (let result of results) {
      addressDates.push({
        address: result.Address,
        date: result.NextAvailableDate,
      });
    }
  }
}

function fetchZipCode(zipCode) {
  return fetch("https://publicapi.txdpsscheduler.com/api/AvailableLocation", {
    method: "POST",
    headers: {
      "Origin": "https://public.txdpsscheduler.com",
    },
    body: JSON.stringify({
      TypeId: 71,
      ZipCode: zipCode,
      CityName: "",
      PreferredDay: 0
    }),
  });
}

function getUniqueListBy(arr, key) {
  return [...new Map(arr.map(item => [item[key], item])).values()]
}

main();
