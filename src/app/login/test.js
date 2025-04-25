import AuthGuard from '../../components/auth/AuthGuard';
import { logout } from '../../utils/auth';

export default function Test() {
  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <AuthGuard>
      <div style={{ padding: '2rem' }}>
        <h1>Chào mừng đến Dashboard!</h1>
        <button onClick={handleLogout}>Đăng xuất</button>
      </div>
    </AuthGuard>
  );
}
