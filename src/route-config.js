import { lazy } from "react";

// Lazy-loaded components
const SEO = lazy(() => import("./pages/admin/SEO"));
const OrderCompleted = lazy(() => import("./pages/client/cart/OrderCompleted"));
const NotAuthorized = lazy(() =>
  import("./sharedComponents/errors/NotAuthorized"),
);
const NotFound = lazy(() => import("./sharedComponents/errors/NotFound"));
const ServerError = lazy(() => import("./sharedComponents/errors/ServerError"));
const Index = lazy(() => import("./pages/admin/Index"));
const Forgotpassword = lazy(() =>
  import("./pages/admin/account/ForgotPassword"),
);
const Currencies = lazy(() => import("./pages/admin/Currencies/Currencies"));
const CreateCurrency = lazy(() =>
  import("./pages/admin/Currencies/CreateCurrency"),
);
const Overview = lazy(() => import("./pages/admin/Overview"));
const UpdateCurrency = lazy(() =>
  import("./pages/admin/Currencies/UpdateCurrency"),
);
const Metals = lazy(() => import("./pages/admin/metals/Metals"));
const CreateMetal = lazy(() => import("./pages/admin/metals/CreateMetal"));
const UpdateMetal = lazy(() => import("./pages/admin/metals/UpdateMetal"));
const IndexClient = lazy(() => import("./pages/client/IndexClient"));
const OverviewBills = lazy(() => import("./pages/client/bills/OverviewBills"));
const Contact = lazy(() => import("./pages/client/contact/Contact"));
const Connect = lazy(() => import("./pages/client/user/Connect"));
const ResetPassword = lazy(() => import("./pages/client/user/ResetPassword"));
const WhoAreWe = lazy(() => import("./pages/client/about/WhoAreWe"));
const SecuredOnlinePurchase = lazy(() =>
  import("./pages/client/about/SecuredOnlinePurchase"),
);
const DeliveryDelay = lazy(() => import("./pages/client/about/DeliveryDelay"));
const Desabonner = lazy(() => import("./pages/client/about/Desabonner"));

const ForgotPasswordClient = lazy(() =>
  import("./pages/client/user/ForgotPasswordClient"),
);
const LegalMentions = lazy(() => import("./pages/client/about/LegalMentions"));
const GeneralSellingConditions = lazy(() =>
  import("./pages/client/about/GeneralSellingConditions"),
);
const PersonalDetailsProtection = lazy(() =>
  import("./pages/client/about/PersonalDetailsProtection"),
);
const AntiLaunderingAntiTerrorism = lazy(() =>
  import("./pages/client/about/AntiLaunderingAntiTerrorism"),
);
const Address = lazy(() => import("./pages/client/about/Address"));
const OverviewBill = lazy(() => import("./pages/client/bills/OverviewBill"));
const InvestmentCoinsOverview = lazy(() =>
  import("./pages/client/investmentCoins/InvestmentCoinsOverview"),
);
const IngotsOverview = lazy(() => import("./pages/client/ingo/IngotsOverview"));
const ItemsCart = lazy(() => import("./pages/client/cart/ItemsCart"));
const ItemCart = lazy(() => import("./pages/client/cart/ItemCart"));
const FinishCart = lazy(() => import("./pages/client/cart/FinishCart"));
const InvestmentCoinOverview = lazy(() =>
  import("./pages/client/investmentCoins/InvestmentCoinOverview"),
);
const Bijoux = lazy(() => import("./pages/client/Bijoux"));
const IngotOverview = lazy(() => import("./pages/client/ingo/IngotOverview"));
const News = lazy(() => import("./pages/client/news/News"));
const NewsDetails = lazy(() => import("./pages/client/news/NewsDetails"));
const RateAlertInvestmentCoin = lazy(() =>
  import("./pages/client/alert/RateAlertInvestmentCoin"),
);
const RateAlertCurrency = lazy(() =>
  import("./pages/client/alert/RateAlertCurrency"),
);
const CollectionCoinOverview = lazy(() =>
  import("./pages/client/collectionCoins/CollectionCoinOverview"),
);
const CollectionCoinsOverview = lazy(() =>
  import("./pages/client/collectionCoins/CollectionCoinsOverview"),
);
const CreateAccount = lazy(() => import("./pages/client/user/CreateAccount"));
const EditAccount = lazy(() => import("./pages/client/user/EditAccount"));
const WhyInvestInGold = lazy(() =>
  import("./pages/client/about/WhyInvestInGold"),
);
const BillsDetails = lazy(() =>
  import("./pages/admin/Currencies/BillsDetails"),
);
const IndexUsers = lazy(() => import("./pages/admin/account/IndexUsers"));
const ResetForgotPassword = lazy(() =>
  import("./pages/client/user/ResetForgotPassword"),
);
const UserOverview = lazy(() => import("./pages/admin/account/UserOverview"));
const VerifyIdentity = lazy(() => import("./pages/client/user/VerifyIdentity"));
const Identity = lazy(() => import("./pages/admin/account/Identity"));
const ContinueToPayment = lazy(() =>
  import("./pages/client/cart/ContinueToPayment"),
);
const AdminNews = lazy(() => import("./pages/admin/news/AdminNews"));
const CreateNews = lazy(() => import("./pages/admin/news/CreateNews"));
const UpdateNews = lazy(() => import("./pages/admin/news/UpdateNews"));
const Config = lazy(() => import("./pages/admin/Config"));
const OrderDetails = lazy(() => import("./pages/admin/orders/OrderDetails"));
const OrderHistory = lazy(() => import("./pages/client/orders/OrderHistory"));
const OrderInfo = lazy(() => import("./pages/client/orders/OrderInfo"));
const PlanSite = lazy(() => import("./pages/client/about/PlanSite"));
const Cookies = lazy(() => import("./pages/client/about/Cookies"));
const FAQ = lazy(() => import("./pages/client/about/FAQ"));
const NewsLetter = lazy(() => import("./pages/admin/NewsLetter"));
const AvisClient = lazy(() => import("./pages/client/about/AvisClient"));
const routes = [
  {
    path: "/",
    component: IndexClient,
    pageTitle: "Admin",
  },
  {
    path: "/admin",
    component: Index,
    pageTitle: "Admin",
  },
  {
    path: "/admin/overview",
    component: Overview,
    pageTitle: "Overview",
    isAdmin: true,
  },
  {
    path: "/admin/forgotpassword",
    component: Forgotpassword,
    pageTitle: "Forgot Password",
  },
  {
    path: "/admin/currencies",
    component: Currencies,
    isAdmin: true,
    pageTitle: "Currencies",
  },
  {
    path: "/admin/currencies/create",
    component: CreateCurrency,
    isAdmin: true,
    pageTitle: "Create Currency",
  },
  {
    path: "/admin/currencies/update/:id",
    component: UpdateCurrency,
    isAdmin: true,
    pageTitle: "Update Currency",
  },
  {
    path: "/admin/currencies/bills/:id",
    component: BillsDetails,
    isAdmin: true,
    pageTitle: "Bill Details",
  },
  {
    path: "/admin/metals",
    component: Metals,
    isAdmin: true,
    pageTitle: "Metals",
  },
  {
    path: "/admin/metals/create",
    component: CreateMetal,
    isAdmin: true,
    pageTitle: "Create Metal",
  },
  {
    path: "/admin/metals/update/:id",
    component: UpdateMetal,
    isAdmin: true,
    pageTitle: "Update Metal",
  },
  {
    path: "/admin/users",
    component: IndexUsers,
    isAdmin: true,
  },
  {
    path: "/admin/users/:id",
    component: UserOverview,
    isAdmin: true,
  },
  {
    path: "/admin/users/identity/:id",
    component: Identity,
    isAdmin: true,
  },
  {
    path: "/admin/seo",
    component: SEO,
    isAdmin: true,
  },
  {
    path: "/admin/orders/:id",
    component: OrderDetails,
    isAdmin: true,
  },
  {
    path: "/admin/news",
    component: AdminNews,
    isAdmin: true,
  },
  {
    path: "/admin/news/create",
    component: CreateNews,
    isAdmin: true,
  },
  {
    path: "/admin/news/update/:id",
    component: UpdateNews,
    isAdmin: true,
  },
  {
    path: "/admin/letter",
    component: NewsLetter,
    isAdmin: true,
  },
  {
    path: "/admin/config",
    component: Config,
    isAdmin: true,
  },
  {
    path: "/server-error",
    component: ServerError,
    pageTitle: "Error",
  },
  {
    path: "*",
    component: NotFound,
    pageTitle: "Not Found",
  },
  {
    path: "/not-authorized",
    component: NotAuthorized,
    pageTitle: "Not Found",
  },
  {
    path: "/cours-des-devises",
    component: OverviewBills,
    pageTitle: "OverviewBills",
  },
  {
    path: "/cours-des-devises/:name/:id",
    component: OverviewBill,
    pageTitle: "OverviewBill",
  },
  {
    path: "/nous-contacter",
    component: Contact,
    pageTitle: "Contact",
  },
  {
    path: "/connexion",
    component: Connect,
  },
  {
    path: "/pieces-or-investissement",
    component: InvestmentCoinsOverview,
    pageTitle: "Investment Coins",
  },
  {
    path: "/pieces-or-collection/:name/:id",
    component: CollectionCoinOverview,
  },
  {
    path: "/pieces-or-collection",
    component: CollectionCoinsOverview,
  },
  {
    path: "/pieces-or-investissement/:name/:id",
    component: InvestmentCoinOverview,
    pageTitle: "Investment Coin",
  },
  {
    path: "/lingots-lingotins-or",
    component: IngotsOverview,
    pageTitle: "Lingot ",
  },
  {
    path: "/lingots-lingotins-or/:name/:id",
    component: IngotOverview,
    pageTitle: "Lingot ",
  },
  {
    path: "/rachat-bijoux-or",
    component: Bijoux,
    pageTitle: "RACHAT BIJOUX EN OR ",
  },
  {
    path: "/modifier-mot-passe",
    component: ForgotPasswordClient,
    pageTitle: "ForgotPassword ",
    isClient: true,
  },
  {
    path: "/valider-commande",
    component: ContinueToPayment,
    isClient: true,
  },
  {
    path: "/commande-terminee/:id?/:virement?",
    component: OrderCompleted,
  },

  {
    path: "/creation-compte",
    component: CreateAccount,
  },
  {
    path: "/modifier-coordonnees",
    component: EditAccount,
    isClient: true,
  },
  {
    path: "/historique-commandes",
    component: OrderHistory,
    isClient: true,
  },
  {
    path: "/historique-commandes/:id",
    component: OrderInfo,
    isClient: true,
  },
  {
    path: "/verification-identité",
    component: VerifyIdentity,
  },
  {
    path: "/mot-passe-oublie",
    component: ResetPassword,
    pageTitle: "ResetPassword ",
  },
  {
    path: "/reintialiser-mot-passe-oublier/:id",
    component: ResetForgotPassword,
  },
  {
    path: "/qui-sommes-nous",
    component: WhoAreWe,
    pageTitle: "WhoAreWe ",
  },
  {
    path: "/delais-livraison",
    component: DeliveryDelay,
    pageTitle: "DeliveryDelay ",
  },
  {
    path: "/achat-enligne-securise",
    component: SecuredOnlinePurchase,
    pageTitle: "SecuredOnlinePurchase ",
  },
  {
    path: "/mentions-legales",
    component: LegalMentions,
    pageTitle: "LegalMentions ",
  },
  {
    path: "/cgv",
    component: GeneralSellingConditions,
    pageTitle: "GeneralSellingConditions ",
  },
  {
    path: "/protection-donnees-personnelles",
    component: PersonalDetailsProtection,
    pageTitle: "PersonalDetailsProtection ",
  },
  {
    path: "/lutte-contre-blanchiment-argent-et-financement-terrorisme",
    component: AntiLaunderingAntiTerrorism,
    pageTitle: "AntiLaunderingAntiTerrorism ",
  },
  {
    path: "/Desabonner/:token",
    component: Desabonner,
    pageTitle: "Desabonner ",
  },
  {
    path: "/plan-site",
    component: PlanSite,
  },
  {
    path: "/pourquoi-investir-dans-or",
    component: WhyInvestInGold,
  },
  {
    path: "/Nouvelles",
    component: News,
    pageTitle: "News ",
  },
  {
    path: "/Nouvelles/:id",
    component: NewsDetails,
    pageTitle: "News Details",
  },

  {
    path: "/adresse",
    component: Address,
    pageTitle: "Address ",
  },
  {
    path: "/panier-vide",
    component: ItemsCart,
    pageTitle: "ItemsCart ",
  },
  {
    path: "/panier-article/:id/:quantity",
    component: ItemCart,
    pageTitle: "ItemCart ",
  },
  {
    path: "/alerte-meilleur-taux-or",
    component: RateAlertInvestmentCoin,
    pageTitle: "ALERTE MEILLEUR TAUX",
  },
  {
    path: "/avis-client",
    component: AvisClient,
  },
  {
    path: "/alerte-meilleur-taux-devises",
    component: RateAlertCurrency,
    pageTitle: "ALERTE MEILLEUR TAUX",
  },
  {
    path: "/panier",
    component: FinishCart,
    pageTitle: "FinishCart",
  },
  {
    path: "/cookies",
    component: Cookies,
    pageTitle: "Cookies",
  },
  {
    path: "/faq-questions-frequentes",
    component: FAQ,
    pageTitle: "Cookies",
  },
];

export default routes;
