import React, { useEffect, useState } from "react";
import api from "./services/api";

import DevForm from "./components/DevForm";
import DevItem from "./components/DevItem";

import "./global.css";
import "./App.css";
import "./Sidebar.css";
import "./Main.css";

function App() {
  const [devs, setDevs] = useState([]);

  async function handleSubmit(data) {
    const response = await api.post("/devs", data);

    setDevs([...devs, response.data]);
  }

  useEffect(() => {
    async function loadDevs() {
      const resp = await api.get("/devs");

      setDevs(resp.data);
    }

    loadDevs();
  }, []);

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleSubmit} />
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
