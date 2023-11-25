export const appendParamsToURL = (url: string, params: any) => {
  if (!params) return url;
  const urlObj = new URL(url);
  for (const key in params) {
    urlObj.searchParams.append(key, params[key]);
  }
  return urlObj.toString();
};
