import { IProduct } from "../utils/interfaces";

export const ADD_PRODUCT = 'ADD_PRODUCT';
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';

export interface ActionTypes {
    type: string;
    payload: IProduct | number
}
export function addProduct(product: IProduct) {
    return {
        type: ADD_PRODUCT,
        payload: product
    }
}

export function removeProduct(id: number) {
    return {
        type: REMOVE_PRODUCT,
        payload: id,
    }
}