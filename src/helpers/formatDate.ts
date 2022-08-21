/**
 * Méthode pour modifier la date au bon format
 * @param date reçoit la date au format stocké dans la bdd
 * @returns la date au format jj/mm/aaaa
 */
const formatDate = (date: Date = new Date()): string => {
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

export default formatDate;
