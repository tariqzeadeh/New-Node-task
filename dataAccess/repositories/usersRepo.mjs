import { userModel } from "../models/userModel.mjs";
import { hashPassword, validatePassword, generateError } from "../../helpers";

export const usersRepo = {
  list: async () => {
    const { count, rows } = await userModel.findAndCountAll({
      attributes: ["id", "name", "email", "role", "createdAt", "updatedAt"],
    });
    return rows ? { usersCount: count, usersList: rows } : [];
  },

  get: async (id) => {
    const user = await userModel.findByPk(id, {
      attributes: ["id", "name", "email", "role", "createdAt", "updatedAt"],
    });
    return user ? user : generateError(404, "User Not Found");
  },

  delete: async (id) => {
    const user = await userModel.destroy({ where: { id } });
    return user
      ? { message: `User has been successfully deleted` }
      : generateError(500, "Some Thing Went Wrong.");
  },

  update: async (id, fields) => {
    const user = await userModel.findByPk(id);
    if (!user) return generateError(404, "User Not Found");

    const hashedPassword =
      fields.password &&
      !(await validatePassword(fields.password, user.dataValues.password))
        ? await hashPassword(fields.password)
        : user.password;

    const updatedUser = await userModel.update(
      {
        ...fields,
        password: hashedPassword,
      },
      { where: { id } }
    );
    return updatedUser[0]
      ? { message: "Updated Successfully." }
      : generateError(500, "Some Thing Went Wrong.");
  },

  create: async (name, email, password, role) => {
    const user = await userModel.findOne({ where: { email: email } });
    if (user) {
      return generateError(400, "This Email Is Already Used");
    }
    const userRole = role || "User";
    const newUser = await userModel.create({
      name: name,
      email: email,
      password: password,
      role: userRole,
    });

    return {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    };
  },

  getByEmail: async (email) => {
    
      const user = await userModel.findOne({
        where: { email: email },
        attributes: [
          "id",
          "name",
          "email",
          "role",
          "password",
          "createdAt",
          "updatedAt",
        ],
      });
      return user ? user : null;
  },
};


 // Another way for updating a user//

    // user.name = name || user.name;
    // user.email = email || user.email;
    // user.password = hashedPassword;
    // user.role = role || user.role;
    // await user.save();