// When the user scrolls down 20px from the top of the document, show the button




window.onload = function() {
var n = 1;
addheader();
addfooter();
collapsetraits();
//addslides()





}


function collapsetraits(){
var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
}
}


function showSlides() {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slides[slideIndex - 1] = "block";
}

function addheader() {

    var code ="<h1>Le Chantemerle</h1>";
    document.getElementById("header").innerHTML = code;

}

function addfooter(){
  var code =  "<div class='f2'><h3>Contact</h3><h6>Neem gerust contact op.</h6><p>Telefoon: 0172 6056 24</p><p>Mail: info@chantemerle.nl -- <a href='#'>Meer..</a></p></div>  <div class='f2'><h3>Hallo, welcome</h3><p>Wij hebben deze site gebouwd, omdat wij meer wilde vertellen over ons huis.</p><p>Groet! Anthony</p></div>" ;
  document.getElementById("info").innerHTML = code;

}







window.onscroll = function() {

  scrollFunction();


}



function scrollFunction() {
  if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
    document.getElementById("myBtn").style.display = "block";
  } else {
    document.getElementById("myBtn").style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}



function make_slide_code(value){
  code = "";
  for (i = 1; i < value; i++) {
    code=code +"<img src='../img/" +i+".jpg' style='width:100%'></div>";

  }

  return code.toString();

}


//add hmtl code
function addslides() {
  code="<h1>UwU</h1>";
  code = make_slide_code(29);
  document.getElementById("slideshow").innerHTML = code;

}
