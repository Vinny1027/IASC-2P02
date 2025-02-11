import * as THREE from "three";
import * as dat from "lil-gui"
import { OrbitControls } from "OrbitControls"

/***********
 ** SETUP **
 ***********/
// Sizes
const sizes = {
    width: window.innerWidth,
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
scene.background = new THREE.Color('black')

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
    antialias: true
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
//const torusKnotGeometry = new THREE.TorusKnotGeometry(1, 0.2)
//const torusKnotMaterial = new THREE.MeshNormalMaterial()
//const torusKnot = new THREE.Mesh(torusKnotGeometry, torusKnotMaterial)
//torusKnot.position.set(6, 1, 0)
//torusKnot.castShadow = true
//scene.add(torusKnot)

const capsuleGeometry = new THREE.CapsuleGeometry()
const capsuleMaterial = new THREE.MeshNormalMaterial()
const capsule = new THREE.Mesh(capsuleGeometry, capsuleMaterial)
capsule.position.set(6, 3, -3)
capsule.castShadow = true
scene.add(capsule)

const capsule2Geometry = new THREE.CapsuleGeometry()
const capsule2Material = new THREE.MeshNormalMaterial()
const capsule2 = new THREE.Mesh(capsuleGeometry, capsuleMaterial)
capsule2.position.set(6, 3, 3)
capsule2.castShadow = true
scene.add(capsule2)

const torusGeometry = new THREE.TorusGeometry(1, 0.2, 5)
const torusMaterial = new THREE.MeshNormalMaterial()
const torus = new THREE.Mesh(torusGeometry, torusMaterial)
torus.position.set(6, 0.3, 0)
torus.castShadow = true
scene.add(torus)
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

/********
 ** UI **
 ********/
// UI
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

/*******************
** ANIMATION LOOP **
********************/
const clock = new THREE.Clock()

const animation = () =>
{
   
    // Return elapsedTime
    const elapsedTime = clock.getElapsedTime()

    // Animate Objects
    capsule.rotation.x = elapsedTime
    capsule2.rotation.x = elapsedTime
    torus.rotation.y = elapsedTime

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