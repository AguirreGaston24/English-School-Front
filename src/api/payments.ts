import instance from "."

export const getPaymentById = (id: string) => {
  return instance.get(`/payment/${id}`)
}