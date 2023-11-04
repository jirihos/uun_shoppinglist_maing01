"use strict";
const ShoppinglistMainAbl = require("../../abl/shoppinglist-main-abl.js");

class ShoppinglistMainController {
  init(ucEnv) {
    return ShoppinglistMainAbl.init(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }

  load(ucEnv) {
    return ShoppinglistMainAbl.load(ucEnv.getUri(), ucEnv.getSession());
  }

  loadBasicData(ucEnv) {
    return ShoppinglistMainAbl.loadBasicData(ucEnv.getUri(), ucEnv.getSession());
  }
}

module.exports = new ShoppinglistMainController();
