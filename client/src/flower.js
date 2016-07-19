 module.exports = class Flower {

     constructor(name, place, intervalToWater, minDivergence, maxDivergence) {
         this.name = name;
         this.place = place;
         this.intervalToWater = intervalToWater; //in minutes
         this.lastWateringDate = new Date();
         this.minDivergence = minDivergence;
         this.maxDivergence = maxDivergence;
         this.nextWateringDate = this.getNextWateringDate(intervalToWater);
     }

     getNextWateringDate(intervalToWater) {
         let nextWateringDate = new Date();
         nextWateringDate.setMinutes(((+nextWateringDate.getMinutes())) + (+intervalToWater));
         return nextWateringDate;
     }

     toJSON() {
         return {
             name: this.name,
             place: this.place,
             intervalToWater: this.intervalToWater,
             lastWateringDate: this.lastWateringDate.getTime(),
             minDivergence: this.minDivergence,
             maxDivergence: this.maxDivergence,
             nextWateringDate: this.getNextWateringDate(this.intervalToWater).getTime()
         };
     }

     static fromJson(obj) {
         let flower = new Flower(obj.name, obj.place, obj.intervalToWater, obj.minDivergence, obj.maxDivergence);

         flower.lastWateringDate = new Date(obj.lastWateringDate);
         flower.nextWateringDate = new Date(obj.nextWateringDate);

         return flower;
     };
 }