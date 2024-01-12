import { ModelStatic, UpdateOptions, DestroyOptions } from "sequelize";
import Users from "../database/models/Users";
import resp from "../utils/resp";
import md5 from "md5";
import { addToBlacklist, sign } from "../jwt/jwt";
import IUser from "../interface/IUser";
import schema from "../services/validations/schema";

class UsersServices {
  private model: ModelStatic<Users> = Users;

  async get() {
    try {
      const users = await this.model.findAll();
      return resp(200, users);
    } catch (error) {
      return resp(500, { error: "Erro ao receber listagem de usuários" });
    }
  }

  async getById(id: number) {
    try {
      const user = await this.model.findByPk(id);
      if (user) {
        return resp(200, user);
      } else {
        return resp(404, { error: "Usuário não existe" });
      }
    } catch (error) {
      return resp(500, {
        error: "Erro ao receber informações de um user específico",
      });
    }
  }

  async login(body: { username: string; pass: string }) {
    const hashPass = md5(body.pass);

    const user = await this.model.findOne({
      where: {
        username: body.username,
        pass: hashPass,
      },
    });

    if (!user) return resp(404, "Usuário não encontrado");

    const { id, username } = user;

    // Gere um novo token
    const token = sign({ id, username });

    // Retorne o novo token
    return resp(200, { id, username, token });
  }

  async create(user: IUser) {
    const { error } = schema.user.validate(user);
    if (error) return resp(422, error.message);
    const hashPass = md5(user.pass);
    const createdUser = await this.model.create({
      ...user,
      pass: hashPass,
    });

    return resp(201, createdUser);
  }

  async update(id: number, updatedData: Omit<Users, "id">) {
    try {
      if (updatedData.pass) {
        updatedData.pass = md5(updatedData.pass);
      }
      const [affectedCount] = await this.model.update(updatedData, {
        where: { id },
      });

      if (affectedCount > 0) {
        const updatedProduct = await this.model.findByPk(id);
        return resp(200, updatedProduct);
      } else {
        return resp(404, { error: "Usuário não encontrado" });
      }
    } catch (error) {
      return resp(500, { error: "As informações não foram editadas" });
    }
  }

  async delete(id: number) {
    try {
      const options: DestroyOptions = {
        where: { id },
      };

      const deletedRows = await this.model.destroy(options);

      if (deletedRows) {
        return resp(200, "Usuário deletado com sucesso");
      } else {
        return resp(404, {
          error: "O Usuário não foi encontrado ou não existe",
        });
      }
    } catch (error) {
      return resp(500, { error: "Usuário não foi deletado" });
    }
  }
}

export default UsersServices;
