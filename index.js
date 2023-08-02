const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

/* //cargar models
const category = require('./models/category');
const user = require('./models/user');
const post = require('./models/post'); */
//cargar rutas
const categoryRoutes = require('./routes/categories');
const postRoutes = require('./routes/posts');

//middlewares
app.use(express.json())
app.use(morgan('tiny'));//Display log requets
app.use(cors())
app.options('*', cors())

//routes
const api = '/api/v1';
app.use(api + '/categories', categoryRoutes);
app.use(api + '/posts', postRoutes);

//conectar a la base de datos
mongoose.connect('mongodb+srv://ciscojuan:call_of_duty_modern_warefare@fagugaramisa.sjagxjk.mongodb.net/').then(() => console.log("You have connected to the database successfully."))
.catch(err => err)

//server
const port = process.env.PORT || 38600;
app.listen(port, () => {
  console.log("Servidor corriendo en http://localhost:" + port);
});


