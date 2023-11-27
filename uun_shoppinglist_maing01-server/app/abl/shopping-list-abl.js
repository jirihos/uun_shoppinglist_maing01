"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/shopping-list-error.js");
const Warnings = require("../api/warnings/shopping-list-warning.js");

const EXECUTIVES_PROFILE = "Executives";

class ShoppingListAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("shoppingList");
  }

  async list(awid, dtoIn) {
    let uuAppErrorMap = {};

    // validation of dtoIn
    const validationResult = this.validator.validate("shoppingListListDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.List.UnsupportedKeys.code,
      Errors.List.InvalidDtoIn
    );

    // default values
    dtoIn.all ??= false;
    dtoIn.pageInfo ??= {};
    dtoIn.pageInfo.pageIndex ??= 0;
    dtoIn.pageInfo.pageSize ??= 20;

    // prepare and return dtoOut
    let dtoOut = { ...dtoIn };
    dtoOut.uuAppErrorMap = uuAppErrorMap;

    return dtoOut;
  }

  async get(awid, dtoIn) {
    let uuAppErrorMap = {};

    // validation of dtoIn
    const validationResult = this.validator.validate("shoppingListGetDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.Get.UnsupportedKeys.code,
      Errors.Get.InvalidDtoIn
    );

    // prepare and return dtoOut
    let dtoOut = { ...dtoIn };
    dtoOut.uuAppErrorMap = uuAppErrorMap;

    return dtoOut;
  }

  async create(awid, dtoIn, session, authorizationResult) {
    let uuAppErrorMap = {};
    let uuIdentity = session.getIdentity().getUuIdentity();

    // validation of dtoIn
    const validationResult = this.validator.validate("shoppingListCreateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.Create.UnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );

    // default values
    dtoIn.ownerUuIdentity ??= uuIdentity;

    // custom validation for dtoIn.name
    let name = dtoIn.name.trim();
    if (name.length < 3) {
      throw new Errors.Create.InvalidShoppingListName({ uuAppErrorMap }, { name: dtoIn.name });
    }

    // check permissions
    let isExecutive = authorizationResult.getAuthorizedProfiles().includes(EXECUTIVES_PROFILE);
    if (!isExecutive) {
      if (dtoIn.ownerUuIdentity !== uuIdentity) {
        throw new Errors.Create.UserNotAuthorized({ uuAppErrorMap }, { uuIdentity });
      }
    }

    // DAO create
    let shoppingList;
    try {
      shoppingList = await this.dao.create({
        awid,
        name,
        archived: false,
        ownerUuIdentity: dtoIn.ownerUuIdentity,
        memberUuIdentityList: [],
        itemList: [],
      });
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.Create.ShoppingListDaoCreateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    // prepare and return dtoOut
    let dtoOut = { ...shoppingList, uuAppErrorMap };

    return dtoOut;
  }

  async update(awid, dtoIn) {
    let uuAppErrorMap = {};

    // validation of dtoIn
    const validationResult = this.validator.validate("shoppingListUpdateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.Update.UnsupportedKeys.code,
      Errors.Update.InvalidDtoIn
    );

    // prepare and return dtoOut
    let dtoOut = { ...dtoIn };
    dtoOut.uuAppErrorMap = uuAppErrorMap;

    return dtoOut;
  }

  async addMember(awid, dtoIn) {
    let uuAppErrorMap = {};

    // validation of dtoIn
    const validationResult = this.validator.validate("shoppingListAddMemberDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.AddMember.UnsupportedKeys.code,
      Errors.AddMember.InvalidDtoIn
    );

    // prepare and return dtoOut
    let dtoOut = { ...dtoIn };
    dtoOut.uuAppErrorMap = uuAppErrorMap;

    return dtoOut;
  }

  async removeMember(awid, dtoIn) {
    let uuAppErrorMap = {};

    // validation of dtoIn
    const validationResult = this.validator.validate("shoppingListRemoveMemberDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.RemoveMember.UnsupportedKeys.code,
      Errors.RemoveMember.InvalidDtoIn
    );

    // prepare and return dtoOut
    let dtoOut = { ...dtoIn };
    dtoOut.uuAppErrorMap = uuAppErrorMap;

    return dtoOut;
  }

  async addItem(awid, dtoIn) {
    let uuAppErrorMap = {};

    // validation of dtoIn
    const validationResult = this.validator.validate("shoppingListAddItemDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.AddItem.UnsupportedKeys.code,
      Errors.AddItem.InvalidDtoIn
    );

    // default values
    dtoIn.item.completed ??= false;

    // prepare and return dtoOut
    let dtoOut = { ...dtoIn };
    dtoOut.uuAppErrorMap = uuAppErrorMap;

    return dtoOut;
  }

  async removeItem(awid, dtoIn) {
    let uuAppErrorMap = {};

    // validation of dtoIn
    const validationResult = this.validator.validate("shoppingListRemoveItemDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.RemoveItem.UnsupportedKeys.code,
      Errors.RemoveItem.InvalidDtoIn
    );

    // prepare and return dtoOut
    let dtoOut = { ...dtoIn };
    dtoOut.uuAppErrorMap = uuAppErrorMap;

    return dtoOut;
  }

  async setItemCompleted(awid, dtoIn) {
    let uuAppErrorMap = {};

    // validation of dtoIn
    const validationResult = this.validator.validate("shoppingListSetItemCompletedDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.SetItemCompleted.UnsupportedKeys.code,
      Errors.SetItemCompleted.InvalidDtoIn
    );

    // prepare and return dtoOut
    let dtoOut = { ...dtoIn };
    dtoOut.uuAppErrorMap = uuAppErrorMap;

    return dtoOut;
  }

  async delete(awid, dtoIn) {
    let uuAppErrorMap = {};

    // validation of dtoIn
    const validationResult = this.validator.validate("shoppingListDeleteDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.Delete.UnsupportedKeys.code,
      Errors.Delete.InvalidDtoIn
    );

    // prepare and return dtoOut
    let dtoOut = { ...dtoIn };
    dtoOut.uuAppErrorMap = uuAppErrorMap;

    return dtoOut;
  }
}

module.exports = new ShoppingListAbl();