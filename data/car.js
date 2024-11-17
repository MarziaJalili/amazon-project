class Car {
    #brand;
    #modal;
    speed = 0;
    isTruckOpen = false;

    constructor(carDetails) {
        this.#brand = carDetails.brand;
        this.#modal = carDetails.modal;
    }

    dispalyInfo() {
        console.log(`${this.#brand} ${this.#modal} Speed: ${this.speed} km/h Truck: ${this.isTruckOpen}`);
    }

    go() {
        if (this.isTruckOpen) {
            console.log("The truck is open, so the car can't go.");
            return;
        }
        if (this.speed >= 0 && this.speed < 200) {
            this.speed += 5;
        } else {
            console.log("Your speed is limited between 0 and 200, babe.");
        }
    }

    break() {
        if (this.speed > 0 && this.speed < 200) {
            this.speed -= 5;
        } else {
            console.log("Your speed is limited between 0 and 200, babe.");
        }
    }

    openTruck() {
        if (this.speed <= 0) { // Changed to check if speed is 0 or less
            this.isTruckOpen = true; // Fixed the typo here
            console.log(this.isTruckOpen);
        } else {
            console.log("This car is moving and can't open up the truck.");
        }
    }

    closeTruck() {
        this.isTruckOpen = false;
    }
}

const car1 = new Car({ brand: "Toyota", modal: "Corolla" });
car1.dispalyInfo();


class RaceCar extends Car {
    acceleration;
    constructor(carDetails) {
        super(carDetails);
        this.acceleration = carDetails.acceleration;

    }
    go() {
        if (this.isTruckOpen) {
            console.log("The truck is open, so the car can't go.");
            return;
        }
        if (this.speed >= 0 && this.speed < 300) {
            this.speed += this.acceleration;
        } else {
            console.log("Your speed is limited between 0 and 200, babe.");
        }
    }
    openTruck() {
        console.log("racing car doesn't have a truck")
    }

    closeTruck() {
        console.log("racing car doesn't have a truck")
    }
}

const raceCare = new RaceCar({
    brand: "McLaren",
    modal: "F1",
    acceleration: 20
});

raceCare.go();
raceCare.go();
raceCare.go();
raceCare.dispalyInfo();