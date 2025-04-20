import {
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @Matches('password', { message: 'Passwords do not match' })
  confirmPassword: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  name: string;

  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  password: string;
}

function Matches(otherProperty: string, validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      constraints: [otherProperty],
      name: 'matches',
      options: validationOptions,
      propertyName: propertyName,
      target: object.constructor,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints as string[];
          const relatedValue = (args.object as Record<string, any>)[
            relatedPropertyName
          ] as string;
          return value === relatedValue;
        },
      },
    });
  };
}
