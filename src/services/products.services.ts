import { ModelStatic, UpdateOptions, DestroyOptions } from "sequelize";
import Products from "../database/models/Products";
import resp from "../utils/resp";

class ProductsServices {
  private model: ModelStatic<Products> = Products;

  async get() {
    try {
      const products = await this.model.findAll();
      return resp(200, products);
    } catch (error) {
      return resp(500, { error: "Erro ao receber listagem de produtos" });
    }
  }

  async getById(id: number) {
    try {
      const product = await this.model.findByPk(id);
      if (product) {
        return resp(200, product);
      } else {
        return resp(404, { error: "Produto não encontrado" });
      }
    } catch (error) {
      return resp(500, {
        error: "Erro ao receber infos do produto específico",
      });
    }
  }

  async create(productData: Omit<Products, "id">) {
    try {
      const newProduct = await this.model.create(productData);
      return resp(201, newProduct);
    } catch (error) {
      return resp(500, { error: "O produto não foi criado" });
    }
  }

  async update(id: number, updatedData: Omit<Products, "id">) {
    try {
      const [affectedCount] = await this.model.update(updatedData, {
        where: { id },
      });

      if (affectedCount > 0) {
        const updatedProduct = await this.model.findByPk(id);
        return resp(200, updatedProduct);
      } else {
        return resp(404, { error: "Produto não encontrado" });
      }
    } catch (error) {
      return resp(500, { error: "O produto não foi editado" });
    }
  }

  async delete(id: number) {
    try {
      const options: DestroyOptions = {
        where: { id },
      };

      const deletedRows = await this.model.destroy(options);

      if (deletedRows) {
        return resp(200, "Produto deletado com sucesso");
      } else {
        return resp(404, {
          error: "O Produto não foi encontrado ou não existe",
        });
      }
    } catch (error) {
      return resp(500, { error: "O produto não foi deletado" });
    }
  }
}

export default ProductsServices;
