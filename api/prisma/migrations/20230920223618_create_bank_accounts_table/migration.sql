-- CreateEnum
CREATE TYPE "back_account_type" AS ENUM ('CHECKING', 'INVESTMENT', 'CASH');

-- CreateTable
CREATE TABLE "back_accounts" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "initial_balance" DOUBLE PRECISION NOT NULL,
    "type" "back_account_type" NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "back_accounts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "back_accounts" ADD CONSTRAINT "back_accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
