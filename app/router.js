/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app
  const isLogin = middleware.verifyToken()

  /** ************* admin接口请求路由 ***************/
  require("./router/system_API")(app, isLogin)

  /** ************* 页面请求路由 ***************/
  router.get("/index", controller.home.index)

  /** ************* 接口请求路由 ***************/
  // 发表文章
  router.post("/article/addArticle", isLogin, controller.article.addArticle)
  // 文章列表
  router.post("/article/articleList", isLogin, controller.article.articleList)
  // 文章修改回显
  router.post("/article/getArticle", isLogin, controller.article.getArticle)
  // 删除文章
  router.post("/article/delArticle", isLogin, controller.article.delArticle)
  // 图片上传
  router.post("/editor/uploadImg", controller.article.uploadImg)
  // 歌曲文件上传
  router.post("/song/upload", controller.music.uploadSong)
  // 歌曲列表
  router.get("/song/list", controller.music.index)
  // 添加歌曲
  router.post('/song/create', controller.music.create)
  // 删除歌曲
  router.delete('/song/destroy/:id', controller.music.destroy)
  // 编辑歌曲
  router.put('/song/update/:id', controller.music.update)
  // 歌词文件上传
  router.post("/lyric/upload", controller.music.uploadLyric)
  // 发表评论
  router.post("/comment/addComment", isLogin, controller.comment.addComment)
  // 回复评论
  router.post("/comment/replyComment", isLogin, controller.comment.replyComment)
  // 评论列表
  router.post("/comment/commentList", isLogin, controller.comment.commentList)
  // 删除评论
  router.post("/comment/delComment", isLogin, controller.comment.delComment)

  router.post("/wxLogin", controller.admin.login.wxLogin)
  router.post("/decryptData", controller.getShareInfo.decryptData)

}
