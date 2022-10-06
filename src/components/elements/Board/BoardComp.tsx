import React, { FC, useState, useEffect } from 'react'
import styles from './BoardComp.module.scss'
import { Board } from './../../../model/Board'
import CellComp from '../Cell/CellComp'
import { Cell } from '../../../model/Cell'
import { Player } from './../../../model/Player'

interface BoardProps {
  board: Board
  setBoard: (board: Board) => void
  changePlayer: () => void
  currentPlayer: Player | null
}

const BoardComp: FC<BoardProps> = ({ board, setBoard, changePlayer, currentPlayer }) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null)

  useEffect(() => {
    highlightCell()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCell])
  function clickToSelectCell(cell: Cell) {
    const cellIsNotSelectedCell = selectedCell && selectedCell !== cell
    const hasFigureAndCanMove = selectedCell?.figure?.canMove(cell)
    if (cellIsNotSelectedCell && hasFigureAndCanMove) {
      selectedCell.moveFigure(cell)
      changePlayer()
      setSelectedCell(null)
    } else if (cell.figure) {
      if (cell.figure?.color === currentPlayer?.color) {
        setSelectedCell(cell)
      }
    }
  }
  function highlightCell() {
    board.highlightCell(selectedCell)
    updateBoard()
  }
  function updateBoard() {
    const newBoard = board.getCopyBoard()
    setBoard(newBoard)
  }
  return (
    <div>
      <h2 className={styles.move}>The {currentPlayer?.color} player's move</h2>
      <div className={styles.board}>
        {board.cells.map((row, index) => (
          <React.Fragment key={index}>
            {row.map(cell => (
              <CellComp
                clickToSelectCell={clickToSelectCell}
                key={cell.id}
                cell={cell}
                selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
              />
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default BoardComp
