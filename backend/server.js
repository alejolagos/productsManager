let express = require('express'),
   path = require('path'),
   mongoose = require('mongoose'),
   cors = require('cors'),
   bodyParser = require('body-parser'),
   dbConfig = require('./database/db');

//conexion entre mongo y la aplicacion 
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
   useNewUrlParser: true
}).then(() => {
      console.log('conectado a la base de datos...')
   },
   error => {
      console.log('error de conexion DB: ' + error)
   }
)

// configuracion de puerto con express
const productRoute = require('../backend/routes/product.route');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: false
}));
app.use(cors()); 
app.use(express.static(path.join(__dirname, 'dist/productsManager')));
app.use('/', express.static(path.join(__dirname, 'dist/productsManager')));
app.use('/product', productRoute);

// creando puerto
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log('CONECTADO AL PUERTO ::: ' + port)
})

// manejo de errores
app.use((req, res, next) => {
   next(createError(404));
});
app.use(function (err, req, res, next) {
  console.error(err.message);                    // mensaje de error en el servidor
  if (!err.statusCode) err.statusCode = 500;     // error sin codigo se le asigna 500 (error interno del servidor)
  res.status(err.statusCode).send(err.message);  // asigna el codigo correspondiente de error
});



