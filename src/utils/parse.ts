const textarea = document.createElement('textarea');
export const transferToBlob = function(content: string) {
  textarea.innerHTML = content;
  return textarea.value;
};

const createDiv = () => {};
