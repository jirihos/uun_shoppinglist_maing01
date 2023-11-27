"use strict";
const ShoppingListAbl = require("../../abl/shopping-list-abl.js");

class ShoppingListController {
  list(ucEnv) {
    const awid = ucEnv.getUri().getAwid();
    const dtoIn = ucEnv.getDtoIn();
    const session = ucEnv.getSession();
    const authorizationResult = ucEnv.getAuthorizationResult();
    return ShoppingListAbl.list(awid, dtoIn, session, authorizationResult);
  }

  get(ucEnv) {
    const awid = ucEnv.getUri().getAwid();
    const dtoIn = ucEnv.getDtoIn();
    const session = ucEnv.getSession();
    const authorizationResult = ucEnv.getAuthorizationResult();
    return ShoppingListAbl.get(awid, dtoIn, session, authorizationResult);
  }

  create(ucEnv) {
    const awid = ucEnv.getUri().getAwid();
    const dtoIn = ucEnv.getDtoIn();
    const session = ucEnv.getSession();
    const authorizationResult = ucEnv.getAuthorizationResult();
    return ShoppingListAbl.create(awid, dtoIn, session, authorizationResult);
  }

  update(ucEnv) {
    const awid = ucEnv.getUri().getAwid();
    const dtoIn = ucEnv.getDtoIn();
    const session = ucEnv.getSession();
    const authorizationResult = ucEnv.getAuthorizationResult();
    return ShoppingListAbl.update(awid, dtoIn, session, authorizationResult);
  }

  addMember(ucEnv) {
    const awid = ucEnv.getUri().getAwid();
    const dtoIn = ucEnv.getDtoIn();
    const session = ucEnv.getSession();
    const authorizationResult = ucEnv.getAuthorizationResult();
    return ShoppingListAbl.addMember(awid, dtoIn, session, authorizationResult);
  }

  removeMember(ucEnv) {
    const awid = ucEnv.getUri().getAwid();
    const dtoIn = ucEnv.getDtoIn();
    return ShoppingListAbl.removeMember(awid, dtoIn);
  }

  addItem(ucEnv) {
    const awid = ucEnv.getUri().getAwid();
    const dtoIn = ucEnv.getDtoIn();
    return ShoppingListAbl.addItem(awid, dtoIn);
  }

  removeItem(ucEnv) {
    const awid = ucEnv.getUri().getAwid();
    const dtoIn = ucEnv.getDtoIn();
    return ShoppingListAbl.removeItem(awid, dtoIn);
  }

  setItemCompleted(ucEnv) {
    const awid = ucEnv.getUri().getAwid();
    const dtoIn = ucEnv.getDtoIn();
    return ShoppingListAbl.setItemCompleted(awid, dtoIn);
  }

  delete(ucEnv) {
    const awid = ucEnv.getUri().getAwid();
    const dtoIn = ucEnv.getDtoIn();
    const session = ucEnv.getSession();
    const authorizationResult = ucEnv.getAuthorizationResult();
    return ShoppingListAbl.delete(awid, dtoIn, session, authorizationResult);
  }
}

module.exports = new ShoppingListController();
