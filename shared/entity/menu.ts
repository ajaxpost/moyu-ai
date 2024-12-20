export interface DocumentVO {
  id: string;
  parent_id?: string;
  title: string;
  creator: string;
  creator_email: string;
  created_at: string;
  updated_at: string;
  children?: DocumentVO[];
}
