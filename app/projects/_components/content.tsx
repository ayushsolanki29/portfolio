import parse from "html-react-parser";
const Content = ({ text }: { text: string }) => {
  return (
    <div className="prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl outline-none p-1 rounded-md">
      <div>{parse(text)}</div>
    </div>
  );
};

export default Content;
