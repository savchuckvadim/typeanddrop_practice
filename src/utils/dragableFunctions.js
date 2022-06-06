export class DragbleFunctions {
    constructor(color, activeColor, list, setList, currentCard, setCurrentElement, currentTask) {
        this.color = color
        this.activeColor = activeColor
        this.list = list
        this.setList = setList
        this.currentCard = currentCard
        this.setCurrentElement = setCurrentElement
        this.currentTask = currentTask
    }
    dragStartHandler = (e, card) => {
        //что схватили
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

    }
    dragTaskOverHandler = (e) => {
        e.preventDefault()

    }
    dropHandler = (e, card) => {
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
    dropTaskHandler = (e, card) => {
        e.preventDefault()


        card.items.push(this.currentTask)

        const currentIndex = this.currentCard.items.indexOf(this.currentTask) //
        this.currentCard.items.splice(currentIndex, 1)



        this.setList(() => {

            return this.list.map((c) => {

                if (c.id === card.id) {

                    return card
                }
                if (c.id === this.currentCard.id) {

                    return this.currentCard
                }

                return c
            })

        })
    }

}

export class TasksDragbleFunctions {
    constructor(cardList, setCardList, currentCard, setCurrentCard, currentTask, setCurrentTask) {

        this.cardList = cardList
        this.setCardList = setCardList
        this.currentCard = currentCard
        this.setCurrentCard = setCurrentCard
        this.currentTask = currentTask
        this.setCurrentTask = setCurrentTask
    }
    dragStartHandler = (e, card, item = null) => {

        // card //что схватили
        this.setCurrentCard(card)
        this.setCurrentTask(item)

    }
    dragLeaveHandler = (e) => {
        e.target.style.boxShadow = 'none'
        e.target.style.opacity = 1
    }
    dragEndHandler = (e) => {
        e.target.style.boxShadow = 'none'
        e.target.style.opacity = 1
    }
    dragOverHandler = (e) => {
        e.preventDefault()
        if (e.target.className === 'task') {
            e.target.style.boxShadow = '0 4px 3px grey'
        }

        e.target.style.opacity = 0.7

    }
    dropHandler = (e, card, item = null) => {
        e.target.style.opacity = 1
        e.stopPropagation()

        const currentIndex = this.currentCard.items.indexOf(this.currentTask) //
        this.currentCard.items.splice(currentIndex, 1)
        const dropIndex = card.items.indexOf(item)

        card.items.splice(dropIndex + 1, 0, this.currentTask)

        this.setCardList(() => (

            this.cardList.map(c => {

                if (c.id === card.id) {

                    return card
                }
                if (c.id === this.currentCard.id) {

                    return this.currentCard
                }

                return c
            })


        ))

    }

}
