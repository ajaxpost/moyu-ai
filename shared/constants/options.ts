import { PermissionEnum } from "../enum";

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
