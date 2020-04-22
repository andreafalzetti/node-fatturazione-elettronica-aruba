module.exports = {
  statusCode: 200,
  body: {
    id: '0123456789d6132158591d2d',
    sender: {
      description: 'NODEJS UNIT TEST SRL',
      countryCode: 'IT',
      vatCode: '00000000001',
      fiscalCode: '00000000001',
    },
    receiver: {
      description: 'UNIT TEST',
      countryCode: 'IT',
      vatCode: '00000000002',
      fiscalCode: '00000000003',
    },
    file: 'AAAAAAAA==',
    filename: 'IT00000000001_0abcd.xml.p7m',
    invoices: [
      {
        invoiceDate: '2019-02-02T00:00:00.000+01:00',
        number: '9-FE',
        status: 'Ricevuta',
      },
    ],
    username: 'Aruba_Username_UnitTests',
    lastUpdate: '2019-02-07T07:10:02.777+0000',
    invoiceType: 'FPR12',
    docType: 'in',
  },
};
