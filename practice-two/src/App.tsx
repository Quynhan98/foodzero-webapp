import { Error } from '@components/common/error';
import { Popup } from '@components/common/popup';
import Search from '@components/common/search';
import { Form } from '@components/form';
import { Header } from '@components/header';
import { Books } from '@components/list-book';
import { SERVER_MESSAGES } from '@constant/messages';
import URL_PAGE from '@constant/url';
import { formValidate, ValidationResult } from '@helpers/validation-form';
import { useDebounce } from '@hooks/use-debounce';
import useGetData from '@hooks/use-get-data';
import { Book } from '@interface/book';
import { deleteData, postData, updateData } from '@services/fetch-api';
import { ChangeEvent, useCallback, useState } from 'react';
import './styles/main.css';

const App = (): JSX.Element => {
  const [book, setBook] = useState<Book | undefined>();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const searchValue = useDebounce(search, 500);
  const { data, error, setData, setError } = useGetData<Book>(`${URL_PAGE}${searchValue}`);

  const handelToggleForm = (): void => {
    setIsOpen(!isOpen);

    if (isOpen) {
      setBook(undefined);
    }
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

  const clickButtonEdit = (book: Book): void => {
    setBook(book);
    handelToggleForm();
  };

  const handleEditBook = async (book: Book): Promise<void> => {
    try {
      const validateFormEdit: ValidationResult = formValidate(book);

      if (validateFormEdit.isValid) {
        await updateData(book.id, URL_PAGE, book);

        const newBooks: Book[] = data.map((oldBook) => {
          if (oldBook.id === book.id) {
            return book;
          } else {
            return oldBook;
          }
        });

        setData(newBooks);
        handelToggleForm();
      }
    } catch (error) {
      setError(SERVER_MESSAGES.SERVER_EDIT_ERROR);
    }
  };

  const closeError = (): void => {
    setError('');
  };

  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTerm: string = e.target.value;

    setSearch(`?title_like=${searchTerm}`);
  };

  return (
    <div className="container">
      <Header toggleForm={handelToggleForm} />
      <Search onChange={handleChangeSearch} />
      <Books onClickButtonEdit={clickButtonEdit} handleRemove={handleDelete} books={data} />
      {isOpen && (
        <Popup handleClose={handelToggleForm}>
          <Form
            onHandleEdit={handleEditBook}
            onCreate={handleCreate}
            onHandleClose={handelToggleForm}
            selectedBook={book}
          />
        </Popup>
      )}
      {error && <Error onHandleClick={closeError}>{error}</Error>}
    </div>
  );
};

export default App;
