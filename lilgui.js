import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"; // Corrected import
import * as dat from 'dat.gui'; // Import dat.GUI

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 1000);

let loader = new THREE.TextureLoader();
const color = loader.load("./paper/color.jpg");
const roughness = loader.load("./paper/roughness.jpg");
const normals = loader.load("./paper/normal.png");

const boxGeometry = new THREE.BoxGeometry(3, 1.8, 2);
const boxMaterial = new THREE.MeshStandardMaterial({ 
    map: color, 
    roughnessMap: roughness, 
    normalMap: normals,
    metalness: 0, // Initial metalness value
    roughness: 1 // Initial roughness value
});
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);

camera.position.z = 5;

scene.add(boxMesh);

// Add ambient light
const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
scene.add(ambientLight);

// Add directional lights
const directionalLight = new THREE.DirectionalLight(0xffffff, 3); // White light
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

const directionalLight2 = new THREE.DirectionalLight(0xffffff, 3); // White light
directionalLight2.position.set(-5, 5, 5);
scene.add(directionalLight2);

const canvas = document.querySelector("canvas");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(innerWidth, innerHeight);
renderer.setClearColor(0xffffff); // Set background color to white

const controls = new OrbitControls(camera, renderer.domElement);

const gui = new dat.GUI(); // Create a new GUI instance

// Light intensity controls
const lightFolder = gui.addFolder('Light Intensity');
lightFolder.add(directionalLight, 'intensity', 0, 5).name('Directional Light 1');
lightFolder.add(directionalLight2, 'intensity', 0, 5).name('Directional Light 2');
lightFolder.open();

// Rotation speed control
const params = { rotationSpeed: 0.005, metalness: 0, roughness: 1 }; // Added roughness
gui.add(params, 'rotationSpeed', 0, 0.1).name('Rotation Speed');
gui.add(params, 'metalness', 0, 1).name('Metalness').onChange(value => {
    boxMaterial.metalness = value; // Update metalness on change
});
gui.add(params, 'roughness', 0, 1).name('Roughness').onChange(value => {
    boxMaterial.roughness = value; // Update roughness on change
});

function animate() {
    boxMesh.rotation.y += params.rotationSpeed; // Use rotationSpeed from GUI
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
animate();

window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight; // Fixes on resize
    camera.updateProjectionMatrix(); // Fixes on resize
    renderer.render(scene, camera);
    controls.update();
});
