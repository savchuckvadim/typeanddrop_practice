export class DragbleFunctions {
    constructor(color, activeColor, list, setList, currentCard, setCurrentElement) {
        this.color = color
        this.activeColor = activeColor
        this.list = list
        this.setList = setList
        this.currentCard = currentCard
        this.setCurrentElement = setCurrentElement
    }
    dragStartHandler = (e, card) => {
        console.log('drag ' + card.text) //что схватили
        this.setCurrentElement(card)
    }
    dragLeaveHandler = (e) => {
        e.target.style.backgroundColor = '#626e85'
    }
    dragEndHandler = (e) => {
        e.target.style.backgroundColor = '#626e85'
    }
    dragOverHandler = (e) => {
        e.preventDefault()
        e.target.style.backgroundColor = 'rgb(102, 94, 79, 0.5)'
        console.log(e.target)
    }
    dropHandler = (e, card) => {
        e.preventDefault()
        e.target.style.backgroundColor = '#626e85'
        this.setList(this.list.map(c => {
            if (c.id === card.id) {
                return { ...c, order: this.currentCard.order }
            }
            if (c.id === this.currentCard.id) {
                return { ...c, order: card.order }
            }
            return c
        }))
        console.log('drop ' + card.text) //куда бросили
    }

}

export class TasksDragbleFunctions {
    constructor(color, activeColor, list, setList, currentCard, setCurrentElement) {
        this.color = color
        this.activeColor = activeColor
        this.list = list
        this.setList = setList
        this.currentCard = currentCard
        this.setCurrentElement = setCurrentElement
    }
    dragStartHandler = (e, card, item = null) => {
        console.log('drag ' + card.text) //что схватили
        this.setCurrentElement(card)
    }
    dragLeaveHandler = (e) => {
        e.target.style.backgroundColor = this.color
    }
    dragEndHandler = (e) => {
        e.target.style.backgroundColor = this.color
    }
    dragOverHandler = (e) => {
        e.preventDefault()
        e.target.style.backgroundColor = this.activeColor
        console.log(e.target)
    }
    dropHandler = (e, card, item = null) => {
        e.preventDefault()
        e.target.style.backgroundColor = this.color
        this.setList(this.list.map(c => {
            if (c.id === card.id) {
                return { ...c, order: this.currentCard.order }
            }
            if (c.id === this.currentCard.id) {
                return { ...c, order: card.order }
            }
            return c
        }))
        console.log('drop ' + card.text) //куда бросили
    }

}
