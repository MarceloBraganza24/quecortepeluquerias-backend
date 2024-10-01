import PricesRepository from '../repositories/prices.repository.js';
import { PriceAlreadyExists, PriceByTitleExists } from '../utils/custom.exceptions.js';

const pricesManager = new PricesRepository();

const getAll = async () => {
    const prices = await pricesManager.getAll();
    return prices;
}
const getById = async (id) => {
    const price = await pricesManager.getById(id);
    return price;
}
const register = async(price) => {
    const prices = await pricesManager.getAll();
    const priceByPriceOfCategoryExists = prices.find(item => item.title == price.title)
    if(priceByPriceOfCategoryExists) {
        throw new PriceByTitleExists('There is already a price with that title');
    }
    const result = await pricesManager.save(price);
    return result;
}

const update = async (id, price) => {
    const prices = await pricesManager.getAll();
    const priceById = await pricesManager.getById(id);
    const priceByPriceOfExists = prices.find(item => item.title === price.title)
    if(priceById.title !== price.title || priceById.value != price.value) {
        if(priceByPriceOfExists && (priceByPriceOfExists._id.toString() !== priceById._id.toString())) {
            throw new PriceByTitleExists('There is already a price with that title');
        }
        const priceUpdated = await pricesManager.update(id, price);
        return priceUpdated;
    }
}

const eliminate = async (id) => {
    const price = await pricesManager.eliminate(id);
    return price;
}

export {
    getAll,
    getById,
    register,
    update,
    eliminate
}