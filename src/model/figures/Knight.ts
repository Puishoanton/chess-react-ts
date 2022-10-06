import { Cell } from '../Cell'
import { Colors } from '../Colors'
import { Figure, FigureName } from './Figure'

import blackLogo from '../../assets/black-knight.png'
import whiteLogo from '../../assets/white-knight.png'

export class Knight extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell)
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo
    this.name = FigureName.KNIGHT
  }
  canMove(target: Cell): boolean {
    if (!super.canMove(target)) {
      return false
    }
    const directionX = Math.abs(this.cell.x - target.x)
    const directionY = Math.abs(this.cell.y - target.y)

    return (directionX === 1 && directionY === 2) || (directionY === 1 && directionX === 2)
  }
}
