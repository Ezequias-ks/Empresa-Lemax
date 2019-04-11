function getDistanceValue() {
     //API gerada no Google 
     var origin = $("#origin").val() + ", São Paulo - SP, Brasil";
     
     console.log(origin);
     
     var destination = $("#destination").val() + ", São Paulo - SP, Brasil";
     
     console.log(destination);
     
     var service = new google.maps.DistanceMatrixService;

     console.log(service);
     service.getDistanceMatrix({
          origins: [origin],
          destinations: [destination],
          travelMode: 'DRIVING',
          unitSystem: google.maps.UnitSystem.METRIC,
          avoidHighways: false,
          avoidTolls: false
     },function(response, status) {
          if (status == "OK") {
               var pricePerKM = 3.8; //Valor Km
          
               //Conversão de Metro para Quilômetro
               var distance = response.rows[0].elements[0].distance.value;
               var distanceKM = (distance/1000);
               var price = (Math.ceil(distanceKM) * pricePerKM).toFixed(2);		
          
               $('#calResult').html(
                           "<li class='list-group-item' name='origem'><strong>Origem</strong>: " + response.originAddresses[0] + "</li>"
                         + "<li class='list-group-item' name='destino'><strong>Destino</strong>: " + response.destinationAddresses[0] + "</li>"
                         + "<li class='list-group-item' name='distancia'><strong>Distância</strong>: " + response.rows[0].elements[0].distance.text + "</li>"
                         + "<li class='list-group-item' name='duracao'><strong>Duração</strong>: " + response.rows[0].elements[0].duration.text + "</li>"
                         + "<li class='list-group-item list-group-item-success' name='preco' ><strong>Preço</strong>: " + price + "</li>"
                    );
          }else {
               $('#calResult').html('Ocorreu um erro');
               }   
          }
     );
};