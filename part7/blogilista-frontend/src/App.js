import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setNotification } from "./reducers/notificationReducer";

import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Toggleable from "./components/Toggleable";
import Notification from "./components/Notification";

import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      dispatch(
        setNotification(
          { text: "wrong username or password", type: "error" },
          5
        )
      );
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser");
    blogService.setToken(null);
    setUser(null);
  };

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility();
    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
    });
  };

  const likeBlog = (blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };

    blogService.update(updatedBlog.id, updatedBlog).then((returnedBlog) => {
      setBlogs(blogs.map((b) => (b.id !== updatedBlog.id ? b : returnedBlog)));
    });

    dispatch(
      setNotification({ text: `voted for '${blog.title}'`, type: "success" }, 5)
    );
  };

  const removeBlog = (blog) => {
    if (window.confirm(`Remove blog ${blog.title}?`)) {
      blogService.remove(blog.id);
      setBlogs(blogs.filter((b) => b.id !== blog.id));
      dispatch(
        setNotification({ text: `removed '${blog.title}'`, type: "success" }, 5)
      );
    }
  };

  const blogFormRef = useRef();

  blogs.sort((a, b) => {
    return b.likes - a.likes;
  });

  if (user === null) {
    return (
      <div>
        <Notification />

        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      </div>
    );
  }
  return (
    <div>
      <h2>blogs</h2>
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>

      <Notification />

      <Toggleable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Toggleable>

      <br />

      <div className="blogList">
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            likeBlog={likeBlog}
            removeBlog={removeBlog}
            user={user}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
