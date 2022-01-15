const MILLISECONDS_IN_SECOND = 1000;

type TSetCookieOrigProps = {
  expires?: number | string | Date;
  secure?: boolean;
}

export function getCookie(name: string) {
  const cookies = Object.fromEntries(
    document.cookie
      .split(/;\s*/)
      .map((pair) => pair.split('=', 2)),
  );

  return cookies[name] ? decodeURIComponent(cookies[name]) : undefined;
}

export function
setCookie(name: string, value: string | null | undefined, origProps: TSetCookieOrigProps = {}) {
  const props: TSetCookieOrigProps = { ...origProps };

  // Если передано число - считаем что это количество секунд, сколько должна жить кука
  if (typeof props.expires === 'number' && props.expires) {
    const expireDate = new Date();
    expireDate.setTime(expireDate.getTime() + props.expires * MILLISECONDS_IN_SECOND);
    props.expires = expireDate;
  }

  if (props.expires instanceof Date) {
    props.expires = props.expires.toUTCString();
  }

  let updatedCookie = `${name}=${encodeURIComponent(value || '')}`;

  Object.entries(props).forEach(([propName, propValue]) => {
    updatedCookie += `; ${propName}`;

    if (propValue !== true) {
      updatedCookie += `=${propValue}`;
    }
  });

  document.cookie = updatedCookie;
}

export function deleteCookie(name: string) {
  setCookie(name, null, { expires: -1 });
}
