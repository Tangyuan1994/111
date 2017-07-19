
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



/**
 * Use ES for get the data sans image
 * @param ES query
 * @returns send reponse of Elasticsearch data sans image
 */
router.get('/:token/getData/:query', function (req, res,next) {

    o.checkToken(req.body.token)
        .then(function(response) {
                console.log(response)

                o.getESData(req.body.data.query)
                    .then(function(response)
                {
                    res.json(response)
                })
                    .catch(function(error){
                        console.log(error)
                    })

        })
        .catch(function(error){
            console.log(error)
        })

});



/**
 * Use ES for get Images
 * @param ES query
 * @returns reponse of Elasticsearch
 */
router.get('/:token/getImage/:query', function (req, res) {

    o.checkToken(req.body.token)
        .then(function(response) {
                console.log(response)
                o.getESId(req.body.data.query)
                    .then(function(response)
                    {
                        o.getAttachment(response)
                    })
                    .catch(function(error){
                        console.log(error)
                    })
        })
        .catch(function(error){
            console.log(error)
        })

});





/**
 * Insert an object data with ID id into CouchDB (without attachment)
 * @param id = ID to insert
 * req.body = JSON object to insert
 * @returns CouchDB response
 */
router.post('/postData', function (req, res, next) {
    o.checkToken(req.body.token)
        .then(function(response){
            console.log(response)
            o.postESData(req.body.data)
                .then(function (response) {
                    console.log(response)
                    o.postCouchData(response.id, req.body.data)
                        .then(function(response){
                            console.log(response)
                            res.json(response)
                        })
                        .catch(function(error){
                            console.log(error)
                        })
                })
                .catch(function(error){
                    console.log(error)
                })
        })
        .catch(function(error){
            console.log(error)
        })

});

/**
 * Insert an object data with ID id into CouchDB (with attachment)
 * @param id = ID to insert
 * req.body = JSON object to insert
 * @returns CouchDB response
 */
router.post('/postData', function (req, res, next) {
    o.checkToken(req.body.token)
        .then(function(response){
            console.log(response)
            o.postESData(req.body.data)
                .then(function (response) {
                    console.log(response)
                    o.postAttachment(req.body.data, response.id)
                        .then(function(response){
                            console.log(response)
                            res.json(response)
                        })
                        .catch(function(error){
                            console.log(error)
                        })
                })
                .catch(function(error){
                    console.log(error)
                })
        })
        .catch(function(error){
            console.log(error)
        })

});


/**
 * Get the file with the ID id
 * @param id = ID of the file
 * @returns Bool
 */

router.get('/getFiles', function(req, res, next){
    o.checkToken(req.body.token)
        .then(function(response){
            console.log(response)
            o.getESId(req.param.body)
                .then(function(response){
                    console.log(response)
                    o.getAttachment(response)
                        .then(function(response){
                            console.log(response)

                        })
                        .catch(function(error){
                            console.log(error)
                        })
                })
                .catch(function(error){
                    console.log(error)
                })
        })
        .catch(function(error){
            console.log(error)
        })
});

module.exports = router;
