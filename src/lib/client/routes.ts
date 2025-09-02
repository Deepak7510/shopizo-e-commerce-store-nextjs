
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
    dashboard: '/admin/dashboard',
    banners: {
        Banners: `/admin/banners`,
        addBanner: `/admin/banners/add`,
        editBanner: (id: string) => {
            return `/admin/banners/edit/${id}`
        },
    },
    brands: {
        brands: `/admin/brands`,
        addBrands: `/admin/brands/add`,
        editBrands: (id: string) => {
            return `/admin/brands/edit/${id}`
        },
    },
    categories: {
        categories: `/admin/categories`,
        addCategory: `/admin/categories/add`,
        editCategory: (id: string) => {
            return `/admin/categories/edit/${id}`
        },
    },
    subcategories: {
        subcategories: `/admin/subcategories`,
        addSubcategory: `/admin/subcategories/add`,
        editSubcategory: (id: string) => {
            return `/admin/subcategories/edit/${id}`
        },
    },
    colors: {
        colors: `/admin/colors`,
        addColor: `/admin/colors/add`,
        editColor: (id: string) => {
            return `/admin/colors/edit/${id}`
        },
    },
    products: {
        products: `/admin/products`,
        addProduct: `/admin/products/add`,
        editProduct: (id: string) => {
            return `/admin/products/edit/${id}`
        },
    },
    productVariants: {
        productVariants: `/admin/product-variants`,
        addProductVariants: `/admin/product-variants/add`,
        editProductVariants: (id: string) => {
            return `/admin/product-variants/edit/${id}`
        },
    },
    medias: {
        media: '/admin/media',
        editMedia: function (id: string) {
            return `/admin/media/edit/${id}`
        }
    },
    coupons: {
        coupons: `/admin/coupons`,
        addCoupons: `/admin/coupons/add`,
        editCoupons: (id: string) => {
            return `/admin/coupons/edit/${id}`
        },
    },
    orders: {
        orders: `/admin/orders`,
    },
    customers: {
        customers: `/admin/customers`,
    },
    reviews: {
        reviews: `/admin/reviews`,
    },
}



export const userRoutes = {
    home: '/',
    products: "/products"
}