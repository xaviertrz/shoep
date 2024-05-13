export function calculateElapsedTime(fromDate?: Date): string {
  if (!fromDate) {
    return 'Nunca';
  }

  const now: Date = new Date();
  const differenceInMilliseconds: number = now.getTime() - fromDate.getTime();

  const seconds: number = Math.floor(differenceInMilliseconds / 1000);
  const minutes: number = Math.floor(seconds / 60);
  const hours: number = Math.floor(minutes / 60);
  const days: number = Math.floor(hours / 24);
  const weeks: number = Math.floor(days / 7);
  const months: number = Math.floor(days / 30); // Assuming a month is 30 days

  if (months > 0) {
    return `Hace ${months} mes${months !== 1 ? 'es' : ''}`;
  } else if (weeks > 0) {
    return `Hace ${weeks} semana${weeks !== 1 ? 's' : ''}`;
  } else if (days > 0) {
    return `Hace ${days} día${days !== 1 ? 's' : ''}`;
  } else if (hours > 0) {
    return `Hace ${hours} hora${hours !== 1 ? 's' : ''}`;
  } else if (minutes > 0) {
    return `Hace ${minutes} minuto${minutes !== 1 ? 's' : ''}`;
  } else {
    return `Hace ${seconds} segundo${seconds !== 1 ? 's' : ''}`;
  }
}
