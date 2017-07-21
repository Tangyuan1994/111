var services = {}

//Initialize Nano
var nano = require('nano')('http://127.0.0.1:5984/');
var username = 'admin';
var password = 'azerty01';
var cookies = {}; // store cookies, normally redis or something

//File Utilitaries
var fs = require('fs')
var formidable = require('formidable')
var JSZip = require('jszip')


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
            nano.use('dae').get(ids[i], function(err,body){
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
 * @param datas = Array[{id,data}]
 * @returns CouchDB Response
 */

services.postCouchData = function(datas){
    return new Promise(function (fulfill, reject){
        var res = []
        for (var i=0;i<datas.length;i++){
            var obj = Object.assign({id:datas[i].id}, datas[i].data)
            nano.use("dae").insert(obj, function(err,body){
                if (!err){
                    res.push(body)
                    if (res.length == datas.length){
                        fulfill(res)
                    }
                } else {
                    reject(err)
                }
            })
        }
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
 * @param datas = Array of {ID,Name}
 * @returns Array of Paths
 */

services.getAttachment = function(datas){
    return new Promise(function(fulfill,reject){
        var res = [];
        for (var i=0;i<datas.length;i++){
            nano.use('dae').attachment.get(datas[i].id, datas[i].name, function(err,body){
                if (!err){
                    fs.writeFile('tmp/'+datas[i].name, body, function(err,resp){
                        if (!err){
                            res.push('tmp/download/'+datas[i].name)
                            if (res.length == datas.length){
                                fulfill(res)
                            }
                        } else {
                            reject(err)
                        }
                    })
                } else {
                    reject(err)
                }
            })
        }
    })
};

/**
 * Post attachment to the given objects
 * @param datas = Array[{ID,Paths,Data}]
 * @returns CouchDB Response
 */

services.postAttachment = function(datas) {
    return new Promise(function (fulfill, reject) {
        var res=[]
        for (var i=0;i<datas.length;i++){
            fs.readFile(datas[i].path, function (err, resp) {
                images.multipart.insert(datas[i].data, [{name: datas[i].name, data: resp, content_type: 'multipart/form-data'}], data[i].id, function (err, body) {
                    if (!err) {
                        res.push(body)
                        if (res.length == datas.length){
                            fulfill(res)
                        }
                    } else {
                        reject(err)
                    }
                })
            })
        }
    })
}

var random = function(taille){
    var text = "";
    var possible = "abcdefghijklmnopqrstuvwxyzAZERTYUIOPQSDFGHJKLMWXCVBN0123456789";

    for( var i=0; i < taille; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
};

/**
 * Unzip File
 * @param path = Path of Zip File
 * @returns Array of Paths
 */

services.unZip = function(path){
    return new Promise(function(fulfill,reject){
        var folder = path.split('\\')[path.split('\\').length-1].split('\.')[0]
        var loc = 'tmp/upload/unzip-'+random(6)+'/'
        var res = [];
        fs.mkdir(loc, function(err){
            if (!err){
                fs.readFile(path, function(err, data){
                    if (!err){
                        var zip = new JSZip();
                        zip.loadAsync(data).then(function(contents){
                            var cpt = Object.keys(contents.files).length
                            Object.keys(contents.files).forEach(function(filename){
                                var dest = loc + filename;
                                if (filename.indexOf('.')<0){
                                    cpt--
                                    fs.mkdir(dest, function(err){
                                        console.log("Creating folder done !")
                                    })
                                } else {
                                    zip.files[filename].async('nodebuffer').then(function(content) {
                                        fs.writeFile(dest, content, function(err){
                                            if (!err){
                                                res.push(dest)
                                                if (res.length == cpt){
                                                    fulfill(res)
                                                }
                                            } else {
                                                reject(err)
                                            }
                                        });
                                    });
                                }
                            });
                        });
                    } else {
                        console.log(err)
                        reject(err)
                    }
                })
            } else {
                console.log(err)
                reject(err)
            }
        })
    })
}

/**
 * Upload Files
 * @param HTTPRequest = HTTP Request to upload the file
 * @returns Array[{Name, NewPath}]
 */

services.uploadFile = function(HTTPRequest){
    return new Promise(function(fulfill,reject){
        var form = new formidable.IncomingForm();
        form.parse(HTTPRequest, function(err,fields,files){
            var oldpath = files.image.path;
            var newpath = 'tmp/upload/' + files.image.name;
            fs.rename(oldpath, newpath, function(err){
                if (!err){
                    fulfill(newpath)
                } else {
                    fs.unlink(oldpath, function(){
                        reject(err)
                    })
                }
            })
        })
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