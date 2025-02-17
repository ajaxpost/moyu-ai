import { PermissionEnum } from "../enum";
import { ShareEntiry } from "./share";

export interface DocumentVO {
  id: string;
  parent_id?: string;
  title: string;
  uid: string;
  created_at: string;
  updated_at: string;
  permission: { permission: PermissionEnum };
  children?: DocumentVO[];
  currentShare?: ShareEntiry;
  is_del: boolean;
  del_at: string;
}

export interface PermissionVO {
  id: number;
  did: string;
  permission: PermissionEnum;
}
