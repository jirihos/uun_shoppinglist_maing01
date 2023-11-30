//@@viewOn:imports
import { createComponent, useState, useMemo, useDataList } from "uu5g05";
import Config from "./config/config.js";
import Context from "../../contexts/shopping-lists-context.js";
import Calls from "calls";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:helpers
//@@viewOff:helpers

const ShoppingListsProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ShoppingListsProvider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { children } = props;

    const { state, data, errorData, handlerMap } = useDataList({
      pageSize: 1000,
      handlerMap: {
        load: (dtoIn) => {
          return Calls.ShoppingList.list(dtoIn);
        },

        create: async (dtoIn) => {
          const result = await Calls.ShoppingList.create(dtoIn);
          result.itemListCount = result.itemList.length;
          delete result.itemList;
          return result;
        },
      },
      itemHandlerMap: {
        archive: async (dtoIn) => {
          const result = await Calls.ShoppingList.update(dtoIn);
          delete result.name;
          return (currentData) => ({ ...currentData, ...result });
        },

        delete: async (dtoIn) => {
          return Calls.ShoppingList.delete(dtoIn);
        },
      },
    });
    const [includeArchived, setIncludeArchived] = useState(false);

    // sort shopping lists based on archived state
    let sortedShoppingLists = useMemo(() => {
      if (data) {
        return [...data].sort((a, b) => {
          if (a.data.archived === b.data.archived) {
            return 0;
          } else if (a.data.archived) {
            return 1;
          } else {
            return -1;
          }
        });
      } else {
        return data;
      }
    }, [data]);

    // filter shopping lists based on includeArchived state
    let filteredShoppingLists = useMemo(() => {
      if (!sortedShoppingLists) {
        return undefined;
      }

      let currentShoppingLists = sortedShoppingLists.filter((dataObject) => {
        if (!includeArchived && dataObject.data.archived) {
          return false;
        }

        return dataObject !== undefined;
      });

      return currentShoppingLists.map((dataObject) => dataObject.data);
    }, [sortedShoppingLists, includeArchived]);

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

    const contextValue = {
      state,
      error,
      filteredShoppingLists,
      includeArchived,

      setIncludeArchived: (archived) => {
        setIncludeArchived(archived);
      },

      createShoppingList: (name) => {
        return handlerMap.create({ name });
      },

      archiveShoppingList: (listId) => {
        let shoppingList = data.find((dataObject) => dataObject && dataObject.data.id === listId);
        return shoppingList.handlerMap.archive({ archived: true });
      },

      deleteShoppingList: (listId) => {
        let shoppingList = data.find((dataObject) => dataObject && dataObject.data.id === listId);
        return shoppingList.handlerMap.delete();
      },
    };
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return <Context.Provider value={contextValue}>{children}</Context.Provider>;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ShoppingListsProvider };
export default ShoppingListsProvider;
//@@viewOff:exports
