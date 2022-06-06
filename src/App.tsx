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
  interface TaskType {
    id: number;
    title: string;
  }
  const [cardList, setCardList] = useState(initialCardList)
  const [currentCard, setCurrentCard] = useState({ id: 0, order: 0, text: '', items: [{},{},{} ]})

  const [editMode, setEditMode] = useState(false)

  const [currentTask, setCurrentTask] = useState({ id: 0, title: '' })

  const CardsFunctions = new DragbleFunctions(color, colorActive, cardList, setCardList, currentCard, setCurrentCard)



  const sortCard = (a: Card, b: Card) => {
    if (a.order > b.order) {
      return 1
    } else {
      return -1

    }
  }

  const dragOverHandler = (e: any) => {
 e.preventDefault()
  }
  const dropCardHandler = (e: any, card: any) => {
    e.preventDefault()
    card.items.push(currentTask)
    debugger
    const currentIndex = currentCard.items.indexOf(currentTask) //
    currentCard.items.splice(currentIndex, 1)



    setCardList(() => {

      return cardList.map((c: any) => {

        if (c.id === card.id) {

          return card
        }
        if (c.id === currentCard.id) {

          return currentCard
        }

        return c
      })

    })
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
            onDragOver={(e) => { editMode ? CardsFunctions.dragOverHandler(e) : dragOverHandler(e) }} //если мы находимся над каким-то другим объектом
            onDrop={(e) => { editMode ? CardsFunctions.dropHandler(e, card) : dropCardHandler(e, card) }} //если мы отпустили карточку и расчитываем, что после этого должно произойти какое-то действие
            key={card.order}
          >
            {card.text}

            {/* <Tasks card={card} tasks={card.items} cardList={cardList} setCardList={setCardList} /> */}
            <div className='tasks'>
              {card.items.map((task: TaskType) =>
                <Task
                  key={task.id}
                  cardList={cardList}
                  setCardList={setCardList}
                  card={card}
                  task={task}
                  currentCard={currentCard}
                  setCurrentCard={setCurrentCard}
                  currentTask={currentTask}
                  setCurrentTask={setCurrentTask}

                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


const Task = (props: any) => {

  // const [currentCard, setCurrentCard] = useState(props.card)
  // const [tasksCardsList, setCards] = useState(props.card.items)
  // const [currentTask, setCurrentTask] = useState(props.task)

  const color = 'white'
  const activeColor = 'green'
  // const TaskFunctions = new TasksDragbleFunctions(color, activeColor, props.cardList, props.setCardList, currentCard, setCurrentCard, currentTask, setCurrentTask)

  const dragStartHandler = (e: any, card: any, item = null) => {

    console.log('drag ' + card.text) //что схватили
    props.setCurrentCard(card)
    props.setCurrentTask(item)
    console.log('dragStartHandler')
    console.log(props.currentCard)
  }
  const dragLeaveHandler = (e: any) => {
    e.target.style.boxShadow = 'none'
    e.target.style.backgroundColor = color
  }
  const dragEndHandler = (e: any) => {
    e.target.style.boxShadow = 'none'
    e.target.style.backgroundColor = color
  }
  const dragOverHandler = (e: any) => {
    e.preventDefault()
    if (e.target.className === 'task') {
      e.target.style.boxShadow = '0 4px 3px grey'
    }

    e.target.style.backgroundColor = activeColor

  }
  const dropHandler = (e: any, card: any, item = null) => {

    e.stopPropagation() 
    const currentIndex = props.currentCard.items.indexOf(props.currentTask) //
    props.currentCard.items.splice(currentIndex, 1)
    const dropIndex = card.items.indexOf(item)

    card.items.splice(dropIndex + 1, 0, props.currentTask)

    props.setCardList(() => {

      return props.cardList.map((c: any) => {

        if (c.id === card.id) {

          return card
        }
        if (c.id === props.currentCard.id) {

          return props.currentCard
        }

        return c
      })


    })
    e.target.style.backgroundColor = color
    console.log(props.cardList)
  }
  return (
    <div className='task'
      draggable={true}
      onDragStart={(e) => { dragStartHandler(e, props.card, props.task) }}
      onDragLeave={(e) => { dragLeaveHandler(e) }}
      onDragEnd={(e) => { dragEndHandler(e) }}
      onDragOver={(e) => { dragOverHandler(e) }}
      onDrop={(e) => { dropHandler(e, props.card, props.task) }}
    >
      {/* <p className='task__title'>{props.task.title}</p> */}
      {props.task.title}
    </div>
  )
}





// const Tasks = (props: any) => {
//   interface TaskType {
//     id: number;
//     title: string;
//   }

//   return (
//     <div className='tasks'>
//       {props.tasks.map((task: TaskType) => <Task key={task.id} cardList={props.cardList} setCardList={props.setCardList} card={props.card} task={task} />)}
//     </div>
//   )
// }





export default App;
