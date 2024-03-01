import characterDatamapper from '../datamappers/character.datamapper.js';

export default {
  async getAllCharacters(req, res) {
    const result = await characterDatamapper.getAllCharacters();

    res.json(result);
  },
};
