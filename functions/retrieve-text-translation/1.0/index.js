const parseHeaders = (headers, newValue) => {
  newValue.forEach(({ key, value }) => {
    if (!headers.hasOwnProperty(key)) {
      headers[key] = value;
    }
  });
  return headers;
};

const retrieveTextTranslation = async ({ headerInput, requestId }) => {
  const staticHeaders = {
    Host: "api.languageweaver.com",
  };
  const url = `https://api.languageweaver.com/v4/mt/translations/async/${requestId}/content`;
  const request = {
    method: "GET",
    headers: headerInput
      ? parseHeaders(staticHeaders, headerInput)
      : staticHeaders,
  };

  const response = await fetch(url, request);
  const headers = response.headers;
  const isText = headers["content-type"] == "application/json" ? true : false;
  const data = await response.text();
  if (isText) {
    return { as: data };
  } else {
    console.log("My headers: ", headers);
    const fileBuffer = await response.blob();
    console.log("my file is: ", fileBuffer);
    const fileRef = await storeFile(
      "import",
      "file",
      {
        contentType: headers["content-type"],
        extension: "DOCX",
        fileBuffer: fileBuffer.buffer,
        fileName: headers["content-disposition"],
      },
      { headers: {} }
    );
    console.log("My temporary URL ", fileRef);
    return { as: fileRef };
  }
};

export default retrieveTextTranslation;
