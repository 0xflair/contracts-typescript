import React, { useEffect, useState } from 'react';

type Props = Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> & {
  src?: string | Promise<string> | ((props: any) => JSX.Element);
};

export const PromisedImage = (props: Props) => {
  const { src, ...rest } = props;
  const [resolveSrc, setResolvedSrc] = useState<
    string | ((props: any) => JSX.Element) | undefined
  >(undefined);

  useEffect(() => {
    if (src instanceof Promise) {
      src.then((src: any) => {
        setResolvedSrc(src);
      });
    } else if (src) {
      setResolvedSrc(src);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  if (typeof resolveSrc === 'string') {
    return (
      <img
        src={
          resolveSrc?.includes('<svg') || resolveSrc?.includes('<?xml')
            ? `data:image/svg+xml;utf8,${encodeURIComponent(resolveSrc)}`
            : resolveSrc
        }
        {...rest}
      />
    );
  }

  if (resolveSrc) {
    const Component = resolveSrc;
    return <Component {...rest} />;
  }

  return null;
};
