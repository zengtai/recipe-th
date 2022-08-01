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
}) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // let adsLength = document.querySelectorAll(
      //   ".adsbygoogle:only-child"
      // ).length;
      // for (let i = 0; i < adsLength; i++) {
      //   try {
      //     (window.adsbygoogle || []).push({});
      //   } catch (e) {
      //     console.error(`Adsense Error: `, e);
      //   }
      // }
      try {
        console.log(`Try push`, window.adsbygoogle);
        setTimeout((window.adsbygoogle || []).push({}), 1000);
        console.log(`Ad is pushed`);
      } catch (e) {
        console.error(`Adsense Error: `, e);
      }
    }
  }, [window.adsbygoogle]);

  return (
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
        data-adtest="on"
      />
      {/* <script
        dangerouslySetInnerHTML={{
          __html: `
           (adsbygoogle = window.adsbygoogle || []).push({});
       `,
        }}
      /> */}
    </div>
  );
};

export default Banner;
