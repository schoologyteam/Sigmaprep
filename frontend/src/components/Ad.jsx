import { useEffect } from 'react';

export default function AdsenseAd({ adSlot, style }) {
  useEffect(() => {
    if (window.adsbygoogle) {
      try {
        window.adsbygoogle.push({}); // tells google to rerender
      } catch (error) {
        console.log(error);
      }
    }
  }, []);
  return (
    <div style={{ textAlign: 'center', margin: '10px 0', ...style }}>
      <ins
        className='adsbygoogle'
        style={{ display: 'block' }}
        data-ad-client='ca-pub-8362959866002557'
        data-ad-slot={adSlot}
        data-ad-format='auto'
        data-full-width-responsive='true'
      ></ins>
    </div>
  );
}
