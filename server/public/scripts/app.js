$(document).ready(function(){
    $.ajax({
      type: "GET",
      url: "/data",
      success: function(data){
        appendDom(data);
        studentArray = data.kappa;

        //Changes to next/previous student when clicked
        $('.leftbutton').on('click', leftButton);
        $('.rightbutton').on('click', rightButton);

        //Changes slide when nav button is clicked
        $('.slider').on('click','button', changeSlide);

        //Displays first student loaded
        $('.kappans').children().first().show();

        //Highlights first student's nav button
        $('#slide' + studentSpotlight).toggleClass("highlight");

        //Starts the slide interval
        autoSlide();
      }
    });
});

//keeps track of student that is currently displayed
var studentSpotlight = 1;
var studentArray;
//Total Ammount of students
var counter = 1;

// Time between each slide
const FADE_TIME = 500;

// Show time
const DISPLAY_TIME = 10000;

// Function loops through all students and appends dom
function appendDom(jsonFile){
  var kappaArray = jsonFile.kappa;
  //Loops through students
  for (var i = 0; i < kappaArray.length; i++){
    var student = kappaArray[i];
    addPersonAndButton(student);

    counter++;
  }
}

// Adds first person to the dom and is the ONLY one displayed
// until interaction starts
function addPersonAndButton(student){
  $('.kappans').append('<div class="student" id="' + counter + '"></div>');
  // Targets newly created student element
  $el = $('.kappans').children().last();
  // Appends info and sets background-image
  $el.append('<h2>'+ student.name + '</p>');
  $el.append('<p>'+ student.location + '</p>');
  $el.append('<p class="shoutout">'+ student.shoutout + '</p>');
  $el.css("background-image", "url(" + student.image +")");
  $('.slider').append('<button class="sliderbutton" id="slide' + counter + '">o</button>');
  // creates data to access from nav bar
  $('.slider').children().last().data("person",counter);
}

var slideTimer;
//Sets interval to slide next
function autoSlide(){
  slideTimer = setInterval(rightButton, DISPLAY_TIME);
}

//Allows change from nav button press
function changeSlide(){
  //Stores data from button press
  var requestedPerson = $(this).data("person");
  //Stops timer
  clearInterval(slideTimer);
  $('#'+ studentSpotlight).fadeOut(FADE_TIME);
  $('#slide' + studentSpotlight).toggleClass("highlight")
  // Sets new person to requested one
  studentSpotlight = requestedPerson;
  $('#'+ studentSpotlight ).delay(FADE_TIME).fadeIn(FADE_TIME);
  $('#slide' + studentSpotlight).toggleClass("highlight")
  autoSlide();
}

// Fades out current student and displays next student
function rightButton(){

  clearInterval(slideTimer);

  // Fades out of current student removes white/bolder
  $('#'+ studentSpotlight).fadeOut(FADE_TIME);
  $('#slide' + studentSpotlight).toggleClass("highlight")

  if(studentSpotlight < studentArray.length){
    //Fade into next student
    studentSpotlight++;
    $('#'+ studentSpotlight ).delay(FADE_TIME).fadeIn(FADE_TIME);
    // Nav button turns white & bolder
    $('#slide' + studentSpotlight).toggleClass("highlight")
  }
  else{
    // Fade into first student
    studentSpotlight = 1;
    $('#'+ studentSpotlight ).delay(FADE_TIME).fadeIn(FADE_TIME);
    $('#slide' + studentSpotlight).toggleClass("highlight")
  }
  //Resets interval
  autoSlide();
}

// Fades out current student and displays previous student
function leftButton(){
  clearInterval(slideTimer);
  $('#'+ studentSpotlight).fadeOut(FADE_TIME);
  $('#slide' + studentSpotlight).toggleClass("highlight")
  if(studentSpotlight > 1){
    //slide previous user right
    studentSpotlight--;
    $('#'+ studentSpotlight ).delay(FADE_TIME).fadeIn(FADE_TIME);;
    $('#slide' + studentSpotlight).toggleClass("highlight")
  } else{
    studentSpotlight = studentArray.length;
    $('#'+ studentSpotlight ).delay(FADE_TIME).fadeIn(FADE_TIME);
    $('#slide' + studentSpotlight).toggleClass("highlight")
  }

  autoSlide();
  //updateSlider();
}
