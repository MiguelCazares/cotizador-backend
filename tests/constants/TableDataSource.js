const quotationRequestTableData = [
  {
    id: 1,
    user_link_id: 1,
    total: 2434000,
    status: 'pendiente',
    reference: 'COT20240319143015',
    last_date_update: '2024-03-19T14:30:15.000Z',
    type_quotation_request: 'link',
    authorizes_id: 2,
    created_at: '2024-03-19T14:30:15.000Z',
    updated_at: '2024-03-19T14:30:15.000Z',
  },
];

const userTableData = [
  {
    id: 1,
    facturatech_id: 1,
    facturatech_dealer_id: 1,
    link_dealer_id: 1,
    username: 'miguelsoledad751',
    nit: '123456789',
    email: 'miguelsoledad751@gmail.com',
    user_type: 'Distribuidor Master',
    role: 'distribuidor',
    name: 'Miguel Soledad',
    phone: '123456789',
    status: 'activo',
    device_from: 'web',
    is_dealer: true,
  },
];

module.exports = {
  quotationRequestTableData,
  userTableData,
};
