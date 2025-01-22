import { PermissionEnum, PowerEnum } from "../enum";

export const PERMISSION_OPTION = [
  {
    label: "私有",
    value: PermissionEnum.PRIVATE,
  },
  {
    label: "公开「只读」",
    value: PermissionEnum.PUBLIC,
  },
  {
    label: "公开「读写」",
    value: PermissionEnum.PUBLIC_RW,
  },
];

export const POWER_OPTION = [
  {
    label: "可阅读",
    value: PowerEnum.READ,
  },
  {
    label: "可编辑",
    value: PowerEnum.EDIT,
  },
];
