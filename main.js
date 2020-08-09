function main() {
    function getTHREE() {
        window.THREE = require("three");
        require("three/examples/js/controls/OrbitControls.js");
        return window.THREE;
    }
    var THREE = getTHREE();
    

    let camera,
        renderer,
        scene,
        controls,
        mesh,
        cubeGroup,
        renderOnDemand=true,
        renderRequested=false,
        height=400,
        width=400;
  
    init();
  
    function createCamera() {
        // Create a Camera
        const fov = 25; // AKA Field of View
        const aspect = width / height;
        const near = 0.1; // the near clipping plane
        const far = 1000; // the far clipping plane

        camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        camera.position.set(-4, 2, 4);

    } 
    function createLights() {
        // Create a directional light
        const ambientLight = new THREE.HemisphereLight(0xddeeff, 0x202020, 9);
        const mainLight = new THREE.DirectionalLight(0xffffff, 3.0);
        scene.add(ambientLight);

        // move the light back and up a bit
        mainLight.position.set(10, 10, 10);

        // remember to add the light to the scene
        scene.add(ambientLight, mainLight);
    }
    function createMaterials() {
          const cube =  new THREE.MeshStandardMaterial({
              color: 0xff3333,
              flatShading: true
          })
          cube.color.convertSRGBToLinear();
          return {
              cube
          }
    }
  
    function createGeometries() {
        const cube = new THREE.BoxGeometry( 1, 1, 1 );
        return {
            cube
        }
    }
  
    function createMeshes() {
        const materials = createMaterials();
        const geometries = createGeometries();
        const cubeMesh =  new THREE.Mesh( geometries.cube, materials.cube );
        const group = new THREE.Group();
        group.add(cubeMesh);
        cubeGroup = group;

        // Add the mesh to the scene
        scene.add(group);
    }
  
    function createRenderer() {
        // create the renderer
        const canvas = document.querySelector('#c');
        renderer = new THREE.WebGLRenderer({
            antialias: true,
            canvas: canvas
        });

        renderer.setSize(width, height);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.gammaFactor = 2.2;
        renderer.gammaOutput = true;
        renderer.physicallyCorrectLights = true;
    }
  
    function init() {
          // create a Scene
          scene = new THREE.Scene();
  
          // Set the background color
          scene.background = new THREE.Color('skyblue');
  
          createCamera();
          createLights();
          createMeshes();
          createRenderer();
  
          controls = new THREE.OrbitControls(camera, renderer.domElement);
          // invalidation.then(() => (controls.dispose(), renderer.dispose()));
    }
  
    function render() {
        renderer.render(scene, camera);
    }
  
    function update() {
       /*********** PUT ANIMATION LOGIC HERE **********/
       //cubeGroup.rotation.x += 0.01;
       //cubeGroup.rotation.y += 0.01;
       //cubeGroup.rotation.z += 0.01;
       /***********************************************/
    }
  
    function onWindowResize() {
        camera.aspect = width / height;;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height)
    }
  
    window.addEventListener('resize', onWindowResize)
   
    
    
  
    function animationLoop(){
      update();
      render();
      controls.update()
    }
    

    controls.update()
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 1;
    renderer.setAnimationLoop(animationLoop)
}

main();
