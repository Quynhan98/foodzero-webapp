import { FormEvent, useState } from 'react';

// Change the content of the button after clicking
const Button = (): JSX.Element => {
  const [buttonText, setButtonText] = useState('Click me, please!');

  const handleClick = (): void => setButtonText('Thanks, been clicked!');

  return <button onClick={handleClick}>{buttonText}</button>;
};

// Count, after each click will increase by 1
const Count = (): JSX.Element => {
  const [count, setCount] = useState(0);

  const handleClick = (): void => setCount(count + 1);

  return (
    <div>
      <p>You Clicked {count}</p>
      <button onClick={handleClick}>Click me!</button>
    </div>
  );
};

// Update user information
const UserInfo = (): JSX.Element => {
  const [userInfo, setUserInfo] = useState({ firstName: 'Le', lastName: 'Nhan' });

  const handleClick = (): void =>
    setUserInfo((prevState) => ({ ...prevState, firstName: 'Nguyen', lastName: 'Long' }));

  return (
    <div>
      <p>
        userInfo: {userInfo.firstName} {userInfo.lastName}
      </p>
      <button onClick={handleClick}>Update name</button>
    </div>
  );
};

// Read more/ Read less
interface TextProp {
  text: string;
  maxLength: number;
}

const LessText = ({ text, maxLength }: TextProp): JSX.Element => {
  const [hidden, setHidden] = useState(true);

  if (text.length <= maxLength) {
    return <span>{text}</span>;
  }

  return (
    <span>
      {hidden ? `${text.substring(0, maxLength).trim()} ...` : text}
      {hidden ? (
        <a onClick={() => setHidden(false)}> read more</a>
      ) : (
        <a onClick={() => setHidden(true)}> read less</a>
      )}
    </span>
  );
};

// Add list of names
const ListName = (): JSX.Element => {
  const [items, setItems] = useState([{ id: Date.now(), name: '' }]);
  const [itemName, setItemName] = useState('');

  const addItem = (e: FormEvent) => {
    e.preventDefault();

    setItems([...items, { id: Date.now(), name: itemName }]);

    setItemName('');
  };

  return (
    <>
      <form action="#" onSubmit={addItem}>
        <label>
          <input
            type="text"
            name="item"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
        </label>
      </form>
      <ul>{items.map((item) => (item.name ? <li key={item.id}>{item.name}</li> : null))}</ul>
    </>
  );
};

// Login Form
const LoginForm = (): JSX.Element => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    console.log(username, password);
  };

  return (
    <form action="#" onSubmit={handleSubmit}>
      <p>Form submit</p>
      <label>
        Username:
        <input
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          name="username"
          type="text"
        />
      </label>
      <label>
        Password:
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          name="password"
          type="password"
        />
      </label>
      <br />
      <button>Submit</button>
    </form>
  );
};

// Synthesize components about useState
export const ExampleUseState = (): JSX.Element => {
  return (
    <div>
      <h2>useState</h2>
      <Button />
      <Count />
      <UserInfo />
      <LessText
        text={
          'T???t c??? m???i ng?????i ?????u sinh ra c?? quy???n b??nh ?????ng. T???o h??a cho h??? nh???ng quy???n kh??ng ai c?? th??? x??m ph???m ???????c; trong nh???ng quy???n  ???y, c?? quy???n ???????c s???ng, quy???n t??? do v?? quy???n m??u c???u h???nh ph??c.'
        }
        maxLength={20}
      />
      <ListName />
      <LoginForm />
    </div>
  );
};
