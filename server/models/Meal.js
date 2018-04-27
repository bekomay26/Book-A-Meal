class Meal {
  constructor(id, title, description, image, price, extras, qty) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.image = image;
    this.price = price;
    this.extras = extras;
    this.qty = qty;
  }
}
export default Meal;

// export const mealsObject = { meals: [] }; // can't just export the meals array. it is immutable
