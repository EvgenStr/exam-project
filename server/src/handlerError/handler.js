module.exports = async (err, req, res, next) => {
  console.log(err);
  const status = err.status || 500;
  if (
    err.message ===
      'new row for relation "Banks" violates check constraint "Banks_balance_ck"' ||
    err.message ===
      'new row for relation "Users" violates check constraint "Users_balance_ck"'
  ) {
    return res.status(406).send('Not Enough money');
  }
  if (err.sql) return res.status(500).send('Server Error');

  res.status(status).send(err.message || 'Server Error');
};
