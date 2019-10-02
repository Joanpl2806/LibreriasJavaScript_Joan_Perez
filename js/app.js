$(function(){
  $('.btn-reinicio').click(function(){
    cambiarColor1($('.main-titulo'))
    llenarTabla()
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

function numeroRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function generarDulce(numCol){
  var n = numeroRandom(1,5)
  $('.col-'+numCol).prepend($('<img src="image/'+n+'.png">'))
}

function llenarTabla(){
  for(let i=1; i<8; i++){
    for(let j=1; j<7; j++){
      generarDulce(i)
    }
  }
}
