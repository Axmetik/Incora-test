import { useEffect, useState } from "react";
import axios from "axios";
import "../assets/Posts.css";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState("");
  const [toggle, setToggle] = useState(true);
  const [newText, setNewText] = useState("");
  const [newTitle, setNewTitle] = useState("");
  async function getPosts() {
    try {
      const res = await axios.get(
        `http://localhost:5000/posts`
      );
      setPosts(res.data.reverse());
    } catch (error) {
      throw new Error(error);
    }
  }

  useEffect(() => {
    getPosts();
  }, [toggle]);

  async function handleDelete(id) {
    try {
      await axios.delete(
        `http://localhost:5000/posts/${id}`
      );
      setPosts((posts) =>
        posts.filter((item) => item.id !== Number(id))
      );
    } catch (err) {
      throw new Error(err);
    }
  }

  async function handleAdd(e) {
    e.preventDefault();
    const obj = { title: newTitle, body: newText };
    try {
      await axios.post(`http://localhost:5000/posts/`, obj);
      setToggle(!toggle);
      setNewText("");
      setNewTitle("");
    } catch (err) {
      throw new Error(err);
    }
  }

  async function handlePut(e, id) {
    e.preventDefault();
    const post = posts.find((item) => item.id === id);
    try {
      await axios.put(`http://localhost:5000/posts/${id}`, {
        ...post,
        body: text,
      });
      setEdit(0);
      setToggle(!toggle);
    } catch (err) {
      throw new Error(err);
    }
  }

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleNewTextChange = (event) => {
    setNewText(event.target.value);
  };
  const handleNewTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  return (
    <div className="posts__container">
      <form>
        <div className="input">
          <span>Title</span>
          <input
            type="text"
            value={newTitle}
            onChange={handleNewTitleChange}
            required
          />
        </div>
        <div className="input">
          <span>Text</span>
          <input
            type="text"
            value={newText}
            onChange={handleNewTextChange}
            required
          />
        </div>
        <button onClick={(e) => handleAdd(e)}>
          Add new post
        </button>
      </form>
      <ul className="posts__content">
        {posts.map((item) => (
          <li className="post__item" key={item.title}>
            <h2>--- {item.title} ---</h2>
            <p>{item.body}</p>
            <button
              onClick={() => setEdit(posts.indexOf(item))}
            >
              Edit
            </button>
            <button onClick={() => handleDelete(item.id)}>
              Delete
            </button>
            {edit === posts.indexOf(item) && (
              <form>
                <span>New text:</span>
                <textarea onChange={handleTextChange} />
                <button
                  onClick={(e) => handlePut(e, item.id)}
                >
                  submit
                </button>
              </form>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
