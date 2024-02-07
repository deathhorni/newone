const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

const filesArr = {}

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
    console.log('file', fileInput.file) 
    }
  }) 
  </script>
  </body>
  `) 
})

const port = process.env.PORT || 9010

app.listen(port, () => {
  console.log('listen ' + port) 
}) 
