const R = require('ramda');

export const products = {
  FR1: {
    code: 'FR1',
    name: 'Fruit tea',
    price: 3.11,
  },
  SR1: {
    code: 'SR1',
    name: 'Strawberries',
    price: 5.00,
  },
  CF1: {
    code: 'CF1',
    name: 'Coffee',
    price: 11.23,
  },
};

const actions = {
  UPDATE_PRICE: (item, action) => {
    return Object.assign(item, { price: action.price });
  },
};

export class Basket {
  constructor(priceRules = []) {
    this.rules = priceRules;
    this.basket = {};
  }
  add(itemCode) {
    if (this.basket[itemCode]) {
      this.basket[itemCode].qty++;
    } else {
      this.basket[itemCode] = {
        code: products[itemCode].code,
        price: products[itemCode].price,
        qty: 1,
      };
    }
  }
  total() {
    R.forEach((rule) => {
      if (this.basket[rule.productCode] && R[rule.condition.rule](this.basket[rule.productCode].qty, rule.condition.qty)) {
        this.basket[rule.productCode] = actions[rule.action.type](this.basket[rule.productCode], rule.action);
      }
    }, this.rules);
    return R.reduce(
      (acc, item) => {
        return acc + (this.basket[item].price * this.basket[item].qty);
      },
      0,
      R.keys(this.basket));
  }
}

