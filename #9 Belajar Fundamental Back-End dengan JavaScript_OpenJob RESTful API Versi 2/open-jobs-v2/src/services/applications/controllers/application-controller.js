import { InvariantError, NotFoundError } from "../../../exceptions/index.js";
import response from "../../../utils/response.js";
import applicationRepository from "../repositories/application-repository.js";
import NotificationService from "../producers/notification-service.js";

export const create = async (req, res, next) => {
  const { user_id, job_id, status } = req.validated;

  await applicationRepository.verifyApplication(user_id, job_id);

  const application = await applicationRepository.create({ user_id, job_id, status });

  const message = {
    applicationId: application.id,
  };

  await NotificationService.sendMessage("notification:applications", JSON.stringify(message));

  return response(res, 201, "Application berhasil ditambahkan", {
    id: application.id,
    user_id: application.user_id,
    job_id: application.job_id,
    status: application.status,
  });
};

export const findAll = async (req, res, next) => {
  const applications = await applicationRepository.findAll();
  return response(res, 200, "Applications berhasil ditampilkan", { applications });
};

export const findById = async (req, res, next) => {
  const { id } = req.params;
  const { application, source } = await applicationRepository.findById(id);
  if (!application) {
    return next(new NotFoundError("Application tidak ditemukan"));
  }
  res.setHeader("X-Data-Source", source);
  return response(res, 200, "Application berhasil ditampilkan", {
    id: application.id,
    user_id: application.user_id,
    job_id: application.job_id,
    status: application.status,
  });
};

export const findByUser = async (req, res, next) => {
  const { id } = req.params;
  const { applications, source } = await applicationRepository.findByUser(id);
  if (!applications) {
    return next(new NotFoundError("Application tidak ditemukan"));
  }
  res.setHeader("X-Data-Source", source);
  return response(res, 200, "Application berhasil ditampilkan", { applications });
};

export const findByJob = async (req, res, next) => {
  const { id } = req.params;
  const { applications, source } = await applicationRepository.findByJob(id);
  if (!applications) {
    return next(new NotFoundError("Application tidak ditemukan"));
  }
  res.setHeader("X-Data-Source", source);
  return response(res, 200, "Application berhasil ditampilkan", { applications });
};

export const update = async (req, res, next) => {
  const { id } = req.params;
  const applicationData = req.validated;

  const application = await applicationRepository.update(id, applicationData);
  if (!application) {
    return next(new NotFoundError("Application tidak ditemukan"));
  }
  return response(res, 200, "Application berhasil diperbarui", {
    id: application.id,
    status: applicationData.status,
  });
};

export const destroy = async (req, res, next) => {
  const { id } = req.params;

  const application = await applicationRepository.delete(id);
  if (!application) {
    return next(new NotFoundError("Application tidak ditemukan"));
  }
  return response(res, 200, "Application berhasil dihapus", {
    id: application.id,
  });
};
