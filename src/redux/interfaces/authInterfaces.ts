export interface AuthDefaultState {
    currentUser: object,
    loginForm: LoginForm,
    registerForm: RegisterForm
}

export interface LoginForm {
    username: string,
    password: string
}

export interface RegisterForm {
    first_name: string,
    last_name: string,
    avatar: string,
    avatarBackground: string,
    age: number, 
    birth_place: string,
    email: string,
    phone_number: string
}