import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const signOut = () => {
    localStorage.removeItem('userName');
    localStorage.removeItem('userToken'); // Remove if you're storing the token
    navigate('/'); // Redirect to the sign-in page
  };
}