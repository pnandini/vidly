import http from "./httpService";
import jwtDecode from "jwt-decode";

const apiEndpoint = "/auth";
const tokenkey = "token";

http.setJwt(getJwtToken());

export async function login(email, password) {
    const {data: jwt} = await http.post(apiEndpoint, {email, password});
    localStorage.setItem(tokenkey, jwt);
}

export function loginWithJwt(jwt) {
    localStorage.setItem(tokenkey, jwt);
}

export function logout() {
    localStorage.removeItem(tokenkey);
}

export function getUser() {
    try {
        const token = localStorage.getItem(tokenkey);
        return jwtDecode(token);
    }
    catch (e) {
        return null
    }
}

export function getJwtToken() {
    return localStorage.getItem(tokenkey);
}

export default {
    login, logout, loginWithJwt, getUser
}