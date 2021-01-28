const show404 = (req, res) => res.status(404).send({ message: 'Запрашиваемый ресурс не найден.' });

module.exports = show404;
