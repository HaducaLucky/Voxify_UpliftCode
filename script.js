const message = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector("#voices");
const rate = document.querySelector("#rate");
const pitch = document.querySelector("#pitch");
const text = document.querySelector("#text");
const speakButton = document.querySelector("#speak");
const stopButton = document.querySelector("#stop");

message.text= text.value;

function populateVoices() {
    voices= this.getVoices();
    for(let index= 0; index < voices.length; index++){
        const voiceOption = document.createElement("option");
        voiceOption.setAttribute("value", voices[index].name);
        voiceOption.innerHTML = `${voices[index].name} (${voices[index].lang})`;
        voicesDropdown.appendChild(voiceOption);
    }
}

function setVoice(){
    for(let index= 0; index < voices.length; index++){
        if(voices[index].name == this.value){
            message.voice = voices[index];
        }
    }
    toggle(true);
}

function toggle(startOver){
    speechSynthesis.cancel();
    if(startOver){
        speechSynthesis.speak(message);
    }

}

function setOption(){
    message[this.id] = this.value;
    toggle(true);
}

speechSynthesis.addEventListener("voiceschanged", populateVoices);
voicesDropdown.addEventListener("change", setVoice);
rate.addEventListener("change", setOption);
pitch.addEventListener("change", setOption);
text.addEventListener("change", setOption);
speakButton.addEventListener("click", () => toggle(true));
stopButton.addEventListener("click", () => toggle(false));
