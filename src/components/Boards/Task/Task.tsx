import "./Task.css"
import { motion } from "framer-motion"
const Task = (props: any) => {

  return (
    <motion.div className={!props.editMode ?'task':'task--disable'}
    whileTap={{
      scale:1.1,
      // opacity:0.2,
      // rotate:360,
      background:'purple',
      color: 'white'

    }}
    animate={{
      
    }}
      draggable={!props.editMode}
      onDragStart={(e) => { props.dragAndDrop.dragStartHandler(e, props.card, props.task) }}
      onDragLeave={(e) => { props.dragAndDrop.dragLeaveHandler(e) }}
      onDragEnd={(e) => { props.dragAndDrop.dragEndHandler(e) }}
      onDragOver={(e) => { props.dragAndDrop.dragOverHandler(e) }}
      onDrop={(e) => { props.dragAndDrop.tasksDropHandler(e, props.card, props.task) }}
    >
      {/* <p className='task__title'>{props.task.title}</p> */}
      {props.task.title}
    </motion.div>
  )
}

export default Task