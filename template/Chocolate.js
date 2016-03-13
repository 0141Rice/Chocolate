/**
 * ChocolateBanana.js
 *
 * @author 0141Rice
 **/


var d=document;

function titleChange(str) {
  d.title = str + ":" + new Date().getSeconds();
}

function loadXml(path) {
  $.ajax({
    url: path,
    type: 'GET',
    dataType:'xml',
    timeout: 1000,
    error: function (res) {
    },
    success: function (res) {
      getActions(res);
      $(res).find("Action part").each(function() {
        var t = ("template/" + $(this).find("h1").text()).split('.');
        if(t[t.length - 1] != 'html')
          return false;
        loadHtml("#h1", "template/" + $(this).find("h1").text());
        loadHtml("#h2", "template/" + $(this).find("h2").text());
      });
    }
  });
}

function getActions(responseText) {
  var contents = $(responseText).find("ActionIds");
  for (var i = 0; i < contents.length; i++) {
    console.log(contents[i]);
    var outputActionsObject = new Object();
  }


}

function loadHtml(target, path) {
  $.ajax({
    url: path,
    type: 'GET',
    dataType:'text',
    timeout: 1000,
    error: function (res) {
      $('')
    },
    success: function (res) {
      $(target).empty();
      $(target).append(res + new Date().getSeconds());
    }
  });
}

/*class Initializeble {
  function test(){}
  // Protocol
}/*
class FileLoader extends Ajax {
  var Ajax = {
    get: function (params) {
        var key;
        if (!params.url) {
            throw 'Was Set URL ""';
        }
        this.method = new Prop('GET');
        for (key in params) {
            this[key] = new Prop(params[key]);
        }
        this.sendRequest();
    },
    post: function (params) {
        var key;
        if (!params.url) {
            throw 'Was not URL.';
        }
        if (!params.data) {
            throw 'Was not request.';
        }
        this.method = new Prop('POST');
        for (key in params) {
            this[key] = new Prop(params[key]);
        }
        this.sendRequest();
    },
    sendRequest: function () {
        var xhr = this.createXhr(),
            self = this;
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    if (self.callBack) {
                        self.callBack()(xhr.responseText);
                        xhr = null;
                    }
                }
            }
        };
        xhr.open(this.method(), this.url(), (this.async)?(this.async()):(true));
        if (this.method() === 'POST') {
            xhr.send(this.data());
        } else {
            xhr.send(null);
        }
    },
    createXhr: function () {
        var xhr;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        } else {
            throw 'Ajaxに対応していません';
        }
        return xhr;
    }
  };
}
class Ajax extends Initializeble {
  // NotImprementClass
}
class Logger {
  // NotImprementClass
}

class BussinessDate extends BananaDate {
  // NotImprementClass
}

class BananaDate {
  // NotImprementClass
}
*/
