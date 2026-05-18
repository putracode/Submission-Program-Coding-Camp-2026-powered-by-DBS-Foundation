import response from "../../../utils/response.js";
import profileRepository from "../repositories/profile-repository.js";
import { NotFoundError } from "../../../exceptions/index.js";

export const findProfile = async (req, res, next) => {
  const { id: user_id } = req.user;

  const profile = await profileRepository.findById(user_id);

  if (!profile) {
    return next(new NotFoundError("User tidak ditemukan")); 
  }

  const { password, ...userProfile } = profile;

  return response(res, 200, "Profile berhasil ditampilkan", userProfile);
};
export const findApplications = async (req, res, next) => {
  const { id: user_id } = req.user;

  const applications = await profileRepository.findApplications(user_id);

  return response(res, 200, "Applications berhasil ditampilkan", { applications });
};
export const findBookmarks = async (req, res, next) => {
  const { id: user_id } = req.user;

  const bookmarks = await profileRepository.findBookmarks(user_id);

  return response(res, 200, "Bookmarks berhasil ditampilkan", { bookmarks });
};
