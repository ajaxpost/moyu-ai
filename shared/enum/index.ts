export enum MenuOptimisticEnum {
  ADD,
  DEL,
}

// 文档权限 0 私有 1 公开「只读」 2 公开『读写』
export enum PermissionEnum {
  PRIVATE = 0,
  PUBLIC = 1,
  PUBLIC_RW = 2,
}

// 文档权限「单个文档权限」
export enum PowerEnum {
  READ = "READ",
  EDIT = "EDIT",
}
