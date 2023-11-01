import { React, useState, useEffect } from "react";
import Die from "./Components/Die";
import "./App.css";
import { nanoid } from "nanoid";

function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    winTenzies();
  }, [dice]);

  function winTenzies() {
    let arr = [];

    dice.map((die) => {
      if (die.isHeld === true) {
        arr.push(die.value);
        console.log(arr);
      }
    });

    if (arr.length == 10) {
      for (let i = 0; i < arr.length; i++) {
        for (let x = i + 1; x < arr.length; x++) {
          if (arr.indexOf(i) === arr.indexOf(x)) {
            break;
          } else {
            continue;
          }
        }
      }

      setTenzies((oldTenzies) => !oldTenzies);

      if (tenzies == true) {
        console.log("you win tenzies!");
      }
    }
  }

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

  function rollDice() {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.isHeld ? die : generateNewDie();
      })
    );
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

  return (
    <main>
      <h1 className="title">Tenzies</h1>
      <p className="instruction">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="die-container">{diceElement}</div>
      <button className="roll-btn" onClick={rollDice}>
        Roll
      </button>
    </main>
  );
}

export default App;
