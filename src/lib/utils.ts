import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, addDays, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date, formatStr: string = 'd MMMM yyyy') {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return format(d, formatStr, { locale: fr });
}

export function getAnnouncedDate(publishDate: string, relatedPostDate?: string) {
  if (relatedPostDate) return formatDate(relatedPostDate);
  const nextDay = addDays(parseISO(publishDate), 1);
  return formatDate(nextDay);
}
