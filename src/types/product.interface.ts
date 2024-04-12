export interface IProduct {
  model: string
  releaseDate: string
  category: string
  recommendedPrice: number
  description: string
  visible: boolean
  photo: string
}

export interface IProductResponse extends IProduct {
  id: string
  createdAt: string
}
