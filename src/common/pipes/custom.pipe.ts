import { PipeTransform, Injectable, ArgumentMetadata, HttpException, BadRequestException } from '@nestjs/common';
import { ZodSchema } from 'zod';

@Injectable()
export class CustomValidationPipe implements PipeTransform {

    constructor(private schema: ZodSchema) {

    }

    transform(value: any, metadata: ArgumentMetadata) {
        console.log({ value, metadata });
        // value.firstName = value.username.split(" ")[0];

        try {
            const validateData = this.schema.parse(value);
            console.log({ validateData });
            return validateData;

        } catch (error) {
            throw new BadRequestException(error);
        }
    }
}