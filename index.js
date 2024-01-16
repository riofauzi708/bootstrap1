const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'hbs')
app.set('views', 'src/views')

app.use('/assets', express.static('src/assets'))
app.use(express.urlencoded({extended: false}))

app.get('/home', home)
app.get('/contact', contact)
app.get('/project', project)
app.get('/project-detail', projectDetail)
app.get('/project-detail/:id', projectDetail)
app.get('/testimonial', testimonial)
app.post('/project', handlePostProject)
app.get('/delete/:id', handleDeleteProject)
app.get('/edit-project/:id', handleEditProject)

const data = []

function home(req, res) {
  res.render('index')
}
function contact(req, res) {
  res.render('contact')
}
function project(req, res) {

  res.render('project', {data})
}

function projectDetail(req, res) {
  const { id } = req.params
  const dataDetail = data [id]

  res.render('project-detail', { id: dataDetail})
}

function testimonial(req, res) {
  res.render('testimonial')
}

function handlePostProject(req, res) {
  const {
    projectName,
    description,} = req.body

  data.push({
    projectName,
    description,
})
  res.redirect('/project')
}

function handleDeleteProject(req, res) {
  const { id } = req.params
  data.splice(id, 1)
  console.log("Berhasil Delete", id)
  res.redirect('/project')

}

function handleEditProject(req, res) {
  const { id } = req.params
  data.splice(id, 1)
  console.log("Berhasil Edit", id)
  res.render('edit-project')
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})