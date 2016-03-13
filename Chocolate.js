/**
 * Chocolate.js
 *
 * @author 0141Rice
 **/

// DI Collection
var CHOCOLATE_COLLECTIONS;
var CHOCOLATE_THIS_BLOCK;
var SCREEN_CURRENT_PATH;
var SCRIPT_CURRENT_PATH;

// Initialize
$(function () {
  initialLoadConfig().done(function (res) {
    //CHOCOLATE_COLLECTIONS = res;
    //SCREEN_CURRENT_PATH = res
    setChocolate(res);
    loadHtml("body", SCREEN_CURRENT_PATH + "default.html");
  });
});

function setChocolate(response) {
  var $res = $(response);
  CHOCOLATE_COLLECTIONS = $res;
  SCREEN_CURRENT_PATH = $res.find('ScreenCurrentPath').text();
  SCRIPT_CURRENT_PATH = $res.find('ScriptCurrentPath').text();
}

function initialLoadConfig() {
  return $.ajax({
    url: 'ChocolateList.xml',
    type: 'POST',
    dataType:'xml',
    timeout: 1000
  });
}

function change(actionId) {
  callAction(actionId, getActions(CHOCOLATE_COLLECTIONS));
}

function callAction(id, array) {
  if (CHOCOLATE_THIS_BLOCK === id)
    return false;

  for (var i = 0; i < array.length; i++) {
    var input = array[i];
    if (input.id === id) {
      CHOCOLATE_THIS_BLOCK = id;
      setTitle(input.action.title);
      setParts(input.action.parts);
      return true;
    }
  }
  return false;
}

function setTitle(str) {
  document.title = str;
}
function setParts(partsArray) {
  for (i in partsArray) {
    loadHtml('#' + partsArray[i][0], SCREEN_CURRENT_PATH + partsArray[i][1]);
  }
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
    actionObj.parts = partsArray;
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
      // Err
    },
    success: function (res) {
      $(target).empty();
      $(target).append(res);

      var externPath = CScriptPath('loadedscript.js');
      if (!$('script[src="' + externPath + '"]').length) {
        var script = document.createElement('script');
        script.src = externPath;
        document.getElementsByTagName("head")[0].appendChild(script);
      }
    }
  });
}

function CScriptPath(path) {
  return SCRIPT_CURRENT_PATH + path;
}
function CScreenPath(path) {
  return SCREEN_CURRENT_PATH + path;
}

function byId(str) {
  return '#' + str;
}

function byClass(str) {
  return '.' + str;
}
