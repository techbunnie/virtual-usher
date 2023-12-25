package event

import (
	"net/http"

	jwtmw "github.com/auth0/go-jwt-middleware/v2"
	"github.com/auth0/go-jwt-middleware/v2/validator"
	"techbunnie.io/alfred/handler/middleware/auth0"
	"techbunnie.io/alfred/pkg/app"
)

// Greet is a public handler just for saying "hello world!"
type Greet struct{}

func (handler Greet) ServeHTTP(response http.ResponseWriter, request *http.Request) {
	response.WriteHeader(http.StatusOK)
	response.Header().Set("Content-Type", "application/json")
	response.Write([]byte("hello world"))
}

// ListEvent is an authenticated http.Handler implementation for listing events
type ListEvent struct {
}

func (handler ListEvent) ServeHTTP(response http.ResponseWriter, request *http.Request) {
	method, ok := map[string]func(http.ResponseWriter, *http.Request) error{
		http.MethodGet:  handler.ServeHTTPGET,
		http.MethodPost: handler.ServeHTTPPOST,
	}[request.Method]

	if !ok {
		response.WriteHeader(http.StatusMethodNotAllowed)
		response.Header().Set("Content-Type", "application/json")
		response.Write([]byte("unsupported method"))
	}

	err := method(response, request)
	if err != nil {
		response.WriteHeader(http.StatusMethodNotAllowed)
		response.Header().Set("Content-Type", "application/json")
		response.Write([]byte(err.Error()))
	}
}

func (handler ListEvent) ServeHTTPGET(response http.ResponseWriter, request *http.Request) error {
	response.WriteHeader(http.StatusOK)
	response.Header().Set("Content-Type", "application/json")
	response.Write([]byte("hello. listing event"))

	return nil
}

func (handler ListEvent) ServeHTTPPOST(response http.ResponseWriter, request *http.Request) error {
	token := request.
		Context().
		Value(jwtmw.ContextKey{}).(*validator.ValidatedClaims)

	claims := token.CustomClaims.(*auth0.CustomClaims)

	if !claims.HasPermission(app.PermWriteEvent) {
		response.WriteHeader(http.StatusForbidden)
		response.Header().Set("Content-Type", "application/json")
		response.Write([]byte("nope. not allowed"))
	} else {
		response.WriteHeader(http.StatusOK)
		response.Header().Set("Content-Type", "application/json")
		response.Write([]byte("hello. creating event"))
	}

	return nil
}
