export interface Login {
  username: string
  password: string
}

export interface Validation {
  password: string
}

export interface ResetPassword {
  username: string
}

export interface NewPassword {
  password: string
  confirmPassword: string
}

export interface Code2FA {
  code?: string
  username?: string
}

export interface UserData {
  username: string
  name: string
  id: number
}