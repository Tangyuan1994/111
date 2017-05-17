var express = require('express');
var router = express.Router();
var path = require('path');
var mysql      = require('mysql');
var bodyParser = require('body-parser'); // Charge le middleware de gestion des paramètres
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var nano     = require('nano')('http://127.0.0.1:5984/');
var username = 'admin';
var password = 'azerty01';
var callback = console.log; // this would normally be some callback
var cookies  = {}; // store cookies, normally redis or something


router.post('/create/newDb/:id', function(req,res){
    console.log(nano.config.url)
    console.log(nano.config.cookie)
    var token = req.params.id
    nano.auth(username, password,function (err, response, headers){
        cookies = headers['set-cookie'];
        nano.config.cookie = headers['set-cookie'];
        nano.db.create('test-'+token, function(err, body){
            nano.use('test-' + token).insert({
                _id: "Hello_world-"+token,
                _rev: '1-23202479633c2b380f79507a776743d5',
                crazy: false,
                token: token
            }, function (err, body) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(body)
                }
            })
        })
    });
});

router.get('/session', function (req, res){
    // TODO : Get Session
})

// Create a view
router.post('/add/view', function(req,res){
    var map = function(doc){
        emit(doc._id,[doc.name,doc.format,doc.image])
    };
    var mapStr = map.toString();
    console.log(mapStr);
    nano.auth(username, password,function (err, response, headers) {
        cookies = headers['set-cookie'];
        nano.config.cookie = headers['set-cookie'];
        nano.use('images').insert({
                "_id": "_design/view1",
                "language": "javascript",
                "views": {
                    "default": {
                        "map": mapStr
                    }
                }
            }, function (err, body) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(body)
                }
            }
        );
    });
})


router.get('/datasets/:id', function(req,res){
    // Get all data
    if (req.params.id == "all" || req.params.id == ''){

        //Create map function
        var map = function(doc){
            emit(doc._id,{"name":doc.name,"format":doc.format,"image":doc.image})
        };
        var mapStr = map.toString();

        // Authentification
        nano.auth(username, password,function (err, response, headers) {
            cookies = headers['set-cookie'];
            nano.config.cookie = headers['set-cookie'];

            // Create view
            nano.use('images').insert({
                    "_id": "_design/view-all",
                    "language": "javascript",
                    "views": {
                        "default": {
                            "map": mapStr
                        }
                    }
                }, function (err, body) {
                    if (err) {
                        console.log(err)
                    } else {

                        // Get Images
                        nano.use('images').view('view-all','default',function(err,body){
                            if (!err){
                                res.json(body)
                                console.log(body)

                                // Delete view
                                nano.use('images').get("_design/view-all", function(err,body){
                                    if (err){
                                        console.log(err)
                                    } else {
                                        nano.use('images').destroy("_design/view-all",body._rev, function(err,body){
                                            if (err){
                                                console.log("Je n'ai pas detruit la view : ",err)
                                            } else {
                                                console.log("La view est bien détruite : ", body)
                                            }
                                        })
                                    }
                                })
                            } else {
                                console.log(err)
                            }
                        })
                        console.log(body)
                    }
                }
            );
        });
    } else {

        // Get image with id ...
        nano.use('images').get('5330e2f3a0dd8ee433e3e702df012c19', function(err, body) {
            if (!err) {
                res.json(body);

            }
        });
    }

    // TODO : Get tags

    // TODO : Get rate

    // TODO : Get Annotations
});

router.post("/document/:id/add/:rate", function(req,res){
    // TODO : Add rate
})

router.post("/document/:id/add/:tag", function(req,res){
    // TODO : Add Tag
})

router.post("/document/:id/modify/:tag", function(req,res){
    // TODO : Modify Tag
})

router.post("/document/:id/delete/:tag", function(req,res){
    // TODO : Remove Tag
})

router.post("/document/:id/add/:idAnnotation", function(req,res){
    // TODO : Add Annotation
})

router.post("/document/:id/modify/:idAnnotation", function(req,res){
    // TODO : Modify Annotation
})

router.post("/document/:id/delete/:idAnnotation", function(req,res){
    // TODO : Remove Annotation
})

router.post("/upload", function(req,res){
    // TODO : Allow images upload
})

//TODO : Modify name of global database
var nameDB = "images";


/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});


module.exports = router;
