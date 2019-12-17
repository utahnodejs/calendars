import { Module } from "@nestjs/common";

import { CalendarController } from "./controllers";
import { CalendarService } from "./services";

@Module({
    imports: [],
    controllers: [CalendarController],
    providers: [CalendarService],
})
export class AppModule {}
