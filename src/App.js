import logo from './logo.svg';
import './App.css';

function App({first, last}) {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Logged in as {first} {last}
        </p>
        
      </header>
    </div>
  );
}

export default App;
