export const formatDate = (dateString: string) => { // date is in this format: 2022-01-22T00:00:00.000Z
  // je veut avoir ce format la: 22 Janvier 2022
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  // @ts-ignore
  return date.toLocaleDateString('fr-FR', options);
};


export const formatTime = (dateString: string) => { // date is in this format: 2022-01-22T00:00:00.000Z
  // je veut avoir ce format: 20:00
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return '';
  }
  const options = { hour: '2-digit', minute: '2-digit' };
  // @ts-ignore
  return date.toLocaleTimeString('fr-FR', options);
}

// je veut avoir ce format: il y a 2 heures, il y a 5 minutes, il y a 1 jour, il y a 1 semaine ....
export const formatDistanceToNow = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(weeks / 4);
  const years = Math.floor(months / 12);

  if (years > 0) {
    return `il y a ${years} an${years > 1 ? 's' : ''}`;
  }
  if (months > 0) {
    return `il y a ${months} mois`;
  }
  if (weeks > 0) {
    return `il y a ${weeks} semaine${weeks > 1 ? 's' : ''}`;
  }
  if (days > 0) {
    return `il y a ${days} jour${days > 1 ? 's' : ''}`;
  }
  if (hours > 0) {
    return `il y a ${hours} heure${hours > 1 ? 's' : ''}`;
  }
  if (minutes > 0) {
    return `il y a ${minutes} minute${minutes > 1 ? 's' : ''}`;
  }
  if (seconds > 0) {
    return `il y a ${seconds} seconde${seconds > 1 ? 's' : ''}`;
  }
  return 'à l\'instant';
}