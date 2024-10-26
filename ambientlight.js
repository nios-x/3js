import * as THREE from "three";
// 1
let light = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(light) //many direction light

// 2
let light2 = new THREE.DirectionalLight(0xffffff, 0.5)
light2.position.set(10,10,10)
scene.add(light2) //many direction light

let light3 = new THREE.PointLight(0xffffff, 1, 100)
light3.position.set(10,10,10)
scene.add(light);