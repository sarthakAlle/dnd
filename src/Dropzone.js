// Dropzone.js
import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import DraggableItem from './DraggableItem';

const Dropzone = ({ items, onDrop }) => {
  const [, drop] = useDrop({
    accept: 'ITEM',
    drop: (item) => onDrop(item.content),
  });

  return (
    <div
      ref={drop}
      style={{
        border: '1px solid #ccc',
        padding: '10px',
        margin: '10px',
        width: '200px',
        minHeight: '100px',
      }}
    >
      {items.map((item, index) => (
        <DraggableItem key={index} item={item} />
      ))}
    </div>
  );
};

export default Dropzone;
