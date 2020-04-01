var mongose = require('mongoose');
var esquema = mongose.Schema;

var horaExtra = new esquema ({
    documento: String,
    nombre1: String,
    nombre2: String,
    apellido1: String,
    apellido2: String,
    fechaIni: String,
    fechaFin: String,
    horaTurnoIni: String,
    horaTurnoFin: String,
    horaIniExtra: String,
    horaFinExtra: String,
    motivo: String
})

mongose.model('horaExtra', horaExtra);




var express = require('express');
var app = express();
var mongoose = require('mongoose');
const { createProxyMiddleware } = require('http-proxy-middleware');
var cors = require('cors');
router = express.Router();
bodyParser = require('body-parser');
methodOverride = require('method-override')

mongoose.connect('mongodb://localhost:27017');

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Methods", "DELETE, POST, GET, PUT, OPTIONS")
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(methodOverride());

app.get('/', function(req, res){
    mongoose.model('horaExtra').find(function(err, registros) {
        res.send(registros)
    })
})

app.use(cors())
app.options('/nuevo', cors())
var Hora = mongoose.model('horaExtra');
app.post('/nuevo', function(req, res) {
    console.log(req.body)
     var registo = new Hora(req.body)
     registo.save()
})

app.use(router);
app.listen(3000, function(){
    console.log('funciona!!!')
})