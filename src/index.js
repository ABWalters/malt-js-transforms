import { initServer } from 'malt-js';
import serverless from 'serverless-http';

import './crtsh/toCrtShID';
import './crtsh/toHash';
import './crtsh/toIssuer';
import discoveryHandler from './discovery';

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
server.koaApp.listen(3000);
