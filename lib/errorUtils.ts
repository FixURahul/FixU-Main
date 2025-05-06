/**
 * Custom error classes and error handling utilities
 */

// API error with status code
export class ApiError extends Error {
  statusCode: number;
  
  constructor(message: string, statusCode: number) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
  }
}

// Authorization error
export class AuthError extends Error {
  constructor(message: string = 'You are not authorized to perform this action') {
    super(message);
    this.name = 'AuthError';
  }
}

// Validation error with fields
export class ValidationError extends Error {
  fields: Record<string, string>;
  
  constructor(message: string, fields: Record<string, string>) {
    super(message);
    this.name = 'ValidationError';
    this.fields = fields;
  }
}

// Handle fetch errors consistently
export async function handleFetchResponse(response: Response) {
  if (!response.ok) {
    let errorMessage = 'An error occurred while fetching data';
    
    try {
      const errorData = await response.json();
      errorMessage = errorData.error || errorData.message || errorMessage;
    } catch (e) {
      // If we can't parse the JSON, just use status text
      errorMessage = response.statusText || errorMessage;
    }
    
    throw new ApiError(errorMessage, response.status);
  }
  
  return response.json();
}

// Function to log errors to console or external service
export function logError(error: unknown, context?: Record<string, any>) {
  if (error instanceof Error) {
    console.error(`${error.name}: ${error.message}`, {
      stack: error.stack,
      ...context
    });
    
    // Here you could add logic to send errors to an external service
    // like Sentry, LogRocket, etc.
  } else {
    console.error('Unknown error:', error, context);
  }
}
