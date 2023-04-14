import "./App.css";
import Contact from "./Components/Contact";
import NavBar from "./Components/NavBar";
import UpdateContact from "./Components/UpdateContact";
import NewContact from "./Components/NewContact";
import Home from "./Components/Home";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/add" Component={NewContact} />
        <Route path="/about" Component={Contact} />
        <Route path="/update" Component={UpdateContact} />
      </Routes>
    </div>
  );
}

export default App;
