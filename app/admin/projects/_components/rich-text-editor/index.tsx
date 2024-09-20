import StarterKit from "@tiptap/starter-kit";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { EditorContent, useEditor } from "@tiptap/react";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import Tools from "./Tools";
import Heading from "@tiptap/extension-heading";
import { all, createLowlight } from "lowlight";
import Blockquote from "@tiptap/extension-blockquote";
import ListItem from "@tiptap/extension-list-item";
import ListKeymap from "@tiptap/extension-list-keymap";
import { FC } from "react";
import { Button } from "@/components/ui/button";

const lowlight = createLowlight(all);

const extensions = [
  StarterKit,
  Underline,
  ListItem.configure({
    HTMLAttributes: {
      class: "my-6 ml-6 list-disc [&>li]:mt-2",
    },
  }),
  ListKeymap,
  Placeholder.configure({
    placeholder: "Write Something...",
  }),
  TextAlign.configure({
    types: ["paragraph"],
  }),
  Heading.configure({
    levels: [1, 2, 3],
    HTMLAttributes: {
      class:
        "mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0",
    },
  }),
  CodeBlockLowlight.configure({
    lowlight,
    HTMLAttributes: {
      class:
        "text-sm sm:text-base inline-flex text-left items-center space-x-4 bg-gray-800 text-white rounded-lg p-4 pl-6",
    },
  }),
  Link.configure({
    openOnClick: true,
    autolink: true,
    defaultProtocol: "https",
    HTMLAttributes: {
      class:
        "font-medium text-primary underline underline-offset-4 cursor-pointer",
    },
  }),
  Blockquote.configure({
    HTMLAttributes: {
      class: "mt-6 border-l-2 pl-6 italic",
    },
  }),
];

interface Props {
  content: string;
  setContent?: (content: string) => void;
}

const RichTextEditor: FC<Props> = ({ setContent, content }) => {
  const editor = useEditor({
    extensions,
    content, // Set initial content for the editor
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl outline-none p-4 border rounded-md",
      },
    },
  });

  return (
    <div className="h-full flex flex-col space-y-4 p-4">
      <div className="float-end">
        <Button
          type="button"
          size={"sm"}
          className="w-20 float-end"
          onClick={() => setContent && editor && setContent(editor.getHTML())}
        >
          Save
        </Button>
      </div>
      <Tools editor={editor} />
      <hr />
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextEditor;
