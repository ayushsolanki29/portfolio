import {
  BiBold,
  BiCode,
  BiItalic,
  BiListOl,
  BiListUl,
  BiStrikethrough,
  BiUnderline,
  BiAlignLeft,
  BiAlignRight,
  BiAlignMiddle,
  BiAlignJustify,
  BiLink,
  BiSolidQuoteLeft,
  BiParagraph,
} from "react-icons/bi";
import { ChainedCommands, Editor } from "@tiptap/react";
import ToolButton from "./ToolButton";
import { FC } from "react";
import {  LucideHeading2 } from "lucide-react";
interface Props {
  editor: Editor | null;
}
const Tools: FC<Props> = ({ editor }) => {
  const tools = [
    { task: "bold", icon: <BiBold size={20} />, tooltip: "Bold" },
    { task: "italic", icon: <BiItalic size={20} />, tooltip: "Italic" },
    {
      task: "underline",
      icon: <BiUnderline size={20} />,
      tooltip: "Underline",
    },
    {
      task: "strikethrough",
      icon: <BiStrikethrough size={20} />,
      tooltip: "Strikethrough",
    },
    { task: "code", icon: <BiCode size={20} />, tooltip: "Code Block" },
    {
      task: "heading1",
      icon: <LucideHeading2 size={20} />,
      tooltip: "Heading 2",
    },
    {
      task: "paragraph",
      icon: <BiParagraph size={20} />,
      tooltip: "Paragraph",
    },
    {
      task: "quote",
      icon: <BiSolidQuoteLeft size={20} />,
      tooltip: "Blockquote",
    },
    {
      task: "bulletList",
      icon: <BiListUl size={20} />,
      tooltip: "Bullet List",
    },
    {
      task: "alignLeft",
      icon: <BiAlignLeft size={20} />,
      tooltip: "Align Left",
    },
    {
      task: "alignCenter",
      icon: <BiAlignMiddle size={20} />,
      tooltip: "Align Center",
    },
    {
      task: "alignRight",
      icon: <BiAlignRight size={20} />,
      tooltip: "Align Right",
    },
    {
      task: "alignJustify",
      icon: <BiAlignJustify size={20} />,
      tooltip: "Justify",
    },
    { task: "link", icon: <BiLink size={20} />, tooltip: "Insert Link" },
  ] as const;

  const chainMethods = (
    editor: Editor | null,
    command: (chain: ChainedCommands) => ChainedCommands
  ) => {
    if (!editor) return;
    command(editor.chain().focus()).run();
  };

  type TaskType = (typeof tools)[number]["task"];
  const handleOnClick = (task: TaskType) => {
    switch (task) {
      case "bold":
        return chainMethods(editor, (chain) => chain.toggleBold());
      case "italic":
        return chainMethods(editor, (chain) => chain.toggleItalic());
      case "underline":
        return chainMethods(editor, (chain) => chain.toggleUnderline());
      case "strikethrough":
        return chainMethods(editor, (chain) => chain.toggleStrike());
      case "code":
        return chainMethods(editor, (chain) => chain.toggleCodeBlock());
      case "heading1":
        return chainMethods(editor, (chain) => chain.setHeading({ level: 1 }));
      case "paragraph":
        return chainMethods(editor, (chain) => chain.setParagraph());
      case "quote":
        return chainMethods(editor, (chain) => chain.toggleBlockquote());
      case "link":
        // Here, you might want to open a prompt for the user to input a link
        const url = prompt("Enter URL:");
        if (url) {
          return chainMethods(editor, (chain) => chain.setLink({ href: url }));
        }
        break;
      case "bulletList":
        return chainMethods(editor, (chain) => chain.toggleBulletList());
      case "alignLeft":
        return chainMethods(editor, (chain) => chain.setTextAlign("left"));
      case "alignCenter":
        return chainMethods(editor, (chain) => chain.setTextAlign("center"));
      case "alignRight":
        return chainMethods(editor, (chain) => chain.setTextAlign("right"));
      case "alignJustify":
        return chainMethods(editor, (chain) => chain.setTextAlign("justify"));
      default:
        break;
    }
  };

  return (
    <div className="flex flex-wrap gap-2 p-2 bg-gray-100 rounded-md">
      {tools.map(({ icon, task, tooltip }) => (
        <ToolButton
          key={task}
          onClick={() => handleOnClick(task)}
          active={editor?.isActive(task)}
          tooltip={tooltip}
        >
          {icon}
        </ToolButton>
      ))}
    </div>
  );
};

export default Tools;
