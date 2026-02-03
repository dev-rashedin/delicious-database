import app from './app';
import 'dotenv/config'

const port = process.env.PORT || 3000;

console.log(port)


app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`);
});
