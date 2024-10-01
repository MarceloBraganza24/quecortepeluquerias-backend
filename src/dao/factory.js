import config from '../config/config.js';

export let Users;
export let Tickets;
export let Shifts;
export let Partners;
export let Providers;
export let Products;
export let Prices;
export let Holidays;
export let About;
export let Hairdressers;
export let Services;
export let WorkDays;
export let Companies;

const persistence = config.persistence;

switch(persistence) {
    case 'MONGO':
        console.log('Working with MongoDB persistence');
        const mongoose = await import('mongoose');
        await mongoose.connect(config.mongoUrl);
        const { default: UsersMongo } = await import('./dbManagers/users.manager.js');
        const { default: TicketsMongo } = await import('./dbManagers/tickets.manager.js');
        const { default: ShiftsMongo } = await import('./dbManagers/shifts.manager.js');
        const { default: PartnersMongo } = await import('./dbManagers/partners.manager.js');
        const { default: ProvidersMongo } = await import('./dbManagers/providers.manager.js');
        const { default: ProductsMongo } = await import('./dbManagers/products.manager.js');
        const { default: PricesMongo } = await import('./dbManagers/prices.manager.js');
        const { default: HolidaysMongo } = await import('./dbManagers/holidays.manager.js');
        const { default: AboutMongo } = await import('./dbManagers/about.manager.js');
        const { default: HairdressersMongo } = await import('./dbManagers/hairdressers.manager.js');
        const { default: ServicesMongo } = await import('./dbManagers/services.manager.js');
        const { default: WorkDaysMongo } = await import('./dbManagers/workDays.manager.js');
        const { default: CompaniesMongo } = await import('./dbManagers/companies.manager.js');
        Users = UsersMongo;
        Tickets = TicketsMongo;
        Shifts = ShiftsMongo;
        Partners = PartnersMongo;
        Providers = ProvidersMongo;
        Products = ProductsMongo;
        Prices = PricesMongo;
        Holidays = HolidaysMongo;
        About = AboutMongo;
        Hairdressers = HairdressersMongo;
        Services = ServicesMongo;
        WorkDays = WorkDaysMongo;
        Companies = CompaniesMongo;
        break;
    case 'FILE':
        /* const { default: UsersFile } = await import('./fileManagers/users.manager.js');
        Users = UsersFile; */
        break;
}