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
  /* Creating a new method called loadByAuthor on the articlesController module and passing in two parameters
    of the context object and the "next" callback. Next it creates a new variable of authorData and creating
    another function that has a parameter of articlesByAuthor. Next we are setting the property of articles
    and setting equal to articlesByAuthor and then calling the "next" callback.
  */
  articlesController.loadByAuthor = function(ctx, next) {
    var authorData = function(articlesByAuthor) {
      ctx.articles = articlesByAuthor;
      next();
    };
    /*Next we are calling the findWhere method and passing in the three required arguments of 'author' as the
    "field" element, the value as the ctx.params element and the callback as authorData. Then it runs the
    webDB execute method  which uses SQL to select everything from the articles table where the "field"(author),
    element is equal to the ctx object just below and replacing the concatenation with a blank space and then
    running the "next" callback funtion we are calling authorData.
    */
    Article.findWhere('author', ctx.params.authorName.replace('+', ' '), authorData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  /*Creating a new method called loadByCategory on the articlesController module and passing in two parameters of the context object and next callback.
  We are creating a function and passing in parameter of articles in category. We are then setting the property of articles eqaul to articlesInCategory. 
  */
  articlesController.loadByCategory = function(ctx, next) {
    var categoryData = function(articlesInCategory) {
      ctx.articles = articlesInCategory;
      next();
    };
    /* Next we are calling the findWhere method and passing in the three required arguments of 'category' as the "fields" element,
	the value as the ctx.params element and the callback as categoryData. Then it runs the webDB execute method which uses SQL to select everything from the aricles table where the "field" ('category')
	element is equal to categoryName parameter to context object. 
	*/
    Article.findWhere('category', ctx.params.categoryName, categoryData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  /*We are creating a new method called loadAll on the articlesController module and creating a new function that passes in two parameters of ctx and next.
  We are then creating a new variable called ctx.articles which is equal to the artile.all array. Then we are calling the "next" callback.
  */
  articlesController.loadAll = function(ctx, next) {
    var articleData = function(allArticles) {
      ctx.articles = Article.all;
      next();
    };

	/* We are creating an if statement and checking to see if there is anything in Article.all. If there is anything we set article.all to the context.articles object.
	IF not we run the fetchAll method on the Article constructor and passing in a parameter of articleData.
	The fetchAll method on the Article constructor has a function with a paramater of callback and is a webDB method(excute) to select everything from the articles table in order by the pusblishedON description and
	then creating another callback function with a parameter of rows. We are then using an if statement to check if the rows has anything in them and then calling the loadAll method on the article constructor and 
	then passing in the rows and then running the callback that is defined the loadAll method on the articlesController module. If not we are doing a getJSON call  to find the data in the hackeripsum file and then creating
	a new callback function and passing in a parameter of rawData. Then we are Caching the json so we don't need to bring back in again. We are then instantiating each item on the new article from the json file. Then we are
	calling the insert record method on the Article constructor. 
	Finally we are accessing the insertRecord method on the prototype of the Article constructor. We are creating a function with a parameter of callback and then running webDbs execute method, which uses SQL. 
	the sql command says to insert into the articles table each element in the constructor and setting the valuse of each as the respected keys. Then calling the callback which is next in the articlesController method. 
	*/
    if (Article.all.length) {
      ctx.articles = Article.all;
      next();
    } else {
      Article.fetchAll(articleData);
    }
  };


  module.articlesController = articlesController;
})(window);
