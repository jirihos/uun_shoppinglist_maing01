//@@viewOn:imports
import { createComponent, useState, useMemo, useSession, Utils } from "uu5g05";
import Config from "./config/config.js";
import Context from "../../contexts/shopping-lists-context.js";
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

    const [state] = useState("ready");
    const [errorData] = useState();
    const { identity } = useSession();

    const [shoppingLists, setShoppingLists] = useState(() => {
      // filter shopping lists where the user is owner or member
      return document.initialShoppingLists.filter((shoppingList) => {
        return (
          shoppingList.ownerUuIdentity === identity.uuIdentity ||
          shoppingList.memberUuIdentityList.includes(identity.uuIdentity)
        );
      });
    });
    const [includeArchived, setIncludeArchived] = useState(false);

    // filter shopping lists based on includeArchived state
    let filteredShoppingLists = useMemo(() => {
      if (!includeArchived && shoppingLists) {
        return shoppingLists.filter((shoppingList) => !shoppingList.archived);
      } else {
        return shoppingLists;
      }
    }, [shoppingLists, includeArchived]);

    const contextValue = {
      state,
      errorData,
      filteredShoppingLists,
      includeArchived,

      setIncludeArchived: (archived) => {
        setIncludeArchived(archived);
      },

      createShoppingList: (name) => {
        setShoppingLists(([...currentShoppingLists]) => {
          currentShoppingLists.push({
            id: Utils.String.generateId(),
            name,
            archived: false,
            ownerUuIdentity: identity.uuIdentity,
            memberUuIdentityList: [],
            itemList: [],
          });
          return currentShoppingLists;
        });
      },

      archiveShoppingList: (listId) => {
        setShoppingLists(([...currentShoppingLists]) => {
          let shoppingList = currentShoppingLists.find((shoppingList) => shoppingList.id === listId);
          if (shoppingList) {
            shoppingList.archived = true;
          }
          return currentShoppingLists;
        });
      },

      deleteShoppingList: (listId) => {
        setShoppingLists(([...currentShoppingLists]) => {
          let index = currentShoppingLists.findIndex((shoppingList) => shoppingList.id === listId);
          if (index !== -1) {
            currentShoppingLists.splice(index, 1);
          }
          return currentShoppingLists;
        });
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
