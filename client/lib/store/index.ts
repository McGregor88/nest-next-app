//import { AccountStore } from "@/store/account-store";
import { UiStore } from "./ui-store";
import { TaskStore } from "./task-store";

const uiStore = new UiStore();
const taskStore = new TaskStore();
//const accountStore = new AccountStore(uiStore);

export const RootStore = {
  uiStore,
  taskStore,
  //accountStore,
};