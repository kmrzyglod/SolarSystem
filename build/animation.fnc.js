//Funkcja dodająca obiekt
function addObject(_obj){
    var texture =  THREE.ImageUtils.loadTexture(_obj.texture);
    if (_obj.type) {
        _obj.geom = new THREE.Mesh(new THREE.SphereGeometry(_obj.params.radius, 64, 64), new THREE.MeshLambertMaterial({
            map: texture
        }));
        if(_obj.name == "Saturn")
        {
            var ring	= THREEx.Planets.createSaturnRing(1.1*_obj.params.radius, _obj.params.radius*1.8);
            ring.receiveShadow	= true;
            ring.castShadow		= true;
            _obj.geom.add(ring);
        }
        if(_obj.name == "Uranus")
        {
            var ring	= THREEx.Planets.createUranusRing(1.1*_obj.params.radius, _obj.params.radius*1.8);
            ring.receiveShadow	= true;
            ring.castShadow		= true;
            _obj.geom.add(ring);
        }
    }
    else {
        var light = new THREE.PointLight( 0xffffff, 1.5);
        light.position.copy(_obj.position);
        lights.push(light);
        scene.add(lights[lights.length-1]);
        _obj.geom = new THREE.Mesh(new THREE.SphereGeometry(_obj.params.radius, 64, 64), new THREE.MeshBasicMaterial({
            map: texture,
            color: 0xffffff }));
        //Dodawanie atmosfery Słońca
        var atmosphereGeometry	= new THREE.SphereGeometry(_obj.params.radius, 64, 64)
        var atmpsphereMaterial	= THREEx.createAtmosphereMaterial()
        atmpsphereMaterial.side	= THREE.BackSide
        atmpsphereMaterial.uniforms.coeficient.value	= 0.5
        atmpsphereMaterial.uniforms.power.value		= 8.0
        atmpsphereMaterial.uniforms.glowColor.value	= new THREE.Color(0xa2a23c);
        var atmosphereMesh	= new THREE.Mesh(atmosphereGeometry, atmpsphereMaterial );
        atmosphereMesh.scale.multiplyScalar(1.2);
        _obj.atmosphere =  atmosphereMesh;
        scene.add(_obj.atmosphere);
    }
    var ghostGeometry = new THREE.SphereGeometry(1, 32, 16);
    var ghostMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0});
    var ghostSphere = new THREE.Mesh(ghostGeometry, ghostMaterial);
    ghostSphere.position.copy(_obj.position);
    ghostSphere.target = false;
    _obj.ghost = ghostSphere;
    _obj.geom.position.copy(_obj.position);
    _obj.geom.rotation.z = _obj.params.axis/180*Math.PI;
    _obj.geom.target = false;

    if(_obj.trail) scene.add(_obj.trail);
    scene.add(_obj.geom);
    scene.add(_obj.ghost);

    obj_click.push(_obj.geom);
    obj_click.push(_obj.ghost);

}
//Do zamiany
function getAcceleration(distance, starMass) {
    return G * starMass / (Math.pow(distance, 2));
};
//Przeliczanie położenia
function updateVelocity(planet, star) {
    var vel = new THREE.Vector3();
    var speed;
    for(var i=0; i < STEPS_PER_FRAME; i++) {

        speed = getAcceleration(getDistance(star.geom.position, planet.geom.position) * METERS_PER_UNIT, star.params.mass) * SEC_PER_STEP;
        vel.subVectors(star.geom.position, planet.geom.position).setLength(speed / METERS_PER_UNIT);
        planet.params.vel.add(vel);
        planet.geom.position.x += planet.params.vel.x * SEC_PER_STEP;
        planet.geom.position.y += planet.params.vel.y * SEC_PER_STEP;
        planet.geom.position.z += planet.params.vel.z * SEC_PER_STEP;
        if (i % 20000 === 0) {
            leaveTrail(planet);
        }
    }
};
//Właściwa funkcja animacji
function animate() {
    focusVec.copy(FOCUS.position);
    for (i=0;i<object.length;i++) {
        if (i>0 && !PAUSE) updateVelocity(object[i], object[0]);
        updateGhost(object[i]);
    }
    if (!PAN)
    {
        focusVec.subVectors(FOCUS.position, focusVec);
        camera.position.add(focusVec);
        controls.target.copy(FOCUS.position);

    }

}
// Funkcja inicjalizująca ślad
function createTrail(_obj) {
    var trailGeometry = new THREE.Geometry();
    for (i = 0; i < _obj.params.trails; i++) {
        trailGeometry.vertices.push(new THREE.Vector3(_obj.position.x, _obj.position.y, _obj.position.z));
    }
    var trailMaterial = new THREE.LineBasicMaterial({ color: _obj.params.trailColor});
    return new THREE.Line(trailGeometry, trailMaterial);
}
//Inicjalziacja śladów dla wszystkich obiektów
function addTrails() {
    //Inaczej nie działa, nie wiem dlaczego nie można tego zrobić w pętli
    object[1].trail = createTrail(object[1]);
    object[2].trail = createTrail(object[2]);
    object[3].trail = createTrail(object[3]);
    object[4].trail = createTrail(object[4]);
    object[5].trail = createTrail(object[5]);
    object[6].trail = createTrail(object[6]);
    object[7].trail = createTrail(object[7]);
    object[8].trail = createTrail(object[8]);
    object[9].trail = createTrail(object[9]);

}
//Aktualizowanie śladu
function leaveTrail(_obj) {
    _obj.trail.geometry.vertices.unshift(new THREE.Vector3().copy(_obj.geom.position));
    _obj.trail.geometry.vertices.length = _obj.params.trails;
    _obj.trail.geometry.verticesNeedUpdate = true;
};
function getDistance(v1, v2) {
    var x = v1.x - v2.x;
    var y = v1.y - v2.y;
    var z = v1.z - v2.z;
    return Math.sqrt(x * x + y * y + z * z);
};
//Skalowanie obiektu
function setScale(_obj, scale)
{
    _obj.scale.x = scale;
    _obj.scale.y = scale;
    _obj.scale.z = scale;
};
//Aktualizacja położenia ducha
function updateGhost(_obj) {
    _obj.ghost.position.copy(_obj.geom.position);
    var distance = getDistance(camera.position, _obj.geom.position);
    if (distance < MIN_GHOST_DISTANCE) {
        _obj.ghost.material.opacity = 0;
    } else {
        _obj.ghost.scale.x = _obj.ghost.scale.y = _obj.ghost.scale.z = distance/GHOST_DISTANCE_SCALE;
        if (_obj.geom.scale.x*_obj.params.radius>_obj.ghost.scale.x)  _obj.ghost.material.opacity = 0;
        else  _obj.ghost.material.opacity = MAX_GHOST_OPACITY;
    }
};
function run() {
    // Renderuje scenę
    renderer.render( scene, camera );
    // Właściwa animacja
    animate();
    controls.update();
    requestAnimationFrame(function() { run(); });

}
function render() {
    renderer.render( scene, camera );
}
//Przechwytywanie kliknęcia na obiekt. Nie do końca działa
function onDocumentMouseDown(event) {

    var tmp = {};
    tmp.position = new THREE.Vector3();
    if( event.button == 2)
    {
        tmp.position.copy(FOCUS.position);
        FOCUS = {}
        FOCUS = tmp;
        PAN = true;
    }
    else if (event.button == 1)
    {
        return 0;
    }
    event.preventDefault();
    var mouse3D = new THREE.Vector3( ( (event.clientX) / window.innerWidth ) * 2 - 1, - ( (event.clientY) / window.innerHeight ) * 2 + 1, 0.5 );
    mouse3D.unproject(camera );
    mouse3D.sub( camera.position );
    mouse3D.normalize();
    var raycaster = new THREE.Raycaster( camera.position, mouse3D );

    var intersects = raycaster.intersectObjects(obj_click);

    if ( intersects.length > 0 ) {
        FOCUS =  intersects[0].object;
        PAN = false;
    }

}
//funkcja focusująca na danym
function focusCameraOn(focus) {
    var focusVec = new THREE.Vector3();
    focusVec.subVectors(focus.position, FOCUS.position);
    camera.position.add(focusVec);
    FOCUS = focus;
    camera.lookAt(FOCUS.position);
}
//Funkcja reagująca na zmianę rozmiaru okna
function onWindowResize() {

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}