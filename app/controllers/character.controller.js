import Character from '../models/Character.js';

export default {
  // CREATE
  async createCharacter(req, res) {
    const character = req.body;

    const result = await Character.create(character);

    res.json(result);
  },

  // READ ALL
  async getAllCharacters(_req, res, next) {
    const result = await Character.findAll();

    if (!result) {
      next();
    }

    res.json(result);
  },

  // READ ONE
  async getCharacterById(req, res, next) {
    const { id } = req.params;

    const result = await Character.findById(id);

    if (!result) {
      next();
    }

    res.json(result);
  },

  // UPDATE
  async updateCharacter(req, res, next) {
    const { id } = req.params;
    const character = req.body;

    const isCharacterExist = await Character.findById(id);

    if (!isCharacterExist) {
      next();
    }

    const result = await Character.update(id, character);

    res.json(result);
  },

  // DELETE
  async deleteCharacter(req, res, next) {
    const { id } = req.params;

    const isCharacterExist = await Character.findById(id);

    if (!isCharacterExist) {
      next();
    }

    const result = await Character.delete(id);

    res.json(result);
  },
};
