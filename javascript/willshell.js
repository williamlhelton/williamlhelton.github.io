// id "willshell" is the main shell div itself
// id "willshell-output-box" is the text box
// id "willshell-input-line"
var shell = document.querySelector("#willshell");
var output = document.querySelector(".willshell-output-box");
var input = document.querySelector(".willshell-input-line");

// initialize textbox value on refresh
input.value = '';

// event for toggling shell from main site
window.addEventListener("keypress", function(e) {
    if (e.code == "Backquote") {
        // set an "active" class for the shell for CSS to style
        shell.classList.toggle("shell-active");

        // toggle between hiding and showing the shell
        if (shell.style.display == "block") {
            shell.style.display = "none";
            input.value='';
        } else {
            shell.style.display = "block";
            input.value='';
            input.focus();
            input.selectionStart = input.selectionEnd = input.value.length;
        }
    }
});

// event for putting focus in text box on mouse click anywhere in shell
shell.addEventListener("click", function(){
    input.focus();
    input.selectionStart = input.selectionEnd = input.value.length;
});


// event to listen for user commands from input box
// which then calls a processing function
input.addEventListener("keypress", function(e) {
    if(e.code == "Enter" || e.code == "NumpadEnter"){
        checkUserInput(input.value);
        input.value = '';
    }
});

// process user input command
async function checkUserInput(userInputString){
    // if empty just return
    if(userInputString == ''){
        shellAppend('>> ');
        return;
    }

    // set up possible split between command and params
    var userCommand = '';
    var userParams = '';    

    // check if need to split command with space
    if(userInputString.indexOf(' ') == -1){
        userCommand += userInputString;
    } else {
        var spaceFound = userInputString.indexOf(" ");
        userCommand += userInputString.substring(0, spaceFound);
        userParams += userInputString.substring(spaceFound+1);
    }

    shellAppend('>> ' + userCommand);
    if(userParams){
        shellAppend('>> (params) ' + userParams);
    }

    //
    // MAIN COMMAND CHECKING SECTION
    // ONE HUGE IF STATEMENT
    // GET READY
    //

    if(userCommand == "clr"){
        output.innerHTML = '';
    }

    // nuke the page
    // this blows everything up including the will shell
    else if(userCommand == "nuke"){
        document.body.style.background = "none";
        document.querySelector('body').innerHTML = "";
        var nukeDiv = document.createElement('div');
        document.body.appendChild(nukeDiv);
        nukeDiv.style.textAlign = 'center';
        nukeDiv.style.fontSize = '6em';
        nukeDiv.style.color = 'black';
        nukeDiv.innerHTML = 'page nuked';
    }

    // color the page
    // checks if param is a valid CSS color keyword
    // then changes page trim
    else if(userCommand == "color"){
        console.log(userParams);
        var valid = isColor(userParams);
        if(valid){
            changeColor(userParams);
            shellAppend('Changed color trim to ' + userParams + '!');
        } else {
            shellAppend(userParams + ' is not a valid color!');
        }
    }

    // help lists all commands
    else if(userCommand == 'help'){
        shellAppend(`WillShell commands:<br>
        clr - clears this page<br>
        nuke - nukes the page<br>
        color [valid CSS color] - color the website!<br>
        cynical - adds hidden content to blog posts<br>
        home, blog - takes you to the local web page<br>
        visit [valid URL] - takes you away to a better web page<br>
        turkey - turkey
        `);
    }

    // page names take you to the page
    else if(userCommand == 'home'){
        shellAppend('going home . . .');
        await sleep(2000);
        window.location.href = '/index.html';
    }
    else if(userCommand == 'blog'){
        shellAppend('going to blog . . .');
        await sleep(2000);
        window.location.href = '/blog.html';
    }

    // visit takes you to another page
    else if(userCommand == 'visit'){
        shellAppend('Goodbye!  Going to ' + userParams + ' . . .');
        await sleep(2000);
        window.location.href = userParams;
    }

    // cynical makes the hidden blog content appear
    else if(userCommand == 'cynical'){
        if(document.URL.indexOf("blog.html") > -1){
            toggleCynicalBlog();            
        } else{
            shellAppend('"cynical" is only used on blog!');
        }
    }

    // turkey
    else if(userCommand == 'turkey'){
        document.body.style.background = "url('../img/turkey.jpg') no-repeat center center fixed";
        shellAppend('turkey');
    }

    //
    // END OF MAIN COMMAND CHECKING SECTION
    // END OF ONE HUGE IF STATEMENT
    // THAT WAS BAD
    //

    else{
        shellAppend('Bad command!');
    }

    //scroll output box to bottom
    output.scrollTop = output.scrollHeight;
}

// check if param is a valid color
function isColor(colorName){
    var s = new Option().style;
    s.color = colorName;
    return s.color == colorName;
}

// set color trim on various elements
function changeColor(colorName){
    document.querySelector('header').style.color = colorName;
    document.querySelector('#navbar').style.backgroundColor = colorName;
    var myHeaders = document.querySelectorAll('.blurb h2');
    for(var i = 0; i < myHeaders.length; i++){
        myHeaders[i].style.backgroundColor = colorName;
    }
    var myBlogTitles = document.querySelectorAll('.blog-title');
    for(var i = 0; i < myBlogTitles.length; i++){
        myBlogTitles[i].style.backgroundColor = colorName;
    }

    document.querySelector('footer').style.backgroundColor = colorName;
}

// toggle cynical blog posts and sentences
function toggleCynicalBlog(){
    // toggle cynical blog posts
    var blogTitles = document.querySelectorAll('.blog-title.cynical');
    var onOrOff = false;

    for(var i = 0; i < blogTitles.length; i++){
        console.log(blogTitles[i].style.display);
        if (blogTitles[i].style.display == "block") {
            blogTitles[i].style.display = "none";
        } else {
            blogTitles[i].style.display = "block";
            input.focus();
            input.selectionStart = input.selectionEnd = input.value.length;
            onOrOff = true;
        }
    }

    // toggle cynical sentences
    var blogSentences = document.querySelectorAll('span.cynical');
    console.log(blogSentences.length);
    for(var i = 0; i < blogSentences.length; i++){
        console.log(blogSentences[i].style.display);
        if (blogSentences[i].style.display == "inline") {
            blogSentences[i].style.display = "none";
        } else {
            blogSentences[i].style.display = "inline";
            input.focus();
            input.selectionStart = input.selectionEnd = input.value.length;
        }
    }

    // clean up hanging open blog posts
    var blogContent = document.querySelectorAll('.blog-content.cynical');
    console.log(blogContent.length);
    for(var i = 0; i < blogContent.length; i++){
        console.log(blogContent[i].style.display);
        if (blogContent[i].style.display == "block") {
            blogContent[i].style.display = "none";
        }        
    }

    // print to will shell
    if(onOrOff){
        shellAppend('cynical blog activated!');
    } else {
        shellAppend('cynical blog deactivated!');
    }
}

// sleep, takes milliseconds
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// append to will shell
function shellAppend(message){
    output.innerHTML += message + '<br>';
}