import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-foto',
  templateUrl: './foto.component.html',
  styleUrls: ['./foto.component.css']
})
export class FotoComponent implements OnInit {

  numbers = Array(5).fill().map((x, i) => i); // [0,1,2,3,4]
       slideIndex = 1;
//showSlides(slideIndex);

 plusSlides(n) {
  this.showSlides(this.slideIndex += n);
}

currentSlide(n) {
  this.showSlides(this.slideIndex = n);
}




showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides") as HTMLCollectionOf<HTMLElement>;

  if (n > slides.length) {
    this.slideIndex = 1
  }
  if (n < 1) {
    this.slideIndex = slides.length
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slides[this.slideIndex - 1].style.display = "block";
}



  constructor() { }

  ngOnInit() {
    this.showSlides(this.slideIndex);
  }

}
