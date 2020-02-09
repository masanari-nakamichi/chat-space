$(function(){
  
  function buildHTML(message){
    if ( message.image ) {
      var html =
       `<div class="message" data-message-id=${message.id}>
          <div class="main__posted__user">
            <div class="main__posted__user__name">
              ${message.user_name}
            </div>
            <div class="main__posted__user__date">
              ${message.created_at}
            </div>
          </div>
          <div class="main__posted__content">
            <p class="main__posted__content__item">
              ${message.content}
            </p>
          </div>
          <img src=${message.image} class="main__posted__content__image">
        </div>`
      return html;
    } else {
      var html =
       `<div class="message" data-message-id=${message.id}>
          <div class="main__posted__user">
            <div class="main__posted__user__name">
              ${message.user_name}
            </div>
            <div class="main__posted__user__date">
              ${message.created_at}
            </div>
          </div>
          <div class="main__posted__content">
            <p class="main__posted__content__item">
              ${message.content}
            </p>
          </div>
        </div>`
      return html;
    };
  }


  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main__posted').append(html);    
      $('.main__form__index__message').val('');
      $('.main__posted').animate({ scrollTop: $('.main__posted')[0].scrollHeight});
      $('.main__form__submit').prop("disabled", false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
    return false;
  })


  var reloadMessages = function() {
    var last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.messages').append(insertHTML);
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('自動更新に失敗しました');
    })
  }
  if (window.location.href.match(/\/groups\/\d+\/messages/)){
    setInterval(reloadMessages, 7000);
  }
});
