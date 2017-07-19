var services = {}

//Initialize Nano
var nano = require('nano')('http://127.0.0.1:5984/');
var username = 'admin';
var password = 'azerty01';
var cookies = {}; // store cookies, normally redis or something


//Initialize ElasticSearch
var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
});

//Initialize Firebase Admin SDK
var admin = require("firebase-admin");

var credential = require('../ssh/adminConfig.json');

admin.initializeApp({
    credential: admin.credential.cert(credential),
    databaseURL: "https://dae-ng.firebaseio.com"
});

//Initialize Firebase

var firebase = require("firebase");

var config = {
    apiKey: "AIzaSyBcuwhwkzvIIcEA95THJr3wfzJV56qwunU",
    authDomain: "dae-ng.firebaseapp.com",
    databaseURL: "https://dae-ng.firebaseio.com",
    projectId: "dae-ng",
    storageBucket: "dae-ng.appspot.com",
    messagingSenderId: "445799919658"
};
var fb = firebase.initializeApp(config);

/**
 * --------------------------------------------------------------------------------------------------------------------
 * SERVICES
 * --------------------------------------------------------------------------------------------------------------------
 */


/**
 * ********************************
 * DATA
 * ********************************
 */
/**
 * Return Data from CouchDB with selected Id
 * @param ids = Array(id)
 * @returns Array of Data
 */

services.getCouchData = function(ids){
    return new Promise(function (fulfill, reject){
        console.log("Get Data")
        var res = []
        for (var i=0; i<ids.length;i++){
            console.log("Hello world !")
            nano.use('images').get(ids[i], function(err,body){
                if (!err){
                    console.log(body)
                    res.push(body)
                    if (res.length == ids.length){
                        fulfill(res)
                    }
                } else {
                    console.log(err)
                    reject(err)
                }
            });
        }

    })
};

/**
 * Insert an object data with ID id into CouchDB
 * @param id = ID to insert
 * @param data = JSON Object to insert
 * @returns CouchDB Response
 */

services.postCouchData = function(id, data){
    return new Promise(function (fulfill, reject){
        console.log("Post Data")
        var obj = Object.assign({id:id}, data)
        console.log(obj)
        nano.use("images").insert(obj, function(err,body){
            if (!err){
                fulfill(body)
            } else {
                reject(err)
            }
        })
    })
}


/**
 * Return list of ID matching the query
 * @param query = String
 * @returns Array of ID
 */

services.getESId = function(query){
    return new Promise(function(fulfill,reject){
        client.search(query).then(function(resp){
            var res = []
            for (var i=0; i<resp.hits.hits.length;i++){
                res.push(resp.hits.hits[i]._id)
                if (res.length == resp.hits.hits.length){
                    fulfill(res)
                }
            }
        })
    })
}

/**
 * Return data matching the query
 * @param query = String
 * @returns Array of data
 */

services.getESData = function(query){
    return new Promise(function(fulfill,reject){
        client.search(query).then(function(resp){
            fulfill(resp.hits.hits)
        })
    })
}

/**
 * Post Data into ES and get ID of the object
 * @param data = ArrayOf(JSON)
 * Data MUST CONTAINS : {index: ...,body: {}
 * @returns ArrayOf({Position in Data,ID of object})
 */

services.postESData = function(data){
    return new Promise(function(fulfill, reject){
        var res = []
        for (var i = 0;i<data.length;i++){
            client.index(data[i], function(err,resp){
                if (!err){
                    res.push({'pos':i, 'id':resp._id})
                    if (res.length == data.length){
                        fulfill(res)
                    }
                }
            })
        }
    })
};

/**
 * Get attachment from object
 * @param id = IdOfObject
 * @returns ...
 */

services.getAttachment = function(id){
    return new Promise(function(fulfill,reject){
        console.log("Done")
        fulfill("Done")
    })
}

/**
 * Post attachment to the given object
 * @param path = String : Path of attachment
 * @param id = IdOfObject
 * @returns CouchDB Response
 */

services.postAttachment = function(path, id){
    return new Promise(function(fulfill,reject){
        console.log("Done")
        fulfill("Done")
    })
}

/**
 * Download the given files
 * @param paths = ArrayOfString
 * @returns Bool
 */

services.downloadFiles = function(paths){
    return new Promise(function(fulfill,reject){
        console.log("Done")
        fulfill("Done")
    })
}

/**
 * Get an XML file and parse it into JSON
 * @param path = String to access file
 * @returns Json data
 */

services.parseXML = function(path){
    return new Promise(function(fulfill,reject){
        console.log("Parsing XML")
        fulfill("Done")
    })
}

/**
 * Get a Json data and parse it into XML
 * @param data = Json flow to parse
 * @returns path of the xml file created
 */

services.parseJSON = function(data){
    return new Promise(function(fulfill,reject){
        console.log("Parsing Json")
        fulfill("Done")
    })
}

/**
 * ********************************
 * SECURITY
 * ********************************
 */

/**
 * Generate a token after connexion
 * @param username
 * @param password
 * @returns IdToken || Error
 */

services.getToken = function(username, password){
    return new Promise(function(fulfill,reject){
        var cred = fb
            .auth()
            .signInWithEmailAndPassword(username, password)
            .then(function(){
                fb.auth().currentUser.getIdToken(true)
                    .then(function(IdToken){
                        fb.auth().signOut().then(function(){
                            fulfill(IdToken)
                        })
                    })
            })
            .catch(function(error) {
                // Handle Errors here.
                reject(error)

            });
    })
};

/**
 * Check if a token is correct
 * @param token
 * @returns bool
 */

services.checkToken = function(token){
    return new Promise(function(fulfill,reject){
        admin.auth().verifyIdToken(token)
            .then(function(response){
                if (response.aud == 'dae-ng' && response.iss == 'https://securetoken.google.com/dae-ng'){
                    fulfill(true)
                } else {
                    fulfill(false)
                }
            })
            .catch(function(error){
                reject(error)
            })
    })
};

module.exports = services;