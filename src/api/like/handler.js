const ClientError = require('../../exception/ClientError');

class AlbumLikesHandler {
  constructor(albumLikesService, albumsService) {
    this._albumLikeService = albumLikesService;
    this._albumsService = albumsService;

    this.postLikeAlbumHandler = this.postLikeAlbumHandler.bind(this);
    this.getLikesCountHandler = this.getLikesCountHandler.bind(this);
  }

  async postLikeAlbumHandler(request, h) {
    try {
      const { id: albumId } = request.params;
      const { id: userId } = request.auth.credentials;

      await this._albumsService.checkIfAlbumExist(albumId);

      const liked = await this._albumLikeService.verifyAlbumLikeByUser(userId, albumId);

      if (!liked) {
        await this._albumLikeService.likeToAlbum(userId, albumId);
        const response = h.response({
          status: 'success',
          message: 'Like berhasil ditambahkan',
        });
        response.code(201);
        return response;
      }

      await this._albumLikeService.unlikeFromAlbum(userId, albumId);
      const response = h.response({
        status: 'success',
        message: 'Like berhasil dibatalkan',
      });
      response.code(201);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  async getLikesCountHandler(request, h) {
    try {
      const { id: albumId } = request.params;
      const likesCount = await this._albumLikeService.getAlbumLikesCount(albumId);

      const response = h.response({
        status: 'success',
        data: {
          likes: likesCount.count,
        },
      });
      response.header('X-Data-Source', likesCount.source);
      response.code(200);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }
}

module.exports = AlbumLikesHandler;
