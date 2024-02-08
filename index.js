const express = require('express')
const cors = require('cors') 
const multer  = require('multer')

const upload = multer({ dest: 'uploads/' })

const app = express()

app.use(cors())
app.use(express.json())

let filesArr = {}

app.get('/', (req, res) => {
  res.end(`
  <body>
  <p>file minimizer</p>
  <form action="/by" method="post" enctype="multipart/form-data">
  <input id="name" type="text" />
  <input id="file" name="file" type="file" />
  <button id="ready">ready</button>
  </form>
  <script>
  const nameInput = document.querySelector('#name')
  const fileInput = document.querySelector('#file')
  const readyBtn  = document.querySelector('#ready')

  readyBtn.addEventListener('click', async () => {
    if (nameInput.value) {

      setTimeout(() => {
      const link = document.createElement('a') 

      link.href = URL.createObjectURL(fileInput.files[0])
      link.download = true
      
      link.click() 
      }, 2000)
    }
  }) 
  </script>
  </body>
  `) 
})

app.post('/by/', upload.any(), (req, res) => {
  const body = req.body

  console.log(body.file)

  res.status(200).end('ok') 
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
