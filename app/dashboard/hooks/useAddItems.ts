import { useState, useEffect } from "react";
import { TodoItemType } from "./useCtrlItems";

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

  useEffect(() => {
    if (item) {
      setText(item.text);
      setContents("");
      setTags([]);
    }
  }, [item]);

  const handleSave = () => {
    if (item && text.trim() !== "") {
      onSave({ ...item, text });
    }
    // if (item && contents.trim() !== "") {
    //   setContents(contents);
    // }
    // if (item && tags.length !== 0) {
    //   setTags(tags);
    // }
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
  };
}
