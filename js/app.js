var leftIni, leftFin, topIni, topFin
var puntuacion = 0

$(function(){
  $('.btn-reinicio').click(function(){
    cambiarColor1($('.main-titulo'))
    llenarTabla()
    iniciarDulces()
    eliminarDulces()
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
    var col = $('.col-'+i).find('img').length
    for(let j=6; col<j; col++){
      generarDulce(i)
    }
  }
}

function iniciarDulces(){
  $('img').draggable({
    start: function(event,ui){
      leftIni = $(ui.offset.left)[0]
      topIni = $(ui.offset.top)[0]
    }
  })
  $('img').droppable({
    drop: function(event,ui){
      leftFin = $(ui.draggable)[0].offsetLeft
      topFin = $(ui.draggable)[0].offsetTop
      if(validarMovimiento() == true){
        $(ui.draggable).draggable({revert: 'valid'})
        var img1 = $($(ui.draggable)[0]).attr('src')
        var img2 = $(this).attr('src')
        $($(ui.draggable)[0]).attr('src',img2)
        $(this).attr('src',img1)
      }else {
        $(ui.draggable).draggable({revert: 'valid'})
      }
    }
  })
}

function validarMovimiento(){
  if(movDerecha() == true){
    return true
  }else if (movIzquierda() == true) {
    return true
  }else if (movArriba() == true) {
    return true
  }else if (movAbajo() == true) {
    return true
  }else {
    return false
  }
}

function movDerecha(){
  var left1 = leftIni+110
  var left2 = leftIni+260
  var top1 = topIni-50
  var top2 = topIni+132
  var leftF1 = leftFin+110
  var topF1 = topFin+110

  if((leftFin >= left1 && leftF1 <= left2) && (topFin >= top1 && topF1 <= top2)){
    return true
  }else{
    return false
  }
}

function movIzquierda(){
  var left1 = leftIni-140
  var left2 = leftIni+30
  var top1 = topIni-50
  var top2 = topIni+132
  var leftF1 = leftFin+110
  var topF1 = topFin+110

  if((leftFin >= left1 && leftF1 <= left2) && (topFin >= top1 && topF1 <= top2)){
    return true
  }else{
    return false
  }
}

function movArriba(){
  var left1 = leftIni-50
  var left2 = leftIni+150
  var top1 = topIni-150
  var top2 = topIni+50
  var leftF1 = leftFin+110
  var topF1 = topFin+110

  if((leftFin >= left1 && leftF1 <= left2) && (topFin >= top1 && topF1 <= top2)){
    return true
  }else{
    return false
  }
}

function movAbajo(){
  var left1 = leftIni-50
  var left2 = leftIni+150
  var top1 = topIni+110
  var top2 = topIni+260
  var leftF1 = leftFin+110
  var topF1 = topFin+110

  if((leftFin >= left1 && leftF1 <= left2) && (topFin >= top1 && topF1 <= top2)){
    return true
  }else{
    return false
  }
}

function eliminarDulces(){
  var img1, img2, img3, imgCol1, imgCol2, imgCol3, fila1, fila2, fila3

  for(let i=1; i<8; i++){
    for(let j=0; j<6; j++){
      imgCol1 = $('.col-'+i).find('img')
      imgCol2 = $('.col-'+(i-1)).find('img')
      imgCol3 = $('.col-'+(i+1)).find('img')

      fila1 = $(imgCol1[j]).attr('src')
      fila2 = $(imgCol2[j]).attr('src')
      fila3 = $(imgCol3[j]).attr('src')

      img1 = $(imgCol1[j]).attr('src')
      img2 = $(imgCol1[j-1]).attr('src')
      img3 = $(imgCol1[j+1]).attr('src')

      if(img1 == img2 && img1 == img3)
      {
        $(imgCol1[j]).addClass('eliminar')
        $(imgCol1[j-1]).addClass('eliminar')
        $(imgCol1[j+1]).addClass('eliminar')
      }

      if(fila1 == fila2 && fila1 == fila3){
        $(imgCol1[j]).addClass('eliminar')
        $(imgCol2[j]).addClass('eliminar')
        $(imgCol3[j]).addClass('eliminar')
      }
    }
  }
  animacionEliminar()
}

function animacionEliminar(){
  var puntos = $('.eliminar').length * 10
  puntuacion = puntuacion + puntos;
  $("#score-text").text(puntuacion);
  $('.eliminar').hide('pulsate', 2000, function(){
    $(this).remove()
    llenarTabla()
  })
}
