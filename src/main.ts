import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useWebSocketAdapter(new IoAdapter(app))
  app.enableCors({
    origin: ['http://0.0.0.0:3001', 'http://localhost:3001', 'http://192.168.254.177:3001'], // Permitir o domínio do frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  await app.listen(3000, '0.0.0.0');
}

bootstrap();
