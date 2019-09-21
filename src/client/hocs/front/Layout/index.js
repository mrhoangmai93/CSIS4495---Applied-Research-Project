import React from 'react';
import Footer from '../../../components/Footer';
import Header from '../../../components/Header';

function withLayout(BaseComponent) {
  function Layout(props) {
    return (
      <>
        <div className="content">
          <Header {...props} />
          <BaseComponent {...props} />
        </div>
        <Footer {...props} />
      </>
    );
  }

  return Layout;
}
export default withLayout;
