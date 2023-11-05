import { React, useState, useEffect } from "react";
import Die from "./Components/Die";
import "./App.css";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  //state properties
  const [tenzies, setTenzies] = useState(false);
  const [dice, setDice] = useState(allNewDice());
  const [counter, setCounter] = useState(0);

  //local storage properties
  const prevRecord = localStorage.getItem("prevRecord");
  const prevRecordInt = parseInt(prevRecord);

  const bestRecord = localStorage.getItem("bestRecord");
  const bestRecordInt = parseInt(bestRecord);

  useEffect(() => {
    //check winning conditions
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSame = dice.every((die) => die.value === firstValue);

    if (allHeld && allSame) {
      setTenzies(true);
      recordTrack();
    }
  }, [dice]);

  //new game
  function allNewDice() {
    const newDice = [];

    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  //setting best record from local storage
  function recordTrack() {
    //if first game without any record, save it both in prevRecord and bestRecord.
    if (prevRecord === null && bestRecord === null) {
      localStorage.setItem("prevRecord", counter);
      localStorage.setItem("bestRecord", counter);
      //if better record than first game or bestRecord
    } else if (prevRecordInt > counter || bestRecordInt > counter) {
      localStorage.setItem("bestRecord", counter);
    }
  }

  function rollDice() {
    setCounter(counter + 1);
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.isHeld ? die : generateNewDie();
      })
    );

    //when pressed 'new game' only after tenzies
    if (tenzies) {
      setTenzies(false);
      setDice(allNewDice());
      setCounter(0);
    }
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  const diceElement = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  const confetti = tenzies && <Confetti />;

  return (
    <main>
      {confetti}
      <h1 className="title">Tenzies</h1>
      <p className="instruction">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <p className="counter">{counter}</p>
      <p className="bestRecord">
        Best Record: {bestRecord === null ? prevRecord : bestRecord}
      </p>
      <div className="die-container">{diceElement}</div>
      <button className="roll-btn" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;
