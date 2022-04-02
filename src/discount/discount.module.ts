import {Module} from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import {DiscountService} from "./discount.service";
import {DiscountController} from "./discount.controller";
import {Discount} from "./discount.model";

@Module({
    providers: [DiscountService],
    controllers: [DiscountController],
    imports: [
        SequelizeModule.forFeature([Discount])
    ]
})
export class DiscountModule {
}
