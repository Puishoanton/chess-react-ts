import { FC, useEffect, useState } from 'react'
import BoardComp from './components/elements/Board/BoardComp'
import { Board } from './model/Board'
import './styles/styles.scss'
import { Player } from './model/Player'
import { Colors } from './model/Colors'
import LostFigures from './components/elements/LostFigures/LostFigures'

const App: FC = () => {
  const [board, setBoard] = useState(new Board())
  const [whitePlayer] = useState<Player>(new Player(Colors.WHITE))
  const [blackPlayer] = useState<Player>(new Player(Colors.BLACK))
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null)
  useEffect(() => {
    restart()
    setCurrentPlayer(whitePlayer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function restart() {
    const newBoard = new Board()
    newBoard.initCells()
    newBoard.addFigure()
    setBoard(newBoard)
    setCurrentPlayer(whitePlayer)
  }

  function changePlayer() {
    setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer)
  }

  return (
    <div className='app'>
      <button className='btn' onClick={() => restart()}>Restart game</button>
      <BoardComp
        board={board}
        setBoard={setBoard}
        currentPlayer={currentPlayer}
        changePlayer={changePlayer}
      />
      <div>
        <LostFigures title='Lost Black Figures' figures={board.lostBlackFigures} />
        <LostFigures title='Lost White Figures' figures={board.lostWhiteFigures} />
      </div>
    </div>
  )
}

export default App
