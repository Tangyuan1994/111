
var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var o = require('./services')

/**
 * Use ES to get the data without attachment
 * @param ES query
 * @returns send response of Elasticsearch data without attachment
 */
router.get('/getData', function (req, res,next) {

    o.checkToken(req.body.token)
        .then(function(response) {
            console.log(response)
            o.getESData(req.body.data.query)
                .then(function(response) {
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
router.post('/postFiles', function (req, res, next) {
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
            o.getESId(req.body.data.query)
                .then(function(response){
                    console.log(response)
                    o.getAttachment(response)
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


router.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});

module.exports = router;
