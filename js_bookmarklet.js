var window_url = window.location.href

function get_data_from_api(zone, plot) {

  var current_id
  var find_flag = 0

  $.ajax({ 
    type: 'GET', 
    url: 'http://mapa.um.warszawa.pl/mapaApp1/wyszukaj?funkcja=wyszukajByNrObrebuNrDzialki&nrObrebu=' + zone + '&nrDzialki=' + plot, 
    dataType: 'xml',
    success: function (data) { 
     $(data).find('obiekt').each(function(){
         if (find_flag == 0) {
                 $(this).find("id").each(function(){
                     current_id = $(this).text();
                 });
                    $(this).find("adres").each(function(){
                        var name = $(this).text();
                        var name_splitted = name.split(" ")
                        var plot_number = name_splitted[name_splitted.length-1]
                        if (plot_number == plot) {
                         find_flag = 1
                            
                        }
                        ;})
            }
            else {
             return
            }
        });
        if (find_flag == 1) {
         var prefix = 'DZIALKI'
         window.pokazNaMapie(prefix, current_id)
        }

    },
});
}


function fetch_data_from_url (url) {
  if (check_url_vaild(url)) {
 var fetch_data = url.split("&param_zone_plot=")[1]
 var fetch_data_splitted = fetch_data.split("-")
 var zone_nb = fetch_data_splitted[0]
    
 if (fetch_data_splitted.length > 2) {
     var plot_nb = fetch_data_splitted[1] + '/' + fetch_data_splitted[2]
 }
 else {
     var plot_nb = fetch_data_splitted[1]
 }

 get_data_from_api(zone_nb, plot_nb)
 add_clearing_button()
  }
  else {
    alert("Requested URL is invalid")
  }
}

function check_url_vaild(http_address) {
  var regex = /param_zone_plot=/g
  var stateRegex = regex.test(http_address)
  return stateRegex
}

function add_clearing_button() {
  if (document.querySelector('.clearButton') == null) {
    var div_toolbar = document.getElementById("toolbar");
    var str = '<a id="search_clear" class="clearButton" title="clears the map selection" onclick="toolbarButtonOnClick(this)" style="background-color: rgba(46, 127, 227, 1);color: white;border-color: #5f5f5f;margin-left: 10px;cursor: pointer;">clear selection</a>';
    div_toolbar.insertAdjacentHTML('beforeend', str );
  }
  else {
    return
  }
}

fetch_data_from_url(window_url)
