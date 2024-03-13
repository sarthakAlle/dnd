import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { DragDropContext,Draggable,Droppable } from 'react-beautiful-dnd';

const DATA = [
  {
    id: "0e2f0db1-5457-46b0-949e-8032d2f9997a",
    name: "Walmart",
    items: [
      { id: "26fd50b3-3841-496e-8b32-73636f6f4197", name: "3% Milk" },
      { id: "b0ee9d50-d0a6-46f8-96e3-7f3f0f9a2525", name: "Butter" },
    ],
    tint: 1,
  },
  {
    id: "487f68b4-1746-438c-920e-d67b7df46247",
    name: "Indigo",
    items: [
      {
        id: "95ee6a5d-f927-4579-8c15-2b4eb86210ae",
        name: "Designing Data Intensive Applications",
      },
      { id: "5bee94eb-6bde-4411-b438-1c37fa6af364", name: "Atomic Habits" },
    ],
    tint: 2,
  },
  {
    id: "25daffdc-aae0-4d73-bd31-43f73101e7c0",
    name: "Lowes",
    items: [
      { id: "960cbbcf-89a0-4d79-aa8e-56abbc15eacc", name: "Workbench" },
      { id: "d3edf796-6449-4931-a777-ff66965a025b", name: "Hammer" },
    ],
    tint: 3,
  },
];
function StoreList({name,items,id}){
  return (
    <div>
      <h3>{name}</h3>
    </div>
  );
  }
function App() {
  const [stores,setStores]= useState(DATA);
  const handleDragDrops=(results)=>{
    const {destination,source,type}=results;
    if(!destination)return ;
    if(type==='group'){
      if(source.droppableId===destination.droppableId&&source.index===destination.index)return ;
      const sourceIndex=source.index;
      const reorderedStores=[...stores];
      const destinationIndex=destination.index;
      const [removedStore]=reorderedStores.splice(sourceIndex,1);
      reorderedStores.splice(destinationIndex,0,removedStore);
      return setStores(reorderedStores);
    }

  }

  return (
    <>
<div className='layout__wrapper'>
<div className='card'>
  <DragDropContext onDragEnd={handleDragDrops}>
  <div className='header'>
    <h1>Shopping list</h1>
  </div>

  <Droppable droppableId='ROOT' type='group'>
  {(provided) => (
    <div {...provided.droppableProps} ref={provided.innerRef}>
        {provided.placeholder}
      {stores.map((store, index) => (
        <Draggable draggableId={store.id} key={store.id} index={index} >
          {(provided) => (
            <div
              className='store-container'
              {...provided.dragHandleProps}
              {...provided.draggableProps}
              ref={provided.innerRef}
            >
         <StoreList {...store}/>
             
           
            </div>
          )}
        </Draggable>
      ))}
    </div>
  )}
</Droppable>
  </DragDropContext>
</div>

</div>

<div className='layout__wrapper'>
<div className='card'>
  <DragDropContext onDragEnd={handleDragDrops}>
  <div className='header'>
    <h1>Shopping list</h1>
  </div>

  <Droppable droppableId='ROOT' type='group'>
  {(provided) => (
    <div {...provided.droppableProps} ref={provided.innerRef}>
        {provided.placeholder}
      {stores.map((store, index) => (
        <Draggable draggableId={store.id} key={store.id} index={index} >
          {(provided) => (
            <div
              className='store-container'
              {...provided.dragHandleProps}
              {...provided.draggableProps}
              ref={provided.innerRef}
            >
         <StoreList {...store}/>
             
           
            </div>
          )}
        </Draggable>
      ))}
    </div>
  )}
</Droppable>
  </DragDropContext>
</div>

</div>
</>
  );
}


export default App;
