import { Error } from '@components/common/error';
import { Popup } from '@components/common/popup';
import { Form } from '@components/form';
import { Header } from '@components/header';
import { Books } from '@components/list-book';
import { SERVER_MESSAGES } from '@constant/messages';
import URL_PAGE from '@constant/url';
import { formValidate, ValidationResult } from '@helpers/validation-form';
import useGetData from '@hooks/useGetData';
import { Book } from '@interface/book';
import { deleteData, postData } from '@services/fetch-api';
import { useCallback, useState } from 'react';
import './styles/main.css';

const App = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const { data, error, setData, setError } = useGetData<Book>(URL_PAGE);

  const handelToggleForm = (): void => {
    setIsOpen(!isOpen);
  };

  const handleCreate = async (book: Book): Promise<void> => {
    try {
      const validateFormCreate: ValidationResult = formValidate(book);

      if (validateFormCreate.isValid) {
        await postData(book, URL_PAGE);

        setData([...data, book]);
        handelToggleForm();
      }
    } catch (error) {
      setError(SERVER_MESSAGES.SERVER_RESPONSE_ERROR);
      handelToggleForm();
    }
  };

  const handleDelete = useCallback(
    async (id: number): Promise<void> => {
      try {
        await deleteData(id, URL_PAGE);
        const bookArr: Book[] = data.filter((item) => item.id !== id);

        setData(bookArr);
      } catch (error) {
        setError(SERVER_MESSAGES.SERVER_DELETE_ERROR);
      }
    },
    [data, setData, setError]
  );

  const closeError = (): void => {
    setError('');
  };

  return (
    <div className="container">
      <Header toggleForm={handelToggleForm} />
      <Books handleRemove={handleDelete} books={data} />
      {isOpen && (
        <Popup handleClose={handelToggleForm}>
          <Form onCreate={handleCreate} onHandleClose={handelToggleForm} />
        </Popup>
      )}
      {error && <Error onHandleClick={closeError}>{error}</Error>}
    </div>
  );
};

export default App;
