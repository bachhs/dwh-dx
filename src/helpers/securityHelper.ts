/* eslint-env jquery */
import { oidcConfigs } from "@/config/oidcConfigs";
import Oidc from 'oidc-client';
const mgr = new Oidc.UserManager({
    userStore: new Oidc.WebStorageStateStore({ store: window.localStorage }) as any,
    authority: oidcConfigs.authority,
    client_id: oidcConfigs.client_id,
    redirect_uri: oidcConfigs.redirect_uri,
    response_type: oidcConfigs.response_type,
    scope: oidcConfigs.scope,
    post_logout_redirect_uri: oidcConfigs.post_logout_redirect_uri,
    silent_redirect_uri: oidcConfigs.redirect_uri,
    automaticSilentRenew: true,
    filterProtocolClaims: true,
    loadUserInfo: true
});

Oidc.Log.logger = console;
Oidc.Log.level = Oidc.Log.INFO;

// mgr.events.addUserLoaded(function (user) {
//     //console.log('New User Loaded：', arguments);
//     //console.log('Acess_token: ', user.access_token)
//     if(window.location.href = this.oidcConfigs.homepage)
// });

mgr.events.addAccessTokenExpiring(function () {
    console.log('AccessToken Expiring：', arguments);
    //localStorage.removeItem('accessToken');
    //window.location.href = this.oidcConfigs.loginPage;
});

// mgr.events.addAccessTokenExpired(function () {
//     //console.log('AccessToken Expired：', arguments);
//     //alert('Session expired. Going out!');
//     mgr.signoutRedirect().then(function (resp) {
//         localStorage.removeItem('accessToken');
//         console.log('signed out', resp);
//     }).catch(function (err) {
//         console.log(err)
//     })
// });

// mgr.events.addSilentRenewError(function () {
//     console.error('Silent Renew Error：', arguments);
// });

mgr.events.addUserSignedOut(function () {
    //alert('Going out!');
    console.log('UserSignedOut：', arguments);
    mgr.signoutRedirect().then(function (resp) {
        localStorage.removeItem('accessToken');
        console.log('signed out', resp);
    }).catch(function (err) {
        console.log(err)
    })
});

export default class securityHelper {
    mgr:Oidc.UserManager = mgr;    
    oidcConfigs:any = oidcConfigs;
    getInformationClient() {
        let information = {
            sourceRequest: "COVID",
            browserDetails: '',
            timeZone: '',
            resolutionDevice: '',
        };
        let navigatorList = {
            appCodeName: navigator.appCodeName,
            appName: navigator.appName,
            appVersion: navigator.appVersion,
            cookieEnabled: navigator.cookieEnabled,
            geolocation: navigator.geolocation,
            language: navigator.language,
            onLine: navigator.onLine,
            platform: navigator.platform,
            product: navigator.product,
            userAgent: navigator.userAgent
        };
        try {
            information.browserDetails = JSON.stringify(navigatorList);
            let offset = new Date().getTimezoneOffset(),
                o = Math.abs(offset);
            let timeZoneBrowse = (offset < 0 ? "+" : "-") + Math.floor(o / 60);
            information.timeZone = timeZoneBrowse;
            information.resolutionDevice = `${window.screen.width}x${window.screen.height}`;
        } catch { }
        return information;
    }

    getAccessTokenStoreName(){
        return "accessToken";
    }

    goToHomePage(){
        window.location.href = this.oidcConfigs.homepage;
    }

    goToLoginPage(){
        window.location.href = this.oidcConfigs.loginPage;
    }

    signinRedirect(){
        let self = this;
        this.mgr.signinRedirect().catch(function (err) {
            console.log(err)
        });
    }

    signinRedirectCallback(){
        let self = this;
        return mgr.signinRedirectCallback();
    }

    cleanInfo(){
        localStorage.removeItem(this.getAccessTokenStoreName());
    }

    isLoggedIn(){
        let self = this
        return new Promise((resolve, reject) => {
            try{
                this.mgr.getUser().then(function (user) {
                    if (user == null) {
                        //self.signIn()
                        return resolve(false);
                    } else {
                        if(user.expired) return resolve(false);
                        else return resolve(true);
                    }
                }).catch(function (err) {
                    console.error('isLoggedIn', err);
                    console.log(err)
                    return reject(err)
                });
            }catch (error) {
                reject(error);
            }
        });
    }

    getAccountService(){
        return new Promise<string>((resolve, reject) => {
            try{
                $.getJSON(oidcConfigs.issuer, (jsonData:any) => {
                    //console.log('jsonData', jsonData);
                    if(jsonData !== null) return resolve(jsonData['account-service']);
                    else resolve(String(null));
                });
            }catch (error) {
                reject(error);
            }
        });
    }

    // Renew the token manually
    renewToken() {
        let self = this;
        return new Promise((resolve, reject) => {
            this.mgr.signinSilent().then(function (user) {
                if (user == null) {
                    self.signIn()
                } else {
                    return resolve(user)
                }
            }).catch(function (err) {
                console.log(err)
                return reject(err)
            });
        })
    }

    // Redirect of the current window to the authorization endpoint.
    signIn() {
        this.mgr.signinRedirect().catch(function (err) {
            console.log(err)
        })
    }

    // Get the user who is logged in
    getUser() {
        let self = this
        return new Promise((resolve, reject) => {
            this.mgr.getUser().then(function (user) {
                if (user == null) {
                    //self.signIn()
                    return resolve(null)
                } else {
                    return resolve(user)
                }
            }).catch(function (err) {
                console.log(err)
                return reject(err)
            });
        })
    }

    // Redirect of the current window to the end session endpoint
    signOut() {
        return new Promise((resolve, reject) => {
            this.mgr.signoutRedirect().then((resp) => {
                this.cleanInfo();
                console.log('signed out', resp);
                resolve(resp);
            }).catch(function (err) {
                console.log(err);
                reject(err);
            })
        });
    }

    // Get the profile of the user logged in
    getProfile() {
        let self = this
        return new Promise((resolve, reject) => {
            this.mgr.getUser().then(function (user) {
                if (user == null) {
                    self.signIn()
                    return resolve(null)
                } else {
                    return resolve(user.profile)
                }
            }).catch(function (err) {
                console.log(err)
                return reject(err)
            });
        })
    }

    // Get the token id
    getIdToken() {
        let self = this
        return new Promise((resolve, reject) => {
            this.mgr.getUser().then(function (user) {
                if (user == null) {
                    self.signIn()
                    return resolve(null)
                } else {
                    return resolve(user.id_token)
                }
            }).catch(function (err) {
                console.log(err)
                return reject(err)
            });
        })
    }

    // Get the session state
    getSessionState() {
        let self = this
        return new Promise((resolve, reject) => {
            this.mgr.getUser().then(function (user) {
                if (user == null) {
                    self.signIn()
                    return resolve(null)
                } else {
                    return resolve(user.session_state)
                }
            }).catch(function (err) {
                console.log(err)
                return reject(err)
            });
        })
    }

    // Get the access token of the logged in user
    getAcessToken() {
        let self = this
        return new Promise((resolve, reject) => {
            this.mgr.getUser().then(function (user) {
                if (user == null) {
                    self.signIn()
                    return resolve(null)
                } else {
                    return resolve(user.access_token)
                }
            }).catch(function (err) {
                console.log(err)
                return reject(err)
            });
        })
    }

    // Takes the scopes of the logged in user
    getScopes() {
        let self = this
        return new Promise((resolve, reject) => {
            this.mgr.getUser().then(function (user) {
                if (user == null) {
                    self.signIn()
                    return resolve(null)
                } else {
                    return resolve(user.scopes)
                }
            }).catch(function (err) {
                console.log(err)
                return reject(err)
            });
        })
    }

    // Get the user roles logged in
    getRole() {
        let self = this
        return new Promise((resolve, reject) => {
            this.mgr.getUser().then(function (user) {
                if (user == null) {
                    self.signIn()
                    return resolve(null)
                } else {
                    return resolve(user.profile.role)
                }
            }).catch(function (err) {
                console.log(err)
                return reject(err)
            });
        })
    }

    querySessionStatus(){
        let self = this
        return new Promise((resolve, reject) => {
            this.mgr.querySessionStatus().then(function (data) {
                if (data !== null && data.sid !== null) {
                    return resolve(true);
                } else {
                    return resolve(false);
                }
            }).catch(function (err) {
                console.log(err);                
                return resolve(false);
            });
        })
    }
}