import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Account from "../models/Account";

interface Props {
  fiveScores: Account[];
  canvasHeight: number;
  barWidth: number;
}

const sideMargin = 20;
const barColor = "rgb(255, 0, 0)";
const outlineColor = "black";
const barWidth = 92;
const canvasHeight = 400;
const canvasWidth = barWidth * 5 + sideMargin * 6; // do not change
const maxBarHeight = -canvasHeight * 0.85; // do not change

const Canvas = ({ fiveScores, canvasHeight, barWidth }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [height, setHeight] = useState(-20);

  useEffect(() => {
    if (height >= maxBarHeight) {
      requestAnimationFrame(renderFrame);
    }
  }, [height]);

  const renderFrame = (): void => {
    const context = canvasRef.current?.getContext("2d");
    if (context != null) {
      // Header of canvas
      clearBackground(context);
      context.font = "30px Arial";
      context.textAlign = "center";
      context.fillStyle = "black";
      context.fillText("TOP SCORES", canvasWidth / 2, 35);

      // user Scores
      drawRectangle(context, 1);
      drawRectangle(context, 2);
      drawRectangle(context, 3);
      drawRectangle(context, 4);
      drawRectangle(context, 5);

      // bar animation speed
      setHeight(height - 4);
    }
  };

  const clearBackground = (context: CanvasRenderingContext2D): void => {
    const { width, height } = context.canvas;
    context.rect(0, 0, width, height);
    context.fillStyle = "rgb(250 204 21)";
    context.fill();
  };

  // function draws rectangles
  const drawRectangle = (
    context: CanvasRenderingContext2D,
    placement: number
  ): void => {
    let sideMargin = 20;

    const x = sideMargin * placement + (placement - 1) * barWidth;

    const firstPlaceScore =
      fiveScores[0].scores[fiveScores[0].scores.length - 1]
        .adjustedCharactersPerMinute;
    const placementScore =
      fiveScores[placement - 1].scores[
        fiveScores[placement - 1].scores.length - 1
      ].adjustedCharactersPerMinute;

    context.lineWidth = 5;

    context.strokeStyle = outlineColor;
    context.fillStyle = barColor;
    context.beginPath();

    if (height > maxBarHeight * (placementScore / firstPlaceScore)) {
      //     .roundRect(x,       y         ,    width,    height   , border-radius);
      context.roundRect(x, canvasHeight + 5, barWidth, height, 5);
      context.stroke();
      context.fill();

      // userName & score
      context.font = "20px Arial";
      context.textAlign = "center";
      context.fillStyle = "black";
      context.fillText(
        `${
          fiveScores[placement - 1].scores[
            fiveScores[placement - 1].scores.length - 1
          ].userName
        }`,
        x + barWidth / 2,
        height + 395
      );
      context.fillText(
        `${
          fiveScores[placement - 1].scores[
            fiveScores[placement - 1].scores.length - 1
          ].adjustedCharactersPerMinute
        }cpm`,
        x + barWidth / 2,
        height + 405 - (maxBarHeight * (placementScore / firstPlaceScore)) / 2
      );
    } else {
      context.roundRect(
        x,
        canvasHeight + 5,
        barWidth,
        maxBarHeight * (placementScore / firstPlaceScore),
        5
      );
      context.stroke();
      context.fill();

      // userName & score
      context.font = "20px Arial";
      context.textAlign = "center";
      context.fillStyle = "black";
      context.fillText(
        `${
          fiveScores[placement - 1].scores[
            fiveScores[placement - 1].scores.length - 1
          ].userName
        }`,
        x + barWidth / 2,
        maxBarHeight * (placementScore / firstPlaceScore) + 395
      );
      context.fillText(
        `${
          fiveScores[placement - 1].scores[
            fiveScores[placement - 1].scores.length - 1
          ].adjustedCharactersPerMinute
        }cpm`,
        x + barWidth / 2,
        405 + (maxBarHeight * (placementScore / firstPlaceScore)) / 2
      );
    }
    // const img = new Image();
    // img.src =
    //   FiveScores[placement - 1].scores[
    //     FiveScores[placement - 1].scores.length - 1
    //   ].profilePic;
    // context.drawImage(img, x - 2, 50);
  };

  return (
    <Link to="/leaderboard">
      <canvas
        ref={canvasRef}
        height={canvasHeight}
        width={canvasWidth}
        style={{ borderRadius: 10 }}
      />
    </Link>
  );
};

export default Canvas;
