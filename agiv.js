var wmsGrid, sourcesGrid, wmsWin;
var pwdDict = new Dictionary();
var wmsSourcesStore = new Ext.data.Store({
  proxy: new Ext.data.HttpProxy({
    url: wmsSourcesUrl,
    method: 'GET'
  }),
  reader: new Ext.data.XmlReader({
    record: 'service',
    id: 'serviceReader'
  }, ['name', 'url', 'description']),
  listeners: {
    load: {
      fn: function() {
        Ext.getCmp('statusbar-sources').clearStatus({
          useDefaults: true
        });
        sourcesGrid.getBottomToolbar().setDisabled(false);
      }
    }
  }
});
var wmsCapStore = new GeoExt.data.WMSCapabilitiesStore({
  reader: new GeoExt.data.WMSCapabilitiesReader(),
  url: proxyUrl,
  listeners: {
    load: {
      fn: function(proxy, o, options) {
        Ext.getCmp('statusbar-wms').clearStatus({
          useDefaults: true
        });
        setTimeout(function() {
        	Racing.addLayersByName([
        		'AGROND',
        		'GRB_WBN',
        		'GRB_WVB',
        		'GRB_WGO',
        		'GRB_WKN',
            'GRB_GBG'
        	]);
          /*wmsGrid.getSelectionModel().selectRow(0);
          AddWMSLayerToMap(wmsGrid.getSelectionModel());
          wmsGrid.getSelectionModel().selectRow(6);
          AddWMSLayerToMap(wmsGrid.getSelectionModel());
          wmsGrid.getSelectionModel().selectRow(8);
          AddWMSLayerToMap(wmsGrid.getSelectionModel());
          wmsGrid.getSelectionModel().selectRow(14);
          AddWMSLayerToMap(wmsGrid.getSelectionModel());
          wmsGrid.getSelectionModel().selectRow(20);
          AddWMSLayerToMap(wmsGrid.getSelectionModel());*/
          wmsWin.close();
          Racing.layerNames = map.layers.map(function(index, item) {
            return index.name
          }).reverse();
          map.zoomToScale(0);
          map.setCenter([Racing.straat.lines[0][0].x, Racing.straat.lines[0][0].y]);
          var wegBaan = Racing.layerByName('GRB - WBN - wegbaan');
          var canvas = document.createElement('canvas');
          canvas.style.width = wegBaan.div.scrollWidth;
          canvas.style.height = wegBaan.div.scrollHeight;
          canvas.style.position = 'absolute';
          canvas.style.left = 0;
          canvas.style.top = 0;
          canvas.style.zIndex = 6000;
          canvas.style.backgroundColor = 'red';
          document.body.appendChild(canvas);
        }, 0);
      }
    },
    exception: {
      fn: function(proxy, type, action, options, response, arg) {
        if (response.status == '401') {
          Ext.getCmp('statusbar-wms').setStatus({
            text: 'Login vereist',
            iconCls: 'x-status-error'
          });
          ShowLoginForm(options.params.url);
        } else {
          Ext.getCmp('statusbar-wms').setStatus({
            text: 'Inladen is mislukt',
            iconCls: 'x-status-error'
          });
          msg('Fout bij inladen', arg);
        }
      }
    }
  }
});
var loginWin;

function ShowLoginForm(url) {
  var loginForm = new Ext.FormPanel({
    labelWidth: 75,
    frame: true,
    title: 'Login vereist',
    bodyStyle: 'padding: 5px 5px 0',
    defaultType: 'textfield',
    items: [{
      fieldLabel: 'Login',
      name: 'login',
      width: 200,
      value: initUser
    }, {
      fieldLabel: 'Password',
      name: 'password',
      width: 200,
      value: initKey
    }],
    buttons: [{
      text: 'Annuleren',
      handler: function() {
        loginWin.hide();
        Ext.getCmp('statusbar-wms').setStatus({
          text: 'Inladen is mislukt',
          iconCls: 'x-status-error'
        });
      }
    }, {
      text: 'Login',
      handler: function() {
        initUser = loginForm.getForm().findField('login').getValue();
        initKey = loginForm.getForm().findField('password').getValue();
        LoadWithLogin(null, url, initUser, initKey);
        loginWin.close();
      }
    }]
  });
  loginWin = new Ext.Window({
    closeAction: 'hide',
    layout: 'fit',
    modal: true,
    width: 320,
    height: 150,
    plain: false,
    border: false,
    items: [loginForm]
  });
  loginWin.show();
}

function mapPreview(grid, index) {
  var record = grid.getStore().getAt(index);
  var layer = record.getLayer().clone();
  var win = new Ext.Window({
    title: "Preview: " + record.get("title"),
    width: 512,
    height: 256,
    layout: "fit",
    items: [{
      xtype: "gx_mappanel",
      layers: [layer],
      projection: map_projection,
      extent: record.get("llbbox")
    }]
  });
  win.show();
}

function LoadWithLogin(title, url, login, password) {
  if (pwdDict.Lookup(url)) {
    pwdDict.Delete(url);
  }
  var p = new Object();
  p.login = login;
  p.password = password;
  pwdDict.Add(url, p);
  LoadCapabilities(title, {
    url: url,
    request: 'GetCapabilities',
    usr: login,
    pwd: password
  });
}

function LoadWithoutLogin(title, url) {
  LoadCapabilities(title, {
    url: url,
    request: 'GetCapabilities'
  });
}

function showCapabilitiesGrid() {
  if (wmsWin) {
    wmsWin.show(this);
    return;
  }
  var expSources = new Ext.ux.grid.RowExpander({
    tpl: new Ext.Template(
      '<p><b>URL:</b> <a href="{url}request=getcapabilities&service=wms" target="_blank">{url}</a><br/><b>Description:</b> {description}</p>'
    )
  });
  var expWms = new Ext.ux.grid.RowExpander({
    tpl: new Ext.Template(
      '<p><b>Abstract:</b> {abstract}</p>'
    )
  });
  var actionSources = new Ext.ux.grid.RowActions({
    header: '',
    keepSelection: true,
    actions: [{
      iconCls: 'icon-load',
      tooltip: 'Haal lagen op'
    }]
  });
  actionSources.on({
    action: function(grid, record, action, row, col) {
      var p = pwdDict.Lookup(record.data.url);
      var url = record.data.url;
      if (p) {
        LoadWithLogin(record.data.name, url, p.login, p.password);
      } else {
        LoadWithoutLogin(record.data.name, url);
      }
      Ext.getCmp('tool_voeglaagtoe').disable();
    }
  });
  sourcesGrid = new Ext.grid.GridPanel({
    title: "WMS Sources\n",
    store: wmsSourcesStore,
    cm: new Ext.grid.ColumnModel([
      expSources, {
        header: "Name",
        dataIndex: "name",
        sortable: true,
        id: "name"
      },
      actionSources
    ]),
    sm: new Ext.grid.RowSelectionModel({
      singleSelect: true
    }),
    autoExpandColumn: "name",
    plugins: [expSources, actionSources],
    flex: 50,
    bbar: new Ext.ux.StatusBar({
      id: 'statusbar-sources',
      disabled: true,
      defaultText: 'Klaar',
      defaultIconCls: '',
      items: [{
        text: 'Voeg URL toe',
        iconCls: 'icon-add',
        handler: function() {
          ShowSourceURLWindow();
        }
      }]
    })
  });
  wmsGrid = new Ext.grid.GridPanel({
    title: "WMS Capabilities",
    store: wmsCapStore,
    cm: new Ext.grid.ColumnModel([
      expWms, {
        header: "Name",
        dataIndex: "name",
        sortable: true
      }, {
        header: "Title",
        dataIndex: "title",
        sortable: true,
        id: "title"
      }, {
        header: "Queryable",
        dataIndex: "queryable",
        sortable: true,
        width: 70
      }
    ]),
    sm: new Ext.grid.RowSelectionModel({
      multiSelect: true,
      listeners: {
        selectionchange: {
          fn: function(m) {
            if (m.selections.length > 0) {
              Ext.getCmp('tool_voeglaagtoe').enable();
            } else {
              Ext.getCmp('tool_voeglaagtoe').disable();
            }
          }
        }
      }
    }),
    autoExpandColumn: "title",
    plugins: expWms,
    flex: 50,
    bbar: new Ext.ux.StatusBar({
      id: 'statusbar-wms',
      defaultText: 'Klaar',
      defaultIconCls: '',
      items: [{
        id: 'tool_voeglaagtoe',
        text: 'Voeg laag toe aan kaart',
        iconCls: 'icon-add',
        handler: function() {
          AddWMSLayerToMap(wmsGrid.getSelectionModel());
        }
      }]
    }),
    listeners: {
      rowdblclick: mapPreview
    }
  });
  wmsWin = new Ext.Window({
    title: "Voeg laag toe",
    closeAction: 'hide',
    layout: 'hbox',
    layoutConfig: {
      align: 'stretch'
    },
    width: 800,
    height: 350,
    modal: true,
    items: [sourcesGrid, wmsGrid],
    listeners: {
      hide: function(win) {
        wmsGrid.getSelectionModel().clearSelections();
      }
    }
  });
  Ext.getCmp('statusbar-sources').showBusy({
    text: 'Even geduld: ophalen van data...'
  });
  wmsSourcesStore.load({
    callback: function(records, options, success) {
      if (!success) {
        alert("Could not download service list");
      } else {
        setTimeout(function() {
          sourcesGrid.getSelectionModel().selectRow(0);
          var data = sourcesGrid.getSelectionModel().selections.items[0].data;
          LoadWithoutLogin(data.name, data.url);
        }, 0);
      }
    }
  });
  wmsWin.show();
}

function AddWMSLayerToMap(record) {
  if (record.selections.length > 0) {
    for (i = 0; i < record.selections.length; i++) {
      var clone = record.selections.items[i].clone();
      p = pwdDict.Lookup(record.selections.items[0].data.layer.url + "?");
      if (p) {
        var password = p.password;
        var login = p.login;
      }
      clone.get("layer").mergeNewParams({
        format: "image/png",
        transparent: true,
        isBaseLayer: false,
        usr: login,
        pwd: password
      });
      clone.get("layer").setTileSize(new OpenLayers.Size(wmsLayerTileSize, wmsLayerTileSize)); // bigger, faster, stronger
      clone.get("layer").buffer = wmsLayerBuffer;
      clone.get("layer").url = OpenLayers.ProxyHost + clone.get("layer").url + "?"; // set the url to the service with first access
      var realminscale;
      var realmaxscale;
      if (clone.get("layer").minScale == null || clone.get("layer").minScale == 0) {
        realminscale = Math.round(map.scales[0]);
      } else {
        for (var ii = 0; ii < map.scales.length; ii++) {
          if (clone.get("layer").minScale >= map.scales[ii]) {
            realminscale = Math.round(map.scales[ii]);
            break;
          }
        }
      }
      if (clone.get("layer").maxScale == null || clone.get("layer").maxScale == 0) {
        realmaxscale = Math.round(map.scales[map.scales.length - 1]);
      } else {
        for (var ii = map.scales.length - 2; ii >= 0; ii--) {
          if (clone.get("layer").maxScale <= map.scales[ii]) {
            realmaxscale = Math.round(map.scales[ii]);
            break;
          }
        }
      }
      clone.get("layer").mergeNewParams({
        realminscale: realminscale,
        realmaxscale: realmaxscale
      });
      mapPanel.layers.add(clone);
    }
    //wmsWin.hide();
  }
}

function LoadCapabilities(title, params) {
  wmsCapStore.removeAll();
  Ext.getCmp('statusbar-wms').showBusy({
    text: 'Even geduld: ophalen van data...'
  });
  wmsCapStore.baseParams = params;
  wmsCapStore.load();
  if (title != null) {
    wmsGrid.setTitle(title);
  }
}
window.Racing = {
  removeLines: function() {
    vecLayer.removeFeatures(vecLayer.features);
  },
  activateLayerByName: function(name) {
    var spans = document.getElementsByTagName('span');
    for (var i = 0; i < spans.length; i++) {
      if (spans[i].innerHTML == name) {
        Ext.get(spans[i]).parent().prev().dom.click();
      }
    }
  },
  showGemeente: function(gemeenteNaam, straatNaam) {
    Racing.gemeenteNaam = gemeenteNaam;
    Racing.straatNaam = straatNaam;
    Racing.activateLayerByName('Geen achtergrondlaag');
    //Racing.addLayerByName('GRB_WBN');//AGROND,GRB_WVB,GRB_WGO,
    Racing.removeLines();
    var searchpanelCrab = document.getElementById('searchpanelCrab');
    var searchpanelCrabForm = searchpanelCrab.querySelectorAll('form')[0];
    var inputFields = searchpanelCrabForm.querySelectorAll('input');
    Racing.ddGemeente = Ext.getCmp(inputFields[0].id);
    Racing.gemeenteStore = Racing.ddGemeente.store;
    Racing.ddStraat = Ext.getCmp(inputFields[1].id);
    Racing.straatStore = Racing.ddStraat.store;
    Racing.chkZoom = Ext.getCmp(inputFields[3].id);
    if (Racing.straatNaam == null) {
      Racing.chkZoom.setValue(true);
    } else {
      Racing.straatStore.addListener('load', Racing.showStraat, Racing, {
        single: true
      });
    }
    var gemeenteId = Racing.gemeenteStore.data.keys[Racing.gemeenteStore.find('GemeenteNaam', Racing.gemeenteNaam)];
    Racing.ddGemeente.selectedIndex = Racing.gemeenteStore.find('GemeenteId', gemeenteId);
    Racing.ddGemeente.setValue(gemeenteId).fireEvent('select', Racing.ddGemeente);
    Racing.ddGemeente.fireEvent('change', Racing.ddGemeente, gemeenteId);
  },
  showStraat: function() {
    Racing.chkZoom.setValue(true);
    var straatId = Racing.straatStore.data.keys[Racing.straatStore.find('Straatnaam', Racing.straatNaam)];
    Racing.ddStraat.selectedIndex = Racing.straatStore.find('StraatnaamId', straatId);
    Racing.ddStraat.setValue(straatId).fireEvent('select', Racing.ddStraat);
    Racing.ddStraat.fireEvent('change', Racing.ddStraat, straatId);
    viewLocationButton.handler();
    setTimeout(Racing.exportVectorLayer, 0);
  },
  addLayersByName: function(names) {
  	for (var i = 0; i < names.length; i++) {
  		Racing.addLayerByName(names[i]);
  	}
  },
  addLayerByName: function(name) {
    for (var i = 0; i < wmsCapStore.data.length; i++) {
      if (wmsCapStore.data.items[i].data.name == name) {
        wmsGrid.getSelectionModel().selectRow(i);
        AddWMSLayerToMap(wmsGrid.getSelectionModel());
        return;
      }
    }
  },
  layerByName: function(name) {
  	return map.layers.filter(function(layer) {
  		return layer.name == name ? layer : null
  	})[0];
  },
  exportVectorLayer: function() {
    if (vecLayer.features.length == 0) {
      setTimeout(Racing.exportVectorLayer, 0);
    } else {
      var fc = {
        gemeenteNaam: Racing.gemeenteNaam,
        straatNaam: Racing.straatNaam,
        bounds: {
          minX: 999999,
          minY: 999999,
          maxX: 0,
          maxY: 0
        },
        lines: []
      }
      var bounds = fc.bounds;
      for (var i = 0; i < vecLayer.features.length; i++) {
        var b = vecLayer.features[i].geometry.bounds;
        bounds.minX = Math.max(bounds.minX, b.left);
        bounds.maxX = Math.min(bounds.maxX, b.right);
        bounds.minY = Math.max(bounds.minY, b.bottom);
        bounds.maxY = Math.min(bounds.maxY, b.top);
      }
      for (var i = 0; i < vecLayer.features.length; i++) {
        var g = vecLayer.features[i].geometry;
        var lines = [];
        for (var j = 0; j < g.components.length; j++) {
          var c = g.components[j];
          lines.push({
            x: c.x,
            y: c.y
          });
        }
        fc.lines.push(lines);
      }
      Racing.straat = fc;
      showCapabilitiesGrid();
      //prompt('', JSON.stringify(fc));
    }
  }
}
Racing.showGemeente('Stabroek', 'Markt');
