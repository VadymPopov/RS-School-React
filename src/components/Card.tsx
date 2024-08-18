import { IFormValues } from '../types';

interface CardProps extends IFormValues {
  active: boolean;
}

export default function Card({
  name,
  age,
  email,
  password,
  gender,
  picture,
  country,
  active,
}: CardProps) {
  return (
    <li className={active ? 'active-card' : 'card'}>
      {active && (
        <div className="new">
          <p>New</p>
        </div>
      )}
      <div className="card-picture">
        <img src={picture} alt="avatar" className="card-img" />
      </div>
      <div className="card-item">
        <span className="card-label">Name:</span>
        <span className="card-value">{name}</span>
      </div>
      <div className="card-item">
        <span className="card-label">Age:</span>
        <span className="card-value">{age}</span>
      </div>
      <div className="card-item">
        <span className="card-label">Email:</span>
        <span className="card-value">{email}</span>
      </div>
      <div className="card-item">
        <span className="card-label">Password:</span>
        <span className="card-value">{password}</span>
      </div>
      <div className="card-item">
        <span className="card-label">Gender:</span>
        <span className="card-value">{gender}</span>
      </div>
      <div className="card-item">
        <span className="card-label">Country:</span>
        <span className="card-value">{country}</span>
      </div>
    </li>
  );
}
