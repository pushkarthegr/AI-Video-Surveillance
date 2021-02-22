status = "";
objects = [];
function preload(){
    video = createVideo("video.mp4");
    video.hide();
}
function setup(){
    canvas = createCanvas(380,300);
    canvas.center();
}
function draw(){
    image(video,0,0,380,300);
    if(status != ""){
        objectDetector.detect(video,indentify);
        document.getElementById("status").innerHTML = "Status : Objects Detected";
        for(i = 0;i<objects.length;i++){
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected - "+objects.length;
            percent = floor(objects[i].confidence*100);
            fill("red");
            text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke("red");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}
function indentify(error,results){
    if(error){
        console.error(error);
    }else{
        console.log(results);
        objects = results;
    }
}
function start(){
    objectDetector = ml5.objectDetector('cocossd',modelloaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}
function modelloaded(){
    status = true;
    video.loop();
    video.speed(1);
}
function pause(){
    video.pause();
}
/*function uploadVideo(){
    file = document.getElementById("getVideo").files;
    console.log(file);
    finalFile = file[0];
    reader = new FileReader();
    reader.onload = function(event){
        video.stop();
        video = createVideo(event.target.result);
        videos = document.createElement("video");
        videos.setAttribute("src", event.target.result);
        video.loop();
        video.hide();
    }
    reader.readAsDataURL(finalFile);
}*/