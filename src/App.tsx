import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const order = [3, 1, 2, 4]
  const initialCardList = order.map((order, index) => (
    { id: index, order: order, text: `Карточка ${order}` }
  ))


  interface Card {
    id: number;
    order: number;
    text: string;
  }
  const [cardList, setCardList] = useState(initialCardList)
  const [currentCard, setCurrentCard] = useState({ id: 0, order: 0, text: '' })

  const dragStartHandler = (e: React.SyntheticEvent<EventTarget>, card: Card) => {
    console.log('drag ' + card.text) //что схватили
    setCurrentCard(card)
  }
  const dragLeaveHandler = (e: any) => {
    e.target.style.backgroundColor = 'rgb(251, 255, 240)'
  }
  const dragEndHandler = (e: any) => {
    e.target.style.backgroundColor = 'rgb(251, 255, 240)'
  }
  const dragOverHandler = (e: any) => {
    e.preventDefault()
    e.target.style.backgroundColor = 'rgb(102, 94, 79, 0.5)'
    console.log(e.target)
  }
  const dropHandler = (e: any, card: Card) => {
    e.preventDefault()
    e.target.style.backgroundColor = 'rgb(251, 255, 240)'
    setCardList(cardList.map(c => {
      if (c.id === card.id) {
        return { ...c, order: currentCard.order }
      }
      if (c.id === currentCard.id) {
        return { ...c, order: card.order }
      }
      return c
    }))
    console.log('drop ' + card.text) //куда бросили
  }

  const sortCard = (a: Card, b: Card) => {
    if (a.order > b.order) {
      return 1
    } else {
      return -1

    }
  }

  return (
    <div className="App">
      <div className='container'>
        {cardList.sort(sortCard).map(card =>
          <div className='card'

            draggable={true}
            onDragStart={(e) => { dragStartHandler(e, card) }} //в тот момент когда мы взяли карточку
            onDragLeave={(e) => { dragLeaveHandler(e) }} //если вышли за пределы другой карточки
            onDragEnd={(e) => { dragEndHandler(e) }} //если мы отпустили перемещение
            onDragOver={(e) => { dragOverHandler(e) }} //если мы находимся над каким-то другим объектом
            onDrop={(e) => { dropHandler(e, card) }} //если мы отпустили карточку и расчитываем, что после этого должно произойти какое-то действие
            key={card.order}
          >
            {card.text}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
