export const SITE_NAME = "Connect Nest"


export const BASE_URL = "https://secure.demo243.webhostlabs.net:3004/api"
export const UPLOAD_URL = "https://secure.demo243.webhostlabs.net:3004/uploads"

export const AUTH = {
    signin: "/admin/auth/signin",
    logout: "/auth/logout",
  };

  export const USERS = {
    get: "/users/admin",
    getOne: "/users/getById/",
    toggleStatus: "/users/toggleActiveInActive",
  };

  export const SERVICE_PROVIDERS = {
    get: "/users/admin/serviceProvider",
    getOne: "/users/getSpById/",
    toggleStatus: "/users/toggleActiveInActive",
  };

  export const CATEGORIES = {
    get: "/category/GetAllCategoriesNew",
    getOne: "/category/admin/",
    toggleStatus: "/category/toggleActiveInActive",
    edit:"/category/edit/",
  };

  export const FEEDBACK = {
    get: "/contact",
    getOne: "/contact/feedbackById/",
  };


  export const SUBSCRIPTION = {
    get: "/Plan",
    create:"/Plan",
    getOne: "/Plan/",
    edit: "/Plan/edit",
  };


  export const PAYMENT = {
    get: "/payment",
    getOne: "/payment/",
  };

  export const NOTIFICATION = {
    get: "/notification/getAllAlertsAndNotifications",
    getOne: "/notification/notificationDetail/",
    create: "/notification/createAlertOrAnnoucement",
  };
  
  export const QUERY = {
    get: "/query",
    getOne: "/query/queryById/",
  };

  export const ARTICLE = {
    get: "/article/getAllArticles",
    getOne: "/article/getArticleById/",
    add: "/article/addArticle",
    edit: "/article/updateArticle/",
    delete:"/article/deleteArticle/",
  };


  export const ARTICLECATEGORIES = {
    get: "/articleCategory/getAllArticleCategories",
    getOne: "/articleCategory/getArticleCategoryById/",
    add: "/articleCategory/addArticleCategory",
    edit: "/articleCategory/updateArticleCategory/",
    delete:"/articleCategory/deleteArticelCategory/",
  };
