import { useEffect } from "react";
import { ADS_ID } from "../lib/constants";

const Banner = ({
  className,
  style,
  layout,
  format,
  client = ADS_ID,
  slot,
  responsive,
  layoutKey,
  auto,
}) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      let adsLength = document.querySelectorAll(".adsbygoogle:only-child").length;
        for (let i = 0; i < adsLength; i++ ) {
          try {
            (window.adsbygoogle || []).push({});
          } catch (e) {
            console.error(`Adsense Error: `, e.messenge);
        }
      }
    }
  }, []);

  return auto ? ( 
    <div className={`${className} custom-ad`}>
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-layout={layout}
        data-ad-format={format}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-layout-key={layoutKey}
        data-full-width-responsive={responsive}
      />
    </div>
  ) : (
    <div className={`${className} custom-ad`}>
      <ins
        className={`adsbygoogle`}
        style={style}
        data-ad-layout={layout}
        data-ad-format={format}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-layout-key={layoutKey}
        data-full-width-responsive={responsive}
      />
    </div>
  );
};

export default Banner;
