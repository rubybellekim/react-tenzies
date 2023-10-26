import { useState } from "react";
import Die from "./Components/Die";
import "./App.css";

function App() {
  const dieMap = [];

  for (let i = 0; i < 10; i++) {
    dieMap.push(<Die value={Math.floor(Math.random() * 6 + 1)} />);
  }

  return (
    <main>
      <container className="die-container">{dieMap}</container>
    </main>
  );
}

export default App;
