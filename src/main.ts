import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  // Remove throttler guard usage if not provided
  // app.useGlobalGuards(app.get(ThrottlerGuard));

  const config = new DocumentBuilder()
    .setTitle('Blog API')
    .setDescription('REST API for blog system')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  SwaggerModule.setup('api/docs', app, SwaggerModule.createDocument(app, config));

  await app.listen(3000);
}
bootstrap();
