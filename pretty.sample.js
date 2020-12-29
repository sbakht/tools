// let formatJson = require('format-json-pretty');
// let colorize = require('json-colorizer');

// Not so good
// let formatJson = require('format-json-pretty');

// Good
// let formatJson = require('json-format');

// Best!!!
// let formatJson = require('format-json').diffy;

let formatJson = require('format-json').diffy;
let colorize = require('json-colorizer');
 
let user = {
  id: 1,
  name: 'fengliner',
  color: {
    id: 1,
    name: 'fengliner'
  },
  font: [{id: 1, name: 'fengliner'}]
};
 
console.log(formatJson(user));

let contextMenu = {
7495:{id: '7495', text: 'Bed & Bath', url: '/shop/wedding-registry/bed-bath?id=7495&cm_sp=…_gift_categories-_-bedbath_COL0-_-7495_bedbath', value: '7495', categoryPageType: 'Category Splash'},
7497:{id: '7497', text: 'Kitchen', url: '/shop/wedding-registry/kitchen?id=7497&cm_sp=m…_gift_categories-_-kitchen_COL0-_-7497_kitchen', value: '7497', categoryPageType: 'Category Splash'},
7498:{id: '7498', text: 'Dining', url: '/shop/wedding-registry/dining-entertaining?id=…ry_gift_categories-_-dining_COL0-_-7498_dining', value: '7498', categoryPageType: 'Category Splash'},
49573:{id: '49573', text: 'Home Decor', url: '/shop/wedding-registry/home-decor?id=49573&cm_…_categories-_-homedecor_COL0-_-49573_homedecor', value: '49573', categoryPageType: 'Category Splash'},
63538:{id: '63538', text: 'Brands', url: '/shop/wedding-registry/all-brands?id=63538&cm_…y_gift_categories-_-brands_COL0-_-63538_brands', value: '63538', categoryPageType: 'Brand Index'},
64967:{id: '64967', text: 'Registry', url: '/ce/registry/wedding/registryhome?cm_sp=mew_na…ft_categories-_-registry_COL0-_-64967_registry', value: '64967', categoryPageType: 'Browse'},
70529:{id: '70529', text: 'Starter Ideas', url: '/s/registry-guide/?cm_sp=mew_navigation_regist…ories-_-starterideas_COL0-_-70529_starterideas', value: '70529', categoryPageType: 'Category Splash'},
152943:{id: '152943', text: 'Electronics', url: '/shop/wedding-registry/for-the-home/electronic…gories-_-electronics_COL0-_-152943_electronics', value: '152943', categoryPageType: 'Browse'},
180345:{id: '180345', text: 'Air Fryers', url: '/shop/wedding-registry/kitchen/air-fryers-deep…y_gift_categories-_-kitchen-_-180345_airfryers', value: '180345', parent: {}}
}

// console.log(formatJson(contextMenu));
// console.log(colorize(contextMenu));
console.log(colorize(formatJson(contextMenu)));
