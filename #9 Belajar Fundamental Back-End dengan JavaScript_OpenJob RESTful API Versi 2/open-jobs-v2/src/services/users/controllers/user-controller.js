import response from "../../../utils/response.js";
import UserRepository from "../repositories/user-repository.js";
import { InvariantError, NotFoundError } from "../../../exceptions/index.js";

export const create = async (req, res, next) => {
  const { name, email, password, role } = req.validated;

  const isEmailExist = await UserRepository.verifyEmail(email);
  if (isEmailExist) {
    return next(new InvariantError("Gagal menambahkan user. Email sudah digunakan."));
  }

  const user = await UserRepository.create({
    name,
    email,
    password,
    role,
  });

  if (!user) {
    return next(new InvariantError("User gagal ditambahkan"));
  }

  return response(res, 201, "User berhasil ditambahkan", { id: user.id });
};

export const findById = async (req, res, next) => {
  const { id } = req.params;
  const { user, source } = await UserRepository.findById(id);

  if (!user) {
    return next(new NotFoundError("User tidak ditemukan"));
  }

  res.setHeader("X-Data-Source", source);
  return response(res, 200, "User berhasil ditampilkan", { id: user.id, name: user.name });
};
