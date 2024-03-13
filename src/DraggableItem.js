// DraggableItem.js
import React from 'react';
import { useDrag } from 'react-dnd';

const DraggableItem = ({ item }) => {
  const [, drag] = useDrag({
    type: 'ITEM', // Explicitly defining the type property
    item: { content: item },
  });

  return (
    <div
      ref={drag}
      style={{
        padding: '5px',
        margin: '5px',
        border: '1px solid #ddd',
        backgroundColor: '#f0f0f0',
        cursor: 'move',
      }}
    >
      {item}
    </div>
  );
};

export default DraggableItem;
