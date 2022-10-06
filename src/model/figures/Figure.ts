import { Colors } from '../Colors'
import Logo from '../../assets/black-bishop.png'
import { Cell } from './../Cell'

export enum FigureName {
  FIGURE = 'Figure',
  KING = 'King',
  QUEEN = 'Queen',
  KNIGHT = 'Knight',
  ROOK = 'Rook',
  BISHOP = 'Bishop',
  PAWN = 'Pawn',
}

export class Figure {
  color: Colors
  logo: typeof Logo | null
  cell: Cell
  name: FigureName
  id: number
  constructor(color: Colors, cell: Cell) {
    this.color = color
    this.cell = cell
    this.cell.figure = this
    this.logo = null
    this.name = FigureName.FIGURE
    this.id = Math.random()
  }

  
  canMove(target: Cell): boolean {
    if (target.figure?.color === this.color) {
      return false
    }
    if (target.figure?.name === FigureName.KING) {
      return false
    }
    return true
  }
  moveFigure(target: Cell) {}
}
