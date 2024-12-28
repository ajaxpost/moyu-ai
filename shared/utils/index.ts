import { DocumentVO } from "../entity";
import { cloneDeep } from "lodash-es";

export function getMenuTreeData(data: DocumentVO[]): DocumentVO[] {
  const cloneDate = cloneDeep(data);
  const _data: DocumentVO[] = [];
  const result: DocumentVO[] = [];
  cloneDate.forEach((item) => {
    if (!item.parent_id) {
      result.push(item);
    } else {
      _data.push(item);
    }
  });

  _data.forEach((item) => {
    const parent = cloneDate.find((o) => item.parent_id === o.id);
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
  id: string
) {
  const selectedKeys: string[] = [];
  const find = data.find((o) => o.id === id);
  if (!find?.parent_id) return selectedKeys;
  if (find.parent_id) {
    selectedKeys.push(find.parent_id);
    const arr = getMenuSelectedKeys(data, find.parent_id);
    selectedKeys.push(...arr);
  }

  return selectedKeys;
}

export function addMenuItem(data: DocumentVO[], id: string, pid?: string) {
  const _data = cloneDeep(data);
  const defaultItem: DocumentVO = {
    id,
    parent_id: pid,
    title: "",
    created_at: "",
    updated_at: "",
    uid: "",
  };
  if (!pid) return [..._data, defaultItem];
  const findChild = (data: DocumentVO[]) => {
    data.forEach((item) => {
      if (item.id === pid) {
        item.children = [...(item.children || []), defaultItem];
        return item;
      }
      if (item.children) {
        const find = findChild(item.children);
        if (find) return;
      }
    });
    return undefined;
  };
  findChild(_data);
  return _data;
}

export function removeMenuItem(data: DocumentVO[], id?: string) {
  const _data = cloneDeep(data);
  const removeItem = (data: DocumentVO[]) => {
    data.forEach((item, index) => {
      if (item.id === id) {
        data.splice(index, 1);
        return;
      }
      if (item.children) {
        removeItem(item.children);
      }
    });
  };
  removeItem(_data);
  return _data;
}

export function updateTitle(data: DocumentVO[], id: string, title: string) {
  const _data = cloneDeep(data);
  const updateItem = (data: DocumentVO[]) => {
    data.forEach((item) => {
      if (item.id === id) {
        item.title = title;
        return;
      }
      if (item.children) {
        updateItem(item.children);
      }
    });
  };
  updateItem(_data);
  return _data;
}

export function findMenuItem(data: DocumentVO[], id: string) {
  const findItem = (data: DocumentVO[]): DocumentVO | undefined => {
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      if (item.id === id) {
        return item;
      }
      if (item.children) {
        const find = findItem(item.children);
        if (find) return find;
      }
    }
    return undefined;
  };
  return findItem(data);
}

export function findMenuItemParentKeys(
  data: DocumentVO[],
  id: string
): string[] {
  const findItem = (data: DocumentVO[], parentId?: string[]): string[] => {
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      if (item.id === id) {
        return parentId || [];
      }
      if (item.children) {
        const find = findItem(item.children, [...(parentId || []), item.id]);
        if (find.length) {
          return find;
        }
      }
    }
    return [];
  };

  return findItem(data);
}
