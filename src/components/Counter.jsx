import { useState, useEffect } from "react"; //Import hooks from react library
// component to perform counter functionality
function Counter() {
  const [count, setCount] = useState(0); // state to track current count
  const [prevValues, setPrevValue] = useState([]); //State to store previous count/counter history
  const [stepValue, setStepValue] = useState(1); //state to track step increment or decrement

  //list of previous counter values
  const history = prevValues.map((prevValue, index) => (
    <li key={index}>{prevValue}</li>
  ));

  //hook to update history whenever the count changes
  useEffect(() => {
    setPrevValue((prev) => [count, ...prev]); //add current value to the history array
  }, [count]);

  // hook to add keydown event listerner on mount
  useEffect(() => {
    console.log("key stroke");

    // handler to perfrom increment/decrement based on Arrowup or Arrow Down
    const handleKeydown = (event) => {
      if (event.key === "ArrowUp") {
        setCount((prev) => prev + stepValue);
      } else if (event.key === "ArrowDown") {
        setCount((prev) => prev - stepValue);
      }
    };
    window.addEventListener("keydown", handleKeydown);

    // cleanup function to remove event listener
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [stepValue]);

  // Increment count by stepValue
  const handleIncrement = () => {
    setCount((prevCount) => prevCount + stepValue);
    localStorage.setItem(count, JSON.stringify(count));
  };

  // Decrement count by stepValue
  const handleDecrement = () => {
    setCount((prevCount) => prevCount - stepValue);
  };

  // Update step value from user input
  const handleStepValue = (event) => {
    const value = Number(event.target.value);
    if (value >= 1) {
      setStepValue(value);
    }
  };

  // Reset count and history
  const handleReset = () => {
    setCount(0);
    setPrevValue([]);
    setStepValue(1);
  };

  return (
    <div className="border rounded p-6 justify-center">
      <h6 className="font-bold">Advanced Counter App </h6>
      <h1 className="text-4xl mt-4">Current Count: {count}</h1>
      <div className="flex justify-center gap-6 mt-6">
        <button onClick={handleIncrement}>Increment</button>
        <button onClick={handleDecrement}>Decrement</button>
        {/* <button onClick={handleStepValue}>Step Value</button> */}
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>

      <div className="mt-5">
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
    </div>
  );
}
export default Counter;
