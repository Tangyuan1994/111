/*
 server.js is the API. It routes http requests to GET/POST/PUT/DELETE datas from database or ElasticSearch
 */


// Required by the client
var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});

var oracledb = require('oracledb');
var SSH = require('simple-ssh');
var ssh = new SSH({
    host: 'localhost:8008',
    user: 'username',
    pass: 'password'
});

ssh.exec('echo $PATH', {
    err: (        function (stderr) {
            console.log(stderr);
            console.log("err");
        }
    )

    //     function (err) {
    //     console.log("erreur")
    // }
    ,
    /*    out: console.log("out"),
     in: console.log("in")*/


    out: (        function (stdout) {
            console.log(stdout);
            console.log("out");
        }
    )
}).start();


//Required by ElasticSearch
/*var elasticsearch = require('elasticsearch');
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
 });*/




// Required by CouchDB
var nano = require('nano')('http://127.0.0.1:5984/');
var username = 'admin';
var password = 'azerty01';
var cookies = {}; // store cookies, normally redis or something


router.post('/create/newDb/:id', function (req, res) {
    console.log(nano.config.url)
    console.log(nano.config.cookie)
    var token = req.params.id
    nano.auth(username, password, function (err, response, headers) {
        cookies = headers['set-cookie'];
        nano.config.cookie = headers['set-cookie'];
        nano.db.create('test-' + token, function (err, body) {
            nano.use('test-' + token).insert({
                _id: "Hello_world-" + token,
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

router.get('/session', function (req, res) {
    // TODO : Get Session
})

// Create a view
router.post('/add/view', function (req, res) {
    var map = function (doc) {
        emit(doc._id, [doc.name, doc.format, doc.image])
    };
    var mapStr = map.toString();
    console.log(mapStr);
    nano.auth(username, password, function (err, response, headers) {
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

router.post('/initES', function (req, res) {
    var create_promise = client.indices.create({index: "page_img"});
    create_promise.then(function (x) {
        console.log(x);
    }, function (err) {
        console.log(err);
    });
    create_promise = client.indices.create({index: "page_element"});
    create_promise.then(function (x) {
        console.log(x);
    }, function (err) {
        console.log(err);
    });
    create_promise = client.indices.create({index: "datasets"});
    create_promise.then(function (x) {
        console.log(x);
    }, function (err) {
        console.log(err);
    });
    create_promise = client.indices.create({index: "file"});
    create_promise.then(function (x) {
        console.log(x);
    }, function (err) {
        console.log(err);
    });
    create_promise = client.indices.create({index: "annotation"});
    create_promise.then(function (x) {
        console.log(x);
    }, function (err) {
        console.log(err);
    });
});

router.post('/deleteES', function (req, res) {
    var create_promise = client.indices.delete({index: "page_img"});
    create_promise.then(function (x) {
        console.log(x);
    }, function (err) {
        console.log(err);
    });
    create_promise = client.indices.delete({index: "page_element"});
    create_promise.then(function (x) {
        console.log(x);
    }, function (err) {
        console.log(err);
    });
    create_promise = client.indices.delete({index: "datasets"});
    create_promise.then(function (x) {
        console.log(x);
    }, function (err) {
        console.log(err);
    });
    create_promise = client.indices.delete({index: "file"});
    create_promise.then(function (x) {
        console.log(x);
    }, function (err) {
        console.log(err);
    });
    create_promise = client.indices.delete({index: "annotation"});
    create_promise.then(function (x) {
        console.log(x);
    }, function (err) {
        console.log(err);
    });
})

router.post('/initBDDImages', function (req, res) {
    nano.db.create('images', function (err, body) {
        var images = nano.use('images')
        images.insert({
            "_id": "5330e2f3a0dd8ee433e3e702df012c19",
            "format": "tiff",
            "rates": [],
            "tags": [],
            "image": "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",
            "name": "test"
        }, function (err, body) {
            if (err) {
                console.log(err)
            } else {
                console.log(body)
            }
        });
        images.insert({
            "_id": "5330e2f3a0dd8ee433e3e702df01ab07",
            "name": "test3",
            "format": "jpeg",
            "rates": [],
            "tags": [],
            "image": "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"
        }, function (err, body) {
            if (err) {
                console.log(err)
            } else {
                console.log(body)
            }
        });
        images.insert({
            "_id": "5330e2f3a0dd8ee433e3e702df013377",
            "rates": [],
            "tags": [],
            "image": "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",
            "name": "Test2",
            "format": "png"
        }, function (err, body) {
            if (err) {
                console.log(err)
            } else {
                console.log(body)
            }
        });
        images.insert({
            "_id": "_design/default",
            "language": "javascript",
            "views": {
                "all": {
                    "map": "function(doc) {\n  emit(doc._id, [doc.name, doc.format, doc.image]);\n}"
                }
            }
        }, function (err, body) {
            if (err) {
                console.log(err)
            } else {
                console.log(body)
            }
        });
    })
})

router.get('/getCredentials/:username/:password', function (req, res) {

    if (req.params.username == "Flow" && req.params.password == "123456") {
        res.json({"roles": ["Admin", "Test", "Dev", "Canard"]})
    } else if (req.params.username == "Bart" && req.params.password == "123456789") {
        res.json({"roles": ["SuperUser", "Leader"]})
    } else {
        res.json({"roles": ["Anonymous"]})
    }
})

router.post('/init', function (req, res) {

    //ElasticSearch Initialization

    //BDD Initialization
    var mapPageImg = function (doc) {
        emit(doc._id, {"name": doc.name, "format": doc.format, "image": doc.image})
    };
    mapPageImg = mapPageImg.toString();
    var mapPageElement = function (doc) {
        emit(doc._id, {"name": doc.name, "format": doc.format, "image": doc.image})
    };
    mapPageElement = mapPageElement.toString();
    var mapFile = function (doc) {
        emit(doc._id, {"name": doc.name, "format": doc.format, "image": doc.image})
    };
    mapFile = mapFile.toString();
    var mapAnnotation = function (doc) {
        emit(doc._id, {"name": doc.name, "format": doc.format, "image": doc.image})
    };
    mapAnnotation = mapAnnotation.toString();
    var mapDatasets = function (doc) {
        emit(doc._id, {"name": doc.name, "format": doc.format, "image": doc.image})
    };
    mapDatasets = mapDatasets.toString();
    nano.auth(username, password, function (err, response, headers) {
        cookies = headers['set-cookie'];
        nano.config.cookie = headers['set-cookie'];
        nano.db.create('data-item', function (err, body) {
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


router.get('/datasets/:id', function (req, res) {
    // Get all data
    if (req.params.id == "all" || req.params.id == '') {

        //Create map function
        var map = function (doc) {
            emit(doc._id, {"name": doc.name, "format": doc.format, "image": doc.image})
        };
        var mapStr = map.toString();

        // Authentification
        /*nano.auth(username, password, function (err, response, headers) {
         cookies = headers['set-cookie'];
         nano.config.cookie = headers['set-cookie'];*/

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
                    nano.use('images').view('view-all', 'default', function (err, body) {
                        if (!err) {
                            res.json(body)
                            console.log(body)

                            // Delete view
                            nano.use('images').get("_design/view-all", function (err, body) {
                                if (err) {
                                    console.log(err)
                                } else {
                                    nano.use('images').destroy("_design/view-all", body._rev, function (err, body) {
                                        if (err) {
                                            console.log("Je n'ai pas detruit la view : ", err)
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
        //});
    } else {

        // Get image with id ...
        nano.use('images').get('5330e2f3a0dd8ee433e3e702df012c19', function (err, body) {
            if (!err) {
                res.json(body);

            }
        });
    }


    // TODO : Get Annotations
});

router.get("/document/:id/getTags", function (req, res) {
    // TODO : Get tags
    // req.params.id
    nano.use('images').get('5330e2f3a0dd8ee433e3e702df012c19', function (err, body) {
        if (!err) {
            res.json(body);
            console.log(body.tags);
        }
    });
});

router.get("/document/:id/getRates", function (req, res) {
    // TODO : Get rate
    // req.params.id
    nano.use('images').get('5330e2f3a0dd8ee433e3e702df012c19', function (err, body) {
        if (!err) {
            res.json(body);
            console.log(body.rates);
        }
    });
});


router.post("/document/:id/addRate/:rate", function (req, res) {
    // TODO : Add rate
    //req.params.rate
    console.log("server");
    nano.use('images').get('5330e2f3a0dd8ee433e3e702df012c19', function (err, body) {
        if (!err) {
            // res.json(body);
            console.log(body.rates);
            if (!isNaN(parseInt(req.params.rate))) {
                console.log(req.params.rate);
                body.rates.push(req.params.rate);
                console.log(body);
                nano.use('images').insert(body, function (err, body) {
                    if (!err) {
                        console.log("Add Succeed");
                    }
                    else {
                        console.log(err)
                    }
                })
            }
            else {
                console.log(" Not a Number ");
            }
        }
    });
});


router.post("/document/:id/addTag/:tag", function (req, res) {
    // TODO : Add Tag
    //req.params.tag
    nano.use('images').get('5330e2f3a0dd8ee433e3e702df012c19', function (err, body) {
        if (!err) {
            res.json(body);
            console.log(body.tags);
            if (body.tags.indexOf("Test3") == -1) {
                body.tags.push("Test3");
                console.log(body);
                nano.use('images').insert(body, function (err, body) {
                    if (!err) {
                        console.log("Reussite")
                    } else {
                        console.log(err);
                    }
                })
            } else {
                console.log("Le tag existait déjà");
            }
        }
    });
});


router.post("/document/:id/modifyRate/:rate1/:rate2", function (req, res) {
    console.log("modify?");
    nano.use('images').get('5330e2f3a0dd8ee433e3e702df012c19', function (err, body) {
        if (!err) {
            res.json(body);
            console.log(body.rates);
            if (body.rates.indexOf("56") != -1 && body.rates.indexOf("0000") == -1) {
                body.rates[body.rates.indexOf("56")] = "0000";
                nano.use('images').insert(body, function (err, body) {
                    if (!err) {
                        console.log("Modified Succeed");
                    }
                    else {
                        console.log(err);
                    }
                })
            }
            else if (body.rates.indexOf("56") == -1) {
                console.log("No such value in rates")
            }
        }

    });
});

router.post("/document/:id/modifyTag/:tag1/:tag2", function (req, res) {
    // TODO : Modify Tag
    nano.use('images').get('5330e2f3a0dd8ee433e3e702df012c19', function (err, body) {
        if (!err) {
            res.json(body);
            console.log(body.tags);
            if (body.tags.indexOf("Test4") == -1 && body.tags.indexOf("Test3") > -1) {
                body.tags[body.tags.indexOf("Test3")] = "Test4";
                nano.use('images').insert(body, function (err, body) {
                    if (!err) {
                        console.log("Reussite")
                    } else {
                        console.log(err);
                    }
                });
            }
        } else {
            console.log(err);
        }
    });

});


router.post("/document/:id/deleteRate/:rate", function (req, res) {
    // TODO : Remove Tag
    nano.use('images').get('5330e2f3a0dd8ee433e3e702df012c19', function (err, body) {
        if (!err) {
            res.json(body);
            console.log(body.rates);
            if (body.rates.indexOf("56") > -1) {
                body.rates.splice(body.rates.indexOf("56"), 1);
                nano.use('images').insert(body, function (err, body) {
                    if (!err) {
                        console.log("Succeed")
                    } else {
                        console.log(err);
                    }
                });
            }
            else {
                console.log("No such value");
            }
        }
    });
});


router.post("/document/:id/deleteTag/:tag", function (req, res) {
    // TODO : Remove Tag
    nano.use('images').get('5330e2f3a0dd8ee433e3e702df012c19', function (err, body) {
        if (!err) {
            res.json(body);
            console.log(body.tags);
            if (body.tags.indexOf("Test3") > -1) {
                body.tags.splice(body.tags.indexOf("Test3"), 1);
                nano.use('images').insert(body, function (err, body) {
                    if (!err) {
                        console.log("Reussite")
                    } else {
                        console.log(err);
                    }
                });
            }
        }
    });

});


router.post("/document/:id/add/:idAnnotation", function (req, res) {
    // TODO : Add Annotation
});

router.post("/document/:id/modify/:idAnnotation", function (req, res) {
    // TODO : Modify Annotation
});

router.post("/document/:id/delete/:idAnnotation", function (req, res) {
    // TODO : Remove Annotation
});




router.post("/signin/:fname/:lname/:email/:password", function (req, res) {
    var email = req.params.email
    var mapEmails = "function(doc){" +
        "if (doc.email == '" + email + "'){" +
        "emit(doc._id,{'email':doc.email})" +
        "}" +
        "};"
    nano.use('user').insert({
        "_id": "_design/emails",
        "language": "javascript",
        "views": {
            "coucou": {
                "map": mapEmails
            }
        }
    }, function (err, body) {
        if (err) {
            console.log(err)
        } else {
            console.log(body)
            nano.use('user').view('emails', 'coucou', function (err, body) {
                if (!err) {
                    if (!(body.length > 0)) {
                        nano.use('user').insert({
                            "fname": req.params.fname,
                            "lname": req.params.lname,
                            "email": req.params.email,
                            "password": req.params.password
                        }, function (err, body) {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log("Il n'y a pas d'erreur !");
                                nano.use('user').get("_design/emails", function (err, body) {
                                    console.log(body)
                                    if (err) {
                                        console.log(err)
                                    } else {
                                        nano.use('user').destroy("_design/emails", body._rev, function (err, body) {
                                            if (err) {
                                                console.log("Je n'ai pas detruit la view : ", err)
                                            } else {
                                                console.log("La view est bien détruite : ", body)
                                                nano.use('user').get("_design/emails", function (err, body) {
                                                    console.log(body)
                                                    if (err) {
                                                        console.log(err)
                                                    } else {
                                                        nano.use('user').destroy("_design/emails", body._rev, function (err, body) {
                                                            if (err) {
                                                                console.log("Je n'ai pas detruit la view : ", err)
                                                            } else {
                                                                console.log("La view est bien détruite : ", body)
                                                            }
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    } else {
                        console.log("Cette adresse exite deja dans la base");
                    }

                } else {
                    console.log(err)
                }

            });
        }
    });

});

/* GET home page. */


router.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});





/**********     PAGE "PERSO"    **********/



router.get("/perso/:id", function (req, res) {
    nano.use('user').get(req.params.id, function (err, body) {
        if (!(body == null)) {
            if (body.total_rows == 0) {
                console.log("Such id doesn't exist");
            }
        }
        if (!err) {
            res.json(body);
        }
    });
});

router.get("/perso/:id/getLname", function (req, res) {
    nano.use('user').get('2a', function (err, body) {
        if (!err) {
            res.json(body);
            console.log("lastname : " + body.lname);
        }
    });
});

router.get("/perso/:id/getFname", function (req, res) {
    nano.use('user').get('2a', function (err, body) {
        if (!err) {
            res.json(body);
            console.log("firstname : " + body.fname);
        }
    });
});

router.get("/perso/:id/getMail", function (req, res) {
    nano.use('user').get('2a', function (err, body) {
        if (!err) {
            res.json(body);
            console.log("mail: " + body.mail);
        }
    });
});

router.get("/perso/:id/getPwd", function (req, res) {
    nano.use('user').get('2a', function (err, body) {
        if (!err) {
            res.json(body);
            console.log("password: " + body.passWord);
        }
    });
});

router.get("/perso/:id/getAff", function (req, res) {
    nano.use('user').get('2a', function (err, body) {
        if (!err) {
            res.json(body);
            console.log("affiliation: " + body.affiliation);
        }
    });
});

router.get("/perso/:id/getDate", function (req, res) {
    nano.use('user').get('2a', function (err, body) {
        if (!err) {
            res.json(body);
            if (!(body.date == null)) {
                console.log("date: " + body.date.substring(0, 3));
            }
        }
    });
});


router.post('/perso/:id/modifyLname/:lastname', function (req, res) {
    // nano.use('user').get(req.params.id, function (err, body) {
    nano.use('user').get('2a', function (err, body) {
        if (!err) {
            res.json(body);
            // console.log(body.lname);
            //console.log(req.params.lastname);
            if (req.params.lastname.length > 0) {
                body.lname = req.params.lastname;
                nano.use('user').insert(body, function (err, body) {
                    if (!err) {
                        // console.log("Reussite")
                    } else {
                        console.log(err);
                    }
                });
            }
        }

    })
});


router.post('/perso/:id/modifyFname/:firstname', function (req, res) {
    // nano.use('user').get(req.params.id, function (err, body) {
    nano.use('user').get('2a', function (err, body) {
        if (!err) {
            res.json(body);
            // console.log(req.params.firstname);
            //console.log(body.fname);
            if (req.params.firstname.length > 0) {
                body.fname = req.params.firstname;
                nano.use('user').insert(body, function (err, body) {
                    if (!err) {
                        // console.log("Reussite")
                    } else {
                        console.log(err);
                    }
                });
            }
        }
    })
});


router.post('/perso/:id/modifyMail/:mail', function (req, res) {
    nano.use('user').get('2a', function (err, body) {
//    nano.use('user').get(req.params.id, function (err, body) {
        if (!err) {
            res.json(body);
            // console.log(body.mail);
            if (req.params.mail.length > 0) {
                body.mail = req.params.mail;
                nano.use('user').insert(body, function (err, body) {
                    if (!err) {
                        //  console.log("Reussite")
                    } else {
                        console.log(err);
                    }
                });
            }
        }

    })
});

router.post('/perso/:id/modifyAffil/:affil', function (req, res) {
    nano.use('user').get('2a', function (err, body) {
        //nano.use('user').get(req.params.id, function (err, body) {
        if (!err) {
            res.json(body);
            // console.log(body.affiliation);
            if (req.params.affil.length > 0) {
                body.affiliation = req.params.affil;
                nano.use('user').insert(body, function (err, body) {
                    if (!err) {
                        // console.log("Reussite")
                    } else {
                        console.log(err);
                    }
                });
            }
        }

    })
});

router.post('/perso/:id/modifyPwd/:old/:pwd', function (req, res) {
    nano.use('user').get('2a', function (err, body) {
        // nano.use('user').get(req.params.id, function (err, body) {
        if (!err) {
            res.json(body);
            //console.log(body.passWord);
            if (body.passWord == req.params.old) {
                if (req.params.pwd.length > 0) {
                    body.passWord = req.params.pwd;
                    nano.use('user').insert(body, function (err, body) {
                        if (!err) {
                            //  console.log("Reussite")
                        } else {
                            console.log(err);
                        }
                    });
                }
            }
            else {
                console.log("Mauvais MDP")
            }
        }

    })
});

/**
 * UPLOAD
 */

router.post('/upload/:path/:type/:name/:country', function(req,res) {
    // Get data from URL
    var path = req.params.path;
    var type = req.params.type;
    var name = req.params.name;
    var country = req.params.country;

    // Write data into JSON file
    var send = {'path': path, 'type': type, 'name': name, 'country': country};

    //Insert JSON file into DB
    nano.use('images').insert(send);

});

/**********     CONNEXION ORACLE    **********/


router.get('/oracleConnect', function (req, res) {
    //console.log("canard");
    oracledb.getConnection(
        {
            user: "hr",
            password: "welcome",
            connectString: "localhost/XE"
        },
        function (err, connection) {
            if (err) {
                console.error(err.message);
                return;
            }
            connection.execute(
                "SELECT department_id, department_name " +
                "FROM departments " +
                "WHERE manager_id < :id",
                [110],  // bind value for :id
                function (err, result) {
                    if (err) {
                        console.error(err.message);
                        doRelease(connection);
                        return;
                    }
                    console.log(result.rows);
                    doRelease(connection);
                });
        });
});

function doRelease(connection) {
    connection.close(
        function (err) {
            if (err)
                console.error(err.message);
        });
};

module.exports = router;
