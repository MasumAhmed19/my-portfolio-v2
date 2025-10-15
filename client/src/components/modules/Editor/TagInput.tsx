"use client";

import { useState } from "react";
import { X, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
}

export default function TagInput({
  tags,
  onChange,
  placeholder = "Add a tag...",
}: TagInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleAddTag = () => {
    const trimmedValue = inputValue.trim().toLowerCase();
    if (trimmedValue && !tags.includes(trimmedValue)) {
      onChange([...tags, trimmedValue]);
      setInputValue("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    onChange(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
        />
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={handleAddTag}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="px-3 py-1">
              {tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="ml-2 hover:bg-muted rounded-full"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}