const getInterests = require('./getInterests');
const getPeople = require('./getPeople');
const getPets = require('./getPets');
const fs = require('fs');
const https = require('https');

function scavengeForNCData (){

    getPeople();

    function promise(){
        getInterests();
        getPets();
    }
    setTimeout(promise, 3000);
};

scavengeForNCData();
