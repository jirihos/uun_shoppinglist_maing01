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

  async list(awid, dtoIn, session, authorizationResult) {
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

    // check permissions
    let isExecutive = authorizationResult.getAuthorizedProfiles().includes(EXECUTIVES_PROFILE);
    if (dtoIn.all && !isExecutive) {
      throw new Errors.List.UserNotAuthorized({ uuAppErrorMap });
    }

    // DAO list
    let criteria = {};
    if (dtoIn.archived !== undefined) {
      criteria.archived = dtoIn.archived;
    }
    if (!dtoIn.all) {
      let uuIdentity = session.getIdentity().getUuIdentity();
      criteria.$or = [{ ownerUuIdentity: uuIdentity }, { memberUuIdentityList: uuIdentity }];
    }

    let list = await this.dao.list(awid, criteria, dtoIn.pageInfo);

    // prepare and return dtoOut
    let dtoOut = { ...list, uuAppErrorMap };
    dtoOut.itemList.forEach((shoppingList) => {
      shoppingList.itemListCount = shoppingList.itemList.length;
      delete shoppingList.itemList;
    });

    return dtoOut;
  }

  async get(awid, dtoIn, session, authorizationResult) {
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

    // load shopping list
    let shoppingList = await this.dao.get(awid, dtoIn.id);
    if (!shoppingList) {
      throw new Errors.Get.ShoppingListDoesNotExist({ uuAppErrorMap }, { shoppingListId: dtoIn.id });
    }

    // check permissions
    let uuIdentity = session.getIdentity().getUuIdentity();
    let isExecutive = authorizationResult.getAuthorizedProfiles().includes(EXECUTIVES_PROFILE);
    if (!isExecutive) {
      let isOwner = shoppingList.ownerUuIdentity === uuIdentity;
      let isMember = shoppingList.memberUuIdentityList.includes(uuIdentity);
      if (!isOwner && !isMember) {
        throw new Errors.Create.UserNotAuthorized({ uuAppErrorMap }, { shoppingListId: dtoIn.id });
      }
    }

    // prepare and return dtoOut
    let dtoOut = { ...shoppingList, uuAppErrorMap };

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
        throw new Errors.Create.UserNotAuthorized({ uuAppErrorMap });
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

  async update(awid, dtoIn, session, authorizationResult) {
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

    // custom validation for dtoIn.name
    let name;
    if (dtoIn.name !== undefined) {
      name = dtoIn.name.trim();
      if (name.length < 3) {
        throw new Errors.Update.InvalidShoppingListName({ uuAppErrorMap }, { name: dtoIn.name });
      }
    }

    // load shopping list
    let shoppingList = await this.dao.get(awid, dtoIn.id);
    if (!shoppingList) {
      throw new Errors.Update.ShoppingListDoesNotExist({ uuAppErrorMap }, { shoppingListId: dtoIn.id });
    }

    // check permissions
    let uuIdentity = session.getIdentity().getUuIdentity();
    let isExecutive = authorizationResult.getAuthorizedProfiles().includes(EXECUTIVES_PROFILE);
    if (!isExecutive) {
      let isOwner = shoppingList.ownerUuIdentity === uuIdentity;
      if (!isOwner) {
        throw new Errors.Update.UserNotAuthorized({ uuAppErrorMap }, { shoppingListId: dtoIn.id });
      }
    }

    // DAO update
    try {
      let updateObject = {
        id: shoppingList.id,
        awid: shoppingList.awid,
      };
      if (name !== undefined) {
        updateObject.name = name;
      }
      if (dtoIn.archived !== undefined) {
        updateObject.archived = dtoIn.archived;
      }

      shoppingList = await this.dao.update(updateObject);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.Update.ShoppingListDaoUpdateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    // prepare and return dtoOut
    let dtoOut = {
      id: shoppingList.id,
      awid: shoppingList.awid,
      sys: shoppingList.sys,
      name: shoppingList.name,
      archived: shoppingList.archived,
      uuAppErrorMap,
    };

    return dtoOut;
  }

  async addMember(awid, dtoIn, session, authorizationResult) {
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

    // load shopping list
    let shoppingList = await this.dao.get(awid, dtoIn.id);
    if (!shoppingList) {
      throw new Errors.AddMember.ShoppingListDoesNotExist({ uuAppErrorMap }, { shoppingListId: dtoIn.id });
    }

    // check permissions
    let uuIdentity = session.getIdentity().getUuIdentity();
    let isExecutive = authorizationResult.getAuthorizedProfiles().includes(EXECUTIVES_PROFILE);
    if (!isExecutive) {
      let isOwner = shoppingList.ownerUuIdentity === uuIdentity;
      if (!isOwner) {
        throw new Errors.AddMember.UserNotAuthorized({ uuAppErrorMap }, { shoppingListId: dtoIn.id });
      }
    }

    let { memberUuIdentity } = dtoIn;
    let { memberUuIdentityList } = shoppingList;

    // check whether the new member is owner
    if (memberUuIdentity === shoppingList.ownerUuIdentity) {
      throw new Errors.AddMember.CannotAddOwnerAsMember(
        { uuAppErrorMap },
        { shoppingListId: dtoIn.id, memberUuIdentity }
      );
    }

    // check whether the new member is already on the list
    if (memberUuIdentityList.includes(memberUuIdentity)) {
      throw new Errors.AddMember.MemberIsAlreadyAdded(
        { uuAppErrorMap },
        { shoppingListId: dtoIn.id, memberUuIdentity }
      );
    }

    // DAO update
    try {
      memberUuIdentityList.push(dtoIn.memberUuIdentity);

      let updateObject = {
        id: shoppingList.id,
        awid: shoppingList.awid,
        memberUuIdentityList,
      };

      shoppingList = await this.dao.update(updateObject);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.AddMember.ShoppingListDaoUpdateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    // prepare and return dtoOut
    let dtoOut = {
      id: shoppingList.id,
      awid: shoppingList.awid,
      sys: shoppingList.sys,
      memberUuIdentityList: shoppingList.memberUuIdentityList,
      uuAppErrorMap,
    };

    return dtoOut;
  }

  async removeMember(awid, dtoIn, session, authorizationResult) {
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

    // load shopping list
    let shoppingList = await this.dao.get(awid, dtoIn.id);
    if (!shoppingList) {
      throw new Errors.RemoveMember.ShoppingListDoesNotExist({ uuAppErrorMap }, { shoppingListId: dtoIn.id });
    }

    // check permissions
    let uuIdentity = session.getIdentity().getUuIdentity();
    let isExecutive = authorizationResult.getAuthorizedProfiles().includes(EXECUTIVES_PROFILE);
    if (!isExecutive) {
      let isOwner = shoppingList.ownerUuIdentity === uuIdentity;
      if (!isOwner) {
        throw new Errors.RemoveMember.UserNotAuthorized({ uuAppErrorMap }, { shoppingListId: dtoIn.id });
      }
    }

    let { memberUuIdentity } = dtoIn;
    let { memberUuIdentityList } = shoppingList;
    let memberIndex = memberUuIdentityList.indexOf(memberUuIdentity);

    // check whether the member is on the list
    if (memberIndex === -1) {
      throw new Errors.RemoveMember.MemberIsNotOnList(
        { uuAppErrorMap },
        { shoppingListId: dtoIn.id, memberUuIdentity }
      );
    }

    // DAO update
    try {
      memberUuIdentityList.splice(memberIndex, 1);

      let updateObject = {
        id: shoppingList.id,
        awid: shoppingList.awid,
        memberUuIdentityList,
      };

      shoppingList = await this.dao.update(updateObject);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.RemoveMember.ShoppingListDaoUpdateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    // prepare and return dtoOut
    let dtoOut = {
      id: shoppingList.id,
      awid: shoppingList.awid,
      sys: shoppingList.sys,
      memberUuIdentityList: shoppingList.memberUuIdentityList,
      uuAppErrorMap,
    };

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

  async delete(awid, dtoIn, session, authorizationResult) {
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

    // load shopping list
    let shoppingList = await this.dao.get(awid, dtoIn.id);
    if (!shoppingList) {
      throw new Errors.Delete.ShoppingListDoesNotExist({ uuAppErrorMap }, { shoppingListId: dtoIn.id });
    }

    // check permissions
    let uuIdentity = session.getIdentity().getUuIdentity();
    let isExecutive = authorizationResult.getAuthorizedProfiles().includes(EXECUTIVES_PROFILE);
    if (!isExecutive) {
      let isOwner = shoppingList.ownerUuIdentity === uuIdentity;
      if (!isOwner) {
        throw new Errors.Delete.UserNotAuthorized({ uuAppErrorMap }, { shoppingListId: dtoIn.id });
      }
    }

    // delete shopping list
    await this.dao.delete(awid, dtoIn.id);

    // prepare and return dtoOut
    let dtoOut = { uuAppErrorMap };

    return dtoOut;
  }
}

module.exports = new ShoppingListAbl();
