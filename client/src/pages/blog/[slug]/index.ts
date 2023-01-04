import wrapper from '@app/store';
import { getRunningOperationPromises } from '@app/services/api';
import { getUserData } from '@app/services/user/userApi';
import axios from 'axios';
import { GetServerSideProps } from 'next';

export { default } from '@pages/Blog/BlogPage/BlogPost';

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ /* params */ req }) => {
      const cookie = req ? req.headers.cookie : '';
      axios.defaults.headers.common.Cookie = '';
      if (req && cookie) {
        axios.defaults.headers.common.Cookie = cookie;
        store.dispatch(getUserData.initiate());
      }

      await Promise.all(getRunningOperationPromises());

      return {
        props: {},
      };
    },
);
