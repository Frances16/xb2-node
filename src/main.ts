import express from 'express';
const app = express();
const port = 3000;

app.use(express.json());

app.listen(port, () => {
  console.log('服务已启动');
});

app.get('/', (req, res) => {
  res.send('你好');
});

const data = [
  {
    id: 1,
    title: '关山月',
    content: '明月出天山，苍茫云海闯',
  },
  {
    id: 2,
    title: '关山月2',
    content: '明月出天山，苍茫云海闯2',
  },
];

app.get('/posts', (req, res) => {
  res.send(data);
});

app.get('/posts/:postId', (req, res) => {
  const { postId } = req.params;
  const posts = data.filter((item) => item.id == postId);
  res.send(posts[0]);
});

app.post('/posts', (req, res) => {
  const { content } = req.body;

  res.status(201);

  console.log(req.headers['content-typ']);

  res.set('content-ty', 'how');

  res.send({
    message: `成功创建了内容:${content}`,
  });
});
