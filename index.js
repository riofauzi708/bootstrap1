// Import dependencies
const express = require('express');
const { Sequelize, QueryTypes } = require('sequelize');
const { development } = require('./src/config/config.json');

// Initialize app and database
const app = express();
const port = 3000;
const SequelizePool = new Sequelize(development);
const bcrypt = require('bcrypt');
const session = require('express-session')
const flash = require('express-flash')

// Import models
const Project = require('./src/models/project');
const tb_users = require('./src/models/tb_users');

// Set up Handlebars for template engine
app.set('view engine', 'hbs');
app.set('views', 'src/views');

// Set up middleware
app.use('/assets', express.static('src/assets'));
app.use(express.urlencoded({ extended: false }));
app.use(session({
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 2 * 60 * 60 * 1000
  },
  resave: false,
  store: session.MemoryStore(),
  secret: 'session_storage',
  saveUninitialized: true
}))
app.use(flash())

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
app.post('/register', addRegister)
app.post('/login', addLogin)
app.get('/logout', handleLogout);

const data = [];

// Define route handlers
async function home(req, res) {
  res.render('index', {
    addLogin: req.session.addLogin,
    users: req.session.users
  })
}

async function projectList(req, res) {
  try {
    const projects = await SequelizePool.query(`SELECT tb_projects.*, tb_users.name AS author
    FROM tb_projects
    JOIN tb_users 
    ON tb_projects.author_id = tb_users.id;`, { type: QueryTypes.SELECT})
    res.render('project-list', { data: projects, 
      addLogin: req.session.addLogin,
      users: req.session.users
     });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
}

function contact(req, res) {
  res.render('contact', {addLogin: req.session.addLogin,
    users: req.session.users});
}

async function project(req, res) {
  try {
    const projects = await SequelizePool.query(`SELECT tb_projects.*, tb_users.name AS author
    FROM tb_projects
    JOIN tb_users 
    ON tb_projects.author_id = tb_users.id;`, { type: QueryTypes.SELECT})
    res.render('project', { data: projects, addLogin: req.session.addLogin,
      users: req.session.users });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
}

async function projectDetail(req, res) {
  const { id } = req.params;
  try {
    const query = `SELECT tb_projects.*, tb_users.name AS author
    FROM tb_projects
    JOIN tb_users 
    ON tb_projects.author_id = tb_users.id`;
    const projects = await SequelizePool.query(query, { type: QueryTypes.SELECT });
    res.render('project-detail', { data: projects[0], addLogin: req.session.addLogin,
      users: req.session.users });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
}

function testimonial(req, res) {
  res.render('testimonial', {addLogin: req.session.addLogin,
    users: req.session.users});
}

function login(req, res) {
  res.render('login', {addLogin: req.session.addLogin,
    users: req.session.users})
}

function register(req, res) {
  res.render('register', {addLogin: req.session.addLogin,
    users: req.session.users})
}

async function handlePostProject(req, res) {
  try {
  const { projectName, startDate, endDate, description, nodeJs, nextJs, reactJs, typeScript, uploadImage } = req.body;
  const author_id = req.session.idUser

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

  const query = await SequelizePool.query(`INSERT INTO tb_projects ("projectName", author_id, "startDate", "endDate", duration, description, "nodeJs", "nextJs", "reactJs", "typeScript", "uploadImage") 
        VALUES ('${projectName}', ${author_id},'${startDate}', '${endDate}', ${duration}, '${description}', ${nodeJsString}, ${nextJsString}, ${reactJsString}, ${typeScriptString}, '${uploadImage}')`);
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

async function addRegister(req, res) {
  try {
    const { name, email, password } = req.body
    const salt = 10

    res.redirect('/login')
    bcrypt.hash(password, salt, (err, hashPassword) => {
      const query = SequelizePool.query(`INSERT INTO tb_users ("name", "email", "password")
      VALUES ('${name}', '${email}', '${hashPassword}')`);
      console.log(query);
    })
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error')
  }
}

async function addLogin(req, res) {
  try {
    const { email, password } = req.body
    
    const checkEmail = await SequelizePool.query(`SELECT * FROM tb_users WHERE email = '${email}'`, 
    {type: QueryTypes.SELECT })
    
    if(!checkEmail.length) {
      req.flash('failed', 'Email is not register');
      return res.redirect('/login')
    }
    

    bcrypt.compare(password, checkEmail[0].password, function(err, result) {
      if(!result) {
        return res.redirect("/login")
      } else {
        req.session.addLogin = true
        req.session.users = checkEmail[0].name
        req.session.idUser = checkEmail[0].id
        req.flash('success', 'Welcome..');
        return res.redirect('/')
      }
    });

} catch (error) {
  console.error(error);
  res.status(500).send('Server Error')
}
}

function handleLogout(req, res) {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server Error');
    } else {
      res.redirect('/login');
    }
  });
}

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


 