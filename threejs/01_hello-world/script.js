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
    AmbientLight,
    HemisphereLight,
    DirectionalLightHelper,
    AxesHelper,
    GridHelper,
    HemisphereLightHelper,
    SphereGeometry,
    Object3D,
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

import GUI from "three/examples/jsm/libs/lil-gui.module.min.js";
import gsap from "gsap";

// -----------------------------------------------------
// initialize scene
// -----------------------------------------------------
const canvas = document.getElementById("three-canvas");
const scene = new Scene();

const axesHelper = new AxesHelper();
scene.add(axesHelper);
const gridHelper = new GridHelper();
scene.add(gridHelper);

// -----------------------------------------------------
// create cubes
// -----------------------------------------------------

const geometry = new BoxGeometry(0.5, 0.5, 0.5);

const loader = new TextureLoader();

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
    color: 0xff5555,
    // color: 0xffffff,
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

// loading progress bar
const loadingManager = new LoadingManager();
const loadingElem = document.querySelector("#loading");
const progressBar = loadingElem.querySelector(".progressbar");

const textureLoader = new TextureLoader(loadingManager);
const photoMaterial = [
    new MeshBasicMaterial({ map: textureLoader.load(images[0]) }),
    new MeshBasicMaterial({ map: textureLoader.load(images[1]) }),
    new MeshBasicMaterial({ map: textureLoader.load(images[2]) }),
    new MeshBasicMaterial({ map: textureLoader.load(images[3]) }),
    new MeshBasicMaterial({ map: textureLoader.load(images[4]) }),
    new MeshBasicMaterial({ map: textureLoader.load(images[5]) }),
];

let photoCube;

// -----------------------------------------------------
// create cube collection
// -----------------------------------------------------

const boxCollection = new Object3D();
scene.add(boxCollection);
boxCollection.add(cube, smallCube, bigCube);

// -----------------------------------------------------
// create solar system
// -----------------------------------------------------

const sphereGeometry = new SphereGeometry(0.5);

const solarSystem = new Object3D();
scene.add(solarSystem);

const sunMaterial = new MeshBasicMaterial({ color: "yellow" });
const sunMesh = new Mesh(sphereGeometry, sunMaterial);
solarSystem.add(sunMesh);

const earthMaterial = new MeshBasicMaterial({ color: "blue" });
const earthMesh = new Mesh(sphereGeometry, earthMaterial);
earthMesh.position.set(5, 0, 0);
sunMesh.add(earthMesh);

const moonMaterial = new MeshBasicMaterial({ color: "white" });
const moonMesh = new Mesh(sphereGeometry, moonMaterial);
moonMesh.scale.set(0.5, 0.5, 0.5);
moonMesh.position.set(1, 0, 0);
earthMesh.add(moonMesh);

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
renderer.setClearColor(0xeeeeee, 1);
// renderer.alpha = true; // true == transparent background

// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// console.log(window.devicePixelRatio);
// renderer.setPixelRatio(window.devicePixelRatio);

// -----------------------------------------------------
// create lights
// -----------------------------------------------------

const light = new DirectionalLight();
const lightHelper = new DirectionalLightHelper(light, 1);
light.position.set(1, 20, 1).normalize();
scene.add(light);
scene.add(lightHelper);

// light.target = cube;

// const light2 = new DirectionalLight();
// light2.position.set(-1, -3, -2).normalize();
// scene.add(light2);

// const ambientLight = new AmbientLight(0xffffff, 0.2);
// scene.add(ambientLight);

const hemisphereLight = new HemisphereLight(0xffffff, 0x5533ff);
scene.add(hemisphereLight);
const hemisphereLightHelper = new HemisphereLightHelper(hemisphereLight);
scene.add(hemisphereLightHelper);

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
function animateCubes() {
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
    requestAnimationFrame(animateCubes);
    renderer.render(scene, camera);
}

function animateSolarSystem() {
    sunMesh.rotation.y += 0.005;
    earthMesh.rotation.y += 0.005;

    const delta = clock.getDelta(); // camera - cameracontrols lib
    cameraControls.update(delta); // camera - cameracontrols lib
    requestAnimationFrame(animateSolarSystem);
    renderer.render(scene, camera);
}

animateSolarSystem();

loadingManager.onLoad = () => {
    loadingElem.style.display = "none";

    setTimeout(() => {
        photoCube = new Mesh(geometry, photoMaterial);
        photoCube.position.x = -3;
        photoCube.scale.set(2, 2, 2);
        scene.add(photoCube);
        animateCubes();

        boxCollection.add(photoCube);
        boxCollection.position.set(0, 5, 0);
        // move code into here for timeout
    }, 3000); // simulate an artificial delay
};

loadingManager.onProgress = (urlOfLastItemLoaded, itemsLoaded, itemsTotal) => {
    const progress = itemsLoaded / itemsTotal;
    progressBar.style.transform = `scaleX(${progress})`;
};

// animate();

// document.body.appendChild( renderer.domElement );

// -----------------------------------------------------
// initialize gui -- for debugging
// -----------------------------------------------------

const gui = new GUI();

const functionParam = {
    spin: () => {
        gsap.to(cube.rotation, { y: cube.rotation.y + 10, duration: 1 });
        gsap.to(smallCube.rotation, {
            y: smallCube.rotation.y + 10,
            duration: 1,
        });
        gsap.to(bigCube.rotation, { y: bigCube.rotation.y + 10, duration: 1 });
        gsap.to(photoCube.rotation, {
            y: photoCube.rotation.y + 10,
            duration: 1,
        });
    },
};

const boxCollectionControls = gui.addFolder("boxCollection");
boxCollectionControls
    .add(boxCollection.position, "y")
    .min(-10)
    .max(10)
    .step(0.01)
    .name("boxCollection Y-axis");
boxCollectionControls
    .add(boxCollection, "visible")
    .name("boxCollection visible");
boxCollectionControls.add(functionParam, "spin").name("spin");

const solarSystemControls = gui.addFolder("solarSystem");
solarSystemControls
    .add(solarSystem.rotation, "z")
    .min(-1)
    .max(1)
    .step(0.01)
    .name("z-rotation");

const colorParam = { color: 0xffffff };
solarSystemControls.addColor(colorParam, "color").onChange(() => {
    moonMesh.material.color.set(colorParam.color);
});
