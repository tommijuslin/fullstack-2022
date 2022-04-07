import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, useMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setNotification } from "./reducers/notificationReducer";
import { initializeBlogs } from "./reducers/blogReducer";
import { setUser, logout } from "./reducers/loggedUserReducer";
import { initializeUsers } from "./reducers/userReducer";

import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Toggleable from "./components/Toggleable";
import Notification from "./components/Notification";
import UserList from "./components/UserList";
import User from "./components/User";
import Blog from "./components/Blog";
import Menu from "./components/Menu";

import { Page, Title, StyledBlogList, Content } from "./components/Styles";

import loginService from "./services/login";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.loggedUser);
  const blogs = useSelector((state) => state.blogs);
  const users = useSelector((state) => state.users);

  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      dispatch(setUser(user));
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
    dispatch(logout());
  };

  const matchUser = useMatch("users/:id");
  const user = matchUser
    ? users.find((user) => user.id === matchUser.params.id)
    : null;

  const matchBlog = useMatch("blogs/:id");
  const blog = matchBlog
    ? blogs.find((blog) => blog.id === matchBlog.params.id)
    : null;

  if (loggedUser === null) {
    return (
      <Page>
        <Content>
          <Notification />
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
          />
        </Content>
      </Page>
    );
  }
  return (
    <Page>
      <Menu loggedUser={loggedUser} handleLogout={handleLogout} />
      <Content>
        <Title>blog app</Title>
        <Notification />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Toggleable buttonLabel="new blog" ref={blogFormRef}>
                  <BlogForm blogFormRef={blogFormRef} />
                </Toggleable>
                <StyledBlogList />
              </>
            }
          />
          <Route path="/users" element={<UserList users={users} />} />
          <Route path="/users/:id" element={<User user={user} />} />
          <Route path="/blogs/:id" element={<Blog blog={blog} />} />
        </Routes>
      </Content>
    </Page>
  );
};

export default App;
