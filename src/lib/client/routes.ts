
export const authRoutes = {
    login: "/auth/login",
    register: "/auth/register",
    forgetPassword: "/auth/forget-password",
    forgetPasswordVerifyOtp: function (email: string) {
        return `/auth/forget-password/verify-otp/${email}`;
    },
    resetPassword: function (token: string) {
        return `/auth/reset-password/${token}`;
    },
    checkEmail: function (email: string) {
        return `/auth/check-email/${email}`;
    },
    verifyEmail: function (token: string) {
        return `/auth/email-verifylink/${token}`;
    },
    verifyOtp: function (email: string) {
        return `/auth/verify-otp/${email}`;
    },
}




export const adminRoutes = {
    dashboard: '/admin/dashboard'

}

export const usersRoutes = {
    home: '/',


}