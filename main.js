var express = require('express');
var bodyParser = require('body-parser');
var _ = require('lodash');
var morgan = require('morgan');
var app = express();
var PORT = 6050;

var foods = [];
var id = 0;

app.use(morgan('dev'));
app.use(express.static('data'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/foods', function(req, res){
  var array = req.body;
  id++;
  req.body.id = id + '';
  foods.push(array);
  res.json(array);
});

app.get('/foods', function(req, res){
  res.json(foods);
});

app.get('/foods/:id', function(req, res){
  var array = _.find(foods, {id:req.params.id});
  res.json(array || {});
});

app.put('/foods/:id', function(req, res){
  var update = req.body;
if(update.id){
  delete update.id;
  }


var array = _.findIndex(foods, {id: req.params.id});
if(!foods[array]){
res.send();
}else{
var updateArray = _.assign(foods[array], update);
res.json(updateArray);
    }
});

app.delete('/foods/:id', function(req, res){
  var array = _.findIndex(array, {id: req.params.id});
  if(!foods[array]){
    res.send()
  }else{
    var deletedArray = array[array];
    lions.splice(array, 1);
    res.json(deletedArray);
  }
});



app.listen(PORT);
