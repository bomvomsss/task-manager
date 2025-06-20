"use client";
import supabase from "@/lib/supabaseClient";
import { createContext, useContext, useState, ReactNode } from "react";
import DeleteConfirmModal from "../components/DeleteConfirm";

export type StatusId = "todo" | "doing" | "done";

export interface TodoItem {
  id: string;
  title: string;
  tags: string[];
}

type TodosByColumn = {
  [key in StatusId]: TodoItem[];
};

interface TodoContextType {
  todos: TodosByColumn;
  addTodo: (statusId: StatusId, item: TodoItem) => void;
  moveTodo: (from: StatusId, to: StatusId, itemId: string) => void;
  requestDelete: (statusId: StatusId, itemId: string) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

const initialTodos: TodosByColumn = {
  todo: [],
  doing: [],
  done: [],
};

export function TodoProvider({ children }: { children: ReactNode }) {
  const [todos, setTodos] = useState<TodosByColumn>(initialTodos);

  // 삭제 모달 상태 및 삭제 대상 관리
  const [deleteTarget, setDeleteTarget] = useState<{
    statusId: StatusId;
    itemId: string;
  } | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const addTodo = (statusId: StatusId, item: TodoItem) => {
    const newItem = {
      ...item,
      id: item.id ?? String(Date.now()),
    };
    setTodos((prev) => ({
      ...prev,
      [statusId]: [...prev[statusId], newItem],
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

  // 삭제 요청: 모달 오픈 및 삭제 대상 지정
  const requestDelete = (statusId: StatusId, itemId: string) => {
    setDeleteTarget({ statusId, itemId });
    setShowDeleteModal(true);
  };

  // 실제 삭제 처리
  const handleConfirmDelete = async () => {
    if (deleteTarget) {
      // 1. supabase에서 삭제
      await supabase.from("todos").delete().eq("id", deleteTarget.itemId);

      // 2. 상태에서 삭제
      setTodos((prev) => ({
        ...prev,
        [deleteTarget.statusId]: prev[deleteTarget.statusId].filter(
          (i) => i.id !== deleteTarget.itemId
        ),
      }));
      setDeleteTarget(null);
      setShowDeleteModal(false);
    }
  };

  const handleCancelDelete = () => {
    setDeleteTarget(null);
    setShowDeleteModal(false);
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, moveTodo, requestDelete }}>
      {children}
      <DeleteConfirmModal
        show={showDeleteModal}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </TodoContext.Provider>
  );
}

export function useTodos() {
  const context = useContext(TodoContext);
  if (!context) throw new Error("useTodos must be used within TodoProvider");
  return context;
}
