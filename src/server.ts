import 'reflect-metadata';
import app from './app';
import dotenv from 'dotenv';
dotenv.config();

if (!process.env.PORT) {
    console.log(`Error to get ports`);
    process.exit(1);
};
const PORT: number = parseInt(process.env.PORT as string, 10);
app.listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
});