const parseHeaders = (headers, newValue) => {
  newValue.forEach(({ key, value }) => {
    if (!headers.hasOwnProperty(key)) {
      headers[key] = value;
    }
  });
  return headers;
};

const generateUrl = (url, protocol) => {
  let theUrl = `${protocol}://${url}`;
  return theUrl;
};

const translateDocument = async ({
  url,
  method,
  headerInput,
  buffer: { name: originalFilename, url: fileurl },
  sourceLang,
  targetLang,
  inputFormat,
  protocol,
}) => {
  const fetchUrl = generateUrl(url, protocol);
  const blobObject = await fetch(fileurl);
  const blobBuffer = await blobObject.blob().buffer;
  const staticHeaders = {
    Host: "api.languageweaver.com",
  };
  const request = {
    headers: headerInput
      ? parseHeaders(staticHeaders, headerInput)
      : staticHeaders,
    method,
    formData: [
      {
        key: "input",
        type: "buffer",
        value: blobBuffer,
        fileName: originalFilename,
      },
      { key: "sourceLanguageId", value: sourceLang },
      { key: "targetLanguageId", value: targetLang },
      { key: "model", value: "generic" },
      { key: "submissionType", value: "FILE" },
      { key: "inputFormat", value: inputFormat },
    ],
  };
  // console.log("my request body is: ", request.formData);
  const response = await fetch(fetchUrl, request);
  const data = await response.text();

  return { as: data };
};

export default translateDocument;
