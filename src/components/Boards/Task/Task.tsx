import "./Task.css"

const Task = (props: any) => {

    return (
      <div className='task'
        draggable={true}
        onDragStart={(e) => { props.dragAndDrop.dragStartHandler(e, props.card, props.task) }}
        onDragLeave={(e) => { props.dragAndDrop.dragLeaveHandler(e) }}
        onDragEnd={(e) => { props.dragAndDrop.dragEndHandler(e) }}
        onDragOver={(e) => { props.dragAndDrop.dragOverHandler(e) }}
        onDrop={(e) => { props.dragAndDrop.tasksDropHandler(e, props.card, props.task) }}
      >
        {/* <p className='task__title'>{props.task.title}</p> */}
        {props.task.title}
      </div>
    )
  }

  export default Task