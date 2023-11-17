/* eslint-disable */

const shoppingListListDtoInType = shape({
  archived: boolean(),
  all: boolean(),
  pageInfo: shape({
    pageIndex: integer(0, 1000000000),
    pageSize: integer(1, 1000000000),
  }),
});

const shoppingListGetDtoInType = shape({
  id: id().isRequired(),
});

const shoppingListCreateDtoInType = shape({
  name: string(3, 100).isRequired(),
  ownerUuIdentity: uuIdentity(),
});

const shoppingListUpdateDtoInType = shape({
  id: id().isRequired(),
  name: string(3, 100),
  archived: boolean(),
});

const shoppingListAddMemberDtoInType = shape({
  id: id().isRequired(),
  memberUuIdentity: uuIdentity().isRequired(),
});

const shoppingListRemoveMemberDtoInType = shape({
  id: id().isRequired(),
  memberUuIdentity: uuIdentity().isRequired(),
});

const shoppingListAddItemDtoInType = shape({
  id: id().isRequired(),
  item: shape({
    text: string(1, 100).isRequired(),
    amount: number(0, 1000000000),
    unit: string(1, 20),
    totalPrice: number(0, 1000000000),
    currency: oneOf(["Kč", "€", "$"]),
    completed: boolean(),
  }).isRequired(),
});

const shoppingListRemoveItemDtoInType = shape({
  id: id().isRequired(),
  itemId: id().isRequired(),
});

const shoppingListSetItemCompletedDtoInType = shape({
  id: id().isRequired(),
  itemId: id().isRequired(),
  completed: boolean().isRequired(),
});

const shoppingListDeleteDtoInType = shape({
  id: id().isRequired(),
});
