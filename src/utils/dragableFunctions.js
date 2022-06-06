export class DragAndDropFunctions {
    constructor(color, activeColor, cardList, setCardList, currentCard, setCurrentCard, currentTask, setCurrentTask) {
        this.color = color
        this.activeColor = activeColor
        this.cardList = cardList
        this.setCardList = setCardList
        this.currentCard = currentCard
        this.setCurrentCard = setCurrentCard
        this.currentTask = currentTask
        this.setCurrentTask = setCurrentTask
    }

    //универсальные функции для карточек и задач
    dragStartHandler = (e, card, item = null) => {
        //что схватили
        if (item) {
            this.setCurrentCard(card);
            this.setCurrentTask(item);
        } else {
            this.setCurrentCard(card)
        }



    }
    dragLeaveHandler = (e) => {
        if (e.target.className === 'card') {
            e.target.style.backgroundColor = this.color
        }
        else if (e.target.className === 'task') {
            e.target.style.boxShadow = 'none'
            e.target.style.opacity = 1
        }

    }
    dragEndHandler = (e) => {
        if (e.target.className === 'card') {
            e.target.style.backgroundColor = this.color
        }
        else if (e.target.className === 'task') {
            e.target.style.boxShadow = 'none'
            e.target.style.opacity = 1
        }
    }
    dragOverHandler = (e) => {
        e.preventDefault()
        if (e.target.className === 'card') {
            e.target.style.backgroundColor = this.activeColor
        }
        else if (e.target.className === 'task') {
            e.target.style.boxShadow = '0 4px 3px grey'
            e.target.style.opacity = 0.7
        }

    }
    //Функции только для Карточек при перетаскивании Карточек
    dropHandler = (e, card) => {
        e.preventDefault()
        e.target.style.backgroundColor = this.color
        this.setCardList(this.cardList.map(c => {
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

    //Функции только для Карточек при перетаскивании Задач

    dragTaskOverHandler = (e) => {
        e.preventDefault()

    }
    dropTaskHandler = (e, card) => {
        e.preventDefault()


        card.items.push(this.currentTask)

        const currentIndex = this.currentCard.items.indexOf(this.currentTask) //
        this.currentCard.items.splice(currentIndex, 1)



        this.setCardList(() => {

            return this.cardList.map((c) => {

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


     //Функции только для Задач при перетаскивании Задач

     tasksDropHandler = (e, card, item = null) => {
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

