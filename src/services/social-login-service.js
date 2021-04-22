import { GoogleSignin, statusCodes } from "react-native-google-signin";
import {
    LoginManager,
    AccessToken,
    GraphRequest,
    GraphRequestManager,
} from 'react-native-fbsdk';
import * as RootNavigation from '../navigators/root-navigation'

import { store } from "../redux/store";
import { loginWithSocialMedia } from "../redux/actions/user-actions";

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
                access_token: userInfo.user.id
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
                access_token: userInfo.user.id
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

//Create response callback.
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
            access_token: userInfo.id
        }
        const response = await store.dispatch(loginWithSocialMedia(requestData));
        if (response.meta.status) {
            RootNavigation.navigate('main-stack');
        }
        console.log('RESULT:- ', userInfo);
    }
};