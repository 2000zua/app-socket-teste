import { PartialType } from '@nestjs/mapped-types';
import { CreateMessageInput } from './create-chat.dto';

export class UpdateChatDto extends PartialType(CreateMessageInput) {
  id: number;
}
