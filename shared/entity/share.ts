import { PowerEnum } from "../enum";

export interface UserInfo {
  id: string;
  name: string;
  email: string;
  emailVerified: null;
  image: string;
}

export interface ShareEntiry {
  id: number;
  uid: string;
  sharer_uid: string;
  did: string;
  power: PowerEnum;
  create_at: string;
  update_at: string;
  source: string;
}
