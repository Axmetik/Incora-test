import express, { response } from "express";
import cors from "cors";
import RSSParser from "rss-parser";
import fs from "fs";
import exp from "constants";

const nasaFeedURL =
  "https://www.nasa.gov/news-release/feed/";
const redditFeedURL = "https://www.reddit.com/.rss";
const mwlFeedURL =
  "https://www.mobileworldlive.com/latest-stories/feed/";

const parser = new RSSParser();

async function getData(url) {
  let articles = [];
  const feed = await parser.parseURL(url);
  feed.items.forEach((item) => {
    articles.push(item);
  });
  return articles;
}

const app = express();
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded());

app.get("/nasa", async (req, res) => {
  const articles = await getData(nasaFeedURL);
  res.send(articles);
});

app.get("/reddit", async (req, res) => {
  const articles = await getData(redditFeedURL);
  res.send(articles);
});

app.get("/posts", (req, res) => {
  fs.readFile("./data/posts.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading JSON file:", err);
      return;
    }

    try {
      const response = JSON.parse(data);
      res.send(response);
    } catch (parseError) {
      console.error("Error parsing JSON data:", parseError);
    }
  });
});
app.delete(`/posts/:id`, (req, res) => {
  const id = req.params.id;
  fs.readFile("./data/posts.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading JSON file:", err);
      return;
    }
    try {
      let fileData = JSON.parse(data);
      const objectToDelete = fileData.find(
        (item) => item.id === Number(id)
      );
      fileData.splice(fileData.indexOf(objectToDelete), 1);
      fs.writeFileSync(
        "./data/posts.json",
        JSON.stringify(fileData, null, 2)
      );

      res.send(objectToDelete);
    } catch (parseError) {
      console.error("Error parsing JSON data:", parseError);
    }
  });
});
app.post("/posts", async (req, res) => {
  console.log(req.body);
  fs.readFile("./data/posts.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading JSON file:", err);
      return;
    }
    try {
      let fileData = JSON.parse(data);
      fileData = [
        ...fileData,
        {
          ...req.body,
          id: Math.floor(Math.random() * 10001),
          userId: 10,
        },
      ];

      fs.writeFileSync(
        "./data/posts.json",
        JSON.stringify(fileData, null, 2)
      );

      res.send("ok");
    } catch (parseError) {
      console.error("Error parsing JSON data:", parseError);
    }
  });
});
app.put(`/posts/:id`, (req, res) => {
  const id = req.body.id;
  fs.readFile("./data/posts.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading JSON file:", err);
      return;
    }
    try {
      let fileData = JSON.parse(data);
      const modified = fileData.find(
        (item) => item.id === Number(id)
      );
      const index = fileData.indexOf(modified);
      fileData[index] = req.body;
      console.log(req.body);
      fs.writeFileSync(
        "./data/posts.json",
        JSON.stringify(fileData, null, 2)
      );

      res.send(modified);
    } catch (parseError) {
      console.error("Error parsing JSON data:", parseError);
    }
  });
});

const server = app.listen(5000, () => {
  console.log("Server listening on 5000 port");
});

export default server;
