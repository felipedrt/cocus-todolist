import { ITodoNote } from "./ITodoNote";

export interface ITodoResponse {
    hasError: boolean;
    msg: string;
    data: ITodoNote | ITodoNote[]
}