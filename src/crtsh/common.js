import axios from 'axios';

/**
 * Fetch the Crt.sh details page and run a regex expression against it to extract a value.
 * @param id
 * @param regex
 * @param groupIndex
 * @return {Promise<string>}
 */
export async function getCrtShMatch(id, regex, groupIndex = 1) {
  const resp = await axios.get(`https://crt.sh/?id=${encodeURIComponent(id)}`);

  const match = regex.exec(resp.data);
  if (match) {
    return match[groupIndex]
      .replace(/&nbsp;/gi, ' ')
      .replace(/\s{2,}/g, ' ')
      .replace(/^\s*/, '');
  }
  return null;
}

/**
 * Find all matches for a given regex expression.
 * @param regexExp
 * @param data
 * @return {Array}
 */
export function findAll(regexExp, data) {
  // Find all matches for a given regex exp.
  const results = [];
  let regexMatch = regexExp.exec(data);
  while (regexMatch != null) {
    results.push(regexMatch);
    regexMatch = regexExp.exec(data);
  }
  return results;
}

export const toDetailsDesc = returnType => `Return the cert ${returnType} for a given CrtSH ID`;
