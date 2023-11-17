const Errors = require("../errors/shopping-list-error.js");

const Warnings = {
  List: {
    UnsupportedKeys: {
      code: `${Errors.List.UC_CODE}unsupportedKeys`,
    },
  },
  Get: {
    UnsupportedKeys: {
      code: `${Errors.Get.UC_CODE}unsupportedKeys`,
    },
  },
  Create: {
    UnsupportedKeys: {
      code: `${Errors.Create.UC_CODE}unsupportedKeys`,
    },
  },
  Update: {
    UnsupportedKeys: {
      code: `${Errors.Update.UC_CODE}unsupportedKeys`,
    },
  },
  AddMember: {
    UnsupportedKeys: {
      code: `${Errors.AddMember.UC_CODE}unsupportedKeys`,
    },
  },
  RemoveMember: {
    UnsupportedKeys: {
      code: `${Errors.RemoveMember.UC_CODE}unsupportedKeys`,
    },
  },
  AddItem: {
    UnsupportedKeys: {
      code: `${Errors.AddItem.UC_CODE}unsupportedKeys`,
    },
  },
  RemoveItem: {
    UnsupportedKeys: {
      code: `${Errors.RemoveItem.UC_CODE}unsupportedKeys`,
    },
  },
  SetItemCompleted: {
    UnsupportedKeys: {
      code: `${Errors.SetItemCompleted.UC_CODE}unsupportedKeys`,
    },
  },
  Delete: {
    UnsupportedKeys: {
      code: `${Errors.Delete.UC_CODE}unsupportedKeys`,
    },
  },
};

module.exports = Warnings;
