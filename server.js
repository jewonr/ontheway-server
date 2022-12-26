import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import router from "./router/router.js";
import "dotenv/config";
import cron from "node-cron";
import SerachIndex from './schema/SerachIndex.js';
import Todo from './schema/Todo.js';

const app = express();

app.use(cors({
  origin: '*'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.error('Connected to Mongoose'));

cron.schedule('0 0 */1 * *', async () => {
  const idx = await SerachIndex.find();
  await SerachIndex.updateOne({ num: idx[0].num }, {
    num: idx[0].num+=9
  });
  await Todo.deleteMany();
});

const port = 8000;
app.listen(port, () => { console.log(`listening on port ${port}`) });
