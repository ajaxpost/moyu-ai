import { PermissionEnum } from "../enum";

export interface DocumentVO {
  id: string;
  parent_id?: string;
  title: string;
  uid: string;
  created_at: string;
  updated_at: string;
  permission: { permission: PermissionEnum };
  children?: DocumentVO[];
}

export interface PermissionVO {
  id: number;
  did: string;
  permission: PermissionEnum;
}
