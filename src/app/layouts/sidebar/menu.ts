import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
    {
        id: 1,
        label: 'Menu',
        isTitle: true
    },
    {
        id: 2,
        label: 'Dashboard',
        icon: 'bx bx-home-circle',
        link: '/',

    },
    {
        id: 2,
        label: 'Event',
        // icon: 'bx bx-user',
        icon:'bx bx-calendar-event',
        link: '/events',
    },
    {
        id: 2,
        label: 'Certificates',
        // icon: 'bx bx-user',
        icon:'bx bx-certification',
        link: '/certificates',
    },
    // {
    //     id: 2,
    //     label: 'Travel',
        
    //     icon:'fas fa-plane',
    //     link: '/travel',
    // },
    // {
    //     id: 3,
    //     label: 'Event Space',
    //     icon: 'dripicons-user',
    //     link: '/eventspace',
    // },
    // {
    //     id: 4,
    //     label: 'Food ',
      
    //     icon:'fas fa-hamburger',
    //     link: '/food',
    // },
    // {
    //     id: 5,
    //     label: 'Promotional Materials',
    //     icon: 'bx bx-list-ol',
    //     link: '/promotional',
    // },
    // {
    //     id: 2,
    //     label: 'DB Users',
    //     icon: 'mdi mdi-database-lock-outline',
    //     link: '/db-users',
    // },
    // {
    //     id: 2,
    //     label: 'API Generation',
    //     icon: 'bx bx-code-alt',
    //     link: '/api',
    // },
    // {
    //     id: 9,
    //     label: 'System Settings',
    //     icon: 'bx bx-cog',
    //     link: '/settings',

    //     // subItems: [
    //     //     {
    //     //         id: 13,
    //     //         label: 'Settings',
    //     //         link: '/point-settings',
    //     //         parentId: 9
    //     //     },
    //     //     {
    //     //         id: 13,
    //     //         label: 'Transactions',
    //     //         link: '/point-transactions',
    //     //         parentId: 9
    //     //     },
    //     // ]
    // },
 
];

