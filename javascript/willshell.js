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
function checkUserInput(userInputString){
    // if empty just return
    if(userInputString == ''){
        output.innerHTML += '>><br>';
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

    output.innerHTML += '>> ' + userCommand + '<br>';
    if(userParams){
        output.innerHTML += '>> (params) ' + userParams + '<br>';
    }

    //
    // MAIN COMMAND CHECKING SECTION
    // ONE HUGE IF STATEMENT
    // GET READY
    //

    // nuke the page
    // this blows everything up including the will shell
    if(userCommand == "nuke"){
        document.querySelector('body').innerHTML = "";
        var nukeDiv = document.createElement('div');
        document.body.appendChild(nukeDiv);
        nukeDiv.style.textAlign = 'center';
        nukeDiv.style.fontSize = '6em';
        nukeDiv.style.color = 'white';
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
            output.innerHTML += 'Changed color trim to ' + userParams + '!<br>';
        } else {
            output.innerHTML += userParams + ' is not a valid color!<br>';
        }
    }

    // help lists all commands
    else if(userCommand == 'help'){
        output.innerHTML += `WillShell commands:<br>
        nuke - nukes the page<br>
        color [valid CSS color] - color the website!<br>
        cynical - adds hidden content to blog posts<br>
        home, blog - takes you to the local web page<br>
        visit [valid URL] - takes you away to a better web page<br>
        turkey - turkey
        `;
    }

    // page names take you to the page
    else if(userCommand == 'home'){
        window.location.href = '/index.html';
    }
    else if(userCommand == 'blog'){
        window.location.href = '/blog.html';
    }

    // visit takes you to another page
    else if(userCommand == 'visit'){
        window.location.href = userParams;
    }

    // cynical makes the hidden blog content appear
    else if(userCommand == 'cynical'){
        if(document.URL.indexOf("blog.html") > -1){
            toggleCynicalBlog();
        } else{
            output.innerHTML += '"cynical" is only used on blog!';
        }
    }

    // turkey
    else if(userCommand == 'turkey'){
        document.body.style.background = "url('../img/turkey.jpg') no-repeat center center fixed";
        output.innerHTML += 'turkey<br>';
    }

    //
    // END OF MAIN COMMAND CHECKING SECTION
    // END OF ONE HUGE IF STATEMENT
    // THAT WAS BAD
    //

    else{
        output.innerHTML += 'Bad command!<br>';
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
    output.innerHTML += 'got to toggleCynicalBlog<br>';
    // toggle cynical blog posts
    var blogTitles = document.querySelectorAll('.blog-title.cynical');
    console.log(blogTitles[0].style.display);
    for(var i = 0; i < blogTitles.length; i++){
        output.innerHTML += 'got to title for loop<br>';
        console.log(blogTitles[i].style.display);
        if (blogTitles[i].style.display == "block") {
            blogTitles[i].style.display = "none";
        } else {
            blogTitles[i].style.display = "block";
            input.focus();
            input.selectionStart = input.selectionEnd = input.value.length;
        }
    }

    // toggle cynical sentences
    var blogSentences = document.querySelectorAll('span.cynical');
    console.log(blogSentences.length);
    for(var i = 0; i < blogSentences.length; i++){
        output.innerHTML += 'got to sentence for loop<br>';
        console.log(blogSentences[i].style.display);
        if (blogSentences[i].style.display == "inline") {
            output.innerHTML += 'got to sentence if<br>';
            blogSentences[i].style.display = "none";
        } else {
            blogSentences[i].style.display = "inline";
            output.innerHTML += 'got to sentence else<br>';
            input.focus();
            input.selectionStart = input.selectionEnd = input.value.length;
        }
    }

    // clean up hanging open blog posts
    var blogContent = document.querySelectorAll('.blog-content.cynical');
    console.log(blogContent.length);
    for(var i = 0; i < blogContent.length; i++){
        output.innerHTML += 'got to sentence for loop<br>';
        console.log(blogContent[i].style.display);
        if (blogContent[i].style.display == "inline") {
            blogContent[i].style.display = "none";
        }
    }
}