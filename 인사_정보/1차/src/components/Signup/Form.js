export const Input = ({ type, id, placeholder, required, pattern, title }) => {
  const inputContainer = `
          <span class="form_elem">
              <label for="${id}">
                ${placeholder}
                ${required && `<span class="mark">(필수*)</span>`}
              </label>
              <input id="${id}" type="${type}" placeholder="${placeholder}" 
                ${required ? "required" : ""}
                ${pattern ? `pattern=${pattern}` : ""}
                ${title ? `title="${title}"` : ""}/>
          </span>
      `;

  return inputContainer;
};

export const Select = ({ id, name, optValList, optTxtList, required }) => {
  const selectContainer = `
        <span class="form_elem">
            <label for="${id}">
                ${name}
                ${required ? `<span class="mark">(필수*)</span>` : ""}
            </label>
            <select id="${id}" name="${id}" ${required ? "required" : ""}>
                ${optValList.map(
                  (val, idx) =>
                    `<option value="${val}">${optTxtList[idx]}</option>`
                )}
            </select>
        </span>
    `;

  return selectContainer;
};

export const Button = ({ type, text }) => {
  const buttonContainer = `
        <span class="form_elem">
            <button type="${type}">${text}</button>
        </span>
    `;
  return buttonContainer;
};
