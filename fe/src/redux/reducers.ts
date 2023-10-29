import { IProduct } from '../utils/interfaces';
import { ADD_PRODUCT, REMOVE_PRODUCT, ActionTypes } from './actions';

export function productReducer(state: IProduct[] = [], action: ActionTypes): IProduct[] {
    switch (action.type) {
        case ADD_PRODUCT:
            const product = action.payload as IProduct;
            const addId = product.id;
            const existingProduct = state.find(item => item.id === addId);

            if (existingProduct) {
                return state.map(item => {
                    if (item.id === addId) {
                        item.quantity = (item.quantity || 1) + 1;
                    }
                    return item;
                });
            }

            const newProduct: IProduct = { ...action.payload as IProduct, quantity: 1 };
            return [...state, newProduct];

        case REMOVE_PRODUCT:
            const removeId = action.payload as number;
            let singleItemFLag = false;
            const updatedData = state.map(item => {
                if (item.id === removeId) {
                    console.log('removeitem ', item)
                    if (!item.quantity || item.quantity === 1) {
                        singleItemFLag = true;
                    }
                    if (item.quantity && item.quantity > 1) {
                        item.quantity -= 1;
                    }
                }
                return item;
            });

            if (!singleItemFLag) {
                return updatedData
            }

            return updatedData.filter(item => item.id !== removeId);

        default:
            return state;
    }
}
