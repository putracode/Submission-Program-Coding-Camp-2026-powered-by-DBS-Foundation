import { InvariantError, NotFoundError } from "../../../exceptions/index.js";
import bookmarkRepository from "../repositories/bookmark-repository.js";
import response from "../../../utils/response.js";

export const create = async (req, res, next) => {
  const { id: user_id } = req.user;
  const { jobId: job_id } = req.params;
  const bookmark = await bookmarkRepository.create(user_id, job_id);

  if (!bookmark) {
    return next(new InvariantError("Bookmark gagal ditambahkan"));
  }

  return response(res, 201, "Bookmark berhasil ditambahkan", { id: bookmark.id });
};

export const findAll = async (req, res, next) => {
  const { id: user_id } = req.user;
  const { bookmarks, source } = await bookmarkRepository.findAll(user_id);
  res.setHeader("X-Data-Source", source);
  return response(res, 200, "Bookmarks berhasil ditampilkan", { bookmarks });
};

export const findById = async (req, res, next) => {
  const { id } = req.params;
  const bookmark = await bookmarkRepository.findById(id);
  if (!bookmark) {
    return next(new NotFoundError("Bookmark tidak ditemukan"));
  }
  return response(res, 200, "Bookmark berhasil ditampilkan", { id: bookmark.id });
};

export const destroy = async (req, res, next) => {
  const { id: userId } = req.user;
  const { jobId } = req.params;
  const bookmark = await bookmarkRepository.delete(userId, jobId);

  if (!bookmark) {
    return next(new NotFoundError("Bookmark gagal dihapus"));
  }
  return response(res, 200, "Bookmark berhasil dihapus", { id: bookmark.id });
};
