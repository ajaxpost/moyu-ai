import { DocumentVO } from "../entity";
import { cloneDeep, isPlainObject, isUndefined } from "lodash-es";
import { PermissionEnum } from "../enum";
import { ShareListType } from "@/components/work/menu";

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

export function addMenuItem(
  data: DocumentVO[],
  id: string,
  pid?: string,
  uid?: string
) {
  const _data = cloneDeep(data);
  const defaultItem: DocumentVO = {
    id,
    parent_id: pid,
    title: "",
    created_at: "",
    updated_at: "",
    uid: uid || "",
    permission: {
      permission: PermissionEnum.PRIVATE,
    },
    is_del: false,
    del_at: "",
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

export function removeMenuItem(data: DocumentVO[], ids: string[]) {
  const _data = cloneDeep(data);
  const removeItem = (data: DocumentVO[]) => {
    data.forEach((item, index) => {
      if (ids.includes(item.id)) {
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

export function findShareMenuItemParentKeys(data: ShareListType, id: string) {
  const find = data.find((o) => o.id === id);
  if (find) {
    return [find.uid];
  }
  return [];
}

export function copyToClipboard({
  text,
  onSuccess,
  onFail,
}: {
  text: string;
  onSuccess?: () => void;
  onFail?: () => void;
}) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      onSuccess?.();
    })
    .catch(() => {
      onFail?.();
    });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getUri(uri: string, params: Record<string, any>) {
  const searchParams = new URLSearchParams();
  for (const key in params) {
    const n = params[key];
    if (Array.isArray(n) && n.length) {
      searchParams.set(key, n.join(","));
    } else if (isPlainObject(n)) {
      searchParams.set(key, JSON.stringify(n));
    } else if (!isUndefined(n)) {
      searchParams.set(key, n);
    }
  }
  return `${uri}?${searchParams.toString()}`;
}
