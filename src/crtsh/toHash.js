import axios from 'axios';
import { DisplayLink, transform, types } from 'malt-js';
import { CrtShID } from '../types';
import { findAll, toDetailsDesc } from './common';

const hashValRegexExp = /<A href="(.*?)">(.*?)<\/A>/i;

/**
 * Some hashes include a link to view details. Extract the link if possible
 * @param hashContent
 * @return {*[]}
 */
function getHashValueAndLink(hashContent) {
  const match = hashValRegexExp.exec(hashContent);
  if (match) {
    const [, hashLink, hashValue] = match;
    return [hashLink, hashValue];
  }
  return ['', hashContent];
}

const hashRegexExp = /<TH.*>(.*?)\(Certificate\)<\/TH>[\n\r\s]*<TD.*?>(.*)<\/TD>/gi;

/**
 * Return list of hashes from the Crt.Sh details page.
 * @param data
 * @return {{hashLink: *, hashType, hashValue: *}[]}
 */
function getHashes(data) {
  // Get hashes from crt.sh response
  const hashMatches = findAll(hashRegexExp, data);
  return hashMatches.map(match => {
    const [, hashType, hashContent] = match;
    const [hashLink, hashValue] = getHashValueAndLink(hashContent);
    return { hashValue, hashLink, hashType };
  });
}

async function fetchData(request) {
  const identity = request.entity.value;
  const resp = await axios.get(`https://crt.sh/?id=${encodeURIComponent(identity)}`);
  return resp.data;
}

async function idToHash(request, response) {
  const data = await fetchData(request);

  const hashes = getHashes(data);
  hashes.forEach(({ hashValue, hashLink, hashType }) => {
    const ent = response.addChildEntity(types.Hash(hashValue, { type: hashType, link: hashLink }));
    if (hashLink) {
      ent.display.add(DisplayLink(hashLink));
    }
  });
}

transform(idToHash, {
  inputType: CrtShID,
  outputType: types.Hash,
  description: toDetailsDesc('hashes')
});
