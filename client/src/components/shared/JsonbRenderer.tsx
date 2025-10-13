"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface JsonbRendererProps {
  content: any;
}

export default function JsonbRenderer({ content }: JsonbRendererProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    editable: false,
    immediatelyRender: false,
  });

  if (!editor) return null;

  return <EditorContent editor={editor} />;
}
