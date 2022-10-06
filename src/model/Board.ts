import { Cell } from './Cell'
import { Colors } from './Colors'
import { Bishop } from './figures/Bishop'
import { Queen } from './figures/Queen'
import { Pawn } from './figures/Pawn'
import { King } from './figures/King'
import { Knight } from './figures/Knight'
import { Rook } from './figures/Rook'
import { Figure } from './figures/Figure'

export class Board {
  cells: Cell[][] = []
  lostBlackFigures: Figure[] = []
  lostWhiteFigures: Figure[] = []
  public highlightCell(selectedCell: Cell | null) {
    for (let i = 0; i < this.cells.length; i++) {
      const row = this.cells[i]
      for (let j = 0; j < row.length; j++) {
        const target = row[j]
        target.availible = !!selectedCell?.figure?.canMove(target) // !! -  convert to boolean type
      }
    }
  }
  public getCopyBoard(): Board {
    const newBoard = new Board()
    newBoard.cells = this.cells
    newBoard.lostBlackFigures = this.lostBlackFigures
    newBoard.lostWhiteFigures = this.lostWhiteFigures
    return newBoard
  }
  public initCells() {
    for (let i = 0; i < 8; i++) {
      const row: Cell[] = []
      for (let j = 0; j < 8; j++) {
        if ((i + j) % 2 !== 0) {
          row.push(new Cell(this, j, i, Colors.BLACK, null)) // Black cell
        } else {
          row.push(new Cell(this, j, i, Colors.WHITE, null)) // White cell
        }
      }
      this.cells.push(row)
    }
  }
  public getCell(y: number, x: number) {
    return this.cells[y][x]
  }
  private addPawn() {
    for (let i = 0; i < 8; i++) {
      new Pawn(Colors.BLACK, this.getCell(1, i))
      new Pawn(Colors.WHITE, this.getCell(6, i))
    }
  }
  private addKing() {
    new King(Colors.BLACK, this.getCell(0, 4))
    new King(Colors.WHITE, this.getCell(7, 4))
  }
  private addQueen() {
    new Queen(Colors.BLACK, this.getCell(0, 3))
    new Queen(Colors.WHITE, this.getCell(7, 3))
  }
  private addKnight() {
    new Knight(Colors.BLACK, this.getCell(0, 1))
    new Knight(Colors.WHITE, this.getCell(7, 1))
    new Knight(Colors.BLACK, this.getCell(0, 6))
    new Knight(Colors.WHITE, this.getCell(7, 6))
  }
  private addRook() {
    new Rook(Colors.BLACK, this.getCell(0, 0))
    new Rook(Colors.WHITE, this.getCell(7, 0))
    new Rook(Colors.BLACK, this.getCell(0, 7))
    new Rook(Colors.WHITE, this.getCell(7, 7))
  }
  private addBishop() {
    new Bishop(Colors.BLACK, this.getCell(0, 5))
    new Bishop(Colors.WHITE, this.getCell(7, 2))
    new Bishop(Colors.BLACK, this.getCell(0, 2))
    new Bishop(Colors.WHITE, this.getCell(7, 5))
  }
  public addFigure() {
    this.addBishop()
    this.addKing()
    this.addKnight()
    this.addPawn()
    this.addQueen()
    this.addRook()
  }
}
