import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

test("test blog form component", async () => {
  const mockCreateBlogHandler = jest.fn();
  const user = userEvent.setup();

  render(<BlogForm createBlog={mockCreateBlogHandler} />);

  const titleInput = screen.getByRole("textbox", {
    name: /Title/,
  });
  const authorInput = screen.getByRole("textbox", {
    name: /Author/,
  });
  const urlInput = screen.getByRole("textbox", {
    name: /URL/,
  });
  const createBlogButton = screen.getByText("Create");

  await user.type(titleInput, "This is a test blog.");
  await user.type(authorInput, "J. Smith");
  await user.type(urlInput, "testing.com");

  screen.debug();

  await user.click(createBlogButton);

  expect(mockCreateBlogHandler.mock.calls).toHaveLength(1);
  expect(mockCreateBlogHandler.mock.calls[0][0]).toEqual({
    title: "This is a test blog.",
    author: "J. Smith",
    url: "testing.com",
  });

  await user.click(createBlogButton);
});
