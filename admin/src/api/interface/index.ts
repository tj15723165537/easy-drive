// * 请求响应参数(不包含data)
export interface Result {
  code: number
  message: string
}

// * 请求响应参数(包含data)
export interface ResultData<T = any> extends Result {
  data?: T
}

// * 分页响应参数
export interface ResPage<T> {
  list: T[]
  total: number
}

// * 分页请求参数
export interface BaseParams {
  current: number
  pageSize: number
}

// * 登录
export namespace Login {
  export interface ReqLoginForm {
    username: string
    password: string
  }
  export interface ReqUpdatePasswordForm {
    oldPassword: string
    newPassword: string
  }
  export interface ResLogin {
    token: string
  }
  export interface ResAuthButtons {
    [propName: string]: any
  }
}
