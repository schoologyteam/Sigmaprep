import { useEffect } from 'react';

export default function Blog() {
  useEffect(() => {
    // If the script is already present (e.g., a React hot-reload) just re-init

    const script = document.createElement('script');
    script.src = 'https://blogbott.com/aiblog.js'; // remote file
    script.async = true; // don’t block paint

    script.onload = () => {
      if (typeof window.blogbott_initializePage === 'function') {
        // ⚡️ call the third-party initializer
        // If the function expects a selector or element, pass it here:
        // window.initializePage('#blogbott_container');
        window.blogbott_initializePage();
      } else {
        console.error('BlogBott script loaded, but window.blogbott_initializePage() is undefined');
      }
    };

    script.onerror = () => console.error('Failed to load https://blogbott.com/aiblog.js');

    document.body.appendChild(script);

    // Clean-up on unmount
    return () => {
      script.remove(); // remove the tag
    };
  }, []);

  // Keep the mount point simple—avoid dots in IDs just in case
  return <div id='blogbott.com_app' />;
}
