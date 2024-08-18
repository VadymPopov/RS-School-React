import { useEffect } from 'react';
import Card from '../components/Card';
import { useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';
import { resetNewFlag } from '../redux/formsSlice';
import { FormType } from '../types';
import { useAppDispatch } from '../redux/hooks';

export default function Home() {
  const dispatch = useAppDispatch();
  const uncontrolledFormData = useAppSelector(
    (state: RootState) => state.forms.uncontrolledForms
  );
  const controlledFormData = useAppSelector(
    (state: RootState) => state.forms.controlledForms
  );
  let id;
  let formType;

  const lastUncontrolled =
    uncontrolledFormData?.[uncontrolledFormData?.length - 1];
  const lastControlled = controlledFormData?.[controlledFormData?.length - 1];

  if (lastUncontrolled?.isNew === true) {
    id = lastUncontrolled.id;
    formType = FormType.Uncontrolled;
  } else {
    id = lastControlled?.id;
    formType = FormType.Controlled;
  }

  useEffect(() => {
    setTimeout(() => {
      dispatch(resetNewFlag({ id, formType }));
    }, 3000);
  }, [dispatch, formType, id]);

  const reversedUncontrolledForms = [...uncontrolledFormData].reverse();
  const reversedControlledForms = [...controlledFormData].reverse();

  return (
    <div className="home">
      <div>
        <h2>Uncontrolled</h2>
        <ul className="cards">
          {reversedUncontrolledForms?.map((item) => {
            return <Card active={item.isNew} {...item} key={item.id} />;
          })}
        </ul>
      </div>
      <div>
        <h2>Controlled</h2>
        <ul className="cards">
          {reversedControlledForms?.map((item) => {
            return <Card active={item.isNew} {...item} key={item.id} />;
          })}
        </ul>
      </div>
    </div>
  );
}
