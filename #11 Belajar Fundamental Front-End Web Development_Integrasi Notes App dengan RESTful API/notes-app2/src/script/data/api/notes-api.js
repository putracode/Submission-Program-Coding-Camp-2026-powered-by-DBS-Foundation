const BASE_URL = 'https://notes-api.dicoding.dev/v2';

class NotesApi {
  static async getNotes() {
    try {
      const response = await fetch(`${BASE_URL}/notes`);
      const responseJson = await response.json();

      if (responseJson.status !== 'success') {
        throw new Error(responseJson.message || 'Gagal mengambil data catatan.');
      }

      return responseJson.data;
    } catch (error) {
      throw error;
    }
  }

  static async getArchivedNotes() {
    try {
      const response = await fetch(`${BASE_URL}/notes/archived`);
      const responseJson = await response.json();

      if (responseJson.status !== 'success') {
        throw new Error(responseJson.message || 'Gagal mengambil data catatan arsip.');
      }

      return responseJson.data;
    } catch (error) {
      throw error;
    }
  }

  static async createNote({ title, body }) {
    try {
      const response = await fetch(`${BASE_URL}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, body }),
      });
      const responseJson = await response.json();

      if (responseJson.status !== 'success') {
        throw new Error(responseJson.message || 'Gagal membuat catatan baru.');
      }

      return responseJson.data;
    } catch (error) {
      throw error;
    }
  }

  static async deleteNote(id) {
    try {
      const response = await fetch(`${BASE_URL}/notes/${id}`, {
        method: 'DELETE',
      });
      const responseJson = await response.json();

      if (responseJson.status !== 'success') {
        throw new Error(responseJson.message || 'Gagal menghapus catatan.');
      }

      return responseJson.message;
    } catch (error) {
      throw error;
    }
  }

  static async archiveNote(id) {
    try {
      const response = await fetch(`${BASE_URL}/notes/${id}/archive`, {
        method: 'POST',
      });
      const responseJson = await response.json();

      if (responseJson.status !== 'success') {
        throw new Error(responseJson.message || 'Gagal mengarsipkan catatan.');
      }

      return responseJson.message;
    } catch (error) {
      throw error;
    }
  }

  static async unarchiveNote(id) {
    try {
      const response = await fetch(`${BASE_URL}/notes/${id}/unarchive`, {
        method: 'POST',
      });
      const responseJson = await response.json();

      if (responseJson.status !== 'success') {
        throw new Error(responseJson.message || 'Gagal mengaktifkan catatan dari arsip.');
      }

      return responseJson.message;
    } catch (error) {
      throw error;
    }
  }
}

export default NotesApi;
