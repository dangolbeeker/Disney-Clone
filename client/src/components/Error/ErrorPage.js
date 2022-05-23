import React from 'react';
import './ErrorPage.styles.scss';

const ErrorPage = () => {
  const currentFullPath = window.location.pathname.split('/');
  currentFullPath.splice(0, 2); // remove first two parts of full path

  let currentPath = `/${currentFullPath.join('/')}`;

  return (
    <div className='error-page-container'>
      <p className='error-page-message'>
        404 Error, the path <span className='error-page-path'>{currentPath}</span> does not exist. <br />
        Please head back to site.
      </p>
    </div>
  )
}

export default ErrorPage;