$(function(){
  $('.btn-reinicio').click(function(){
    cambiarColor1($('.main-titulo'))
  })
});

function cambiarColor1(elemento){
  $(elemento).animate({
    color: 'white'
  }, 1000, function(){
    cambiarColor2($(elemento))
  })
};

function cambiarColor2(elemento){
  $(elemento).animate({
    color: 'yellow'
  }, 1000, function(){
    cambiarColor1(elemento)
  })
};
