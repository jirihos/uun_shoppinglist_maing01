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

  UserNotAuthorized: class extends ShoppinglistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}userNotAuthorized`;
      this.message = "The user is not authorized to list all shopping lists.";
      this.status = 403;
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

  ShoppingListDoesNotExist: class extends ShoppinglistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}shoppingListDoesNotExist`;
      this.message = "Shopping list does not exist.";
    }
  },

  UserNotAuthorized: class extends ShoppinglistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}userNotAuthorized`;
      this.message = "User is not allowed to view this shopping list.";
      this.status = 403;
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

  InvalidShoppingListName: class extends ShoppinglistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidShoppingListName`;
      this.message = "The shopping list name is not valid.";
    }
  },

  ShoppingListDoesNotExist: class extends ShoppinglistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}shoppingListDoesNotExist`;
      this.message = "Shopping list does not exist.";
    }
  },

  UserNotAuthorized: class extends ShoppinglistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}userNotAuthorized`;
      this.message = "User is not allowed to update this shopping list.";
      this.status = 403;
    }
  },

  ShoppingListDaoUpdateFailed: class extends ShoppinglistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}shoppingListDaoUpdateFailed`;
      this.message = "Update shopping list by shopping list DAO failed.";
      this.status = 500;
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

  ShoppingListDoesNotExist: class extends ShoppinglistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${AddMember.UC_CODE}shoppingListDoesNotExist`;
      this.message = "Shopping list does not exist.";
    }
  },

  UserNotAuthorized: class extends ShoppinglistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${AddMember.UC_CODE}userNotAuthorized`;
      this.message = "User is not allowed to add a member to this shopping list.";
      this.status = 403;
    }
  },

  CannotAddOwnerAsMember: class extends ShoppinglistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${AddMember.UC_CODE}cannotAddOwnerAsMember`;
      this.message = "Cannot add owner as a member.";
    }
  },

  MemberIsAlreadyAdded: class extends ShoppinglistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${AddMember.UC_CODE}memberIsAlreadyAdded`;
      this.message = "Member is already on the list of members.";
    }
  },

  ShoppingListDaoUpdateFailed: class extends ShoppinglistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${AddMember.UC_CODE}shoppingListDaoUpdateFailed`;
      this.message = "Update shopping list by shopping list DAO failed.";
      this.status = 500;
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

  ShoppingListDoesNotExist: class extends ShoppinglistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${RemoveMember.UC_CODE}shoppingListDoesNotExist`;
      this.message = "Shopping list does not exist.";
    }
  },

  UserNotAuthorized: class extends ShoppinglistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${RemoveMember.UC_CODE}userNotAuthorized`;
      this.message = "User is not allowed to remove a member from this shopping list.";
      this.status = 403;
    }
  },

  MemberIsNotOnList: class extends ShoppinglistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${RemoveMember.UC_CODE}memberIsNotOnList`;
      this.message = "Member is not on the list of members.";
    }
  },

  ShoppingListDaoUpdateFailed: class extends ShoppinglistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${RemoveMember.UC_CODE}shoppingListDaoUpdateFailed`;
      this.message = "Update shopping list by shopping list DAO failed.";
      this.status = 500;
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

  UnitMissing: class extends ShoppinglistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${AddItem.UC_CODE}unitMissing`;
      this.message = "Unit is required when you use amount.";
    }
  },

  CurrencyMissing: class extends ShoppinglistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${AddItem.UC_CODE}currencyMissing`;
      this.message = "Currency is required when you use totalPrice.";
    }
  },

  ShoppingListDoesNotExist: class extends ShoppinglistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${AddItem.UC_CODE}shoppingListDoesNotExist`;
      this.message = "Shopping list does not exist.";
    }
  },

  UserNotAuthorized: class extends ShoppinglistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${AddItem.UC_CODE}userNotAuthorized`;
      this.message = "User is not allowed to add an item to this shopping list.";
      this.status = 403;
    }
  },

  MaximumNumberOfItems: class extends ShoppinglistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${AddItem.UC_CODE}maximumNumberOfItems`;
      this.message = "The shopping list has reached the maximum number of items.";
    }
  },

  ShoppingListDaoUpdateFailed: class extends ShoppinglistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${AddItem.UC_CODE}shoppingListDaoUpdateFailed`;
      this.message = "Update shopping list by shopping list DAO failed.";
      this.status = 500;
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

  ShoppingListDoesNotExist: class extends ShoppinglistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${RemoveItem.UC_CODE}shoppingListDoesNotExist`;
      this.message = "Shopping list does not exist.";
    }
  },

  UserNotAuthorized: class extends ShoppinglistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${RemoveItem.UC_CODE}userNotAuthorized`;
      this.message = "User is not allowed to remove an item from this shopping list.";
      this.status = 403;
    }
  },

  ItemDoesNotExist: class extends ShoppinglistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${RemoveItem.UC_CODE}itemDoesNotExist`;
      this.message = "An item is not part of this shopping list";
    }
  },

  ShoppingListDaoUpdateFailed: class extends ShoppinglistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${RemoveItem.UC_CODE}shoppingListDaoUpdateFailed`;
      this.message = "Update shopping list by shopping list DAO failed.";
      this.status = 500;
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

  ShoppingListDoesNotExist: class extends ShoppinglistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${SetItemCompleted.UC_CODE}shoppingListDoesNotExist`;
      this.message = "Shopping list does not exist.";
    }
  },

  UserNotAuthorized: class extends ShoppinglistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${SetItemCompleted.UC_CODE}userNotAuthorized`;
      this.message = "User is not allowed to change completed state of an item in this shopping list.";
      this.status = 403;
    }
  },

  ItemDoesNotExist: class extends ShoppinglistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${SetItemCompleted.UC_CODE}itemDoesNotExist`;
      this.message = "An item is not part of this shopping list";
    }
  },

  ShoppingListDaoUpdateFailed: class extends ShoppinglistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${SetItemCompleted.UC_CODE}shoppingListDaoUpdateFailed`;
      this.message = "Update shopping list by shopping list DAO failed.";
      this.status = 500;
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

  ShoppingListDoesNotExist: class extends ShoppinglistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}shoppingListDoesNotExist`;
      this.message = "Shopping list does not exist.";
    }
  },

  UserNotAuthorized: class extends ShoppinglistMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}userNotAuthorized`;
      this.message = "User is not allowed to delete this shopping list.";
      this.status = 403;
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
