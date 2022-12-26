import express from "express";
import Feed from "../schema/Feed.js";
import Memo from "../schema/Memo.js";
import Category from "../schema/Category.js";
import Todo from "../schema/Todo.js";
import { getLinkPreview } from "link-preview-js";
import Scrap from "../schema/Scrap.js";
import SerachIndex from "../schema/SerachIndex.js";

const router = express.Router();

router.get('/get/feed', async (req, res) => {
  let items = [];
  const dataList = Feed.find();
  (await dataList).forEach((data, idx) => {
    items.push([]);
    data.feeds.forEach(feed => {
      items[idx].push({
        title: feed.title,
        desc: feed.desc,
        url: feed.url,
        imgLink: feed.imgLink,
        category: data.category
      });
    })
  });
  res.send(items);
});

router.get('/get/scrap', async (req, res) => {
  let items = [];
  const scraps = Scrap.find();
  (await scraps).forEach(scrap => {
    items.push({
      id: scrap.id,
      title: scrap.title,
      desc: scrap.desc,
      imgLink: scrap.imgLink,
      link: scrap.link,
      siteName: scrap.siteName
    });
  });
  res.send(items);
});

router.get('/get/category', async (req, res) => {
  let items = [];
  const categories = Category.find();
  (await categories).forEach(category => {
    items.push({
      id: category.id,
      text: category.text
    });
  });
  res.send(items);
});

router.get('/get/todo', async (req, res) => {
  let items = [];
  const todos = Todo.find();
  (await todos).forEach(todo => {
    items.push({
      id: todo.id,
      text: todo.text,
      done: todo.done,
    });
  });
  res.send(items);
});

router.get('/get/memo', async (req, res) => {
  let items = [];
  const memos = Memo.find();
  (await memos).forEach(memo => {
    items.push({
      id: memo.id,
      text: memo.text,
      view: memo.view,
      date: memo.date
    });
  });
  res.send(items);
});

router.get('/get/searchidx', async (req, res) => {
  const idx = await SerachIndex.find();
  res.send(idx[0]);
});

router.post('/update/feed', async (req, res) => {
  await Feed.findOneAndUpdate({ category: req.body.category }, {
    feeds: req.body.feed,
    category: req.body.category
  }, { upsert: true });
  res.send();
});

router.post('/update/todo', async (req, res) => {
  await Todo.deleteMany({});
  await Todo.insertMany(req.body.todos);
  res.send();
});

router.post('/update/memo', async (req, res) => {
  await Memo.deleteMany({});
  await Memo.insertMany(req.body.memos);
  res.send();
});

router.post('/add/category', async (req, res) => {
  const category = new Category({
    id: req.body.id,
    text: req.body.text
  });
  await category.save();
  res.send();
});

router.post('/add/scrap', async (req, res) => {
  console.log(req.body.scrap.url);
  const data = await getLinkPreview(req.body.scrap.url);
  console.log(data);
  const scrap = new Scrap({
    id: req.body.scrap.id,
    title: data.title,
    desc: data.description,
    imgLink: data.images[0],
    link: req.body.scrap.url,
    siteName: data.siteName,
  });
  await scrap.save();
  res.send();
});

router.delete('/delete/category/:text', async (req, res) => {
  await Category.deleteOne({ text: req.params.text });
  await Feed.deleteOne({ category: req.params.text });
  res.send();
});

router.delete('/delete/scrap/:id', async (req, res) => {
  await Scrap.deleteMany({ id: req.params.id });
  res.send();
});

export default router;
