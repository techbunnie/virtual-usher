import * as auth0 from "@auth0/auth0-react";
import * as reactRouter from "react-router-dom";

export function Application(props) {
    return (
        <reactRouter.BrowserRouter>
            <reactRouter.Routes>
                <reactRouter.Route
                    path="/auth/callback"
                    element={<AuthCallback />}/>
                <reactRouter.Route
                    path="/auth/logout"
                    element={<LogoutPage />}/>

                <reactRouter.Route
                    path="/"
                    element={<HomePage />}>
                </reactRouter.Route>
            </reactRouter.Routes>
        </reactRouter.BrowserRouter>
    );
}

export function HomePage(props) {
    const auth = auth0.useAuth0();

    const onGetEventsClicked = (event) => {
        auth.getAccessTokenSilently()
            .then((value) => {
                return window.fetch("http://localhost:3000/api/events/", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${value}`
                    }
                });
            });
    };

    const onPostEventsClicked = (event) => {
        auth.getAccessTokenSilently()
            .then((value) => {
                return window.fetch("http://localhost:3000/api/events/", {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${value}`
                    }
                });
            });
    };


    const onLoginClicked = () => {
        auth.loginWithRedirect();
    };

    const onLogoutClicked = () => {
        auth.logout({
            logoutParams: { returnTo: "https://localhost:8000/auth/logout" }
        });
    };

    return (
        <>
            <div>
                <p>Hello World!</p>
            </div>
            <hr/>
            <div>
                <button onClick={onGetEventsClicked}>Send API to GET /api/events/</button>
                <button onClick={onPostEventsClicked}>Send API to POST /api/events/</button>
            </div>
            <hr/>
            <div>
                <button onClick={onLoginClicked}>Login</button>
            </div>
            <div>
                <button onClick={onLogoutClicked}>Logout</button>
            </div>
        </>
    );
}

export function LogoutPage(props) {
    return (
        <div>
            <p>Good bye!</p>
        </div>
    )
}

export function AuthCallback(props) {
    const auth = auth0.useAuth0();

    const onHomeClicked = () => {
        reactRouter.redirect("/");
    };

    return (
        <div>
            <p >Welcome back bish!</p>
            <button onClick={onHomeClicked}>Home</button>
        </div>
    );
}
