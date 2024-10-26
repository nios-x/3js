//MeshBasicMaterial -> no effect from light dwaws without light
//MeshStandardMAterial -> needs light
//ShaderMAterial -> glsl 
import * as THREE from 'three';

// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);

// Create a cube with MeshStandardMaterial
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: "yellow",metalness:1, roughness:1 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Add a directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // white light
directionalLight.position.set(5, 5, 5).normalize(); // Position the light
scene.add(directionalLight);

// Position the camera
camera.position.z = 5;

// Set up the renderer
const canvas = document.querySelector("canvas");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// Animation loop
function animate() {
  cube.rotation.x += 0.02;
  cube.rotation.y += 0.02;
  renderer.render(scene, camera);
}

// Start the animation loop
renderer.setAnimationLoop(animate);
