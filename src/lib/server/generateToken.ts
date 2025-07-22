import { SignJWT } from "jose";
export const generateToken = async function (payload: any, expirationTime: string): Promise<string> {
    const secret = new TextEncoder().encode(process.env.JOSE_SECRET_KEY)
    const token = await new SignJWT(payload).setIssuedAt().setExpirationTime(expirationTime).setProtectedHeader({ alg: "HS256" }).sign(secret)
    return token
}