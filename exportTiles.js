var layers = mapPanel.layers.map.layers;
window.exportTiles = function() {
  var s = '';
  var imgs = document.getElementsByTagName('img');
  for (var i = 0; i < imgs.length; i++) {
    var img = imgs[i];
    if (img.src.indexOf('grb_bsk') != -1) {
      var lonLat = GRBBSK_tms_layer.getLonLatFromViewPortPx({
        x: parseInt(img.style.left),
        y: parseInt(img.style.top)
      });
      var bounds = new OpenLayers.Bounds();
      bounds.extend(lonLat);
      lonLat = GRBBSK_tms_layer.getLonLatFromViewPortPx({
        x: parseInt(img.style.left) + 256,
        y: parseInt(img.style.top) + 256
      });
      bounds.extend(lonLat);
      s += '<img src="' + img.src + '&' + bounds.toBBOX() + '.png"/>';
    }
  }
  prompt('', s);
}
