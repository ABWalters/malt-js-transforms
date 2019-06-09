// async function getCrtShMatch(id, regex, groupIndex = 1) {
//   const resp = await callAPI(`https://crt.sh/?id=${encodeURIComponent(id)}&output=json`);
//
//   const match = regex.exec(resp.data);
//   if (match) {
//     return match[groupIndex]
//       .replace(/&nbsp;/gi, ' ')
//       .replace(/\s{2,}/g, ' ')
//       .replace(/^\s*/, '');
//   }
// }

export const toDetailsDesc = returnType => `Return the cert ${returnType} for a given CrtSH ID`;
