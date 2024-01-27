const fetch = require("node-fetch");
require("dotenv").config();

const getCompany = async (nit) => {
  // Parse NIT to match the gov api format
  let nitArray = [...nit];
  const penultimateIndex = nitArray.length - 1;
  nitArray.splice(penultimateIndex, 0, "-");
  const parsedNit = nitArray.join("");

  // Socrata API URL from the government
  const url = `https://www.datos.gov.co/resource/wf53-j577.json?nit=${parsedNit}`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-App-Token": process.env.SOCRATA_API_TOKEN,
    },
  };

  const response = await fetch(url, options);
  const company = await response.json();

  return company[0] || false;
};

module.exports = {
  getCompany,
};
