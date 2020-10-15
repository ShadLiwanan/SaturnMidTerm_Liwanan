//IMPORTANT STUFF
const SCENE = new THREE.Scene();
const FOV = 75;
const NEAR = 0.1;
const FAR = 1000;
const MAXPARTICLES = 1000;
const RENDERER = new THREE.WebGLRenderer();
RENDERER.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(RENDERER.domElement);

//CAMERA
let camera = new THREE.PerspectiveCamera(
  FOV,
  window.innerWidth / window.innerHeight,
  NEAR,
  FAR
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 150;
camera.lookAt(new THREE.Vector3(0, 0, 0));

//RING
let particlesGeometry = new THREE.Geometry();
for (let i = 0; i < MAXPARTICLES; i++) {
  let particle = new THREE.Vector3(
    random(-180, 180),
    random(-4.5, 4.5),
    random(-180, 180)
  );
  particlesGeometry.vertices.push(particle);
}
let particleMaterial = new THREE.ParticleBasicMaterial({
  color: 0xF5DEB3,
  size: 1.5,
});
let ringMesh = new THREE.ParticleSystem(particlesGeometry, particleMaterial);
ringMesh.sortParticles = true;
SCENE.add(ringMesh);


//SATURN
let saturnLoader = new THREE.TextureLoader().load('images/saturnTexture.jpg');
let saturnGeometry = new THREE.SphereGeometry( 50, 32, 32 );
let saturnMaterial = new THREE.MeshLambertMaterial( {map: saturnLoader} );
let saturnMesh = new THREE.Mesh( saturnGeometry, saturnMaterial );
SCENE.add( saturnMesh );


//STARFIELD
let starsGeometry  = new THREE.SphereGeometry(250, 32, 32)
let starsMaterial  = new THREE.MeshBasicMaterial()
starsMaterial.map   = THREE.ImageUtils.loadTexture('images/starfieldTexture.png')
starsMaterial.side  = THREE.BackSide
let starsMesh  = new THREE.Mesh(starsGeometry, starsMaterial)
SCENE.add(starsMesh);
starsMesh.position.z=100

//LIGHT
let light = new THREE.AmbientLight( "#FFFFFF" );
SCENE.add( light );

//RANDOM NUMBER GENERATOR
function random(min, max) {
  if (isNaN(max)) {
    max = min;
    min = 0;
  }
  return Math.random() * (max - min) + min;
}

//RENDER LOOP
function render() {
    requestAnimationFrame(render);
    ringMesh.rotation.y += -0.00200;
    saturnMesh.rotation.y += -0.00100;
    starsMesh.rotation.y += -0.0020;
    RENDERER.render(SCENE, camera);
  }
  render();

//RESIZE
function resize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  RENDERER.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", resize, false);