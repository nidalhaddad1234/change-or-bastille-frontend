import axios from "axios";
import { toast } from "react-toastify";
import { getClaimValue, getClaims, getToken } from "./auth/handleJWT";

const baseURL = process.env.REACT_APP_API_URL;
axios.defaults.baseURL = baseURL;

function toastError(error, config) {
  if (config.url.indexOf("users") > -1) return;
  toast.error(error, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}

axios.interceptors.response.use(
  async (response) => {
    if (
      response.data.message &&
      response.data.message === "Success" &&
      window.location.href.indexOf("admin") > -1 &&
      response.config.method !== "get"
    ) {
      toast.success(response.data.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    return response;
  },
  (error) => {
    const { data, status, config } = error.response;

    if (window.location.href.indexOf("admin") == -1 || config.method === "get")
      return error.response;
    switch (status) {
      case 400:
        if (data) {
          toastError(data.message, config);
        }
        break;
      case 401:
        toastError("Unauthorized", config);
        break;
      case 404:
        throw error.response;
      case 500:
        toastError("Server Error", config);
        break;
    }
    return Promise.reject(error);
  },
);

axios.interceptors.request.use(
  function (config) {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

const responseBody = (response) => response.data;

const requests = {
  get: (url) => axios.get(url).then(responseBody),
  post: (url, body) => axios.post(url, body).then(responseBody),
  put: (url, body) => axios.put(url, body).then(responseBody),
  del: (url, body) => axios.delete(url, body).then(responseBody),
};

const account = {
  list: () => requests.get("/users/getAll"),
  getById: (id) => requests.get("/users/getById/" + id),
  getUserIdentity: (id) => requests.get("/users/getUserIdentity/" + id),
  resetPassword: (currentPassword, newPassword, email) =>
    requests.post("/users/resetPassword", {
      currentPassword: currentPassword,
      newPassword: newPassword,
      email: email,
    }),
  forgotPasswordEmail: (email) =>
    requests.post("users/forgotPasswordEmail", { email: email }),
  forgotPassword: (token, newPassword) =>
    requests.post("/users/forgotPassword/" + token, {
      newPassword: newPassword,
    }),
  logIn: (email, pass) =>
    requests.post("/users/login", { email: email, password: pass }),
  Register: (
    town,
    password,
    firstName,
    lastName,
    company,
    dateOfBirth,
    portablePhone,
    secondPhone,
    address,
    postalCode,
    country,
    email,
    civilite,
    token,
  ) => {
    return requests.post("/users/register", {
      username: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      company: company,
      town: town,
      dateOfBirth: dateOfBirth,
      portablePhone: portablePhone,
      secondPhone: secondPhone,
      address: address,
      postalCode: postalCode,
      country: country,
      email: email,
      civilite: civilite,
      token: token,
    });
  },
  editAccount: (
    town,
    firstName,
    lastName,
    company,
    dateOfBirth,
    portablePhone,
    secondPhone,
    address,
    postalCode,
    country,
    civilite,
    id,
  ) => {
    return requests.post("/users/edit/" + id, {
      firstName: firstName,
      lastName: lastName,
      company: company,
      town: town,
      dateOfBirth: dateOfBirth,
      portablePhone: portablePhone,
      secondPhone: secondPhone,
      address: address,
      postalCode: postalCode,
      country: country,
      civilite: civilite,
    });
  },

  Submit: async (name, lastName, email, object, subject, token) => {
    return requests.post("/users/contact", {
      name: name,
      lastName: lastName,
      email: email,
      object: object,
      subject: subject,
      token: token,
    });
  },
  VerifyIdentity: async (images, id) => {
    var bodyFormData = new FormData();
    images.forEach((element) => {
      bodyFormData.append("files", element);
    });
    bodyFormData.append("id", id);

    return requests.post("/users/verifyIdentity/" + id, bodyFormData);
  },
  updateIdentityStatus: async (status, id) => {
    return requests.post("/users/updateIdentityStatus/" + id, {
      status: status,
    });
  },
};
const currencies = {
  Create: (
    iso,
    moneyName,
    currencyName,
    bills,
    sellPrice,
    isVisible,
    topText,
    bottomText,
    coefficient,
    isFeatured,
    title,
    description,
  ) =>
    requests.post("/currency/addCurrency", {
      moneyName: moneyName,
      currencyName: currencyName,
      iso: iso,
      bills: bills,
      sellPrice: sellPrice,
      isVisible: isVisible,
      topText: topText,
      bottomText: bottomText,
      coefficient: coefficient,
      isFeatured: isFeatured,
      title,
      description,
    }),
  Edit: (
    iso,
    moneyName,
    currencyName,
    bills,
    sellPrice,
    id,
    isVisible,
    topText,
    bottomText,
    coefficient,
    isFeatured,
    title,
    description,
  ) =>
    requests.put("/currency/editCurrency", {
      id: id,
      moneyName: moneyName,
      currencyName: currencyName,
      iso: iso,
      bills: bills,
      sellPrice: sellPrice,
      isVisible: isVisible,
      topText: topText,
      bottomText: bottomText,
      coefficient: coefficient,
      isFeatured: isFeatured,
      title,
      description,
    }),
  Delete: (id) => requests.del("/currency/deleteCurrency/" + id),
  list: (isVisible) => requests.get("/currency/getCurrencies/" + isVisible),
  getCurrencyById: (id) => requests.get("/currency/getCurrencyById/" + id),
  listIsFeaturedCurrencies: () =>
    requests.get("/currency/getIsFeaturedCurrencies"),
  upadteBillDetails: (id, bill, image, image2) => {
    var bodyFormData = new FormData();
    bodyFormData.append("files", image);
    bodyFormData.append("files", image2);
    bodyFormData.append("id", id);
    bodyFormData.append("name", bill.name);
    bodyFormData.append("description", bill.description);
    bodyFormData.append("photo", bill.photo);
    bodyFormData.append("photo2", bill.photo2);

    return requests.post("/currency/upadteBillDetails", bodyFormData);
  },
};
const metals = {
  Create: async (
    metalName,
    weight,
    diameter,
    purity,
    mintingStart,
    mintingEnd,
    countryIssuing,
    photo,
    textInfo,
    netSellPrice,
    grossBuyPrice,
    fabricant,
    isVisable,
    type,
    isFeatured,
    title,
    description,
  ) => {
    return requests.post("/metal/addMetal", {
      metalName: metalName,
      weight: weight,
      diameter: diameter,
      purity: purity,
      mintingStart: mintingStart,
      mintingEnd: mintingEnd,
      countryIssuing: countryIssuing,
      photo: photo,
      textInfo: textInfo,
      netSellPrice: netSellPrice,
      grossBuyPrice: grossBuyPrice,
      fabricant: fabricant,
      isVisable: isVisable,
      type: type,
      isFeatured: isFeatured,
      title,
      description,
    });
  },
  Edit: (
    metalName,
    weight,
    diameter,
    purity,
    mintingStart,
    mintingEnd,
    countryIssuing,
    photo,
    textInfo,
    netSellPrice,
    grossBuyPrice,
    fabricant,
    isVisable,
    type,
    isFeatured,
    id,
    title,
    description,
  ) =>
    requests.put("/metal/editMetal", {
      metalName: metalName,
      weight: weight,
      diameter: diameter,
      purity: purity,
      mintingStart: mintingStart,
      mintingEnd: mintingEnd,
      countryIssuing: countryIssuing,
      photo: photo,
      textInfo: textInfo,
      netSellPrice: netSellPrice,
      grossBuyPrice: grossBuyPrice,
      fabricant: fabricant,
      isVisable: isVisable,
      type: type,
      isFeatured: isFeatured,
      id: id,
      title,
      description,
    }),
  Delete: (id) => requests.del("/metal/deleteMetal/" + id),
  list: (isVisible) => requests.get("/metal/getMetal/" + isVisible),
  Search: (text) => requests.get("/metal/search/" + text),
  listByType: (type) => requests.get("/metal/getMetalsByType/" + type),
  listFeaturedMetals: () => requests.get("/metal/getFeaturedMetals"),
  getMetalById: (id) => requests.get("/metal/getMetalById/" + id),
  uploadMetalImage: (image, id) => {
    var bodyFormData = new FormData();
    bodyFormData.append("file", image);
    bodyFormData.append("id", id);
    requests.post("/metal/uploadImage", bodyFormData);
  },
};
const news = {
  Create: async (title, description, isVisible) => {
    return requests.post("/news/addNews", {
      title: title,
      description: description,
      isVisible: isVisible,
    });
  },
  getAllNewsLetterMembers: () => requests.get("/news/getAllNewsLetterMembers"),
  unsubscribeFromNewsLetter: (token) =>
    requests.post("/news/unsubscribeFromNewsletter", {
      token: token,
    }),
  Edit: (title, description, isVisible, id) =>
    requests.put("/news/editNews", {
      title: title,
      description: description,
      isVisible: isVisible,
      newsId: id,
    }),
  Delete: (newsId) => requests.del("/news/deleteNews/" + newsId),
  list: (isVisible) => requests.get("/news/getNews/" + isVisible),
  getById: (id) => requests.get("/news/getNewsById/" + id),
  addToNewsLetter: (email) =>
    requests.post("/news/subscribe", { email: email }),
  sendNewsLetter: () => requests.post("/news/sendNewsletterEmail"),
  uploadNewsImage: (image, id) => {
    var bodyFormData = new FormData();
    bodyFormData.append("file", image);
    bodyFormData.append("id", id);
    requests.post("/news/uploadImage", bodyFormData);
  },
};
const configuration = {
  Edit: (offers, carrates22, carrates18, carrates14, id) =>
    requests.put("/configuration/editConfiguration/" + id, {
      offers: offers,
      carrates22: carrates22,
      carrates18: carrates18,
      carrates14: carrates14,
      newsId: id,
    }),
  add: (offers, carrates22, carrates18, carrates14) =>
    requests.post("/configuration/addConfiguration", {
      offers: offers,
      carrates22: carrates22,
      carrates18: carrates18,
      carrates14: carrates14,
    }),
  list: () => requests.get("/configuration/getLastConfiguration"),
};

const seo = {
  upSert: (main, rachatBijoux, bills, investment, collection, ingot) =>
    requests.post("/seo/upsert", {
      main,
      rachatBijoux,
      bills,
      investment,
      collection,
      ingot,
    }),
  getAllSeo: () => requests.get("/seo/getSeoData"),
  getByPage: (name) => requests.get("/seo/getSeoPage/" + name),
};
const reserves = {
  add: (email, desiredPrice, type, typeId) =>
    requests.post("/reserve/addReserve", {
      email: email,
      desiredPrice: desiredPrice,
      type: type,
      typeId: typeId,
    }),
  newPriceUpdate: (typeId, newPrice) =>
    requests.post("/reserve/newPriceUpdate", {
      typeId: typeId,
      newPrice: newPrice,
    }),
  list: () => requests.get("/reserve/getReserves"),
};
const orders = {
  add: (Items, paymentType, mac, amount, orderNumber, deliveryCost) =>
    requests.post("/order/addOrder", {
      Items: Items,
      paymentType: paymentType,
      mac: mac,
      amount: amount,
      orderNumber: orderNumber,
      deliveryCost: deliveryCost,
    }),
  list: () => requests.get("/order/getAllOrders"),
  getOrderById: (orderId) => requests.get("/order/getOrderById/" + orderId),
  getOrderByUserId: () => requests.get("/order/getOrderByUserId"),
  updateOrderStatus: (orderStatus, id, trackingNumber) =>
    requests.put("order/updateOrderStatus", {
      orderId: id,
      status: orderStatus,
      trackingNumber: trackingNumber,
    }),
  updatePaymentStatus: (orderStatus, id) =>
    requests.put("order/updatePaymentStatus", {
      orderId: id,
      status: orderStatus,
    }),
  deleteOrder: (id) => requests.del(`order/deleteOrder/${id}`),
  createOrderFormData: (amountToPay) =>
    requests.post("order/createOrderFormData", { amountToPay: amountToPay }),
  callback: (test) => requests.post("order/callBackOrder", { test: test }),
  sendManualOrderEmail: (orderId) =>
    requests.post("order/sendManualOrderEmail", { orderId: orderId }),
};
const agent = {
  account,
  currencies,
  metals,
  news,
  configuration,
  reserves,
  seo,
  orders,
};
export default agent;
