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
        data-adtest="on"
      />
      {/* <script dangerouslySetInnerHTML={{__html:`
          (adsbygoogle = window.adsbygoogle || []).push({});    
      `}} /> */}
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
        data-adtest="on"
      />
      {/* <script dangerouslySetInnerHTML={{__html:`
          (adsbygoogle = window.adsbygoogle || []).push({});    
      `}} /> */}
    </div>
  );
};

export default Banner;
