module.exports = app => {
  const Tasks = app.models.tasks;

  app.route('/tasks')
    .get(async (req, res) => {
      // "/tasks": Lista tarefas
      try {
        const result = await Tasks.findAll();
        res.json(result);
      } catch(err) {
        res.status(412).json({ msg: err.message });
      }
    })
    .post(async (req, res) => {
      // "/tasks": Cadastra nova tarefa
      try {
        const result = await Tasks.create(req.body);
        res.json(result);
      } catch(err) {
        res.status(412).json({ msg: err.message });
      }
    });

  app.route('/tasks/:id')
    .get(async (req, res) => {
      // "/tasks/1": Consulta 1 tarefa
      try {
        const { id } = req.params;
        const where = { id };
        const result = await Tasks.findOne({ where });

        if(result) {
          res.json(result);
        } else {
          res.sendStatus(404);
        }
      } catch(err) {
        res.status(412).json({ msg: err.message });
      }
    })
    .put(async (req, res) => {
      // "/tasks/1": Atualiza 1 tarefa
      try {
        const { id } = req.params;
        const where = { id };

        await Tasks.update(req.body, { where });
        res.sendStatus(204);
      } catch(err) {
        res.status(412).json({ msg: err.message });
      }
    })
    .delete(async (req, res) => {
      // "/tasks/1": Exclui 1 tarefa
      try {
        const { id } = req.params;
        const where = { id };

        await Tasks.destroy({ where });
        res.sendStatus(204);
      } catch(err) {
        res.status(412).json({ msg: err.message });
      }
    });
};
