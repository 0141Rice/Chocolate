
$('input[value=test1]').click(function () {
  loadXml('ActionIdList.xml', '1');console.log('success');
});
$('input[value=test2]').click(function () {
  loadXml('ActionIdList.xml', '2');
});
$('input[value=test3]').click(function () {
  loadXml('ActionIdList.xml', '3');
});
