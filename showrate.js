$(document).ready(function () {
	var title, get_url, rating, arr, arr2, color;
	var url = "http://www.imdb.com";
	
	var target = document.querySelector('#navbar-suggestionsearch');
	var observer = new window.WebKitMutationObserver(function(mutations) {
		// mutations.forEach(function(mutation) {
			// console.log('text:', mutation.target.textContent);
		// });
		$(".poster").each(function () {
			title = $(this).attr('href');
			//console.log("title:" +title);
			arr = title.split('?');
			arr2 = arr[0].split('/');
			if(arr2[1] == 'title') {
				get_url = url + arr[0];
				getRate($(this), get_url);	
			}
		});
	});
	observer.observe(target, { subtree: false, characterData: true, childList: true });
	
	if ($(".filmo-row")[0]) {
		$(".filmo-row").each(function () {
			title = $(this).find('a:first').attr('href');
			arr = title.split('?');
			get_url = url + arr[0];
			getRate2($(this), get_url);	
		});
	}
	
	function getRate(obj, myurl) {
		$.ajax({
			type : "GET",
			url : myurl,
			success : function (data) {
				rating = $.trim($(data).find('.star-box-giga-star').first().text());
				if(rating == '') 
					rating = '0.0';
				rating = parseFloat(rating).toFixed(1);
				obj.find('.extra').append('&nbsp;&nbsp;<span style="color:green;font-weight:bold;">' + rating + '</span>');
			}
		});
	}
	
	function getRate2(obj, myurl) {
		$.ajax({
			type : "GET",
			url : myurl,
			success : function (data) {
				rating = $.trim($(data).find('.star-box-giga-star').first().text());
				if(rating == '') 
					rating = '0.0';
				rating = parseFloat(rating).toFixed(1);
				
				if (rating >= 7.5) {
					//check if tv series
					var content = obj.clone().children().remove().end().text();
					//console.log('asdf: '+content);
					if(content.indexOf('(') === -1)
						color = 'red';
				}
				else 
					color = 'blue';
				obj.find('.year_column').append('&nbsp;&nbsp;<span style="color:'+color+';font-weight:bold;">' + rating + '</span>');
			}
		});
	}
});
