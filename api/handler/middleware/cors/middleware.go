package cors

import (
	"net/http"
)

func CORSMiddleware(origins []string) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(response http.ResponseWriter, request *http.Request) {
			requestOrigin := request.Header.Get("Origin")
			requestAllowed := false

			for _, origin := range origins {
				if origin == requestOrigin {
					requestAllowed = true
					break
				}
			}

			if !requestAllowed {
				response.WriteHeader(http.StatusForbidden)
				response.Write([]byte(""))
				return
			}

			response.Header().Set("Access-Control-Allow-Origin", requestOrigin)
			response.Header().Set("Access-Control-Allow-Headers", "authorization")
			response.Header().Set("Access-Control-Allow-Method", request.Method)

			if request.Method == "OPTIONS" {
				response.WriteHeader(http.StatusNoContent)
				response.Write([]byte(""))
			} else if next != nil {
				next.ServeHTTP(response, request)
			}
		})
	}

}
