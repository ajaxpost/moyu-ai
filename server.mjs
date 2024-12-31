import { Server } from "@hocuspocus/server";
import * as Y from "yjs";
import fs from "fs";

// Configure …
const server = Server.configure({
  name: "hocuspocus-fra1-01",
  port: 9090,
  yDocOptions: { gc: false, gcFilter: () => false }, // 关闭 GC 是为了做历史版本功能
  onAuthenticate: async (payload) => {
    // 用户验证 hook
    if (payload.token) {
      if (payload.token === "readonly") {
        payload.connection.readOnly = true; // 如果用户不能修改文档，需要这样设置
      }
    } else {
      // 如果用户验证失败，没权限访问该文档时，直接抛出异常即可，客户端能收到这个异常的 message
      throw new Error("Authentication failed");
    }
  },
  // 读取二进制文件，这里用本地文件系统，在实际业务中通常是通过接口（RPC）访问后台服务或者数据库、s3 等
  onLoadDocument: async (payload) => {
    const { documentName } = payload;
    const path = `./data/${documentName}.yjs`;

    if (fs.existsSync(path)) {
      const doc = new Y.Doc();
      const docData = fs.readFileSync(path);
      const uint8Array = new Uint8Array(docData);
      Y.applyUpdate(doc, uint8Array);
      return doc;
    } else {
      // 重点：推荐在服务器进行初始化赋值，后面会说原因，如果不需要的话，直接返回 new Y.Doc() 即可
      return new Y.Doc();
    }
  },
  onStoreDocument(data) {
    const { documentName, document } = data;
    console.log(documentName, "name");

    const path = `./data/${documentName}.yjs`;
    const update = Y.encodeStateAsUpdate(document);
    fs.writeFile(path, update, (err) => {
      if (err) {
        console.log(err);
      }
    });
  },
});

// Listen …
server.listen();
