//@@viewOn:imports
import { PropTypes, createComponent, useMemo, useState, useDataObject, useSession } from "uu5g05";
import Config from "./config/config.js";
import Context from "../../contexts/shopping-list-context.js";
import Calls from "calls";
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

    const { identity } = useSession();

    const { state, data, errorData, handlerMap } = useDataObject({
      handlerMap: {
        load: () => {
          return Calls.ShoppingList.get({ id: shoppingListId });
        },

        rename: async (name) => {
          const result = await Calls.ShoppingList.update({ id: shoppingListId, name });
          delete result.archived;
          return (currentData) => ({ ...currentData, ...result });
        },

        addItem: async (item) => {
          const result = await Calls.ShoppingList.addItem({ id: shoppingListId, item });
          return (currentData) => {
            currentData.itemList.push(result.item);

            delete result.item;
            return { ...currentData, ...result };
          };
        },

        setItemCompleted: async (itemId, completed) => {
          const result = await Calls.ShoppingList.setItemCompleted({ id: shoppingListId, itemId, completed });
          return (currentData) => {
            let item = currentData.itemList.find((item) => item.id === result.itemId);
            item.completed = result.completed;

            delete result.itemId;
            delete result.completed;
            return { ...currentData, ...result };
          };
        },

        removeItem: async (itemId) => {
          const result = await Calls.ShoppingList.removeItem({ id: shoppingListId, itemId });
          return (currentData) => {
            let index = currentData.itemList.findIndex((item) => item.id === itemId);
            if (index !== -1) {
              currentData.itemList.splice(index, 1);
            }
            return { ...currentData, ...result };
          };
        },

        addMember: async (memberUuIdentity) => {
          const result = await Calls.ShoppingList.addMember({ id: shoppingListId, memberUuIdentity });
          return (currentData) => ({ ...currentData, ...result });
        },

        removeMember: async (memberUuIdentity) => {
          const result = await Calls.ShoppingList.removeMember({ id: shoppingListId, memberUuIdentity });
          return (currentData) => ({ ...currentData, ...result });
        },
      },
    });

    const [includeCompleted, setIncludeCompleted] = useState(data?.archived || false);

    // filter items based on includeCompleted
    let filteredShoppingList = useMemo(() => {
      if (!includeCompleted && data) {
        let currentShoppingList = { ...data };
        currentShoppingList.itemList = currentShoppingList.itemList.filter((item) => {
          return !item.completed;
        });
        return currentShoppingList;
      } else {
        return data;
      }
    }, [data, includeCompleted]);

    let error = useMemo(() => {
      let uuAppErrorMap = errorData?.data?.uuAppErrorMap;
      if (uuAppErrorMap) {
        for (const [key, value] of Object.entries(uuAppErrorMap)) {
          if (value.type === "error") {
            value.code = key;
            return value;
          }
        }
      }
      return null;
    }, [errorData]);
    //@@viewOff:private

    //@@viewOn:interface
    const contextValue = {
      state,
      error,
      filteredShoppingList,
      includeCompleted,

      setIncludeCompleted: (completed) => {
        setIncludeCompleted(completed);
      },

      rename: (name) => {
        return handlerMap.rename(name);
      },

      addItem: (item) => {
        return handlerMap.addItem(item);
      },

      setCompleted: (itemId, completed) => {
        return handlerMap.setItemCompleted(itemId, completed);
      },

      deleteItem: (itemId) => {
        return handlerMap.removeItem(itemId);
      },

      addMember: (uuIdentity) => {
        return handlerMap.addMember(uuIdentity);
      },

      removeMember: async (uuIdentity) => {
        await handlerMap.removeMember(uuIdentity);
        if (uuIdentity === identity.uuIdentity) {
          await handlerMap.load();
        }
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
