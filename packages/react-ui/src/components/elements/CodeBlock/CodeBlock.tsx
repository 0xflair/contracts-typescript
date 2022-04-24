import { classNames } from '@0xflair/react-common';
import { CheckCircleIcon, ClipboardCopyIcon } from '@heroicons/react/solid';
import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/vsDark';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useCopyToClipboard } from 'usehooks-ts';

export type CodeBlockProps = {
  code: string;
  language?: Language;
};

const Pre = styled.pre`
  text-align: left;
  margin: 0;
  padding: 0.5em;
  overflow: scroll;
`;

const Line = styled.div`
  display: table-row;
`;

const LineNo = styled.span`
  display: table-cell;
  text-align: right;
  padding-right: 1em;
  user-select: none;
  opacity: 0.5;
`;

const LineContent = styled.span`
  display: table-cell;
`;

export const CodeBlock = (props: CodeBlockProps) => {
  const { code, language } = props;
  const [copiedRecently, setCopiedRecently] = useState(false);
  const [, copy] = useCopyToClipboard();

  return (
    <Highlight
      {...defaultProps}
      theme={theme}
      code={code}
      language={language || 'typescript'}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Pre className={classNames(className, 'relative group')} style={style}>
          <div className="relative top-0 right-0 w-full flex justify-end">
            <button
              type="button"
              className="absolute hidden group-hover:inline-flex top-0 right-0 items-center px-1.5 py-0.5 border border-gray-300 shadow-sm text-xs font-bold rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => {
                copy(code);
                setCopiedRecently(true);
              }}
            >
              {copiedRecently ? (
                <>
                  <CheckCircleIcon
                    className="-ml-0.5 mr-2 h-4 w-4"
                    aria-hidden="true"
                  />
                  Copied
                </>
              ) : (
                <>
                  <ClipboardCopyIcon
                    className="-ml-0.5 mr-2 h-4 w-4"
                    aria-hidden="true"
                  />
                  Copy this
                </>
              )}
            </button>
          </div>
          {tokens.map((line, i) => (
            <Line key={i} {...getLineProps({ line, key: i })}>
              <LineNo>{i + 1}</LineNo>
              <LineContent>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </LineContent>
            </Line>
          ))}
        </Pre>
      )}
    </Highlight>
  );
};
