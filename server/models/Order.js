class Order {
  constructor(
    id, orderedBy, cateredBy, dateTimeOrdered, delMinutesEst,
    delTime, tPrice, meal, status, startTimer,
  ) {
    this.id = id;
    this.orderedBy = orderedBy;
    this.cateredBy = cateredBy;
    this.dateTimeOrdered = dateTimeOrdered;
    this.delMinutesEst = delMinutesEst;
    this.delTime = delTime;
    this.tPrice = tPrice;
    this.meal = meal;
    this.status = status;
    this.startTimer = startTimer;
  }
}
export default Order;
