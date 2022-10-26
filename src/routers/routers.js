import { Navigate } from 'react-router-dom'
import Login from '../pages/login/login'
import Admin from '../pages/admin/admin'
import Home from '../pages/home/home'
import Category from '../pages/category/category'
import Product from '../pages/product/product'
import Role from '../pages/role/role'
import User from '../pages/user/user'
import Bar from '../pages/charts/bar'
import Line from '../pages/charts/line'
import Pie from '../pages/charts/pie'
import ProductAddUpdate from '../pages/product/add-update'
import ProductDetail from '../pages/product/detail'
import ProductHome from '../pages/product/home'
import NotFound from '../pages/not-found/not-found'
const routers = [
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/admin',
        element: <Admin/>,
        children:[
            {
                path: 'home',
                element: <Home/>
            },
            {
                path: 'category',
                element: <Category/>
            },
            {
                path: 'product',
                element: <Product/>,
                children:[
                    {
                        path: 'main',
                        element: <ProductHome/>
                    },
                    {
                        path: 'detail',
                        element: <ProductDetail/>
                    },
                    {
                        path: 'add_update',
                        element: <ProductAddUpdate/>
                    },
                    {
                        path: '',
                        element: <Navigate to='main'/>
                    },
                ]
            },
            {
                path: 'role',
                element: <Role/>
            },
            {
                path: 'user',
                element: <User/>
            },
            {
                path: 'charts/bar',
                element: <Bar/>
            },
            {
                path: 'charts/line',
                element: <Line/>
            },
            {
                path: 'charts/pie',
                element: <Pie/>
            },
            {
                path: '',
                element: <Navigate to='home'/>
            },
        ]
    },
    {
        path: '/',
        element: <Navigate to='/admin'/>,
        errorElement: <NotFound/> 
    },
    {
        path: '*',
        element: <NotFound/>,
    },

    
]
export default routers;