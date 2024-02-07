const express = require('express')
const cors = require('cors')
const multer = require('multer')

const app = express()

app.use(cors())
app.use(express.json())

const upload = multer({
  dest: 'files/'
}) 

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
      filesArr[nameInput.value] = fileInput.file

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

app.post('/as/:id', upload.any(), (req, res) => {
  const id = req.params.id

  try {
    filesArr[id] = req.files[0]

    res.status(200).end('ok') 
  } catch {
    res.status(500).end('error') 
  }
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
