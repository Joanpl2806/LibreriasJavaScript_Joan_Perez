var leftIni, leftFin, topIni, topFin, t, o
var puntuacion = 0
var movimientos = 0

$(function(){
  $('.btn-reinicio').click(function(){
    if($('.btn-reinicio').text() == 'Iniciar'){
      $('.btn-reinicio').text('Reiniciar')
      cambiarColor1($('.main-titulo'))
      llenarTabla()
      cronometro()
    }else {
      reiniciarJuego()
    }
  })
});

function cambiarColor1(elemento){
  $(elemento).animate({
    color: 'white'
  }, 500, function(){
    cambiarColor2($(elemento))
  })
};

function cambiarColor2(elemento){
  $(elemento).animate({
    color: 'yellow'
  }, 500, function(){
    cambiarColor1(elemento)
  })
};

function numeroRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function generarDulce(numCol){
  var n = numeroRandom(1,5)
  $('.col-'+numCol).prepend($('<img class="elemento" src="image/'+n+'.png">'))
}

function llenarTabla(){
  for(let i=1; i<8; i++){
    var col = $('.col-'+i).find('img').length
    for(let j=7; col<j; col++){
      generarDulce(i)
    }
  }
  iniciarDulces()
  eliminarDulces()
}

function iniciarDulces(){
  $('img').draggable({
    start: function(event,ui){
      leftIni = $(ui.offset.left)[0]
      topIni = $(ui.offset.top)[0]
    }
  })
  $('img').droppable({
    accept: 'img',
    drop: function(event,ui){
      leftFin = $(ui.draggable)[0].offsetLeft
      topFin = $(ui.draggable)[0].offsetTop
      $(ui.draggable).draggable({revert: true})
      if(validarMovimiento() == true){
        var img1 = $($(ui.draggable)[0]).attr('src')
        var img2 = $(this).attr('src')
        $($(ui.draggable)[0]).attr('src',img2)
        $(this).attr('src',img1)
        contarMovimientos()
      }
    },
    stop: function(){
      o = setTimeout(function(){
        eliminarDulces()
      },1000)
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
  var left1 = leftIni+90
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
  var left1 = leftIni-160
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
  var top1 = topIni+90
  var top2 = topIni+240
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
    for(let j=0; j<7; j++){
      imgCol1 = $('.col-'+i).find('img')
      imgCol2 = $('.col-'+(i-1)).find('img')
      imgCol3 = $('.col-'+(i+1)).find('img')

      fila1 = $(imgCol1[j]).attr('src')
      fila2 = $(imgCol2[j]).attr('src')
      fila3 = $(imgCol3[j]).attr('src')

      img1 = $(imgCol1[j]).attr('src')
      img2 = $(imgCol1[j-1]).attr('src')
      img3 = $(imgCol1[j+1]).attr('src')

      if((img1 == img2 && img1 == img3) && (fila1 == fila2 && fila1 == fila3)){
        $(imgCol1[j]).hide('pulsate',2000, function() {
          $(this).remove()
        })
        $(imgCol1[j-1]).hide('pulsate',2000, function() {
          $(this).remove()
        })
        $(imgCol1[j+1]).hide('pulsate',2000, function() {
          $(this).remove()
        })
        $(imgCol2[j]).hide('pulsate',2000, function() {
          $(this).remove()
        })
        $(imgCol3[j]).hide('pulsate',2000, function() {
          puntuacion = puntuacion + 20;
          $(this).remove()
        })
      }else if(fila1 == fila2 && fila1 == fila3){
        $(imgCol1[j]).hide('pulsate',2000, function() {
          $(this).remove()
        })
        $(imgCol2[j]).hide('pulsate',2000, function() {
          $(this).remove()
        })
        $(imgCol3[j]).hide('pulsate',2000, function() {
          puntuacion = puntuacion + 10;
          $(this).remove()
        })
      }else if(img1 == img2 && img1 == img3){
        $(imgCol1[j]).hide('pulsate',2000, function() {
          $(this).remove()
        })
        $(imgCol1[j-1]).hide('pulsate',2000, function() {
          $(this).remove()
        })
        $(imgCol1[j+1]).hide('pulsate',2000, function() {
          puntuacion = puntuacion + 10;
          $(this).remove()
        })
      }
    }
    $("#score-text").text(puntuacion);
  }
  o = setTimeout(function(){
    llenarTabla()
  },100)
}

function contarMovimientos(){
  movimientos = movimientos + 1
  $('#movimientos-text').text(movimientos)
}


function cronometro(){
  var m = 2
  var s = 60
  var t
  t = setInterval(function(){
    if(m == 2 && s == 60){
      m--
      s--
      $('#timer').text('0'+m+':'+s)
    }else if (s > 0 && s > 10) {
      s--
      $('#timer').text('0'+m+':'+s)
    }else if (s > 0 && s <= 10) {
      s--
      $('#timer').text('0'+m+':'+'0'+s)
    }else if (s == 0 && m != 0) {
      m--
      s = 59
      $('#timer').text('0'+m+':'+s)
    }else{
      clearInterval(t)
      clearTimeout(o)
      juegoTerminado()
    }
  },1000)
}

function juegoTerminado(){
  $('.panel-tablero').animate(
    {
      width: 0,
      height: 0
    },{
      step: function(){
        $(this).hide('fade', 2000)
      },
      queue: false,
      duration: 2000,
    }
  )

  $('.panel-score').animate(
    {
      width: '100%'
    },{
      duration: 2000,
      start: function(){
        $('.time').hide()
      },
      complete: function(){
        $(this).prepend('<div class="juego"></div>')
        $('.juego').prepend('<h2 class="titulo-over">Juego Terminado</h2>')
      }
    }
  )
}

function reiniciarJuego(){
  movimientos = 0
  puntuacion = 0
  $('img').remove()
  $('.juego').remove()
  $('.time').show()
  $('.panel-tablero').show()
  $('.panel-tablero').css({
      width: '70%',
      height: '700px'
  })
  $('.panel-score').css('width','25%')
  $('#score-text, #movimientos-text').text('0')
  $('#timer').text("02:00")
  $('.btn-reinicio').text('Iniciar')
}
