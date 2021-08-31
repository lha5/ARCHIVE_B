import Link from 'next/link';
import propTypes from 'prop-types';

const AppLayout = ({ children }) => {
  return (
    <div>
      <div>
        <Link href="/"><a>홈</a></Link>
        <Link href="/login"><a>로그인</a></Link>
      </div>
      {children}
    </div>
  );
}

AppLayout.propTypes = {
  children: propTypes.node.isRequired,
};

export default AppLayout;
