import React, { FC } from 'react'
import { Figure } from '../../../model/figures/Figure'
import styles from './LostFigures.module.scss'

interface LostFiguresProps {
  title: string
  figures: Figure[]
}

const LostFigures: FC<LostFiguresProps> = ({ title, figures }) => {
  return (
    <div className={styles.lost}>
      <h2>{title}</h2>
      {figures.map(figure => (
        <div key={figure.id}>
          {figure.name}
          {figure.logo && <img width={20} height={20} src={figure.logo} alt='Figure' />}
        </div>
      ))}
    </div>
  )
}

export default LostFigures
