import Stage from '../models/Stage.js';

export default {
  // CREATE
  async createStage(req, res) {
    const stage = req.body;

    const result = await Stage.create(stage);

    res.json(result);
  },

  // READ ALL
  async getAllStages(_req, res) {
    const result = await Stage.findAll();

    res.json(result);
  },

  // READ ONE
  async getStageById(req, res) {
    const { id } = req.params;

    const result = await Stage.findById(id);

    res.json(result);
  },

  // UPDATE
  async updateStage(req, res) {
    const { id } = req.params;
    const stage = req.body;

    const result = await Stage.update(id, stage);

    res.json(result);
  },

  // DELETE
  async deleteStage(req, res) {
    const { id } = req.params;

    const result = await Stage.delete(id);

    res.json(result);
  },
};
