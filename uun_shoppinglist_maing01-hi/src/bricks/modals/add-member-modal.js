//@@viewOn:imports
import { createVisualComponent, PropTypes, useLsi, Utils, Environment } from "uu5g05";
import Uu5Forms from "uu5g05-forms";
import Uu5Elements from "uu5g05-elements";
import UuPlus4UPeopleForms from "uu_plus4upeopleg01-forms";
import Config from "./config/config.js";
import importLsi from "../../lsi/import-lsi.js";
//@@viewOff:imports

//@@viewOn:constants
const PEOPLE_BASE_URI = Environment.get(
  "uu_plus4u5g02_peopleBaseUri",
  "https://uuapp-dev.plus4u.net/uu-plus4upeople-maing01/0000004723544d1ab0b74000d9f7671c"
);
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({}),
  controls: () => Config.Css.css({ display: "flex", gap: 8, justifyContent: "flex-end" }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const AddMemberModal = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "AddMemberModal",
  nestingLevel: ["areaCollection", "area"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    onSubmit: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { onSubmit, onClose } = props;
    const lsi = useLsi(importLsi, [AddMemberModal.uu5Tag]);

    function handleSubmit(event) {
      const values = { ...event.data.value };
      onSubmit(values.person.value.uuIdentity);
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, AddMemberModal);

    return currentNestingLevel ? (
      <Uu5Forms.Form.Provider onSubmit={handleSubmit} {...attrs}>
        <Uu5Elements.Modal
          open
          onClose={onClose}
          header={lsi.modalTitle}
          footer={
            <div className={Css.controls()}>
              <Uu5Forms.CancelButton onClick={onClose} />
              <Uu5Forms.SubmitButton />
            </div>
          }
        >
          <Uu5Forms.Form.View>
            <UuPlus4UPeopleForms.PersonalCard.FormSelect
              baseUri={PEOPLE_BASE_URI}
              name="person"
              label={lsi.personSelectLabel}
              required
              autoFocus
            />
          </Uu5Forms.Form.View>
        </Uu5Elements.Modal>
      </Uu5Forms.Form.Provider>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { AddMemberModal };
export default AddMemberModal;
//@@viewOff:exports
