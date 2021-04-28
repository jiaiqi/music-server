const { Controller } = require('egg');

class MusicController extends Controller {
  /**
   * GET /api/Music
   */
  async index() {
    const { ctx } = this;
    const list = await this.ctx.service.music.getList()
    this.ctx.body = list
  }

  /**
   * GET /api/Music/:id
   */
  async show() {
    const { ctx } = this;
    const { id } = ctx.params;

    const response = {};
    try {
      const result = await ctx.service.music.get(id);
      response.data = result;
      response.success = true;
    } catch (err) {
      response.error = {
        message: err,
      };
      response.success = false;
    }
    ctx.body = response;
  }

  /**
   * GET /api/Music/:id/edit
   */
  async edit() {
    const { ctx } = this;
    const { id } = ctx.params;

    const response = {};
    try {
      await ctx.service.music.edit(ctx.query, id);
      response.success = true;
    } catch (err) {
      response.error = {
        message: err,
      };
      response.success = false;
    }
    ctx.body = response;
  }

  /**
   * POST /api/Music
   */
  async create() {
    const { ctx } = this;

    const response = {};
    try {
      const res = await ctx.service.music.create(ctx.request.body);
      response.data = res;
      response.success = true;
    } catch (err) {
      response.error = {
        message: err,
      };
      response.success = false;
    }
    ctx.body = response;
  }

  /**
   * PUT /api/Music/:id
   */
  async update() {
    const { ctx } = this;
    const { id } = ctx.params;

    const response = {};
    try {
      await ctx.service.music.update(ctx.request.body, id);
      response.success = true;
    } catch (err) {
      response.error = {
        message: err,
      };
      response.success = false;
    }
    ctx.body = response;
  }

  /**
   * DELETE /api/Music/:id
   */
  async destroy() {
    const { ctx } = this;
    const { id } = ctx.params;

    const response = {};
    try {
      await ctx.service.music.destroy(id);
      response.success = true;
    } catch (err) {
      response.error = {
        message: err,
      };
      response.success = false;
    }
    ctx.body = response;
  }

  /**
   * 上传歌曲文件
   */
  async uploadSong() {
    const songUrl = await this.ctx.helper.uploadSong()
    this.ctx.body = { errno: 0, data: [songUrl] }
  }

  /**
   * 上传歌词文件
   */
  async uploadLyric() {
    const lyricUrl = await this.ctx.helper.uploadLyric()
    this.ctx.body = { errno: 0, data: [lyricUrl] }
  }
}

module.exports = MusicController;
