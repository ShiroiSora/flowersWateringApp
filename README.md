flowersWateringApp Plant watering scheduler
-------------------------------------------
Contract between client and server:

1) Application name: 'plantApp'
2)  id: 'Kalinichenko'

Methods:

1) Add flower (POST): 
   Url example:  https://js-classes-kucherenko.c9users.io/plantApp/Kalinichenko/flower

  data: {
            flower: JSON.stringify(flower)
        }
      
2) Update flower watering date by flower name (PUT)
   Url example:  https://js-classes-kucherenko.c9users.io/plantApp/Kalinichenko/flower
     
 data: {   name: name,
           date: date
       }

3) Delete flower by name (DELETE)
   Url example: https://js-classes-kucherenko.c9users.io/plantApp/Kalinichenko/flower/${name}
   ${name} - flower name
   

4) Get list of flowers by id
   Url example: https://js-classes-kucherenko.c9users.io/plantApp/Kalinichenko/flowers


 5) Get watering history (log) by id
  Url example:  https://js-classes-kucherenko.c9users.io/plantApp/Kalinichenko/flower/history

   

