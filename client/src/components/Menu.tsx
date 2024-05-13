import { useAuthStore } from '../auth/hooks/useAuthStore';
import { roleIds } from '../constants/role-ids';
import { useModalStore } from '../platform/hooks/useModalStore';
import { MenuButtons } from './MenuButtons';

export function Menu({ style }: { style?: string }) {
  const { user, status, logout } = useAuthStore();
  const { openLoginModal } = useModalStore();

  function handleLogin() {
    openLoginModal();
  }

  if (status === 'not-authenticated') {
    const buttons = [
      { label: 'Ingreso', action: handleLogin },
      { label: 'Registro', link: '/registrar' }
    ];

    return <MenuButtons style={style} buttons={buttons} />;
  }

  if (user?.role_id === roleIds.BUYER) {
    const buyerButtons = [
      { label: 'Pedidos', link: './pedidos' },
      { label: 'Direcciones', link: '/domicilios' },
      { label: 'Mi perfil', link: `/perfil/${user?.uuid}` },
      { label: 'Cerrar sesión', link: '/logout', action: logout }
    ];

    return <MenuButtons style={style} buttons={buyerButtons} />;
  }

  if (user?.role_id === roleIds.ADMIN) {
    const adminButtons = [
      { label: 'Mi perfil', link: `/perfil/${user?.uuid}` },
      { label: 'Cerrar sesión', link: '/logout', action: logout }
    ];

    return <MenuButtons style={style} buttons={adminButtons} />;
  }

  const sellerButtons = [
    { label: 'Pedidos', link: '/pedidos' },
    { label: 'Mis productos', link: '/productos' },
    { label: 'Mi perfil', link: `/perfil/${user?.uuid}` },
    { label: 'Cerrar sesión', link: '/logout', action: logout }
  ];

  return <MenuButtons style={style} buttons={sellerButtons} />;
}
