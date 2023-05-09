interface DocsData {
  paragraph?: {
    elements: Array<{
      textRun: {
        content: string;
      };
    }>;
  };
}
//получение текста из response google docs get
export const getArrayTextFromDocs = (content: DocsData[]): Array<string[] | undefined> => {
  const result = content.map((item) => {
    if (item.paragraph) {
      return item.paragraph.elements.map((element) => element.textRun.content);
    } else return;
  });
  return result;
};
