/* Global Variables */
/* the developer should define variables and constants here */
/* We define a room with 3 walls, floor and ceiling */
/* We define a ball which bounces in the xy plane */
/* We define modifiable prameters : gravity, ball size, initial velocity */
/* We support draggable ball */
/* Scene Dimensions (in meters: at z = 0) */
var mySceneTLX;        /* Top Left corner X coordinate */
var mySceneTLY;        /* Top Left corner Y coordinate */
var mySceneBRX;        /* Bottom Right corner X coordinate */
var mySceneBRY;        /* Bottom Right corner Y coordinate */
var mySceneW;          /* Scene Width */
var mySceneH;          /* Scene Height */
var myCenterX;         /* Scene Center X coordinate */
var myCenterY;         /* Scene Center Y coordinate */

/* Room Variables */
var leftB;              /* Left Barrier */
var rightB;             /* Right Barrier */
var bottomB;            /* Bottom Barrier */
var topB;               /* Top Barrier */
var backB=-4.0;         /* Back Barrier */
var wallThickness;      /* Wall Thickness */

/* Room Objects */
var myFloor;            /* Floor */
var myCeiling;          /* Ceiling */
var myBack;             /* Back */
var myRight;            /* Right */
var myLeft;             /* Left */

/* Ball variables */
var myBallRadius;       /* Radius */

var teapotX;
var teapotY;
var teapotZ;
/* Parameters, Variables */
var gravityX;           /* X component of Gravity in m/S2 */
var gravityY;           /* Y component of Gravity in m/S2 */
var bow;
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;
// camera
var VIEW_ANGLE = 45;
var ASPECT = WIDTH / HEIGHT;
var NEAR = 1;
var FAR = 500;
var distance_from_mirror;

function myTeapotDrag(element, newpos)
{
    // console.log(newpos.x);
    // if (newpos.x < 1) { arrowX = 0.9;geometry1.vertices[1].x=0.9-0.65}
    //
    // else if (newpos.x > 1.4) { arrowX = 1.4;geometry1.vertices[1].x=1.4-0.65 }
    // updateInitialVelocity();
    console.log("x"+newpos.x);
    console.log("y"+newpos.y);
    console.log("z"+newpos.z);
    if(newpos.x>2.33&&newpos.x<3.74){
        teapotX=newpos.x;
    }
    if(newpos.z<0.64&&newpos.z>-0.68)
    {
        teapotZ=newpos.z;
    }
    teapot.position.set(teapotX, teapotY, teapotZ);
    verticalMirror.render();
    PIErender();
    PIEchangeInputSlider("Distance from Mirror",teapotZ+1.5);
    PIEchangeDisplaySlider("Distance from Mirror",teapotZ+1.5);
    // PIEaddElement(line);

}

function inArray(value, array) {
    for (var i = 0; i < array.length; i++) {
        if (value == array[i])
            return true;
    }
    return false;
}

function updateInitialVelocity() {
    scaled_x = ((1.4 - arrowX) / 0.5) * 10;
    // console.log(7+scaled_x*1.5);
    var newVelocity = (7 + scaled_x * 1.5) / (arrowMass / 4);
    handleVX(newVelocity);
}
/******************* End of Interaction functions ***********************/

/******************* GUI control objects code ***********************/


function handleZDistance(newValue) {
    distance_from_mirror = newValue;
    teapot.position.z=-1.5+distance_from_mirror;
    verticalMirror.render();
    PIErender();
}

function handleXDistance(newValue) {
    teapot.position.x=newValue+2.33;
    verticalMirror.render();
    PIErender();
}

function initialiseControlVariables() {
    /* Labels */
}


function initialiseControls() {
    initialiseControlVariables();
    /* Create Input Panel */
    // PIEaddDisplaySlider("Distance from Mirror", 1.5, 0.82, 2.14, 0.01);
    PIEaddInputSlider("Distance from Mirror", 1.5, handleZDistance, 0.82, 2.14, 0.01);
    PIEaddInputSlider("X", 0.7, handleXDistance, 0, 1.4, 0.01);
    PIEaddDisplaySlider("Distance from Mirror", 1.5, handleZDistance, 0.82, 2.14, 0.01);
    PIEaddDisplaySlider("X", 0.7, handleXDistance, 0, 1.4, 0.01);
    // PIEaddInputSlider("Mass", 4, handleArrowMass, 4, 20, 1);
    /* Create Display Panel */
}


/******************* End of GUI control objects code ***********************/

/******************* Load Experiment objects code ***********************/

var helpContent;
function initialiseHelp()
{
    helpContent="";
    helpContent = helpContent + "<h2</h2>";
    helpContent = helpContent + "<h3>About the experiment</h3>";
    helpContent = helpContent + "<p>The experiment shows a teapot over a chessboard and its image in the plane mirror. User can vary position of teapot over chessboard and observe image in mirror</p>";
    helpContent = helpContent + "<h3>Animation control</h3>";
    helpContent = helpContent + "<p>User can vary distance from mirror using slider on right top corner or dragging teapot. To vary distance from slider user has to stop the animation first.</p>";
    PIEupdateHelp(helpContent);
}

var infoContent;
function initialiseInfo()
{
    infoContent =  "";
    infoContent = infoContent + "<h3>About the experiment</h3>";
    infoContent = infoContent + "<p>Show a chessboard and an object placed on a chessboard. Place a mirror at the side. Show the image and distance from mirror. Allow student to position the object and show image (and distance).</p>";
    PIEupdateInfo(infoContent);
}

function initialiseScene()
{
    /* Initialise Scene Variables */
    mySceneTLX = 0.0;
    mySceneTLY = 3.0;
    mySceneBRX = 6.0;
    mySceneBRY = 0.0;
    mySceneW   = (mySceneBRX - mySceneTLX);
    mySceneH   = (mySceneTLY - mySceneBRY);
    myCenterX  = (mySceneTLX + mySceneBRX) / 2.0;
    myCenterY  = (mySceneTLY + mySceneBRY) / 2.0;
    arrowZ    = -2.0;
}

function initialiseOtherVariables()
{
    /* Initialise variables */
    myBallRadius = 0.6;
    wallThickness =  0.20;

    /* Gravity */
    gravityX = 0.0;
    gravityY = -9.8;

    /* Barriers */
    leftB=mySceneTLX;
    rightB=mySceneBRX;
    bottomB=mySceneBRY;
    topB=mySceneTLY;
}

function loadScript(url, callback)
{
    // Adding the script tag to the head as suggested before
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    head.appendChild(script);
}
var planeGeo ;

function callbackMirrorLoad() {
    verticalMirror = new THREE.Mirror( PIErenderer, PIEcamera, { clipBias: 0.003, textureWidth: WIDTH, textureHeight: HEIGHT, color:0x889999 } );
    var verticalMirrorMesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 3, 2 ), verticalMirror.material );
    verticalMirrorMesh.add( verticalMirror );
    verticalMirrorMesh.position.y = 1.5;
    verticalMirrorMesh.position.x = 3;
    verticalMirrorMesh.position.z = -1.5;
    PIEscene.add( verticalMirrorMesh );
    distance_from_mirror=1.5;
    console.log(distance_from_mirror);
    PIEstartAnimation();
}
var chessboard;
var table;
var teapot;
function loadExperimentElements()
{
    planeGeo = new THREE.PlaneBufferGeometry( 100.1, 100.1 );
var material;
var loader;
var texture;
    PIEsetExperimentTitle("7.15.2A Position of the image");
    PIEsetDeveloperName("Navneet Nandan");
    PIEhideControlElement();
    loader = new THREE.ObjectLoader();
    loadScript("https://threejs.org/examples/js/Mirror.js",callbackMirrorLoad);

    /* initialise help and info content */
    initialiseHelp();
    initialiseInfo();

    /* initialise Scene */
    initialiseScene();

    /* initialise Other Variables */
    initialiseOtherVariables();
    loader.load('https://raw.githubusercontent.com/NavneetNandan/MirrorActivity/master/Experiment/chessboard.json',function (obj) {
        chessboard=obj;
        chessboard.scale.x=15;
        chessboard.scale.z=15;
        chessboard.scale.y=15;
        chessboard.position.set(3,1,0);
        PIEaddElement(chessboard);
    });
    loader.load('https://raw.githubusercontent.com/NavneetNandan/MirrorActivity/master/Experiment/table-0001.json',function (obj) {
        table=obj;
        table.position.set(3,-0.18,0)
        table.scale.x=0.7;
        table.scale.y=0.7;
        table.scale.z=0.7;
        PIEaddElement(table)
    });
    loader.load("https://raw.githubusercontent.com/NavneetNandan/MirrorActivity/master/Experiment/teapot-claraio.json", function (obj) {
        teapot = obj;
        teapotX=3;
        teapotY=1;
        teapotZ=0;
        teapot.position.set(teapotX,teapotY,teapotZ);
        teapot.scale.x=0.4;
        teapot.scale.y=0.4;
        teapot.scale.z=0.4;
        PIEaddElement(teapot);
        PIEdragElement(teapot);
        PIEsetDrag(teapot,myTeapotDrag);

    });
    // PIEaddElement(cube);
    // var img = new THREE.MeshLambertMaterial({
    //     map:THREE.ImageUtils.loadTexture('rinG8A7qT.gif')
    // });
    // var geometry=new THREE.BoxGeometry(20,20,50);
    // var box=new THREE.Mesh(geometry,img);
    // box.position.set(arrowX,arrowY,arrowZ);
    // PIEaddElement(box);
    /* Create Ball and add it to scene */
    // arrow = new THREE.Mesh(new THREE.SphereGeometry(myBallRadius, 32, 32), new THREE.MeshLambertMaterial({color:0xededed}));
    // arrow.position.set(arrowX, arrowY, myBallZ);
    // arrow.castShadow = true;
    // arrow.receiveShadow = true;
    // PIEaddElement(arrow);
    /* Allow Dragging of the ball */


    /* Initialise Wall variables */
    /* All walls extend beynd the room size in both directions */
    /* Floor */
    // loader = new THREE.TextureLoader();
    // texture = loader.load( '../PIE/images/hardwood2_diffuse.jpg' );
    // texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    // texture.repeat.set( 25, 25 );
    // texture.anisotropy = 16;
    // material = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0x111111, map: texture } );
    // geometry = new THREE.PlaneBufferGeometry( mySceneW * 2, backB * 2 );
    geometry = new THREE.BoxGeometry( mySceneW * 2, wallThickness, 100);
    material = new THREE.MeshLambertMaterial( {color: 0x4E342E} );
    myFloor  = new THREE.Mesh( geometry, material );
    // myFloor.lookAt(new THREE.Vector3(0,1,0));
    myFloor.position.set(myCenterX, bottomB - (wallThickness / 2), 0.0);
    myFloor.receiveShadow = true;
    PIEaddElement(myFloor);
    /* Ceiling */
    geometry = new THREE.BoxGeometry( 100, wallThickness, 100 );
    material = new THREE.MeshLambertMaterial( {color: 0x2196F3} );
    myCeiling = new THREE.Mesh( geometry, material );
    myCeiling.position.set(myCenterX, topB+(wallThickness/2), 0.0);
    myFloor.receiveShadow = true;
    PIEaddElement(myCeiling);
    /* Left */
    geometry = new THREE.BoxGeometry( wallThickness, 100, 100 );
    material = new THREE.MeshLambertMaterial( {color: 0x4CAF50} );
    myLeft = new THREE.Mesh( geometry, material );
    myLeft.position.set(leftB-(wallThickness), myCenterY, 0.0);
    myLeft.receiveShadow = true;
    PIEaddElement(myLeft);
    /* Right */
    geometry = new THREE.BoxGeometry( wallThickness, 100, 100 );
    material = new THREE.MeshLambertMaterial( {color: 0x4CAF50} );
    myRight = new THREE.Mesh( geometry, material );
    myRight.position.set(rightB+(wallThickness/2), myCenterY, 0.0);
    myRight.receiveShadow = true;
    PIEaddElement(myRight);
    var light= new THREE.PointLight(0xffffff, 1, 0, 2);
    light.position.set(3,4,-0.2);
    PIEscene.add(light);
    /* Back */
    // material = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0x111111, map: texture } );
    // geometry = new THREE.PlaneBufferGeometry( mySceneW * 2, mySceneH * 2 );
    geometry = new THREE.BoxGeometry( mySceneW * 2, mySceneW * 2, wallThickness );
    material = new THREE.MeshLambertMaterial( {color: 0xFFFFFF} );
    myBack = new THREE.Mesh( geometry, material );
    myBack.position.set(myCenterX, myCenterY, 5);
    myBack.receiveShadow = true;
    // PIEaddElement(myBack);
    /* Instantiate experiment controls */
    var planeBack = new THREE.Mesh( planeGeo, new THREE.MeshPhongMaterial( { color: 0xdedede } ) );
    planeBack.position.z = -10;
    planeBack.position.y = 0;
    PIEscene.add( planeBack );

    var planeFront = new THREE.Mesh( planeGeo, new THREE.MeshPhongMaterial( { color: 0x7f7fff } ) );
    planeFront.position.z = 2;
    planeFront.position.y = 0;
    planeFront.rotateY( Math.PI );
    PIEscene.add( planeFront );
    initialiseControls();
    /* Reset all positions */

    PIEsetAreaOfInterest(mySceneTLX, mySceneTLY, mySceneBRX, mySceneBRY);
    PIEcamera.position.y=3;
    // PIEcamera.position.set(7.5,2,2.5);
    PIEcamera.rotateX(-0.2);
    // PIEcamera.rotateY(1.2*Math.PI/4);
    // PIEcamera.rotateOnAxis()
    resetExperiment();

    // document.getElementById('reset').click();

}

/******************* End of Load Experiment objects code ***********************/

/******************* Reset Experiment code ***********************/

/**
 * This function resets the position of all experiment elements to their default values.
 * <p>
 * This is called during initial document load.
 * This is also be called by the system provided reset button.
 * <p>
 * Apart from the position, this should also reset all variables which can be controlled by the user.
 * This function will also clear any output variables/graphs
 */
function resetExperiment()
{
    /* initialise Other Variables */
    initialiseOtherVariables();
    // PIEaddElement(line);


    // var light1= new THREE.PointLight(0xffffff, 1, 0, 0);
    // light1.position.set(3,2,0.5);
    // PIEscene.add(light1);

    /* Reset Wall position */
    /* Floor */
    myFloor.position.set(myCenterX, bottomB - (wallThickness / 2), 0.0);
    /* Ceiling */
    myCeiling.position.set(myCenterX, topB+(wallThickness/2), 0.0);
    /* Left */
    myLeft.position.set(leftB-(wallThickness/2)-1, myCenterY, 0.0);
    /* Right */
    myRight.position.set(rightB+(wallThickness/2)+1, myCenterY, 0.0);
    /* Back */
    myBack.position.set(myCenterX, myCenterY, backB - (wallThickness / 2)+1);
}

/******************* End of Reset Experiment code ***********************/

/******************* Update (animation changes) code ***********************/

/**
 * This function updates the location of all experiment elements during each animation frame.
 * <p>
 * The function receives both animation time as well as the dt (time difference) from last call.
 * This function is expected to implement the laws of physics to update the position.
 * This function will also update any output variables/graphs
 * <p>
 * Important Note : Boundary Events
 * <p>
 * During any physics simulation you will reach a boundary event.
 * In our case, the boundary even is the ball hitting any of the walls.
 * The boundary event typically changes the sign of velocity/acceleration.
 * The boundary event is most likely to happen in the middle of the two calls.
 * The library allows the experiment to change the simulation time by processing partial time.
 * This function can call a library function with the time remaining to be processed before exiting.
 * <p>
 * @param  t       The time in milliseconds elapsed since the beginning of animation cycle
 * @param  dt      The time in milliseconds elapsed since the last acll to this function
 */
function updateExperimentElements(t, dt)
{
    verticalMirror.render();
    document.getElementsByClassName("dg main a")[1].style.width="400px"
    document.getElementsByClassName("dg main a")[0].style.width="400px"
    PIEscene.remove(PIEspotLight);

}

/******************* Update (animation changes) code ***********************/
