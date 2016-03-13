/**
 * ChocolateBanana.js
 *
 * @author 0141Rice
 **/
var THIS_APPLICATION_ACTION_IDS;
$(function () {
  initialLoadConfig().done(function (res) {
    THIS_APPLICATION_ACTION_IDS = res;
    loadHtml("body", "template/default.html");
  });
});

var d=document;


function titleChange(str) {
  d.title = str;
}

function initialLoadConfig() {
  return $.ajax({
    url: 'ActionIdList.xml',
    type: 'GET',
    dataType:'xml',
    timeout: 1000
  });
}

function change(actionId) {
  callAction(actionId, getActions(THIS_APPLICATION_ACTION_IDS));
}

function loadXml(path, actionId) {
  $.ajax({
    url: path,
    type: 'GET',
    dataType:'xml',
    timeout: 1000,
    error: function (res, a, b) {
      console.log(res.status);
      console.log(a);
      console.log(b.message);
    },
    success: function (res) {
      var actions = getActions(res);
      callAction(actionId, actions);
    }
  });
}

function callAction(id, array) {
  for (var i = 0; i < array.length; i++) {
    if (array[i].id === id) {
      titleChange(array[i].action.title);
      for (var j = 0; j < array[i].parts.length; j++) {
        loadHtml("#" + array[i].parts[j][0], "template/" + array[i].parts[j][1]);
      }

      return true;
    }
  }
  location.href = "http://www.google.co.jp/";
}

function getActions(responseText) {
  var contents = $(responseText).find("ActionIds");
  var outputActions = [];
  $(contents).find("Action").each(function () {
    var action = new Object();
    var actionObj = new Object();
    action.id = $(this).find("id").text();
    actionObj.title = $(this).find("title").text();
    var parts = $(this).find("parts").children();
    var partsArray = new Array();
    for (var i = 0; i < parts.length; i++) {
      partsArray.push([parts[i].nodeName, parts[i].childNodes[0].nodeValue]);
    }
    action.parts = partsArray;
    action.action = actionObj;
    outputActions.push(action);
  });

  return outputActions;
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
      $(target).append(res);

      if (!$('script[src="template/loadedscript.js"]').length) {
        var script = document.createElement('script');
        script.src = 'template/loadedscript.js';
        document.getElementsByTagName("head")[0].appendChild(script);
      }
    }
  });
}
