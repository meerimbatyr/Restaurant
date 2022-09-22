import "./App.css";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import bg from "./images/full-bg.png";
import Home from "./pages/Home";

function App() {
  return (
    <div style={{ background: `${bg}` }}>
      <Navbar />
      <Home />
      <Menu />
    </div>
  );
}

export default App;
