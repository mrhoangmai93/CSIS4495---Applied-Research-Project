import React from 'react';
import Footer from '../../../components/Footer';
import Header from '../../../components/Header';

function withLayout(BaseComponent) {
  function Layout(props) {
    return (
      <>
        <Header {...props} />
        <BaseComponent {...props} />
        <Footer {...props} />
      </>
    );
  }

  return Layout;
}
export default withLayout;
