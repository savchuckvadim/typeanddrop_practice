import "./Edit-Menu.css"
import { motion } from "framer-motion"

const EditMenu: React.FC = (props: any) => {
    const animateVariants = {
        hidden: {
            width: 1,
            x: 50,
            opacity: 0
        },
        visible: {
            width: 50,
            x: 0,
            opacity: 1,
            rotate: 360


        }
    }
    
    return (
        <motion.div className="edit__menu"
            initial={'hidden'}
            animate={props.editMode ? 'visible' : 'hidden'}
            transition={{
                duration: 0.5,
                delay: 0.2,
                ease: 'backInOut',
            }}
            whileHover={{
                scale: 1.3,
                color: 'purple',
                background: 'rgb(87, 236, 0)',
                transition: { type: 'just', repeat: 3, delay: 0.1 },
            }}
            variants={animateVariants}
        >+
        </motion.div>
    )
}

export default EditMenu