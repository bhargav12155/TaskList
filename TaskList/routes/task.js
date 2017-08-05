var express = require('express');
var router = express.Router();

/* GET home page. */
var MongoClient = require('mongodb').MongoClient;
var mongoDB = require('mongodb');
var url = "mongodb://localhost:27017/taskDB";
router.get('/create', function(req, res, next) {
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		console.log("Database created!");
		db.close();
	});
	res.send("Database created");
});

router.post('/task', function(req, res, next) {
		console.log("******"+req.body.name);
	res.setHeader('Content-Type', 'application/json');
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var task = req.body;
		db.collection("tasks").insert(task, function(err, res1) {
			if (err) throw err;
			console.log("1 record inserted");
		});
		db.close();
		res.send(JSON.stringify(task));
	});
});
router.get('/task', function(req, res, next) {
	res.setHeader('Content-Type', 'application/json');
	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  db.collection("tasks").find().toArray(function(err, result) {
		if (err) throw err;
		db.close();
		res.send(result);
	  });
	});
});
router.delete('/task/:id', function(req, res, next) {
	res.setHeader('Content-Type', 'application/json');
	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  var q = {_id: new mongoDB.ObjectID(req.params.id)};
	  db.collection("tasks").deleteOne(q, function(err, obj) {
		if (err) throw err;
		console.log("1 document deleted");
		db.close();
		res.send(JSON.stringify(obj));
	  });
	});
});
router.put('/task/:id', function(req, res, next) {
	res.setHeader('Content-Type', 'application/json');
	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  var q = {_id: new mongoDB.ObjectID(req.params.id)};
	  var target = req.body;
	  delete target["_id"];
	  db.collection("tasks").updateOne(q,target, function(err, obj) {
		if (err) throw err;
		console.log("1 document updated");
		db.close();
		res.send(JSON.stringify(obj));
	  });
	});
});
module.exports = router;
