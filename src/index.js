import { initServer } from 'malt-js';
import discoveryHandler from './discovery';
import serverless from 'serverless-http';

import './crtsh/toCrtShID';

const meta = {
  author: 'ABWalters'
};

const config = {
  useHttps: true
};

const server = initServer(meta, config);

// Custom handler to allow for discovery
try {
  server.koaApp.use((ctx, next) => discoveryHandler(ctx, next, server));
} catch (e) {
  // pass
}

export const handler = serverless(server.koaApp);
