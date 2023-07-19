function get_lotes_categoria(id_categoria, id_leilao) {

  $("#get_lotes_categoria").hide();
  $('#loading_lotes').show();


  $.ajax({
    url: "./get/",
    type: "POST",
    dataType: 'html', 
    cache: false,
    data: {'id_categoria':id_categoria, 'id_leilao':id_leilao},
    success: function (response) {

      $("#get_lotes_categoria").html(response);
      $('#loading_lotes').hide();
      $("#get_lotes_categoria").show();
      
    },
    error:function () {
      mensagens_erro('Erro! Não foi possível obter os animais no momento! Atualize a page e tente novamente.');
      $('#loading_lotes').hide();
      $("#get_lotes_categoria").show();
    }
  });

  console.log('get_lotes_categoria()');
}


$(document).on('ready', function () {

  // CONTADOR
  var countdowns = $.HSCore.components.HSCountdown.init('.js-countdown', {
    yearsElSelector: '.js-cd-years',
    monthElSelector: '.js-cd-month',
    daysElSelector: '.js-cd-days',
    hoursElSelector: '.js-cd-hours',
    minutesElSelector: '.js-cd-minutes',
    secondsElSelector: '.js-cd-seconds'
  });

});

