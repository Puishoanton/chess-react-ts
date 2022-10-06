import { Board } from './Board'
import { Colors } from './Colors'
import { Figure } from './figures/Figure'

export class Cell {
  readonly x: number
  readonly y: number
  readonly color: Colors
  figure: Figure | null
  board: Board
  availible: boolean // Can move on current cell
  id: number // for react keys
  constructor(board: Board, x: number, y: number, color: Colors, figure: Figure | null) {
    this.x = x
    this.y = y
    this.board = board
    this.color = color
    this.figure = figure
    this.availible = false
    this.id = Math.random()
  }

  setFigure(figure: Figure) {
    this.figure = figure
    this.figure.cell = this
  }

  isEmpty(): boolean {
    return this.figure === null
  }
  isEmeny(target: Cell): boolean {
    if (target.figure) {
      return this.figure?.color !== target.figure.color
    }
    return false
  }
  isEmptyVertical(target: Cell): boolean {
    if (this.x !== target.x) {
      return false
    }

    const min = Math.min(this.y, target.y)
    const max = Math.max(this.y, target.y)

    for (let y = min + 1; y < max; y++) {
      if (!this.board.getCell(y, this.x).isEmpty()) {
        return false
      }
    }

    return true
  }
  isEmptyHorisontal(target: Cell): boolean {
    if (this.y !== target.y) {
      return false
    }

    const min = Math.min(this.x, target.x)
    const max = Math.max(this.x, target.x)

    for (let x = min + 1; x < max; x++) {
      if (!this.board.getCell(this.y, x).isEmpty()) {
        return false
      }
    }

    return true
  }
  isEmptyDiagonal(target: Cell): boolean {
    const absX = Math.abs(target.x - this.x) // abs - module
    const absY = Math.abs(target.y - this.y)

    if (absX !== absY) return false

    const directionX = this.x < target.x ? 1 : -1
    const directionY = this.y < target.y ? 1 : -1

    for (let i = 1; i < absY; i++) {
      if (!this.board.getCell(this.y + directionY * i, this.x + directionX * i).isEmpty()) {
        return false
      }
    }

    return true
  }
  addLostFigure(figure: Figure) {
    figure.color === Colors.BLACK
      ? this.board.lostBlackFigures.push(figure)
      : this.board.lostWhiteFigures.push(figure)
  }

  moveFigure(target: Cell) {
    if (this.figure && this.figure?.canMove(target)) {
      this.figure.moveFigure(target)
      if (target.figure) {
        this.addLostFigure(target.figure)
      }
      target.setFigure(this.figure)
      this.figure = null
    }
  }
}
