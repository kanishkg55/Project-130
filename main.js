song1 = "";
song2 = "";
leftWristY = 0;
leftWristX = 0;
rightWristY = 0;
rightWristX = 0;
scoreRightWrist = 0;
scoreLeftWrist = 0;
song_status = "";

function setup()
{
    canvas = createCanvas(500,600);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    PoseNet = ml5.poseNet(video, ModelLoaded);
}

function ModelLoaded()
{
    console.log("Posenet is initialized");
}

function draw()
{
    image(0,0,500,600);
    fill("4b0082");
    stroke("#FF0000");
    circle(leftWristX,leftWristY,20);
    if(scoreRightWrist > 0.2)
    {
        song_status = song2.isPlaying();
        circle(rightWristX,rightWristY,5);
        song1.stop();
        if(song_status == false)
        {
            song2.play();
            document.getElementById("song").innerHTML = "song playing : Ruth B. - Lost"
        }
    }

    if(scoreLeftWrist > 0.2)
    {
        song_status = song1.isPlaying();
        circle(leftWristX,leftWristY,5);
        song2.stop();
        if(song_status == false)
        {
            song1.play();
            document.getElementById("song").innerHTML = "song playing : Ruth B. - Lost"
        }
    }
}
function play()
{
    song1.play();
    song2.play();
}

function preLoad()
{
    song1 = 'Harry Potter Theme Song.mp3';
    song2 = 'Ruth B. - Lost (Lyrics).mp3';
}

function gotPoses()
{
    if(results.length > 0)
    {
        console.log(results)
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist)
        console.log("scoreRightWrist = " + scoreRightWrist);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = "+leftWristX+"leftWristY = "+leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = "+righttWristX+"rightWristY = "+rightWristY);
    }
}