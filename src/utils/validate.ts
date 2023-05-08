const regexpGoogleSheets = /^https:\/\/docs.google.com\/spreadsheets\/d\//;

const regexpGoogleDocs = /^https:\/\/docs.google.com\/document\/d\//;

export const checkLink = (link: string, scope: string): boolean => {
  switch (scope) {
    case "sheets":
      return regexpGoogleSheets.test(link);
      break;
    case "docs":
      return regexpGoogleDocs.test(link);
      break;
    default:
      return false;
      break;
  }
};
