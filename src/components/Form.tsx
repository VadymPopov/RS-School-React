import { Component, ReactNode, FormEvent } from 'react';

interface FormProps {
  children: ReactNode;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

class Form extends Component<FormProps> {
  constructor(props: FormProps) {
    super(props);
  }

  render() {
    const { onSubmit, children } = this.props;

    return <form onSubmit={onSubmit}>{children}</form>;
  }
}

export default Form;
