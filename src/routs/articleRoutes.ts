import express from 'express';
const router = express.Router();

router.post('/saveArticle', async (req, res) => {
  res.send('Save Article Called');
});
export default router;
