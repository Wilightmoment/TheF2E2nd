const leftTopDecks = [{}, {}, {}, {}]
const rightTopDecks = [[], [], [], []]
const mainDecks = [[], [], [], [], [], [], [], []]
let isPause = false
let dragCard, dragRegion, dropRegion, dropCard
let interval = null
const history = []
/**
 * shuffle
 */
const porkerArray = Array.from(new Array(52)).map((_, index) => index + 1)
function shuffle (arr) {
  const newArray = []
  for (let i = arr.length - 1; i > 0; i--){
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]    
  }
  arr.forEach(n => {
    if (n >= 0 && n <= 13)
      newArray.push({ number: n % 13 === 0 ? 13 : n % 13, type: 'S', color: 'black' })
    else if (n > 13 && n <= 26) 
      newArray.push({ number: n % 13 === 0 ? 13 : n % 13, type: 'H', color: 'red' })
    else if (n > 26 && n <= 39)
      newArray.push({ number: n % 13 === 0 ? 13 : n % 13, type: 'D', color: 'red' })
    else
      newArray.push({ number: n % 13 === 0 ? 13 : n % 13, type: 'C', color: 'black' })
  })
  return newArray
}
/**
 * split porker to red and black
 */
const shuffledPorker = shuffle(porkerArray)
shuffledPorker.forEach((pork, index, arr) => {
  if (index === 0) return;
  if (pork.color === arr[index - 1].color) {
    let i = index + 1
    while (pork.color === arr[i].color) {
      i++
    }
    [arr[i], arr[index]] = [arr[index], arr[i]]
  }
})
/**
 * Licensing
 */
mainDecks[0].push(shuffledPorker.slice(0, 7))
mainDecks[1].push(shuffledPorker.slice(7, 14))
mainDecks[2].push(shuffledPorker.slice(14, 21))
mainDecks[3].push(shuffledPorker.slice(21, 28))
mainDecks[4].push(shuffledPorker.slice(28, 34))
mainDecks[5].push(shuffledPorker.slice(34, 40))
mainDecks[6].push(shuffledPorker.slice(40, 46))
mainDecks[7].push(shuffledPorker.slice(46, 52))

/**
 * main-deck
 */
const mainDeck = document.querySelector('.main-deck')
let isInit = false
function flushDeck () {
  mainDecks.forEach((decks, decksIndex) => {
    const mainDeckElement = document.createElement('div')
    mainDeckElement.id = `mainDecks-index-${decksIndex}`
    mainDeckElement.style.position = 'relative'
    mainDeckElement.style.width = '125px'
    mainDeckElement.style.height = '100%'
    mainDeckElement.style.userSelect = 'none'
    decks[0].forEach((card, cardsIndex) => {
      const mainDeckCardElement = document.createElement('div')
      if (!isPause && cardsIndex + 1 === decks[0].length) {
        mainDeckCardElement.draggable = true
      }
      mainDeckCardElement.id = `mainDeckCard-index-${card.type}${card.number}`
      mainDeckCardElement.style.position = 'absolute'
      mainDeckCardElement.style.width = '100%'
      mainDeckCardElement.style.height = '193px'
      mainDeckCardElement.style.opacity = '0'
      mainDeckCardElement.style.backgroundImage = `url('/cards_background/${card.type}${card.number}.png`
      mainDeckCardElement.style.backgroundPosition = 'center'
      mainDeckCardElement.style.backgroundSize = 'cover'
      mainDeckCardElement.style.backgroundRepeat = 'no-repeat'
      mainDeckCardElement.card = card
      mainDeckCardElement.region = `mainDeck-index-${decksIndex}`
      /** card fade-In animation */
      if (!isInit) {
        mainDeckCardElement.style.transition = 'all .3s'
        mainDeckCardElement.style.top = '-2000px'
        mainDeckCardElement.style.left = '-2000px'
        setTimeout(() => {
          mainDeckCardElement.style.top = `${cardsIndex * 20}px`
          mainDeckCardElement.style.opacity = '1'
          mainDeckCardElement.style.left = '0px'
        }, cardsIndex * decksIndex * 30)
      } else {
        mainDeckCardElement.style.top = `${cardsIndex * 20}px`
        mainDeckCardElement.style.opacity = '1'
      }
      mainDeckElement.appendChild(mainDeckCardElement)
    })
    mainDeck.appendChild(mainDeckElement)
  })
  isInit = true
}

/**
 * top-deck
 */
const topDeck = document.querySelector('.top-deck')
function setTopDeck () {
  /**left-top-deck */
  leftTopDecks.forEach((_, index) => {
    const block = document.createElement('div')
    block.id = `leftTopDecks-index-${index}`
    block.style.border = '2px solid #FCFCFC'
    block.style.borderRadius = '5px'
    block.style.display = 'flex'
    block.style.width = '125px'
    block.style.position = 'relative'
    topDeck.children[0].appendChild(block)
    block.addEventListener('dragover', dragOver)
    contain.addEventListener('drop', drop)
  })

  /**king */
  const img = document.createElement('img')
  const p = document.createElement('p')
  p.textContent = 'FREECELL'
  p.style.color = '#222222'
  p.style.fontWeight = 'bold'
  p.style.letterSpacing = '1.5px'
  img.src = './king_happy.png'
  img.style.width = '100%'
  topDeck.children[1].appendChild(img)
  topDeck.children[1].appendChild(p)

  /**right-top-deck */
  rightTopDecks.forEach((_, index) => {
    const block = document.createElement('div')
    block.id = `rightTopDecks-index-${index}`
    block.style.border = '2px solid #FCFCFC'
    block.style.borderRadius = '5px'
    block.style.display = 'flex'
    block.style.width = '125px'
    block.style.position = 'relative'
    block.style.backgroundColor = '#FCFCFC'
    block.style.backgroundImage = `url("./${index}.png")`
    block.style.backgroundPosition = 'center'
    block.style.backgroundSize = 'contain'
    block.style.backgroundRepeat = 'no-repeat'
    topDeck.children[2].appendChild(block)
  })
}

/**drap and drop */
const contain =  document.querySelector('.contain')
contain.draggable = false
function dragStart (event) {
  /** reset current arrayList */
  const handleArrayIndex = event.target.parentElement.id.indexOf('-')
  const handleArray = event.target.parentElement.id.slice(0, handleArrayIndex)
  const index = parseInt(event.target.parentElement.id.slice(-1))
  switch (handleArray) {
    case 'leftTopDecks':
      leftTopDecks[index] = {}
      break
    case 'mainDecks':
      break
    default:
      break
  }
  /**set region and card */
  dragRegion = event.target.parentElement.id
  dragCard = event.target.card
  region = dragRegion

  event.dataTransfer.setData('card', event.target.id)
}
function dragOver (event) {
  event.preventDefault()
}
function drop (event) {
  event.preventDefault()
  const target = event.target
  if (target.id === 'contain' || event.target.id === '') return;
  dropRegion = target.parentElement.id
  if (dropRegion !== '') {
    dropCard = document.querySelector(`#${dropRegion}`).lastChild.card
  }
  const data = event.dataTransfer.getData('card')

  /**left top deck */
  if (target.id.includes('leftTopDecks')) {
    const index = parseInt(target.id.slice(-1))
    if (target.children.length === 1 || Object.keys(leftTopDecks[index]).length !== 0) return;
    leftTopDecks[index] = dragCard
    target.appendChild(document.getElementById(data))
  }
  if (target.parentElement.id.includes('leftTopDecks')) {
    return
  }

  /**mainDeckCard */
  if (target.parentElement.id.includes('mainDecks')) {
    if (dragCard === dropCard) return;
    if (dragCard.color === dropCard.color || dragCard.number + 1 !== dropCard.number) return;
    /** handle data array */ 
    const index = parseInt(target.parentElement.id.slice(-1))
    mainDecks[index][0].push(dragCard)
    
    /**update card to dom */
    const mainDeck = target.parentElement
    const lastElement = mainDeck.lastChild
    if (dragRegion !== dropRegion) {
      document.getElementById(data).style.top = parseInt(lastElement.style.top) + 20 + 'px'
    }
    mainDeck.appendChild(document.getElementById(data))
  }

  /** right top deck  */
  if (target.id.includes('rightTopDecks')) {
    const index = parseInt(target.id.slice(-1))
    if (rightTopDecks[index].length === 0 && dragCard.number !== 1) return;
    switch (index) {
      case 0:
        if (dragCard.type !== 'S') return
        break
      case 1:
        if (dragCard.type !== 'H') return
        break
      case 2:
        if (dragCard.type !== 'D') return
        break
      case 3:
        if (dragCard.type !== 'C') return
        break
    }
    rightTopDecks[index].push(dragCard)
    document.getElementById(data).draggable = false
    target.appendChild(document.getElementById(data))
  }
  /** handle stack cards */
  if (target.parentElement.id.includes('rightTopDecks')) {
    if (dragCard.type !== dropCard.type) return;
    const index = parseInt(target.parentElement.id.slice(-1))
    if (dragCard.number - 1 === dropCard.number) {
      rightTopDecks[index].push(dragCard)
      target.parentElement.appendChild(document.getElementById(data))
    } else {
      return
    }
  }

  /**handle draggable */
  Array.from(document.querySelector(`#${dragRegion}`).childNodes).forEach((card, index) => {
    card.draggable = false
    if (index === document.querySelector(`#${dragRegion}`).childElementCount -1 )
      card.draggable = true
  })
  if (dropRegion !== '') {
    Array.from(document.querySelector(`#${dropRegion}`).childNodes).forEach((card, index) => {
      card.draggable = false
      if (index === document.querySelector(`#${dropRegion}`).childElementCount -1 )
        card.draggable = true
    })
  }
  /** handle mainDecks array */
  if (dragRegion.includes('mainDecks')) {
    const idx = dragRegion.slice(-1)
    mainDecks[idx][0].pop()
  }
  history.push(
    {
      to: {
        card: dropRegion === '' ? undefined : dropCard,
        region: dropRegion === '' ? target.id : dropRegion
      },
      from: {
        card: dragCard,
        region: dragRegion
      }
    }
  )
  if (rightTopDecks[0].length === 13 && rightTopDecks[1].length === 13 
    && rightTopDecks[2].length === 13 && rightTopDecks[3].length === 13) {
      endGame()
    }
}
contain.addEventListener('dragstart', dragStart)
contain.addEventListener('dragover', dragOver)
contain.addEventListener('drop', drop)

/**
 * undo
 */
document.querySelector('#undo').addEventListener('click', undo)
function undo () {
  if (history.length === 0) return;
  const fromRegion = document.querySelector(`#${history[history.length-1].from.region}`)
  const fromIndex = history[history.length-1].from.region.slice(-1)
  const toRegion = document.querySelector(`#${history[history.length-1].to.region}`)
  const toIndex = history[history.length-1].to.region.slice(-1)
  const card = document.querySelector(`#${history[history.length-1].to.region}`).lastChild
  if (fromRegion.lastChild) {
    card.style.top = parseInt(fromRegion.lastChild.style.top) + 20 + 'px'
  }
  if (history[history.length - 1].to.region.includes('rightTopDecks')) card.draggable = true
  fromRegion.appendChild(card)
  /** add */
  if (history[history.length-1].from.region.includes('mainDecks')) {
    mainDecks[fromIndex][0].push(history[history.length-1].from.card)
  }
  if (history[history.length-1].from.region.includes('rightTopDecks')) {
    rightTopDecks[fromIndex][0].push(history[history.length-1].from.card)
  }
  if (history[history.length-1].from.region.includes('leftTopDecks')) {
    if (leftTopDecks[fromIndex][0])
      leftTopDecks[fromIndex][0].push(history[history.length-1].from.card)
    else 
      leftTopDecks[fromIndex] = history[history.length-1].from.card
  }
  /** delete */
  if (history[history.length-1].to.region.includes('mainDecks')) {
    mainDecks[toIndex][0].pop()
  }
  if (history[history.length-1].to.region.includes('rightTopDecks')) {
    rightTopDecks[toIndex].pop()
  }
  if (history[history.length-1].to.region.includes('leftTopDecks')) {
    leftTopDecks[toIndex] = {}
  }
  
  history.pop()
}

/** SetTime */
function setTime () {
  if (interval !== null) clearInterval(interval)
  let time = 0
  const timeEl = document.querySelector('.time')
  interval = setInterval(() => {
    time++
    let min = Math.floor(time / 60)
    let sec = time % 60
    timeEl.textContent = `TIME: ${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`
  }, 1000)
}

/** NewGame */
const start = document.querySelector('#start')
start.addEventListener('click', () => {
  window.location.href = window.location.href
})

/** Hint */
const hint = document.querySelector('#hint')
hint.addEventListener('click', () => {
  const tempArr = []
  mainDecks.forEach(cardList => {
    cardList.forEach(card => {
      tempArr.push(card[card.length-1])
    })
  })
  for (let i = 0; i < tempArr.length; i++) {
    for (let j = i + 1; j < tempArr.length; j++) {
      /** find two card */
      if (tempArr[i].number + 1 === tempArr[j].number || tempArr[i].number - 1 === tempArr[j].number) {
        if (tempArr[i].color === tempArr[j].color) continue;
        /** change flash order */
        if (tempArr[i].number > tempArr[j].number) {
          let t = i
          i = j
          j = t
        }
        /** flash card */
        const child1 = document.querySelector(`#mainDecks-index-${i}`).lastChild
        const child2 = document.querySelector(`#mainDecks-index-${j}`).lastChild
        child1.style.transition = 'all .07s ease'
        child1.classList.add('hint')
        child2.classList.add('hint')
        child1.addEventListener('transitionend', () => {
          child1.classList.remove('hint')
        })
          child2.addEventListener('transitionend', () => {
          child2.classList.remove('hint')
        })
        return
      }
    }
  }
})

/** EndGame */
function endGame () {
  $('#modalEndGame').modal('show')
  clearInterval(interval)
}

function initGame () {
  flushDeck()
  setTopDeck()
  setTime()
}

window.onload = function () {
  initGame()
}