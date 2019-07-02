function check_url_vaild(http_address) {
  var regex = /param_coords=/g
  var stateRegex = regex.test(http_address)
  return stateRegex
}

function turn_off_layout() {
  var layout_list = ['ortoselect', 'overview_map1', 'wyszukiwanie', 'prawy_panel_toggle']
  for (var i=0; i<layout_list.length; i++) {
            document.getElementById(layout_list[i]).style['display'] = 'none';
        }
  var mapp = document.getElementById('map')
  var noprint_feats = mapp.querySelectorAll('.noprint')
  for (var i=0; i<noprint_feats.length; i++) {
    if (noprint_feats[i].style['cursor'] == 'pointer') {
      console.log("point")
        noprint_feats[i].style['z-index'] = -1;

    }
  }
}

function turn_off_upper_headers() {
  var serwisy = document.getElementById('dostepne_serwisy')
  var toolbar = document.getElementById('toolbar_search')
  var map_cont = document.getElementById('map_container')
  serwisy.style['display'] = 'none'
  toolbar.style['display'] = 'none'
  map_cont.style['top'] = '0'
}

function set_wanted_layers(genre) {
    if (genre == 'orto') {
        var ids_list = ['lay4', 'lay5', 'lay9', 'ortoselect_orto', 'prawy_panel_toggle_img']
        for (var i=0; i<ids_list.length; i++) {
            document.getElementById(ids_list[i]).click();
        }
    }
    else if (genre == 'register') {
        var ids_list = ['lay0', 'lay5', 'prawy_panel_toggle_img']
        for (var i=0; i<ids_list.length; i++) {
            document.getElementById(ids_list[i]).click();
        }
        var row = document.getElementsByClassName('row')[0]
        var row_img = row.getElementsByClassName('checkbox_icon')[0]
        row_img.click()
    }
    else if (genre == 'property') {
        var ids_list = ['lay0', 'lay5', 'lay9', 'lay103', 'lay111', 'prawy_panel_toggle_img']
        for (var i=0; i<ids_list.length; i++) {
            document.getElementById(ids_list[i]).click();
        }
    }
    else if (genre == 'utilities') {
        var ids_list = ['lay5', 'lay50', 'prawy_panel_toggle_img']
        for (var i=0; i<ids_list.length; i++) {
            document.getElementById(ids_list[i]).click();
        }
    }
    else if (genre == 'bdot') {
        var ids_list = ['lay5', 'lay47', 'prawy_panel_toggle_img']
        for (var i=0; i<ids_list.length; i++) {
            document.getElementById(ids_list[i]).click();
        }
    }
    else if (genre == 'landuse') {
        var ids_list = ['lay5', 'lay7', 'lay13', 'lay15', 'prawy_panel_toggle_img']
        for (var i=0; i<ids_list.length; i++) {
            document.getElementById(ids_list[i]).click();
        }
    }
    else if (genre == 'studium') {
        var ids_list = ['lay39', 'lay40', 'lay71', 'prawy_panel_toggle_img']
        for (var i=0; i<ids_list.length; i++) {
            document.getElementById(ids_list[i]).click();
        }
    }
    else if (genre == 'wz') {
        var ids_list = ['lay0', 'lay5', 'lay9', 'lay55', 'prawy_panel_toggle_img']
        for (var i=0; i<ids_list.length; i++) {
            document.getElementById(ids_list[i]).click();
        }
    }
    else if (genre == 'pnb') {
        var ids_list = ['lay0', 'lay5', 'lay9', 'lay60', 'prawy_panel_toggle_img']
        for (var i=0; i<ids_list.length; i++) {
            document.getElementById(ids_list[i]).click();
        }
    }
    else if (genre == 'ldwn') {
        var ids_list = ['lay80', 'lay77', 'lay7', 'prawy_panel_toggle_img']
        for (var i=0; i<ids_list.length; i++) {
            document.getElementById(ids_list[i]).click();
        }
    }
    else if (genre == 'ln') {
        var ids_list = ['lay80', 'lay77', 'lay8', 'prawy_panel_toggle_img']
        for (var i=0; i<ids_list.length; i++) {
            document.getElementById(ids_list[i]).click();
        }
    }
}

function saveAs(uri, filename) {
    var link = document.createElement('a');
    if (typeof link.download === 'string') {

        link.href = uri;
        link.download = filename;

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);

    } else {
        window.open(uri);
    }
}

function add_download_button() {
  if (document.querySelector('.downloadButton') == null) {
    var div_toolbar = document.getElementById("logo_um");
    var str = '<a id="download_img" class="downloadButton" title="Save current map" style="background-color: rgba(0, 153, 51, 1);color: white;border-color: #5f5f5f;margin-left: 10px;cursor: pointer; padding: 2px">Save</a>';
    div_toolbar.insertAdjacentHTML('beforeend', str );
  }
  else {
    return
  }
}

function add_layout_button() {
  if (document.querySelector('.layoutButton') == null) {
    var div_toolbar = document.getElementById("logo_um");
    var str = '<a id="clear_layout" class="layoutButton" title="Hide all features" style="background-color: rgba(230, 0, 0, 1);color: white;border-color: #5f5f5f;margin-left: 10px;cursor: pointer; padding: 2px">Hide</a>';
    div_toolbar.insertAdjacentHTML('beforeend', str );
  }
  else {
    return
  }
}

function add_layer_name() {
  if (document.querySelector('.layer_name') == null) {
    var div_toolbar = document.getElementById("logo_um");
    var str = '<a id="layer_n" class="layer_name" style="font-weight: bold; border-color: #5f5f5f;margin-left: 10px;padding: 2px">' + layer_to_export + '</a>';
    div_toolbar.insertAdjacentHTML('beforeend', str );
  }
  else {
    return
  }
}


function add_script_link() {
  var script = document.createElement("script");
  script.src = 'https://html2canvas.hertzen.com/dist/html2canvas.min.js'
  document.head.appendChild(script);
}

if ((mapview.getAllFOIs()).length == 0) {

var window_url = window.location.href
var layer_to_export

function fetch_data_from_url (url) {
  if (check_url_vaild(url)) {
 var splitted = url.split("&param_coords=")
 var splitted_twice = splitted[0].split("&")
 layer_to_export = splitted_twice[splitted_twice.length-1]
 set_wanted_layers(layer_to_export)
 
 var fetch_data = splitted[1].split("&")
 // var list_data = fetch_data.split(",")

return fetch_data
}
}

function convert_to_numbers(str_list) {
    for(var i=0; i<str_list.length;i++) {
      str_list[i] = +str_list[i];
}
return str_list
}

var main_color = new MVStyleColor("main_style", null, "#307fe2");
var option_color = new MVStyleColor("option_style", null, "#fdfe02");
if (layer_to_export == 'studium') {
  main_color.setStrokeWidth(2)
  option_color.setStrokeWidth(2)
} else {
  main_color.setStrokeWidth(5)
  option_color.setStrokeWidth(5)
}

function add_foi_to_map(coords, style, i) {
    var polygon = MVSdoGeometry.createPolygon(coords, 2178) ;
    var poll = new MVFOI("poly_" + String(i), polygon, style) ;
    poll.setTopFlag(true)
    mapview.addFOI(poll);
}

var coords_data = fetch_data_from_url(window_url)

for(var i=coords_data.length-2; i>=0;i--) {
    var converted = JSON.parse("[" + coords_data[i] + "]")
    if (i == 0) {
        add_foi_to_map(converted, main_color, i)
    } else {
        add_foi_to_map(converted, option_color, i)
}
}

var mbr_data = JSON.parse("[" + coords_data[coords_data.length-1] + "]")
var mbr_geom = MVSdoGeometry.createRectangle(mbr_data[0], mbr_data[1], mbr_data[2], mbr_data[3])
mapview.zoomToRectangle(mbr_geom)

// mapview.addScaleBar(3, 20, 20, false)


turn_off_upper_headers()

// add_download_button()
add_layout_button()
add_layer_name()



// document.getElementById("download_img").addEventListener("click", function() {
//     html2canvas(document.querySelector('#map')).then(function(canvas) {
//         saveAs(canvas.toDataURL(), layer_to_export + '.png');
//     });
// });

document.getElementById("clear_layout").addEventListener("click", function() {
  turn_off_layout()
});

add_script_link()

} else {
  console.log("Exists")
}
