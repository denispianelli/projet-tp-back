import Enemy from '../models/Enemy.js';

export default {
  // CREATE
  async createEnemy(req, res) {
    const enemy = req.body;

    const result = await Enemy.create(enemy);

    res.json(result);
  },

  // READ ALL
  async getAllEnemies(_req, res) {
    const result = await Enemy.findAll();

    res.json(result);
  },

  // READ ONE
  async getEnemyById(req, res) {
    const { id } = req.params;

    const result = await Enemy.findById(id);

    res.json(result);
  },

  // UPDATE
  async updateEnemy(req, res) {
    const { id } = req.params;
    const stage = req.body;

    const result = await Enemy.update(id, stage);

    res.json(result);
  },

  // DELETE
  async deleteEnemy(req, res) {
    const { id } = req.params;

    const result = await Enemy.delete(id);

    res.json(result);
  },
};
