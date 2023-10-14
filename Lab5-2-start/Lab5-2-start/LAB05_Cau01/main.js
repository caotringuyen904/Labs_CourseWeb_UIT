// 21522918 - NGUYEN CAO TRI//
// “1. COMPLETE VARIABLE AND FUNCTION DEFINITIONS”

const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

function randomValueFromArray(array) {
    const random = Math.floor(Math.random() * array.length);
    return array[random];
}

// “2. RAW TEXT STRINGS”

let storyText = "It was 94 fahrenheit outside, so :insertx: went for a walk. When they got to :inserty:, they stared in horror for a few moments, then :insertz:. Bob saw the whole thing, but was not surprised — :insertx: weighs 300 pounds, and it was a hot day.";
let insertX = ["Willy the Goblin", "Big Daddy", "Father Christmas"];
let insertY = ["the soup kitchen", "Disneyland", "the White House"];
let insertZ = ["spontaneously combusted", "melted into a puddle on the sidewalk", "turned into a slug and crawled away"];

// “3. EVENT LISTENER AND PARTIAL FUNCTION DEFINITION”

randomize.addEventListener('click', result);

function result() {
    let newStory = storyText; // Create a copy of the original story text
    console.log(customName);

    const customNameValue = customName.value.trim(); // Get the value from the input field and trim whitespace
    console.log(customName);

    if (customNameValue !== '') {
        newStory = newStory.replace(/Bob/g, customNameValue); // Replace "Bob" with the custom name
    }
    if (document.getElementById("uk").checked) {
        const weightPounds = 300;
        const temperatureFahrenheit = 94;

        // Convert Fahrenheit to Centigrade (Celsius)
        const temperatureCentigrade = Math.round((temperatureFahrenheit - 32) * 5 / 9);

        const weightStones = weightPounds / 14;

        newStory = newStory.replace(/94 fahrenheit/g, `${temperatureCentigrade} centigrade`);
        newStory = newStory.replace(/300 pounds/g, `${weightStones.toFixed(2)} stone`);
    }


    // Replace placeholders with random values
    const randomX = randomValueFromArray(insertX);
    newStory = newStory.replace(/:insertx:/g, randomX);
    newStory = newStory.replace(":inserty:", randomValueFromArray(insertY));
    newStory = newStory.replace(":insertz:", randomValueFromArray(insertZ));

    story.textContent = newStory;
    story.style.visibility = 'visible';
}
