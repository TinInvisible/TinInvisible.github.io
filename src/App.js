import logo from './logo.svg';
import './App.css';
import React from 'react';
import Game from './pages/tic-tac-toe';
function App() {
  return (
    <div className="App">
      {/* <header className="App-header"> */}
       <Game/>
      {/* </header> */}
    </div>
  );
}

export default App;
