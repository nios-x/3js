import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'; // Import HDR loader
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector("canvas"), antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputEncoding = THREE.sRGBEncoding; // Correct encoding for colors
renderer.toneMapping = THREE.ACESFilmicToneMapping; // Tone mapping for HDR
renderer.toneMappingExposure = 1.5; // Adjust exposure

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Lighting (You can keep these lights for more flexibility in lighting)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft white light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Strong directional light
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

// Load HDRI environment map
const rgbeLoader = new RGBELoader();
rgbeLoader.load('https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/rosendal_plains_2_1k.hdr', function (texture) {
  texture.mapping = THREE.EquirectangularReflectionMapping; // Correct mapping for reflection/refraction
  scene.environment = texture; // Apply HDRI environment
  
});

// Load GLB model
const loader = new GLTFLoader();
loader.load('./tesla.glb', function (gltf) {
  scene.add(gltf.scene);
}, undefined, function (error) {
  console.error(error);
});

// Camera Position
camera.position.set(0, -2, 5);

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

// Resize handling
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
