//@@viewOn:imports
import { createVisualComponent, Utils, PropTypes, useRoute, useScreenSize, useLsi, useSession, useRef } from "uu5g05";
import Uu5TilesElements from "uu5tilesg02-elements";
import Uu5Elements, { Grid } from "uu5g05-elements";
import Plus4U5 from "uu_plus4u5g02";
import UuPlus4UPeopleCore from "uu_plus4upeopleg01-core";
import Config from "./config/config.js";
import Error from "./error.js";
import importLsi from "../lsi/import-lsi.js";
//@@viewOff:imports

//@@viewOn:constants
const PEOPLE_BASE_URI =
  Plus4U5.Environment.peopleBaseUri ||
  "https://uuapp-dev.plus4u.net/uu-plus4upeople-maing01/0000004723544d1ab0b74000d9f7671c";
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () =>
    Config.Css.css({
      padding: "10px",
    }),
  archivedIcon: () =>
    Config.Css.css({
      verticalAlign: "top",
    }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const ShoppingListsTile = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ShoppingListsTile",
  nestingLevel: ["areaCollection", "area"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    data: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      archived: PropTypes.bool.isRequired,
      ownerUuIdentity: PropTypes.string.isRequired,
    }).isRequired,
    onArchive: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { data, onArchive, onDelete } = props;

    const lsi = useLsi(importLsi, [ShoppingListsTile.uu5Tag]);
    const [, setRoute] = useRoute();
    const [screenSize] = useScreenSize();

    const { identity } = useSession();
    const isOwner = data.ownerUuIdentity === identity.uuIdentity;

    let itemList = [];
    if (!data.archived) {
      // shopping list that is not archived has an archive button and a delete button
      const collapsed = ["xs", "s"].includes(screenSize) ? true : false;
      itemList = [
        {
          icon: "uugdsstencil-uiaction-archive",
          collapsedChildren: lsi.archiveBtn,
          collapsed,
          onClick: onArchive,
        },
        {
          icon: "uugds-delete",
          collapsedChildren: lsi.deleteBtn,
          collapsed,
          onClick: onDelete,
        },
      ];
    } else {
      // shopping list that is archived has just a delete button
      itemList = [
        {
          icon: "uugds-delete",
          collapsedChildren: lsi.deleteBtn,
          onClick: onDelete,
        },
      ];
    }

    const actionGroupRef = useRef();

    function handleOpen(e) {
      // hacky solution to ignore clicks on buttons and dropdown menu
      const dropdownBtn = actionGroupRef.current?.firstChild?.firstChild?.firstChild;
      if ((dropdownBtn && dropdownBtn.contains(e.target)) || e.target?.getAttribute("role") === "menu") {
        return;
      }

      setRoute("shoppingList", { id: data.id });
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, ShoppingListsTile);

    return currentNestingLevel ? (
      <Uu5TilesElements.Tile onClick={handleOpen} {...attrs}>
        <Grid templateColumns="auto auto" alignItems="center">
          <Grid.Item>
            <div>
              <Uu5Elements.Text category="interface" segment="title" type="common" autoFit>
                {data.name}
              </Uu5Elements.Text>{" "}
              {data.archived && (
                <Uu5Elements.RichIcon
                  icon="uugdssvg-svg-product"
                  colorScheme="orange"
                  significance="highlighted"
                  tooltip={lsi.archived}
                  height={26}
                  className={Css.archivedIcon()}
                />
              )}
            </div>
            <div>
              <UuPlus4UPeopleCore.PersonalCard.Provider baseUri={PEOPLE_BASE_URI} uuIdentity={data.ownerUuIdentity}>
                {({ personalCardData }) => {
                  const { state, data, errorData } = personalCardData;
                  let name;
                  if (state === "pendingNoData" || state === "pending") {
                    name = <Uu5Elements.Pending size={null} />;
                  } else if (state === "errorNoData" || state === "error") {
                    name = <Error title={lsi.ownerErrorTitle}>{JSON.stringify(errorData, null, 2)}</Error>;
                  } else {
                    name = `${data.firstname} ${data.surname}`;
                  }
                  return (
                    <Uu5Elements.Text category="interface" segment="content" type="large" colorScheme="dim" autoFit>
                      {lsi.owner}: {name}
                    </Uu5Elements.Text>
                  );
                }}
              </UuPlus4UPeopleCore.PersonalCard.Provider>
            </div>
          </Grid.Item>
          <Grid.Item>
            {isOwner && (
              <div ref={actionGroupRef}>
                <Uu5Elements.ActionGroup itemList={itemList} size="xl" />
              </div>
            )}
          </Grid.Item>
        </Grid>
      </Uu5TilesElements.Tile>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ShoppingListsTile };
export default ShoppingListsTile;
//@@viewOff:exports
