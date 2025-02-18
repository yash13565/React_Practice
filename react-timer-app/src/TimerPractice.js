import Button from "./components/Button";
import "./App.css";

function TimerPractice() {
  return (
    <div className="timerContainer">
      <h2 style={{ color: "lightsalmon" }}>React Timer App</h2>
      <section className="timeFormatContainer">
        <span className="timer"></span>
      </section>
      <div className="buttonContainer">
        <Button text={"Start"} />
        <Button text={"Pause"} />
        <Button text={"Reset"} />
      </div>
    </div>
  );
}

export default TimerPractice;
