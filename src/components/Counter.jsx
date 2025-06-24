import { useState, useEffect } from "react";//Import hooks from react library

function Counter() {
  const [count, setCount] = useState(0);
  const [prevValues, setPrevValue] = useState([]);
  const [stepValue, setStepValue] = useState(1);

  const history = prevValues.map((prevValue, index) => (
    <li key={index}>{prevValue}</li>
  ));

  useEffect(() => {
    setPrevValue((prev) => [count, ...prev]);
  }, [count]);

  useEffect(() => {
    console.log("key stroke");
    const handleKeydown = (event) => {
      if (event.key === "ArrowUp") {
        setCount((prev) => prev + 1);
      } else if (event.key === "ArrowDown") {
        setCount((prev) => prev - 1);
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  const handleIncrement = () => {
    setCount((prevCount) => prevCount + stepValue);
    localStorage.setItem(count, JSON.stringify(count));
  };
  const handleDecrement = () => {
    setCount((prevCount) => prevCount - stepValue);
  };
  const handleStepValue = (event) => {
    const value = Number(event.target.value);
    if (value >= 1) {
      setStepValue(value);
    }
  };

  const handleReset = () => {
    setCount(0);
    setPrevValue([]);
  };

  return (
    <>
      <p className="font-bold">Advanced Counter App </p>
      <h1>Current Count: {count}</h1>
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleDecrement}>Decrement</button>
      {/* <button onClick={handleStepValue}>Step Value</button> */}
      <button onClick={handleReset}>Reset</button>
      <div>
        <label htmlFor="step-value">Step Value:</label>
        <input
          className="ml-2 w-15 justify-center"
          type="number"
          min={1}
          onChange={handleStepValue}
          value={stepValue}
        />
      </div>
      <br />
      <label htmlFor="history">Count History</label>
      <div className="h-30 overflow-y-scroll">
        <ul>{history}</ul>
      </div>
      <footer>Use Arrow Up to increment and Arrow Down to decrement</footer>
    </>
  );
}
export default Counter;
