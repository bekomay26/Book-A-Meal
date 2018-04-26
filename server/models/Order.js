class Order {
  constructor(id, orderedBy, cateredBy, timeOrdered, delTimeEst, tPrice, mealId, date, status) {
    this.id = id;
    this.orderedBy = orderedBy;
    this.cateredBy = cateredBy;
    this.timeOrdered = timeOrdered;
    this.delTimeEst = delTimeEst;
    this.tPrice = tPrice;
    this.mealId = mealId;
    this.date = date;
    this.status = status;
  }
}
export default Order;
