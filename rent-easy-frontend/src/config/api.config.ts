export const API_CONFIG = {
  USE_MOCK_DATA: process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true',
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api',
  ENDPOINTS: {
    AUTH: {
      REGISTER: '/user/register',
      LOGIN: '/user/login',
      RESET_PASSWORD: '/user/reset-password',
      VERIFY_TOKEN: '/user/verify-reset-token'
    },
    DOCUMENTS: {
      CREATE: '/documents',
      GET_ALL: '/documents',
      GET_BY_ID: '/documents/getById',
      UPDATE: '/documents/updateById',
      DELETE: '/documents/deleteById',
      GET_BY_USER: '/documents/getAllByUserId',
      UPDATE_BY_USER: '/documents/updateByUserId',
      DELETE_BY_USER: '/documents/deleteByUserId',
      GET_BY_TYPE: '/documents/getByType'
    },
    OWNER: {
      CREATE: '/owner',
      GET_ALL: '/owner',
      GET_BY_ID: '/owner',
      UPDATE: '/owner',
      DELETE: '/owner',
      DASHBOARD: '/owner/dashboard'
    },
    PROPERTY: {
      CREATE: '/property',
      GET_BY_ID: '/property/getById',
      GET_NEARBY: '/property/nearby',
      GET_STATS: '/property/stats',
      GET_SIMILAR_BY_ID: '/property/similar/byId',
      GET_SIMILAR_BY_CODE: '/property/similar/byCode',
      AUTOCOMPLETE: '/property/autocomplete',
      SEARCH: '/property/search'
    },
    ROOM: {
      CREATE: '/room',
      LIST: '/room/list',
      GET_BY_ID: '/room/getById',
      UPDATE: '/room/updateById',
      DELETE: '/room/deleteById',
      ASSIGN_TENANT: '/room/assign-tenant',
      VACATE_TENANT: '/room/vacate-tenant'
    },
    RENTAL_AGREEMENT: {
      CREATE: '/rental-agreement',
      LIST: '/rental-agreement/list',
      GET_BY_ID: '/rental-agreement/getById',
      UPDATE: '/rental-agreement/updateById',
      TERMINATE: '/rental-agreement/terminate',
      GENERATE_PDF: '/rental-agreement/generatePdf'
    },
    RENT_PAYMENT: {
      CREATE: '/rent-payment',
      GET_BY_USER: '/rent-payment/user',
      GET_BY_ID: '/rent-payment',
      UPDATE: '/rent-payment',
      DELETE: '/rent-payment',
      GET_BREAKUP: '/rent-payment/payment-breakup'
    },
    MAINTENANCE: {
      CREATE: '/requests',
      GET_OWNER_REQUESTS: '/requests/owner',
      GET_USER_REQUESTS: '/requests/user',
      ACCEPT: '/requests/accept',
      COMPLETE: '/requests/complete',
      REJECT: '/requests/reject',
      DELETE: '/requests',
      EXPORT: '/requests/export/excel'
    }
  }
};