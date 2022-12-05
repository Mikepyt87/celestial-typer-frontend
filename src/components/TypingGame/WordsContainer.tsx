interface Props {
  children: React.ReactNode;
}

const WordsContainer = ({ children }: Props) => {
  return (
    <div
      // class: "position: relative, font-size: 30px; line-height: 36px;, 	max-width: 576px;, line-height: 1.625;, adds line breaks mid-word if needed, add margin to top"
      className="relative text-3xl max-w-xl leading-relaxed break-all mt-3"
    >
      {children}
    </div>
  );
};

export default WordsContainer;
