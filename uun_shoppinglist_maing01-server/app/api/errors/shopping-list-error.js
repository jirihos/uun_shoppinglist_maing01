"use strict";

const ShoppinglistMainUseCaseError = require("./shoppinglist-main-use-case-error.js");
const SHOPPING_LIST_ERROR_PREFIX = `${ShoppinglistMainUseCaseError.ERROR_PREFIX}shoppingList/`;

const List = {
  UC_CODE: `${SHOPPING_LIST_ERROR_PREFIX}list/`,

  InvalidDtoIn: class extends ShoppinglistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
};

const Get = {
  UC_CODE: `${SHOPPING_LIST_ERROR_PREFIX}get/`,

  InvalidDtoIn: class extends ShoppinglistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
};

const Create = {
  UC_CODE: `${SHOPPING_LIST_ERROR_PREFIX}create/`,

  InvalidDtoIn: class extends ShoppinglistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  InvalidShoppingListName: class extends ShoppinglistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidShoppingListName`;
      this.message = "The shopping list name is not valid.";
    }
  },

  UserNotAuthorized: class extends ShoppinglistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}userNotAuthorized`;
      this.message = "User is not allowed to specify any other person as the shopping list's owner.";
      this.status = 403;
    }
  },

  ShoppingListDaoCreateFailed: class extends ShoppinglistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}shoppingListDaoCreateFailed`;
      this.message = "Create shopping list by shopping list DAO failed.";
      this.status = 500;
    }
  },
};

const Update = {
  UC_CODE: `${SHOPPING_LIST_ERROR_PREFIX}update/`,

  InvalidDtoIn: class extends ShoppinglistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
};

const AddMember = {
  UC_CODE: `${SHOPPING_LIST_ERROR_PREFIX}addMember/`,

  InvalidDtoIn: class extends ShoppinglistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${AddMember.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
};

const RemoveMember = {
  UC_CODE: `${SHOPPING_LIST_ERROR_PREFIX}removeMember/`,

  InvalidDtoIn: class extends ShoppinglistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${RemoveMember.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
};

const AddItem = {
  UC_CODE: `${SHOPPING_LIST_ERROR_PREFIX}addItem/`,

  InvalidDtoIn: class extends ShoppinglistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${AddItem.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
};

const RemoveItem = {
  UC_CODE: `${SHOPPING_LIST_ERROR_PREFIX}removeItem/`,

  InvalidDtoIn: class extends ShoppinglistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${RemoveItem.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
};

const SetItemCompleted = {
  UC_CODE: `${SHOPPING_LIST_ERROR_PREFIX}setItemCompleted/`,

  InvalidDtoIn: class extends ShoppinglistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${SetItemCompleted.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
};

const Delete = {
  UC_CODE: `${SHOPPING_LIST_ERROR_PREFIX}delete/`,

  InvalidDtoIn: class extends ShoppinglistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
};

module.exports = {
  List,
  Get,
  Create,
  Update,
  AddMember,
  RemoveMember,
  AddItem,
  RemoveItem,
  SetItemCompleted,
  Delete,
};
