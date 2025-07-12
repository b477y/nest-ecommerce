import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from "class-validator";

@ValidatorConstraint({ name: "match-password", async: false })
export class IsPasswordsMatchedConstraint implements ValidatorConstraintInterface {

    validate(value: string, args: ValidationArguments) {
        console.log({ value, args });
        return args.object[args.constraints[0]] == value;
    }

    defaultMessage(validationArguments?: ValidationArguments): string {
        return "password mismatch the confirm password";
    }

}

export function IsPasswordMatched(matchWith: string, validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [matchWith],
            validator: IsPasswordsMatchedConstraint
        });
    };
}