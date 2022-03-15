song1="";
song2="";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
status = "";

function preload(){

    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");

}

function setup(){

    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function modelLoaded(){ 

    console.log("PoseNet Is Initialized");

}

function gotPoses(results){

    if(results.length > 0){

        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left Wrist X = " + leftWristX + " Left Wrist Y = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right Wrist X = " + rightWristX + " Right Wrist Y = " + rightWristY);

    }

}

function draw(){

    image(video, 0, 0, 600, 500);

    fill("red");
    stroke("red");
    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();

    if(scoreLeftWrist > 0.2){

        circle(leftWristX, leftWristY, 20);

        if(song1_status == true){

            song1.play();
    
        }

    }

}

function play(){

    song.play();
    song.setVolume(1);
    song.rate(1);
    
}