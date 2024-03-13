import React, { useState, useRef } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const type = 'ITEM'; // Define a type for draggable items

function Item({ id, text, canMove, onMove }) {
  const [{ isDragging }, ref] = useDrag(() => ({
    type,
    item: { id, text },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const opacity = isDragging ? 0.5 : 1;

  const handleClick = () => {
    if (canMove) {
      onMove(id); // Handle item removal from the source list
    }
  };

  return (
    <div ref={ref} style={{ opacity, cursor: canMove ? 'grab' : 'default' }}>
      {text}
    </div>
  );
}

function Droppable({ items, onDrop }) {
  const [{ isHovering }, ref] = useDrop(() => ({
    accept: type,
    drop: (item, monitor) => onDrop(item.id), // Handle item addition to the target list
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const style = {
    background: isHovering ? 'lightblue' : 'white',
    padding: '20px',
    border: '1px dashed gray',
  };

  return (
    <div ref={ref} style={style}>
      {items.map((item) => (
        <Item key={item.id} {...item} onMove={() => onDrop(item.id)} /> // Pass onDrop as onMove for removal from source list
      ))}
    </div>
  );
}

function App() {
  const [sourceItems, setSourceItems] = useState([
    { id: 1, text: 'Item 1', canMove: true },
    { id: 2, text: 'Item 2', canMove: true },
    { id: 3, text: 'Item 3', canMove: true },
  ]);
  const [targetItems, setTargetItems] = useState([]);
/*
  const handleSourceDrop = (id) => {
    const updatedSourceItems = sourceItems.filter((item) => item.id !== id);
    setSourceItems(updatedSourceItems);
  };

  const handleTargetDrop = (id) => {
    const itemIndex = sourceItems.findIndex((item) => item.id === id);
    const item = sourceItems[itemIndex];
    setTargetItems([...targetItems, item]); // Add item to target list
  };
*/
const handleSourceDrop = (id) => {
    const updatedSourceItems = sourceItems.filter((item) => item.id !== id);
    setSourceItems(updatedSourceItems);
  };
  
  const handleTargetDrop = (id) => {
    const itemIndex = sourceItems.findIndex((item) => item.id === id);
    const item = sourceItems[itemIndex];
  
    // Update source array by removing the item
    const updatedSourceItems = sourceItems.filter((item) => item.id !== id);
    setSourceItems(updatedSourceItems);
  
    // Add item to target list
    setTargetItems([...targetItems, item]);
  };
  
  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <Droppable items={sourceItems} onDrop={handleSourceDrop} />
        <Droppable items={targetItems} onDrop={handleTargetDrop} />
      </div>
    </DndProvider>
  );
}

export default App;
