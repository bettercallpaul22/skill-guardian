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




    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
            padding="md"
            className="main-navbar"
        >
            <AppShell.Header>
                <Group h="100%" px="md">
                    {location.pathname === "/" && (<Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />)}
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
                                            style={{ color: "white" }}
                                        >Become A Tasker</Button>
                                    </NavLink>

                                </Group>
                        }
                    </Group>
                </Group>
            </AppShell.Header>

           {location.pathname === "/" && ( <AppShell.Navbar py="md" px={4} style={{
                // width: 500,
                display: "flex",
                flexDirection: "column",
                gap: 30
            }}>

                <NavLink to="/login" className="nav-side-menu" onClick={toggle} >
                    <UnstyledButton className="nav-menu" >Login</UnstyledButton>
                </NavLink>
                <NavLink to="/register" className="nav-side-menu" onClick={toggle}>
                    <UnstyledButton className="nav-menu">Register</UnstyledButton>
                </NavLink>
                <NavLink to="/become-a-tasker" style={{ paddingBottom: 10, paddingLeft: 20 }} className="nav-side-menu" onClick={toggle}>
                    <Button className="nnav-menu"
                        style={{ color: "white" }}
                    >Become A Tasker</Button>
                </NavLink>
            </AppShell.Navbar>)}

            {/* <AppShell.Main>
          Navbar is only visible on mobile, links that are rendered in the header on desktop are
          hidden on mobile in header and rendered in navbar instead.
        </AppShell.Main> */}
        </AppShell>
    );
}


export default Navbar