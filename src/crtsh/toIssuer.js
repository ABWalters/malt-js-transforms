import { transform, types } from 'malt-js';
import { CrtShID } from '../types';

const { getCrtShMatch, toDetailsDesc } = require('./common');

const issuerRegex = /Issuer.*?commonName.*?=.*?(.*?)<BR>/i;

async function idToIssuer(request, response) {
  const {
    entity: { value }
  } = request;

  const matchStr = await getCrtShMatch(value, issuerRegex);
  if (matchStr) {
    response.addChildEntity(types.Phrase(matchStr));
  }
}

transform(idToIssuer, {
  inputType: CrtShID,
  outputType: types.Phrase,
  nameSuffix: 'Issuer',
  display: 'To Issuer',
  description: toDetailsDesc('issuer')
});
