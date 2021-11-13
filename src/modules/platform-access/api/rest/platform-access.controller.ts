import { Body, Controller, Next, Post, Response } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { RegisterNewAccountDTO } from 'src/modules/platform-access/dtos/register-new-account.dto';
import { RegisterNewAccountCommand } from 'src/modules/platform-access/application/commands/register-new-account/register-new-account.command';
import { NextFunction, Response as ExpressResponse } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Platform Access')
@Controller('platform-access')
export class PlatformAccessController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({
    summary: 'Registers new account with provided email address and password.',
  })
  @ApiResponse({
    status: 201,
    description: 'Account registered successfuly.',
  })
  @ApiResponse({
    status: 422,
    description: 'Input validation error.',
  })
  @ApiResponse({
    status: 400,
    description: 'Provided email address is already taken.',
  })
  @Post('register')
  public registerNewAccount(
    @Body() registerNewAccountDTO: RegisterNewAccountDTO,
    @Response() res: ExpressResponse,
    @Next() next: NextFunction,
  ) {
    this.commandBus
      .execute(new RegisterNewAccountCommand(registerNewAccountDTO))
      .then(() => res.sendStatus(201))
      .catch(next);
  }
}
