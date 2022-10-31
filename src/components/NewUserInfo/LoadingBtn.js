import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import styles from "./NewUserInfo.module.css";
function LoadingBtn () {
  return (
    <>
      <Button className={styles.saveBtnLoading} disabled>
        <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        Saving...
      </Button>
    </>
  );
}

export default LoadingBtn
;