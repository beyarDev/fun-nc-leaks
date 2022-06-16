const fs = require("fs");
const https = require("https");

function getInterests (){
  
  fs.readFile("northcoders.json", "utf-8", (err, data) => {
    const employess = JSON.parse(data);
    const userNames = employess.map((employee) => {
      return employee.username;
    });
    const interests = [];
    userNames.forEach((user) => {
      const req = https.request(
        {
          hostname: "nc-leaks.herokuapp.com",
          path: `/api/people/${user}/interests`,
        },
        (response) => {
          let packets = "";
          response.on("data", (packet) => {
            packets += packet.toString();
          });
          response.on("end", () => {
            interests.push(packets);
            if (interests.length === userNames.length) {
              const interestSting = JSON.stringify(interests);
              fs.writeFile("interests.json", interestSting, (err, data) => {});
            }
          });
        }
      );
      req.end();
    });
  });
}

module.exports = getInterests;