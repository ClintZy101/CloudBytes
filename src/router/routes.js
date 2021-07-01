const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", redirect: "/quotation" },
      {
        name: "Shipping Calculator",
        path: "/shipping-calculator",
        component: () => import("pages/ShippingCalculator.vue")
      },
      {
        name: "Pricing Report",
        path: "/pricing-report",
        component: () => import("pages/PricingReport.vue")
      },
      {
        name: "Make a Quotation",
        path: "/quotation",
        component: () => import("pages/Quotation.vue")
      },
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
