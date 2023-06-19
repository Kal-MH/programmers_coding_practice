export const Input = ({ type, id, placeholder, required, pattern, title }) => {
  return `
    <span class="form_elem">
        <input type="${type}" id="${id}" placeholder="${placeholder}"
            ${required ? "required" : ""}
            ${pattern ? `pattern=${pattern}` : ""}
            ${title ? `title="${title}"` : ""}
        />
    </span>
    `;
};

export const Select = ({ id, name, optValList, optTxtList, required }) => {
  return `
    <span class="form_elem">
        <select id="${id}" name="${name}"
        ${required ? "required" : ""}>
        ${optValList.map(
          (opt, i) => `<option value="${opt}">${optTxtList[i]}</option>`
        )}
        </select>
    </span>
    `;
};

export const Button = ({ type, text }) => {
  return `
    <span class="form_elem">
        <button type="${type}">${text}</button>
    </span>
    `;
};
