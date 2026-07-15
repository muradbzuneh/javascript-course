class Car {
  #model;
  #brand;
  speed;
  isTrunkOpen;
  constructor(model, brand){
    this.#model = model;
    this.#brand = brand;
    this.speed = 0;
    this.isTrunkOpen = false;
  }
  displayInfo(){
    console.log(`Model:${this.#model} Brand: ${this.#brand} Speed:${this.speed}km/hr`)
  }
getModel() {
  return this.#model;
}
getBrand() {
  return this.#brand;
}
  go(){
    if(this.speed === 200 || this.isTrunkOpen === true){
      console.log('can not add speed hit limit')
    }
    else {
       this.speed += 5;
    }
    return this.speed
  }
  breake(){
    if (this.speed === 0){
    console.log('can not increase it is under speed')
    }
    else {
    this.speed -= 5; 
    }
   return this.speed
  }
openTruck(){
  if(this.speed > 0){
    console.log('the car is moving')
  }
  else {
    this.isTrunkOpen = true
  }
}
closeTruk(){
this.isTrunkOpen = false
}
}

const car1 = new Car('motrola', 'rengerover')
const car2 = new Car('toyota', 'corolloa')

car1.go()
car1.go()
car1.go()
car2.go()
car2.breake()
car1.displayInfo()
console.log(car1.getBrand())
console.log(car1.getModel())

class NewCar extends Car {
  acceleration;
  constructor(model, brand, acceleration){
    super(model, brand)
    this.acceleration = acceleration
  }
  go(){
  if(this.speed >= 300){
    console.log('can not add speed hit limit')
    }
    else {
    this.speed += this.acceleration;
    }
    return this.speed
  }
}
const raceCar = new NewCar("Mclerane", 'F1', 20)
const raceCar2 = new NewCar("mercedes", "ferrari", 40)
raceCar2.go()
raceCar.go();
raceCar.go();
raceCar.displayInfo();
console.log(raceCar)
raceCar2.displayInfo()


