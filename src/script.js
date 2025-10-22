import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
* Textures
*/
const textureLoader = new THREE.TextureLoader()
const colorMap = textureLoader.load('Bricks/BricksLongThinRunningExtruded001_COL_1K_METALNESS.png');
colorMap.wrapS = colorMap.wrapT = THREE.MirroredRepeatWrapping;
colorMap.repeat.set(4, 4);

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3)
const ambientLightFolder = gui.addFolder('Ambient Light')
ambientLightFolder.addColor(ambientLight, 'color').name('Ambient Light Color')
ambientLightFolder.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3)
directionalLight.position.set(2, 2, - 1)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.width = 1024
directionalLight.shadow.mapSize.height = 1024
directionalLight.shadow.camera.near = 1
directionalLight.shadow.camera.far = 6
directionalLight.shadow.camera.left = - 2
directionalLight.shadow.camera.right = 2
directionalLight.shadow.camera.top = 2
directionalLight.shadow.camera.bottom = - 2
directionalLight.shadow.radius = 10
const directionalLightFolder = gui.addFolder('Directional Light')   
directionalLightFolder.addColor(directionalLight, 'color').name('Directional Light Color')
directionalLightFolder.add(directionalLight, 'intensity').min(0).max(1).step(0.001)
const dirLightFolder = directionalLightFolder.addFolder('Position')
dirLightFolder.add(directionalLight.position, 'x').min(-5).max(5).step(0.001).name('DirLight X Position')
dirLightFolder.add(directionalLight.position, 'y').min(-5).max(5).step(0.001).name('DirLight Y Position')
dirLightFolder.add(directionalLight.position, 'z').min(-5).max(5).step(0.001).name('DirLight Z Position')
scene.add(directionalLight)

// Helper
const directionalLightCameraHelper = new
THREE.CameraHelper(directionalLight.shadow.camera)
directionalLightCameraHelper.visible = false
const dirLightHelperFolder = gui.addFolder('Directional Light Camera Helper')
dirLightHelperFolder.addColor(directionalLightCameraHelper.material, 'color').name('DirLight Camera Helper Color')
dirLightHelperFolder.add(directionalLightCameraHelper, 'visible').name('DirLight Camera Helper')
scene.add(directionalLightCameraHelper)

// Spot light
const spotLight = new THREE.SpotLight(0xffffff, 0.4, 10, Math.PI * 0.3)
spotLight.castShadow = true
spotLight.position.set(0, 2, 2)
spotLight.shadow.mapSize.width = 1024
spotLight.shadow.mapSize.height = 1024
spotLight.shadow.camera.near = 1
spotLight.shadow.camera.far = 6
spotLight.shadow.camera.fov = 30
spotLight.shadow.radius = 10
const spotLightFolder = gui.addFolder('Spot Light')
spotLightFolder.addColor(spotLight, 'color').name('Spot Light Color')
spotLightFolder.add(spotLight, 'intensity').min(0).max(1).step(0.001)
spotLightFolder.add(spotLight.position, 'x').min(-5).max(5).step(0.001).name('SpotLight X Position')
spotLightFolder.add(spotLight.position, 'y').min(-5).max(5).step(0.001).name('SpotLight Y Position')
spotLightFolder.add(spotLight.position, 'z').min(-5).max(5).step(0.001).name('SpotLight Z Position')
scene.add(spotLight)
scene.add(spotLight.target)

const spotLightCameraHelper = new
THREE.CameraHelper(spotLight.shadow.camera)
spotLightCameraHelper.visible = false
const spotLightHelperFolder = gui.addFolder('Spot Light Camera Helper')
spotLightHelperFolder.addColor(spotLightCameraHelper.material, 'color').name('SpotLight Camera Helper Color')
spotLightHelperFolder.add(spotLightCameraHelper, 'visible').name('SpotLight Camera Helper')
scene.add(spotLightCameraHelper)

// Point light
const pointLight = new THREE.PointLight(0xffffff, 0.3)
pointLight.castShadow = true
pointLight.position.set(- 1, 3.6, 0)
pointLight.shadow.mapSize.width = 1024
pointLight.shadow.mapSize.height = 1024
pointLight.shadow.camera.near = 0.1
pointLight.shadow.camera.far = 5
pointLight.shadow.radius = 10
const pointLightFolder = gui.addFolder('Point Light')
pointLightFolder.addColor(pointLight, 'color').name('Point Light Color')
pointLightFolder.add(pointLight, 'intensity').min(0).max(1).step(0.001)
pointLightFolder.add(pointLight.position, 'x').min(-5).max(5).step(0.001).name('PointLight X Position')
pointLightFolder.add(pointLight.position, 'y').min(-5).max(5).step(0.001).name('PointLight Y Position')
pointLightFolder.add(pointLight.position, 'z').min(-5).max(5).step(0.001).name('PointLight Z Position')
scene.add(pointLight)

const pointLightCameraHelper = new
THREE.CameraHelper(pointLight.shadow.camera)
pointLightCameraHelper.visible = false
const pointLightHelperFolder = gui.addFolder('Point Light Camera Helper')
pointLightHelperFolder.addColor(pointLightCameraHelper.material, 'color').name('PointLight Camera Helper Color')
pointLightHelperFolder.add(pointLightCameraHelper, 'visible').name('PointLight Camera Helper')
scene.add(pointLightCameraHelper)


/**
 * Materials
 */
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.7
const materialFolder = gui.addFolder('Material')
materialFolder.add(material, 'metalness').min(0).max(1).step(0.001)
materialFolder.add(material, 'roughness').min(0).max(1).step(0.001)

/**
 * Objects
 */

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
    
)
sphere.castShadow = true

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5, 256, 256),
    new THREE.MeshStandardMaterial({
        map: textureLoader.load('https://raw.githubusercontent.com/ClideHiraji/Jagape-ITE18-Act2.2/main/static/Bricks/BricksLongThinRunningExtruded001_COL_1K_METALNESS.png'),
        aoMap: textureLoader.load('https://raw.githubusercontent.com/ClideHiraji/Jagape-ITE18-Act2.2/main/static/Bricks/BricksLongThinRunningExtruded001_AO.png'),
        normalMap: textureLoader.load('https://raw.githubusercontent.com/ClideHiraji/Jagape-ITE18-Act2.2/main/static/Bricks/BricksLongThinRunningExtruded001_NRM_1K_METALNESS.png'),
        roughnessMap: textureLoader.load('https://raw.githubusercontent.com/ClideHiraji/Jagape-ITE18-Act2.2/main/static/Bricks/BricksLongThinRunningExtruded001_ROUGHNESS_1K_METALNESS.png'),
        bumpMap: textureLoader.load('https://raw.githubusercontent.com/ClideHiraji/Jagape-ITE18-Act2.2/main/static/Bricks/BricksLongThinRunningExtruded001_BUMP_1K_METALNESS.png'),
        displacementMap: textureLoader.load('https://raw.githubusercontent.com/ClideHiraji/Jagape-ITE18-Act2.2/main/static/Bricks/BricksLongThinRunningExtruded001_DISP_1K_METALNESS.png'),
        metalnessMap: textureLoader.load('https://raw.githubusercontent.com/ClideHiraji/Jagape-ITE18-Act2.2/main/static/Bricks/BricksLongThinRunningExtruded001_METALNESS_1K_METALNESS.png'),
        idmap: textureLoader.load('https://raw.githubusercontent.com/ClideHiraji/Jagape-ITE18-Act2.2/main/static/Bricks/BricksLongThinRunningExtruded001_IDMAP_1K_METALNESS.png'),
        displacementScale: 0.1,
        metalness: 0.2,
        roughness: 0.5,
        bumpScale: 0.5
    }),
    material
)
plane.geometry.attributes.uv2 = plane.geometry.attributes.uv;
plane.receiveShadow = true
plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.1

scene.add(sphere, plane)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(1, 1, 2)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()
    
    // Update objects
    sphere.position.x = Math.cos(elapsedTime) * 1.5
    sphere.position.z = Math.sin(elapsedTime) * 1.5
    sphere.position.y = Math.abs(Math.sin(elapsedTime * 3)) + 0.5  
    sphere.rotation.y += 0.01
    
    // Render
    renderer.shadowMap.enabled = true
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
