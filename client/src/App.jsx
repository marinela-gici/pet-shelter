import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import PetForm from "./components/PetForm";
import PetList from "./components/PetList";
import "./App.css";
import EditPet from "./components/EditPet";
import PetDetails from "./components/PetDetails";
import io from 'socket.io-client';
import { useState } from "react";

function App() {
  const socket = io('http://127.0.0.1:8000',{ transports: ['websocket', 'polling', 'flashsocket'] });
  const [updated, setUpdated] = useState(false);
  const [likes, setLikes] = useState([]);

  return (
    <BrowserRouter>
      <>
        <Routes>
          <Route exact path="/" element={<PetList socket={socket} updated={updated} setUpdated={setUpdated} />}></Route>
          <Route exact path="/pets/new" element={<PetForm socket={socket} />}></Route>
          <Route exact path="/pets/:id" element={<PetDetails likes={likes} setLikes={setLikes} socket={socket} updated={updated} setUpdated={setUpdated} />}></Route>
          <Route
            exact
            path="/pets/:id/edit"
            element={<EditPet socket={socket} />}
          ></Route>
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
