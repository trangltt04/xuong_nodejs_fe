import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext, AuthContextType } from '../../contexts/AuthContext'
import './Header.scss'

const Header = () => {
	const { user, logout } = useContext(AuthContext) as AuthContextType
	return (
		<header>
			<ul>
				<li>
					<Link to='/'>Home</Link>
				</li>
				{user ? (
					<>
						<li>
							<span>Welcome, {user?.email}</span>
						</li>
						<li>
							<button onClick={logout}>Logout</button>
						</li>
						{user.role === 'admin' && (
							<li>
								<Link to='/admin'>Admin</Link>
							</li>
						)}
					</>
				) : (
					<>
						<li>
							<Link to='/login'>Login</Link>
						</li>
						<li>
							<Link to='/register'>Register</Link>
						</li>
					</>
				)}
			</ul>
		</header>
	)
}

export default Header
