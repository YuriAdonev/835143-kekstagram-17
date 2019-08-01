'use strict';

(function () {
  var LOAD_TIMEOUT = 10000;
  var STATUS_OK = 200;

  var URL_TO_GET = 'https://js.dump.academy/kekstagram/data';
  var URL_TO_POST = 'https://js.dump.academy/kekstagram';

  window.backend = {
    upload: upload,
    download: download
  };

  function upload(data, onSuccess, onError) {
    executeCommand('POST', onSuccess, onError, data);
  }

  function download(onSuccess, onError) {
    executeCommand('GET', onSuccess, onError);
  }

  function executeCommand(cmd, onSuccess, onError, data) {
    var xhr = new XMLHttpRequest();

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

    var url = '';

    if (cmd === 'POST') {
      url = URL_TO_POST;
    }

    if (cmd === 'GET') {
      url = URL_TO_GET;
    }

    xhr.open(cmd, url);

    if (cmd === 'POST') {
      xhr.send(data);
    }

    if (cmd === 'GET') {
      xhr.responseType = 'json';
      xhr.send();
    }
  }
})();
