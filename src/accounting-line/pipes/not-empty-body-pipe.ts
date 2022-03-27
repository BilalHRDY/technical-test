import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

Injectable();
export class NotEmptyBodyPipe implements PipeTransform {
  transform(value: any, metadata: any): any {
    if (metadata.type === 'body') {
      if (!Object.keys(value).length) {
        throw new BadRequestException('Body should not be empty');
      }
      return value;
    }
  }
}
