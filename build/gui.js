var animationOptions = function() {
    this.speed = 15;
    this.scale = 1;
    this.state = function() {};
    this.restart = function() {};
    this.update = function() {};

}

var objectsOptions = function() {
    this.focus = function(){};
    this.name = null;
    this.mass = null;
    this.i = null;
    this.radius = null;
    this.pos_x = null;
    this.pos_y = null;
    this.pos_z = null;
    this.vel_x = null;
    this.vel_y = null;
    this.vel_z = null;
};


//Funkcja inicjalizująca proste gui (dat.gui)
function initGUI(){
/*
    var a_opt = new animationOptions();
    var o_opt = new objectsOptions();
    var gui = new dat.GUI();
    var animationState = true;

    var f1 = gui.addFolder('Animation options');
    f1.add(a_opt, 'speed', 1, 1000).name("Speed [days/sec]: ").onFinishChange(function(value) {
        STEPS_PER_FRAME = 180*value;
    });
    f1.add(a_opt, 'scale',1, 10000).name("Scale: ").onFinishChange(function(value){
        for (i=0;i<object.length;i++)
        {
            var tmp = value;
            if (i==0)
            {
                if (tmp<1000) tmp=1;
                else tmp=tmp/1000;
                setScale(object[i].atmosphere, tmp*1.2);
            }
            setScale(object[i].geom, tmp);

        }
    });
    f1.add(a_opt, 'state').name("Pause animation").onFinishChange(function(){
        //Zmina stanu animacji
        animationState = !animationState;
        if ( animationState)
        {
            this.name("Pause animation");
            PAUSE = false;
        }
        if (!animationState)
        {
            this.name("Start animation");
            PAUSE = true;
        }
    });
    f1.add(a_opt, 'restart').name("Restart animation").onFinishChange(function(){
        location.reload();
    });

    var folders = gui.addFolder('Objects');
    var f_objects = [];
    for (i=0;i<object_gui.length;i++)
    {
        f_objects[i] =  folders.addFolder(object_gui[i].name);
        o_opt.name = object_gui[i].name;
        if (object_gui[i].type==0)  o_opt.mass = object_gui[i].params.mass/Ms;
        else {
            o_opt.mass = object_gui[i].params.mass / Mz; //Mz
            o_opt.i = object_gui[i].params.i;
            o_opt.radius = object_gui[i].params.radius / Rz; //Rz
            o_opt.pos_x = object_gui[i].position.x / AU; //AU
            o_opt.pos_y = object_gui[i].position.y / AU;
            o_opt.pos_z = object_gui[i].position.z / AU;
            o_opt.vel_x = object_gui[i].params.vel.x * 1000000;
            o_opt.vel_y = object_gui[i].params.vel.y * 1000000;
            o_opt.vel_z = object_gui[i].params.vel.z * 1000000;
        }
        f_objects[i].add(o_opt, 'name').name("Name: ");
        if (object_gui[i].type==0)  f_objects[i].add(o_opt, 'mass', 0, 100).name("Mass [Ms]: ").onFinishChange(function(value){
            object[0].params.mass = value*Ms;
        });
        else {
            f_objects[i].add(o_opt, 'mass', 0, 10000).name("Mass [Mz]: ");
            f_objects[i].add(o_opt, 'i', 0, 90).name("Inclination [°]: ");
            f_objects[i].add(o_opt, 'radius', 0, 1000).name("Radius [Rz]: ");
            f_objects[i].add(o_opt, 'pos_x', 0, 1000).name("Position X [AU]: ");
            f_objects[i].add(o_opt, 'pos_y', 0, 1000).name("Position Y [AU]: ");
            f_objects[i].add(o_opt, 'pos_z', 0, 1000).name("Position Z [AU]: ");
            f_objects[i].add(o_opt, 'vel_x', -100, 100).name("Velocity X [km/s]: ");
            f_objects[i].add(o_opt, 'vel_y', -100, 100).name("Velocity Y [km/s]: ");
            f_objects[i].add(o_opt, 'vel_z', -100, 100).name("Velocity Z [km/s]: ");
        }
        f_objects[i].add(o_opt, 'focus').name("Focus");

    }
    pollsHandlers(f_objects);

    f1.open();*/
};



//Funkcja inicjalizująca handlery zdarzeń na kontrolkach gui - obecnie nie wiem jak to rozwiązać nie-statycznie, brzydko to wygląda
function pollsHandlers(f_objects)
{
    f_objects[0].__controllers[2].onFinishChange(function(value){
        FOCUS = object[0].geom;
        PAN = false;
    });
    f_objects[1].__controllers[0].onFinishChange(function(value){
        object[1].name = value;
    });
    f_objects[1].__controllers[1].onFinishChange(function(value){
        object[1].params.mass = value*Mz;
    });
    f_objects[1].__controllers[2].onFinishChange(function(value){
        object[1].params.i = value;
    });
    f_objects[1].__controllers[3].onFinishChange(function(value){
        setScale(object[1], value*Rz/object[1].params.radius)
    });
    f_objects[1].__controllers[4].onFinishChange(function(value){
        object[1].geom.position.x = value*AU;
    });
    f_objects[1].__controllers[5].onFinishChange(function(value){
        object[1].geom.position.y = value*AU;
    });
    f_objects[1].__controllers[6].onFinishChange(function(value){
        object[1].geom.position.z = value*AU;
    });
    f_objects[1].__controllers[7].onFinishChange(function(value){
        object[1].params.vel.x = value/1000000;
    });
    f_objects[1].__controllers[8].onFinishChange(function(value){
        object[1].params.vel.y = value/1000000;
    });
    f_objects[1].__controllers[9].onFinishChange(function(value){
        object[1].params.vel.z = value/1000000;
    });
    f_objects[1].__controllers[10].onFinishChange(function(value){
        FOCUS = object[1].geom;
        PAN = false;
    });
    //
    f_objects[2].__controllers[0].onFinishChange(function(value){
        object[2].name = value;
    });
    f_objects[2].__controllers[1].onFinishChange(function(value){
        object[2].params.mass = value*Mz;
    });
    f_objects[2].__controllers[2].onFinishChange(function(value){
        object[2].params.i = value;
    });
    f_objects[2].__controllers[3].onFinishChange(function(value){
        setScale(object[2], value*Rz/object[2].params.radius)
    });
    f_objects[2].__controllers[4].onFinishChange(function(value){
        object[2].geom.position.x = value*AU;
    });
    f_objects[2].__controllers[5].onFinishChange(function(value){
        object[2].geom.position.y = value*AU;
    });
    f_objects[2].__controllers[6].onFinishChange(function(value){
        object[2].geom.position.z = value*AU;
    });
    f_objects[2].__controllers[7].onFinishChange(function(value){
        object[2].params.vel.x = value/1000000;
    });
    f_objects[2].__controllers[8].onFinishChange(function(value){
        object[2].params.vel.y = value/1000000;
    });
    f_objects[2].__controllers[9].onFinishChange(function(value){
        object[2].params.vel.z = value/1000000;
    });
    f_objects[2].__controllers[10].onFinishChange(function(value){
        FOCUS = object[2].geom;
        PAN = false;
    });
    //
    f_objects[3].__controllers[0].onFinishChange(function(value){
        object[3].name = value;
    });
    f_objects[3].__controllers[1].onFinishChange(function(value){
        object[3].params.mass = value*Mz;
    });
    f_objects[3].__controllers[2].onFinishChange(function(value){
        object[3].params.i = value;
    });
    f_objects[3].__controllers[3].onFinishChange(function(value){
        setScale(object[3], value*Rz/object[3].params.radius)
    });
    f_objects[3].__controllers[4].onFinishChange(function(value){
        object[3].geom.position.x = value*AU;
    });
    f_objects[3].__controllers[5].onFinishChange(function(value){
        object[3].geom.position.y = value*AU;
    });
    f_objects[3].__controllers[6].onFinishChange(function(value){
        object[3].geom.position.z = value*AU;
    });
    f_objects[3].__controllers[7].onFinishChange(function(value){
        object[3].params.vel.x = value/1000000;
    });
    f_objects[3].__controllers[8].onFinishChange(function(value){
        object[3].params.vel.y = value/1000000;
    });
    f_objects[3].__controllers[9].onFinishChange(function(value){
        object[3].params.vel.z = value/1000000;
    });
    f_objects[3].__controllers[10].onFinishChange(function(value){
        FOCUS = object[3].geom;
        PAN = false;
    });
    //
    f_objects[4].__controllers[0].onFinishChange(function(value){
        object[4].name = value;
    });
    f_objects[4].__controllers[1].onFinishChange(function(value){
        object[4].params.mass = value*Mz;
    });
    f_objects[4].__controllers[2].onFinishChange(function(value){
        object[4].params.i = value;
    });
    f_objects[4].__controllers[3].onFinishChange(function(value){
        setScale(object[4], value*Rz/object[4].params.radius)
    });
    f_objects[4].__controllers[4].onFinishChange(function(value){
        object[4].geom.position.x = value*AU;
    });
    f_objects[4].__controllers[5].onFinishChange(function(value){
        object[4].geom.position.y = value*AU;
    });
    f_objects[4].__controllers[6].onFinishChange(function(value){
        object[4].geom.position.z = value*AU;
    });
    f_objects[4].__controllers[7].onFinishChange(function(value){
        object[4].params.vel.x = value/1000000;
    });
    f_objects[4].__controllers[8].onFinishChange(function(value){
        object[4].params.vel.y = value/1000000;
    });
    f_objects[4].__controllers[9].onFinishChange(function(value){
        object[4].params.vel.z = value/1000000;
    });
    f_objects[4].__controllers[10].onFinishChange(function(value){
        FOCUS = object[4].geom;
        PAN = false;
    });
    //
    f_objects[5].__controllers[0].onFinishChange(function(value){
        object[5].name = value;
    });
    f_objects[5].__controllers[1].onFinishChange(function(value){
        object[5].params.mass = value*Mz;
    });
    f_objects[5].__controllers[2].onFinishChange(function(value){
        object[5].params.i = value;
    });
    f_objects[5].__controllers[3].onFinishChange(function(value){
        setScale(object[5], value*Rz/object[5].params.radius)
    });
    f_objects[5].__controllers[4].onFinishChange(function(value){
        object[5].geom.position.x = value*AU;
    });
    f_objects[5].__controllers[5].onFinishChange(function(value){
        object[5].geom.position.y = value*AU;
    });
    f_objects[5].__controllers[6].onFinishChange(function(value){
        object[5].geom.position.z = value*AU;
    });
    f_objects[5].__controllers[7].onFinishChange(function(value){
        object[5].params.vel.x = value/5000000;
    });
    f_objects[5].__controllers[8].onFinishChange(function(value){
        object[5].params.vel.y = value/5000000;
    });
    f_objects[5].__controllers[9].onFinishChange(function(value){
        object[5].params.vel.z = value/5000000;
    });
    f_objects[5].__controllers[10].onFinishChange(function(value){
        FOCUS = object[5].geom;
        PAN = false;
    });
    //
    f_objects[6].__controllers[0].onFinishChange(function(value){
        object[6].name = value;
    });
    f_objects[6].__controllers[1].onFinishChange(function(value){
        object[6].params.mass = value*Mz;
    });
    f_objects[6].__controllers[2].onFinishChange(function(value){
        object[6].params.i = value;
    });
    f_objects[6].__controllers[3].onFinishChange(function(value){
        setScale(object[6], value*Rz/object[6].params.radius)
    });
    f_objects[6].__controllers[4].onFinishChange(function(value){
        object[6].geom.position.x = value*AU;
    });
    f_objects[6].__controllers[5].onFinishChange(function(value){
        object[6].geom.position.y = value*AU;
    });
    f_objects[6].__controllers[6].onFinishChange(function(value){
        object[6].geom.position.z = value*AU;
    });
    f_objects[6].__controllers[7].onFinishChange(function(value){
        object[6].params.vel.x = value/6000000;
    });
    f_objects[6].__controllers[8].onFinishChange(function(value){
        object[6].params.vel.y = value/6000000;
    });
    f_objects[6].__controllers[9].onFinishChange(function(value){
        object[6].params.vel.z = value/6000000;
    });
    f_objects[6].__controllers[10].onFinishChange(function(value){
        FOCUS = object[6].geom;
        PAN = false;
    });
    //
    f_objects[7].__controllers[0].onFinishChange(function(value){
        object[7].name = value;
    });
    f_objects[7].__controllers[1].onFinishChange(function(value){
        object[7].params.mass = value*Mz;
    });
    f_objects[7].__controllers[2].onFinishChange(function(value){
        object[7].params.i = value;
    });
    f_objects[7].__controllers[3].onFinishChange(function(value){
        setScale(object[7], value*Rz/object[7].params.radius)
    });
    f_objects[7].__controllers[4].onFinishChange(function(value){
        object[7].geom.position.x = value*AU;
    });
    f_objects[7].__controllers[5].onFinishChange(function(value){
        object[7].geom.position.y = value*AU;
    });
    f_objects[7].__controllers[6].onFinishChange(function(value){
        object[7].geom.position.z = value*AU;
    });
    f_objects[7].__controllers[7].onFinishChange(function(value){
        object[7].params.vel.x = value/7000000;
    });
    f_objects[7].__controllers[8].onFinishChange(function(value){
        object[7].params.vel.y = value/7000000;
    });
    f_objects[7].__controllers[9].onFinishChange(function(value){
        object[7].params.vel.z = value/7000000;
    });
    f_objects[7].__controllers[10].onFinishChange(function(value){
        FOCUS = object[7].geom;
        PAN = false;
    });
    //
    f_objects[8].__controllers[0].onFinishChange(function(value){
        object[8].name = value;
    });
    f_objects[8].__controllers[1].onFinishChange(function(value){
        object[8].params.mass = value*Mz;
    });
    f_objects[8].__controllers[2].onFinishChange(function(value){
        object[8].params.i = value;
    });
    f_objects[8].__controllers[3].onFinishChange(function(value){
        setScale(object[8], value*Rz/object[8].params.radius)
    });
    f_objects[8].__controllers[4].onFinishChange(function(value){
        object[8].geom.position.x = value*AU;
    });
    f_objects[8].__controllers[5].onFinishChange(function(value){
        object[8].geom.position.y = value*AU;
    });
    f_objects[8].__controllers[6].onFinishChange(function(value){
        object[8].geom.position.z = value*AU;
    });
    f_objects[8].__controllers[7].onFinishChange(function(value){
        object[8].params.vel.x = value/8000000;
    });
    f_objects[8].__controllers[8].onFinishChange(function(value){
        object[8].params.vel.y = value/8000000;
    });
    f_objects[8].__controllers[9].onFinishChange(function(value){
        object[8].params.vel.z = value/8000000;
    });
    f_objects[8].__controllers[10].onFinishChange(function(value){
        FOCUS = object[8].geom;
        PAN = false;
    });
    //
    f_objects[9].__controllers[0].onFinishChange(function(value){
        object[9].name = value;
    });
    f_objects[9].__controllers[1].onFinishChange(function(value){
        object[9].params.mass = value*Mz;
    });
    f_objects[9].__controllers[2].onFinishChange(function(value){
        object[9].params.i = value;
    });
    f_objects[9].__controllers[3].onFinishChange(function(value){
        setScale(object[9], value*Rz/object[9].params.radius)
    });
    f_objects[9].__controllers[4].onFinishChange(function(value){
        object[9].geom.position.x = value*AU;
    });
    f_objects[9].__controllers[5].onFinishChange(function(value){
        object[9].geom.position.y = value*AU;
    });
    f_objects[9].__controllers[6].onFinishChange(function(value){
        object[9].geom.position.z = value*AU;
    });
    f_objects[9].__controllers[7].onFinishChange(function(value){
        object[9].params.vel.x = value/9000000;
    });
    f_objects[9].__controllers[8].onFinishChange(function(value){
        object[9].params.vel.y = value/9000000;
    });
    f_objects[9].__controllers[9].onFinishChange(function(value){
        object[9].params.vel.z = value/9000000;
    });
    f_objects[9].__controllers[10].onFinishChange(function(value){
        FOCUS = object[9].geom;
        PAN = false;
    });

}






