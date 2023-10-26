import { useState, useEffect } from "react";
import axios from "axios";
import nasa from "../assets/nasa.png";
import reddit from "../assets/reddit.png";
import { NavLink } from "react-router-dom";
import "../assets/Article.css";

function formatDate(inputTimestamp) {
  const date = new Date(inputTimestamp);

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1)
    .toString()
    .padStart(2, "0");
  const year = date.getFullYear();

  const hours = date
    .getUTCHours()
    .toString()
    .padStart(2, "0");
  const minutes = date
    .getUTCMinutes()
    .toString()
    .padStart(2, "0");
  const seconds = date
    .getUTCSeconds()
    .toString()
    .padStart(2, "0");

  const formattedTimestamp = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;

  return formattedTimestamp;
}

function Article({ url }) {
  const [articles, setArticles] = useState([]);
  const [toggle, setToggle] = useState(true);

  useEffect(() => {
    async function getArticles() {
      try {
        const res = await axios.get(
          `http://localhost:5000/${url}`
        );
        setArticles(res.data);
      } catch (error) {
        throw new Error(error);
      }
    }

    getArticles();
  }, [toggle]);

  console.log(articles);

  return (
    <div className="article__container">
      <img
        className="article__logo"
        src={url === "nasa" ? nasa : reddit}
        alt="logo"
      />
      <NavLink
        className="article__to-articles"
        to={url === "nasa" ? "/reddit" : "/nasa"}
      >
        <span>click {"--->"}</span>
        <img
          onClick={() => setToggle(!toggle)}
          src={url === "nasa" ? reddit : nasa}
          alt="button"
        />
      </NavLink>
      <ul className="article__content">
        {articles.map((item) => (
          <li className="article__item" key={item.title}>
            <h2>{item.title}</h2>
            <p>{formatDate(item.pubDate)}</p>
            <a
              target="_blank"
              rel="noreferrer"
              href={item.link}
            >
              Original source
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Article;
