$(document).ready(function(){
    $.ajax({
      type: "GET",
      url: "/data",
      success: function(data){
        appendDom(data);
        studentArray = data.kappa;
        $('.leftbutton').on('click', leftButton);
        $('.rightbutton').on('click', rightButton);
        $('.slider').on('click','button', changeSlide)
        $('.kappans').children().first().show();
        $('#slide' + studentSpotlight).toggleClass("highlight")
        autoSlide();
      }
    });
});

var studentSpotlight = 1;
var counter = 1;
const FADE_TIME = 500;        // Time between each slide
const DISPLAY_TIME = 10000;    // Show time
function appendDom(jsonFile){
  var kappaArray = jsonFile.kappa;

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
  $el = $('.kappans').children().last();
  $el.append('<h2>'+ student.name + '</p>');
  $el.append('<p>'+ student.location + '</p>');
  //  $el.append('<p>'+ student.spirit_animal+ '</p>');
  $el.append('<p class="shoutout">'+ student.shoutout + '</p>');
  $el.css("background-image", "url(" + student.image +")");
  $('.slider').append('<button class="sliderbutton" id="slide' + counter + '">o</button>');
  $('.slider').children().last().data("person",counter);
}

var slideTimer;
function autoSlide(){
  slideTimer = setInterval(rightButton, DISPLAY_TIME);
}
function changeSlide(){
  var requestedPerson = $(this).data("person");
  clearInterval(slideTimer);
  $('#'+ studentSpotlight).fadeOut(FADE_TIME);
  $('#slide' + studentSpotlight).toggleClass("highlight")
  studentSpotlight = requestedPerson;
  $('#'+ studentSpotlight ).delay(FADE_TIME).fadeIn(FADE_TIME);
  $('#slide' + studentSpotlight).toggleClass("highlight")
  autoSlide();
}
// //Refreshes navigation buttons
// function updateSlider(){
//   for(var i = 1; i < counter; i++){
//     $('#slider'+i).text('o');
//   }
//   $('#slider'+ studentSpotlight).text('•');
// }
//Changes to next slide
function rightButton(){
  clearInterval(slideTimer);
  $('#'+ studentSpotlight).fadeOut(FADE_TIME);
  $('#slide' + studentSpotlight).toggleClass("highlight")
    if(studentSpotlight < studentArray.length){
    //slide next user left
    studentSpotlight++;
    $('#'+ studentSpotlight ).delay(FADE_TIME).fadeIn(FADE_TIME);
    $('#slide' + studentSpotlight).toggleClass("highlight")
  } else{
    studentSpotlight = 1;
    $('#'+ studentSpotlight ).delay(FADE_TIME).fadeIn(FADE_TIME);
    $('#slide' + studentSpotlight).toggleClass("highlight")
  }
  autoSlide();
  //updateSlider();
}
//Changes to previous slide
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
