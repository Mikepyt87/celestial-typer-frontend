interface Props {
  timeLeft: number;
}

const CountdownTimer = ({ timeLeft }: Props) => {
  return (
    <h2
      // class: "Font Size (primary comes from tailwind.config), Font Weight"
      className="text-primary-400 font-medium"
    >
      Time: {timeLeft}
    </h2>
  );
};

export default CountdownTimer;
