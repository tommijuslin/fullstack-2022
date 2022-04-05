import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BlogForm from "./BlogForm";

test("<BlogForm /> calls callback function with right info", () => {
  const createBlog = jest.fn();
  const showMessage = jest.fn();

  render(<BlogForm createBlog={createBlog} showMessage={showMessage} />);

  const title = screen.getByPlaceholderText("title");
  const author = screen.getByPlaceholderText("author");
  const url = screen.getByPlaceholderText("url");
  const createButton = screen.getByText("create");

  // en saanut userEventtiä toimimaan millään

  fireEvent.change(title, { target: { value: "test blog" } });
  fireEvent.change(author, { target: { value: "tester" } });
  fireEvent.change(url, { target: { value: "www.testblog.com" } });
  fireEvent.click(createButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe("test blog");
  expect(createBlog.mock.calls[0][0].author).toBe("tester");
  expect(createBlog.mock.calls[0][0].url).toBe("www.testblog.com");
});
