import { FC } from 'react'
import { Cell } from './../../../model/Cell'
import styles from './CellComp.module.scss'

interface CellProps {
  cell: Cell
  selected: boolean
  clickToSelectCell: (cell: Cell) => void
}

const CellComp: FC<CellProps> = ({ cell, selected, clickToSelectCell }) => {
  const rootClass = [styles.cell, styles[cell.color]]
  if (selected) {
    rootClass.push(styles.selected)
  }
  if (cell.availible && cell.figure) {
    rootClass.push(styles.attack)
  }
  return (
    <div onClick={() => clickToSelectCell(cell)} className={rootClass.join(' ')}>
      {cell.availible && !cell.figure && <div className={styles.available}></div>}
      {cell.figure?.logo && <img src={cell.figure.logo} alt='asd' />}
    </div>
  )
}

export default CellComp
