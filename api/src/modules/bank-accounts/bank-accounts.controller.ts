import { ActiveUserId } from '@/shared/decorators/ActiveUserId';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BankAccountsService } from './bank-accounts.service';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';

@Controller('bank-accounts')
export class BankAccountsController {
  constructor(private readonly bankAccountsService: BankAccountsService) {}

  @Post()
  create(
    @ActiveUserId() userId: string,
    @Body() createBankAccountDto: CreateBankAccountDto,
  ) {
    return this.bankAccountsService.create(userId, createBankAccountDto);
  }

  @Get()
  findAllByUser(@ActiveUserId() userId: string) {
    return this.bankAccountsService.findAllByUserId(userId);
  }

  @Get(':bankAccountId')
  findOneByUserAndByBankAccount(
    @ActiveUserId() userId: string,
    @Param('bankAccountId') bankAccountId: string,
  ) {
    return this.bankAccountsService.findOneByUserIdAndByBankAccountId(
      userId,
      bankAccountId,
    );
  }

  @Put(':bankAccountId')
  update(
    @Param('bankAccountId') id: string,
    @Body() updateBankAccountDto: UpdateBankAccountDto,
  ) {
    return this.bankAccountsService.update(+id, updateBankAccountDto);
  }

  @Delete(':bankAccountId')
  remove(@Param('bankAccountId') id: string) {
    return this.bankAccountsService.remove(+id);
  }
}
