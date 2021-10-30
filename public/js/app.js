console.log("Client side javascript is loaded!")

const weatherForm = document.querySelector('form')
const searchInput = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageError = document.querySelector('#message-error')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    messageOne.textContent = 'Searching...'
    messageTwo.textContent = ''
    messageError.textContent = ''
    fetch('/weather?address=' + searchInput.value).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageError.textContent = data.error
                messageOne.textContent = ''
                messageTwo.textContent = ''
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})