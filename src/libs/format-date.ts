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