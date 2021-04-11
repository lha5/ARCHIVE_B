import Link from 'next/link';
import propTypes from 'prop-types';

const AppLayout = ({ children }) => {
  return (
    <div>
      <div>
        <Link href="/"><a>홈</a></Link>
        <Link href="/user/profile"><a>프로필</a></Link>
        <Link href="/signup"><a>계정 생성</a></Link>
      </div>
      {children}
    </div>
  );
}

AppLayout.propTypes = {
  children: propTypes.node.isRequired,
};

export default AppLayout;
