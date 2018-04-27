class Meal {
  constructor(id, title, description, image, price) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.image = image;
    this.price = price;
  }
  setId(value) {
    this.id = value;
  }
}
export default Meal;

// export const mealsObject = { meals: [] }; // can't just export the meals array. it is immutable
