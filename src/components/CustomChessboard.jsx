import React, { useState, useEffect, useRef } from "react";
import "../assets/css/CustomChessboard.css";
import useSingleAndDoubleTap from "../utils/useSingleAndDoubleTap.jsx";
import { detectDevice } from "../utils/DetectDevice";

const CustomChessboard = () => {
  const [pieces, setPieces] = useState([
    {
      name: "pawn",
      quantity: { white: 8, black: 8 },
      img: "https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg",
      blackImg:
        "https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg",
    },
    {
      name: "knight",
      quantity: { white: 2, black: 2 },
      img: "https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg",
      blackImg:
        "https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg",
    },
    {
      name: "bishop",
      quantity: { white: 2, black: 2 },
      img: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg",
      blackImg:
        "https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg",
    },
    {
      name: "rook",
      quantity: { white: 2, black: 2 },
      img: "https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg",
      blackImg:
        "https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg",
    },
    {
      name: "queen",
      quantity: { white: 1, black: 1 },
      img: "https://upload.wikimedia.org/wikipedia/commons/1/15/Chess_qlt45.svg",
      blackImg:
        "https://upload.wikimedia.org/wikipedia/commons/4/47/Chess_qdt45.svg",
    },
    {
      name: "king",
      quantity: { white: 1, black: 1 },
      img: "https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg",
      blackImg:
        "https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg",
    },
  ]);

  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const [touchStartY, setTouchStartY] = useState(0);
  const [touchEndY, setTouchEndY] = useState(0);
  const [draggingPiece, setDraggingPiece] = useState(null);
  const [isBlack, setIsBlack] = useState(false);
  const [selectedPiece, setSelectedPiece] = useState(pieces[0]);
  const [dragging, setDragging] = useState(false);
  const [cursorImageUrl, setCursorImageUrl] = useState(pieces[0].img);

  useEffect(() => {
    const swipeLeft = () => {
      selectPreviousPiece();
    };

    const swipeRight = () => {
      selectNextPiece();
    };

    const handleTouchStart = (e) => {
      setTouchStartX(e.touches[0].clientX);
      setTouchStartY(e.touches[0].clientY);
    };

    const handleTouchEnd = (e) => {
      setTouchEndX(e.changedTouches[0].clientX);
      setTouchEndY(e.changedTouches[0].clientY);
      const distance = e.changedTouches[0].clientX - touchStartX;
      if (distance > 100) {
        swipeRight();
      } else if (distance < -100) {
        swipeLeft();
      }
    };

    const handleKeyPress = (e) => {
      if (e.key === "s" || e.key === "S") {
        toggleColor();
      } else if (e.key === "a" || e.key === "A") {
        selectPreviousPiece();
      } else if (e.key === "d" || e.key === "D") {
        selectNextPiece();
      }
    };

    const handleTouchMove = (e) => {
      const deltaX = touchStartX - touchEndX;
      const deltaY = touchStartY - touchEndY;
      console.log(deltaX, deltaY);
      if (Math.abs(deltaX) > 30 || Math.abs(deltaY) < 50) {
        e.preventDefault();
      }
    };

    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("keydown", handleKeyPress);
    document.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
      document.removeEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
    };
  }, [
    isBlack,
    selectedPiece,
    cursorImageUrl,
    touchStartX,
    touchEndX,
    touchStartY,
    touchEndY,
  ]);

  const selectPreviousPiece = () => {
    const currentIndex = pieces.findIndex(
      (piece) => piece.name === selectedPiece.name
    );
    const newIndex = currentIndex === 0 ? pieces.length - 1 : currentIndex - 1;
    setSelectedPiece(pieces[newIndex]);
    const piece = pieces[newIndex];
    setCursorImageUrl(isBlack ? piece.blackImg : piece.img);
  };

  const selectNextPiece = () => {
    const currentIndex = pieces.findIndex(
      (piece) => piece.name === selectedPiece.name
    );
    const newIndex = (currentIndex + 1) % pieces.length;
    setSelectedPiece(pieces[newIndex]);
    const piece = pieces[newIndex];
    setCursorImageUrl(isBlack ? piece.blackImg : piece.img);
  };

  const handleDragStart = (e, piece) => {
    setDraggingPiece(piece);
    setSelectedPiece(piece);
    setDragging(true);
    e.dataTransfer.setData("text/plain", piece.name);
    const img = new Image();
    img.src = isBlack ? piece.blackImg : piece.img;
    e.dataTransfer.setDragImage(img, 22, 22);
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
    setCursorImageUrl(isBlack ? piece.blackImg : piece.img);
  };

  const updateQuantity = (pieceName, color, increase) => {
    setPieces((prevPieces) => {
      return prevPieces.map((piece) => {
        if (piece.name === pieceName) {
          const newQuantity = {
            ...piece.quantity,
            [color]: increase
              ? piece.quantity[color] + 1
              : piece.quantity[color] - 1,
          };
          if (piece.name === selectedPiece.name) {
            setSelectedPiece({ ...piece, quantity: newQuantity });
          }
          return { ...piece, quantity: newQuantity };
        }
        return piece;
      });
    });
  };

  const handleSingleTap = (e) => {
    // console.log("Single tap");
    const boardCell = e.target.closest(".board-cell");
    if (!boardCell) return;
    const currentPieceImg = `<img src="${
      isBlack ? selectedPiece.blackImg : selectedPiece.img
    }" alt="${selectedPiece.name}" draggable="false">`;

    const currentColor = isBlack ? "black" : "white";
    const selectedPieceQuantity = selectedPiece.quantity[currentColor];

    if (boardCell.innerHTML === currentPieceImg) {
      boardCell.innerHTML = "";
      updateQuantity(selectedPiece.name, currentColor, true);
    } else if (selectedPieceQuantity > 0) {
      // Helper function to find the existing piece in the cell
      const findExistingPiece = (color) => {
        return pieces.find((piece) => {
          const pieceImg = color === "black" ? piece.blackImg : piece.img;
          const pieceHtml = `<img src="${pieceImg}" alt="${piece.name}" draggable="false">`;
          return boardCell.innerHTML === pieceHtml;
        });
      };

      const existingBlackPiece = findExistingPiece("black");
      const existingWhitePiece = findExistingPiece("white");

      // If there's an existingBlackPiece, update its quantity
      if (existingBlackPiece) {
        updateQuantity(existingBlackPiece.name, "black", true);
      }

      // If there's an existingWhitePiece, update its quantity
      if (existingWhitePiece) {
        updateQuantity(existingWhitePiece.name, "white", true);
      }

      boardCell.innerHTML = currentPieceImg;
      updateQuantity(selectedPiece.name, currentColor, false);
    }
  };

  const handleDoubleTap = (e) => {
    console.log("Double tap");
    toggleColor();
  };

  const handleClick = detectDevice()
    ? useSingleAndDoubleTap(handleSingleTap, handleDoubleTap)
    : handleSingleTap;

  const toggleColor = () => {
    const newIsBlack = !isBlack;
    setIsBlack(newIsBlack);
    setCursorImageUrl(newIsBlack ? selectedPiece.blackImg : selectedPiece.img);
  };

  return (
    <div className="custom-chessboard">
      <div
        className="board ml-auto mr-auto"
        style={{
          cursor: `url(${cursorImageUrl}) 15 15, default`,
        }}
      >
        <div className="board-row labels mr-10">
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
      <div className="bg-stone-400 rounded-lg ml-4 mr-4 p-0 lg:p-4 shadow-lg mt-4">
        <div className="pieces-container">
          <button
            className={`color-toggle m-3 p-4 ${isBlack ? "white" : "black"}`}
            onClick={toggleColor}
          />
          {pieces.map((piece) => {
            const currentColor = isBlack ? "black" : "white";
            const quantity = piece.quantity[currentColor];
            const isZero = quantity === 0;
            return (
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
                <div
                  className="quantity-text text-center"
                  style={{ color: isZero ? "red" : "inherit" }}
                >
                  {quantity}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CustomChessboard;
