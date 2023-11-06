import { useDisclosure } from '@mantine/hooks';
import { AppShell, Burger, Button, Group, UnstyledButton } from '@mantine/core';
// import { MantineLogo } from '@mantine/ds';
import './AuthNavbar.scss';
import { AuthService } from '../services/authServices'
import { useGetUserQuery } from '../services/api/userApiSlice'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../services/features/userSlice'
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useAppSelector } from '../services2/hooks';
import { getToken, getUser } from '../services2/features/authSlice';


const AuthNavbar = () => {
    // const user = useAppSelector(getUser)
    const user = useAppSelector((state)=>state.auth)
    const location = useLocation()
    const navigate = useNavigate()
    const authService = new AuthService()
    const [opened, { toggle }] = useDisclosure();




    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
            padding="md"
            className="main-auth-navbar"
        >
            <AppShell.Header>
                <Group h="100%" px="md">
                    <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                    <Group justify="space-between" style={{ flex: 1 }}>
                    <NavLink to='/dashboard' className="logo">
                        <div className="logo">Skill-Guardians</div>
                    </NavLink>
                        <Group ml="xl" gap={20} visibleFrom="sm">

                            <NavLink to="/">
                                <UnstyledButton className={location.pathname !== "/my-task" ? "menu" : "menu-current"}>My Task</UnstyledButton>
                            </NavLink>
                            <NavLink to="/dashboard">
                                <UnstyledButton className={location.pathname !== "/dashboard" ? "menu" : "menu-current"}>Book a Task</UnstyledButton>
                            </NavLink>
                            <NavLink to={`/account/${user?._id}`}>
                                <UnstyledButton className={location.pathname !== `/account/${user?._id}` ? "menu" : "menu-current"}>Account</UnstyledButton>
                            </NavLink>
                            <NavLink to="/">
                                <UnstyledButton className={location.pathname !== "/support" ? "menu" : "menu-current"}>Support</UnstyledButton>
                            </NavLink>
                        </Group>
                    </Group>
                </Group>
            </AppShell.Header>

            <AppShell.Navbar  py="md" px={4}
            style={{
                // width: 500,
                display: "flex",
                flexDirection: "column",
                gap: 30
            }}
            >
                <NavLink to="/" className="nav-side-menu" onClick={toggle}>
                    <UnstyledButton className="nav-menu">My Task</UnstyledButton>
                </NavLink>
                <NavLink to="/dashboard" className="nav-side-menu" onClick={toggle}>
                    <UnstyledButton className="nav-menu">Book a Task</UnstyledButton>
                </NavLink >
                <NavLink className="nav-side-menu" to={`/account/${user?._id}`} onClick={toggle}>
                    <UnstyledButton className="nav-menu">Account</UnstyledButton>
                </NavLink>
                <NavLink to="/" className="nav-side-menu" onClick={toggle}>
                    <UnstyledButton className="nav-menu">Support</UnstyledButton>
                </NavLink>
            </AppShell.Navbar>

            {/* <AppShell.Main>
          Navbar is only visible on mobile, links that are rendered in the header on desktop are
          hidden on mobile in header and rendered in navbar instead.
        </AppShell.Main> */}
        </AppShell>
    );
}


export default AuthNavbar