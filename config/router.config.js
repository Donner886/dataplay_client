export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {
        path: '/user',
        redirect: '/user/login',
      },
      {
        path: '/user/login',
        component: './User/Login',
      },
      {
        path: '/user/register',
        component: './User/Register',
      },
      {
        path: '/user/register-result',
        component: './User/RegisterResult',
      },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['admin','EBM_DQDM'],
    routes: [
      // root
      {
        path: '/ui',
        redirect: '/dataset',
      },
      {
        path: '/',
        redirect: '/dataset/dataimport',
      },
      // Dashboard
      // {
      //   path: '/dashboard',
      //   icon: 'dashboard',
      //   name: 'dashboard',
      //   component: './Dashboard',
      // },
      // dataset
      {
        path: '/dataset',
        icon: 'database',
        Routes: ['src/pages/Authorized'],
        authority: ['admin', 'EBM_DQDM'],
        name: 'dataset',
        routes: [
          {
            path: '/dataset/dataimport',
            icon: 'download',
            name: 'getDataIn',
            component: './Dataset/DataImport',
          },
          {
            path: '/dataset/view',
            icon: 'table',
            name: 'viewDataset',
            component: './Dataset/View',
          },
          {
            path: '/dataset/query',
            icon: 'search',
            name: 'queryDataset',
            component: './Dataset/Query',
          },
          // {
          //   path: '/dataset/manage',
          //   icon: 'form',
          //   name: 'manageDataset',
          //   component: './Dataset/Manage',
          // }
        ],
      },
      // Analysis
      {
        path: '/visualization',
        icon: 'area-chart',
        name: 'visualization',
        Routes: ['src/pages/Authorized'],
        authority: ['admin','EBM_DQDM'],
        routes: [
          {
            path: '/visualization/gg',
            icon: 'bar-chart',
            name: 'gg',
            component: './Visualization/GG',
          },
          {
            path: '/visualization/td',
            icon: 'pie-chart',
            name: 'typeDriven',
            component: './Visualization/TD',
          },
        ],
      },
      // Prediction
      {
        path: '/prediction',
        icon: 'file-unknown',
        name: 'prediction',
        Routes: ['src/pages/Authorized'],
        authority: ['admin'],
        routes: [
          {
            path: '/prediction/numerical',
            icon: 'fund',
            name: 'numerical',
            component: './Prediction/Numerical',
          },
          {
            path: '/prediction/categorical',
            icon: 'gold',
            name: 'categorical',
            component: './Prediction/Categorical',
          },
          {
            path: '/prediction/timeserial',
            icon: 'stock',
            name: 'timeserial',
            component: './Prediction/TimeSerial',
          },
        ],
      },
      // Config
      {
        path: '/config',
        icon: 'tool',
        name: 'configuration',
        component: './Configuration',
      },
    ],
  },
];
