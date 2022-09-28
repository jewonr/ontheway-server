import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import router from "./router/router.js";

const app = express();

app.use(cors({
  origin: '*'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

mongoose.connect("mongodb+srv://admin:2qa1ZGXq0VR1OX2B@cluster0.a2kebcb.mongodb.net/?retryWrites=true&w=majority&ssl=true", { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.error('Connected to Mongoose'));

const port = 8000;
app.listen(port, () => { console.log(`listening on port ${port}`) });
