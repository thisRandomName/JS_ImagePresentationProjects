let slideIndex=1;
showSlides(slideIndex);


// move (+-n)slides
function slideShow(n){
	showSlides(slideIndex +=n);
}

//show the n-th slide
function currentSlide(n){
	showSlides(slideIndex=n);
}

function showSlides(n){
	 
	const slides=document.getElementsByClassName("slides");
	console.log(slides);
	const dots=document.getElementsByClassName("dot");
	console.log(dots);

	if(n>slides.length){
		slideIndex=1;

	}
	if(n<1){
		slideIndex=slides.length;
	}

	//style.display  DOM property: none / block -> hides / displays the style
    //make all slides inactive:
	for(let i=0;i<slides.length;i++){
		slides[i].style.display="none";
	}

	for(let i=0;i<dots.length;i++){
		//blank + className !!!!!!
		dots[i].className=dots[i].className.replace(" active","");
	}
     // activate the n-th slide:
	slides[slideIndex-1].style.display="block"; 
	dots[slideIndex-1].className += " active";
	
}