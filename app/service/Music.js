const { Service } = require('egg');
const fs = require('fs');
const path = require("path")

const dayjs = require('dayjs');
class MusicService extends Service {
  async getList(getListData = {}) {
    const { ctx } = this;
    let result
    const { currentPage = 1, pageSize = 10 } = getListData
    let res = await this.ctx.model.Music.findAndCountAll({
      limit: pageSize,
      offset: pageSize * (currentPage - 1),
    })
    // .then(async res => {
    for (let i = 0; i < res.rows.length; i++) {
      if (res.rows[i].lyric_src) {
        const rowData = JSON.parse(JSON.stringify(res.rows[i]))
        let src = rowData.lyric_src.slice(rowData.lyric_src.indexOf('/public/upload'))
        const target = path.join(this.config.baseDir, 'app/', src)
        // 将文本读取到一个buffer中
        const buffer = fs.readFileSync(target);
        // 由于Windows下文件默认编码为GBK所以需要通过
        const iconv = require('iconv-lite');
        const content2 = iconv.decode(buffer, 'gbk');
        // res.rows[i].lyric_data = content2
        res.rows[i].dataValues.lyric_data = content2
      }
    }
    console.log(res)
    result = res
    // }).catch(err => {
    //   console.log(err)
    // })
    return result
  }

  async get(id) {
    const { ctx } = this;
    const result = await ctx.model.Music.findOne({
      where: {
        id,
      }
    });
    return result;
  }

  async edit(data = {}, id) {
    const { ctx } = this;
    ctx.model.Music.update({
      ...data
    }, {
      where: {
        id,
      }
    });
  }

  async create(data = {}) {
    const { ctx } = this;
    const result = {};
    const res = await ctx.model.Music.create({
      ...data
    });
    if (res) {
      result.id = res.id;
    }
    return result;
  }

  async update(data = {}, id) {
    const { ctx } = this;
    ctx.model.Music.update({
      ...data
    }, {
      where: {
        id,
      }
    });
  }

  async destroy(id) {
    const { ctx } = this;
    ctx.model.Music.destroy({
      where: {
        id,
      }
    });
  }
}

module.exports = MusicService;