const generateUrl = (url, protocol) => {
  let theUrl = `${protocol}://${url}`;
  return theUrl;
};

const generateToken = async ({ url, protocol, clientId, clientSecret }) => {
  const fetchUrl = generateUrl(url, protocol);
  const staticHeaders = {
    "Content-Type": "application/json;",
    "Content-Length": "",
    Host: "api.languageweaver.com",
    Connection: "keep-alive",
  };

  const request = {
    method: "POST",
    headers: staticHeaders,
    body: JSON.stringify({
      clientId: clientId,
      clientSecret: clientSecret,
    }),
  };

  const response = await fetch(fetchUrl, request);
  const data = await response.text();

  return { as: data };
};

export default generateToken;
