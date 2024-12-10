import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:5173'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const port =
    process.env.MODE === 'production'
      ? process.env.PROD_PORT
      : process.env.DEV_PORT;

  await app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
  });
}
bootstrap();
