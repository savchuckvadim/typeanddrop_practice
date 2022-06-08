import React, { useState } from 'react';
import './App.css';
import Boards from './components/Boards/Boards';
import Header from './components/Header/Header';



function App() {
  const [editMode, setEditMode] = useState(false)
  return (
    <div className="App">
      <Header editMode={editMode} setEditMode={setEditMode} />
      <Boards editMode={editMode} setEditMode={setEditMode}/>
    </div>
  );
}











export default App;
