import { Server } from '@hocuspocus/server';

// Configure …
const server = Server.configure({
  name: 'hocuspocus-fra1-01',
  port: 9090,
  onStoreDocument(data) {
    console.log(data.document, data.clientsCount, '>>>', Date.now());
  },
});

// Listen …
server.listen();
