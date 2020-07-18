export interface RantDefaultState {
    createRantForm: RantForm,
    updateRantForm: RantForm
}

export interface RantForm {
    body: string,
    userId: number
}