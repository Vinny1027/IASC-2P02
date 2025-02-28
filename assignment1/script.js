import * as THREE from "three";
import * as dat from "lil-gui"
import { OrbitControls } from "OrbitControls"

/***********
 ** SETUP **
 ***********/
// Sizes
const sizes = {
    width: window.innerWidth * 0.4,
    height: window.innerHeight,
    aspectRatio: window.innerWidth / innerHeight
}

/***********
 ** SCENE **
 ***********/
// Canvas
const canvas = document.querySelector('.webgl')

// Scene
const scene = new THREE.Scene()
//scene.background = new THREE.Color('black')

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.aspectRatio,
    0.1,
    100
)
scene.add(camera)
camera.position.set(10, 2, 7.5)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/************
 ** MESHES **
 ************/
// Cave
const caveGeometry = new THREE.PlaneGeometry(15.5, 7.5)
const caveMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('white'),
    side: THREE.DoubleSide
})
const cave = new THREE.Mesh(caveGeometry, caveMaterial)
cave.rotation.y = Math.PI * 0.5
cave.receiveShadow = true
scene.add(cave)

// Objects
const torusGeometry = new THREE.TorusGeometry(2, 0.99, 4, 3, 6.283185307179586)
const torusMaterial = new THREE.MeshNormalMaterial()
const torus = new THREE.Mesh(torusGeometry, torusMaterial)
torus.position.set(9, 1.5, 0)
torus.scale.y= 1
torus.scale.x= 1
torus.scale.z= 1
torus.castShadow = true
scene.add(torus)

const icoGeometry = new THREE.IcosahedronGeometry(0.5, 0)
const icoMaterial = new THREE.MeshNormalMaterial()
const ico = new THREE.Mesh(icoGeometry, icoMaterial)
ico.position.set(9, 1.5, 0)
ico.scale.y= 1
ico.scale.x= 1
ico.scale.z= 1
ico.castShadow = true
scene.add(ico)

/************
 ** LIGHTS ** 
 ************/
// Ambient Light
//const ambientLight = new THREE.AmbientLight(0x404040)
//const ambientLight = new THREE.AmbientLight(
//    new THREE.Color('white'))
//scene.add(ambientLight)

// Directional Light
const directionalLight = new THREE.DirectionalLight(
    new THREE.Color('white'),
    0.5
)
scene.add(directionalLight)
directionalLight.position.set(20, 4.1, 0)
directionalLight.target = cave
directionalLight.castShadow = true
directionalLight.shadow.mapSize.width = 1024
directionalLight.shadow.mapSize.height = 1024

// Directional Light Helper
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight)
//scene.add(directionalLightHelper)

/*********************
** DOM INTERACTIONS **
**********************/
const domObject = {
    part: 1,
    firstChange: false,
    secondChange: false,
    thirdChange: false,
    forthChange: false,
}

// part-one
document.querySelector('#part-one').onclick = function() {
    domObject.part = 1
}
// part-two
document.querySelector('#part-two').onclick = function() {
    domObject.part = 2
}

// first-change
document.querySelector('#first-change').onclick = function(){
    domObject.firstChange = true
}
// second-change
document.querySelector('#second-change').onclick = function(){
    domObject.secondChange = true

}

// third-change
document.querySelector('#third-change').onclick = function(){
    domObject.thirdChange = true

}

// forth-change
document.querySelector('#fourth-change').onclick = function(){
    domObject.fourthChange = true
}


/********
 ** UI **
 ********/
// UI
/*
const ui = new dat.GUI()

const lightPositionFolder = ui.addFolder('Light Position')

lightPositionFolder
    .add(directionalLight.position, 'y')
    .min(-10)
    .max(10)
    .step(0.1)
    .name('Y')

    lightPositionFolder
    .add(directionalLight.position, 'z')
    .min(-15)
    .max(15)
    .step(0.1)
    .name('Z')
*/
   
/*******************
** ANIMATION LOOP **
********************/
const clock = new THREE.Clock()

const animation = () =>
{
   
    // Return elapsedTime
    const elapsedTime = clock.getElapsedTime()

    //console.log(camera.position)

    // part-one
    if(domObject.part === 1)
    {
        camera.position.set(6, 0, 0)
        camera.lookAt(0, 0, 0)
    }

    //part-two
    if(domObject.part === 2)
    {
        camera.position.set(15, 1, 9)
        camera.lookAt(0, 0, 0)
    }

    // first-change
    if(domObject.firstChange)
    {
        torus.rotation.z = elapsedTime
    }

    // second-change
    if(domObject.secondChange)
    {
        torus.rotation.y = (elapsedTime)
        ico.position.z = Math.cos(elapsedTime)
    }

    // third-change
    if(domObject.thirdChange)
    {
        torus.position.y = Math.sin(elapsedTime) + 2
        ico.position.y = Math.sin(elapsedTime) + 2

    }

    //forth-change
    if(domObject.fourthChange)
    {
        torus.rotation.y = Math.tan(elapsedTime)  
        ico.position.z = Math.cos(elapsedTime)  

    }

    // Update directionalLightHelper
    directionalLightHelper.update()

    // Update OrbitControls
    controls.update()

    // Renderer
    renderer.render(scene, camera)

    //Request next frame
    window.requestAnimationFrame(animation)
}

animation()