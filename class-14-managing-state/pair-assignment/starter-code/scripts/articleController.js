(function(module) {
  var articlesController = {};

  Article.createTable();  // Ensure the database table is properly initialized

  articlesController.index = function(ctx, next) {
    articleView.index(ctx.articles);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  /*We are creating at the loadById method which is located in the articlesController module and we are
    creating a function and passing two parameters of the ctx(context) object and next(callback).
    Setting a new variable of articleData and creating a function that passes article as a parameter
    into it and then we are setting the property of articles onto the context object equal to article
    and then calling the "next" callback.
  */
  articlesController.loadById = function(ctx, next) {
    var articleData = function(article) {
      ctx.articles = article;
      next();
    };
    /*We are calling the findWhere method on the Article constructor which is defined in article.js as
      a function that has 3 arguments (field, value, callback) and then running a webDB SQL command
      that will select everything from the Articles table where the "field" element that we defined as
      "id" and it is being set equal to that instance (data: [value]) and being saved into the ctx.params.id
      and then it runs the callback "next()". 
    */
    Article.findWhere('id', ctx.params.id, articleData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  articlesController.loadByAuthor = function(ctx, next) {
    var authorData = function(articlesByAuthor) {
      ctx.articles = articlesByAuthor;
      next();
    };

    Article.findWhere('author', ctx.params.authorName.replace('+', ' '), authorData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  articlesController.loadByCategory = function(ctx, next) {
    var categoryData = function(articlesInCategory) {
      ctx.articles = articlesInCategory;
      next();
    };

    Article.findWhere('category', ctx.params.categoryName, categoryData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  //Apply a property of articles to the ctx object
  articlesController.loadAll = function(ctx, next) {
    var articleData = function(allArticles) {
      ctx.articles = Article.all;
      next();
    };

    if (Article.all.length) {
      ctx.articles = Article.all;
      next();
    } else {
      Article.fetchAll(articleData);
    }
  };


  module.articlesController = articlesController;
})(window);
