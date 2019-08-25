class Audio {
  constructor () {
    this.audios = document.querySelectorAll('audio')
    this.albums = new Album()
    this.playIndex = 0
    this.show()
  }
  play () {
    this.audios[this.playIndex].play()
  }
  formatTime (time) {
    return `${Math.floor(time / 60)}:${Math.floor(time % 60) < 10 ? '0' : ''}${Math.floor(time % 60)}`
  }
  show () {
    const fragment = document.createDocumentFragment()
    this.albums.albums[this.albums.nowSelect].songs.forEach((album, index) => {
      const tempLi = document.createElement('li')
      tempLi.dataset.index = index
      tempLi.className = this.playIndex === index ? 'song active' : 'song'
      tempLi.innerHTML = `
        <div class="song-index">${index + 1}</div>
        <div class="song-title">${album}</div>
        <div class="song-time">${this.formatTime(this.audios[index].duration)}</div>
        <div class="song-controls">
          <div class="sound-plus hover-bf">
            <img src="./img/plus-solid.png" alt="">
            <img src="./img/plus-solid_hover.png" class="hover-f" alt="">
          </div>
          <div class="sound-minus hover-bf">
            <img src="./img/minus-solid.png" alt="">
            <img src="./img/minus-solid_hover.png" class="hover-f" alt="">
          </div>
        </div>
      `
      fragment.appendChild(tempLi)
    })
    document.querySelector('ul.songs-list').appendChild(fragment)
  }
  get audio () {
    return this.audios[this.playIndex]
  }
}

class Album {
  constructor () {
    this.albums = [
      {
        title: 'MyAlbum',
        songs: ['GalWay Girl', 'Catch My Breath', 'Counting Stars', 'Demons', 'Diamonds', 'Sugar']
      }
    ]
    this.nowSelect = 0
  }
}

class Controls {
  constructor () {
    this.audio = new Audio()
    this.next = document.querySelector('.next')
    this.next.addEventListener('click', (e) => this.handleClick(e))
    this.prev = document.querySelector('.prev')
    this.prev.addEventListener('click', (e) => this.handleClick(e))
    this.playBtn = document.querySelector('.play')
    this.playBtn.addEventListener('click', () => this.play())
    this.playBtn.addEventListener('click', () => this.playing = !this.playing)
    this.progress = document.querySelector('.progress')
    this.progress.addEventListener('click', (e) => this.scrub(e))
    this.volume = document.querySelector('.sound-progress')
    this.volume.addEventListener('click', (e) => this.handleRangeUpdate(e))
    this.songs = document.querySelectorAll('li.song')
    this.songs.forEach(song => song.addEventListener('click', (e) => this.handleClick(e)))
    this.randomPlay = false
    this.playing = false
    // console.log(audio.audio)
    this.randomBtn = document.querySelector('.random')
    this.randomBtn.addEventListener('click', () => this.randomPlay = true)
    this.repeatBtn = document.querySelector('.repeat')
    this.repeatBtn.addEventListener('click', () => this.randomPlay = false)
    this.ad = document.querySelector('.ad')
    this.ad.addEventListener('click', () => this.ad.style.display = 'none')
    document.querySelector('.album-info-play').addEventListener('click', () => {
      if (!this.audio.audio.paused) {
        this.audio.audio.pause()
      }
      this.audio.playIndex = 0
      this.play()
    })
  }
  play (e) {
    const method = this.audio.audio.paused ? 'play' : 'pause'
    if (method === 'play') {
      this.playBtn.children[1].style.display = 'inline'
    } else {
      this.playBtn.children[1].style.display = 'none'
    }
    this.audio.audio[method]()
    this.audio.audio.addEventListener('timeupdate', (e) => this.handleProgress(e))
    this.songs.forEach((li, index) => {
      li.className = 'song'
      if (index == this.audio.playIndex) {
        li.classList.add('active')
      }
    })
    console.log('play')
  }
  handleProgress (e) {
    if (this.randomPlay) {
      this.randomBtn.children[1].style.display = 'inline'
      this.repeatBtn.children[1].style.display = 'none'
    } else {
      this.randomBtn.children[1].style.display = 'none'
      this.repeatBtn.children[1].style.display = 'inline'
    }
    const percent = e.target.currentTime / e.target.duration * 100
    document.querySelector('.progress-filled').style.flexBasis = `${percent}%`
    if (this.audio.audio.paused) {
      if (!this.playing) return
      if (!this.randomPlay) {
        const albumLength = this.audio.albums.albums[this.audio.albums.nowSelect].songs.length - 1
        this.audio.playIndex = this.audio.playIndex < albumLength ? this.audio.playIndex + 1 : 0
      } else {
        this.audio.playIndex = this.getRandom(this.audio.playIndex)
      }
      this.ad.style.display = 'block'
      this.play()
    }
  }
  scrub (e) {
    const scrubTime = e.offsetX / this.progress.offsetWidth * this.audio.audio.duration
    this.audio.audio.currentTime = scrubTime
  }
  handleRangeUpdate (e) {
    const percent = e.offsetX / this.volume.offsetWidth * 100
    this.audio.audio.volume = e.offsetX / this.volume.offsetWidth
    this.volume.children[0].style.flexBasis = `${percent}%`
  }
  handleClick (e) {
    const vm = this
    if (!vm.audio.audio.paused) {
      vm.audio.audio.pause()
    }
    const albumLength = vm.audio.albums.albums[vm.audio.albums.nowSelect].songs.length - 1
    if (e.target.parentNode.className.includes('next')) {
      if (this.randomPlay) {
        vm.audio.playIndex = this.getRandom(vm.audio.playIndex)
      } else {
        vm.audio.playIndex = vm.audio.playIndex < albumLength ? vm.audio.playIndex + 1 : 0
      }
    } else if (e.target.parentNode.className.includes('prev')) {
      if (this.randomPlay) {
        vm.audio.playIndex = this.getRandom(vm.audio.playIndex)
      } else {
        vm.audio.playIndex = vm.audio.playIndex === 0 ? albumLength : vm.audio.playIndex - 1
      }
    } else {
      vm.audio.playIndex = parseInt(e.target.dataset.index)
    }  
    vm.play()
    console.log(vm.audio.playIndex)
  }
  getRandom (index) {
    let tempIndex = Math.floor(Math.random() * this.audio.albums.albums[this.audio.albums.nowSelect].songs.length)
    while (tempIndex === index) {
      tempIndex = this.getRandom(tempIndex)
    }
    return tempIndex
  }
}


window.onload = function () {
  new Controls()
}