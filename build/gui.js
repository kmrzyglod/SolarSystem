var animationState = true;
//Metody ustalające parametry planet

function setVelocityX(id, value)
{
    object[id].params.vel.x = value/1000000;
}
function setVelocityY(id, value)
{
    object[id].params.vel.x = value/1000000;
}
function setVelocityZ(id, value)
{
    object[id].params.vel.x = value/1000000;
}
function setMass(id, value)
{
    object[id].params.mass = value*Mz;
}
function setMassStar(id, value)
{
    object[id].params.mass = value*Ms;
}
function setRadius(id, value)
{
    //setScale(object[id], value*Rz/object[id].params.radius)
    object[id].params.radius=value*Rz;
}
//metoda tworząca slider
function createSlider(sliderID, inputID, min, max, fnc)
{
    $("#"+sliderID).slider({
        range: "min",
        value: 1,
        min: min,
        max: max,
        slide: function( event, ui ) {
            $( "#"+inputID ).val(ui.value );
            fnc($(this).attr("obj_id"), ui.value);
        }
    });
    $("#"+inputID ).val($( "#"+sliderID ).slider( "value" ) );
    $("#"+inputID).change(function() {
        $( "#"+sliderID ).slider({"value": $(this).val()});
        fnc($(this).attr("obj_id"), $(this).val());

    });
}
//metoda inicjalizujaca całe GUI
function initGUI() {
    $("#slider-animation-speed").slider({ //Inicjalizaja slidera szybkości animacji (jQueryUI silder)
        range: "min",
        value: 15,
        min: 1,
        max: 1000,
        slide: function (event, ui) {
            $("#input-animation-speed").val(ui.value);
            STEPS_PER_FRAME = 180 * ui.value;
        }
    });
    $("#slider-scale").slider({  //Inicjalizaja slidera skali planet
        range: "min",
        value: 1,
        min: 1,
        max: 10000,
        slide: function (event, ui) {
            $("#input-scale").val(ui.value);
            setScaleAll(object, ui.value);
        }
    });
    $("#input-animation-speed").val($("#slider-animation-speed").slider("value"));
    $("#input-scale").val($("#slider-scale").slider("value"));
    $("#input-scale").change(function () {
        $("#slider-scale").slider({"value": $(this).val()});
        setScaleAll(object, $(this).val());
    });
    $("#input-animation-speed").change(function () {
        $("#slider-animation-speed").slider({"value": $(this).val()});
        STEPS_PER_FRAME = 180 * $(this).val();
    });
    $("#btn-animation-state").click(function () {
        animationState = !animationState;
        if (animationState) {
            $("#btn-animation-state-description").html("Stop");
            $("#btn-animation-state-glyph").removeClass("glyphicon-play").addClass("glyphicon-stop");
            $("#btn-animation-state").removeClass("btn-success").addClass("btn-danger");
            PAUSE = false;
        }
        if (!animationState) {
            $("#btn-animation-state-description").html("Start");
            $("#btn-animation-state-glyph").removeClass("glyphicon-stop").addClass("glyphicon-play");
            $("#btn-animation-state").removeClass("btn-danger").addClass("btn-success");
            PAUSE = true;
        }
    });

    $("#btn-animation-restart").click(function () {
        location.reload();
    });

    for (i = 0; i < object_gui.length; i++) {
        $("#objects-menu").append('<li role="presentation"><a role="menuitem" tabindex="-1" href="#"  class="cosmos-object" id="' + i + '">' + object_gui[i].name + '</a></li>')
    }


    $(".cosmos-object").click(function () {
        $("#btn-animation-focus-on").attr({"obj_id": $(this).attr("id")});
        $("#btn-animation-focus-on").parent().parent().parent().show();
        $("#btn-animation-focus-on").click(function () {
            FOCUS = object[$(this).attr("obj_id")].geom;
            PAN = false;
        });
        $("#object-name").html(object_gui[$(this).attr("id")].name);
        $("#object-name").parent().parent().parent().show();
        $("#object-inclination").html(object_gui[$(this).attr("id")].params.i);
        $("#object-inclination").parent().parent().parent().show();

        $("#object-mass").attr({"obj_id": $(this).attr("id")});
        $("#object-mass").parent().parent().parent().show();
        $("#slider-object-mass").attr({"obj_id": $(this).attr("id")});


        if (object_gui[$(this).attr("id")].type != 0) {


            createSlider("slider-object-mass", "object-mass", 1, 1000, setMass);
            createSlider("slider-object-radius", "object-radius", 1, 10000, setRadius);
            createSlider("slider-object-velocity-x", "object-velocity-x", -100, 100, setVelocityX);
            createSlider("slider-object-velocity-y", "object-velocity-y", -100, 100, setVelocityY);
            createSlider("slider-object-velocity-z", "object-velocity-z", -100, 100, setVelocityZ);
            $("#object-mass-unity").html("Mass [Mz]: ");
            $("#object-mass").val(object_gui[$(this).attr("id")].params.mass / Mz);


            $("#object-radius").val(object_gui[$(this).attr("id")].params.radius / Rz);
            $("#object-radius").attr({"obj_id": $(this).attr("id")});
            $("#object-radius").parent().parent().parent().show();
            $("#slider-object-radius").attr({"obj_id": $(this).attr("id")});
            $("#slider-object-radius").slider({"value": object_gui[$(this).attr("id")].params.radius / Rz});

            $("#object-velocity-x").val(object_gui[$(this).attr("id")].params.vel.x * 1000000);
            $("#object-velocity-x").attr({"obj_id": $(this).attr("id")});
            $("#object-velocity-x").parent().parent().parent().show();
            $("#slider-object-velocity-x").attr({"obj_id": $(this).attr("id")});
            $("#slider-object-velocity-x").slider({"value": object_gui[$(this).attr("id")].params.vel.x * 1000000});

            $("#object-velocity-y").val(object_gui[$(this).attr("id")].params.vel.y * 1000000);
            $("#object-velocity-y").attr({"obj_id": $(this).attr("id")});
            $("#object-velocity-y").parent().parent().parent().show();
            $("#slider-object-velocity-y").attr({"obj_id": $(this).attr("id")});
            $("#slider-object-velocity-y").slider({"value": object_gui[$(this).attr("id")].params.vel.y * 1000000});

            $("#object-velocity-z").val(object_gui[$(this).attr("id")].params.vel.z * 1000000);
            $("#object-velocity-z").attr({"obj_id": $(this).attr("id")});
            $("#object-velocity-z").parent().parent().parent().show();
            $("#slider-object-velocity-z").attr({"obj_id": $(this).attr("id")});
            $("#slider-object-velocity-z").slider({"value": object_gui[$(this).attr("id")].params.vel.z * 1000000});


        }
        else {
            createSlider("slider-object-mass", "object-mass", 1, 100, setMassStar);
            $("#object-mass").val(object_gui[$(this).attr("id")].params.mass / Ms);
            $("#object-mass-unity").html("Mass [Ms]: ");

            $("#object-radius").parent().parent().parent().hide();
            $("#object-velocity-x").parent().parent().parent().hide();
            $("#object-velocity-y").parent().parent().parent().hide();
            $("#object-velocity-z").parent().parent().parent().hide();
        }


    });


}


