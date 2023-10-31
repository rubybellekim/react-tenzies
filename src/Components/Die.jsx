import "../App.css";

function Die(props) {
  //direct styling way when isHeld is true ->
  //   const styles = {
  //     backgroundColor: props.isHeld ? "#59E391" : "white"
  // }
  return (
    <div
      className={props.isHeld ? "die-held" : "die-items"}
      onClick={props.holdDice}
    >
      {/* <div 
      className="die-items" 
      style={styles}
    > */}

      <h2 className="die-num">{props.value}</h2>
    </div>
  );
}

export default Die;
