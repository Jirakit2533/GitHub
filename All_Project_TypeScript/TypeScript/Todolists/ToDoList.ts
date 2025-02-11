const enterButton = document.getElementById('enter') as HTMLButtonElement
const input = document.getElementById('userInput') as HTMLInputElement
const ul = document.querySelector('ul') as HTMLUListElement
const items = document.getElementsByTagName('li')

function inputLength(): number {
  return input.value.length
}

function listLength(): number {
  return items.length
}

function createListElement(): void {
  const li = document.createElement('li')
  li.appendChild(document.createTextNode(input.value))
  ul.appendChild(li)
  input.value = ''

  function crossOut(): void {
    li.classList.toggle('done')
  }
  li.addEventListener('click', crossOut)

  const dBtn = document.createElement('button')
  dBtn.appendChild(document.createTextNode('X'))
  li.appendChild(dBtn)
  dBtn.addEventListener('click', deleteListItem)

  function deleteListItem(): void {
    li.classList.add('delete')
  }
}

function addListAfterClick(): void {
  if (inputLength() > 0) {
    createListElement()
  }
}

function addListAfterKeyPress(event: KeyboardEvent): void {
  if (inputLength() > 0 && event.key === 'Enter') {
    event.preventDefault()
    createListElement()
  }
}

document.addEventListener('keydown', addListAfterKeyPress)
enterButton.addEventListener('click', addListAfterClick)
