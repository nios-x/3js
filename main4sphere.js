import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 );
// BOX

// const geometry = new THREE.BoxGeometry( 1, 1, 1 );
// const material = new THREE.MeshBasicMaterial( { color: "salmon" } );
// const cube = new THREE.Mesh( geometry, material );

//capsule

// const geometry = new THREE.CapsuleGeometry( 0.8, 5, 5, 5 ); 
// const material = new THREE.MeshBasicMaterial( {color: "brown",wireframe:true} ); 
// const cube = new THREE.Mesh( geometry, material ); 

const geometry = new THREE.SphereGeometry( 15, 32, 16 ); 
const material = new THREE.MeshBasicMaterial( { color: "red",wireframe: true } ); 
const sphere = new THREE.Mesh( geometry, material );
scene.add( sphere );
camera.position.z = 50;

const canvas = document.querySelector("canvas")
const renderer = new THREE.WebGLRenderer({canvas,antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );
const controls = new OrbitControls( camera, renderer.domElement );

function animate() {
    sphere.rotation.x += 0.04;
    sphere.rotation.y += 0.04;
    controls.update();
    sphere.rotation.z+=0.04;  
    renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );

window.addEventListener("resize",()=>{
  renderer.setSize(window.innerWidth,window.innerHeight)
  camera.aspect = innerWidth/innerHeight;//fixes on resize
  camera.updateProjectionMatrix();//fixes on resize
})