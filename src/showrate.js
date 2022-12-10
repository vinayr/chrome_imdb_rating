$(document).ready(function () {
  const baseUrl = "https://www.imdb.com";
  const blacklist = ["TV", "Short", "Video", "Documentary"];
  const fetchedRatings = {};

  // Observe search window
  const target = document.querySelector(".react-autosuggest__container");
  if (target) {
    const observer = new MutationObserver(function (mutations) {
      $("a[data-testid='search-result--const']").each(function () {
        const link = $(this).attr("href");
        // console.log("link", link);
        const titlePath = link.split("?")[0];
        if (titlePath.split("/")[1] === "title") {
          const movieUrl = baseUrl + titlePath;
          showRatingsInSearch($(this), movieUrl);
        }
      });
    });
    observer.observe(target, { subtree: false, attributes: true, childList: true });
  }

  // Observe ajax loaded movie list
  const target2 = $(".ipc-metadata-list-summary-item").closest('ul');
  if (target2.length) {
    for (let i = 0; i < target2.length; i++) {
      const observer = new MutationObserver(function (mutations) {
        extractUrl($(mutations[0].target));
      });
      observer.observe(target2[i], { subtree: false, attributes: false, childList: true });
    }
  }


  function extractUrl(obj) {
    let time = 100;
    obj.find(".ipc-metadata-list-summary-item").each(function () {
      const link = $(this).find("a:first").attr("href");
      const titlePath = link.split("?")[0];
      const movieUrl = baseUrl + titlePath;
      // throttle
      setTimeout(() => fetchRatings($(this), movieUrl), time);
      time += 100;
    });
  }

  function showRatingsInSearch(obj, url) {
    $.get(url, function (data) {
      let rating = $(data).find("div[data-testid='hero-rating-bar__aggregate-rating__score'] span").first().text();
      if (!rating) rating = "0.0";
      rating = parseFloat(rating).toFixed(1);
      obj.append(`<span>${rating}</span>`);
    });
  }

  function showRatingsInPage(obj, rating) {
    // skip if we've already displayed ratings to this obj;
    // note that same movie may appear in multiple sections
    if (obj.find('#xyz').length) {
      return;
    }

    let color = "blue";
    if (rating >= 7.5) {
      // check if not movie
      const type = obj.find('ul:nth-child(3)').text();
      if (!blacklist.some(b => type.includes(b))) color = "red";
    }
    obj.append(`&nbsp;&nbsp;<span id="xyz" style="color:${color};font-weight:bold;">${rating}</span>`);
  }

  function fetchRatings(obj, url) {
    if (fetchedRatings[url] !== undefined) {
      // console.log('exists', url);
      showRatingsInPage(obj, fetchedRatings[url]);
      return;
    }

    $.get(url, function (data) {
      let rating = $(data).find("div[data-testid='hero-rating-bar__aggregate-rating__score'] span").first().text();
      if (!rating) rating = "0.0";
      rating = parseFloat(rating).toFixed(1);
      fetchedRatings[url] = rating;
      showRatingsInPage(obj, rating);
    });
  }

  extractUrl($(document));
});
