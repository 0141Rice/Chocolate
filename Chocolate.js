/**
 * ChocolateBanana.js
 *
 * @author 0141Rice
 **/
$(function () {
  loadHtml("body", "template/default.html");
  var pageConfig = initialLoadConfig();
  console.log(pageConfig);
});

var d=document;


function titleChange(str) {
  d.title = str;
}

function initialLoadConfig() {
  var result;
  $.ajax({
    url: 'ActionIdList.xml',
    type: 'GET',
    dataType:'xml',
    timeout: 1000,
    async: false,
    error: function (res) {
      // ErrorLogic
    },
    success: function (res) {
      result = getActions(res);
    }
  });
  return result;
}

function loadXml(path, actionId) {
  return $.ajax({
    url: path,
    type: 'GET',
    dataType:'xml',
    timeout: 1000,
    error: function (res) {
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
    actionObj.test = "2";
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
    }
  });
}
