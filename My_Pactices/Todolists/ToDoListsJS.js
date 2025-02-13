const enterButton = document.getElementById('enterButton')
const input = document.getElementById('userInput')
const ul = document.querySelector('ul')
const items = document.getElementsByTagName('li')

function inputLength() {
  return input.value.length
}

function listLength() {
  return items.length
}

function createListElement() {
  const li = document.createElement('li')
  li.appendChild(document.createTextNode(input.value))
  ul.appendChild(li)
  input.value = ''

  function crossOut() {
    li.classList.toggle('done')
  }
  li.addEventListener('click', crossOut)

  const dBtn = document.createElement('button')
  dBtn.appendChild(document.createTextNode('X'))
  li.appendChild(dBtn)
  dBtn.addEventListener('click', deleteListItem)

  function deleteListItem() {
    li.classList.add('delete')
  }
}

function addListAfterClick() {
  if (inputLength() > 0) {
    createListElement()
  }
}

function addListAfterKeyPress(event) {
  if (inputLength() > 0 && event.key === 'Enter') {
    event.preventDefault()
    createListElement()
  }
}
document.addEventListener('keydown', addListAfterKeyPress)
enterButton.addEventListener('click', addListAfterClick)
