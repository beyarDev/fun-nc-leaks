const https = require('https');
const fs = require('fs');


const requestOptions = {
    hostname: 'nc-leaks.herokuapp.com',
    path: '/api/people',
    method: 'GET'
};

const req = https.request(requestOptions, (response)=>{
    let packets = ''
    response.on('data', (packet)=>{
        packets += packet.toString();
    })

    response.on('end', ()=>{
        const result = JSON.parse(packets);
        const ncEmployees = result.people.filter(employee =>{
            return employee.job.workplace === 'northcoders';
        })
        console.log(ncEmployees);
    })
})


req.end();