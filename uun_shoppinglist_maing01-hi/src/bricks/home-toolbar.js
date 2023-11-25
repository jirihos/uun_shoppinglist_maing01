//@@viewOn:imports
import { createVisualComponent, useLsi, useState, Utils } from "uu5g05";
import { Grid, Button, Toggle } from "uu5g05-elements";
import Config from "./config/config.js";
import { useShoppingLists } from "../contexts/shopping-lists-context.js";
import NewShoppingListModal from "./modals/new-shopping-list-modal.js";
import importLsi from "../lsi/import-lsi.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () =>
    Config.Css.css({
      marginBottom: "10px",
    }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const HomeToolbar = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "HomeToolbar",
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
    const lsi = useLsi(importLsi, [HomeToolbar.uu5Tag]);

    const { includeArchived, setIncludeArchived, createShoppingList } = useShoppingLists();

    const [newListModalOpen, setNewListModalOpen] = useState(false);
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, HomeToolbar);

    return currentNestingLevel ? (
      <div>
        <Grid
          templateRows={{ xs: "auto auto", l: "auto" }}
          templateColumns={{ xs: "auto", l: "1fr 1fr 1fr" }}
          templateAreas={{ xs: "button, toggle", l: ". button toggle" }}
          rowGap={8}
          justifyItems="center"
          alignItems="center"
          {...attrs}
        >
          <Grid.Item gridArea="button">
            <Button colorScheme="primary" significance="highlighted" size="l" onClick={() => setNewListModalOpen(true)}>
              {lsi.createShoppingListBtn}
            </Button>
          </Grid.Item>
          <Grid.Item gridArea="toggle" justifySelf={{ l: "end" }}>
            <Toggle
              label={lsi.includeArchived}
              value={includeArchived}
              onChange={() => setIncludeArchived(!includeArchived)}
            />
          </Grid.Item>
        </Grid>

        {newListModalOpen && (
          <NewShoppingListModal
            onSubmit={(name) => {
              setNewListModalOpen(false);
              createShoppingList(name);
            }}
            onClose={() => setNewListModalOpen(false)}
          />
        )}
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { HomeToolbar };
export default HomeToolbar;
//@@viewOff:exports
