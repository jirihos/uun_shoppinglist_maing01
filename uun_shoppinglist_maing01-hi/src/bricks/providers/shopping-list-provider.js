//@@viewOn:imports
import { PropTypes, createComponent, useMemo, useSession, useState } from "uu5g05";
import Config from "./config/config.js";
import Context from "../../contexts/shopping-list-context.js";
//@@viewOff:imports

//@@viewOn:constants
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

    // find a shopping list by id
    let initialShoppingList = document.initialShoppingLists.find((shoppingList) => shoppingList.id === shoppingListId);

    // simulate errors from calls
    const [state, setState] = useState("ready");
    const [errorData, setErrorData] = useState();
    const { identity } = useSession();
    if (!initialShoppingList && state === "ready") {
      setState("error");
      setErrorData({ code: "shoppingListNotFound" });
    }

    // make a deep copy of initialShoppingList otherwise itemList is remembered when switching routes
    initialShoppingList = JSON.parse(JSON.stringify(initialShoppingList));

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

    // simulate errors from calls
    if (
      shoppingList.ownerUuIdentity !== identity.uuIdentity &&
      !shoppingList.memberUuIdentityList.includes(identity.uuIdentity) &&
      state === "ready"
    ) {
      setState("error");
      setErrorData({ code: "shoppingListNoAccess" });
    }
    //@@viewOff:private

    //@@viewOn:interface
    const contextValue = {
      state,
      errorData,
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
        item.id = Math.floor(Math.random() * 100000000).toString();
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
        if (shoppingList.memberUuIdentityList.includes(uuIdentity) || shoppingList.ownerUuIdentity === uuIdentity) {
          return;
        }
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
