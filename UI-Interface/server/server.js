/*
    server.js is the API. It routes http requests to GET/POST/PUT/DELETE datas from database or ElasticSearch
 */


// Required by the client
var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//Required by ElasticSearch
var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
});

client.ping({
    requestTimeout: 30000,
}, function (error) {
    if (error) {
        console.error('elasticsearch cluster is down!');
    } else {
        console.log('All is well');
    }
});

// Required by CouchDB
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

router.post('/initES', function(req,res){
    var create_promise = client.indices.create({index: "page_img"});
    create_promise.then(function(x) {
        console.log(x);
    }, function(err) { console.log(err);});
    create_promise = client.indices.create({index: "page_element"});
    create_promise.then(function(x) {
        console.log(x);
    }, function(err) { console.log(err);});
    create_promise = client.indices.create({index: "datasets"});
    create_promise.then(function(x) {
        console.log(x);
    }, function(err) { console.log(err);});
    create_promise = client.indices.create({index: "file"});
    create_promise.then(function(x) {
        console.log(x);
    }, function(err) { console.log(err);});
    create_promise = client.indices.create({index: "annotation"});
    create_promise.then(function(x) {
        console.log(x);
    }, function(err) { console.log(err);});
});

router.post('/deleteES', function(req,res){
    var create_promise = client.indices.delete({index: "page_img"});
    create_promise.then(function(x) {
        console.log(x);
    }, function(err) { console.log(err);});
    create_promise = client.indices.delete({index: "page_element"});
    create_promise.then(function(x) {
        console.log(x);
    }, function(err) { console.log(err);});
    create_promise = client.indices.delete({index: "datasets"});
    create_promise.then(function(x) {
        console.log(x);
    }, function(err) { console.log(err);});
    create_promise = client.indices.delete({index: "file"});
    create_promise.then(function(x) {
        console.log(x);
    }, function(err) { console.log(err);});
    create_promise = client.indices.delete({index: "annotation"});
    create_promise.then(function(x) {
        console.log(x);
    }, function(err) { console.log(err);});
})

router.post('/init', function(req,res){

    //ElasticSearch Initialization

    //BDD Initialization
    var mapPageImg = function(doc){
        emit(doc._id,{"name":doc.name,"format":doc.format,"image":doc.image})
    };
    mapPageImg = mapPageImg.toString();
    var mapPageElement = function(doc){
        emit(doc._id,{"name":doc.name,"format":doc.format,"image":doc.image})
    };
    mapPageElement = mapPageElement.toString();
    var mapFile = function(doc){
        emit(doc._id,{"name":doc.name,"format":doc.format,"image":doc.image})
    };
    mapFile = mapFile.toString();
    var mapAnnotation = function(doc){
        emit(doc._id,{"name":doc.name,"format":doc.format,"image":doc.image})
    };
    mapAnnotation = mapAnnotation.toString();
    var mapDatasets = function(doc){
        emit(doc._id,{"name":doc.name,"format":doc.format,"image":doc.image})
    };
    mapDatasets = mapDatasets.toString();
    nano.auth(username,password, function(err,response,headers){
        cookies = headers['set-cookie'];
        nano.config.cookie = headers['set-cookie'];
        nano.db.create('data-item', function(err, body){
            dataItem = nano.use('data-item')
            dataItem.insert({
                "_id": "_design/page_img",
                "language": "javascript",
                "views": {
                    "all": {
                        "map": mapPageImg
                    }
                }

            }, function (err, body) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(body)
                }
            });
            dataItem.insert({
                "_id": "_design/page_element",
                "language": "javascript",
                "views": {
                    "all": {
                        "map": mapPageElement
                    }
                }

            }, function (err, body) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(body)
                }
            })
            dataItem.insert({
                "_id": "_design/file",
                "language": "javascript",
                "views": {
                    "all": {
                        "map": mapFile
                    }
                }

            }, function (err, body) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(body)
                }
            })
            dataItem.insert({
                "_id": "_design/annotation",
                "language": "javascript",
                "views": {
                    "all": {
                        "map": mapAnnotation
                    }
                }

            }, function (err, body) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(body)
                }
            });
            dataItem.insert({
                "_id": "_design/datasets",
                "language": "javascript",
                "views": {
                    "all": {
                        "map": mapDatasets
                    }
                }

            }, function (err, body) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(body)
                }
            })
        })
    })
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

//Modify name of global database
var nameDB = "images";


/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});


module.exports = router;
