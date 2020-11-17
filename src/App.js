import { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [seconds, setSeconds] = useState(15 * 60);
  const [play, setPlay] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    let interval = null;
    if (play) {
      interval = setTimeout(() => {
        if (seconds) setSeconds((s) => s - 1);
      }, 1000);
    } else {
      clearTimeout(interval);
    }
    return () => clearTimeout(interval);
  });

  const handleClick = () => {
    if (inputRef.current.value) {
      setSeconds(
        inputRef.current.value
          .split(':')
          .map((el) => parseInt(el))
          .reduce((acc, cur) => acc * 60 + cur)
      );
    }
    setPlay(!play);
  };

  return (
    <div className='App'>
      <div className='Time'>
        {seconds === 0
          ? 'STOP'
          : `0${Math.floor(seconds / 60)}`.substr(-2) +
            ':' +
            `0${seconds % 60}`.substr(-2)}
        {/* {`0${Math.floor(seconds / 60)}`.substr(-2)}:
        {`0${seconds % 60}`.substr(-2)} */}
      </div>
      <div className='Controls'>
        <input type='time' defaultValue='15:00' ref={inputRef} />
        <button onClick={handleClick}>{!play ? 'Start' : 'Pause'}</button>
      </div>
    </div>
  );
}

export default App;
