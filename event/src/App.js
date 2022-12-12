import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EventListing from "./EventListing";
import EventCreate from "./EventCreate";
import EventEdit from "./EventEdit";

/* Iniciar json server: 
                      json-server --watch db.json --port 8000 
*/

function App() {
  return (
    <div className="background">
      <div className="App">
        <h1>Controle de eventos</h1>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<EventListing />}></Route>
            <Route path="/event/create" element={<EventCreate />}></Route>
            <Route path="/event/edit/:eventid" element={<EventEdit />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
