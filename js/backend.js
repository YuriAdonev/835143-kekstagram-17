'use strict';

(function () {
  var LOAD_TIMEOUT = 10000;
  var STATUS_OK = 200;

  var URL_TO_GET = 'https://js.dump.academy/kekstagram/data';
  var URL_TO_POST = 'https://js.dump.academy/kekstagram';

  var HttpCommand = {
    POST: 'POST',
    GET: 'GET',
  };

  window.backend = {
    upload: upload,
    download: download
  };

  function upload(data, onSuccess, onError) {
    executeCommand(HttpCommand.POST, onSuccess, onError, data);
  }

  function download(onSuccess, onError) {
    executeCommand(HttpCommand.GET, onSuccess, onError);
  }

  function getURL(cmd) {
    switch (cmd) {
      case 'POST':
        return URL_TO_POST;
      case 'GET':
        return URL_TO_GET;
      default:
        return '';
    }
  }

  function executeCommand(cmd, onSuccess, onError, data) {
    var xhr = new XMLHttpRequest();
    var url = getURL(cmd);

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = LOAD_TIMEOUT;

    if (url !== '') {
      xhr.open(cmd, url);

      if (cmd === 'POST') {
        xhr.send(data);
      }

      if (cmd === 'GET') {
        xhr.responseType = 'json';
        xhr.send();
      }
    }
  }
})();
