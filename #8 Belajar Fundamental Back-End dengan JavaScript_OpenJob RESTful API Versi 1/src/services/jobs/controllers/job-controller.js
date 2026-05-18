import response from "../../../utils/response.js";
import { InvariantError, NotFoundError } from "../../../exceptions/index.js";
import JobRepository from "../repositories/job-repository.js";

export const create = async (req, res, next) => {
  const jobData = req.validated;
  const job = await JobRepository.create(jobData);

  if (!job) {
    return next(new InvariantError("Job gagal ditambahkan"));
  }

  return response(res, 201, "Job berhasil ditambahkan", { id: job.id });
};

export const findAll = async (req, res, next) => {
  const { title, category, 'company-name' : company, location } = req.query;
  const jobs = await JobRepository.findAll({ title, category, company, location });

  return response(res, 200, "Jobs berhasil ditampilkan", { jobs });
};


export const findById = async (req, res, next) => {
  const { id } = req.params;
  const job = await JobRepository.findById(id);

  if (!job) {
    return next(new NotFoundError("Job tidak ditemukan"));
  }

  return response(res, 200, "Job berhasil ditampilkan", { id: job.id, title: job.title });
};

export const findByCompany = async (req, res, next) => {
  const { id } = req.params;
  const jobs = await JobRepository.findByCompany(id);

  if (!jobs) {
    return next(new NotFoundError("Job tidak ditemukan"));
  }

  return response(res, 200, "Job berhasil ditampilkan", { jobs });
};

export const findByCategory = async (req, res, next) => {
  const { id } = req.params;
  const jobs = await JobRepository.findByCategory(id);

  if (!jobs) {
    return next(new NotFoundError("Job tidak ditemukan"));
  }

  return response(res, 200, "Job berhasil ditampilkan", {jobs});
};

export const update = async (req, res, next) => {
  const { id } = req.params;
  const jobData = req.validated;
  const job = await JobRepository.update(id, jobData);

  if (!job) {
    return next(new NotFoundError("Job tidak ditemukan"));
  }

  return response(res, 200, "Job berhasil diperbarui", { id: job.id });
};

export const destroy = async (req, res, next) => {
  const { id } = req.params;
  const job = await JobRepository.delete(id);

  if (!job) {
    return next(new NotFoundError("Job tidak ditemukan"));
  }

  return response(res, 200, "Job berhasil dihapus", { id: job.id });
};
