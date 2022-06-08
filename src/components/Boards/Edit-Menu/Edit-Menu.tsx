import "./Edit-Menu.css"
import { motion } from "framer-motion"

const EditMenu: React.FC = (props) => {

    return (
        <motion.div className="edit__menu"
            initial={{
                width: 1,
                display: 'none'
            }}
            animate={{
                width: 50,
                display: 'flex',
                
            }}
            transition={{ duration: 2 }}>
            +
        </motion.div>
    )
}

export default EditMenu