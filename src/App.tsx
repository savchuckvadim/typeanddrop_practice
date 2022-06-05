import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const order = [3, 1, 2, 4]
  const initialCardList = order.map((order, index) => (
    { id: index, order: order, text: `Карточка ${order}` }
  ))


  const [cardList, setCardList] = useState(initialCardList)
  const dragStartHandler = (e: React.SyntheticEvent<EventTarget>, card: object) => {
    console.log(card) //что схватили
  }
  const dragLeaveHandler = (e: React.SyntheticEvent<EventTarget>) => {

  }
  const dragEndHandler = (e: React.SyntheticEvent<EventTarget>) => {

  }
  const dragOverHandler = (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault()
  }
  const dropHandler = (e: React.SyntheticEvent<EventTarget>, card: object) => {
    e.preventDefault()
    console.log(card) //куда бросили
  }
  return (
    <div className="App">
      <div className='container'>
        {cardList.map(card =>
          <div className='card'
            draggable={true}
            onDragStart={(e) => { dragStartHandler(e, card) }} //в тот момент когда мы взяли карточку
            onDragLeave={(e) => { dragLeaveHandler(e) }} //если вышли за пределы другой карточки
            onDragEnd={(e) => { dragEndHandler(e) }} //если мы отпустили перемещение
            onDragOver={(e) => { dragOverHandler(e) }} //если мы находимся над каким-то другим объектом
            onDrop={(e) => { dropHandler(e, card) }} //если мы отпустили карточку и расчитываем, что после этого должно произойти какое-то действие
          >
            {card.text}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
