import { AmbientLight, AxesHelper, DirectionalLight, GridHelper, MeshLambertMaterial, PerspectiveCamera, Raycaster, Scene, Vector2, WebGLRenderer } from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { IFCLoader } from "web-ifc-three/IFCLoader"
import { acceleratedRaycast, computeBoundsTree, disposeBoundsTree } from "three-mesh-bvh"

//Creates the Three.js scene
const scene = new Scene()

//Object to store the size of the viewport
const size = {
    width: window.innerWidth,
    height: window.innerHeight,
}

//Creates the camera (point of view of the user)
const camera = new PerspectiveCamera(75, size.width / size.height)
camera.position.z = 15
camera.position.y = 13
camera.position.x = 8

//Creates the lights of the scene
const lightColor = 0xffffff

const ambientLight = new AmbientLight(lightColor, 0.5)
scene.add(ambientLight)

const directionalLight = new DirectionalLight(lightColor, 1)
directionalLight.position.set(0, 10, 0)
directionalLight.target.position.set(-5, 0, 0)
scene.add(directionalLight)
scene.add(directionalLight.target)

//Sets up the renderer, fetching the canvas of the HTML
const threeCanvas = document.getElementById("three-canvas")
const renderer = new WebGLRenderer({ canvas: threeCanvas, alpha: true })
renderer.setSize(size.width, size.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

//Creates grids and axes in the scene
const grid = new GridHelper(50, 30)
scene.add(grid)

const axes = new AxesHelper()
axes.material.depthTest = false
axes.renderOrder = 1
scene.add(axes)

//Creates the orbit controls (to navigate the scene)
const controls = new OrbitControls(camera, threeCanvas)
controls.enableDamping = true
controls.target.set(-2, 0, 0)

//Animation loop
const animate = () => {
    controls.update()
    renderer.render(scene, camera)
    requestAnimationFrame(animate)
}

animate()

//Adjust the viewport to the size of the browser
window.addEventListener("resize", () => {
    ;(size.width = window.innerWidth), (size.height = window.innerHeight)
    camera.aspect = size.width / size.height
    camera.updateProjectionMatrix()
    renderer.setSize(size.width, size.height)
})

//Sets up the IFC loading
const loader = new IFCLoader()
// loader.ifcManager.setWasmPath("./")
loader.ifcManager.setupThreeMeshBVH(computeBoundsTree, disposeBoundsTree, acceleratedRaycast)
const ifcModels = []

//  pre-load ifc file for testing
const testModel = await loader.loadAsync("../model-house.ifc")
scene.add(testModel)
ifcModels.push(testModel)

// load ifc file via input button

const input = document.getElementById("file-input")
input.addEventListener(
    "change",
    async (changed) => {
        const ifcURL = URL.createObjectURL(changed.target.files[0])
        const model = await loader.loadAsync(ifcURL)
        scene.add(model)
        ifcModels.push(model)
    },
    false
)

// setup raycaster for selection
const raycaster = new Raycaster()
raycaster.firstHitOnly = true
const mouse = new Vector2()

function cast(event) {
    const bounds = threeCanvas.getBoundingClientRect()
    const x1 = event.clientX - bounds.left
    const x2 = bounds.right - bounds.left
    mouse.x = (x1 / x2) * 2 - 1

    const y1 = event.clientY - bounds.top
    const y2 = bounds.bottom - bounds.top
    mouse.y = -(y1 / y2) * 2 + 1

    raycaster.setFromCamera(mouse, camera)
    const element = raycaster.intersectObjects(ifcModels)[0]

    return element
}

// return id on double click
function pick(event) {
    const found = cast(event)
    if (!found) return

    const index = found.faceIndex
    const geometry = found.object.geometry
    const id = loader.ifcManager.getExpressId(geometry, index)
    console.log(id)
}
threeCanvas.ondblclick = (event) => pick(event)

// generic highlight function
function highlight(event, material, model) {
    const found = cast(event)
    console.log(model.id)
    if (found) {
        model.id = found.object.modelID
        const index = found.faceIndex
        const geometry = found.object.geometry
        const id = loader.ifcManager.getExpressId(geometry, index)

        loader.ifcManager.createSubset({
            modelID: model.id,
            ids: [id],
            material,
            scene,
            removePrevious: true,
        })
    } else {
        loader.ifcManager.removeSubset(model.id, material)
    }
}

// pre-selection
const preselectMaterial = new MeshLambertMaterial({
    transparent: true,
    opacity: 0.6,
    color: 0xff88ff,
    depthTest: false,
})

let preselectModel = { id: - 1 };
window.onmousemove = (event) => highlight(event, preselectMaterial, preselectModel)

// selection
const selectMaterial = new MeshLambertMaterial({
    transparent: true,
    opacity: 0.4,
    color: 0xff33ff,
    depthTest: false,
})

let selectModel = { id: - 1 };
window.ondblclick = (event) => highlight(event, selectMaterial, selectModel)
