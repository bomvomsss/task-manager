"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type StatusId = "todo" | "inprogress" | "done";

export interface TodoItem {
  id: string;
  text: string;
  tags: string[];
}

type TodosByColumn = {
  [key in StatusId]: TodoItem[];
};

interface TodoContextType {
  todos: TodosByColumn;
  addTodo: (statusId: StatusId, item: TodoItem) => void;
  moveTodo: (from: StatusId, to: StatusId, itemId: string) => void;
  deleteTodo: (statusId: StatusId, itemId: string) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

const initialTodos: TodosByColumn = {
  todo: [],
  inprogress: [],
  done: [],
};

export function TodoProvider({ children }: { children: ReactNode }) {
  const [todos, setTodos] = useState<TodosByColumn>(initialTodos);

  const addTodo = (statusId: StatusId, item: TodoItem) => {
    setTodos((prev) => ({
      ...prev,
      [statusId]: [...prev[statusId], item],
    }));
  };

  const moveTodo = (from: StatusId, to: StatusId, itemId: string) => {
    setTodos((prev) => {
      const item = prev[from].find((i) => i.id === itemId);
      if (!item) return prev;

      return {
        ...prev,
        [from]: prev[from].filter((i) => i.id !== itemId),
        [to]: [...prev[to], item],
      };
    });
  };

  const deleteTodo = (statusId: StatusId, itemId: string) => {
    setTodos((prev) => ({
      ...prev,
      [statusId]: prev[statusId].filter((i) => i.id !== itemId),
    }));
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, moveTodo, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodos() {
  const context = useContext(TodoContext);
  if (!context) throw new Error("useTodos must be used within TodoProvider");
  return context;
}
