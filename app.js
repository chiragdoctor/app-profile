import express from 'express';

import path from 'path';
import userRoutes from './routers/userRoutes';
import dbController from './controller/dbController';

const app = express()

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(express.static(path.join(__dirname,'public')))

app.get('/',(req,res) => {
  res.render('index', { title: 'User Profile' });
})

app.use('/user',userRoutes)

const port = 8082
app.listen(port,() => {
  console.log(`The Express 🚆 🚆 server is working on port ${port}.. 8️⃣ 0️⃣ 8️⃣ 2️⃣`);
})