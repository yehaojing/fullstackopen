import React from "react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import Todo from "./Todo";
import { v4 as uuid } from "uuid";
import { render, screen } from "@testing-library/react";

test("check Todo component rendered correctly", async () => {
  const todo = {
    text: "This is a test todo",
    completed: false,
    id: uuid(),
  };

  const user = userEvent.setup();

  const mockDeleteTodo = jest.fn();
  const mockCompleteTodo = jest.fn();
  const { container } = render(
    <Todo
      todo={todo}
      completeTodo={mockCompleteTodo}
      deleteTodo={mockDeleteTodo}
    />
  );

  const todoText = container.querySelector(".todoText");

  const completeButton = screen.getByText("Set as done");
  await user.click(completeButton);

  const deleteButton = screen.getByText("Delete");
  await user.click(deleteButton);

  screen.debug();

  expect(mockCompleteTodo.mock.calls).toHaveLength(1);
  expect(mockDeleteTodo.mock.calls).toHaveLength(1);

  expect(todoText).toHaveTextContent("This is a test todo");
});
