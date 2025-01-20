import * as THREE from "three";

/***********
 ** SCENE **
 ***********/
// Canvas
const canvas = document.querySelector('.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color('#6e90b3')

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
)
scene.add(camera)
camera.position.set(0, 0, 5)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(window.innerWidth, window.innerHeight)

/************
 ** MESHES **
 ************/
// testSphere
const sphereGeometry = new THREE.SphereGeometry(1)
const sphereMaterial = new THREE.MeshNormalMaterial()
const testSphere = new THREE.Mesh(sphereGeometry, sphereMaterial)

const sphereGeometry2 = new THREE.SphereGeometry(1)
const sphereMaterial2 = new THREE.MeshNormalMaterial()
const testSphere2 = new THREE.Mesh(sphereGeometry, sphereMaterial)

scene.add(testSphere, testSphere2)

/*******************
** ANIMATION LOOP **
********************/
const clock = new THREE.Clock()

const animation = () =>
{
   
    //Return elapsedTime
    const elapsedTime = clock.getElapsedTime()
    
    //Animate testSphere
    testSphere.position.x = Math.tan(elapsedTime)

   //Animate testSphere2
   testSphere2.position.y = Math.tan(elapsedTime)

    //Renderer
    renderer.render(scene, camera)

    //Request next frame
    window.requestAnimationFrame(animation)
}

animation()