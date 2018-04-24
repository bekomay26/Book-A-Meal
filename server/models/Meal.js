export class Meal {
  constructor(title, desription, image, price) {
    // this.id = 0;
    this.title = title;
    this.desription = desription;
    this.image = image;
    this.price = price;
  }
  setId(value) {
    this.id = value;
  }
}

export const mealsObject = { meals: [] }; // can't just export the meals array. it is immutable
