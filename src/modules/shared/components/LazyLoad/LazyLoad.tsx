import { useEffect } from 'react'
import NProgress from 'accessible-nprogress'
import 'accessible-nprogress/dist/accessible-nprogress.css'

interface ILazyLoadProps {
  showSpinner?: boolean
}

const LazyLoad: React.FC<ILazyLoadProps> = ({ showSpinner }) => {
  useEffect(() => {
    NProgress.configure({ showSpinner })
    NProgress.start()

    return () => {
      NProgress.done()
    }
  })

  return null
}

type LazyLoadDefaultProps = Pick<ILazyLoadProps, 'showSpinner'>

LazyLoad.defaultProps = {
  showSpinner: false,
} as LazyLoadDefaultProps

export default LazyLoad


// if u still got the error of lazy loader 
// here 's ur chatgbt provided solution 
// import { useEffect } from 'react';
// import NProgress from 'accessible-nprogress';
// import 'accessible-nprogress/dist/accessible-nprogress.css';

// interface ILazyLoadProps {
//   showSpinner?: boolean;
// }

// const LazyLoad: React.FC<ILazyLoadProps> = ({ showSpinner = false }) => {
//   useEffect(() => {
//     NProgress.configure({ showSpinner });
//     NProgress.start();
//     return () => {
//       NProgress.done();
//     };
//   }, [showSpinner]);

//   return null;
// };

// export default LazyLoad;
