import axios from 'axios';
import { captureException, configureScope } from '@sentry/minimal';

export const createAuthInterceptor = (getUser) => async (config) => {
  await getUser();
  return config;
};

export function responseDataInterceptor(response) {
  if (response.data) {
    return response.data;
  }

  return response;
}

export const createInterceptor401 = (logout) => (error) => {
  if (error.response && error.response.status === 401) {
    logout();
    return false;
  }

  throw error;
};

export function interceptor500(error) {
  if (error.response && error.response.status >= 500 && error.response.status < 600) {
    configureScope((scope) => {
      scope.setTag('request_id', error.response.req_id);
    });
  }

  throw error;
}

export function errorInterceptor(err) {
  if (!axios.isCancel(err)) {
    try {
      const errObject = { ...err };
      if (errObject.response && errObject.response.data) {
        throw errObject.response.data;
      }

      throw err;
    } catch (customError) {
      const sentryId = captureException(customError);
      customError.sentryId = sentryId;
      throw customError;
    }
  }
}
