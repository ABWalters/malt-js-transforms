// /* eslint-disable camelcase */
// const { callAPI } = require('../../src/utils');
// const { Phrase, Hash } = require('../../src/types');
// const { CrtShID } = require('../entities');
// const app = require('../../src/app');
// const { DisplayTable } = require('../../src/containers/Display');
import axios from 'axios';
//
// app.transform(
//   {
//     inputType: Phrase,
//     outputType: CrtShID,
//     description: toIDDesc('phrase')
//   },
//   phraseToCrtShID
// );
//
// app.transform(
//   {
//     inputType: Hash,
//     outputType: CrtShID,
//     description: toIDDesc('hash')
//   },
//   phraseToCrtShID
// );
import { transform, types, DisplayTable } from 'malt-js';
import { CrtShID } from '../types';

//
function responseToEntities(response, data) {
  return data.forEach(item => {
    const { min_cert_id, ...props } = item;
    const entity = CrtShID(min_cert_id, props);

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
//
const toIDDesc = input => `Query crt.sh and return the CrtSH IDs matching the search ${input}.`;

transform(phraseToCrtShID, {
  inputType: types.Phrase,
  outputType: CrtShID,
  description: toIDDesc('phrase')
});
