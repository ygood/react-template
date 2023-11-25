import jsonServer from 'json-server';
import path from 'path';
import { fileURLToPath } from 'url';

const __filenameNew = fileURLToPath(import.meta.url);
const __dirnameNew = path.dirname(__filenameNew);
const server = jsonServer.create();
const router = jsonServer.router(path.resolve(__dirnameNew, 'db.json'));
const middlewares = jsonServer.defaults();
const rewriter = jsonServer.rewriter({
  '/api/*': '/$1',
  '/system/*': '/$1',
  '/wireless/*': '/$1',
  '/network/*': '/$1'
});

server.use(rewriter);

server.use(middlewares);

router.render = async (req, res) => {
  res.jsonp({
    errCode: 0,
    data: res.locals.data.data
  });
};

server.use(router);

server.listen(3030, () => {
  console.log('JSON Server is running port 3030');
});
