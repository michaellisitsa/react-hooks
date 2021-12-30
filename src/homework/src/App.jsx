import logo from './logo.svg'
import './App.css'
import {useRef, useEffect} from 'react'
import VanillaTilt from 'vanilla-tilt'
import PokemonContainer from './PokemonContainer'
import TicTacToe from './TicTacToe'
import MyTicTacToe from './MyTicTacToe'

function App() {
  const tiltBox = useRef(null)
  console.log(tiltBox.current)

  useEffect(() => {
    VanillaTilt.init(tiltBox.current, {
      reverse: true,
      glare: true,
      'full-page-listening': false,
      easing: 'cubic-bezier(.03,.98,.52,.99)',
      scale: '1.1',
      speed: 200,
      perspective: 100,
    })
    tiltBox.current.addEventListener('tiltChange', () => {
      console.log('tilt changed')
    })
    return () => {
      tiltBox.current.VanillaTilt.destroy()
    }
  }, [tiltBox])

  return (
    <div className="App">
      <div className="red-box" ref={tiltBox}></div>
      <PokemonContainer />
      <TicTacToe />
      <MyTicTacToe />
    </div>
  )
}

export default App
