const fakeLoginResponse = {
  user: {
    id: 3,
    facturatechId: 8089,
    facturatechDealerId: 8026,
    linkDealerId: null,
    username: '3333',
    nit: '901143311',
    email: 'miguel.angel@facturatech.co',
    userType: 'Distribuidor Normal',
    role: 'distribuidor',
    name: 'Lorena Prueba datos Luna Sss',
    phone: '9514666995',
    status: 'active',
    deviceFrom: 'cotizador',
    isDealer: true,
    createdAt: '2024-03-12T14:54:00.000Z',
    updatedAt: '2024-03-12T14:56:02.000Z',
  },
  permissions: [
    'dashboard',
    'show_quotations',
  ],
  token: 'eyJhbGciOiJIUjg5LCJleHAiOjE3MTA5NjUyODl9.eGaNcmt_RW9_zJyYe-byUF5jn-G8TtM9Nz9uUWpGsFA',
  expiresIn: '2024-03-20T15:08:09.819-05:00',
};

const fakeResponseGetCoUsuarioByUserAndPassword = {
  id_usuario: 8089,
  id_distribuidor: 8026,
  tipo_usuario: 'Distribuidor Normal',
  nombre_completo: 'Lorena Prueba datos Luna Sss',
  usuario: '3333',
  telefono: '9514666995',
  email: 'miguel.angel@facturatech.co',
  co_datos_empresa: {
    id_usuario: 8089,
    cod_tipo_persona: '2',
    nit: '901143311',
  },
};

module.exports = {
  fakeLoginResponse,
  fakeResponseGetCoUsuarioByUserAndPassword,
};
