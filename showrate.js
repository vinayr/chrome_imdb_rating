$(document).ready(function () {
	var title, get_url, rating, arr, color;
	var url = "http://www.imdb.com";

	$(".filmo-row").each(function () {
		title = $(this).find('a:first').attr('href');
		arr = title.split('?');
		get_url = url + arr[0];
		getRate($(this), get_url);	
	});
	
	function getRate(obj, myurl) {
		$.ajax({
			type : "GET",
			url : myurl,
			success : function (data) {
				rating = $.trim($(data).find('.star-box-giga-star').first().text());
				if(rating == '') 
					rating = '0.0';
				rating = parseFloat(rating).toFixed(1);
				if (rating >= 7.5) 
					color = 'red';
				else 
					color = 'blue';
				obj.find('.year_column').append('&nbsp;&nbsp;<span style="color:'+color+';font-weight:bold;">' + rating + '</span>');
			}
		});
	}
});
