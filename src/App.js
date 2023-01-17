import logo from "./logo.svg";
import "./App.css";

function App({ first, last, logout }) {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Logged in as {first} {last}
        </p>
        <button onClick={logout} style={{ fontSize: "20px" }}>
          Logout
        </button>
      </header>
    </div>
  );
}

export default App;
