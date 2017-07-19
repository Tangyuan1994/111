
var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var o = require('./services')

// o.getCouchData(['5330e2f3a0dd8ee433e3e702df012c19']).then(function(response){
//     console.log(response)
// });
//
// o.postCouchData('azeru74523dfyh8545985dqsqsd', {name:"Hello", type:"Type"}).then(function(response){
//     console.log(response)
// })

o.getToken('florian.bertot@depinfonancy.net', '123456').then(function(resp){
    o.checkToken(resp)
        .then(function(response) {
            console.log(response)
        })
        .catch(function(error){
            console.log(error)
        })
})

o.checkToken("9580")
    .then(function(response) {
        console.log(response)
    })
    .catch(function(error){
        console.log(error)
    })


router.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});

module.exports = router;
