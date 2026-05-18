import { InvariantError, NotFoundError } from "../../../exceptions/index.js";
import response from "../../../utils/response.js";
import CompanyRepository from "../repositories/company-repository.js";

export const create = async (req, res, next) => {
  const { name, location, description } = req.validated;

  const company = await CompanyRepository.create({ name, location, description });

  if (!company) {
    return next(new InvariantError("Company gagal ditambahkan"));
  }

  return response(res, 201, "Company berhasil ditambahkan", { id: company.id });
};

export const findAll = async (req, res, next) => {
  const companies = await CompanyRepository.findAll();
  return response(res, 200, "Companies berhasil ditampilkan", { companies });
};

export const findById = async (req, res, next) => {
  const { id } = req.params;
  const company = await CompanyRepository.findById(id);

  if (!company) {
    return next(new NotFoundError("Company tidak ditemukan"));
  }

  const mappedCompany = {
    id: company.id,
    name: company.name,
  };

  return response(res, 200, "Company berhasil ditampilkan", mappedCompany);
};

export const update = async (req, res, next) => {
  const { id } = req.params;
  const { name, location, description } = req.validated;

  const company = await CompanyRepository.update({ id, name, location, description });
  if (!company) {
    return next(new NotFoundError("Company tidak ditemukan"));
  }

  return response(res, 200, "Company berhasil diperbarui", { id: company.id });
};

export const destroy = async (req, res, next) => {
  const { id } = req.params;

  const companyId = await CompanyRepository.delete(id);

  if (!companyId) {
    return next(new NotFoundError("Company tidak ditemukan"));
  }

  return response(res, 200, "Company berhasil dihapus", { id: companyId });
};
