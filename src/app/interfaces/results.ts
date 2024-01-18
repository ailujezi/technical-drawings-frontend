import { Detection } from "./detection"

export interface Results {
    project_id: number,
    image_id: number,
    ai_model_id: number,
    text_recognition_image_url: number,
    result_recognition: { [key: string]: Detection },
    created_at: string,
    updated_at: string
}