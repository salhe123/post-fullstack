import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Blog API')
  .setDescription('REST API for blog system')
  .setVersion('1.0')
  .addBearerAuth()
  .build();
