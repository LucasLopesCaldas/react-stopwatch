import './App.css';
import Stopwatch from './components/Stopwatch';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <br />
        <h1>Trybe Stopwatch</h1>
      </header>
      <Stopwatch />
      <br />
      <a href='https://github.com/LucasLopesCaldas' rel='noreferrer' target={'_blank'}>@LucasLopes</a>
    </div>
  );
}

export default App;
