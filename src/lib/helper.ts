export const getOrdinal = (n: number) => {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

export const formatDateString = (dateStr: string) => {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric'
  }).format(date);
};


export const convert24HourTo12Hour = (time24: string): string => {
  const [hoursStr, minutesStr] = time24.split(':');
  let hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);

  let period = 'AM';

  if (hours >= 12) {
    period = 'PM';
    if (hours > 12) {
      hours -= 12;
    }
  } else if (hours === 0) {
    hours = 12; // 00:xx becomes 12:xx AM
  }

  const formattedHours = hours.toString();
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes.toString();

  return `${formattedHours}:${formattedMinutes} ${period}`;
}

export const parseBiblePassage = (passage: string) => {
  const normalizedPassage = passage.replace(/\s+/g, ' ').trim();

  const pattern = /^([1-3]?\s*[A-Za-z]+(?:\s+[A-Za-z]+)*)\s+(\d+)(?::\s*(\d+)(?:\s*-\s*(\d+))?)?$/;
  const match = normalizedPassage.match(pattern);

  if (match) {
    let bookName = match[1].toLowerCase().replace(/\s+/g, '-');
    bookName = bookName.replace(/^1-/, '1-').replace(/^2-/, '2-').replace(/^3-/, '3-');

    return {
      book: bookName,
      chapter: match[2],
      verse: match[3] || '1',
      range: match[4] || null,
      hasRange: !!match[4],
      fullReference: passage,
    };
  }

  return null;
};
