$(function(){
	$('#do').on('click', function(){
		func.post_new('POST', globals.url + '/developtoolbox/lbs.php?method=search', $('form').serialize(), '', function(data) {
			modal.open('myModal-lbs');
			if(data.errno > 0)
			{
				$('#lbs_txt').text(data['errmsg']);
			}
			else
			{
				$('#lbs_txt').text(data['data']  + '  米');
				refresh_list();
			}
		});
	});
	
	var refresh_list = function() {
		$('#data').html('');
		func.post_new('GET', globals.url + '/developtoolbox/lbs.php?method=list', '', '', function(data){
			var $_data = $(data)[0]['data'];
			$($_data).each(function(i, val){
				var html = "<tr><td>"+val.lng_start+" / "+val.lat_start+"</td><td>"+val.lng_end+" / "+val.lat_end+"</td><td>"+val.result+"</td></tr>";
				$('#data').append(html);
			})
		});
	}
	
	$('#lng_start').focus();
	refresh_list();
	func.copyright();
});