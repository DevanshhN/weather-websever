console.log('Client side JavaScript loaded')


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#p1')
const messageTwo = document.querySelector('#p2')

messageOne.textContent = 'From JavaScript'


weatherForm.addEventListener('submit',(e) => {

    e.preventDefault()

    const location = search.value
    messageOnetextContent = "Loading"
    fetch('/weather?address='+encodeURIComponent(location)).then((response) => {
        response.json().then((data)=> {
            if (data.error){
                messageOne.textContent = data.error
            }
            else{
                messageTwo.textContent = data.location,
                messageOne.textContent= data.forecast
            }
        })
    })
        
})