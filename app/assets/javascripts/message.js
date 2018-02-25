$(function(){

  function buildHTML(message){
    if (message.is_content_present){
      var content = `${message.content} `
    }else{
      var content = ''
    }
    if (message.is_image_present){
      var image =`<img src='${message.image.url}'> `
    }else{
      var image = ''
    }

    var html = `<div class = "main-contents__body__list__message">
                  <div class = "main-contents__body__list__message__name">
                    ${message.user_name}
                  </div>
                  <div class = "main-contents__body__list__message__data">
                    ${message.date}
                  </div>
                  <div class = "main-contents__body__list__message__body">
                    ${content}
                    ${image}
                  </div>
                </div>`
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
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
      $('.main-contents__body__list').append(html);
      $(".main-contents__body").animate({scrollTop:$('.main-contents__body__list')[0].scrollHeight});
      $('.textbox').val('');
    })
    .fail(function(){
      alert('error');
    })
  })
})

