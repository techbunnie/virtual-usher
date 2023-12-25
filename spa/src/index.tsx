import * as auth0 from "@auth0/auth0-react"
import * as reactDOM from "react-dom/client"
import * as app from "@alfred/app.tsx";

;!function main() {
    const rootNode = document.getElementById("alfred-root");

    if (!rootNode)
        return false;

    const rootJSX = (
        <auth0.Auth0Provider
            domain="dev-u56gpeyi30cng4h8.us.auth0.com"
            clientId="YdFjxiDfhPxfxFs1iNkpB3V9CpzwSMN1"
            authorizationParams={{
                "audience": "http://alfred.techbunnie.io",
                "redirect_uri": "https://localhost:8000/auth/callback",
            }}>
            <app.Application/>
        </auth0.Auth0Provider>
    );

    reactDOM
        .createRoot(rootNode)
        .render(rootJSX);
}();
