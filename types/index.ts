export interface Message {
  id: string;
  prompt: string;
  response: string;
  model: string;
  timestamp: string;
  isUser: boolean;
}

export interface Model {
  id: string;
  name: string;
  provider: string;
}

export interface ChatRequest {
  prompt: string;
  model: string;
  apiKey: string;
}

export interface ChatResponse {
  id: string;
  response: string;
  model: string;
  timestamp: string;
}

export interface ModelsResponse {
  models: Model[];
  message?: string;
}

export interface ApiError {
  error: string;
} 