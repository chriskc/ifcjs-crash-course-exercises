import projects from "./projects.js"

import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    MOUSE,
    Vector2,
    Vector3,
    Vector4,
    Quaternion,
    Matrix4,
    Spherical,
    Box3,
    Sphere,
    Raycaster,
    MathUtils,
    DirectionalLight,
    HemisphereLight,
    DirectionalLightHelper,
    AxesHelper,
    GridHelper,
    HemisphereLightHelper,
    SphereGeometry,
    BoxGeometry,
    MeshLambertMaterial,
    Mesh,
    Clock,
    Color,
} from "three"

const subsetOfTHREE = {
    MOUSE,
    Vector2,
    Vector3,
    Vector4,
    Quaternion,
    Matrix4,
    Spherical,
    Box3,
    Sphere,
    Raycaster,
    MathUtils: {
        DEG2RAD: MathUtils.DEG2RAD,
        clamp: MathUtils.clamp,
    },
}

import CameraControls from "camera-controls"

// console.log(projects)

// using URL parameters to pass data between pages

// --------------------------------
// Get parameters from URL
// --------------------------------

// CLEANER SEARCH PARAM METHOD BELOW
// ----------------------

const currentUrl = window.location.href
// console.log(currentUrl)
const url = new URL(currentUrl)
const modelId = url.searchParams.get("id")
// console.log(modelId)

//--------------------------------
// Get parameters from URL
//--------------------------------

// const modelFrame = document.getElementById("model-iframe")
// // console.log(modelFrame.src)

for (let project of projects) {
    // console.log(project["id"] === modelId)
    if (project["id"] === modelId) {
        // modelFrame.src = project["url"]
        document.title = "IFC.js - " + project["name"]
        document.getElementsByClassName("simple-card")[0].textContent = project["name"]
    }
}
// console.log(modelFrame.src)

//--------------------------------
// Setup threejs viewer
//--------------------------------

const canvas = document.getElementById("three-canvas")
const scene = new Scene()
scene.background = new Color(0x220022)

const axes = new AxesHelper()
axes.material.depthTest = false
axes.renderOrder = 1
const grid = new GridHelper()
scene.add(axes)
scene.add(grid)

const camera = new PerspectiveCamera(90, canvas.clientWidth / canvas.clientHeight)
console.log(camera)
camera.position.set(10, 10, 15)
scene.add(camera)

const renderer = new WebGLRenderer({ canvas })
renderer.render(scene, camera)
// pixelRatio = condition ? valueIfTrue : valueIfFalse
// pixelRatio = window.devicePixelRatio > 2 ? 2 : window.devicePixelRatio
const pixelRatio = Math.min(window.devicePixelRatio, 2) // take the smaller pixelRatio, either 2 or window.devicePixelRatio
renderer.setPixelRatio(pixelRatio)
renderer.setSize(canvas.clientWidth, canvas.clientHeight, false) // this renders crisp on load

window.addEventListener("resize", () => {
    camera.aspect = canvas.clientWidth / canvas.clientHeight
    camera.updateProjectionMatrix()
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false)
})

CameraControls.install({ THREE: subsetOfTHREE })
const clock = new Clock()
const cameraControls = new CameraControls(camera, canvas)

//--------------------------------
// Create lights
//--------------------------------

const hemisphereLight = new HemisphereLight(0xffffff, 0x5533ff)
hemisphereLight.position.set(-2, 5, -3)
console.log(hemisphereLight.position)
scene.add(hemisphereLight)
const hemisphereLightHelper = new HemisphereLightHelper(hemisphereLight)
scene.add(hemisphereLightHelper)

//--------------------------------
// Create geometry
//--------------------------------

const geo = new BoxGeometry(2, 2, 2)
const mat = new MeshLambertMaterial({ color: 0xeeeeee, emissive: "purple" })
const box = new Mesh(geo, mat)
box.position.y = 2
scene.add(box)

//--------------------------------
// Animate
//--------------------------------

function animate() {
    const delta = clock.getDelta()
    cameraControls.update(delta)
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
}

animate()
