$(function(){
    $('#num_one').focus();
	$('#random-doit').on('click', function() {
		start();
	});
	func.copyright();
	
	var start = function() {
		msg();
		var one = $.trim($('#num_one').val());
		var two = $.trim($('#num_two').val());

		if (isNaN(one)) {
			msg("最小值必须是数字");
			return false;
		}

		if (isNaN(two)) {
			msg("最大值必须是数字");
			return false;
		}
		
		one = parseInt(one);
		two = parseInt(two);
		
		if (one < 0) {
			msg("最小值不能小于零");
			return false;
		}
		
		if (two < 0) {
			msg("最大值不能小于零");
			return false;
		}
		
		if (two <= one) {
			msg("最大值必须大于最小值");
			return false;
		}
		
		var result = parseInt(Math.random() * (two - one + 1) + one);
		msg(result);
	}
	
	var msg = function(msg) {
		$('#inputWarning').val(msg);
		$('#random-last-time').text('本次操作的时间发生在：' + getNowFormatDate());
	}
	
	var getNowFormatDate = function () {
		var date = new Date();
		var seperator1 = "-";
		var seperator2 = ":";
		var month = date.getMonth() + 1;
		var strDate = date.getDate();
		if (month >= 1 && month <= 9) {
			month = "0" + month;
		}
		if (strDate >= 0 && strDate <= 9) {
			strDate = "0" + strDate;
		}
		var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
				+ " " + date.getHours() + seperator2 + date.getMinutes()
				+ seperator2 + date.getSeconds();
		return currentdate;
	}
})