const createColombianFormatPrice = (price) => {
  const formattedTotal = Math.floor(price);

  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(formattedTotal);
};

module.exports = {
  createColombianFormatPrice,
};
