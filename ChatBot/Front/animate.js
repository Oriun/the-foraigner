// Set our main variables
let scene,  
  renderer,
  camera,
  model,                              // Our character
  neck,                               // Reference to the neck bone in the skeleton
  waist,                               // Reference to the waist bone in the skeleton
  possibleAnims,                      // Animations found in our file
  mixer,                              // THREE.js animations mixer
  idle,                               // Idle, the default state our character returns to
  clock = new THREE.Clock(),          // Used for anims, which run to a clock instead of frame rate 
  currentlyAnimating = false,         // Used to check whether characters neck is being used in another anim
  raycaster = new THREE.Raycaster(),  // Used to detect the click on our character
  loaderAnim = document.getElementById('js-loader'),
  ArrayStars = []


// const MODEL_PATH = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1376484/stacy_lightweight.glb';
// const MODEL_PATH = 'D:/chatbot/Front/stacy_lightweight.glb';
const MODEL_PATH = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1376484/stacy_lightweight.glb';
const MODEL_PATH2 = 'assets/montoucan.glb';

// import Model_test from "./assets/stacy_lightweight.glb"

const canvas = document.querySelector('#c');

// Init the scene
scene = new THREE.Scene();
// scene.background = new THREE.Color(backgroundColor);
// scene.fog = new THREE.Fog(backgroundColor, 60, 100);


//create scene avec arbre
// const texture = new THREE.TextureLoader();
// bgTexture = texture.load('https://images.pexels.com/photos/77551/pexels-photo-77551.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' , function(texture)
// {
//     var img = texture.image;
//     bgWidth= img.width;
//     bgHeight = img.height;
// });

// scene.background = bgTexture;
// bgTexture.wrapS = THREE.MirroredRepeatWrapping;
// bgTexture.wrapT = THREE.MirroredRepeatWrapping;



const backgroundColor = 0xf4edea;
scene.background = new THREE.Color(backgroundColor);


// // Lights
// const pointLight = new THREE.PointLight(0xffffff);
// pointLight.position.set(5, 5, 5);

// const ambientLight = new THREE.AmbientLight(0xffffff);
// scene.add(pointLight, ambientLight);





// ArrayStars = new THREE.SphereGeometry(0.25, 24, 24);
// for(let i=0;i<6000;i++) {
//     let star = new THREE.Vector3(
//     Math.random() * 600 - 300,
//     Math.random() * 600 - 300,
//     Math.random() * 600 - 300
//   );
//   ArrayStars.vertices.push(star);
// }

// scene.add(ArrayStars)



function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  // const geometry = new THREE.IcosahedronGeometry(10, 0);

  const material = new THREE.MeshBasicMaterial({ color: 0x12263a });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.Math.randFloatSpread(55));

  star.position.set(x, y, z);
  scene.add(star);
  ArrayStars.push(star)
}

Array(75).fill().forEach(addStar);




// Init the renderer
renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.shadowMap.enabled = true;
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// Add a camera
camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 35;
camera.position.x = 15;
camera.position.y = -5;


// Add lights
let hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.61);
hemiLight.position.set(0, 50, 0);
// Add hemisphere light to scene
scene.add(hemiLight);

let d = 8.25;
let dirLight = new THREE.DirectionalLight(0xffffff, 0.54);
dirLight.position.set(-8, 12, 8);
dirLight.castShadow = true;
dirLight.shadow.mapSize = new THREE.Vector2(800, 800);
dirLight.shadow.camera.near = 0.1;
dirLight.shadow.camera.far = 1500;
dirLight.shadow.camera.left = d * -1;
dirLight.shadow.camera.right = d;
dirLight.shadow.camera.top = d;
dirLight.shadow.camera.bottom = d * -1;
// Add directional Light to scene
scene.add(dirLight);



//init model
let stacy_txt = new THREE.TextureLoader().load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/1376484/stacy.jpg');

stacy_txt.flipY = false; // we flip the texture so that its the right way up

const stacy_mtl = new THREE.MeshPhongMaterial({
  map: stacy_txt,
  color: 0xffffff,
  skinning: true
});

// let geometry = new THREE.SphereGeometry(8, 32, 32);
// let material = new THREE.MeshBasicMaterial({ color: 0x9bffaf }); // 0xf2ce2e 
// let sphere = new THREE.Mesh(geometry, material);
// sphere.position.z = -10;
// sphere.position.y = -2.5;
// sphere.position.x = -0.25;
// scene.add(sphere);

var loader = new THREE.GLTFLoader();
loader.load(
    MODEL_PATH2,
    function(gltf) {

      // A lot is going to happen here
      model = gltf.scene;
      let fileAnimations = gltf.animations;

      console.log(fileAnimations)
      // model.traverse(o => {
      //   if (o.isMesh) {
      //     o.castShadow = true;
      //     o.receiveShadow = true;
      //     // o.material = stacy_mtl; // Add this line
      //   }
      //   // Reference the neck and waist bones
      //   if (o.isBone && o.name === 'mixamorigNeck') { 
      //     neck = o;
      //   }
      //   if (o.isBone && o.name === 'mixamorigSpine') { 
      //     waist = o;
      //   }
      // });

        // Set the models initial scale
        model.scale.set(0.5, 0.5, -1);

        model.position.y = -10;
        model.position.z = 5;
        model.position.x = 0;


        model.rotateY(3.2)
        model.rotateX(-0.4)


        // document.querySelector('#c').click = moveCamera(model);
        // moveCamera(model);


        scene.add(model);

        loaderAnim.remove();
        mixer = new THREE.AnimationMixer(model);

        let clips = fileAnimations.filter(val => val.name !== 'noanim');
        possibleAnims = clips.map(val => {
          let clip = THREE.AnimationClip.findByName(clips, val.name);
          clip.tracks.splice(3, 3);
          clip.tracks.splice(9, 3);
          clip = mixer.clipAction(clip);
          return clip;
          }
        );

        let idleAnim = THREE.AnimationClip.findByName(fileAnimations, 'noanim');
        idleAnim.tracks.splice(3, 3);
        idleAnim.tracks.splice(9, 3);
        idle = mixer.clipAction(idleAnim);
        idle.play();

        // playModifierAnimation(idle, 0.25, possibleAnims[0], 0.25);
      
    },(xhr)=>{
      console.log((xhr.loaded/xhr.total * 100) + "% loaded")
    } ,(error) =>
    {
      console.log(error)
    }
);


function moveCamera()
{
  const t = document.body.getBoundingClientRect().top;

  if(model != undefined)
      // model.rotateY(0.01)
      for(var i = 0 ; i < ArrayStars.length  ;  i++)
      {
        // var nb1 =  Math.floor(Math.random() * (0.001 - -0.002 + 1)) + -0.002 ;
        // var nb2 =  Math.floor(Math.random() * (0.001 - -0.002 + 1)) + -0.002 ;
        // var nb3 =  Math.floor(Math.random() * (0.001 - -0.002 + 1)) + -0.002 ;

        var min= -0.04; 
        var max= 0.04;  
        var random = Math.random() * (max - min) + min; 

        console.log(random)

        ArrayStars[i].position.z +=  random;
        ArrayStars[i].position.x +=  random;
        ArrayStars[i].rotation.y +=  random;
      }
}


window.addEventListener('click', e => raycast(e));
window.addEventListener('touchend', e => raycast(e, true));

function raycast(e, touch = false) {
  var mouse = {};
  if (touch) {
    mouse.x = 2 * (e.changedTouches[0].clientX / window.innerWidth) - 1;
    mouse.y = 1 - 2 * (e.changedTouches[0].clientY / window.innerHeight);
  } else {
    mouse.x = 2 * (e.clientX / window.innerWidth) - 1;
    mouse.y = 1 - 2 * (e.clientY / window.innerHeight);
  }
  // update the picking ray with the camera and mouse position
  raycaster.setFromCamera(mouse, camera);

  // calculate objects intersecting the picking ray
  var intersects = raycaster.intersectObjects(scene.children, true);

  if (intersects[0]) {
    var object = intersects[0].object;

    if (object.name === 'stacy') {

      if (!currentlyAnimating) {
        currentlyAnimating = true;
        playOnClick();
      }
    }
  }
}

function playOnClick() {
  console.log(possibleAnims)
  let anim = Math.floor(Math.random() * possibleAnims.length) + 0;
  playModifierAnimation(idle, 0.25, possibleAnims[anim], 0.25);
}

function playModifierAnimation(from, fSpeed, to, tSpeed) {
  to.setLoop(THREE.LoopOnce);
  to.reset();
  to.play();
  from.crossFadeTo(to, fSpeed, true);
  setTimeout(function() {
    from.enabled = true;
    to.crossFadeTo(from, tSpeed, true);
    currentlyAnimating = false;
  }, to._clip.duration * 500 - ((tSpeed + fSpeed) * 500));
}


document.addEventListener('mousemove', function(e) {
  var mousecoords = getMousePos(e);
});

function getMousePos(e) {
  return { x: e.clientX, y: e.clientY };
}

function moveJoint(mouse, joint, degreeLimit) {
  let degrees = getMouseDegrees(mouse.x, mouse.y, degreeLimit);
  joint.rotation.y = THREE.Math.degToRad(degrees.x);
  joint.rotation.x = THREE.Math.degToRad(degrees.y);
}


function getMouseDegrees(x, y, degreeLimit) {
  let dx = 0,
      dy = 0,
      xdiff,
      xPercentage,
      ydiff,
      yPercentage;

  let w = { x: window.innerWidth, y: window.innerHeight };

  // Left (Rotates neck left between 0 and -degreeLimit)
  
    // 1. If cursor is in the left half of screen
  if (x <= w.x / 2) {
    // 2. Get the difference between middle of screen and cursor position
    xdiff = w.x / 2 - x;  
    // 3. Find the percentage of that difference (percentage toward edge of screen)
    xPercentage = (xdiff / (w.x / 2)) * 100;
    // 4. Convert that to a percentage of the maximum rotation we allow for the neck
    dx = ((degreeLimit * xPercentage) / 100) * -1; }
// Right (Rotates neck right between 0 and degreeLimit)
  if (x >= w.x / 2) {
    xdiff = x - w.x / 2;
    xPercentage = (xdiff / (w.x / 2)) * 100;
    dx = (degreeLimit * xPercentage) / 100;
  }
  // Up (Rotates neck up between 0 and -degreeLimit)
  if (y <= w.y / 2) {
    ydiff = w.y / 2 - y;
    yPercentage = (ydiff / (w.y / 2)) * 100;
    // Note that I cut degreeLimit in half when she looks up
    dy = (((degreeLimit * 0.5) * yPercentage) / 100) * -1;
    }
  
  // Down (Rotates neck down between 0 and degreeLimit)
  if (y >= w.y / 2) {
    ydiff = y - w.y / 2;
    yPercentage = (ydiff / (w.y / 2)) * 100;
    dy = (degreeLimit * yPercentage) / 100;
  }
  return { x: dx, y: dy };
}


document.addEventListener('mousemove', function(e) {
  var mousecoords = getMousePos(e);
if (neck && waist) {
    moveJoint(mousecoords, neck, 50);
    moveJoint(mousecoords, waist, 30);
}
});


function update(model) {

  if (mixer) {
    mixer.update(clock.getDelta());
  }

  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }

  moveCamera()

  renderer.render(scene, camera);
  requestAnimationFrame(update);
}

update();


function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  let width = window.innerWidth;
  let height = window.innerHeight;
  let canvasPixelWidth = canvas.width / window.devicePixelRatio;
  let canvasPixelHeight = canvas.height / window.devicePixelRatio;

  const needResize =
    canvasPixelWidth !== width || canvasPixelHeight !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}
