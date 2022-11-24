import type {
  Device,
  DeviceBrowser,
  DeviceOS,
  DeviceType,
} from '@web3-onboard/common';
import bowser from 'bowser';

export type DeviceNotBrowser = {
  type: null;
  os: null;
  browser: null;
};

export function getDevice(): Device | DeviceNotBrowser {
  if (typeof window !== 'undefined') {
    const parsed = bowser.getParser(window.navigator.userAgent);
    const os = parsed.getOS();
    const browser = parsed.getBrowser();
    const { type } = parsed.getPlatform();

    return {
      type: type as DeviceType,
      os: os as DeviceOS,
      browser: browser as DeviceBrowser,
    };
  } else {
    return {
      type: null,
      os: null,
      browser: null,
    };
  }
}
