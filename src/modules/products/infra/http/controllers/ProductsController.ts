import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateProductService from '@modules/products/services/CreateProductService';
import DeleteProductService from '@modules/products/services/DeleteProductService';
import ListProductService from '@modules/products/services/ListProductService';
import ShowProductService from '@modules/products/services/ShowProductService';
import UpdateProductService from '@modules/products/services/UpdateProductService';
import SearchProductService from '@modules/products/services/SearchProductService';

export default class ProductsController {
  public async search(request: Request, response: Response): Promise<Response> {
    // const { name } = request.params;
    // const listProducts = container.resolve(SearchProductService);

    // const products = await listProducts.execute({ name });

    return response.json({ request });
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listProducts = container.resolve(ListProductService);

    const products = await listProducts.execute();

    return response.json(products);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showProduct = container.resolve(ShowProductService);

    const product = await showProduct.execute({ id });

    return response.json(product);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;

    const createProduct = container.resolve(CreateProductService);

    const product = await createProduct.execute({
      name,
      price,
      quantity,
    });

    return response.json(product);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;
    const { id } = request.params;

    const updateProduct = container.resolve(UpdateProductService);

    const product = await updateProduct.execute({
      id,
      name,
      price,
      quantity,
    });

    return response.json(product);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteProduct = container.resolve(DeleteProductService);

    await deleteProduct.execute({ id });

    return response.json([]);
  }
}