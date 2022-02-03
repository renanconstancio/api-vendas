import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import { ISearchProduct } from '../domain/models/ISearchProduct';
import { IProductPaginate } from '../domain/models/IProductPaginate';

@injectable()
class SearchProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({ name }: ISearchProduct): Promise<IProductPaginate> {
    const product = await this.productsRepository.findByName(name);

    if (!product) {
      throw new AppError('Product not found.');
    }

    return product;
  }
}

export default SearchProductService;
