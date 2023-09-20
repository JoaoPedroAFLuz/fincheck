-- DropForeignKey
ALTER TABLE "back_accounts" DROP CONSTRAINT "back_accounts_user_id_fkey";

-- AddForeignKey
ALTER TABLE "back_accounts" ADD CONSTRAINT "back_accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
