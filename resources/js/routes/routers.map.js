import AdminComponent from '../components/admin/AdminComponent'
import CategoriesComponent from '../components/admin/pages/categories/CategoriesComponent'
import DashBoardComponent from '../components/admin/pages/dashboard/DashBoardComponent'
import AddCategoryComponent from '../components/admin/pages/categories/AddCategoryComponent'
import EditCategoryComponent from '../components/admin/pages/categories/EditCategoryComponent'
import ProductsComponent from '../components/admin/pages/products/ProductsComponent'
import ProductsReports from '../components/admin/pages/reports/ProductsReports'
import SiteComponent from '../components/frontend/SiteComponent'
import HomeComponent from '../components/frontend/pages/home/HomeComponent'
import ContactComponent from '../components/frontend/pages/contact/ContactComponent'
import ProductDetail from '../components/frontend/pages/product/ProductDetail'
import CartComponent from '../components/frontend/pages/cart/CartComponent'
import LoginComponent from '../components/frontend/pages/login/LoginComponent'
import RegisterComponent from '../components/frontend/pages/user/RegisterComponent'
import ProfileComponent from '../components/frontend/pages/user/ProfileComponent'
import Error404 from '../components/frontend/pages/404/Error404'

const routes = [
    {
        path: '/', 
        component: SiteComponent,
        children: [
            {path: 'login', component: LoginComponent, name: 'login', meta: {auth: false}},
            {path: 'cadastrar', component: RegisterComponent, name: 'register', meta: {auth: false}},
            {path: 'meu-perfil', component: ProfileComponent, name: 'profile', meta: {auth: true}},
            {path: 'carrinho', component: CartComponent, name: 'cart'},
            {path: 'produto/:id', component: ProductDetail, name: 'product.detail', props: true},
            {path: 'contact', component: ContactComponent, name: 'contact'},
            {path: '', component: HomeComponent, name: 'home'}
        ],
    },
    {
        path: '/admin', 
        component: AdminComponent,
        meta: {auth: true},
        children: [
            {path: '', component: DashBoardComponent, name: 'admin.dashboard'},
            {path: 'categories', component: CategoriesComponent, name: 'admin.categories'},
            {path: 'categories/create', component: AddCategoryComponent, name: 'admin.categories.create'},
            {path: 'categories/:id/edit', component: EditCategoryComponent, name: 'admin.categories.edit', props: true},

            {path: 'products', component: ProductsComponent, name: 'admin.products'},
            {path: 'products-reports', component: ProductsReports, name: 'products.reports'},
        ],
    },

    //Error 404 ...
    {path: '*', component: Error404}
]

export default routes