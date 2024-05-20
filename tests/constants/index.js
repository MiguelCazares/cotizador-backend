const { fakePayloadLogin, fakePayloadLoginWrongPassword } = require('./request/FakeAuthPayload');
const { fakeLoginResponse, fakeResponseGetCoUsuarioByUserAndPassword } = require('./response/FakeAuthResponse');
const { quotationRequestTableData, userTableData } = require('./TableDataSource');

module.exports = {
  fakePayloadLogin,
  fakePayloadLoginWrongPassword,
  fakeLoginResponse,
  fakeResponseGetCoUsuarioByUserAndPassword,
  quotationRequestTableData,
  userTableData,
};
