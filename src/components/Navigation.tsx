import { NavLink } from 'react-router-dom';
export default function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive, isPending }) =>
              isPending ? 'pending' : isActive ? 'active' : ''
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="uncontrolled-form"
            className={({ isActive, isPending }) =>
              isPending ? 'pending' : isActive ? 'active' : ''
            }
          >
            Uncontrolled
          </NavLink>
        </li>
        <li>
          <NavLink
            to="controlled-form"
            className={({ isActive, isPending }) =>
              isPending ? 'pending' : isActive ? 'active' : ''
            }
          >
            Controlled
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
