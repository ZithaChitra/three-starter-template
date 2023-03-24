import {WebGLRenderer ,Scene, PerspectiveCamera, BoxGeometry, 
MeshBasicMaterial, Mesh, PlaneGeometry} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const app       = document.getElementById('app')
const renderer  = new WebGLRenderer({antialias: true})
renderer.setSize(window.innerWidth, window.innerHeight)
app.appendChild(renderer.domElement)

const fov    = 45
const aspect = window.innerWidth / window.innerHeight
const near   = 0.1
const far    = 100
const camera = new PerspectiveCamera(fov, aspect, near, far)
camera.position.set(0, 10, 30)

const controls = new OrbitControls(camera, app)
controls.addEventListener('change', () => render())

const scene = new Scene()

const boxGeo  = new BoxGeometry(4, 4, 4)
const boxMat  = new MeshBasicMaterial({color: 'green'})
const boxMesh = new Mesh(boxGeo, boxMat);
scene.add(boxMesh)

const planeGeo  = new PlaneGeometry(30, 30, 1, 1)
const planeMat  = new MeshBasicMaterial({color: 'white'})
const planeMesh = new Mesh(planeGeo, planeMat)
planeMesh.castShadow    = false
planeMesh.receiveShadow = true
planeMesh.rotateX(-Math.PI / 2)
scene.add(planeMesh)

function render(){
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.render(scene, camera)
    requestAnimationFrame(() => render())
}

document.addEventListener('resize', () => render())

function main(){
    render()
}


main()


