const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const colors = ['white', 'red', 'blue', 'yellow', 'black', 'pink', 'purple', 'orange', 'green']
let time = 0
let score = 0

startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', (event) => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.dataset.time)
        screens[1].classList.add('up')
        startGame()
    }
})

board.addEventListener('click', (event) => {
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRandomCircle()
    }
})


function startGame() {
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    timeEl.innerHTML = `00:${time}`
}

function decreaseTime() {
    if (time === 0) {
        finishGame()
    } else {
        let current = --time 
        if (current < 10) {
        current = `0${current}`
        }
        timeEl.innerHTML = `00:${current}` 
    }
}  

function finishGame() {
    timeEl.parentNode.remove()
    board.innerHTML = `<h1>Ваш счёт: <span class="primary">${score}</span></h1>`
}

function createRandomCircle() {
    const circle = document.createElement('div')
    const size = getRandomNumber(10, 60)
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)
    


    circle.classList.add('circle')
    circle.style.height = `${size}px`
    circle.style.width = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    circle.style.backgroundColor = `${getRandomColor()}`

    board.append(circle)
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)

}

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)]
}