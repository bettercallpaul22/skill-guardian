import { useDisclosure } from '@mantine/hooks';
import { AppShell, Burger, Button, Group, UnstyledButton } from '@mantine/core';
// import { MantineLogo } from '@mantine/ds';
import './Navbar.scss';
import { AuthService } from '../services/authServices'
import { useGetUserQuery } from '../services/api/userApiSlice'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../services/features/userSlice'
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom'


const Navbar = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const authService = new AuthService()
    const [opened, { toggle }] = useDisclosure();



    console.log("params", location.pathname)

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
            padding="md"
            className="main-navbar"
        >
            <AppShell.Header>
                <Group h="100%" px="md">
                    <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                    <Group justify="space-between" style={{ flex: 1 }}>
                    <NavLink to="/" className="logo">
                        <div className="logo">Skill-Guardians</div>
                    </NavLink>
                    {
                      location.pathname === "/become-a-tasker" ? "" :

                        <Group ml="xl" gap={20} visibleFrom="sm">

                            <NavLink to="/login">
                                <UnstyledButton className={location.pathname !== "/login" ? "menu" : "menu-current"}>Login</UnstyledButton>
                            </NavLink>
                            <NavLink to="/register">
                                <UnstyledButton className={location.pathname !== "/register" ? "menu" : "menu-current"}>Register</UnstyledButton>
                            </NavLink>
                            <NavLink to="/become-a-tasker">
                                <Button className="menu"
                                style={{color:"white"}}
                                >Become A Tasker</Button>
                            </NavLink>
                           
                        </Group>
                    }
                    </Group>
                </Group>
            </AppShell.Header>

            <AppShell.Navbar  py="md" px={4}>
                <NavLink to="/">
                    <UnstyledButton className={location.pathname !== "/my-task" ? "menu" : "menu-current"}>My Task</UnstyledButton>
                </NavLink>
                <NavLink to="/">
                    <UnstyledButton className={location.pathname !== "/book-a-task" ? "menu" : "menu-current"}>Book a Task</UnstyledButton>
                </NavLink>
                <NavLink to={`/account/${authService.getUserId()}`}>
                    <UnstyledButton className={location.pathname !== `/account/${authService.getUserId()}` ? "menu" : "menu-current"}>Account</UnstyledButton>
                </NavLink>
                <NavLink to="/">
                    <UnstyledButton className={location.pathname !== "/support" ? "menu" : "menu-current"}>Support</UnstyledButton>
                </NavLink>
            </AppShell.Navbar>

            {/* <AppShell.Main>
          Navbar is only visible on mobile, links that are rendered in the header on desktop are
          hidden on mobile in header and rendered in navbar instead.
        </AppShell.Main> */}
        </AppShell>
    );
}


export default Navbar