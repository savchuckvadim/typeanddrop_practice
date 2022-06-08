import EditMenu from "../Boards/Edit-Menu/Edit-Menu"
import { motion } from "framer-motion"
import "./Header.css"

const Header = (props) => {

    return (
        <div className="header">

            <div className="header__container">
                <motion.button
                className={ !props.editMode ? "edit__button" :  "edit__button--active"}
                onClick={() => { props.editMode ? props.setEditMode(false) : props.setEditMode(true) }}>
                    {!props.editMode ? 'Edit Cards' : 'Перестать Редактировать Карточки'}
                </motion.button>
                {<EditMenu editMode={props.editMode} />}
            </div>
        </div>
    )
}

export default Header