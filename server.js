import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(cors());

let articles = [];

app.get('/articles', (req, res) => {
  res.json(articles);
});

app.post('/articles', (req, res) => {
  const articleData = req.body;
  const newArticle = {
    slug: `article-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    likesCount: 0,
    liked: false,
    ...articleData,
  };
  articles.push(newArticle);
  res.status(201).json({ article: newArticle });
});

app.put('/articles/:slug', (req, res) => {
  const { slug } = req.params;
  const updatedFields = req.body;

  const articleIndex = articles.findIndex((article) => article.slug === slug);

  if (articleIndex === -1) {
    return res.status(404).json({ error: 'Статья не найдена' });
  }

  Object.keys(updatedFields).forEach((key) => {
    if (updatedFields[key] !== undefined) {
      articles[articleIndex][key] = updatedFields[key];
    }
  });

  articles[articleIndex].updatedAt = new Date().toISOString();

  res.json({ article: articles[articleIndex] });
});

app.post('/articles/:slug/favorite', (req, res) => {
  const { slug } = req.params;

  console.log(`Received request to favorite article: ${slug}`);

  const articleIndex = articles.findIndex((article) => article.slug === slug);

  if (articleIndex === -1) {
    console.error(`Article with slug ${slug} not found`);
    return res.status(404).json({ error: 'Article not found' });
  }

  articles[articleIndex].favoritesCount += 1;
  articles[articleIndex].favorited = true;
  res.json({ article: articles[articleIndex] });
});

app.delete('/articles/:slug/favorite', (req, res) => {
  const { slug } = req.params;
  const articleIndex = articles.findIndex((article) => article.slug === slug);

  if (articleIndex === -1) {
    return res.status(404).json({ error: 'Article not found' });
  }

  articles[articleIndex].favoritesCount -= 1;
  articles[articleIndex].favorited = false;
  res.json({ article: articles[articleIndex] });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
