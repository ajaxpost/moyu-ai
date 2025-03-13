import { Database } from "@hocuspocus/extension-database";
import postgres from "postgres";
import fs from "fs";

export const schema = `
  CREATE TABLE IF NOT EXISTS "documents" (
    "name" varchar(255) PRIMARY KEY,
    "data" bytea NOT NULL
  )
`;

export class Postgres extends Database {
  configuration = {
    connectionString: "",
    schema,
    fetch: async ({ documentName }) => {
      const [row] = await this.sql`
        SELECT data FROM "documents" WHERE name = ${documentName}
      `;
      const path = `./data/${documentName}.yjs`;
      if (!row && fs.existsSync(path)) {
        const docData = fs.readFileSync(path);
        return docData;
      }

      return row?.data;
    },
    store: async ({ documentName, state }) => {
      return await this.sql`
        INSERT INTO "documents" ("name", "data") VALUES (${documentName}, ${state})
          ON CONFLICT(name) DO UPDATE SET data = ${state}
      `;
    },
  };

  constructor(configuration) {
    super({});

    this.configuration = {
      ...this.configuration,
      ...configuration,
    };
  }
  async onConfigure() {
    this.sql = postgres(this.configuration.connectionString);
    await this.sql.unsafe(this.configuration.schema);
  }
}
