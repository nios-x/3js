import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 1000);

let loader = new THREE.TextureLoader();
const color = loader.load("./paper/color.jpg");
const roughness = loader.load("./paper/roughness.jpg");
const normals = loader.load("./paper/normal.png");



const boxGeometry = new THREE.BoxGeometry(3, 1.8, 2);
const boxMaterial = new THREE.MeshStandardMaterial({ map: color, roughnessMap: roughness, normalMap: normals});
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);

camera.position.z = 5;

scene.add(boxMesh);

// Add ambient light
const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
scene.add(ambientLight);

// Add directional light
const directionalLight = new THREE.DirectionalLight(0xffffff,3); // White light
directionalLight.position.set(5, 5, 5); // Position the light
scene.add(directionalLight);

// Add directional light
const directionalLight2 = new THREE.DirectionalLight(0xffffff, 3); // White light
directionalLight2.position.set(-5, 5, 5); // Position the light
scene.add(directionalLight2);

const canvas = document.querySelector("canvas");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(innerWidth, innerHeight);
renderer.render(scene, camera);
const controls = new OrbitControls( camera, renderer.domElement );

function animate() {
    boxMesh.rotateY(0.005);
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
animate();
renderer.setClearColor(0xffffff);

window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight; // Fixes on resize
    camera.updateProjectionMatrix(); // Fixes on resize
    renderer.render(scene, camera);
    controls.update();
});
