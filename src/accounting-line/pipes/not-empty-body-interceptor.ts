import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

Injectable();
export class NotEmptyBodyPipe implements PipeTransform {
  transform(payload: any): any {
    if (!Object.keys(payload).length) {
      throw new BadRequestException('Payload should not be empty');
    }
    return payload;
  }
}
