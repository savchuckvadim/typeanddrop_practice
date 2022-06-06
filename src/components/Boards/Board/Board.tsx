import Task from "../Task/Task";
import "./Board.css"

const Board = (props: any) => {
    interface TaskType {
      id: number;
      title: string;
    }
    return (
      <div className='card'
  
        draggable={props.editMode}
        style={props.editMode ? { cursor: 'grab' } : { cursor: 'auto' }}
        onDragStart={(e) => { props.editMode && props.dragAndDrop.dragStartHandler(e, props.card, null) }} //в тот момент когда мы взяли карточку
        onDragLeave={(e) => { props.editMode && props.dragAndDrop.dragLeaveHandler(e) }} //если вышли за пределы другой карточки
        onDragEnd={(e) => { props.editMode && props.dragAndDrop.dragEndHandler(e) }} //если мы отпустили перемещение
        onDragOver={(e) => { props.editMode ? props.dragAndDrop.dragOverHandler(e) : props.dragAndDrop.dragTaskOverHandler(e) }} //если мы находимся над каким-то другим объектом
        onDrop={(e) => { props.editMode ? props.dragAndDrop.dropHandler(e, props.card) : props.dragAndDrop.dropTaskHandler(e, props.card) }} //если мы отпустили карточку и расчитываем, что после этого должно произойти какое-то действие
        key={props.card.order}
      >
        {props.card.text}
  
  
        <div className='tasks'>
          {props.card.items.map((task: TaskType) =>
            <Task
              key={task.id}
              card={props.card}
              task={task}
              dragAndDrop={props.dragAndDrop}
            />
          )}
        </div>
      </div>
    )
  }
  

  export default Board