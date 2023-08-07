// // camera - mousemoves control
// import {
//     BoxGeometry,
//     Mesh,
//     MeshBasicMaterial,
//     PerspectiveCamera,
//     Scene,
//     WebGLRenderer,
//     Vector2
// } from 'three';

// // camera - orbit controls
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import {
    Scene,
    BoxGeometry,
    MeshBasicMaterial,
    MeshToonMaterial,
    MeshPhongMaterial,
    Mesh,
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
    Clock,
    DirectionalLight,
    TextureLoader,
    LoadingManager,
} from "three";
import CameraControls from "camera-controls";

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
};

// -----------------------------------------------------
// initialize scene
// -----------------------------------------------------
const canvas = document.getElementById("three-canvas");
const scene = new Scene();

// -----------------------------------------------------
// create cubes
// -----------------------------------------------------

const geometry = new BoxGeometry(0.5, 0.5, 0.5);

// loading progress bar
const loadingManager = new LoadingManager();
const loadingElem = document.querySelector("#loading");
const progressBar = loadingElem.querySelector(".progressbar");

const loader = new TextureLoader(loadingManager);

const materialOrange = new MeshBasicMaterial({
    color: "orange",
    map: loader.load("./sample.jpg"),
    transparent: true,
    opacity: 0.8,
});

const materialBlue = new MeshToonMaterial({
    color: 0x6030ff,
    bumpMap: loader.load("./sample.jpg"),
    bumpScale: 1,
});

const materialRed = new MeshPhongMaterial({
    color: 0xff2211,
    shininess: 150,
    specular: "white",
    // wireframe: true,
    // wireframeLinewidth: 50
});

const cube = new Mesh(geometry, materialOrange);
cube.position.x = 1;
scene.add(cube);

const bigCube = new Mesh(geometry, materialBlue);
bigCube.scale.set(2, 2, 2);
bigCube.position.x = 3;
scene.add(bigCube);

const smallCube = new Mesh(geometry, materialRed);
smallCube.position.x = -0.75;
smallCube.scale.set(1.5, 1.5, 1.5);
scene.add(smallCube);

// -----------------------------------------------------
// create photo cube
// -----------------------------------------------------

// get random images
const images = [];
for (let i = 0; i < 6; i++) {
    images.push(`https://picsum.photos/200/300?random=${i}`);
}

const photoMaterial = [
    new MeshBasicMaterial({ map: loader.load(images[0]) }),
    new MeshBasicMaterial({ map: loader.load(images[1]) }),
    new MeshBasicMaterial({ map: loader.load(images[2]) }),
    new MeshBasicMaterial({ map: loader.load(images[3]) }),
    new MeshBasicMaterial({ map: loader.load(images[4]) }),
    new MeshBasicMaterial({ map: loader.load(images[5]) }),
];
const photoCube = new Mesh(geometry, photoMaterial);
photoCube.position.x = -3;
photoCube.scale.set(2, 2, 2);

loadingManager.onLoad = () => {
    loadingElem.style.display = "none";
    scene.add(photoCube);
};

loadingManager.onProgress = (urlOfLastItemLoaded, itemsLoaded, itemsTotal) => {
    const progress = itemsLoaded / itemsTotal;
    progressBar.style.transform = `scaleX(${progress})`;
};

// -----------------------------------------------------
// setup camera
// -----------------------------------------------------
const camera = new PerspectiveCamera(
    100,
    canvas.clientWidth / canvas.clientHeight
);
camera.position.z = 3; // Z let's you move backwards and forwards. X is sideways, Y is upward and do
scene.add(camera);

// -----------------------------------------------------
// setup view
// -----------------------------------------------------
const renderer = new WebGLRenderer({ canvas });

renderer.render(scene, camera);
renderer.setPixelRatio(2);
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// console.log(window.devicePixelRatio);
// renderer.setPixelRatio(window.devicePixelRatio);

// -----------------------------------------------------
// create lights
// -----------------------------------------------------

const light = new DirectionalLight();
light.position.set(1, 1, 1).normalize();
scene.add(light);

const light2 = new DirectionalLight();
light2.position.set(-1, -3, -2).normalize();
scene.add(light2);

// -----------------------------------------------------
// ensuring resizing window doesn't distort canvas
// -----------------------------------------------------
window.addEventListener("resize", () => {
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
});

//// camera - mousemoves control
// window.addEventListener("mousemove", (event) => {
//     console.log(getMousePosition(event))
//     const position = getMousePosition(event);
//     camera.position.x = Math.sin(position.x * Math.PI * 2) * 3;
//     camera.position.z = Math.cos(position.x * Math.PI * 2) * 3;
//     camera.position.y = position.y;
//     camera.lookAt(cube.position);
// })

// function getMousePosition(event) {
//     const position = new Vector2(0,1);
//     const bounds = canvas.getBoundingClientRect();
//     position.x =((event.clientX - bounds.left) / (bounds.right - bounds.left)) * 2 - 1;
//     position.y = -((event.clientY - bounds.top) / (bounds.bottom - bounds.top)) * 2 + 1;
//     console.log(`mouse x = + ${position.x}`)
//     console.log(`mouse y = + ${position.y}`)

//     return position;
//   }

// // camera - orbit controls
// // left:orbit | right:pan | middle:zoom
// const controls = new OrbitControls(camera, canvas);
// controls.enableDamping = true;

// camera - cameracontrols lib
// left:orbit | right:pan | middle:zoom
CameraControls.install({ THREE: subsetOfTHREE });
const clock = new Clock();
const cameraControls = new CameraControls(camera, canvas);

// animate cubes
function animate() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    bigCube.rotation.x += 0.0075;
    bigCube.rotation.y += 0.0075;
    smallCube.rotation.x += 0.005;
    smallCube.rotation.y += 0.005;
    photoCube.rotation.x += 0.02;
    photoCube.rotation.y += 0.02;
    // controls.update(); // camera - orbit controls
    const delta = clock.getDelta(); // camera - cameracontrols lib
    cameraControls.update(delta); // camera - cameracontrols lib
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

// document.body.appendChild( renderer.domElement );
