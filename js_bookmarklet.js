var window_url = window.location.href

function get_data_from_api(zone, plot) {

  var current_id
  var find_flag = 0

  $.ajax({ 
    type: 'GET', 
    url: 'http://mapa.um.warszawa.pl/mapaApp1/wyszukaj?funkcja=wyszukajByNrObrebuNrDzialki&nrObrebu=' + zone + '&nrDzialki=' + plot, 
    dataType: 'xml',
    success: function (data) { 
     console.log('done')
     $(data).find('obiekt').each(function(){
         if (find_flag == 0) {
                 $(this).find("id").each(function(){
                     current_id = $(this).text();
                 });
                    $(this).find("adres").each(function(){
                        var name = $(this).text();
                        var name_splitted = name.split(" ")
                        var plot_number = name_splitted[name_splitted.length-1]
                        console.log(name)
                        if (plot_number == plot) {
                         find_flag = 1
                         console.log(current_id)
                            
                        }
                        ;})
            }
            else {
             return
            }
        });
        if (find_flag == 1) {
         console.log(current_id)
         var prefix = 'DZIALKI'
         window.pokazNaMapie(prefix, current_id)
        }

    },
});
}


function fetch_data_from_url (url) {
  if (check_url_vaild(url)) {
 console.log("in fetch data func")
 var fetch_data = url.split("&param_zone_plot=")[1]
 var fetch_data_splitted = fetch_data.split("-")
 var zone_nb = fetch_data_splitted[0]
    
 if (fetch_data_splitted.length > 2) {
     var plot_nb = fetch_data_splitted[1] + '/' + fetch_data_splitted[2]
 }
 else {
     var plot_nb = fetch_data_splitted[1]
 }
 console.log(zone_nb)
 console.log(plot_nb)
 get_data_from_api(zone_nb, plot_nb)
  }
  else {
    alert("Niewłaściwy adres URL")
  }
}

function check_url_vaild(http_address) {
  var regex = /param_zone_plot=/g
  var stateRegex = regex.test(http_address)
  console.log(stateRegex)
  return stateRegex
}

fetch_data_from_url(window_url)
