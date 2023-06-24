import { useState } from 'react';
import './index.scss';

export const App = () => {
  const [count, setCount] = useState<number>(0);

  const increment = () => {
    setCount(count + 1);
  };

  const dicrement = () => {
    setCount(count - 1);
  };

  return (
    <div className='App'>
      <div>
        <h2>Счетчик:</h2>
        <h1>{count}</h1>
        <button onClick={dicrement} className='minus'>
          - Минус
        </button>
        <button onClick={increment} className='plus'>
          Плюс +
        </button>
      </div>
    </div>
  );
};
