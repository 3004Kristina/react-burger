import { format, formatRelative } from 'date-fns';
import { ru } from 'date-fns/locale';

const defaultLocale = ru;

export default function (time: string) {
  const now = new Date();
  const date = new Date(time);
  const timeText = formatRelative(date, now, { locale: defaultLocale });
  const timezoneText = format(date, 'z', { locale: defaultLocale });

  return `${timeText} i-${timezoneText}`;
}
