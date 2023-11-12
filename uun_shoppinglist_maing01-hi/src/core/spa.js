//@@viewOn:imports
import { createVisualComponent, Utils } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Plus4U5 from "uu_plus4u5g02";
import Plus4U5App from "uu_plus4u5g02-app";

import Config from "./config/config.js";
import Home from "../routes/home.js";
//@@viewOff:imports

//@@viewOn:constants
const ShoppingList = Utils.Component.lazy(() => import("../routes/shopping-list.js"));
const About = Utils.Component.lazy(() => import("../routes/about.js"));
const InitAppWorkspace = Utils.Component.lazy(() => import("../routes/init-app-workspace.js"));
const ControlPanel = Utils.Component.lazy(() => import("../routes/control-panel.js"));

const ROUTE_MAP = {
  "": { redirect: "home" },
  home: (props) => <Home {...props} />,
  shoppingList: (props) => <ShoppingList {...props} />,
  about: (props) => <About {...props} />,
  "sys/uuAppWorkspace/initUve": (props) => <InitAppWorkspace {...props} />,
  controlPanel: (props) => <ControlPanel {...props} />,
  "*": () => (
    <Uu5Elements.Text category="story" segment="heading" type="h1">
      Not Found
    </Uu5Elements.Text>
  ),
};

document.initialShoppingLists = [
  {
    id: "c3a2faebc331484ba8477923",
    name: "První nákupní seznam",
    archived: false,
    ownerUuIdentity: "3987-144-5699-0000",
    memberUuIdentityList: ["784-3673-7253-0000", "9479-7016-4601-0000"],
    itemList: [
      {
        id: "204fb43da61c4df7b1ec90b6",
        text: "Jogurty",
        amount: 2,
        unit: "ks",
        totalPrice: 56,
        currency: "Kč",
        completed: false,
      },
      {
        id: "2d5a7486d64845288ad4e96c",
        text: "Rýže",
        totalPrice: 70,
        currency: "Kč",
        completed: true,
      },
      {
        id: "528363909e3549f391c8282a",
        text: "Pomeranče",
        amount: 2,
        unit: "ks",
        totalPrice: 24,
        currency: "Kč",
        completed: false,
      },
      {
        id: "22365448b24b4d40ba569bb6",
        text: "Čokoláda",
        completed: false,
      },
      {
        id: "5ef4fccc2eb94888a6aeb03c",
        text: "Limonáda",
        amount: 1,
        unit: "ks",
        totalPrice: 30,
        currency: "Kč",
        completed: true,
      },
    ],
  },
  {
    id: "169155d9c45a4262b5052575",
    name: "Druhý nákupní seznam",
    archived: false,
    ownerUuIdentity: "784-3673-7253-0000",
    memberUuIdentityList: ["9479-7016-4601-0000", "3987-144-5699-0000"],
    itemList: [
      {
        id: "7cadd545eb1c4464b4342a72",
        text: "Polohrubá mouka",
        amount: 1,
        unit: "ks",
        totalPrice: 30,
        currency: "Kč",
        completed: false,
      },
      {
        id: "00c1ad8e65174aa6980ea87e",
        text: "Jablka",
        amount: 6,
        unit: "ks",
        totalPrice: 54,
        currency: "Kč",
        completed: true,
      },
    ],
  },
  {
    id: "95fe2806959744c78dab6f6b",
    name: "Třetí nákupní seznam",
    archived: false,
    ownerUuIdentity: "9479-7016-4601-0000",
    memberUuIdentityList: ["784-3673-7253-0000"],
    itemList: [
      {
        id: "426b503965ed4142809a816d",
        text: "Rohlíky",
        amount: 3,
        unit: "ks",
        totalPrice: 11,
        currency: "Kč",
        completed: false,
      },
      {
        id: "70274fed3e7c43bd81629095",
        text: "Tatranka",
        amount: 1,
        unit: "ks",
        totalPrice: 12,
        currency: "Kč",
        completed: true,
      },
      {
        id: "b43122b762a74ba2984c766d",
        text: "Perlivá voda",
        amount: 1,
        unit: "ks",
        totalPrice: 17,
        currency: "Kč",
        completed: true,
      },
      {
        id: "07d6b9fc7ea5406784edf8e3",
        text: "Šunka",
        amount: 100,
        unit: "g",
        totalPrice: 33,
        currency: "Kč",
        completed: true,
      },
    ],
  },
  {
    id: "f30f25392ded469d9cc147f2",
    name: "Archivovaný nákupní seznam",
    archived: true,
    ownerUuIdentity: "3987-144-5699-0000",
    memberUuIdentityList: ["784-3673-7253-0000", "9479-7016-4601-0000"],
    itemList: [
      {
        id: "bb421e2e7e4045f88fbd2398",
        text: "Žvýkačky",
        amount: 2,
        unit: "ks",
        totalPrice: 36,
        currency: "Kč",
        completed: true,
      },
      {
        id: "dc87b29f09f94b3caae5a54e",
        text: "Müsli tyčinka",
        amount: 1,
        unit: "ks",
        totalPrice: 23,
        currency: "Kč",
        completed: false,
      },
    ],
  },
  {
    id: "5c6448679b024966bf4a4540",
    name: "Nákupní seznam bez přístupu",
    archived: false,
    ownerUuIdentity: "2414-5653-5565-0000",
    memberUuIdentityList: [],
    itemList: [],
  },
];
//@@viewOff:constants

//@@viewOn:css
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const Spa = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Spa",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render() {
    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <Plus4U5.SpaProvider initialLanguageList={["en", "cs"]}>
        <Uu5Elements.ModalBus>
          <Plus4U5App.Spa routeMap={ROUTE_MAP} />
        </Uu5Elements.ModalBus>
      </Plus4U5.SpaProvider>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Spa };
export default Spa;
//@@viewOff:exports
