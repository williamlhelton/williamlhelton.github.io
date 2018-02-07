// Slideshow #1
// Variables for slideshow
var i = 0;
var time = 3000;
var runSlide;

// Variables for HTML elements
var bragHeader = document.getElementById("brag-header");
var bragText = document.getElementById("brag-text");

// Variables for box selectors
var boxID = document.getElementById("slideshow-buttons");
var boxes = boxID.getElementsByTagName("li");

// Content List
var content = [
    ["2", "Lorem ipsum dolor sit amet consectetur adipisicing elit."],
    ["8", "Borem bipsum bolor bit bamet bonsectetur badipisicing belit."],
    ["325", "Corem cipsum color cit camet consectetur cadipisicing celit."],
    ["90 billion", "Dorem dipsum dolor dit damet donsectetur dadipisicing delit."]
]

// Change Content
function changeImg(){
    blueCurrentBox();

    // Change Content
    bragHeader.innerHTML = content[i][0];
    bragText.innerHTML = content[i][1];

    // Start Main Loop
    runSlide = setTimeout(function(){
        slideLoop();
    }, time);
}

// Main Loop On Timer
function slideLoop(){
    grayCurrentBox();

    increaseI();

    changeImg();
}

// Force a Hard Trigger to Change Content
function hardTrigger(newI){
    grayCurrentBox();

    i = newI;
    clearTimeout(runSlide);
    changeImg();
}

// Increase and Decrease i
function increaseI(){
    if(i == content.length - 1){
        i = 0;
    } else {
        i++;
    }
}

function decreaseI(){
    if(i == 0){
        i = content.length - 1;
    } else {
        i--;
    }
}

// Behavior For Side Arrow Buttons
function leftArrow(){
    grayCurrentBox();
    decreaseI();
    hardTrigger(i);
}

function rightArrow(){
    grayCurrentBox();
    increaseI();
    hardTrigger(i);
}

// Change Selector Box Colors
function grayCurrentBox(){
    boxes[i].style.backgroundColor = "#ccc";
}

function blueCurrentBox(){
    boxes[i].style.backgroundColor = "#00f";
}

// Call Slideshow on Window Load
window.onload = changeImg();

// ***
// Slideshow #2
// I'VE MADE A HORRIBLE MISTAKE
// ***
// Variables for slideshow
var s2_i = 0;
var s2_images = [];
var s2_time = 3000;
var s2_runSlide;

// Variables for box selectors
var s2_boxID = document.getElementById("s2-slideshow-buttons");
var s2_boxes = s2_boxID.getElementsByTagName("li");

// Content List
s2_images[0] = 'img/img0.jpg';
s2_images[1] = 'img/img1.jpg';
s2_images[2] = 'img/img2.jpg';
s2_images[3] = 'img/img3.jpg';

// Change Content
function s2_changeImg(){
    s2_blueCurrentBox();

    // Change Content
    document.slides0.src = s2_images[s2_i];

    // Start Main Loop
    s2_runSlide = setTimeout(function(){
        s2_slideLoop();
    }, s2_time);
}

// Main Loop On Timer
function s2_slideLoop(){
    s2_grayCurrentBox();

    s2_increaseI();

    s2_changeImg();
}

// Force a Hard Trigger to Change Content
function s2_hardTrigger(s2_newI){
    s2_grayCurrentBox();

    s2_i = s2_newI;
    clearTimeout(s2_runSlide);
    s2_changeImg();
}

// Increase and Decrease i
function s2_increaseI(){
    if(s2_i == s2_images.length - 1){
        s2_i = 0;
    } else {
        s2_i++;
    }
}

function s2_decreaseI(){
    if(s2_i == 0){
        s2_i = s2_images.length - 1;
    } else {
        s2_i--;
    }
}

// Behavior For Side Arrow Buttons
function s2_leftArrow(){
    s2_grayCurrentBox();
    s2_decreaseI();
    s2_hardTrigger(s2_i);
}

function s2_rightArrow(){
    s2_grayCurrentBox();
    s2_increaseI();
    s2_hardTrigger(s2_i);
}

// Change Selector Box Colors
function s2_grayCurrentBox(){
    s2_boxes[s2_i].style.backgroundColor = "#ccc";
}

function s2_blueCurrentBox(){
    s2_boxes[s2_i].style.backgroundColor = "#00f";
}

// Call Slideshow on Window Load
window.onload = s2_changeImg();