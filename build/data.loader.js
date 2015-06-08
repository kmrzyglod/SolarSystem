//Funkcja ładująca dane o obiekatach w formacie JSON
function loadObjects ()
{
    var url = "data/data.json"
    var data = null;
    $.ajax({
        dataType: "json",
        url: url,
        async: false,
        data: data,
        success: function (data) {
            object_gui = data.objects;
            for(i=0;i<data.objects.length;i++)
            {
                data.objects[i].position = new THREE.Vector3(data.objects[i].position.x, data.objects[i].position.y, data.objects[i].position.z);
                data.objects[i].params.vel = new THREE.Vector3(data.objects[i].params.vel.x, data.objects[i].params.vel.y,  data.objects[i].params.vel.z);
                data.objects[i].geom = null;
                data.objects[i].trail = null;
                data.objects[i].ghost = null;
                data.objects[i].atmosphere = {};
                if(data.objects[i].params.i!=0)
                {
                    var tmp;
                    data.objects[i].position.y = Math.sin(data.objects[i].params.i / 180 * Math.PI) * data.objects[i].position.x;
                    tmp = Math.cos(data.objects[i].params.i / 180 * Math.PI) *data.objects[i].position.x;
                    data.objects[i].position.x = tmp;
                    data.objects[i].position.z = 0;//Math.sin(data.objects[i].params.N / 180 * Math.PI) * tmp;
                }

            }
            object = data.objects;
        },
        error: function ()
        {
            alert("Error loading the data file !");
        }
    });

}