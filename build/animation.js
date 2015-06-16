/*
Główny plik renedrujacy scenę:
W programie wykorzystałem tekstury ze strony http://planetpixelemporium.com/
Plik threex.atmospherematerial.js zawiera shader opowiedzialny za renderowanie atmosfery słońca, info o autorze w pliku.
Dane o układzie planetarnym (masa gwiazdy, inklinacja orbit, prędkości planet w apohelium itp) są ładowane z pliku data.json w katalogu data
*/

var renderer = null,
    scene = null,
    camera = null;
//Tablice przechowujące dane o obiektach
var object = [];
var object_gui = [];
var obj_click = [];
//tablica przechowująca światła
var lights = [];

//Zmienne używane do procesu focusowania na obiekcie
var FOCUS, focusVec = new THREE.Vector3();
var PAN = true;

var PAUSE = false; //Zmienna stanu animacji
var MIN_GHOST_DISTANCE = 100; //Minimalna odległość z której widać "ducha" obiektu
var MAX_GHOST_OPACITY = 0.3; //Przeźroczystość ducha
var GHOST_DISTANCE_SCALE = 80;
var STEPS_PER_FRAME = 4000; //Ilość kroków animacji w jednej klatce

var METERS_PER_UNIT = 1000000000; //Ilość metrów w jednej jednostce w animacji
var SEC_PER_STEP = 8; //Ilość sekund w jednym kroku animacji
var SCREEN_WIDTH = window.innerWidth;
var SCREEN_HEIGHT = window.innerHeight;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
//Stałe fizyczne
var G = 6.67384e-11;
var Ms  = 1.98e30;
var Mz = 5.97219e24;
var Rz = 0.006378;
var AU = 149.59787;


$(document).ready(
    function() {
        loadObjects();
        var container = document.getElementById("container-canvas");
        camera = new THREE.PerspectiveCamera( 50, SCREEN_WIDTH / SCREEN_HEIGHT, 0.001, 1000000 );

        // Tworzy nową scenę Three.js

        scene = new THREE.Scene();
        scene.add(camera);
        renderer = new THREE.WebGLRenderer( { antialias: true, logarithmicDepthBuffer: true } );
        renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
        renderer.domElement.style.position = "relative";
        renderer.shadowMapEnabled	= true;
        container.appendChild( renderer.domElement );
        //Inicjalizacja GUI
        initGUI();
        window.addEventListener( 'resize', onWindowResize, false );

        //Załadowanie i konfiguracja pluginu do kontroli kamery
        controls = new THREE.TrackballControls(camera,  renderer.domElement );
        controls.rotateSpeed = 1.0;
        controls.zoomSpeed = 1.0;
        controls.panSpeed = 0.8;
        controls.noZoom = false;
        controls.noPan = false;
        controls.staticMoving = false;
        controls.keys = [ 65, 83, 68 ];
        controls.minDistance = 0.01;
        controls.maxDistance = 100000;
        controls.addEventListener( 'change', render );
        //Dodanie skyboxa
        var starSphere	= THREEx.Planets.createStarfield(100000)
        scene.add(starSphere)


        // Dodanie światła rozproszonego
        var light_a = new THREE.AmbientLight( 0x282828 ); // soft white light
        scene.add( light_a );

        //Wspomaganie debugowania
        scene.add(new THREE.AxisHelper(10000));
        scene.add(new THREE.GridHelper(10000,1000));

        //Inicjalizacja śladów planet
        addTrails();
        //Pętla inicjalizaująca obiekty
        for (i=0;i<object.length;i++)
        {
            addObject(object[i]);
        }

        renderer.domElement.addEventListener('mousedown', onDocumentMouseDown, false );
        FOCUS = object[0].geom;
        camera.position.x = 310;
        camera.position.y = 150;
        camera.position.z = 310;
       // focusCameraOn(object[0].geom);

        camera.updateProjectionMatrix();

        run();
    }
);
