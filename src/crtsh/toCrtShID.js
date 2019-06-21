import axios from 'axios';
import { DisplayLink, DisplayTable, transform, types } from 'malt-js';
import { CrtShID } from '../types';

function responseToEntities(response, data) {
  return data.forEach(item => {
    // eslint-disable-next-line camelcase
    const { min_cert_id, ...props } = item;
    const entity = CrtShID(min_cert_id, props);

    // eslint-disable-next-line camelcase
    entity.display.add(DisplayLink(`https://crt.sh/?id=${min_cert_id}`));
    const displayTable = DisplayTable.fromObject(props);
    entity.display.add(displayTable.toString());

    response.addChildEntity(entity);
  });
}

async function fetchData(request) {
  const identity = request.entity.value;
  const resp = await axios.get(`https://crt.sh/?q=${encodeURIComponent(identity)}&output=json`);
  return resp.data;
}

async function phraseToCrtShID(request, response) {
  const data = await fetchData(request);
  responseToEntities(response, data);
}

const toIDDesc = input => `Query crt.sh and return the CrtSH IDs matching the search ${input}.`;

transform(phraseToCrtShID, {
  inputType: types.Hash,
  outputType: CrtShID,
  description: toIDDesc('hash')
});

transform(phraseToCrtShID, {
  inputType: types.Phrase,
  outputType: CrtShID,
  description: toIDDesc('phrase')
});
