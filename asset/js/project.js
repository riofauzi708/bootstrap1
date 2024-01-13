const projects = [];

function addProject(event) {
  event.preventDefault();

  const projectName = document.getElementById("projectName").value;
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;
  const description = document.getElementById("description").value;
  const nodeJs = document.getElementById("nodeJs").checked;
  const nextJs = document.getElementById("nextJs").checked;
  const reactJs = document.getElementById("reactJs").checked;
  const typeScript = document.getElementById("typeScript").checked;
  let uploadImage = document.getElementById("uploadImage").files;

  uploadImage = URL.createObjectURL(uploadImage[0]);

  const startDateObj = new Date(startDate);
  const endDateObj = new Date(endDate);
  const diffInMonths = (endDateObj.getFullYear() - startDateObj.getFullYear()) * 12 + (endDateObj.getMonth() - startDateObj.getMonth());

  const project = {
    projectName,
    startDate: formatTanggal(startDate),
    endDate: formatTanggal(endDate),
    startDateNumber: startDateObj.getDate(),
    endDateNumber: endDateObj.getDate(),
    duration: diffInMonths,
    description,
    nodeJs,
    nextJs,
    reactJs,
    typeScript,
    uploadImage,
  };

  projects.unshift(project);

  renderProject();
  console.log("projects", projects);
}

function formatTanggal(tanggal) {
  const date = new Date(tanggal);
  const monthNames = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember"
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  return `${date.getDate()} ${month} ${year}`;
}

function renderProject() {
  let html = "";

  for (let index = 0; index < projects.length; index++) {
    html += `


    <div class="card rounded d-flex flex-wrap m-4" style="width: 20rem;">
                    <a href="project-detail.html?startDate=${projects[index].startDate}&endDate=${projects[index].endDate}&duration=${projects[index].duration}">
                        <img src="${projects[index].uploadImage}" class="card-img-top p-3" alt="project image">
                    </a>
                    <div class="card-body">
                        <h3 class="card-title" href="project-detail.html?startDate=${projects[index].startDate}&endDate=${projects[index].endDate}&duration=${projects[index].duration}">${projects[index].projectName}</a></h3>
                        <p class="card-text">durasi : ${projects[index].duration} bulan</p>
                    </div>
                    <div class="card-body">
                        <p class="card-text">${projects[index].description}</p>
                    </div>
                    <div class="d-flex my-2 justify-content-start mx-auto">
                    ${projects[index].nodeJs ? `<img class="mx-3" src="asset/img/logo-playstore.png" alt="" width="30" height="30">` : ''}
                    ${projects[index].nextJs ? `<img class="mx-3" src="asset/img/logo-android.png" alt="" width="31" height="31">` : ''}
                    ${projects[index].reactJs ? `<img class="mx-3" src="asset/img/logo-java.png" alt="" width="29" height="29">` : ''}
                    ${projects[index].typeScript ? `<img class="mx-3" src="asset/img/logo-javascript.png" alt="" width="32" height="32">` : ''}
                    </div>
                    <div class="card-body d-flex">
                        <button class="btn btn-dark w-50 rounded py-0 mx-1">edit</button>
                        <button class="btn btn-dark w-50 rounded py-0 mx-1">delete</button>
                    </div>
                </div>
         `;
  }

  document.getElementById("contents").innerHTML = html;
}

renderProject();