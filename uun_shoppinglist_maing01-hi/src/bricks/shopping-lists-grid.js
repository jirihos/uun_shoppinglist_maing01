//@@viewOn:imports
import { createVisualComponent, Utils, useState, useLsi, useAppBackground } from "uu5g05";
import Uu5TilesElements from "uu5tilesg02-elements";
import Uu5Elements, { UuGds } from "uu5g05-elements";
import Config from "./config/config.js";
import { useShoppingLists } from "../contexts/shopping-lists-context.js";
import ShoppingListsTile from "./shopping-lists-tile.js";
import importLsi from "../lsi/import-lsi.js";
//@@viewOff:imports

//@@viewOn:constants
const DARK_COLOR = UuGds.ColorPalette.getValue(["building", "dark", "mainLighter"]);
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({}),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const ShoppingListsGrid = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ShoppingListsGrid",
  nestingLevel: ["areaCollection", "area"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const lsi = useLsi(importLsi, [ShoppingListsGrid.uu5Tag]);

    const [background] = useAppBackground();
    const darkMode = background === "dark";

    const { filteredShoppingLists, archiveShoppingList, deleteShoppingList } = useShoppingLists();

    const [archiveDialogIndex, setArchiveDialogIndex] = useState(-1);
    const [deleteDialogIndex, setDeleteDialogIndex] = useState(-1);

    function handleArchive(index) {
      setArchiveDialogIndex(-1);
      archiveShoppingList(filteredShoppingLists[index].id);
    }

    function handleDelete(index) {
      setDeleteDialogIndex(-1);
      deleteShoppingList(filteredShoppingLists[index].id);
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, ShoppingListsGrid);

    return currentNestingLevel ? (
      <div>
        <Uu5TilesElements.Grid
          data={filteredShoppingLists}
          tileMinWidth={470}
          tileMaxWidth={470}
          verticalGap={10}
          horizontalGap={10}
          {...attrs}
        >
          {(props, { index }) => (
            <ShoppingListsTile
              {...props}
              onArchive={(e) => {
                e.stopPropagation();
                setArchiveDialogIndex(index);
              }}
              onDelete={(e) => {
                e.stopPropagation();
                setDeleteDialogIndex(index);
              }}
            />
          )}
        </Uu5TilesElements.Grid>

        <Uu5Elements.Dialog
          style={{ backgroundColor: darkMode && DARK_COLOR }} // fixes a possible bug in uu5
          open={archiveDialogIndex !== -1}
          onClose={() => setArchiveDialogIndex(-1)}
          header={lsi.archiveDialogHeader}
          info={<Uu5Elements.Text autoFit>{filteredShoppingLists[archiveDialogIndex]?.name}</Uu5Elements.Text>}
          actionDirection="horizontal"
          actionList={[
            {
              children: lsi.cancelBtn,
              significance: "distinct",
            },
            {
              children: lsi.archiveBtn,
              onClick: () => {
                handleArchive(archiveDialogIndex);
              },
              colorScheme: "warning",
              significance: "highlighted",
            },
          ]}
        />

        <Uu5Elements.Dialog
          style={{ backgroundColor: darkMode && DARK_COLOR }} // fixes a possible bug in uu5
          open={deleteDialogIndex !== -1}
          onClose={() => setDeleteDialogIndex(-1)}
          header={lsi.deleteDialogHeader}
          info={<Uu5Elements.Text autoFit>{filteredShoppingLists[deleteDialogIndex]?.name}</Uu5Elements.Text>}
          actionDirection="horizontal"
          actionList={[
            {
              children: lsi.cancelBtn,
              significance: "distinct",
            },
            {
              children: lsi.deleteBtn,
              onClick: () => {
                handleDelete(deleteDialogIndex);
              },
              colorScheme: "red",
              significance: "highlighted",
            },
          ]}
        />
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ShoppingListsGrid };
export default ShoppingListsGrid;
//@@viewOff:exports
