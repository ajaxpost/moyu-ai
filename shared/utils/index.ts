import { DocumentVO } from "../entity";

export function getMenuTreeData(data: DocumentVO[]): DocumentVO[] {
  const _data: DocumentVO[] = [];
  const result: DocumentVO[] = [];
  data.forEach((item) => {
    if (!item.parent_id) {
      result.push(item);
    } else {
      _data.push(item);
    }
  });

  _data.forEach((item) => {
    const parent = data.find((o) => item.parent_id === o.id);
    if (!parent) return;
    if (!parent.children) {
      parent.children = [];
    }
    parent.children.push(item);
  });

  return result;
}

export function getMenuSelectedKeys(
  data: Omit<DocumentVO, "children">[],
  id: number
) {
  const selectedKeys: number[] = [];
  const find = data.find((o) => o.id === id);
  if (!find?.parent_id) return selectedKeys;
  if (find.parent_id) {
    selectedKeys.push(find.parent_id);
    const arr = getMenuSelectedKeys(data, find.parent_id);
    selectedKeys.push(...arr);
  }

  return selectedKeys;
}
