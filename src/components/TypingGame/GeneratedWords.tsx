interface Props {
  words: string;
}

const GeneratedWords = ({ words }: Props) => {
  return (
    <div
      // class: "textColor: rgb(100 116 139)"
      className="text-slate-500"
    >
      {words}
    </div>
  );
};

export default GeneratedWords;
