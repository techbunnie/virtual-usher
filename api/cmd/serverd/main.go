package main

import (
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
	"techbunnie.io/alfred/handler/middleware/auth0"
	"techbunnie.io/alfred/handler/middleware/cors"
	eventhdlr "techbunnie.io/alfred/handler/rest/event"
	"techbunnie.io/alfred/pkg/app"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("unable to load .env file. %v", err)
	}

	cfg := app.Config{
		Auth0Domain:   os.Getenv("AUTH0_DOMAIN"),
		Auth0Audience: os.Getenv("AUTH0_AUDIENCE"),
		CORSOrigins: []string{
			"https://localhost:8000",
			"http://localhost:8000",
		},
	}

	router := http.NewServeMux()

	initRoutes(cfg, router)

	log.Printf("http listening at port 3000")
	err = http.ListenAndServe("localhost:3000", router)
	if err != nil {
		log.Fatalf("http server encountered an issue: %v", err)
	}
}

func initRoutes(cfg app.Config, router *http.ServeMux) {

	/*
	 ***************************************************
	 * API Handlers
	 ***************************************************
	 */
	corsHandler := cors.CORSMiddleware(cfg.CORSOrigins)
	tokenHandler := auth0.EnsureValidToken(cfg.Auth0Domain, cfg.Auth0Audience)
	router.Handle("/api/greet", corsHandler(eventhdlr.Greet{}))
	router.Handle("/api/events/", corsHandler(tokenHandler(eventhdlr.ListEvent{})))

	/*
	 ***************************************************
	 * M2M Handlers
	 ***************************************************
	 */
	router.Handle("/m2m/events", eventhdlr.ListEvent{})
}
