import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as THREE from "three"
const scene  =  new THREE.Scene();
const camera  =  new THREE.PerspectiveCamera(70, innerWidth/innerHeight, 0.1, 1000)

const canvas = document.querySelector("canvas");
const renderer = new THREE.WebGLRenderer({canvas,antialias:true})
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.1;

for (let a=0; a<9; a++){
    const boxGeometry = new THREE.BoxGeometry(Math.random()+1,Math.random()+1,Math.random()+1)
    const boxMaterial = new THREE.MeshBasicMaterial({color:`hsl(${Math.random()*100},${Math.random()*100}, ${Math.random()*100})`});
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    
    scene.add(boxMesh)
    boxMesh.position.x=10*Math.random();
    boxMesh.position.y=10*Math.random();
    boxMesh.position.z=10*Math.random();
}
camera.position.z+=10;



renderer.setSize(innerWidth, innerHeight)
renderer.render(scene, camera)
function animate(){
    controls.update()
    requestAnimationFrame(animate)

}animate()

