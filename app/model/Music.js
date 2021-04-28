const dayjs = require('dayjs');

module.exports = app => {
    const { INTEGER, DATE, STRING, ENUM } = app.Sequelize;
    const Music = app.model.define('music', {
        id: { type: INTEGER(11), primaryKey: true, autoIncrement: true },
        // type: { type: ENUM('流行', '摇滚', '民谣', '电子', '舞曲', '爵士', '说唱', '轻音乐', '古典', '乡村', '民族', '英伦', '古风'), defaultValue: '流行', allowNull: true },
        name: { type: STRING(255), allowNull: false },
        cover: { type: STRING },//封面
        rank: { type: INTEGER, allowNull: false }, //排行
        singer: { type: STRING }, //歌手
        album: { type: STRING }, //专辑
        song_src: { type: STRING, allowNull: false }, //歌曲上传路径
        lyric_src: { type: STRING },//歌词上传路径
        created_at: { type: DATE, allowNull: false, get() { return dayjs(this.getDataValue('created_at')).format('YYYY-MM-DD HH:mm:ss'); } },
        updated_at: { type: DATE, allowNull: false, get() { return dayjs(this.getDataValue('updated_at')).format('YYYY-MM-DD HH:mm:ss'); } },
    }, {
        paranoid: true,
        timestamps: true,
    });

    return Music;
}