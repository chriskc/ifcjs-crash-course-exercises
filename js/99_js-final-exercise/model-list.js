import projects from "./projects.js"
// console.log(projects)

// const projects = [
//     {"name": "Model 01", "id": "model-1", "url": "https://ifcjs.github.io/ifcjs-crash-course/sample-apps/01/"},
//     {"name": "Model 02", "id": "model-2", "url": "https://ifcjs.github.io/ifcjs-crash-course/sample-apps/02/"},
//     {"name": "Model 03", "id": "model-3", "url": "https://ifcjs.github.io/ifcjs-crash-course/sample-apps/03/"},
//     {"name": "Model 04", "id": "model-4", "url": "https://ifcjs.github.io/ifcjs-crash-course/sample-apps/04/"},
//     {"name": "Model 05", "id": "model-5", "url": "https://ifcjs.github.io/ifcjs-crash-course/sample-apps/05/"}
// ];

// console.log(projects)
// console.log(typeof projects)

// ----------------------------------

// const projectContainer = Array.from(document.getElementsByClassName("project-list"))
const projectContainer = document.getElementById("projects-container");
// console.log(projectContainer);

const projectCards = Array.from(projectContainer.children)
// console.log(projectCards);

const templateCard = document.querySelector('.card');
// console.log(templateCard)

const url = window.location.origin;
// console.log(url);

const baseURL = "./model-viewer.html";
// console.log(baseURL);

// ----------------------------------

function createCard (project) {
    const card = templateCard.cloneNode(true);
    const title = card.querySelector('h2');
    const link = card.querySelector('a');
    // link.href = projects[name];
    link.href = baseURL + "?id=" + project["id"];
    // test for multiple URL parameters
    // link.href = baseURL + "?id=" + project["id"] + "&" + "id2=" + project["id"];
    title.textContent = project["name"];
    
    // console.log(link.href)
    // console.log(title.textContent)
    // console.log(card)
    
    // projectContainer.appendChild(card);
    return card;
}

// ----------------------------------

for (const project of projects) {
    const card = createCard(project);
    projectContainer.appendChild(card);
}

// Remove templateCard
projectContainer.removeChild(templateCard)
// console.log(projectContainer[0])

