
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
        .then(function (response) {
            console.log(response)
            o.getESData(req.body.data.query)
                .then(function (response) {
                    res.json(response)
                })
                .catch(function (error) {
                    console.log(error)
                })
        })
})


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
                .then(function (response) { //return ArrayOf({Position in Data,ID of object})
                    console.log(response)
                    tab =[]
                    for (var i=0; i<response.length; i++){
                        tab.push({id:response[i].id, data:req.body.data[response[i].pos]})
                    }
                    o.postCouchData(tab)
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


// A REVOIR
/**
 * Insert an object data with ID id into CouchDB (with attachment)
 * @param id = ID to insert
 * req.body = JSON object to insert
 * req.body.path = path of the file on the client machine
 * @returns CouchDB response
 */
router.post('/postFiles', function (req, res, next) {
    var data = req.body.data
    o.checkToken(req.body.token)
        .then(function(response){
            console.log(response)
            o.uploadFile(req)
                .then(function(response){
                    console.log(response) //Array[{Name, NewPath}]
                    o.unZip(response)
                        .then(function (response2){
                            for (var i=0; i<response2.length; i++){
                                var tmp = req.body.path.split('\\').pop()
                                console.log(tmp)
                                var dirname = req.body.path.replace('\\'+tmp, '')
                                var dirname2 = response2[0].split('\\')[0] +response2[0].split('\\')[1]
                                for (var j =0; j<data.length; j++){
                                    if (data[j].path.replace(dirname,'').replace('\\','/') == response2[i].replace(dirname2,'')){
                                        res.push(data[j].id, response2[i].path, data[j].data)
                                    }
                                }
                            }
                            o.postAttachment(res) //datas = Array[{ID,Paths,Data}]
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
        })
        .catch(function(error){
            console.log(error)
        })

});

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
 * Get the file with the ID id
 * @param id = ID of the file
 * @returns Bool
 */
router.get('/getFiles', function(req, res, next){
    o.checkToken(req.body.token)
        .then(function(response){
            console.log(response)
            if ('_source' in req.body.data.query.query ) {
                if (req.body.data.query.query._source.indexOf('doc._id') < 0){
                    req.body.data.query.query._source.push('doc._id')
                }
                if (req.body.data.query.query._source.indexOf('doc.name') < 0){
                    req.body.data.query.query._source.push('doc.name')
                }
            }
            else {
                req.body.data.query.query._source=[doc._id, doc.name]
            }
            o.getESData(query)
                .then(function(response){ //response = array of data => id, name
                    var data = []
                    for (var i=0; i<response.length; i++){
                        data.push({id:response[i]._id, name:response[i].name})
                    }
                    o.getAttachment(data)
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
 * Create a new account
 * @param username
 * @param password
 * @returns send response of create a new account
 */
router.post('/homeCreateAccount/:username/:email', function(req,res) {
  var username=req.params.user.theName;
  var password=req.params.user.thePwd;

  console.error("Account creation for " + username + " " + password);

  o.createAccount(username,password)
    .then(function(response) {
      console.log(response)
      res.json(response)
    })
    .catch(function(error){
      console.log(error)
    })
});


/**
 * SignIn the account
 * @param username
 * @param password
 * @returns send response of SignIn the account
 */
router.get('/homeSignIn/:username/:email', function(req,res) {
  var username=req.params.user.theName;
  var password=req.params.user.thePwd;
  res.json(username)
  /*o.signInAccount(username,password)
    .then(function(response) {
          res.json(response)
          console.log(response)

    })
    .catch(function(error){
      console.log(error)
    })*/
});


router.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});

module.exports = router;


