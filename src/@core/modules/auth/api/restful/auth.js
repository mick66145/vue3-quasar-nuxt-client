import useCustomFetch from '@/composables/useCustomFetch'

export const AuthResource = ({
  uri = 'auth',
}) => {
  const { fetch } = useCustomFetch()

  const login = ({ payload }) => {
    return fetch(`/${uri}/login`, {
      method: 'post',
      body: payload,
    });
  }

  const register = ({ payload }) => {
    return fetch(`/${uri}/register`, {
      method: 'post',
      body: payload,
    });
  }

  const forgetPassword = ({ payload }) => {
    return fetch(`/${uri}/forget_password`, {
      method: 'post',
      body: payload,
    });
  }

  const getVerifyCode = ({ payload }) => {
    return fetch(`/${uri}/verify_code`, {
      method: 'post',
      body: payload,
    });
  }

  const getLoginCaptcha = ({ query }) => {
    return fetch(`/${uri}/login_captcha`, {
      method: 'get',
      params: query,
    });
  }

  const logout = () => {
    return fetch(`/${uri}/logout`, {
      method: 'post',
    });
  }

  const bindCheck = ({ payload }) => {
    return fetch(`/${uri}/bind/action/check`, {
      method: 'post',
      body: payload,
    });
  }

  const bind = ({ payload }) => {
    return fetch(`/${uri}/bind`, {
      method: 'post',
      body: payload,
    });
  }

  const unbind = ({ payload }) => {
    return fetch(`/${uri}/unbind`, {
      method: 'post',
      body: payload,
    });
  }

  const me = () => {
    return fetch(`/${uri}/me`, {
      method: 'get',
    }).then(res => {
      const meObj = {
        ...res,
      }
      return meObj;
    });
  }

  const profile = ({ payload }) => {
    return fetch(`/${uri}/me`, {
      method: 'patch',
      body: payload,
    });
  }

  const permission = () => {
    return fetch(`/${uri}/permission`, {
      method: 'get',
    }).then(res => {
      const { list, meta } = res;
      if (meta?.pagination) {
        const { count, total } = meta.pagination;
        return {
          list: list,
          total: total,
          count: count,
        };
      } else {
        return {
          list: list,
        };
      }
    });
  }

  const changePassword = ({ payload }) => {
    return fetch(`/${uri}/change_password`, {
      method: 'post',
      body: payload,
    });
  }

  const refreshToken = ({ payload }) => {
    return fetch(`/${uri}/refresh_token`, {
      method: 'post',
      body: payload,
    });
  }

  return {
    login,
    register,
    forgetPassword,
    getVerifyCode,
    getLoginCaptcha,
    logout,
    bindCheck,
    bind,
    unbind,
    me,
    profile,
    permission,
    changePassword,
    refreshToken,
  }
}
