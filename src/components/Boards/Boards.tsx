import React, { useState } from 'react';
import './Boards.css';
import Board from './Board/Board';

import { DragAndDropFunctions } from '../../utils/dragableFunctions';


function Boards() {
  const color: string = '#626e85';
  const colorActive: string = 'rgb(102, 94, 79, 0.5)'
  const initialCardList: CardsList = [
    {
      id: 0, order: 0, text: `Сделать`,
      items: [{ id: 1, title: 'Сделать Загранпаспорт' }, { id: 2, title: 'Переехать в Барселону' }]
    },
    {
      id: 1, order: 1, text: `В Процессе`,
      items: [{ id: 3, title: 'Выучить React' }, { id: 4, title: 'Устроиться работать программистом' }]
    },
    {
      id: 2, order: 2, text: `Готово`,
      items: [{ id: 5, title: 'Пожить на Бали' }, { id: 6, title: 'Открыть Марихуановый Бизнес' }]
    },

  ]

  type Task = {
    type?: string
    id: number
    title: string

  }

   type Card = {
    id: number
    order: number
    text: string
    items: Array<Task>
  }
  type CardsList = Array<Card>




  const [cardList, setCardList] = useState(initialCardList)
  const [currentCard, setCurrentCard] = useState({ id: 0, order: 0, text: '', items: [{}, {}, {}] })

  const [editMode, setEditMode] = useState(false)

  const [currentTask, setCurrentTask] = useState({ id: 0, title: '' })

  const dragAndDrop = new DragAndDropFunctions(color, colorActive, cardList, setCardList, currentCard, setCurrentCard, currentTask, setCurrentTask)


  const sortCard = (a: Card, b: Card) => {
    if (a.order > b.order) {
      return 1
    } else {
      return -1

    }
  }



  return (
    <div className="boards">
      <button onClick={() => { editMode ? setEditMode(false) : setEditMode(true) }}>
        {!editMode ? 'Edit Cards' : 'Перестать Редактировать Карточки'}
      </button>
      <div className='container'>
        {cardList.sort(sortCard).map(card =>
          <Board
            card={card}
            editMode={editMode}
            dragAndDrop={dragAndDrop}
          />
        )}
      </div>
    </div>


  );
}











export default Boards;
