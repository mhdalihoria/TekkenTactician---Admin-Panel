import React from "react";
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import FontFamily from "@tiptap/extension-font-family";
import BulletList from "@tiptap/extension-bullet-list";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Color from "@tiptap/extension-color";
import Focus from "@tiptap/extension-focus";
import Heading, { Level } from "@tiptap/extension-heading";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import OrderedList from "@tiptap/extension-ordered-list";
import Paragraph from "@tiptap/extension-paragraph";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Typography from "@tiptap/extension-typography";
import Underline from "@tiptap/extension-underline";
import { common, createLowlight } from "lowlight"; // For syntax highlighting with CodeBlockLowlight
import FontSizeExtension from "./FontSizeExtension";

// Define lowlight for syntax highlighting
const lowlight = createLowlight(common);

// Define extensions
const extensions = [
  StarterKit,
  TextStyle,
  FontFamily,
  BulletList,
  CodeBlockLowlight.configure({ lowlight }),
  Color,
  Focus,
  Heading.configure({
    levels: [1, 2, 3, 4, 5, 6],
  }),
  Image,
  Link,
  OrderedList,
  Paragraph,
  Placeholder.configure({
    placeholder: "Start typing here...",
  }),
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  Typography,
  Underline,
  FontSizeExtension,
];

const content = "<p>Welcome to your enhanced TipTap editor!</p>";

const TextEditor = () => {
  const editor = useEditor({
    extensions,
    content,
  });

  if (!editor) return null;

  const setFontSize = (size: string) => {
    //   // editor.chain().focus().setFontSize(size).run();
    //   // editor.chain().focus().setMark("textStyle", {FontSize: 50}).run();
    //   editor.chain().focus().setMark('textStyle', { fontSize: '24px' }).run();
    editor.chain().focus().toggleMark("textStyle", { fontSize: size }).run();
  };

  console.log(editor.getHTML());
  return (
    <div>
      {/* Toolbar */}
      <div style={{ marginBottom: "10px" }}>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive("heading", { level: 1 }) ? "is-active" : ""
          }
        >
          H1
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 }) ? "is-active" : ""
          }
        >
          H2
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive("heading", { level: 3 }) ? "is-active" : ""
          }
        >
          H3
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          className={
            editor.isActive("heading", { level: 4 }) ? "is-active" : ""
          }
        >
          H4
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
          className={
            editor.isActive("heading", { level: 5 }) ? "is-active" : ""
          }
        >
          H5
        </button>
        <button onClick={() => editor.chain().focus().toggleBold().run()}>
          Bold
        </button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()}>
          Italic
        </button>
        <button onClick={() => editor.chain().focus().toggleUnderline().run()}>
          Underline
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
        >
          Left Align
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
        >
          Center Align
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
        >
          Right Align
        </button>
        <button
          onClick={() => editor.chain().focus().setFontFamily("Arial").run()}
        >
          Arial
        </button>
        <button
          onClick={() => editor.chain().focus().setColor("#FF5733").run()}
        >
          Orange
        </button>
        <button
          onClick={() =>
            editor
              .chain()
              .focus()
              .insertContent('<img src="https://via.placeholder.com/150" />')
              .run()
          }
        >
          Insert Image
        </button>
        <button onClick={() => editor.chain().focus().toggleBulletList().run()}>
          Bullet List
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          Ordered List
        </button>
        <button onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
          Code Block
        </button>
        <button
          onClick={() =>
            editor
              .chain()
              .focus()
              .setLink({ href: "https://example.com" })
              .run()
          }
        >
          Add Link
        </button>
      </div>

      {/* TipTap Editor */}
      <EditorContent editor={editor} style={{ background: "red" }} />

      {/* Bubble Menu */}
      <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
        <button onClick={() => editor.chain().focus().toggleBold().run()}>
          Bold
        </button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()}>
          Italic
        </button>
        <button onClick={() => editor.chain().focus().toggleUnderline().run()}>
          Underline
        </button>
        <button onClick={() => setFontSize("14px")}>14px</button>
        <button onClick={() => setFontSize("16px")}>16px</button>
        <button onClick={() => setFontSize("24px")}>24px</button>
      </BubbleMenu>
    </div>
  );
};

export default TextEditor;
