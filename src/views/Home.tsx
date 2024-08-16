import Card from '../components/Card';
import { useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';

export default function Home() {
  const uncontrolledFormData = useAppSelector(
    (state: RootState) => state.uncontrolledForms.data
  );

  return (
    <div className="home">
      <div>
        <h2>Uncontrolled</h2>
        <ul className="cards">
          {uncontrolledFormData.map((item) => {
            return <Card {...item} />;
          })}
        </ul>
      </div>
      <div>
        <h2>Controlled</h2>
        <ul className="cards">
          {uncontrolledFormData.map((item) => {
            return <Card {...item} />;
          })}
        </ul>
      </div>
    </div>
  );
}
