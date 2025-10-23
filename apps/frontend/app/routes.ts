import { RouteConfig, index, layout, route } from '@react-router/dev/routes'

export default [
  layout('layout/index.tsx', [
    index('routes/index.tsx'),
    route('home', 'routes/home.tsx'),
    route('login', 'routes/auth/login.tsx'),
    route('register', 'routes/auth/register.tsx'),
    route('logout', 'routes/auth/logout.tsx'),
    route('chat', 'routes/chat.tsx')
  ])

] satisfies RouteConfig
