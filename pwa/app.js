$(document).ready(function() {
  getNewAge();
  registerWorker();
});

function getNewAge() {
  // 读取缓存数据
  var url = 'https://yqc.im/mydemo/pwa/api.php';
  var age = Math.round(Math.random() * 10) + 1;
  if ('caches' in window) {
    caches.match(url+'?age='+age).then(function(res) {
      if (res) {
        res.json().then(function(rescache) {
          console.log('rescache====>', rescache);
          $('#age').html(rescache.age);
        })
      }
    })
  }

  // 发请求
  $.ajax({
    url: url,
    data: {
      age: age
    }
  }).then(function(e) {
    var tmp = JSON.parse(e);
    console.log('callback===>', tmp);
    $('#age').html(tmp.age);
  });
}

function registerWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
    .register('./worker.js')
    .then(function() {
      console.log('worker 注册成功');
    })
  }
}
