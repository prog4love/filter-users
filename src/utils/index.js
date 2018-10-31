export const concatClassNames = (addClassName, ...classNames) => {
	return classNames.concat(addClassName).join(' ');
}

export const getUserImage = (imgName) => {
	if (imgName) {
    const imgSrc = require(`../images/avatars/${imgName}.svg`);
		return imgSrc;
	}
}

export const copy = (source) => {
  if (Array.isArray(source)) {
    return Object.assign({}, ...source);
  } else {
    return Object.assign({}, source);
  }
}
