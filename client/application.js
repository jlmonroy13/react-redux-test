function signIn() {
  return fetch('/user/auth', {
    method: "POST",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    },
    body: "username=ali&password=5f4dcc3b5aa765d61d8327deb882cf99"
  }).then((response) => {
    return response.json()
  }).then((data) => {
    return data;
  });
}

function logOut(id) {
  return fetch('/user/logout?sessionId='+id, {
    method: "GET"
  }).then((data) => {
    return data;
  });
}

function getVideos(auth) {
  fetch('/videos?sessionId='+auth.sessionId+'&skip=1&limit=1')
    .then((response) => {
      return response.json()
    }).then((data) => {
      renderVideo(data.data);
    });
}

function renderVideo(data) {
  console.log(data[0]);
  const videoData =  data[0];
  const $video = $('.js-video'),
        $description = $('.js-description');

  $('.js-video').attr('src', videoData.url);
  $('.js-description').text(videoData.description);
}

signIn()
  .then(getVideos);





