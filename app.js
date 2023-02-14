let inputStr;
$('#submitBtn').on('click', getStr);

function getStr() {
  $(document).ready(function () {
    $('body2').empty()
    inputStr = $("#searchInput").val();
    getShowName()
  });
};

function getShowName() {
  const settings = {
    "async": true,
    "crossDomain": true,
    "url": 'https://youtube-search-and-download.p.rapidapi.com/search?query=' + inputStr + 'EogDEgVoZWxsbxr-AlNCU0NBUXRaVVVoeldFMW5iRU01UVlJQkMyMUlUMDVPWTFwaWQwUlpnZ0VMWW1VeE1rSkROWEJSVEVXQ0FRdFZNMEZUYWpGTU5sOXpXWUlCQzJaaGVrMVRRMXBuTFcxM2dnRUxaV3hrWldGSlFYWmZkMFdDQVExU1JGbFJTSE5ZVFdkc1F6bEJnZ0VMT0hwRVUybHJRMmc1Tm1PQ0FRc3pOMFU1VjNORWJVUmxaNElCQzJGaFNXcHpPRXN6YjFsdmdnRUxaMmRvUkZKS1ZuaEdlRldDQVF0clN6UXlURnB4VHpCM1FZSUJDME42VHpOaFNXVXdVbkJ6Z2dFTFNVNHdUMk5WZGtkaU5qQ0NBUXRSYTJWbGFGRTRSRjlXVFlJQkMyWk9NVU41Y2pCYVN6bE5nZ0VMZEZac1kwdHdNMkpYU0RpQ0FRdGZSQzFGT1Rsa01XSk1TWUlCQzJoQlUwNVRSSFZOY2pGUmdnRUxkREEzTVZkdE5EVnhWMDAlM0QYgeDoGCILc2VhcmNoLWZlZWQ%3D',
    "method": "GET",
    "headers": {
      "X-RapidAPI-Key": "23a647df49msh11266a68daf3297p10456ejsncf98c1f93b4f",
      "X-RapidAPI-Host": "youtube-search-and-download.p.rapidapi.com"
    }
  };

  $.get(settings, (data) => {
    let stringData = JSON.stringify(data);
    let results = JSON.parse(stringData);

    $.each(results.contents, function (i) {

      $(document).ready(function () {

        jQuery('<div/>', {
          id: "showname" + i,
          class: "showclass",
          text: results.contents[i]['video']['title']
        }).appendTo('body2');

        jQuery('<div/>', {
          id: "channelname" + i,
          class: "channelclass",
          text: 'Channel: ' + results.contents[i]['video']['channelName']
        }).appendTo($("#showname" + i));

        jQuery('<div/>', {
          id: 'morename' + i,
          class: 'moreclass',
          text: 'watch here...'
        }).appendTo($('#showname' + i));

        $('#morename' + i).contents().wrap('<a href=https://www.youtube.com/watch?v=' + results.contents[i]['video']['videoId'] + '" target="_blank"></a>');

        var img = $('<img />', {
          id: 'imgid',
          src: results.contents[i]['video']['thumbnails'][0]['url']
        }); img.appendTo($('#showname' + i));

        jQuery('<a/>', {
          href: '#',
          id: 'dlname',
          class: 'dlclass' + i
        })
          .text('download')
          .appendTo($('#showname' + i));

        $(".dlclass" + i).click(function () {
          const videoId = results.contents[i]['video']['videoId'];
          getDownload(videoId);
          return false;
        });
      });

      function getDownload(videoId) {
        const settings2 = {
          "async": true,
          "crossDomain": true,
          "url": 'https://ytstream-download-youtube-videos.p.rapidapi.com/dl?id=' + videoId,
          "method": "GET",
          "headers": {
            "X-RapidAPI-Key": "23a647df49msh11266a68daf3297p10456ejsncf98c1f93b4f",
            "X-RapidAPI-Host": "ytstream-download-youtube-videos.p.rapidapi.com"
          }
        };

        $.get(settings2, (data) => {
          let stringData2 = JSON.stringify(data);
          let results2 = JSON.parse(stringData2);
          const url = results2.formats[results2.formats.length - 1].url
          window.open(url, "_blank");
        });
      }
    })
  })
}