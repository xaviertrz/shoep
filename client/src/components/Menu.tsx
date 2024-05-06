import { useAuthStore } from '../auth/hooks/useAuthStore';
import { roleIds } from '../constants/role-ids';
import { useModalStore } from '../platform/hooks/useModalStore';
import { MenuButtons } from './MenuButtons';

export function Menu() {
  const { user, status, logout } = useAuthStore();
  const { openLoginModal } = useModalStore();

  if (status === 'not-authenticated') {
    const buttons = [
      { label: 'Ingreso', action: openLoginModal },
      { label: 'registro', link: '/registrar' }
    ];

    return <MenuButtons buttons={buttons} />;
  }

  if (user?.role_id === roleIds.BUYER) {
    const buyerButtons = [
      { label: 'Pedidos', link: '/pedidos' },
      { label: 'Direcciones', link: '/domicilios' },
      { label: 'Mi perfil', link: `/perfil/${user?.uuid}` },
      { label: 'Cerrar sesión', link: '/logout', action: logout }
    ];

    return <MenuButtons buttons={buyerButtons} />;
  }

  const sellerButtons = [
    { label: 'Pedidos', link: '/pedidos' },
    { label: 'Mis productos', link: '/productos' },
    { label: 'Mi perfil', link: `/perfil/${user?.uuid}` },
    { label: 'Cerrar sesión', link: '/logout', action: logout }
  ];

  return <MenuButtons buttons={sellerButtons} />;
}
