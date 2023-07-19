
$("#form_contato_empresa").submit(function(event) {
  
  event.preventDefault();

  $.ajax({
    url: "../includes/put/contato.php",
    type: "POST",
    data: $('#form_contato_empresa').serialize(),
    success: function (response){

      console.log(response);
      mensagens_resposta(response);
      
      var JSONArray = $.parseJSON(response);
      if (JSONArray['result'] == 'success') {

        // FECHA O MODAL, LIMPA O FORM E DESAPARECE COM O RECAPTCHA
        Custombox.modal.close()
        document.getElementById("form_contato_empresa").reset();
        $('.g-recaptcha').attr("hidden", true);
                
      }
    },
    error:function (){
      mensagens_erro('Não foi possível enviar sua mensagem no momento!<br>Atualize a página e tente novamente!');				
    }
  });
});






//---------------------------
// Faz o Login
//---------------------------

$("#form_login").submit(function(event) {
  
  event.preventDefault();
  
  $.ajax({				
    
    url: "../includes/acess/get_login.php",
    type: "POST",
    data: $('#form_login').serialize(),
    success: function (response) {

      console.log(response);
      mensagens_resposta(response);
      
      var JSONArray = $.parseJSON(response);
      if (JSONArray['result'] == 'success') {
        setTimeout(() => {
          location.reload();	
        }, 2000);

      }
      
    },
    error:function () {
      mensagens_erro('Não foi possível realizar o Login no momento!<br>Atualize a página e tente novamente!');
    }
  });
});


function open_modal_senha() {
  Custombox.modal.close();  // FECHA O MENU LOGIN
  setTimeout(() => {        // ABRE O MENU FOTOS
    new Custombox.modal({content: {effect: 'blur', target: '#modal_senha'}}).open();
  }, 1000);
}



$("#form_senha").submit(function(event) {
  
  event.preventDefault();
  
  $.ajax({
    url: "../includes/acess/get_senha.php",

    type: "POST",
    data: $('#form_senha').serialize(),
    success: function (response) {

      console.log(response);
      mensagens_resposta(response);
      
      var JSONArray = $.parseJSON(response);
      if (JSONArray['result'] == 'success') {
                
        // FECHA O MODAL E LIMPA O FORM
        Custombox.modal.close(); // FECHA O MENU LOGIN
        $('#form_senha input[name="email"]').val();
                
      }
      
    },
    error:function () {
      mensagens_erro('Não foi possível enviar sua solicitação no momento!<br>Atualize a página e tente novamente!');
    }
  });
});



// CARREGA O EMBED DO CATALOGO NO MODAL PARA VIEW / DOWNLOAD
function visualizar_pdf(url_pdf, descricao_pdf) {
  $('#visualizar_pdf').attr('src', url_pdf);
  $('#descricao_pdf').text('CATÁLOGO '+descricao_pdf);  

  new Custombox.modal({content: {effect: 'slide', target: '#modal_view_catalogo'}}).open();
}







function mascaraMutuario(o,f){
  v_obj=o;
  v_fun=f;
  setTimeout('execmascara()',1);
}

function execmascara(){
  v_obj.value=v_fun(v_obj.value);
}

function cpfCnpj(v){

  //Remove tudo o que nÃ£o Ã© dÃ­gito
  v=v.replace(/\D/g,"");

  if (v.length < 14) { //CPF

    //Coloca um ponto entre o terceiro e o quarto dÃ­gitos
    v=v.replace(/(\d{3})(\d)/,"$1.$2");

    //Coloca um ponto entre o terceiro e o quarto dÃ­gitos
    //de novo (para o segundo bloco de nÃºmeros)
    v=v.replace(/(\d{3})(\d)/,"$1.$2");

    //Coloca um hÃ­fen entre o terceiro e o quarto dÃ­gitos
    v=v.replace(/(\d{3})(\d{1,2})$/,"$1-$2");

  } else { //CNPJ

    //Coloca ponto entre o segundo e o terceiro dÃ­gitos
    v=v.replace(/^(\d{2})(\d)/,"$1.$2");

    //Coloca ponto entre o quinto e o sexto dÃ­gitos
    v=v.replace(/^(\d{2})\.(\d{3})(\d)/,"$1.$2.$3");

    //Coloca uma barra entre o oitavo e o nono dÃ­gitos
    v=v.replace(/\.(\d{3})(\d)/,".$1/$2");

    //Coloca um hÃ­fen depois do bloco de quatro dÃ­gitos
    v=v.replace(/(\d{4})(\d)/,"$1-$2");

  }

  return v;

}




/*----------------------------------------------------------
  MASCARAS TANTO PRA CELULAR, QUANTO PRA TELEFONE FIXO 
----------------------------------------------------------- */
$(document).ready(function() {

  // Marcara tanto pra telefone de 8 ou 9 dígitos
  var SPMaskBehavior = function (val) {
    return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
  },
  spOptions = {
    onKeyPress: function(val, e, field, options) {
      field.mask(SPMaskBehavior.apply({}, arguments), options);
    }
  };
  $('.telefone_mask').mask(SPMaskBehavior, spOptions);

});






// Data padrÃ£o Brasil
$('.mask-data').mask('99/99/9999');
				
// CPF com caracteres
$('.mask-cpf').mask('999.999.999-99');

// CNPJ com caracteres
$('.mask-cnpj').mask('99.999.999/9999-99');

// CEP Correios
$('.mask-cep').mask('99999-999');

// hora
$('.mask-hora').mask('99:99:99');

// telefone
$('.mask-tel').mask('(99) 9999-9999');


$('.mask-cel').mask('(99) 99999-9999');

$('.mask-rg').mask('99.999.999-9');

//RG formato MInas Gerais SSP MG
$('.mask-agencia').mask('9999-9');

//Agecia bancaria
$('.mask-conta').mask('999999-9');



function show_mail(class_mail, mail, dominio, ext = '.com') {
  $('.'+class_mail).html(mail + '@' + dominio + ext);
}
