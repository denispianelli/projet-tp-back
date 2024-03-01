import getDatamapper from '../datamappers/get.datamapper.js';

export default {
  async getAll(req, res) {
    const { tableName } = req.params;

    const result = await getDatamapper.getAll(tableName);

    res.json(result[0].get_all_from_table);
  },
};
