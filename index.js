// Import dependencies
const express = require('express');
const { Sequelize, QueryTypes } = require('sequelize');
const { development } = require('./src/config/config.json');

// Initialize app and database
const app = express();
const port = 3000;
const SequelizePool = new Sequelize(development);

// Import models
const Project = require('./src/models/project');

// Set up Handlebars for template engine
app.set('view engine', 'hbs');
app.set('views', 'src/views');

// Set up middleware
app.use('/assets', express.static('src/assets'));
app.use(express.urlencoded({ extended: false }));

// Define routes
app.get('/', home);
app.get('/home', projectList);
app.get('/contact', contact);
app.get('/project', project);
app.get('/project-detail/:id', projectDetail);
app.get('/testimonial', testimonial);
app.get('/login', login)
app.get('/register', register)
app.get('/delete/:id', handleDeleteProject);
app.get('/edit-project/:id', handleEditProject);
app.post('/project', handlePostProject);
app.post('/home', handlePostProject);


const data = [];

// Define route handlers
async function home(req, res) {
  res.render('index');
}

async function projectList(req, res) {
  try {
    const projects = await SequelizePool.query("SELECT * FROM tb_projects", { type: QueryTypes.SELECT})
    res.render('project-list', { data: projects });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
}

function contact(req, res) {
  res.render('contact');
}

async function project(req, res) {
  try {
    const projects = await SequelizePool.query("SELECT * FROM tb_projects", { type: QueryTypes.SELECT})
    res.render('project', { data: projects });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
}

async function projectDetail(req, res) {
  const { id } = req.params;
  try {
    const query = `SELECT * FROM tb_projects WHERE id = ${id}`;
    const projects = await SequelizePool.query(query, { type: QueryTypes.SELECT });
    res.render('project-detail', { data: projects[0] });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
}

function testimonial(req, res) {
  res.render('testimonial');
}

function login(req, res) {
  res.render('login')
}

function register(req, res) {
  res.render('register')
}

async function handlePostProject(req, res) {
  try {
  const { projectName, startDate, endDate, description, nodeJs, nextJs, reactJs, typeScript, uploadImage } = req.body;
  
   // Konversi nilai boolean ke string untuk kolom yang menggunakan tipe data string di basis data
   const nodeJsString = nodeJs ? 'true' : 'false';
   const nextJsString = nextJs ? 'true' : 'false';
   const reactJsString = reactJs ? 'true' : 'false';
   const typeScriptString = typeScript ? 'true' : 'false';
   
   // Fungsi untuk menghitung selisih bulan antara dua tanggal
   function calculateMonthDifference(startDate, endDate) {
    const startYear = startDate.getFullYear();
    const startMonth = startDate.getMonth();
    const endYear = endDate.getFullYear();
    const endMonth = endDate.getMonth();

    const monthDifference = (endYear - startYear) * 12 + (endMonth - startMonth);

    return monthDifference;
  }

  // Menghitung nilai duration dalam bulan
  const duration = calculateMonthDifference(new Date(startDate), new Date(endDate));

  const logoPlaystore = nodeJs ? '<img class="mx-3" src="assets/img/logo-playstore.png" alt="" width="30" height="30">' : '';
  const logoAndroid = nextJs ? '<img class="mx-3" src="assets/img/logo-android.png" alt="" width="31" height="31">' : '';
  const logoJava = reactJs ? '<img class="mx-3" src="assets/img/logo-java.png" alt="" width="29" height="29">' : '';
  const logoJavascript = typeScript ? '<img class="mx-3" src="assets/img/logo-javascript.png" alt="" width="32" height="32">' : '';

  data.push({
    projectName,
    startDate,
    endDate,
    duration,
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

  const query = await SequelizePool.query(`INSERT INTO tb_projects ("projectName", "startDate", "endDate", duration, description, "nodeJs", "nextJs", "reactJs", "typeScript", "uploadImage") 
        VALUES ('${projectName}', '${startDate}', '${endDate}', ${duration}, '${description}', ${nodeJsString}, ${nextJsString}, ${reactJsString}, ${typeScriptString}, '${uploadImage}')`);
    console.log(query);
    res.redirect('/project');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
}

async function handleDeleteProject(req, res) {
  const { id } = req.params;
  try {
    // Menghapus data dengan ID yang sesuai dari tabel tb_projects
    await SequelizePool.query(`DELETE FROM tb_projects WHERE id = ${id}`);
    console.log("Berhasil Delete", id);
    res.redirect('/project');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
}

async function handleEditProject(req, res) {
  const { id } = req.params;
  try {
    // Menghapus data lama dengan ID yang sesuai dari array data
    const deletedProject = data.splice(id, 1);
    console.log("Berhasil Edit", id);

    // Render halaman edit-project dengan data proyek yang dihapus
    res.render('edit-project', { project: deletedProject[0] });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
}



// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


 