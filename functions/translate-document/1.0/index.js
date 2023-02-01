const parseHeaders = (headers) =>
  headers.reduce((acc, { key, value }) => ({ ...acc, [key]: value }), {});

// const parseQueryParameters = (queryParameters) =>
//   queryParameters
//     .map(({ key, value }, index) => {
//       const paramKey = index === 0 ? `?${key}` : key;
//       return `${paramKey}=${encodeURIComponent(value)}`;
//     })
//     .join("&");

const generateUrl = (url, protocol) => {
  let theUrl = `${protocol}://${url}`;
  console.log(theUrl);
  return theUrl;
};

// TODO: I think it would be nice if we can put the basic headers in, so the user doesn't have to
const translateDocument = async ({
  url,
  method,
  body,
  headers = [
    // {
    //   "Content-Type": "application/json",
    //   Accept: "*/*",
    //   Connection: "keep-alive",
    //   "Accept-Encoding": "gzip, deflate, br",
    // },
  ],
  protocol,
}) => {
  const fetchUrl = generateUrl(url, protocol);
  const options = {
    method,
    headers: parseHeaders(headers),
    body: body ? body : undefined,
  };
  // console.log("my headers are: ", options.headers);
  const response = await fetch(fetchUrl, options);
  const data = await response.text();

  return { as: data };
};

export default translateDocument;
