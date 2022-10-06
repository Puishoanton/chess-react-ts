import { Cell } from '../Cell'
import { Colors } from '../Colors'
import { Figure, FigureName } from './Figure'

import blackLogo from '../../assets/black-pawn.png'
import whiteLogo from '../../assets/white-pawn.png'

export class Pawn extends Figure {
  isFirstStep: boolean = true

  constructor(color: Colors, cell: Cell) {
    super(color, cell)
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo
    this.name = FigureName.PAWN
  }
  canMove(target: Cell): boolean {
    if (!super.canMove(target)) {
      return false
    }
    const direction = this.cell.figure?.color === Colors.BLACK ? 1 : -1
    const firstStepDirection = this.cell.figure?.color === Colors.BLACK ? 2 : -2

    const isXNotChanged = target.x === this.cell.x
    const step = target.y === this.cell.y + direction
    const firstStep = this.isFirstStep && target.y === this.cell.y + firstStepDirection
    const makeStepOnEmptyCell = this.cell.board.getCell(target.y, target.x).isEmpty()
    const leftAttack = target.x === this.cell.x + 1
    const rightAttack = target.x === this.cell.x - 1
    const hasEnemy = this.cell.isEmeny(target)

    if ((step || firstStep) && isXNotChanged && makeStepOnEmptyCell) {
      return true
    }
    if (step && (leftAttack || rightAttack) && hasEnemy) {
      return true
    }
    return false
  }
  moveFigure(target: Cell) {
    super.moveFigure(target)
    this.isFirstStep = false
  }
}
