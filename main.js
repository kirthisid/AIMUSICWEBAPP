function preload() {
    song1 = loadSound("song1.mp3")
    song2 = loadSound("song2.mp3")
}

function setup() {
    canvas = createCanvas(600, 500)
    canvas.center()
    video = createCapture(VIDEO)
    video.hide()
}

function draw() {
    image(video, 0, 0, 600, 500)
    fill("red")
    if (leftscore > 0.2) {
        song2.stop()
        song1.play()
        circle(lwx, lwy, 20)
        document.getElementById("status").innerHTML = "Playing: S.Year"
        song1.setVolume(0.5)

    }
    if (rightscore > 0.2) {
        song1.stop()
        circle(rwx, rwy, 20)

        song2.play()
        document.getElementById("status").innerHTML = "Playing: MIDNIGHT"
        song2.setVolume(0.5)

    }
}


function start() {
    poseNet = ml5.poseNet(video, modelLoaded)
    poseNet.on("pose", gotPoses)
    document.getElementById("status").innerHTML = "model is loading"
}

song1 = ""
song2 = ""


lwx = 0
rwx = 0
lwy = 0
rwy = 0
leftscore = ""
rightscore = ""



function modelLoaded() {
    console.log("model is ready");
    document.getElementById("status").innerHTML = "model loaded"

}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        lwx = results[0].pose.leftWrist.x
        lwy = results[0].pose.leftWrist.y
        rwx = results[0].pose.rightWrist.x
        rwy = results[0].pose.rightWrist.y
        leftscore = results[0].pose.keypoints[9].score
        rightscore = results[0].pose.keypoints[10].score


        console.log("lx=" + lwx + " ly=" + lwy);
        console.log("rx=" + rwx + " ry=" + rwy);
    }
}