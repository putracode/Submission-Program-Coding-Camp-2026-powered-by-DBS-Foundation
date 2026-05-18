import path from "path";
import { ClientError, NotFoundError } from "../../../exceptions/index.js";
import response from "../../../utils/response.js";
import DocumentRepository from "../repositories/document-repository.js";
import { UPLOAD_FOLDER } from "../storage/storage-config.js";

export const uploadDocuments = async (req, res, next) => {
  if (!req.file) {
    return next(new ClientError("File is required"));
  }

  const { id: userId } = req.user;
  const { filename, originalname: originalName, size } = req.file;

  const document = await DocumentRepository.create({
    filename,
    originalName,
    size,
    userId,
  });

  const host = process.env.HOST || "localhost";
  const port = process.env.PORT || 3000;

  const encodeFileName = encodeURIComponent(filename);
  const fileLocation = `http://${host}:${port}/uploads/${encodeFileName}`;

  return response(res, 201, "Document berhasil diupload", {
    documentId: document.id,
    filename: document.filename,
    originalName: document.original_name,
    size: document.size,
  });
};

export const findAll = async (req, res, next) => {
  const result = await DocumentRepository.findAll();
  const documents = result.map((doc) => ({
    documentId: doc.id,
    filename: doc.filename,
    originalName: doc.original_name,
    size: doc.size,
  }));
  return response(res, 200, "Document berhasil ditampilkan", { documents });
};

export const findById = async (req, res, next) => {
  const { id } = req.params;
  const document = await DocumentRepository.findById(id);

  if (!document) {
    throw new NotFoundError("Document tidak ditemukan");
  }

  const filePath = path.join(UPLOAD_FOLDER, document.filename);
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `inline; filename="${document.originalName}"`);
  return res.sendFile(filePath);
};

export const destroy = async (req, res, next) => {
  const { id } = req.params;
  const document = await DocumentRepository.destroy(id);

  if (!document) {
    return next(new NotFoundError("Document tidak ditemukan"));
  }

  return response(res, 200, "Document berhasil dihapus");
};
