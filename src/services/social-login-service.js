import { GoogleSignin, statusCodes } from "react-native-google-signin";
import {
    LoginManager,
    AccessToken,
    GraphRequest,
    GraphRequestManager,
} from 'react-native-fbsdk';
import appleAuth, {
    AppleAuthCredentialState,
    AppleAuthRequestOperation,
    AppleAuthRequestScope,
    AppleButton,
    appleAuthAndroid
} from "@invertase/react-native-apple-authentication";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import * as RootNavigation from '../navigators/root-navigation'

import { store } from "../redux/store";
import { loginWithSocialMedia } from "../redux/actions/user-actions";
import { DEFAULT_AVATAR_URL } from "../constants";
import { Platform } from "react-native";

//Google Login
export const loginWithGoogle = async () => {
    await GoogleSignin.configure({
        webClientId:
            '621048235124-rfcui16pf4g76mo2vm0ijbr3frjnkqqd.apps.googleusercontent.com',
        forceConsentPrompt: false,
    });
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
        try {
            const userInfo = await GoogleSignin.signInSilently();
            console.log('User Info --> ', userInfo);
            let requestData = {
                username: userInfo.user.name,
                email: userInfo.user.email,
                avatar: userInfo.user.photo,
                provider: 'google',
                provider_id: userInfo.user.id,
                access_token: userInfo.user.id,
                device_type: Platform.OS,
                device_token: store.getState().userState.fcmToken
            }
            const response = await store.dispatch(loginWithSocialMedia(requestData));
            if (response.meta.status) {
                RootNavigation.navigate('main-stack');
            }
            return userInfo;
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_REQUIRED) {
                console.log('User has not signed in yet', error);
            } else {
                console.log("Something went wrong. Unable to get user's info", error);
            }
            return "error";
        }
    } else {
        console.log('Please Login');
        try {
            await GoogleSignin.hasPlayServices({
                showPlayServicesUpdateDialog: true,
            });
            const userInfo = await GoogleSignin.signIn();
            console.log('User Info --> ', userInfo);
            let requestData = {
                username: userInfo.user.name,
                email: userInfo.user.email,
                avatar: userInfo.user.photo,
                provider: 'google',
                provider_id: userInfo.user.id,
                access_token: userInfo.user.id,
                device_type: Platform.OS,
                device_token: store.getState().userState.fcmToken
            }
            const response = await store.dispatch(loginWithSocialMedia(requestData));
            if (response.meta.status) {
                RootNavigation.navigate('main-stack');
            }
            return userInfo;
        } catch (error) {
            console.log('Message', error.message);
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log('User Cancelled the Login Flow');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log('Signing In');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                dispatch(
                    showToast('negative', 'Play Services Not Available or Outdated'),
                );
            } else {
                console.log('Some Other Error Happened');
            }
            return "error";
        }
    }
};

//Facebook Login
export const loginWithFacebook = async () => {
    await LoginManager.logInWithPermissions(['public_profile', 'email']).then(
        function (result) {
            if (result.isCancelled) {
                // setLoading(false);
                return "error";
            } else {
                AccessToken.getCurrentAccessToken().then((data) => {
                    const infoRequest = new GraphRequest(
                        '/me',
                        {
                            parameters: {
                                fields: {
                                    string:
                                        'email,name,picture,first_name,middle_name,last_name', // what you want to get
                                },
                            },
                        },
                        _responseInfoCallback,
                    );
                    new GraphRequestManager().addRequest(infoRequest).start();
                });
                return "success";
            }
        },
        function (error) {
            return "error";
        },
    );
}

//Create response callback for facebook
const _responseInfoCallback = async (error, userInfo) => {
    if (error) {
        console.log('ERROR:- ', error);
    } else {
        let requestData = {
            username: userInfo.name,
            email: userInfo.email,
            avatar: userInfo.picture.data.url,
            provider: 'facebook',
            provider_id: userInfo.id,
            access_token: userInfo.id,
            device_type: Platform.OS,
            device_token: store.getState().userState.fcmToken
        }
        const response = await store.dispatch(loginWithSocialMedia(requestData));
        if (response.meta.status) {
            RootNavigation.navigate('main-stack');
        }
        console.log('RESULT:- ', userInfo);
    }
};

//Apple Login for android supported devices
export const onAppleLoginForAndroid = async () => {
    // Generate secure, random values for state and nonce
    const rawNonce = uuidv4();
    const state = uuidv4();

    try {
        //Initialize the module
        appleAuthAndroid.configure({
            // The Service ID you registered with Apple
            clientId: "com.chatsignals",

            // Return URL added to your Apple dev console. We intercept this redirect, but it must still match
            // the URL you provided to Apple. It can be an empty route on your backend as it's never called.
            redirectUri: "https://chat-signal.com/apple-auth/callback",

            // [OPTIONAL]
            // Scope.ALL (DEFAULT) = 'email name'
            // Scope.Email = 'email';
            // Scope.Name = 'name';
            scope: appleAuthAndroid.Scope.ALL,

            // [OPTIONAL]
            // ResponseType.ALL (DEFAULT) = 'code id_token';
            // ResponseType.CODE = 'code';
            // ResponseType.ID_TOKEN = 'id_token';
            responseType: appleAuthAndroid.ResponseType.ALL,

            // [OPTIONAL]
            // A String value used to associate a client session with an ID token and mitigate replay attacks.
            // This value will be SHA256 hashed by the library before being sent to Apple.
            // This is required if you intend to use Firebase to sign in with this credential.
            // Supply the response.id_token and rawNonce to Firebase OAuthProvider
            nonce: rawNonce,

            // [OPTIONAL]
            // Unique state value used to prevent CSRF attacks. A UUID will be generated if nothing is provided.
            state,
        });

        const response = await appleAuthAndroid.signIn();
        if (response) {
            console.log("appleAuthAndroid... response", response)
            const code = response.code; // Present if selected ResponseType.ALL / ResponseType.CODE
            const id_token = response.id_token; // Present if selected ResponseType.ALL / ResponseType.ID_TOKEN
            const user = response.user; // Present when user first logs in using appleId
            const state = response.state; // A copy of the state value that was passed to the initial request.
            console.log("Got auth code", code);
            console.log("Got id_token", id_token);
            console.log("Got user", user);
            console.log("Got state", state);

            let requestData = {
                username: response.user ? response.user.name.firstName : store.getState().userState.appleUsername,
                email: response.user ? response.user.email : store.getState().userState.appleEmailId,
                avatar: DEFAULT_AVATAR_URL,
                provider: 'apple',
                provider_id: response.code,
                access_token: response.id_token,
                device_type: Platform.OS,
                device_token: store.getState().userState.fcmToken
            }
            const api_response = await store.dispatch(loginWithSocialMedia(requestData));
            if (api_response.meta.status) {
                RootNavigation.navigate('main-stack');
            }
        }
    } catch (error) {
        console.log("appleAuthAndroid... error", error)
        if (error && error.message) {
            switch (error.message) {
                case appleAuthAndroid.Error.NOT_CONFIGURED:
                    console.log("appleAuthAndroid not configured yet.");
                    break;
                case appleAuthAndroid.Error.SIGNIN_FAILED:
                    console.log("Apple signin failed.");
                    break;
                case appleAuthAndroid.Error.SIGNIN_CANCELLED:
                    console.log("User cancelled Apple signin.");
                    break;
                default:
                    break;
            }
        }
    }
};

//Apple Login for iOS devices
/**
* You'd technically persist this somewhere for later use.
*/
let user = null;

/**
 * Fetches the credential state for the current user, if any, and updates state on completion.
 */
export const fetchAndUpdateCredentialState = async (updateCredentialStateForUser) => {
    if (user === null) {
        updateCredentialStateForUser('N/A');
    } else {
        const credentialState = await appleAuth.getCredentialStateForUser(user);
        if (credentialState === appleAuth.State.AUTHORIZED) {
            updateCredentialStateForUser('AUTHORIZED');
        } else {
            updateCredentialStateForUser(credentialState);
        }
    }
}

/**
 * Starts the Sign In flow.
 */
export const onAppleLoginForiOS = async (updateCredentialStateForUser) => {
    console.log('Beginning Apple Authentication');

    // start a login request
    try {
        const appleAuthRequestResponse = await appleAuth.performRequest({
            requestedOperation: appleAuth.Operation.LOGIN,
            requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
        });

        console.log('appleAuthRequestResponse', appleAuthRequestResponse);

        const {
            user: newUser,
            email,
            nonce,
            identityToken,
            realUserStatus /* etc */,
        } = appleAuthRequestResponse;

        user = newUser;

        fetchAndUpdateCredentialState(updateCredentialStateForUser).catch(error =>
            updateCredentialStateForUser(`Error: ${error.code}`),
        );

        if (identityToken) {
            // e.g. sign in with Firebase Auth using `nonce` & `identityToken`
            console.log(nonce, identityToken);
        } else {
            // no token - failed sign-in?
        }

        if (realUserStatus === appleAuth.UserStatus.LIKELY_REAL) {
            console.log("I'm a real person!");
        }

        console.log(`Apple Authentication Completed, ${user}, ${email}`);

        let requestData = {
            username: "",
            email: email,
            avatar: DEFAULT_AVATAR_URL,
            provider: 'apple',
            provider_id: 'response.code',
            access_token: 'response.id_token',
            device_type: Platform.OS,
            device_token: store.getState().userState.fcmToken
        }
        const api_response = await store.dispatch(loginWithSocialMedia(requestData));
        if (api_response.meta.status) {
            RootNavigation.navigate('main-stack');
        }
    } catch (error) {
        if (error.code === appleAuth.Error.CANCELED) {
            console.log('User canceled Apple Sign in.');
        } else {
            console.log("error", error);
        }
    }
}
