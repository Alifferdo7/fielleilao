// FORM CADASTRO
$("#form_usuario").validate({
  rules:{
    nome_usuario: {required:true},
    cpf_usuario:  {required:true},
    rg_usuario:   {required:true},

    endereco_usuario:  {required:true},
    numero_usuario:    {required:true},
    cep_usuario:       {required:true},
    bairro_usuario:       {required:true},

    celular_usuario:    {required:true},
    cidade_usuario:     {required:true},
    estado_usuario:     {required:true},
    nascimento_usuario: {required:true},

    empresa_comercial_01:  {required:true},
    telefone_empresa_comercial_01:  {required:true},

    email_usuario: {required:true},
    senha_usuario: {required:true, minlength:6}
  },
  messages: {
    nome_usuario:  {required: 'Campo obrigatório!'},
    cpf_usuario:  {required: 'Campo obrigatório!'},
    rg_usuario:  {required: 'Campo obrigatório!'},
    
    bairro_usuario:  {required: 'Campo obrigatório!'},
    endereco_usuario:  {required: 'Campo obrigatório!'},
    numero_usuario:  {required: 'Obrigatório!'},
    cep_usuario:  {required: 'Campo obrigatório!'},

    celular_usuario:  {required: 'Campo obrigatório!'},
    cidade_usuario:  {required: 'Campo obrigatório!'},
    estado_usuario:  {required: 'Campo obrigatório!'},
    nascimento_usuario: {required: 'Campo obrigatório!'},

    empresa_comercial_01:  {required: 'Campo obrigatório!'},
    telefone_empresa_comercial_01:  {required: 'Campo obrigatório!'},

    email_usuario: {required: 'Por favor, informe seu e-mail!', email: 'Endereço de e-mail inválido!'},
    senha_usuario:      {required: 'Por favor, informe uma senha', minlength:"Mínimo de 6 caracteres"}
  },
  submitHandler : function(e) {

    $('form button').css({'pointer-events':'none'});
    $('form #button_value').text('AGUARDE ...');

    $.ajax({
      url: "./put/",
      type: "POST",
      data: $('#form_usuario').serialize(),
      success: function (response){ 

        console.log(response);
        mensagens_resposta(response);
        var JSONArray = $.parseJSON(response);

        if (JSONArray['result'] == 'success') {
          if ( parseInt(JSONArray['data']) == 1 ) {

            document.getElementById("form_usuario").reset();
            setTimeout(() => {
              window.location='../home';
            }, 2000);

          }
        }

        $('form #button_value').text('SALVAR CADASTRO');
        setTimeout(function() {
          $('form button').css({'pointer-events':'auto'});
        }, 2000);

      },
      error:function () {
        mensagens_erro('<b>ERRO AO SALVAR OS DADOS!</b><br>Atualize a página e tente novamente.');
        $('form button').css({'pointer-events':'auto'});
        $('form #button_value').text('SALVAR CADASTRO');
      }
    });
    
  },
  errorPlacement : function(error, element) {
    error.insertAfter(element.parent());
  }
});








function get_cidades(estado_usuario, id_select_cidade) {

  $('#'+ id_select_cidade).html('<option value="0">Aguarde...</option>');
  
  $.ajax({
    url: "/includes/get_cidades/get_cidades.php",
    
    type: "POST",
    data: "estado_usuario=" + $('#'+ estado_usuario).val(),
    success: function(response){
      
      var JSONArray = $.parseJSON(response);
      
      if (JSONArray['result'] == 'success') {
      
        var CIDADES = $.parseJSON(JSONArray['data']);
        
        // POPULA O SELECT DE CIDADES
        var options = '<option value="">Selecione a Cidade</option>';
        
        // console.clear();
        var i = 0;
        for (i = 0; i < CIDADES.length; i++) {
          options += '<option value="' + CIDADES[i].nome_cidade + '">' + CIDADES[i].nome_cidade + '</option>';
          // console.log("Cidade "+i+": "+CIDADES[i].nome_cidade); // Nome da cidade CONSOLE
        } 
        
        if ( i < 1) {
          options = '<option value="">Selecione Primeiro o Estado</option>';
        }
        // console.log(i + " Cidades"); // Numero de cidades CONSOLE
        
        // Repassa as cidades para o Select
        $('#'+id_select_cidade).html(options);
        
      } 
      else {
        mensagens_resposta(response);
      }
    },
    error:function () {
      mensagens_erro("Erro na tentativa de obtenção das cidades!");
    }
  });


  
}
