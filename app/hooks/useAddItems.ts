import { useState, useEffect } from "react";
import { TodoItemType, TodoStatus } from "./useCtrlItems";

// 할 일 추가 컴포넌트
export interface AddItemProps {
  show: boolean;
  item: TodoItemType | null;
  onSave: (item: TodoItemType) => void;
  onClose: () => void;
  onDelete: (item: TodoItemType) => void;
}

export default function useAddItems({ item, onSave, onDelete }: AddItemProps) {
  const [text, setText] = useState("");
  const [contents, setContents] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState<TodoStatus>("todo");

  useEffect(() => {
    if (item) {
      setText(item.text);
      setContents("");
      setTags(item.tags ?? []);
      setStartDate(item.dates?.[0] ?? "");
      setEndDate(item.dates?.[1] ?? "");
      setStatus(item.status ?? "todo");
    }
  }, [item]);

  const handleSave = () => {
    if (startDate && endDate && startDate > endDate) {
      alert("시작 날짜는 종료 날짜보다 이후일 수 없습니다.");
      return;
    }
    if (item && text.trim() !== "") {
      onSave({
        ...item,
        text,
        tags,
        dates: startDate && endDate ? [startDate, endDate] : [],
        status,
      });
    }
  };
  const handleDelete = () => {
    if (item) {
      onDelete(item);
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
    text,
    setText,
    contents,
    setContents,
    tagInput,
    setTagInput,
    tags,
    setTags,
    handleSave,
    handleDelete,
    handleAddTag,
    handleRemoveTag,
    handleKeyDown,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    status,
    setStatus,
  };
}
