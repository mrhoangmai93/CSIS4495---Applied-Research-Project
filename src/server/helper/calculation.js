// export function calculateSubTotal(foodArray) {
//   let subTotal = 0;
//   foodArray.forEach(food => {
//     subTotal += food.foodId.price * food.quantity;
//   });
//   return subTotal;
// }

module.exports = {
  calculateSubTotal: foodArray => {
    let subTotal = 0;
    foodArray.forEach(food => {
      subTotal += food.foodId.price * food.quantity;
    });
    return subTotal;
  }
};
