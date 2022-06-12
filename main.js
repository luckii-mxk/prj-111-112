// https://teachablemachine.withgoogle.com/models/B2O23kr2w/

prediction = "";

Webcam.set({
    width:350,
    height:300,
    image_format: 'png',
    png_quality:90
})

camera = document.getElementById("camera");

Webcam.attach("#camera");


function take_snapshot() {
    Webcam.snap(function (data_uri) { document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '">'})

}

console.log('ml5 version, ml5.version')

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/B2O23kr2w/model.json', modelLoaded)

function modelLoaded() {
    console.log('Model Loaded.')
}

function check() {
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult)
}


















function speak(){
    var synth = window.speechSynthesis;
    
    if (prediction == "Yes") {
        speak_data = "The prediction is a thumbs up gesture. This means yes or OK.";
    } else if (prediction == "Amazing") {
        speak_data = "The prediction is a super gesture. This means amazing or superb.";
    } else {
        speak_data = "The prediction is a peace gesture. This means peace.";
    }

    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}

function gotResult (error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("result_gesture_name").innerHTML = results[0].label;

        prediction = results[0].label;
        speak();

        // #1
        if(results[0].label == "Yes") {
            document.getElementById("update_emoji").innerHTML = "&#128077"
        }

        if(results[0].label == "Amazing") {
            document.getElementById("update_emoji").innerHTML = "&#128076"
        }

        if(results[0].label == "Peace") {
            document.getElementById("update_emoji").innerHTML = "&#9996"
        }

    }

}
