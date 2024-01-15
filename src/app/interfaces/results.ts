import { Detection } from "./detection"

export interface Results {
    project_id: number,
    image_id: number,
    ai_model_id: number,
    text_detection_image_url: number,
    result_detection: Detection,
    created_at: string,
    updated_at: string
}