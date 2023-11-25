import http from 'src/utils/http'
import { SuccessResponse } from 'src/types/utils.type'
import { Purchase, PurchaseListStatus } from 'src/types/purchase.type'
const URL = 'purchases'

export const purchaseApi = {
  addToCart(body: { product_id: string; buy_count: number }) {
    return http.post<SuccessResponse<Purchase>>(`${URL}/add-to-cart`, body)
  },
  getPurchases(params: { status: PurchaseListStatus }) {
    return http.get<SuccessResponse<Purchase>>(`${URL}`, {
      params
    })
  }
}
