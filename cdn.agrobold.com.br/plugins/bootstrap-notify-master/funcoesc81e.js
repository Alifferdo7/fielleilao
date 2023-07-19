
// FUNCAO QUE DISPARA O ALERT DE NOTIFICAÃ‡ÃƒO
function notifica(titulo, icone, mensagem, tipoNotificacao) {
  $.notify({
    title: ' <strong>'+titulo+'</strong><br>',
    icon: icone,
    message: mensagem
  },
  {
    type: tipoNotificacao,
    animate: {
      enter: 'animated fadeInUp',
      exit: 'animated fadeOutRight'
    },
    placement: { // NotificaÃ§Ã£o aparece no 
      from: "top",
      align: "right"
    },
      offset: 20,
      spacing: 10,
      z_index: 1031,
  });

}



// MENSAGENS GERAIS DE SUCESSO
function mensagens_resposta(data) {

  // Trata o Retorno recebido em JSON
  var JSONArray = $.parseJSON(data);

  if (JSONArray['result'] === 'success') {
      titulo = 'Successo!';
      tipoNotificacao = 'success';
      icone = 'fa fa-check';
  }
  else if (JSONArray['result'] === 'error') {
    titulo = 'Erro!';
    tipoNotificacao = 'danger';
    icone = 'fa fa-ban';
  }
  else if (JSONArray['result'] === 'info') {
    titulo = 'Informação!';
    tipoNotificacao = 'info';
    icone = 'fa fa-info-circle';
  }
  else {
    titulo = 'Atenção!';
    tipoNotificacao = 'warning';
    icone = 'fa fa-exclamation-triangle';
  }

  notifica(titulo, icone, JSONArray['message'], tipoNotificacao);

} // mensagens_resposta()


// ============================================================================

// MENSAGENS ESPECIFICAS DE SUCESSO (VERDE)
function mensagens_sucesso(msg) {  
  notifica('Successo!', 'fa fa-check', msg, 'success');
}

// MENSAGENS ESPECIFICAS DE SUCESSO (VERMELHA)
function mensagens_erro(msg) {
  notifica('Erro!', 'fa fa-ban', msg, 'danger');
}

// MENSAGENS ESPECIFICAS DE INFORMAÃ‡ÃƒO (AZUL)
function mensagens_info(msg) {
  notifica('Informação!', 'fa fa-info-circle', msg, 'info');
}

// MENSAGENS ESPECIFICAS DE ATENÃ‡ÃƒO (AMARELA)
function mensagens_atencao(msg) {
  notifica('Atenção!', 'fa fa-exclamation-triangle', msg, 'warning');
}