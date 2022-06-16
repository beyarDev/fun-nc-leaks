const https = require("https");
const fs = require("fs");

function getPeople(){
  
  const requestOptions = {
    hostname: "nc-leaks.herokuapp.com",
    path: "/api/people",
    method: "GET",
  };
  
  const req = https.request(requestOptions, (response) => {
    let packets = "";
    response.on("data", (packet) => {
      packets += packet.toString();
    });
  
    response.on("end", () => {
      const result = JSON.parse(packets);
      const ncEmployees = result.people.filter((employee) => {
        return employee.job.workplace === "northcoders";
      });
      const stringEmployees = JSON.stringify(ncEmployees);
      fs.writeFile("northcoders.json", stringEmployees, (err, file) => {});
    });
  });
  
  req.end();
}

module.exports = getPeople;
