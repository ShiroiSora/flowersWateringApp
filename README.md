flowersWateringApp Plant watering scheduler
-------------------------------------------
Contract between client and server:

1) Application name: 'plantApp'

Methods:

1) Add flower (POST): 
   Url example:  https://nodejs-soraneko.c9users.io/plantApp/flower

  data: {
            flower: flower
        }
      
2) Update flower watering date by flower name (PUT)
   Url example:  https://nodejs-soraneko.c9users.io/plantApp/flower
     
 data: {    name: name,
            lastWateringDate: lastWateringDate,
            nextWateringDate: nextWateringDate,
            state: state
       }

3) Delete flower by name (DELETE)
   Url example: https://nodejs-soraneko.c9users.io/plantApp/flower/${name}
   ${name} - flower name
   

4) Get list of flowers 
   Url example: https://nodejs-soraneko.c9users.io/plantApp/flowers


 5) Get watering history (log)
  Url example:  https://nodejs-soraneko.c9users.io/plantApp/flower/history

   

