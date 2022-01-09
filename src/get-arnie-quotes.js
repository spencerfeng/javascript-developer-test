const { httpGet } = require("./mock-http-interface");

const getArnieQuotes = async (urls) => {
  const getUrlsPromises = urls.map((url) => httpGet(url));

  const results = await Promise.all(getUrlsPromises);

  return results
    .map((result) => {
      try {
        const message = JSON.parse(result.body).message;

        if (result.status === 200) {
          return {
            "Arnie Quote": message,
          };
        }
        return {
          FAILURE: message,
        };
      } catch {
        return null;
      }
    })
    .filter((result) => result !== null);
};

module.exports = {
  getArnieQuotes,
};
