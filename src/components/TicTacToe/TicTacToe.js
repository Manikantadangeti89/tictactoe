import React, { useRef, useState } from "react";
import circle_icon from "../assets/circle.png";
import cross_icon from "../assets/cross.png";
import "./TicTacToe.css";

let data = ["", "", "", "", "", "", "", "", ""];

const TicTacToe = () => {
  let [count, setCount] = useState(0);
  let [lock, setLock] = useState(false);
  let titleRef = useRef(null);

  // ✅ Correct way to initialize refs
  let boxesRef = useRef(Array(9).fill(null).map(() => React.createRef()));

  const checkWin = () => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let [a, b, c] of winningCombinations) {
      if (data[a] === data[b] && data[b] === data[c] && data[a] !== "") {
        won(data[a]);
        return;
      }
    }

    // ✅ Check for Draw (No Empty Cells & No Winner)
    if (count === 8) {
      setLock(true);
      titleRef.current.innerHTML = `It's a Draw! 🤝`;
    }
  };

  const won = (winner) => {
    setLock(true);
    titleRef.current.innerHTML = `Congratulations <img src='${
      winner === "x" ? cross_icon : circle_icon
    }' style='width:25px; height:25px;'>`;
  };

  const toggle = (e, num) => {
    if (lock || data[num] !== "") {
      return;
    }

    if (count % 2 === 0) {
      e.target.innerHTML = `<img src='${cross_icon}' style='width:50px; height:50px;'>`;
      data[num] = "x";
    } else {
      e.target.innerHTML = `<img src='${circle_icon}' style='width:50px; height:50px;'>`;
      data[num] = "o";
    }

    setCount(count + 1);
    checkWin();
  };

  const reset = () => {
    setLock(false);
    data = ["", "", "", "", "", "", "", "", ""];
    setCount(0);
    titleRef.current.innerHTML = `Tic Tac Toe Game In <span>React</span>`;
    boxesRef.current.forEach((box) => (box.current.innerHTML = ""));
  };

  return (
    <div className="container">
      <h1 className="title" ref={titleRef}>
        Tic Tac Toe Game In <span>React</span>
      </h1>
      <div className="board">
        {boxesRef.current.map((box, index) => (
          <div
            key={index}
            className="boxes"
            ref={box}
            onClick={(e) => toggle(e, index)}
          ></div>
        ))}
      </div>
      <button className="reset" onClick={reset}>
        Reset
      </button>
    </div>
  );
};

export default TicTacToe;
