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

// Resizing
window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    sizes.aspectRatio = window.innerWidth / window.innerHeight

    // Update camera
    camera. aspect = sizes.aspectRatio
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

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
camera.position.set(0, 12, -20)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/***********
** LIGHTS ** 
************/
// Directional Light
const directionalLight =  new THREE.DirectionalLight(0x404040, 100)
scene.add(directionalLight)

/************
 ** MESHES **
 ************/
// Cube Geometry
const cubeGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)

const drawCube = (height, params) =>
{
    // Create cube material
    const cubeMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color(params.color)
    })

    // Create cube
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)

    // Position cube
    cube.position.x = (Math.random() - 0.5) * params.diameter
    cube.position.z = (Math.random() - 0.5) * params.diameter
    cube.position.y = height -10

    // Scale cube
    cube.scale.x = params.scale
    cube.scale.y = params.scale
    cube.scale.z = params.scale

    // Randomize cube rotation
    if(params.randomized){
        cube.rotation.x = Math.random() * 2 * Math.PI
        cube.rotation.z = Math.random() * 2 * Math.PI
        cube.rotation.y = Math.random() * 2 * Math.PI
    }

    // Add cube to scene
    params.group.add(cube)    
}

/* drawCube(0, 'maroon')
drawCube(1, '#356c33')
drawCube(2, '#a69446')
drawCube(3, 'navy') */

/********
 ** UI **
 ********/
// UI
const ui = new dat.GUI()

let preset = {}

// Groups
const group1 = new THREE.Group()
scene.add(group1)
const group2 = new THREE.Group()
scene.add(group2)
const group3 = new THREE.Group()
scene.add(group3)


const uiObj = {
    sourceText: "The quick brown fox jumped over the lazy dog.",
    saveSourceText() {
        saveSourceText()
    },
    term1: {
        term: 'orion',
        color: '#4bb5c3',
        group: group1,
        diameter: 10,
        nCubes: 100,
        randomized: true,
        scale: 1
    },
    term2: {
        term: 'optimus',
        color: '#ba0d0d',
        group: group2,
        diameter: 10,
        nCubes: 100,
        randomized: true,
        scale: 1
    },
    term3: {
        term: 'matrix',
        color: '#5567ec',
        group: group3,
        diameter: 10,
        nCubes: 100,
        randomized: true,
        scale: 1
    },
    saveTerms() {
        saveTerms()
    },
    rotateCamera: false
}

// UI Function
const saveSourceText = () =>
{
    // UI
    preset = ui.save()
    textFolder.hide()
    termsFolder.show()
    visualizeFolder.show()

    // Text Analysis
    tokenizeSourceText(uiObj.sourceText)
    //console.log(uiObj.sourceText)
}

const saveTerms = () =>
{
    // UI
    preset = ui.save
    visualizeFolder.hide()
    cameraFolder.show()


    // Testing
    //console.log(uiObj.term1)
    //console.log(uiObj.color1)
    //console.log(uiObj.term2)
    //console.log(uiObj.color2)
    //console.log(uiObj.term3)
    //console.log(uiObj.color3)

    // Text analysis
    findSearchTermInTokenizedText(uiObj.term1)
    findSearchTermInTokenizedText(uiObj.term2)
    findSearchTermInTokenizedText(uiObj.term3)

}

// Text Folder
const textFolder = ui.addFolder("Source Text")

textFolder
    .add(uiObj, 'sourceText')
    .name("Source Text")

textFolder
    .add(uiObj, 'saveSourceText')
    .name("Save")

// Terms, Visualize, and Camera Folders
const termsFolder = ui.addFolder("Search Terms")
const visualizeFolder = ui.addFolder("Visualize")
const cameraFolder = ui.addFolder("Camera")

termsFolder
    .add(uiObj.term1, 'term')
    .name("Term 1")

termsFolder
    .add(group1, 'visible')
    .name("Term 1 Visability")

termsFolder
    .addColor(uiObj.term1, 'color')
    .name("Term Color 1")

termsFolder
    .add(uiObj.term2, 'term')
    .name("Term 2")

termsFolder
    .add(group2, 'visible')
    .name("Term 2 Visability")

termsFolder
    .addColor(uiObj.term2, 'color')
    .name("Term Color 2")

termsFolder
    .add(uiObj.term3, 'term')
    .name("Term 3")

termsFolder
    .add(group3, 'visible')
    .name("Term 3 Visability")

termsFolder
    .addColor(uiObj.term3, 'color')
    .name("Term Color 3")

visualizeFolder
    .add(uiObj, 'saveTerms')
    .name("Visualize")

cameraFolder
    .add(uiObj, 'rotateCamera')
    .name("Turntable")
// Terms, Visualize, Camera folders are hidden by default
termsFolder.hide()
visualizeFolder.hide()
cameraFolder.hide()

/******************
** TEXT ANALYSIS **
*******************/

// Variables
let parsedText, tokenizedText

// Parsed and Tokenize sourceText
const tokenizeSourceText = (sourceText) =>
{
    parsedText = sourceText.replaceAll(".", "").toLowerCase()
    
    // Tokenize text 
    tokenizedText = parsedText.split(/[^\w']+/)
    console.log(tokenizedText)
}

// Find searchTerm in tokenizedText
const findSearchTermInTokenizedText = (params) => 
{
   // Use a for loop to go through the tokenizedText array
    for (let i = 0; i < tokenizedText.length; i++)
    {
        // If tokenizedText[i] matches our searchTerm, then we draw a cube
        if(tokenizedText[i] === params.term){
            // convert i into height, which is a value between 0 and 20
            let height = (i / tokenizedText.length) * 20

            // call drawCube function 100 times using converted height value
            for(let a = 0; a < params.nCubes; a++)
            {
                drawCube(height, params)
            }
        }
    }
}

//findSearchTermInTokenizedText("small", "purple")
//findSearchTermInTokenizedText("autobot", "maroon")
//findSearchTermInTokenizedText("outlier", "orange")
//findSearchTermInTokenizedText("energon", "blue")

/*******************
** ANIMATION LOOP **
********************/
const clock = new THREE.Clock()

const animation = () =>
{
   
    // Return elapsedTime
    const elapsedTime = clock.getElapsedTime()

    // Update OrbitControls
    controls.update()

    // Rotate Camera
    if(uiObj.rotateCamera)
    {
        camera.position.x = Math.sin(elapsedTime * 0.1) * 20
        camera.position.z = Math.cos(elapsedTime * 0.1) * 20
        camera.position.y = 10
        camera.lookAt(0, 0, 0)
    }

    // Renderer
    renderer.render(scene, camera)

    //Request next frame
    window.requestAnimationFrame(animation)
}

animation()