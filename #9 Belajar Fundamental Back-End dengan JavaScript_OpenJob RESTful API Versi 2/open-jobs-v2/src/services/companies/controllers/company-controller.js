import { InvariantError, NotFoundError } from "../../../exceptions/index.js";
import response from "../../../utils/response.js";
import CompanyRepository from "../repositories/company-repository.js";

export const create = async (req, res, next) => {
  const { name, location, description } = req.validated;
  const { id: userId } = req.user;

  const company = await CompanyRepository.create({ name, user_id: userId, location, description });

  if (!company) {
    return next(new InvariantError("Company gagal ditambahkan"));
  }

  return response(res, 201, "Company berhasil ditambahkan", { id: company.id });
};

export const findAll = async (req, res, next) => {
  const { companies, source } = await CompanyRepository.findAll();

  res.setHeader("X-Data-Source", source);
  const filteredCompanies = companies.map((company) => {
    const { user_id, ...companyData } = company;
    return companyData;
  });
  return response(res, 200, "Companies berhasil ditampilkan", { companies:  filteredCompanies });
};

export const findById = async (req, res, next) => {
  const { id } = req.params;
  const { company, source } = await CompanyRepository.findById(id);

  if (!company) {
    return next(new NotFoundError("Company tidak ditemukan"));
  }

  res.setHeader("X-Data-Source", source);
  return response(res, 200, "Company berhasil ditampilkan", { id: company.id, name: company.name });
};

export const update = async (req, res, next) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const { name, location, description } = req.validated;

  await CompanyRepository.verifyCompanyOwner(id, userId);

  const company = await CompanyRepository.update({ id, name, location, description });
  if (!company) {
    return next(new NotFoundError("Company tidak ditemukan"));
  }

  return response(res, 200, "Company berhasil diperbarui", { id: company.id, name: company.name });
};

export const destroy = async (req, res, next) => {
  const { id } = req.params;
  const { id: userId } = req.user;

  await CompanyRepository.verifyCompanyOwner(id, userId);

  const companyId = await CompanyRepository.delete(id);

  if (!companyId) {
    return next(new NotFoundError("Company tidak ditemukan"));
  }

  return response(res, 200, "Company berhasil dihapus", { id: companyId });
};
