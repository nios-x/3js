import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
let scene  =  new THREE.Scene();
let camera  = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.1, 1000);

let boxGeometry = new THREE.BoxGeometry(1,1,1);
let boxMaterial = new THREE.MeshBasicMaterial();
let boxMesh = new THREE.Mesh(boxGeometry, boxMaterial)

scene.add(boxMesh) 

const canvas = document.querySelector("canvas");

camera.position.z+=5




const renderer = new THREE.WebGLRenderer({canvas , antialias: true});
const controls = new OrbitControls( camera, renderer.domElement );



controls.enableDamping = true;//smooth
controls.dampingFactor=0.02//smooth
controls.enableZoom();

renderer.setSize( window.innerWidth, window.innerHeight );
function animate(){
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate)
}animate()