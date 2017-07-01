module.exports = (req, res, next) => {
  if( ! req.body.cipherText) {
    return res.status(400).json({
      error: 'Invalid request'
    });
  }
  next();
};
