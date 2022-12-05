const Character = ({ char }: { char: string }) => {
  // class: "Font color (primary comes from tailwind.config)"
  return <span className="text-primary-400">{char}</span>;
};

export default Character;
