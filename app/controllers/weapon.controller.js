import Weapon from '../models/Weapon.js';

export default {
  // CREATE
  async createWeapon(req, res) {
    const weapon = req.body;

    const result = await Weapon.create(weapon);

    res.json(result);
  },

  // READ ALL
  async getAllWeapons(_req, res) {
    const result = await Weapon.findAll();

    res.json(result);
  },

  // READ ONE
  async getWeaponById(req, res) {
    const { id } = req.params;

    const result = await Weapon.findById(id);

    res.json(result);
  },

  // UPDATE
  async updateWeapon(req, res) {
    const { id } = req.params;
    const weapon = req.body;

    const result = await Weapon.update(id, weapon);

    res.json(result);
  },

  // DELETE
  async deleteWeapon(req, res) {
    const { id } = req.params;

    const result = await Weapon.delete(id);

    res.json(result);
  },
};
