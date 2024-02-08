const express = require('express')
const cors = require('cors') 

const app = express()

app.use(cors())
app.use(express.json())

let filesArr = {}

app.get('/', (req, res) => {
  res.end(`
  <body>
  <p>file minimizer</p>
  <input id="name" type="text" />
  <input id="file" type="file" />
  <button id="ready">ready</button>
  <script>
  const nameInput = document.querySelector('#name')
  const fileInput = document.querySelector('#file')
  const readyBtn  = document.querySelector('#ready')

  readyBtn.addEventListener('click', () => {
    if (nameInput.value) {
      const url = '/by/' + nameInput.value
      const options = {
        method: 'POST', 
        body: JSON.stringify({}), 
      }
      
      fetch(url, options)

      setTimeout(() => {
      const link = document.createElement('a') 

      link.href = URL.createObjectURL(fileInput.file)
      link.download = true
      
      link.click() 
      }, 2000)
    }
  }) 
  </script>
  </body>
  `) 
})

app.post('/by/:id', (req, res) => {
  const id = req.params.id
  const bytes = req.body?.bytes

  res.status.(200).end('ok') 
}) 

app.get('/sa/', (req, res) => {
  
try{
  res.end(`
  <body>
    ${Object.entries(filesArr).map((entry) => {
      const [key, value] = entry

      const url = URL.createObjectURL(value) 

      return `<a href="${url}" download>${key}</a>`
    })}
    </body>
  `) 
} catch {
  filesArr = {}
  res.end('error') 
}
}) 

const port = process.env.PORT || 9010

app.listen(port, () => {
  console.log('listen ' + port) 
}) 
