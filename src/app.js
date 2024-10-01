process.env.LANG = 'es_AR.UTF-8';

import express from "express";
import cors from 'cors';
import { __mainDirname } from './utils/utils.js';
import initializePassport from "./config/passport.js";
import passport from "passport";
import { addLogger } from './utils/logger.js';
// import swaggerJsdoc from 'swagger-jsdoc';
// import swaggerUiExpress from 'swagger-ui-express';
import cookieParser from 'cookie-parser';
import config from "./config/config.js";

import UsersRouter from "./routes/users.router.js";
import SessionsRouter from "./routes/sessions.router.js";
import TicketsRouter from "./routes/tickets.router.js";
import ShiftsRouter from "./routes/shifts.router.js";
import PaymentsRouter from "./routes/payments.router.js";
import PartnersRouter from "./routes/partners.router.js";
import ProvidersRouter from "./routes/providers.router.js";
import ProductsRouter from "./routes/products.router.js";
import PricesRouter from "./routes/prices.router.js";
import HolidaysRouter from "./routes/holidays.router.js";
import AboutRouter from "./routes/about.router.js";
import HairdressersRouter from "./routes/hairdressers.router.js";
import ServicesRouter from "./routes/services.router.js";
import WorkDaysRouter from "./routes/workDays.router.js";
import CompaniesRouter from "./routes/companies.router.js";

const app = express();

const usersRouter = new UsersRouter();
const sessionsRouter = new SessionsRouter();
const ticketsRouter = new TicketsRouter();
const shiftsRouter = new ShiftsRouter();
const paymentsRouter = new PaymentsRouter();
const partnersRouter = new PartnersRouter();
const providersRouter = new ProvidersRouter();
const productsRouter = new ProductsRouter();
const pricesRouter = new PricesRouter();
const holidaysRouter = new HolidaysRouter();
const aboutRouter = new AboutRouter();
const hairdressersRouter = new HairdressersRouter();
const servicesRouter = new ServicesRouter();
const workDaysRouter = new WorkDaysRouter();
const companiesRouter = new CompaniesRouter();

app.use(addLogger);
app.use(express.json({ type: 'application/json' }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

initializePassport();
app.use(passport.initialize());

// const swaggerOptions = {
//     definition: {
//         openapi: '3.0.1',
//         info: {
//             title: 'Documentación del proyecto Ecommerce Curso Backend',
//             description: 'API para resolver el proceso de compra de productos online'
//         }
//     },
//     apis: [`${__mainDirname}/docs/**/*.yaml`]
// }

// const specs = swaggerJsdoc(swaggerOptions);
// app.use('/api/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

app.use('/api/users', usersRouter.getRouter());
app.use('/api/sessions', sessionsRouter.getRouter());
app.use('/api/tickets', ticketsRouter.getRouter());
app.use('/api/shifts', shiftsRouter.getRouter());
app.use('/api/payments', paymentsRouter.getRouter());
app.use('/api/partners', partnersRouter.getRouter());
app.use('/api/providers', providersRouter.getRouter());
app.use('/api/products', productsRouter.getRouter());
app.use('/api/prices', pricesRouter.getRouter());
app.use('/api/holidays', holidaysRouter.getRouter());
app.use('/api/about', aboutRouter.getRouter());
app.use('/api/hairdressers', hairdressersRouter.getRouter());
app.use('/api/services', servicesRouter.getRouter());
app.use('/api/workDays', workDaysRouter.getRouter());
app.use('/api/companies', companiesRouter.getRouter());

app.listen(config.port, () => console.log(`Server running on port ${config.port}`))