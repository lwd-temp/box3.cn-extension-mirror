(function ($) {
	$(function () {
	
		var looks_like_html = function(source) {
			var trimed = source.replace(/^[ \t\n\r]+/, '');
			var mark = '<' + '!-' + '-';
			return (trimed && (trimed.substring(0, 1) === '<' && trimed.substring(0, 4) !== mark));
		 }
		
		var ajax_handle = null;
	
		$('#content a').removeClass().addClass(storage.get(storage.define['DEFINE_BTN_STYLE_NAME']) || 'btn');
		
		$('#url_text').on('input', function(){
			var val = $.trim($(this).val());
			if(val.length > 0) {
				$('#send').removeClass('disabled');
			} else {
				$('#send').addClass('disabled');
			}
		}).on('blur', function(){
			var val = $.trim($('#url_text').val());
			if(val.length > 0 && val.substr(0, 7) != 'http://' && val.substr(0, 8) != 'https://') {
				val = 'http://' + val;
			}
			$('#url_text').val(val);
		});
		
		$('#send').on('click', function(){
			var msg = ['请求中...', 'send', '请求被取消了'];
			if($(this).hasClass('disabled')) return;
			if($(this).text() == msg[0]) {
				ajax_handle.abort();
				$(this).text(msg[1]);
				return false;
			}
			
			var url_text = $.trim($('#url_text').val());
			$(this).text(msg[0]);
			
			ajax_handle = $.ajax({
			  url: url_text,
			  type: $('#select_method').val(),
			  cache: false,
			  data: $.trim($('#textarea_body').val()),
			  timeout: 15000,
			  dataType: "html",
			  success: function(html, status, xhr){
				  $('#send').text(msg[1]);
				  $('#text_header').text(xhr.getAllResponseHeaders());
					var options = {
						indent_size: 4,
						unescape_strings: 1,
						indent_char: ' '
					};
				  $('#textarea_result').val('').val(looks_like_html(html)? html_beautify(html, options) : js_beautify(html, options));
				  var height = $('#text_header').innerHeight();
				  if(height > 211)
				  {
					$('#textarea_result').innerHeight(height);
				  }
			  },
			  error: function (XMLHttpRequest, textStatus, errorThrown) {
				  $('#text_header').text(msg[2]);
			  }
			});

		});
		
		$('#select_method').on('change', function(){
			if($(this).val() == 'GET') {
				$('#post_body>.post_body_2').show();
				$('#post_body>.post_body_1').hide();
			} else {
				$('#post_body>.post_body_1').show();
				$('#post_body>.post_body_2').hide();
			}
		});
		
		func.closepage_timeout(179);
		func.copyright();
		$('#url_text').focus();
	});
	
}(jQuery))