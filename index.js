const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'hbs');
app.set('views', 'src/views');

app.use('/assets', express.static('src/assets'));
app.use(express.urlencoded({ extended: false }));

app.get('/home', home);
app.get('/contact', contact);
app.get('/project', project);
app.get('/project-detail', projectDetail);
app.get('/project-detail/:id', projectDetail);
app.get('/testimonial', testimonial);
app.post('/project', handlePostProject);
app.get('/delete/:id', handleDeleteProject);
app.get('/edit-project/:id', handleEditProject);

const data = [];

function home(req, res) {
  res.render('index');
}

function contact(req, res) {
  res.render('contact');
}

function project(req, res) {
  res.render('project', { data });
}

function projectDetail(req, res) {
  const { id } = req.params;
  const dataDetail = data[id];
  res.render('project-detail', { id: dataDetail });
}

function testimonial(req, res) {
  res.render('testimonial');
}

function handlePostProject(req, res) {
  const { projectName, startDate, endDate, description, nodeJs, nextJs, reactJs, typeScript, uploadImage } = req.body;

  const startDateObj = new Date(startDate);
  const endDateObj = new Date(endDate);
  const diffInMonths = (endDateObj.getFullYear() - startDateObj.getFullYear()) * 12 + (endDateObj.getMonth() - startDateObj.getMonth());

  const logoPlaystore = nodeJs ? '<img class="mx-3" src="assets/img/logo-playstore.png" alt="" width="30" height="30">' : '';
  const logoAndroid = nextJs ? '<img class="mx-3" src="assets/img/logo-android.png" alt="" width="31" height="31">' : '';
  const logoJava = reactJs ? '<img class="mx-3" src="assets/img/logo-java.png" alt="" width="29" height="29">' : '';
  const logoJavascript = typeScript ? '<img class="mx-3" src="assets/img/logo-javascript.png" alt="" width="32" height="32">' : '';

  data.push({
    projectName,
    startDate,
    endDate,
    duration: diffInMonths,
    description,
    nodeJs,
    nextJs,
    reactJs,
    typeScript,
    uploadImage,
    logoPlaystore,
    logoAndroid,
    logoJava,
    logoJavascript,
  });


  res.redirect('/project');
}

function handleDeleteProject(req, res) {
  const { id } = req.params;
  data.splice(id, 1);
  console.log("Berhasil Delete", id);
  res.redirect('/project');
}

function handleEditProject(req, res) {
  const { id } = req.params;
  data.splice(id, 1);
  console.log("Berhasil Edit", id);
  res.render('edit-project');
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});