"use client";
import { useState, useEffect } from "react";
import { TodoItemType, TodoStatus } from "./useCtrlItems";

// 할 일 추가 컴포넌트
export interface AddItemProps {
  show: boolean;
  item: TodoItemType | null;
  onSave: (item: TodoItemType) => void;
  onClose: () => void;
  onDelete?: (item: TodoItemType) => void;
}
export function toStatusId(status: TodoStatus): "todo" | "doing" | "done" {
  if (status === "doing") return "doing";
  return status;
}

export default function useAddItems({ item, onSave }: AddItemProps) {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [startDate, setStartDate] = useState(item?.start_date ?? "");
  const [endDate, setEndDate] = useState(item?.end_date ?? "");
  const [status, setStatus] = useState<TodoStatus>("todo");
  useEffect(() => {
    if (item) {
      setTitle(item.title);
      setContents(item.contents ?? "");
      setTags(item.tags ?? []);
      setStartDate(item.start_date);
      setEndDate(item.end_date ?? "");
      setStatus(item.status ?? "todo");
    }
  }, [item]);

  const handleSave = () => {
    if (startDate && endDate && startDate > endDate) {
      alert("시작 날짜는 종료 날짜보다 이후일 수 없습니다.");
      return;
    }
    if (item && title.trim() !== "") {
      onSave({
        ...item,
        title,
        tags,
        contents,
        start_date: startDate,
        end_date: endDate,
        status,
      });
    }
  };

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setTagInput(""); // 입력창 초기화
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // form 제출 방지
      handleAddTag();
    }
  };

  const handleRemoveTag = (index: number) => {
    setTags((prev) => prev.filter((_, i) => i !== index));
  };

  return {
    title,
    setTitle,
    contents,
    setContents,
    tagInput,
    setTagInput,
    tags,
    setTags,
    handleSave,
    handleRemoveTag,
    handleKeyDown,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    status,
    setStatus,
    toStatusId,
  };
}
