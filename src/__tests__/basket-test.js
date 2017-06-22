import { Basket, products } from '../basket';

export const priceRules = [
  {
    productCode: 'FR1',
    condition: {
      rule: 'gt',
      qty: 1,
    },
    action: {
      type: 'ADD',
      qty: 1,
    },
  },
  {
    productCode: 'SR1',
    condition: {
      rule: 'gte',
      qty: 3,
    },
    action: {
      type: 'UPDATE_PRICE',
      price: 4.5,
    },
  },
];

describe('Basket', () => {
  it('sasa', () => {
    const basket = new Basket;
    basket.add({});
    basket.add('SR1');
    expect(basket.total()).toEqual(8.11);
  });

  it('price', () => {
    const basket = new Basket(priceRules);
    basket.add('SR1');
    basket.add('SR1');
    basket.add('SR1');
    console.log(basket.basket);
    expect(basket.total()).toEqual(13.5);
  });
});
