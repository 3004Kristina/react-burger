const MILLISECONDS_IN_SECOND = 1000;

export function getCookie(name) {
  const matches = document.cookie.match(
    new RegExp(`(?:^|; )${name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1')}=([^;]*)`),
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(name, value, origProps = {}) {
  const props = { ...origProps };

  // Если передано число - считаем что это количество секунд, сколько должна жить кука
  if (typeof props.expires === 'number' && props.expires) {
    const expireDate = new Date();
    expireDate.setTime(expireDate.getTime() + props.expires * MILLISECONDS_IN_SECOND);
    props.expires = expireDate;
  }

  if (props.expires && props.expires.toUTCString) {
    props.expires = props.expires.toUTCString();
  }

  let updatedCookie = `${name}=${encodeURIComponent(value)}`;

  Object.entries(props).forEach(([propName, propValue]) => {
    updatedCookie += `; ${propName}`;

    if (propValue !== true) {
      updatedCookie += `=${propValue}`;
    }
  });

  document.cookie = updatedCookie;
}

export function deleteCookie(name) {
  setCookie(name, null, { expires: -1 });
}
