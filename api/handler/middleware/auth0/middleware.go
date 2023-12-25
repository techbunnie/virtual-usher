package auth0

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"net/url"
	"strings"
	"time"

	jwtmiddleware "github.com/auth0/go-jwt-middleware/v2"
	"github.com/auth0/go-jwt-middleware/v2/jwks"
	"github.com/auth0/go-jwt-middleware/v2/validator"
)

const cacheTTL = 5 * time.Minute

type CustomClaims struct {
	Issuer      string   `json:"iss"`
	Subject     string   `json:"sub"`
	Audience    []string `json:"aud"`
	Scope       string   `json:"scope"`
	Permissions []string `json:"permissions"`
}

func (c CustomClaims) HasPermission(permission string) bool {
	for _, p := range c.Permissions {
		if permission == p {
			return true
		}
	}

	return false
}

func (c CustomClaims) HasScope(scope string) bool {
	scopes := strings.Split(c.Scope, " ")

	for _, s := range scopes {
		if scope == s {
			return true
		}
	}

	return false
}

func (c CustomClaims) Validate(ctx context.Context) error {
	log.Printf("what do I do with myself???")
	log.Printf("%+v", c)
	return nil
}

func EnsureValidToken(domain string, audience string) func(next http.Handler) http.Handler {
	issuerURL, err := url.Parse(fmt.Sprintf("https://%s/", domain))
	if err != nil {
		log.Fatalf("Failed to parse the issuer url: %v", err)
	}

	provider := jwks.NewCachingProvider(issuerURL, cacheTTL)

	jwtValidator, err := validator.New(
		provider.KeyFunc,
		validator.RS256,
		issuerURL.String(),
		[]string{
			audience,
		},
		validator.WithCustomClaims(
			func() validator.CustomClaims {
				return &CustomClaims{}
			},
		),
		validator.WithAllowedClockSkew(time.Minute),
	)
	if err != nil {
		log.Fatalf("failed to setup jwt validator: %v", err)
	}

	errorHandler := func(w http.ResponseWriter, r *http.Request, err error) {
		log.Printf("Encountered error while validating JWT: %v", err)

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusUnauthorized)
		w.Write([]byte(`{"message":"failed to validate JWT."}`))
	}

	middleware := jwtmiddleware.New(
		jwtValidator.ValidateToken,
		jwtmiddleware.WithErrorHandler(errorHandler),
	)

	return func(next http.Handler) http.Handler {
		return middleware.CheckJWT(next)
	}
}
