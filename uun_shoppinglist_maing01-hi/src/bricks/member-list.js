//@@viewOn:imports
import { createVisualComponent, useLsi, useMemo, useState, Utils, useSession } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Uu5TilesElements from "uu5tilesg02-elements";
import Config from "./config/config.js";
import MemberTile from "./member-tile.js";
import { useShoppingList } from "../contexts/shopping-list-context.js";
import AddMemberModal from "./modals/add-member-modal.js";
import importLsi from "../lsi/import-lsi.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () =>
    Config.Css.css({
      padding: "10px",
      textAlign: "center",
    }),
  addMemberBtn: () =>
    Config.Css.css({
      marginTop: "12px",
    }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const MemberList = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "MemberList",
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
    const lsi = useLsi(importLsi, [MemberList.uu5Tag]);
    const { filteredShoppingList, addMember } = useShoppingList();

    const { identity } = useSession();
    const isOwner = filteredShoppingList.ownerUuIdentity === identity.uuIdentity;

    let memberData = useMemo(() => {
      let mappedMembers = filteredShoppingList.memberUuIdentityList.map((uuIdentity) => {
        let showRemoveBtn = isOwner || uuIdentity === identity.uuIdentity;
        return { uuIdentity, subtitle: lsi.member, showRemoveBtn };
      });
      mappedMembers.unshift({ uuIdentity: filteredShoppingList.ownerUuIdentity, subtitle: lsi.owner });
      return mappedMembers;
    }, [filteredShoppingList, lsi, identity.uuIdentity, isOwner]);

    const [addMemberModalOpen, setAddMemberModalOpen] = useState(false);
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, MemberList);

    return currentNestingLevel ? (
      <div {...attrs}>
        <Uu5TilesElements.Grid data={memberData} itemIdentifier="uuIdentity" verticalGap={10}>
          {(props) => <MemberTile {...props} />}
        </Uu5TilesElements.Grid>

        {isOwner && (
          <Uu5Elements.Button
            onClick={() => setAddMemberModalOpen(true)}
            colorScheme="primary"
            significance="highlighted"
            className={Css.addMemberBtn()}
          >
            {lsi.addMemberBtn}
          </Uu5Elements.Button>
        )}

        {addMemberModalOpen && (
          <AddMemberModal
            onSubmit={(uuIdentity) => {
              setAddMemberModalOpen(false);
              addMember(uuIdentity);
            }}
            onClose={() => setAddMemberModalOpen(false)}
          />
        )}
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { MemberList };
export default MemberList;
//@@viewOff:exports
