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
scene.background = new THREE.Color('gray')

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.aspectRatio,
    0.1,
    100
)
scene.add(camera)
camera.position.set(0, 3, 5)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/************
 ** MESHES **
 ************/
// TorusKnot

const geometry = new THREE.TorusKnotGeometry(1, 0.2, 24, 32)
const material = new THREE.MeshNormalMaterial()
const knot = new THREE.Mesh(geometry, material)

scene.add(knot)

// Plane
const planeGeometry = new THREE.PlaneGeometry(10, 10, 50, 50)
const planeMaterial = new THREE.MeshBasicMaterial({
    color: new THREE.Color('#426384'),
    side: THREE.DoubleSide,
    wireframe: true
})
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
plane.rotation.x = Math.PI * 0.5

scene.add(plane)

/********
 ** UI **
 ********/
// UI
const ui = new dat.GUI()

// UI Object
const uiObject = {
    speed: 1,
    distance: 0.1,
    rotationSpeed: 1
}

// plane ui
const planeFolder = ui.addFolder('Plane')
planeFolder
    .add(planeMaterial, 'wireframe')
    .name('Toggle Wireframe')

// TorusKnot UI
const knotFolder = ui.addFolder('Knot')

knotFolder
    .add(uiObject, 'speed')
    .min(0.1)
    .max(20)
    .name('Speed')

knotFolder  
    .add(uiObject, 'distance')
    .min(0.1)
    .max(5)
    .name('Distance')

knotFolder  
    .add(uiObject, 'rotationSpeed')
    .min(0.1)
    .max(20)
    .name('Rotation Speed')
    
/*******************
** ANIMATION LOOP **
********************/
const clock = new THREE.Clock()

const animation = () =>
{
  
    // Return elapsedTime
    const elapsedTime = clock.getElapsedTime()

      // Rotate Knot 
      const rotationSpeed = 1
      knot.rotation.x = elapsedTime * uiObject.rotationSpeed
      knot.rotation.y = elapsedTime * uiObject.rotationSpeed
      knot.rotation.z = elapsedTime * uiObject.rotationSpeed

    // Animate Knot
    knot.position.y = Math.sin(elapsedTime * uiObject.speed) * uiObject.distance


    // Update OrbitControls
    controls.update()

    // Renderer
    renderer.render(scene, camera)

    //Request next frame
    window.requestAnimationFrame(animation)
}

animation()