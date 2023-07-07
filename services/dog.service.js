const { ObjectId } = require("mongodb");
const { NoDogException } = require("../exceptions/no-dog.exception");

let model;

const registerModel = (_model) => {
  model = _model;
};

async function getById(id) {
  return await dogModel.findOne({ _id: new ObjectId(id) });
}

async function getAll() {
  return await dogModel.find().toArray();
}

async function create({ breeds, heightInCm, imageLink }) {
  return await dogModel.insertOne({
    breeds,
    heightInCm,
    imageLink,
  });
}

async function update(id, { breeds, heightInCm, imageLink }) {
  const result = await dogModel.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: { breeds, heightInCm, imageLink } },
    {
      returnOriginal: false,
    },
  );
  if (!result.value) return NoDogException(id);
  return result.value;
}

async function deleteById(id) {
  const result = await dogModel.findOneAndDelete({ _id: new ObjectId(id) });
  if (!result.value) return NoDogException(id);
  return result.value;
}

module.exports = {
  registerModel,
  getById,
  getAll,
  create,
  update,
  deleteById,
};
