const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", redirect: "/shipping-calculator" },
      {
        path: "/shipping-calculator",
        component: () => import("pages/ShippingCalculator.vue")
      },
      {
        path: "/pricing-report",
        component: () => import("pages/PricingReport.vue")
      },
      { path: "/quotation", component: () => import("pages/Quotation.vue") },
      {
        path: "/pattern-lock",
        component: () => import("pages/PatternLockPage.vue")
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
