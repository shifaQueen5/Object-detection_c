bunny_panda = "";
human_elephant = "";
objects= [];
status1= "";

function preload(){
    human_elephant = loadImage('images.jpg');
}

function setup(){
    canvas = createCanvas(640,420);
    canvas.center();
    objectDetection= ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML= "Status : Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded!");
    objectDetection.detect(human_elephant,gotResult);
}

function gotResult(error,results){
    if (error){
        console.log(error);
    }
    else{
        status1 = true;
        console.log(results);
        objects= results;
    }
}

function draw(){
    image(human_elephant,0,0,640,420);
    if(status1!= ""){
    document.getElementById("status").innerHTML= "Status : Object Detected";
    document.getElementById("status").className="btn btn-info";

    length = objects.length;
    for(i=0;i<length;i++){
        object_name = objects[i].label;
        object_x = objects[i].x;
        object_y = objects[i].y;
        object_width = objects[i].width;
        object_height = objects[i].height;
        object_confidence = floor(objects[i].confidence*100);

        fill("#FF0000");
        noFill();
        text(object_name + " " + object_confidence + "%" , object_x + 15, object_y + 15);
        stroke("#FF0000");
        rect(object_x, object_y, object_width, object_height);
    }}
}