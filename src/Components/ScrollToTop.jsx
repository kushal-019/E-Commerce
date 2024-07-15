import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = () => {
    const currpath = useLocation();

    useEffect(()=>{
        setTimeout(()=>{
            window.scrollTo(0,0);
        } , 0)
    }, [currpath])
  return null;
}

export default ScrollToTop
