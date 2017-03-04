import videoFXShader from './shaders/videoFX.js';

(function() {

  
// set the scene size
let width = window.innerWidth, 
    height = window.innerHeight;

// set some camera attributes
const VIEW_ANGLE = 45,
  NEAR = 0.1,
  FAR = 10000;
let aspect = width / height;


// get the DOM element
const container = document.querySelector('.container');

// create WebGL renderer, camera, and a scene
const renderer = new THREE.WebGLRenderer();
let camera = new THREE.OrthographicCamera(-0.5, 0.5, -0.5, 0.5, 1, 1000);
const scene = new THREE.Scene();
window.scene = scene;
// create gui

// add camera to scene
scene.add(camera);

// camera starts at 0,0,0, so pull it back
camera.position.z = 1;

// start the renderer
renderer.setSize(width, height);
container.appendChild(renderer.domElement);

// set up plane dimensions
const w = 1.28,
      l = 0.72;

// create the video textures
const strugglinTex = new THREE.VideoTexture(document.querySelector('video#struggle'));
const drankinCreepinTex = new THREE.VideoTexture(document.querySelector('video#drank-creep'));
strugglinTex.minFilter = THREE.LinearFilter;
drankinCreepinTex.minFilter = THREE.LinearFilter;
let planeMaterial = new THREE.ShaderMaterial(videoFXShader);
planeMaterial.uniforms.uVidStruggle.value = strugglinTex;
planeMaterial.uniforms.uVidDrankCreep.value = drankinCreepinTex;

// create mesh with plane geometry
let plane = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(1, 1), 
  planeMaterial
);
plane.name = 'plane';
plane.rotation.x = Math.PI;

scene.add(plane);
showOverlay();
update();

function update() {
  window.requestAnimationFrame(update);
  render();
}

function render() {
  renderer.render(scene, camera);
}

function showOverlay() {
  setTimeout(() => {
    planeMaterial.uniforms.uOverlay.value = true;
    setTimeout(() => { 
      showOverlay();
      planeMaterial.uniforms.uOverlay.value = false;
     }, 100);
  }, Math.random()*2000 + 500)
}

//window.addEventListener('resize', () => {
//  width = window.innerWidth;
//  height = window.innerHeight;
  // camera.aspect = width/height;
  // camera.updateProjectionMatrix();
  // renderer.setSize(width, height);
//})
})();