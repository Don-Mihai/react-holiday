export const BASE_URL = 'http://localhost:3001/';
export const SERVER_URL = 'http://localhost:5002/';
// https://a3018748f9cb7970.mokky.dev

export function getFullImageUrl(serverURL: string, imageURL: string = ''): string {
  if (imageURL.startsWith('http')) {
    return imageURL;
  } else {
    return `${serverURL}${imageURL}`;
  }
}
