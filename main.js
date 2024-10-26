import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 0.1, 1000 );




const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: "salmon" } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;


const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

function animate() {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
	renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );

window.addEventListener("resize",()=>{
  renderer.setSize(window.innerWidth,window.innerHeight)
  camera.aspect = innerWidth/innerHeight;//fixes on resize
  camera.updateProjectionMatrix();//fixes on resize
})