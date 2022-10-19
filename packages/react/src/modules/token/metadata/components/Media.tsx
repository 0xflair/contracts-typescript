import { normalizeIpfsUrl } from '@flair-sdk/ipfs';
import { useEffect, useState } from 'react';

type Props<T = HTMLImageElement | HTMLVideoElement> = {
  uri?: string;
  loadingMask?: React.ReactNode;
} & React.HTMLAttributes<T>;

export const Media = ({
  uri,
  loadingMask = <>...</>,
  ...attributes
}: Props) => {
  const [contentType, setContentType] = useState<string>();
  const url = normalizeIpfsUrl(uri);

  useEffect(() => {
    // Send a HEAD request using axios and grab the Content-Type header

    const fetchContentType = async () => {
      if (!url) {
        return;
      }

      const response = await fetch(url, { method: 'HEAD' });
      const contentType = response.headers.get('content-type');

      if (contentType) {
        setContentType(contentType);
      }
    };

    fetchContentType();
  }, [url]);

  // if content type is a video, render a video tag
  if (contentType?.startsWith('video/')) {
    return (
      <video
        src={url}
        autoPlay={true}
        controls={true}
        loop={true}
        muted={true}
        playsInline={true}
        {...attributes}
      />
    );
  }

  // if content type is an image, render an image tag
  if (contentType?.startsWith('image/')) {
    return <img src={url} {...attributes} />;
  }

  return loadingMask ? <span {...attributes}>{loadingMask}</span> : <></>;
};
