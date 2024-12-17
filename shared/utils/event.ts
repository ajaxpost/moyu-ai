import EventEmitter from "eventemitter3";

export const emitter = new EventEmitter();

export enum EventEnum {
  MENU_UPDATE_TITLE = "MENU_UPDATE_TITLE",
  MENU_FIND_ITEM = "MENU_FIND_ITEM",
  EDITOR_USERS = "EDITOR_USERS",
}
