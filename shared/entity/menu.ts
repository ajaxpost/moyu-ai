export interface DocumentVO {
  id: number;
  parent_id: number | null;
  title: string;
  creator: string;
  creator_email: string;
  created_at: string;
  updated_at: string;
  content: string;
  children?: DocumentVO[];
}
