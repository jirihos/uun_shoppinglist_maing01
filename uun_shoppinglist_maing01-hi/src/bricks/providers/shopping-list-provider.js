//@@viewOn:imports
import { PropTypes, createComponent, useMemo, useState } from "uu5g05";
import Config from "./config/config.js";
import Context from "../../contexts/shopping-list-context.js";
//@@viewOff:imports

//@@viewOn:constants
const initialShoppingList = {
  id: "c3a2faebc331484ba8477923",
  name: "Ukázkový nákupní seznam",
  archived: false,
  ownerUuIdentity: "3987-144-5699-0000",
  memberUuIdentityList: ["1-1", "2-2", "3-3"],
  itemList: [
    {
      id: "204fb43da61c4df7b1ec90b6",
      text: "Jogurt",
      amount: 1,
      unit: "ks",
      totalPrice: 30,
      currency: "Kč",
      completed: false,
    },
    {
      id: "204fb43da61c4df7b1ec90b5",
      text: "Druhá položka",
      amount: 10,
      unit: "ks",
      totalPrice: 100,
      currency: "Kč",
      completed: true,
    },
    {
      id: "204fb43da61c4df7b1ec90b4",
      text: "Třetí položka",
      completed: false,
    },
  ],
};
//@@viewOff:constants

//@@viewOn:helpers
//@@viewOff:helpers

const ShoppingListProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ShoppingListProvider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    shoppingListId: PropTypes.string.isRequired,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { shoppingListId, children } = props;

    const [includeCompleted, setIncludeCompleted] = useState(false);
    const [shoppingList, setShoppingList] = useState(initialShoppingList);

    // filter items based on includeCompleted
    let filteredShoppingList = useMemo(() => {
      if (!includeCompleted && shoppingList) {
        let currentShoppingList = { ...shoppingList };
        currentShoppingList.itemList = currentShoppingList.itemList.filter((item) => {
          return !item.completed;
        });
        return currentShoppingList;
      } else {
        return shoppingList;
      }
    }, [shoppingList, includeCompleted]);
    //@@viewOff:private

    //@@viewOn:interface
    const contextValue = {
      state: "ready",
      errorData: undefined,
      filteredShoppingList,
      includeCompleted,

      setIncludeCompleted: (completed) => {
        setIncludeCompleted(completed);
      },

      rename: (name) => {
        setShoppingList(({ ...currentShoppingList }) => {
          currentShoppingList.name = name;
          return currentShoppingList;
        });
      },

      addItem: (item) => {
        setShoppingList(({ ...currentShoppingList }) => {
          currentShoppingList.itemList.push(item);
          return currentShoppingList;
        });
      },

      setCompleted: (itemId, completed) => {
        setShoppingList(({ ...currentShoppingList }) => {
          let index = currentShoppingList.itemList.findIndex((item) => item.id === itemId);
          currentShoppingList.itemList[index].completed = completed;
          return currentShoppingList;
        });
      },

      deleteItem: (itemId) => {
        setShoppingList(({ ...currentShoppingList }) => {
          let index = currentShoppingList.itemList.findIndex((item) => item.id === itemId);
          if (index !== -1) {
            currentShoppingList.itemList.splice(index, 1);
          }
          return currentShoppingList;
        });
      },

      addMember: (uuIdentity) => {
        setShoppingList(({ ...currentShoppingList }) => {
          currentShoppingList.memberUuIdentityList.push(uuIdentity);
          return currentShoppingList;
        });
      },

      removeMember: (uuIdentity) => {
        setShoppingList(({ ...currentShoppingList }) => {
          let index = currentShoppingList.memberUuIdentityList.findIndex(
            (memberUuIdentity) => memberUuIdentity === uuIdentity
          );
          if (index !== -1) {
            currentShoppingList.memberUuIdentityList.splice(index, 1);
          }
          return currentShoppingList;
        });
      },
    };
    //@@viewOff:interface

    //@@viewOn:render
    return <Context.Provider value={contextValue}>{children}</Context.Provider>;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ShoppingListProvider };
export default ShoppingListProvider;
//@@viewOff:exports
