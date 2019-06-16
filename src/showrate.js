// prettier-ignore

$(document).ready(function() {
  const baseUrl = "https://www.imdb.com";
  const blacklist = [ "TV", "Short", "Video", "Documentary" ];

  // For search window
  const target = document.querySelector("#navbar-suggestionsearch");
  const observer = new window.WebKitMutationObserver(function(mutations) {
    $(".poster").each(function() {
      const link = $(this).attr("href");
      // console.log("link", link);
      const titlePath = link.split("?")[0];
      if (titlePath.split("/")[1] === "title") {
        const movieUrl = baseUrl + titlePath;
        showRatingsInSearch($(this), movieUrl);
      }
    });
  });
  observer.observe(target, { subtree: false, characterData: true, childList: true });

  // For actor pages
  if ($(".filmo-row")[0]) {
    $(".filmo-row").each(function() {
      const link = $(this).find("a:first").attr("href");
      const titlePath = link.split("?")[0];
      const movieUrl = baseUrl + titlePath;
      showRatingsInPage($(this), movieUrl);
    });
  }

  function showRatingsInSearch(obj, url) {
    $.get(url, function(data) {
      let rating = $(data).find("span[itemprop='ratingValue']").first().text();
      if (!rating) rating = "0.0";
      rating = parseFloat(rating).toFixed(1);
      obj.find(".extra").append(`&nbsp;&nbsp;<span style="color:green;font-weight:bold;">${rating}</span>`);
    });
  }

  function showRatingsInPage(obj, url) {
    $.get(url, function(data) {
      let rating = $(data).find("span[itemprop='ratingValue']").first().text();
      if (!rating) rating = "0.0";
      rating = parseFloat(rating).toFixed(1);

      let color = "blue";
      if (rating >= 7.5) {
        //check if not movie
        const content = obj.clone().children().remove().end().text();
        if (!blacklist.some(b => content.includes(b))) color = "red";
      }
      obj.find(".year_column").append(`&nbsp;&nbsp;<span style="color:${color};font-weight:bold;">${rating}</span>`);
    });
  }
});
