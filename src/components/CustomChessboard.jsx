import React, { useState } from "react";
import "../assets/css/CustomChessboard.css";

const CustomChessboard = () => {
  const [pieces, setPieces] = useState([
    {
      name: "pawn",
      img: "https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg",
      blackImg:
        "https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg",
    },
    {
      name: "knight",
      img: "https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg",
      blackImg:
        "https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg",
    },
    {
      name: "bishop",
      img: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg",
      blackImg:
        "https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg",
    },
    {
      name: "rook",
      img: "https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg",
      blackImg:
        "https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg",
    },
    {
      name: "queen",
      img: "https://upload.wikimedia.org/wikipedia/commons/1/15/Chess_qlt45.svg",
      blackImg:
        "https://upload.wikimedia.org/wikipedia/commons/4/47/Chess_qdt45.svg",
    },
    {
      name: "king",
      img: "https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg",
      blackImg:
        "https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg",
    },
  ]);

  const [draggingPiece, setDraggingPiece] = useState(null);
  const [isBlack, setIsBlack] = useState(false);
  const [selectedPiece, setSelectedPiece] = useState(pieces[0]);
  const [dragging, setDragging] = useState(false);

  const handleDragStart = (e, piece) => {
    setDraggingPiece(piece);
    setSelectedPiece(piece);
    setDragging(true);
    e.dataTransfer.setData("text/plain", piece.name);
    e.dataTransfer.setDragImage(e.target, 22, 22);
    e.dataTransfer.dropEffect = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDragEnd = () => {
    setDragging(false);
  };

  const handleDrop = (e, row, col) => {
    e.preventDefault();
    const boardCell = e.target.closest(".board-cell");
    if (!boardCell) return;
    boardCell.innerHTML = `<img src="${
      isBlack ? draggingPiece.blackImg : draggingPiece.img
    }" alt="${draggingPiece.name}" draggable="false" />`;
    setDraggingPiece(null);
  };

  const handlePieceClick = (piece) => {
    setSelectedPiece(piece);
  };

  const handleClick = (e) => {
    const boardCell = e.target.closest(".board-cell");
    if (!boardCell) return;
    boardCell.innerHTML = "";
  };

  const toggleColor = () => {
    setIsBlack(!isBlack);
  };

  return (
    <div className="custom-chessboard">
      <div className="board">
        <div className="board-row labels">
          <div className="empty-label" />
          {[...Array(8)].map((_, col) => (
            <div key={col} className="label-x">
              {String.fromCharCode("a".charCodeAt(0) + col)}
            </div>
          ))}
        </div>
        {[...Array(8)].map((_, row) => (
          <div key={row} className="board-row">
            <div className="label-y">{8 - row}</div>
            {[...Array(8)].map((_, col) => (
              <div
                key={col}
                className={`board-cell ${
                  (row + col) % 2 === 0 ? "white" : "black"
                }`}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, row, col)}
                onClick={handleClick}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="pieces-container">
        <button
          className={`color-toggle m-3 p-4 ${isBlack ? "white" : "black"}`}
          onClick={toggleColor}
        />
        {pieces.map((piece) => (
          <div
            key={piece.name}
            className={`piece-wrapper ${
              piece.name === selectedPiece.name ? "selected" : ""
            }`}
            onClick={() => handlePieceClick(piece)}
          >
            <div
              className={`piece ${piece.name}`}
              draggable
              onDragStart={(e) => handleDragStart(e, piece)}
              onDragEnd={handleDragEnd}
            >
              <img
                src={isBlack ? piece.blackImg : piece.img}
                alt={piece.name}
                draggable="false"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomChessboard;