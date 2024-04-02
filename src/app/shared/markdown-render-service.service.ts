import { Injectable } from "@angular/core";
import { marked } from "marked";

@Injectable({
    providedIn: "root"
})
export class MarkdownRenderService {
    render(data: string) {
        return marked(data).toString();
    }
}