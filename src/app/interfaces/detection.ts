import { OverlayDetection } from './overlay_detection'

export interface Detection {
    "visual_result_path": string,
    "elements": OverlayDetection[]
}