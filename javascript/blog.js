var blogTitle = document.getElementsByClassName("blog-title");

for(i = 0; i < blogTitle.length; i++){
    blogTitle[i].addEventListener("click", function(){
        // set an "active" class for the title bar for CSS to style
        if(this.classList.contains("cynical")){
            this.classList.toggle("active-cynical");
        } else{
            this.classList.toggle("active");
        }
        

        // toggle between hiding and showing the content
        var content = this.nextElementSibling;
        if(content.style.display == "block"){
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
}