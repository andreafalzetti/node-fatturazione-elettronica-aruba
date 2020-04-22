const composeUrl = (config) => (data) => {
  const types = {
    sent: 'out',
    received: 'in',
  };

  const findMethods = {
    filename: () => 'getByFilename',
    invoiceFilename: () => 'getByInvoiceFilename',
    id: () => data.id,
  };

  const findBy = findMethods[data.findBy]();
  const direction = types[data.type];

  const url = `${config.endpoints.api.url}/services/notification/${direction}/${findBy}`;

  return url;
};

module.exports = composeUrl;
