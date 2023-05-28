import dotenv from 'dotenv';
import loader from './loader';
async function bootstrap() {
    dotenv.config();
    await loader();
}
bootstrap();
