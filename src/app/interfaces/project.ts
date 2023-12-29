import { ProjectImage } from "./projectImage";

export interface Project {
    id: number;
    name: string;
    description: string;
    ai_model_id: number;
    status: string;
    images_nr: number;
    images: ProjectImage[];
    created_at: string;
    updated_at: string;
  }