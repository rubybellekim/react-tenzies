import "../App.css";

function Die(props) {
  return (
    <div className={props.isHeld == true ? "die-held" : "die-items"}>
      <h2 className="die-num">{props.value}</h2>
    </div>
  );
}

export default Die;
