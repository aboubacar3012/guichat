export const formatDate = (dateString: string) => {
  // je veut avoir ce format la: 22 Janvier 2022
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  // @ts-ignore
  return date.toLocaleDateString('fr-FR', options);
};
