const https = require("https");
const fs = require("fs");

function getPets() {
  fs.readFile("northcoders.json", "utf-8", (err, people) => {
    const employees = JSON.parse(people);
    const petOwners = [];
    let count = 0;
    employees.forEach((employee) => {
      const requestObject = {
        hostname: "nc-leaks.herokuapp.com",
        path: `/api/people/${employee.username}/pets`,
      };
      const req = https.request(requestObject, (response) => {
        count++;
        if (response.statusCode === 200) {
          let packets = "";
          response.on("data", (packet) => {
            packets += packet.toString();
          });
          response.on("end", () => {
            const result = JSON.parse(packets);
            petOwners.push(result);
            if (employees.length === count) {
              const petOwnersString = JSON.stringify(petOwners);
              fs.writeFile("pets.json", petOwnersString, () => {});
            }
          });
        }
      });
      req.end();
    });
  });
}

module.exports = getPets;
