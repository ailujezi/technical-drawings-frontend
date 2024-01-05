export interface AccessRefreshToken {
    "error": string,
    "status": string,
    "data": {
        "refresh": string,
        "access": string
    }
}