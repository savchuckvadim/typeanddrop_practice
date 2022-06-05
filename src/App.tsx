import React, { useState } from 'react';

import './App.css';
import { DragbleFunctions, TasksDragbleFunctions } from './utils/dragableFunctions';


function App() {
  const color: string = '#626e85';
  const colorActive: string = 'rgb(102, 94, 79, 0.5)'
  const initialCardList = [
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


  interface Card {
    id: number;
    order: number;
    text: string;
    items: Array<any>;
  }

  const [cardList, setCardList] = useState(initialCardList)
  const [currentCard, setCurrentCard] = useState({ id: 0, order: 0, text: '' })
  const [editMode, setEditMode] = useState(false)



  const CardsFunctions = new DragbleFunctions(color, colorActive, cardList, setCardList, currentCard, setCurrentCard)



  const sortCard = (a: Card, b: Card) => {
    if (a.order > b.order) {
      return 1
    } else {
      return -1

    }
  }

  return (
    <div className="App">
      <button onClick={() => { editMode ? setEditMode(false) : setEditMode(true) }}>
        {!editMode ? 'Edit Cards' : 'Перестать Редактировать Карточки'}
      </button>
      <div className='container'>
        {cardList.sort(sortCard).map(card =>
          <div className='card'

            draggable={editMode}
            style={editMode ? { cursor: 'grab' } : { cursor: 'auto' }}
            onDragStart={(e) => { editMode && CardsFunctions.dragStartHandler(e, card) }} //в тот момент когда мы взяли карточку
            onDragLeave={(e) => { editMode && CardsFunctions.dragLeaveHandler(e) }} //если вышли за пределы другой карточки
            onDragEnd={(e) => { editMode && CardsFunctions.dragEndHandler(e) }} //если мы отпустили перемещение
            onDragOver={(e) => { editMode && CardsFunctions.dragOverHandler(e) }} //если мы находимся над каким-то другим объектом
            onDrop={(e) => { editMode && CardsFunctions.dropHandler(e, card) }} //если мы отпустили карточку и расчитываем, что после этого должно произойти какое-то действие
            key={card.order}
          >
            {card.text}

            <Tasks card={card} tasks={card.items} />

          </div>
        )}
      </div>
    </div>
  );
}

const Tasks = (props: any) => {
  interface TaskType {
    id: number;
    title: string;
  }

  return (
    <div className='tasks'>
      {props.tasks.map((task: TaskType) => <Task card={props.card} task={task} />)}
    </div>
  )
}

const Task = (props: any) => {

  const color = 'white'
  const activeColor = 'green'
  const TaskFunctions = new TasksDragbleFunctions(color, activeColor)
  return (
    <div className='task'
      draggable={true}
      onDragStart={(e) => { TaskFunctions.dragStartHandler(e, props.card, props.task) }}
      onDragLeave={(e) => { TaskFunctions.dragLeaveHandler(e) }}
      onDragEnd={(e) => { TaskFunctions.dragEndHandler(e) }}
      onDragOver={(e) => { TaskFunctions.dragOverHandler(e) }}
      onDrop={(e) => { TaskFunctions.dropHandler(e, props.card, props.task) }}
    >
      <p className='task__title'>{props.task.title}</p>
    </div>
  )
}
export default App;
