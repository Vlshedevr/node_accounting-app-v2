const userServices = require('../services/usersServices');

const getAll = (req, res) => res.status(200).send(userServices.get());

const getOne = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).send('Bad request');

    return;
  }

  const user = userServices.getOne(Number(id));

  if (!user) {
    res.status(404).send('Not found');

    return;
  }

  res.send(user);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).send('Bad request');

    return;
  }

  res.status(201).send(userServices.add(name));
};

const remove = (req, res) => {
  const { id } = req.params;

  const user = userServices.getOne(Number(id));

  if (!user) {
    res.status(404).send('Not found');

    return;
  }

  userServices.remove(Number(id));

  res.status(204).send(id);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const parsID = Number(id);

  if (!parsID || !name) {
    res.status(400).send('Bad request');

    return;
  }

  const user = userServices.getOne(parsID);

  if (!user) {
    res.status(404).send('Not found');

    return;
  }

  res.status(200).send(userServices.update({ id: parsID, name }));
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
