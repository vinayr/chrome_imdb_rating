$(document).ready(function () {
	var title, get_url, rating, arr;
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
				//console.log("adsdfsd " + rating);
				if(rating == '') rating = '0.0';
				obj.find('.year_column').append('&nbsp;&nbsp;<span style="color:blue;font-weight:bold;">' + rating + '</span>');
			}
		});
	}
});
