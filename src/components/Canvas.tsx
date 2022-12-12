import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Account from "../models/Account";
import useWindowDimensions from "./custom hooks/useWindowDimensions";

interface Props {
  topFiveScores: Account[];
  canvasHeight: number;
  barWidth: number;
}

const getTopScore = (topAccounts: Account[], index: number) => {
  return topAccounts[index]?.scores[topAccounts[index].scores.length - 1]
    .adjustedCharactersPerMinute;
};

const Canvas = ({ topFiveScores, canvasHeight, barWidth }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [height, setHeight] = useState(0);

  const { width } = useWindowDimensions();

  const sideMargin = 20;
  const barColor = "rgb(255, 0, 0)";
  const outlineColor = "black";
  const canvasWidth = barWidth * 5 + sideMargin * 6; // do not change
  const maxBarHeight = -canvasHeight * 0.85; // do not change

  const firstPlaceScore = getTopScore(topFiveScores, 0);
  //   console.log("firstPlaceScore", firstPlaceScore);
  const secondPlaceScore = getTopScore(topFiveScores, 1);
  //   console.log("secondPlaceScore", secondPlaceScore);
  const thirdPlaceScore = getTopScore(topFiveScores, 2);
  //   console.log("thirdPlaceScore", thirdPlaceScore);
  const fourthPlaceScore = getTopScore(topFiveScores, 3);
  //   console.log("fourthPlaceScore", fourthPlaceScore);
  const fifthPlaceScore = getTopScore(topFiveScores, 4);
  //   console.log("fifthPlaceScore", fifthPlaceScore);

  const leaderboard = (context: CanvasRenderingContext2D) => {
    let x = sideMargin;

    context.lineWidth = 5;

    context.strokeStyle = outlineColor;
    context.fillStyle = barColor;
    context.beginPath();
    if (height >= maxBarHeight * (firstPlaceScore / firstPlaceScore)) {
      context.roundRect(x, canvasHeight + 5, barWidth, height, 5);
    } else {
      context.roundRect(
        x,
        canvasHeight + 5,
        barWidth,
        maxBarHeight * (firstPlaceScore / firstPlaceScore),
        5
      );
    }
    context.stroke();
    context.fill();

    x += sideMargin + barWidth;

    context.strokeStyle = outlineColor;
    context.fillStyle = barColor;
    context.beginPath();
    if (height >= maxBarHeight * (secondPlaceScore / firstPlaceScore)) {
      context.roundRect(x, canvasHeight + 5, barWidth, height, 5);
    } else {
      context.roundRect(
        x,
        canvasHeight + 5,
        barWidth,
        maxBarHeight * (secondPlaceScore / firstPlaceScore),
        5
      );
    }

    context.stroke();
    context.fill();

    x += sideMargin + barWidth;

    context.strokeStyle = outlineColor;
    context.fillStyle = barColor;
    context.beginPath();
    if (height >= maxBarHeight * (thirdPlaceScore / firstPlaceScore)) {
      context.roundRect(x, canvasHeight + 5, barWidth, height, 5);
    } else {
      context.roundRect(
        x,
        canvasHeight + 5,
        barWidth,
        maxBarHeight * (thirdPlaceScore / firstPlaceScore),
        5
      );
    }

    context.stroke();
    context.fill();

    x += sideMargin + barWidth;

    context.strokeStyle = outlineColor;
    context.fillStyle = barColor;
    context.beginPath();
    if (height >= maxBarHeight * (fourthPlaceScore / firstPlaceScore)) {
      context.roundRect(x, canvasHeight + 5, barWidth, height, 5);
    } else {
      context.roundRect(
        x,
        canvasHeight + 5,
        barWidth,
        maxBarHeight * (fourthPlaceScore / firstPlaceScore),
        5
      );
    }
    context.stroke();
    context.fill();

    x += sideMargin + barWidth;

    context.strokeStyle = outlineColor;
    context.fillStyle = barColor;
    context.beginPath();
    if (height >= maxBarHeight * (fifthPlaceScore / firstPlaceScore)) {
      context.roundRect(x, canvasHeight + 5, barWidth, height, 5);
    } else {
      context.roundRect(
        x,
        canvasHeight + 5,
        barWidth,
        maxBarHeight * (fifthPlaceScore / firstPlaceScore),
        5
      );
    }
    context.stroke();
    context.fill();

    // const img = new Image();
    // img.src =
    //   topFiveScores[0]?.scores[topFiveScores[0].scores.length - 1].profilePic;

    // context.drawImage(img, sideMargin, canvasHeight - 96);

    if (height >= maxBarHeight) {
      setTimeout(() => {
        setHeight(height - 1);
      }, 1);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }
    leaderboard(context);
  }, [leaderboard]);

  return (
    <Link to="/leaderboard">
      <canvas
        style={{ backgroundColor: "rgb(250 204 21)", borderRadius: "10px" }}
        width={canvasWidth}
        height={canvasHeight}
        ref={canvasRef}
      />
    </Link>
  );
};

export default Canvas;
