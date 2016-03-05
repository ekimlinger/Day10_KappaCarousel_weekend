$(document).ready(function(){
    $.ajax({
      type: "GET",
      url: "/data",
      success: function(data){
        appendDom(data);
        studentArray = data.kappa;
        $('.leftbutton').on('click', leftButton);
        $('.rightbutton').on('click', rightButton);
        $('.kappans').children().first().show();
      }
    });
});

var studentSpotlight = 1;
var counter = 1;
function appendDom(jsonFile){
  var kappaArray = jsonFile.kappa;

  for (var i = 0; i < kappaArray.length; i++){
    var student = kappaArray[i];
      addDisplayedPerson(student);

    counter++;
  }
}
// Adds first person to the dom and is the ONLY one displayed
// until interaction starts
function addDisplayedPerson(student){
  $('.kappans').append('<div class="student" id="' + counter + '"></div>');
  $el = $('.kappans').children().last();
  $el.append('<h2>'+ student.name + '</p>');
  $el.append('<p>'+ student.location + '</p>');
//  $el.append('<p>'+ student.spirit_animal+ '</p>');
  $el.append('<p class="shoutout">'+ student.shoutout + '</p>');
  $el.css("background-image", "url(" + student.image +")");
}

function rightButton(){
  $('#'+ studentSpotlight).fadeOut(1000);
    if(studentSpotlight < studentArray.length){
    //slide next user left
    studentSpotlight++;
    $('#'+ studentSpotlight ).delay(1000).fadeIn(1000);
  } else{
    studentSpotlight = 1;
    $('#'+ studentSpotlight ).delay(1000).fadeIn(1000);
  }
}
function leftButton(){

  $('#'+ studentSpotlight).fadeOut(1000);
  if(studentSpotlight > 1){
    //slide previous user right
    studentSpotlight--;
    $('#'+ studentSpotlight ).delay(1000).fadeIn(1000);;
  } else{
    studentSpotlight = studentArray.length;
    $('#'+ studentSpotlight ).delay(1000).fadeIn(1000);
  }
}
