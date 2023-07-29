import projects from "./projects.js"
// console.log(projects)

// using URL parameters to pass data between pages

// --------------------------------
// Get parameters from URL
// --------------------------------

// CLEANER SEARCH PARAM METHOD BELOW
// ----------------------
// console.log(window.location.href)

const currentUrl = window.location.href;
// console.log(currentUrl)
const url = new URL(currentUrl);
const modelId = url.searchParams.get("id");
console.log(modelId)

// BRUTE FORCE STRING MANIPULATION METHOD BELOW
// ----------------------
// const paramString = currentUrl.split("?")[1].split("&")
// console.log(paramString)

// var modelId = ""

// for (let param of paramString) {
//     modelId = param.split("=")[1];
//     // console.log(modelId)
// }

//--------------------------------
// Get parameters from URL
//--------------------------------

const modelFrame = document.getElementById("model-iframe")
// console.log(modelFrame.src)

for (let project of projects) {
    // console.log(project["id"] === modelId)
    if (project["id"] === modelId) {
        modelFrame.src = project["url"]
        document.title = "IFC.js - " + project["name"]
    }        
}

// console.log(modelFrame.src)
