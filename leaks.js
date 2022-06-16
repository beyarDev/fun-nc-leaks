const https = require('https')
const fs = require('fs')


const requestOptions = {
    hostname: 'nc-leaks.herokuapp.com',
    path: '/api/confidential'
};

const req = https.request(requestOptions, (response)=>{
    let packets = ''
    response.on('data', (packet) =>{
        packets += packet.toString();
    })

    response.on('end', () =>{
        // const result = JSON.parse(packets)
        // console.log(result);
        fs.writeFile('instructions.md', packets, (err, data)=>{});
    })
})

req.end();