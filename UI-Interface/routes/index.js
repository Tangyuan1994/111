var express = require('express');
var router = express.Router();
var path = require('path');
var mysql      = require('mysql');
var bodyParser = require('body-parser'); // Charge le middleware de gestion des paramètres
var urlencodedParser = bodyParser.urlencoded({ extended: false });

/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});

router.get('/data/reset', function(req,res){
    /*res.json([{"id": 1, "name": "Mymm", "city": "Pantano do Sul"},
     {"id": 2, "name": "Skyble", "city": "Guilmaro"},
     {"id": 3, "name": "Tagfeed", "city": "Gnosjö"},
     {"id": 4, "name": "Realcube", "city": "Jrashen"},
     {"id": 5, "name": "Bluejam", "city": "Zhangjiawo"},
     {"id": 6, "name": "Jayo", "city": "Obonoma"},
     {"id": 7, "name": "Cogidoo", "city": "Sungsang"},
     {"id": 8, "name": "Avavee", "city": "Diawara"},
     {"id": 9, "name": "Tagtune", "city": "Monywa"},
     {"id": 10, "name": "Centimia", "city": "Retkovci"}]);*/
    connection.query('SELECT * FROM cities', function(error,results,fields){
        if (error) throw error;
        res.json(results)
    })
});

module.exports = router;
