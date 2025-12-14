// "use client";

// import { EditorContent, JSONContent, useEditor } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";

// interface JsonbRendererProps {
//   content: JSONContent;
// }

// export default function JsonbRenderer({ content }: JsonbRendererProps) {
//   const editor = useEditor({
//     extensions: [StarterKit],
//     content,
//     editable: false,
//     immediatelyRender: false,
//   });

//   if (!editor) return null;

//   return <EditorContent editor={editor} />;
// }

"use client";

import { EditorContent, JSONContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";

// ✅ Import highlight.js language definitions
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import json from "highlight.js/lib/languages/json";

// ✅ Create lowlight instance and register languages
const lowlight = createLowlight(common);
lowlight.register("javascript", javascript);
lowlight.register("typescript", typescript);
lowlight.register("jsx", javascript); // JSX uses JS highlighting
lowlight.register("tsx", typescript); // TSX uses TS highlighting
lowlight.register("json", json);

interface JsonbRendererProps {
  content: JSONContent;
}

export default function JsonbRenderer({ content }: JsonbRendererProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    content,
    editable: false,
    immediatelyRender: false,
  });

  if (!editor) return null;

  return <EditorContent editor={editor} />;
}