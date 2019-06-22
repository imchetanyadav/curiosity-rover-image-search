var renderer = new THREE.WebGLRenderer({
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.shadowMap.enabled = true;

var updateFcts = [];
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.01,
  100
);
camera.position.z = 3;
var light = new THREE.AmbientLight(0x888888);
scene.add(light);
// var light	= new THREE.DirectionalLight( 'white', 1)
// light.position.set(5,5,5)
// light.target.position.set( 0, 0, 0 )
// scene.add( light )
var light = new THREE.DirectionalLight(0xcccccc, 1);
light.position.set(5, 5, 5);
scene.add(light);
light.castShadow = true;
light.shadow.camera.near = 0.01;
light.shadow.camera.far = 15;
light.shadow.camera.fov = 45;
light.shadow.camera.left = -1;
light.shadow.camera.right = 1;
light.shadow.camera.top = 1;
light.shadow.camera.bottom = -1;
// light.shadowCameraVisible	= true
light.shadow.bias = 0.001;
// light.shadow.darkness = 0.2;
light.shadow.mapSize.width = 1024;
light.shadow.mapSize.height = 1024;
//////////////////////////////////////////////////////////////////////////////////
//		add an object and make it move					//
//////////////////////////////////////////////////////////////////////////////////
// var mesh	= THREEx.Planets.createSun()
// scene.add(mesh)
// var mesh	= THREEx.Planets.createMercury()
// scene.add(mesh)
// var mesh	= THREEx.Planets.createVenus()
// scene.add(mesh)
// var mesh	= THREEx.Planets.createMoon()
// scene.add(mesh)
// var earthMesh = THREEx.Planets.createEarth();
// scene.add(earthMesh);
// var mesh = THREEx.Planets.createEarthCloud();
// scene.add(mesh);
// updateFcts.push(function(delta, now) {
//   mesh.rotation.y += (1 / 8) * delta;
// });
var mars	= THREEx.Planets.createMars()
mars.scale.set(2,2,2)
scene.add(mars)
// var mesh	= THREEx.Planets.createJupiter()
// scene.add(mesh)
// var mesh	= THREEx.Planets.createSaturn()
// mesh.receiveShadow	= true
// mesh.castShadow		= true
// scene.add(mesh)
// var mesh	= THREEx.Planets.createSaturnRing()
// mesh.receiveShadow	= true
// mesh.castShadow		= true
// scene.add(mesh)
// var mesh	= THREEx.Planets.createUranus()
// mesh.receiveShadow	= true
// mesh.castShadow		= true
// scene.add(mesh)
// var mesh	= THREEx.Planets.createUranusRing()
// mesh.receiveShadow	= true
// mesh.castShadow		= true
// scene.add(mesh)
// var mesh	= THREEx.Planets.createNeptune()
// scene.add(mesh)
// var mesh	= THREEx.Planets.createPluto()
// scene.add(mesh)
var starfield	= THREEx.Planets.createStarfield()
scene.add(starfield)

updateFcts.push(function(delta, now) {
  mars.rotation.x += 1/8 * delta;
  mars.rotation.y += 1/16 * delta;
  starfield.rotation.x += 1/100 * delta;
  starfield.rotation.y += 1/200 * delta;
});

//////////////////////////////////////////////////////////////////////////////////
//		Camera Controls							//
//////////////////////////////////////////////////////////////////////////////////
var mouse = { x: 0, y: 0 };
document.addEventListener(
  "mousemove",
  function(event) {
    mouse.x = event.clientX / window.innerWidth - 0.5;
    mouse.y = event.clientY / window.innerHeight - 0.5;
  },
  false
);
updateFcts.push(function(delta, now) {
  camera.position.x += (mouse.x * 5 - camera.position.x) * (delta * 3);
  camera.position.y += (mouse.y * 5 - camera.position.y) * (delta * 3);
  camera.lookAt(scene.position);
});
//////////////////////////////////////////////////////////////////////////////////
//		render the scene						//
//////////////////////////////////////////////////////////////////////////////////
updateFcts.push(function() {
  renderer.render(scene, camera);
});

//////////////////////////////////////////////////////////////////////////////////
//		loop runner							//
//////////////////////////////////////////////////////////////////////////////////
var lastTimeMsec = null;
requestAnimationFrame(function animate(nowMsec) {
  // keep looping
  requestAnimationFrame(animate);
  // measure time
  lastTimeMsec = lastTimeMsec || nowMsec - 1000 / 60;
  var deltaMsec = Math.min(200, nowMsec - lastTimeMsec);
  lastTimeMsec = nowMsec;
  // call each update function
  updateFcts.forEach(function(updateFn) {
    updateFn(deltaMsec / 1000, nowMsec / 1000);
  });
});
