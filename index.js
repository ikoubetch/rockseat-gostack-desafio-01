const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  return res.json({
    Homework: '#GoStack 9 - Desafio 01'
  });
});

const projects = [];
let request = 0;

app.use((req, res, next) => {
  request++;
  console.log(`Requests count: ${request}`);
  return next();
});

const checkIdProject = (req, res, next) => {
  const { id } = req.params;
  const index = projects.findIndex(proj => proj.id == id);

  if (index == -1) {
    return res.status(400).json({
      message: `Project doesn't found`
    });
  }
  req.IndexProject = index;

  return next();
};

app.post('/projects', (req, res) => {
  const { id, title } = req.body;
  const project = {
    id,
    title,
    tasks: []
  };
  projects.push(project);

  return res.status(201).json(project);
});

app.get('/projects', (req, res) => {
  return res.json(projects);
});

app.put('/projects/:id', checkIdProject, (req, res) => {
  const { title } = req.body;

  projects[req.IndexProject].title = title;

  return res.json();
});

app.delete('/projects/:id', checkIdProject, (req, res) => {
  const { id } = req.params;

  projects.splice(req.IndexProject, 1);

  return res.json(projects)
});

app.post('/projects/:id/tasks', checkIdProject, (req, res) => {
  const { title } = req.body;
  projects[req.IndexProject].tasks.push(title);

  return res.json(projects);

});

app.listen(3333);