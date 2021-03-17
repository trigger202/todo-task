import React from 'react';

export default function detectOutsideClick(e:Event, ref:React.MutableRefObject<{contains: (target: EventTarget|null) => boolean} | null>, callBack: () => void) {
  if (ref.current && !ref.current.contains(e.target)) {
    callBack();
  }
}
