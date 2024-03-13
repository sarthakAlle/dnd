// App.js
import React, { useState } from 'react';
import Dropzone from './Dropzone';

const App = () => {
  const [items1, setItems1] = useState(['Item 1', 'Item 2', 'Item 3']);
  const [items2, setItems2] = useState([]);

  const handleDrop1 = (item) => {
    setItems1((prevItems) => prevItems.filter((i) => i !== item));
    setItems2((prevItems) => [...prevItems, item]);
  };

  const handleDrop2 = (item) => {
    setItems2((prevItems) => prevItems.filter((i) => i !== item));
    setItems1((prevItems) => [...prevItems, item]);
  };

  return (
    <div>
      <Dropzone items={items1} onDrop={handleDrop1} />
      <Dropzone items={items2} onDrop={handleDrop2} />
    </div>
  );
};

export default App;
